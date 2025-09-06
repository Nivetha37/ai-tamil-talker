import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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

    // Get HuggingFace API response
    const huggingFaceKey = Deno.env.get('HUGGINGFACE_API_KEY');
    if (!huggingFaceKey) {
      throw new Error('HuggingFace API key not configured');
    }

    const systemPrompt = language === 'tamil' 
      ? 'You are a helpful customer support assistant. Respond in Tamil language.'
      : 'You are a helpful customer support assistant. Respond in English language.';

    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingFaceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          past_user_inputs: [],
          generated_responses: [],
          text: message
        },
        parameters: {
          temperature: 0.7,
          max_length: 150
        }
      }),
    });

    let botReply = '';
    let escalated = false;
    
    if (response.ok) {
      const data = await response.json();
      botReply = data.generated_text || 'I apologize, but I encountered an issue. Please try again.';
      
      // Check if bot cannot answer (simple escalation logic)
      if (botReply.length < 10 || botReply.toLowerCase().includes('i don\'t know') || 
          botReply.toLowerCase().includes('cannot help') || botReply.toLowerCase().includes('not sure')) {
        escalated = true;
        botReply = language === 'tamil' 
          ? 'மன்னிக்கவும், எனக்கு தெரியவில்லை. மனித முகவரிடம் அனுப்புகிறேன்.'
          : 'Sorry, I don\'t know. Escalating to human agent.';
      }
    } else {
      console.error('HuggingFace API error:', response.status);
      escalated = true;
      botReply = language === 'tamil' 
        ? 'மன்னிக்கவும், தற்போது சேவையில் சிக்கல் உள்ளது. மனித முகவரிடம் அனுப்புகிறேன்.'
        : 'Sorry, I don\'t know. Escalating to human agent.';
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