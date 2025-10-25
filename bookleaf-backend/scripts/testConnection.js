const { supabase } = require('../config/supabase');

async function testConnection() {
  console.log('🔌 Testing Supabase connection...');
  
  try {
    // Test 1: Fetch all authors
    const { data: authors, error } = await supabase
      .from('authors')
      .select('*');
    
    if (error) {
      console.error('❌ Error:', error);
      return;
    }
    
    console.log('✅ Connection successful!');
    console.log(`📊 Found ${authors.length} authors in database`);
    console.log('\nSample author:', authors[0]);
    
    // Test 2: Search by email
    const { data: author, error: searchError } = await supabase
      .from('authors')
      .select('*')
      .eq('email', 'author1@example.com')
      .single();
    
    if (searchError) {
      console.error('❌ Search error:', searchError);
      return;
    }
    
    console.log('\n✅ Search by email works!');
    console.log('Found:', author.book_title);
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
  }
}

testConnection();
