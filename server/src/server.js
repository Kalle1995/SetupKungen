const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Databas-koppling
const dbPath = path.join(__dirname, '..', 'db', 'db-manager.db');
const db = new Database(dbPath, { verbose: console.log });

// --- MULTER KONFIGURATION (För bilduppladdning) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', 'public', 'images');
        // Skapa mappen om den inte finns
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Skapar ett unikt filnamn: t.ex. 1715782930-mus.jpg
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// --- HJÄLPFUNKTION (Hämtar bilder och fixar highlights) ---
const attachProductImagesAndHighlights = (products) => {
    return products.map(product => {
        const images = db.prepare('SELECT image_url FROM product_images WHERE product_id = ?').all(product.id);
        return {
            ...product,
            images: images.map(img => img.image_url),
            highlights: product.highlights ? product.highlights.split(';') : []
        };
    });
};

// --- ROUTES ---

// Hämta alla produkter
app.get('/api/products', (req, res) => {
    try {
        const products = db.prepare('SELECT * FROM products ORDER BY RANDOM()').all();
        res.json(attachProductImagesAndHighlights(products));
    } catch (err) {
        res.status(500).json({ error: "Kunde inte hämta produkter" });
    }
});

// Hämta EN specifik produkt
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    try {
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
        if (!product) {
            return res.status(404).json({ error: "Produkten hittades inte" });
        }
        const completeProduct = attachProductImagesAndHighlights([product])[0];
        res.json(completeProduct);
    } catch (err) {
        res.status(500).json({ error: "Internt serverfel" });
    }
});

// Hämta produkter per kategori
app.get('/api/products/category/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;
    try {
        const sql = `
            SELECT p.* FROM products p
            JOIN product_categories pc ON p.id = pc.product_id
            JOIN categories c ON pc.category_id = c.id
            WHERE c.name = ?
        `;
        const products = db.prepare(sql).all(categoryName);
        res.json(attachProductImagesAndHighlights(products));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Hämta alla kategorier (Behövs för din dropdown i AddProduct)
app.get('/api/categories', (req, res) => {
    try {
        const categories = db.prepare('SELECT * FROM categories').all();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Kunde inte hämta kategorier" });
    }
});

// Sökfunktion
app.get('/api/search', (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) return res.json([]);
    try {
        const sql = `
            SELECT * FROM products 
            WHERE name LIKE ? 
            OR description LIKE ?
        `;
        const products = db.prepare(sql).all(`%${searchTerm}%`, `%${searchTerm}%`);
        res.json(attachProductImagesAndHighlights(products));
    } catch (err) {
        res.status(500).json({ error: "Sökningen misslyckades" });
    }
});

// LÄGG TILL PRODUKT (Hanterar både fil-uppladdning och text-data)
app.post('/api/products', upload.single('imageFile'), (req, res) => {
    const { name, price, description, highlights, category_name, imageUrl } = req.body;

    try {
        // 1. Hämta category_id baserat på namnet från dropdownen
        const category = db.prepare('SELECT id FROM categories WHERE name = ?').get(category_name);
        if (!category) {
            return res.status(400).json({ error: "Kategorin hittades inte" });
        }

        // 2. Bestäm vilken bild-sträng som ska användas
        let finalImageUrl = imageUrl; 
        if (req.file) {
            // Om en fil laddades upp, använd den lokala sökvägen
            finalImageUrl = `/images/${req.file.filename}`;
        }

        // 3. Starta en transaktion för att säkerställa att allt sparas rätt
        const insertProduct = db.prepare('INSERT INTO products (name, price, description, highlights) VALUES (?, ?, ?, ?)');
        const result = insertProduct.run(name, price, description, highlights);
        const productId = result.lastInsertRowid;

        // Spara bilden
        db.prepare('INSERT INTO product_images (product_id, image_url) VALUES (?, ?)').run(productId, finalImageUrl);

        // Koppla till rätt kategori
        db.prepare('INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)').run(productId, category.id);

        res.status(201).json({ message: "Produkten har lagts till!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Radera en produkt baserat på ID (Säkrast och matchar din frontend)
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;

    try {
        const deleteTransaction = db.transaction(() => {
            // 1. Radera bilder som tillhör produkten
            db.prepare('DELETE FROM product_images WHERE product_id = ?').run(productId);
            
            // 2. Radera kategorikopplingar
            db.prepare('DELETE FROM product_categories WHERE product_id = ?').run(productId);
            
            // 3. Radera själva produkten
            const result = db.prepare('DELETE FROM products WHERE id = ?').run(productId);
            return result;
        });

        const info = deleteTransaction();

        // Kontrollera om någon rad faktiskt raderades
        if (info.changes > 0) {
            res.json({ message: "Produkten har raderats från databasen." });
        } else {
            res.status(404).json({ error: "Kunde inte hitta produkten i databasen." });
        }
    } catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ error: "Kunde inte radera: " + err.message });
    }
});

// Starta servern
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server körs på port ${PORT}`);
});