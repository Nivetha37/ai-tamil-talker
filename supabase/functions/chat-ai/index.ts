import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Simple language detection for Tamil vs English
    const detectLanguage = (text: string): string => {
      // Tamil unicode range check
      const tamilRegex = /[\u0B80-\u0BFF]/;
      return tamilRegex.test(text) ? 'tamil' : 'english';
    };

    const language = detectLanguage(message);
    console.log('Detected language:', language);

    // Query FAQs from database
    const qField = language === 'tamil' ? 'q_ta' : 'q_en';
    const aField = language === 'tamil' ? 'a_ta' : 'a_en';
    
    // Search for FAQs matching keywords in the user's message
    const { data: faqs, error: faqError } = await supabase
      .from('faqs')
      .select('*')
      .limit(500);

    if (faqError) {
      console.error('Error loading FAQs:', faqError);
    }

    console.log(`Loaded ${faqs?.length || 0} FAQs from database`);

    // Find relevant FAQs based on user message using simple keyword matching
    const findRelevantFAQs = (userMessage: string, language: string, faqData: any[], topK = 5) => {
      const messageLower = userMessage.toLowerCase();
      const qField = language === 'tamil' ? 'q_ta' : 'q_en';
      const aField = language === 'tamil' ? 'a_ta' : 'a_en';
      
      // Score each FAQ based on keyword matching
      const scoredFAQs = faqData.map(faq => {
        const question = faq[qField]?.toLowerCase() || '';
        const words = messageLower.split(/\s+/);
        
        // Count matching words
        let matchScore = 0;
        words.forEach(word => {
          if (word.length > 2 && question.includes(word)) {
            matchScore += 1;
          }
        });
        
        // Exact match bonus
        if (question.includes(messageLower) || messageLower.includes(question)) {
          matchScore += 10;
        }
        
        return {
          question: faq[qField],
          answer: faq[aField],
          score: matchScore
        };
      });

      // Return top K FAQs with score > 0
      return scoredFAQs
        .filter(faq => faq.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
    };

    const relevantFAQs = findRelevantFAQs(message, language, faqs || []);
    console.log('Found relevant FAQs:', relevantFAQs.length, relevantFAQs.slice(0, 2));

    // Build context from relevant FAQs
    let contextString = '';
    if (relevantFAQs.length > 0) {
      contextString = relevantFAQs
        .map(faq => `Q: ${faq.question}\nA: ${faq.answer}`)
        .join('\n\n');
    }

    // Get Gemini API response
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const systemPrompt = language === 'tamil' 
      ? `நீங்கள் ஒரு உதவிகரமான வாடிக்கையாளர் ஆதரவு உதவியாளர். தமிழில் பதிலளிக்கவும்.

முக்கியமான வழிமுறைகள்:
- கீழே வழங்கப்பட்ட FAQ தகவலின் அடிப்படையில் மட்டுமே பதிலளிக்கவும்
- FAQ தரவில் பதில் இல்லை என்றால், உங்களுக்குத் தெரியாது என்று சொல்லுங்கள்
- கற்பனை செய்யாதீர்கள் அல்லது FAQ இல் இல்லாத தகவலைச் சேர்க்காதீர்கள்
- தொடர்புடைய FAQ பதிலை நேரடியாகப் பயன்படுத்தவும்

FAQ அறிவு தளம்:
${contextString || 'இந்தக் கேள்விக்கான தகவல் கிடைக்கவில்லை.'}`
      : `You are a helpful customer support assistant. Respond in English language.

CRITICAL INSTRUCTIONS:
- ONLY answer based on the FAQ information provided below
- If the answer is not in the FAQ data, say you don't know and offer to escalate
- DO NOT hallucinate or add information not present in the FAQs
- Use the relevant FAQ answer directly

FAQ Knowledge Base:
${contextString || 'No relevant information found for this query.'}`;

    let botReply = '';
    let escalated = false;
    
    // If no relevant FAQs found, provide helpful guidance instead of immediate escalation
    if (relevantFAQs.length === 0 || relevantFAQs[0].score < 2) {
      botReply = language === 'tamil' 
        ? `மன்னிக்கவும், உங்கள் கேள்விக்கு பொருத்தமான தகவல் என் தரவுத்தளத்தில் இல்லை. 

நான் பின்வரும் தலைப்புகளில் உங்களுக்கு உதவ முடியும்:
- அழகு சேவைகள் மற்றும் நியமனங்கள்
- விலைகள் மற்றும் கட்டண விவரங்கள்
- முன்பதிவு மற்றும் வசதிகள்
- வேறு ஏதாவது குறிப்பிட்ட கேள்வி இருந்தால் கேளுங்கள்

மனித முகவரிடம் பேச விரும்புகிறீர்களா?`
        : `I apologize, but I don't have specific information about your query in my knowledge base.

I can help you with topics related to:
- Beauty services and appointments
- Pricing and payment details
- Booking procedures and facilities
- Any other specific questions you may have

Would you like me to connect you with a human agent for more assistance?`;
      // Don't mark as escalated yet, give user a chance to ask something else
      escalated = false;
    } else {
      try {
        const result = await model.generateContent([
          systemPrompt,
          `User question: ${message}`
        ]);
        
        const response = await result.response;
        botReply = response.text() || 'I apologize, but I encountered an issue. Please try again.';
        
        // Check if bot cannot answer (escalation logic)
        const escalationKeywords = language === 'tamil'
          ? ['தெரியாது', 'தெரியவில்லை', 'இல்லை', 'கிடைக்கவில்லை']
          : ['don\'t know', 'not sure', 'cannot help', 'no information', 'escalat'];
        
        const shouldEscalate = escalationKeywords.some(keyword => 
          botReply.toLowerCase().includes(keyword)
        );
        
        if (botReply.length < 10 || shouldEscalate) {
          escalated = true;
          botReply = language === 'tamil' 
            ? 'மன்னிக்கவும், இந்தக் கேள்விக்கு நான் சரியாக பதிலளிக்க முடியவில்லை. மனித முகவரிடம் அனுப்புகிறேன்.'
            : 'Sorry, I cannot properly answer this question. Escalating to human agent.';
        }
      } catch (error) {
        console.error('Gemini API error:', error);
        escalated = true;
        botReply = language === 'tamil' 
          ? 'மன்னிக்கவும், தற்போது சேவையில் சிக்கல் உள்ளது. மனித முகவரிடம் அனுப்புகிறேன்.'
          : 'Sorry, there is a service issue. Escalating to human agent.';
      }
    }

    console.log('Bot reply:', botReply);

    // Store conversation in Supabase
    const { data, error } = await supabase
      .from('chats')
      .insert({
        user_message: message,
        bot_reply: botReply,
        language: language,
        escalated: escalated
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
    } else {
      console.log('Conversation stored:', data);
    }

    return new Response(JSON.stringify({ 
      reply: botReply, 
      language: language,
      chatId: data?.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ 
      error: 'An unexpected error occurred',
      reply: 'I apologize, but I encountered an issue. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});