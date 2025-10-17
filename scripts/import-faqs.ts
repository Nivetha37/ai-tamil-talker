import { createClient } from '@supabase/supabase-js';
import faqsData from '../public/data/faqs.json';

const SUPABASE_URL = "https://xhfvejtcfizuefpfpnki.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZnZlanRjZml6dWVmcGZwbmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODE3MDksImV4cCI6MjA3Mjc1NzcwOX0.MsXjz5OigtDI-IcCXrsJNp6rzV55cMctm8shIFr52Mc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function importFAQs() {
  console.log(`Starting import of ${faqsData.length} FAQs...`);
  
  // Insert in batches of 100
  const batchSize = 100;
  for (let i = 0; i < faqsData.length; i += batchSize) {
    const batch = faqsData.slice(i, i + batchSize);
    
    const { error } = await supabase
      .from('faqs')
      .insert(batch);
    
    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
    } else {
      console.log(`Imported batch ${i / batchSize + 1} (${batch.length} FAQs)`);
    }
  }
  
  console.log('Import complete!');
}

importFAQs();
