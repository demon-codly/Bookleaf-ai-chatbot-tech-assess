const { Ollama } = require('ollama');
require('dotenv').config();

const ollama = new Ollama({
  host: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
});

module.exports = { ollama };
