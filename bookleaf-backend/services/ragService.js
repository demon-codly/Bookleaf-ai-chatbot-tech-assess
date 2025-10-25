const { supabase } = require('../config/supabase');
const path = require('path');
const fs = require('fs');
const ollamaService = require('./ollamaService');

// Path to KB chunked text file
const kbPath = path.join(__dirname, '../data/BookLeaf.txt');

let knowledgeBaseText = '';
try {
  knowledgeBaseText = fs.readFileSync(kbPath, 'utf-8');
  console.log('✅ Knowledge base file loaded successfully');
} catch (err) {
  console.warn('⚠️ Knowledge base file load failed:', err.message);
}

class RAGService {
  async processQuery(userEmail, query) {
    console.log(`📥 Processing query from ${userEmail}: "${query}"`);

    try {
      // Step 1: Intent classification
      const intent = await ollamaService.classifyIntent(query);
      console.log('🔍 Intent:', intent);

      // Step 2: Retrieve author data
      let authorData = null;
      if (intent.is_author_specific || userEmail) {
        authorData = await this.getAuthorData(intent.author_email || userEmail);
      }

      // Build context
      let context = '';

      if (authorData) {
        context += this.formatAuthorContext(authorData);
      }

      // Append knowledge base chunked content for general FAQ or all cases
      if (knowledgeBaseText) {
        context += `\n\nKnowledge Base Content:\n${knowledgeBaseText}`;
      }

      // Step 3: Generate response using Ollama Gemma 2B
      const response = await ollamaService.generateResponse(query, context);

      // Step 4: Calculate confidence
      const hasContext = (authorData !== null || knowledgeBaseText.length > 0);
      const confidence = await ollamaService.calculateConfidence(query, response, hasContext);
      console.log(`✅ Response generated (confidence: ${(confidence * 100).toFixed(0)}%)`);

      // Step 5: Escalation logic
      const ESCALATION_THRESHOLD = 0.78;
      const shouldEscalate = confidence < ESCALATION_THRESHOLD;


      return {
        response: shouldEscalate
          ? "I'm not entirely confident about this answer. Let me connect you with a human agent who can assist you better."
          : response,
        confidence,
        escalate: shouldEscalate,
        sources: {
          author_data: authorData !== null,
          knowledge_base: knowledgeBaseText.length > 0
        }
      };

    } catch (error) {
      console.error('❌ RAG Service error:', error);
      return {
        response: "I encountered an error processing your request. A support agent will assist you shortly.",
        confidence: 0,
        escalate: true,
        sources: { author_data: false, knowledge_base: false }
      };
    }
  }

  // Fetch author data from Supabase DB
  async getAuthorData(email) {
    if (!email) return null;

    try {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) return null;
      return data;
    } catch (error) {
      console.error('❌ Supabase fetch error:', error);
      return null;
    }
  }

  // Format author data for LLM context
  formatAuthorContext(authorData) {
    return `
Author Information:
- Book Title: ${authorData.book_title}
- Submission Date: ${authorData.final_submission_date}
- Live Date: ${authorData.book_live_date || 'Not yet published'}
- Royalty Status: ${authorData.royalty_status}
- ISBN: ${authorData.isbn}
- Services: ${authorData.add_on_services}
`;
  }
}

module.exports = new RAGService();
