const express = require('express');
const router = express.Router();
const ragService = require('../services/ragService');
const { supabase } = require('../config/supabase');

router.post('/query', async (req, res) => {
  try {
    console.log("[BACKEND] Received POST /api/chatbot/query", req.body);

    const { email, query } = req.body;

    if (!email || !query) {
      console.log("[BACKEND] Missing email or query");
      return res.status(400).json({ error: 'Email and query are required' });
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📩 New query from: ${email}`);
    console.log(`❓ Query: "${query}"`);

    // Use ragService to process the query
    const result = await ragService.processQuery(email, query);

    // Log query and response in Supabase
    await supabase.from('query_logs').insert({
      author_email: email,
      query: query,
      response: result.response,
      confidence: result.confidence,
      escalated: result.escalate,
    });

    console.log("[BACKEND] Sending response:", {
      response: result.response,
      confidence: result.confidence,
      escalate: result.escalate,
      sources: result.sources,
    });

    console.log(`✅ Response sent (escalate: ${result.escalate})`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    return res.json({
      response: result.response,
      confidence: result.confidence,
      escalate: result.escalate,
      sources: result.sources,
    });
  } catch (error) {
    console.error('❌ Chatbot endpoint error:', error);
    res.status(500).json({
      response: "System error. Please try again later.",
      escalate: true,
    });
  }
});

module.exports = router;
