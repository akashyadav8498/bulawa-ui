export const INITIAL_TEMPLATE = {
  id: 'draft',
  slug: 'editorial-wedding-demo',
  theme: {
    primaryColor: '#8a7350', // Muted Gold
    secondaryColor: '#4a4036', // Deep Earthy Brown
    accentColor: '#d6c5b3',
    backgroundColor: '#faf9f6', // Warm Ivory
    textColor: '#2c2a29',
    headingFont: '"Playfair Display", serif',
    bodyFont: '"Inter", sans-serif'
  },
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sections: [
    {
      id: 'sec-hero-1',
      type: 'hero',
      label: 'Hero',
      variant: 'editorial',
      data: {
        eyebrow: 'THE WEDDING OF',
        title: 'Arjun & Priya',
        date: 'December 14, 2026',
        backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
        overlayOpacity: 40,
        alignment: 'center'
      }
    },
    {
      id: 'sec-inv-1',
      type: 'invitation-message',
      label: 'Invitation Message',
      variant: 'minimal',
      data: {
        message: 'Together with their families, invite you to share in the joy of their wedding celebration.',
        family: 'The Sharma & Verma Families',
        alignment: 'center'
      }
    },
    {
      id: 'sec-evt-1',
      type: 'events',
      label: 'Celebrations',
      variant: 'editorial-alternating',
      data: {
        events: [
          {
            id: 'e1',
            title: 'Haldi Ceremony',
            date: 'Dec 13, 2026',
            time: '10:00 AM',
            description: 'Join us for a morning of colors, laughter, and blessings as we kick off the celebrations.',
            venueName: 'The Royal Gardens',
            address: '123 Heritage Way, Udaipur'
          },
          {
            id: 'e2',
            title: 'Sangeet Night',
            date: 'Dec 13, 2026',
            time: '7:00 PM',
            description: 'An evening of music, dance, and celebration.',
            venueName: 'The Grand Ballroom',
            address: '123 Heritage Way, Udaipur'
          },
          {
            id: 'e3',
            title: 'The Wedding',
            date: 'Dec 14, 2026',
            time: '4:00 PM',
            description: 'The traditional wedding ceremony followed by reception.',
            venueName: 'Sunset Pavilion',
            address: '123 Heritage Way, Udaipur'
          }
        ]
      }
    },
    {
      id: 'sec-story-1',
      type: 'couple-story',
      label: 'Our Story',
      data: {
        heading: 'How We Met',
        text: 'It all started with a cup of coffee...',
        imagePosition: 'left'
      }
    },
    {
      id: 'sec-gal-1',
      type: 'gallery',
      label: 'Gallery',
      data: {
        columns: 3,
        images: [
          { id: 'g1', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800' },
          { id: 'g2', url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800' },
          { id: 'g3', url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800' }
        ]
      }
    },
    {
      id: 'sec-venue-1',
      type: 'venue',
      label: 'Venue',
      data: {
        venueName: 'Heritage Palace Udaipur',
        address: '123 Heritage Way, Udaipur, Rajasthan'
      }
    },
    {
      id: 'sec-info-1',
      type: 'important-details',
      label: 'Important Details',
      data: {
        items: [
          { id: 'i1', category: 'Travel', title: 'Getting Here', description: 'Nearest airport is Udaipur (UDR).' },
          { id: 'i2', category: 'Accommodation', title: 'Where to Stay', description: 'Rooms have been blocked at the Heritage Palace.' },
          { id: 'i3', category: 'Dress Code', title: 'Attire', description: 'Traditional Indian or Formal Evening Wear.' }
        ]
      }
    },
    {
      id: 'sec-rsvp-1',
      type: 'rsvp',
      label: 'RSVP',
      data: {
        heading: 'Kindly Reply',
        intro: 'Please let us know if you can make it.',
        deadline: 'Nov 14, 2026'
      }
    },
    {
      id: 'sec-count-1',
      type: 'countdown',
      label: 'Countdown',
      data: {
        targetDate: '2026-12-14T16:00:00Z'
      }
    },
    {
      id: 'sec-footer-1',
      type: 'footer',
      label: 'Footer',
      data: {
        text: 'Made with love on Bulawa',
        alignment: 'center'
      }
    }
  ]
};
