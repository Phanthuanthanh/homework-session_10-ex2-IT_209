const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware ho tro parse JSON body
app.use(express.json());

// Co so du lieu mau trong bo nho (In-memory database)
let items = [
  { id: 1, name: 'DevOps Course', description: 'Docker Single-stage build' },
  { id: 2, name: 'Web Backend', description: 'Node.js Express REST API' }
];

// 1. Endpoint goc (Bat buoc theo yeu cau de bai de kiem tra curl)
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Hello from Docker Single-stage!'
  });
});

// 2. Healthcheck endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 3. API REST: Lay toan bo danh sach items
app.get('/api/items', (req, res) => {
  res.json({
    total: items.length,
    data: items
  });
});

// 4. API REST: Lay chi tiet 1 item theo ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// 5. API REST: Them item moi
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newItem = {
    id: items.length + 1,
    name,
    description: description || ''
  };
  items.push(newItem);
  res.status(201).json({
    message: 'Item created successfully',
    data: newItem
  });
});

// Khoi dong server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
