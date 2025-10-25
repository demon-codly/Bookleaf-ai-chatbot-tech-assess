const { Ollama } = require('ollama');

class OllamaService {
  constructor() {
    this.ollama = new Ollama({
      host: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
    });
    this.model = 'gemma2:2b';
  }

  async classifyIntent(query) {
    const prompt = `Analyze this customer query and classify it.
Query: "${query}"
Determine:
1. Is this asking about a SPECIFIC author's book status/data? (yes/no)
2. Is this a GENERAL question about BookLeaf services? (yes/no)
3. Extract author email if mentioned (or return null)
Respond in JSON format:
{
  "is_author_specific": true/false,
  "is_general_faq": true/false,
  "author_email": "email@example.com or null",
  "confidence": 0.0-1.0
}`;
    const response = await this.ollama.chat({
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
      stream: false
    });

    try {
      const content = response.message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return {
        is_author_specific: false,
        is_general_faq: true,
        author_email: null,
        confidence: 0.5
      };
    } catch {
      return {
        is_author_specific: false,
        is_general_faq: true,
        author_email: null,
        confidence: 0.3
      };
    }
  }

  async generateResponse(query, context) {
    // Enhanced prompt to emphasize structured data reliance
    const prompt = `
You are BookLeaf's AI assistant tasked with answering user questions 
using ONLY the following CONTEXTUAL information. Do NOT hallucinate or use information 
outside this context.

=== CONTEXT ===
${context}

=== USER QUESTION ===
${query}

Instructions:
- Prioritize exact data from the Author Information section.
- Use Knowledge Base Answer snippets only for general FAQs.
- If info is unclear or missing, respond politely that you don't have that info.
- Keep answers clear, concise (max 3 sentences), and professional.
- Do NOT provide opinions or make assumptions.
- Format your answers in plain text.

Answer:`;

    try {
      const response = await this.ollama.chat({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      });
      return response.message.content.trim();
    } catch (error) {
      console.error('❌ Ollama generation error:', error);
      return "I'm having trouble processing your request. Please try again later or contact support.";
    }
  }

  async calculateConfidence(query, response, hasContext) {
    let confidence = 0.5;
    if (hasContext) confidence += 0.3;
    if (response.length > 50) confidence += 0.1;

    // Penalize uncertainty language to lower confidence
    const uncertaintyPhrases = [
      'not sure',
      'unclear',
      "don't know",
      'unable to',
      'not applicable',
      'no information',
      'sorry',
      'cannot confirm'
    ];
    for (const phrase of uncertaintyPhrases) {
      if (response.toLowerCase().includes(phrase)) {
        confidence -= 0.4;
        break;
      }
    }
    return Math.min(Math.max(confidence, 0), 1);
  }
}

module.exports = new OllamaService();
