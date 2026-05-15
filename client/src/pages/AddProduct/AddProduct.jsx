import React, { useState, useEffect } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [uploadType, setUploadType] = useState('file'); // 'file' eller 'url'
  const [message, setMessage] = useState({ text: '', isError: false });
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    highlights: '',
    category_name: '',
    imageUrl: '',
    imageFile: null
  });

  // Hämta kategorier för dropdown-menyn
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Kunde inte hämta kategorier:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: 'Sparar produkt...', isError: false });

    // FormData krävs för att skicka filer (bilder) till backend
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('highlights', formData.highlights);
    data.append('category_name', formData.category_name);
    
    if (uploadType === 'file') {
      data.append('imageFile', formData.imageFile);
    } else {
      data.append('imageUrl', formData.imageUrl);
    }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setMessage({ text: '✅ Produkten har lagts till i butiken!', isError: false });
        // Återställ formuläret till startläge
        setFormData({ 
          name: '', price: '', description: '', highlights: '', 
          category_name: '', imageUrl: '', imageFile: null 
        });
      } else {
        const errorData = await response.json();
        setMessage({ text: `❌ Fel: ${errorData.error}`, isError: true });
      }
    } catch (err) {
      setMessage({ text: '❌ Serverfel vid uppladdning.', isError: true });
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <header className="form-header">
          <h2>Lägg till ny produkt</h2>
          <p>Fyll i informationen nedan för att publicera en ny vara i shoppen.</p>
        </header>

        {message.text && (
          <div className={`message-banner ${message.isError ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="standard-form">
          <div className="form-row">
            <div className="form-group">
              <label>Produktnamn</label>
              <input 
                type="text" 
                placeholder="t.ex. Gamingmonitor 27\"
                value={formData.name || ''} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label>Pris (kr)</label>
              <input 
                type="number" 
                placeholder="999"
                value={formData.price || ''} 
                onChange={e => setFormData({...formData, price: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Kategori</label>
            <select 
              value={formData.category_name || ''} 
              onChange={e => setFormData({...formData, category_name: e.target.value})}
              required
            >
              <option value="">-- Välj en kategori --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Bildkälla</label>
            <div className="toggle-container">
              <button 
                type="button" 
                className={uploadType === 'file' ? 'active' : ''} 
                onClick={() => setUploadType('file')}
              >
                Ladda upp fil
              </button>
              <button 
                type="button" 
                className={uploadType === 'url' ? 'active' : ''} 
                onClick={() => setUploadType('url')}
              >
                Använd Bild-URL
              </button>
            </div>
            
            {uploadType === 'file' ? (
              <div className="file-input-wrapper">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setFormData({...formData, imageFile: e.target.files[0]})}
                  required 
                />
              </div>
            ) : (
              <input 
                type="text" 
                placeholder="https://images.com/product.jpg"
                value={formData.imageUrl || ''} 
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                required 
              />
            )}
          </div>

          <div className="form-group">
            <label>Beskrivning</label>
            <textarea 
              placeholder="Beskriv produktens egenskaper..."
              value={formData.description || ''} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              required 
            />
          </div>

          <div className="form-group">
            <label>Specifikationer (separera med semikolon ; )</label>
            <input 
              type="text" 
              placeholder="144Hz; 1ms; IPS-panel"
              value={formData.highlights || ''} 
              onChange={e => setFormData({...formData, highlights: e.target.value})}
            />
          </div>

          <button type="submit" className="save-btn">Publicera produkt</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;