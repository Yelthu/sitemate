require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// In-memory data store
let dataStore = [];

//load PORT from env
const PORT = process.env.PORT || 8000 //

// Health check route
app.get('/', (req, res) => {
    res.send('hello! api server is healthy!');
});

// Create (POST)
app.post('/api/items/create', (req, res) => {
    const newItem = req.body;
    dataStore.push(newItem);
    res.status(201).json({ message: 'Item created', item: newItem });
});

// Read (GET)
app.get('/api/items/read', (req, res) => {
    res.status(200).json(dataStore);
});

// Update (PUT)
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const index = dataStore.findIndex(item => item.id === id);

    if (index !== -1) {
        dataStore[index] = updatedItem;
        res.status(200).json({ message: 'Item updated', item: updatedItem });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Delete
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const index = dataStore.findIndex(item => item.id === id);

    if (index !== -1) {
        const deletedItem = dataStore.splice(index, 1);
        res.status(200).json({ message: 'Item deleted', item: deletedItem });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});