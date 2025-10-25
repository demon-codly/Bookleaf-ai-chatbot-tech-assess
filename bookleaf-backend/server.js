const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'BookLeaf Backend is running' });
});

// Routes
app.use('/api/chatbot', require('./routes/chatbot'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Knowledge Base loaded`);
  console.log(`🤖 Ollama ready for Gemma 2B`);
});
