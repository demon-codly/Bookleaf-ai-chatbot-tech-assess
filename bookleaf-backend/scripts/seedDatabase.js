const { supabase } = require('../config/supabase');

const mockAuthors = [
  {
    email: 'author1@example.com',
    book_title: 'Amazing Stories',
    final_submission_date: '2025-10-25',
    book_live_date: '2025-11-08',
    royalty_status: 'Paid',
    isbn: '978-1-234567-89-0',
    add_on_services: 'Bestseller Package'
  },
  {
    email: 'author2@example.com',
    book_title: 'Journey to the Stars',
    final_submission_date: '2025-09-15',
    book_live_date: '2025-10-01',
    royalty_status: 'Pending',
    isbn: '978-1-234567-90-6',
    add_on_services: 'Basic Package'
  },
  {
    email: 'author3@example.com',
    book_title: 'Mystery of the Lake',
    final_submission_date: '2025-08-20',
    book_live_date: '2025-09-15',
    royalty_status: 'Paid',
    isbn: '978-1-234567-91-3',
    add_on_services: 'Premium Package'
  },
  {
    email: 'author4@example.com',
    book_title: 'Cooking with Love',
    final_submission_date: '2025-10-10',
    book_live_date: null,
    royalty_status: 'Not Yet Published',
    isbn: '978-1-234567-92-0',
    add_on_services: 'Standard Package'
  },
  {
    email: 'author5@example.com',
    book_title: 'Tech Revolution',
    final_submission_date: '2025-07-05',
    book_live_date: '2025-08-20',
    royalty_status: 'Paid',
    isbn: '978-1-234567-93-7',
    add_on_services: 'Bestseller Package + PR'
  },
  {
    email: 'author6@example.com',
    book_title: 'The Last Adventure',
    final_submission_date: '2025-10-30',
    book_live_date: null,
    royalty_status: 'In Review',
    isbn: '978-1-234567-94-4',
    add_on_services: 'Basic Package'
  },
  {
    email: 'author7@example.com',
    book_title: 'Digital Marketing Guide',
    final_submission_date: '2025-06-12',
    book_live_date: '2025-07-30',
    royalty_status: 'Paid',
    isbn: '978-1-234567-95-1',
    add_on_services: 'Premium Package'
  },
  {
    email: 'author8@example.com',
    book_title: 'History Reimagined',
    final_submission_date: '2025-09-01',
    book_live_date: '2025-10-15',
    royalty_status: 'Pending',
    isbn: '978-1-234567-96-8',
    add_on_services: 'Standard Package'
  }
];

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  try {
    // Clear existing data (optional)
    const { error: deleteError } = await supabase
      .from('authors')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      console.warn('Warning while clearing:', deleteError.message);
    }
    
    // Insert mock data
    const { data, error } = await supabase
      .from('authors')
      .insert(mockAuthors);
    
    if (error) {
      console.error('❌ Error seeding database:', error);
      return;
    }
    
    console.log('✅ Database seeded successfully!');
    console.log(`📊 Inserted ${mockAuthors.length} authors`);
    
  } catch (error) {
    console.error('❌ Seed script error:', error);
  }
}

// Run seed function
seedDatabase();
