const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, '..', 'db', 'db-manager.db');
const db = new Database(dbPath, { verbose: console.log });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', '..', 'client', 'public', 'images');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

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


app.get('/api/products', (req, res) => {
    try {
        // Vi ändrade från ORDER BY RANDOM() till ORDER BY id ASC
        const products = db.prepare('SELECT * FROM products ORDER BY id ASC').all();
        res.json(attachProductImagesAndHighlights(products));
    } catch (err) {
        res.status(500).json({ error: "Kunde inte hämta produkter" });
    }
});

app.get('/api/products/name/:name', (req, res) => {
    const param = decodeURIComponent(req.params.name);
    
    try {
        let product;
        
        if (!isNaN(param)) {
            product = db.prepare('SELECT * FROM products WHERE id = ?').get(param);
        } else {
            product = db.prepare('SELECT * FROM products WHERE name LIKE ?').get(param);
        }
        
        if (!product) {
            return res.status(404).json({ error: "Produkten hittades inte" });
        }
        
        // Vi kopplar på bilderna och dina highlights
        const completeProduct = attachProductImagesAndHighlights([product])[0];
        res.json(completeProduct);
        
    } catch (err) {
        res.status(500).json({ error: "Internt serverfel" });
    }
});

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

app.get('/api/categories', (req, res) => {
    try {
        const categories = db.prepare('SELECT * FROM categories').all();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Kunde inte hämta kategorier" });
    }
});

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

app.post('/api/products', upload.single('imageFile'), (req, res) => {
    const { name, price, description, highlights, category_name, imageUrl } = req.body;

    try {
        const category = db.prepare('SELECT id FROM categories WHERE name = ?').get(category_name);
        if (!category) {
            return res.status(400).json({ error: "Kategorin hittades inte" });
        }

        let finalImageUrl = imageUrl; 
        if (req.file) {
            finalImageUrl = `/images/${req.file.filename}`;
        }

        const insertProduct = db.prepare('INSERT INTO products (name, price, description, highlights) VALUES (?, ?, ?, ?)');
        const result = insertProduct.run(name, price, description, highlights);
        const productId = result.lastInsertRowid;

        db.prepare('INSERT INTO product_images (product_id, image_url) VALUES (?, ?)').run(productId, finalImageUrl);

        db.prepare('INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)').run(productId, category.id);

        res.status(201).json({ message: "Produkten har lagts till!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

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