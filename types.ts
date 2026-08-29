export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  image: string;
  iconName?: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: string;
  location?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'traje' | 'local' | 'presenca' | 'presentes' | 'geral';
}

export interface SpecialTouch {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  highlight?: string;
  actionText?: string;
  actionUrl?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  description?: string;
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  initials: string;
  weddingDate: string; // ISO format e.g. "2026-11-14T16:30:00"
  weddingDateFormatted: string; // e.g. "14 de Novembro de 2026 às 16:30"
  tagline: string;
  loveQuote: string;
  loveQuoteAuthor?: string;
  hashtag: string;
  
  // Location
  venueName: string;
  venueType: string;
  venueAddress: string;
  venueCity: string;
  googleMapsUrl: string;
  wazeUrl: string;
  appleMapsUrl: string;
  parkingInfo: string;
  transferInfo?: string;
  
  // Day Details & Dress code
  dressCodeTitle: string;
  dressCodeSubtitle: string;
  dressCodeDescription: string;
  dressCodeAdvice: string[];
  colorPalette: ColorSwatch[];
  weatherAdvice: string;
  
  // RSVP
  rsvpDeadline: string; // e.g. "20 de Outubro de 2026"
  rsvpWhatsappNumber: string; // e.g. "5511999999999"
  
  // Gifts & Pix
  pixKey: string;
  pixKeyType: string;
  pixReceiverName: string;
  pixBankName: string;
  giftMessage: string;
  giftRegistryLinks: {
    name: string;
    url: string;
    description: string;
  }[];
  
  // Story, Schedule, Special Touches, FAQ
  story: StoryMilestone[];
  schedule: ScheduleItem[];
  specialTouches: SpecialTouch[];
  faqs: FAQItem[];
  
  // Soundtrack & Audio
  soundtrackTitle?: string;
  soundtrackArtist?: string;
  soundtrackType?: 'synth' | 'audio_url' | 'vocaroo';
  soundtrackUrl?: string;
  soundtrackEmbedCode?: string;
  soundtrackVocarooId?: string;
  soundtrackVolume?: number; // 0 to 1
  soundtrackAutoPrompt?: boolean;

  // Typography & Titles / Couple Names Font
  namesFontFamily?: 'fairy_ballerina' | 'oooh_baby' | 'birthstone_bounce' | 'league_script' | 'inspiration' | 'dancing_script' | 'great_vibes' | 'pinyon' | 'parisienne' | 'allura' | 'ephesis' | 'montecarlo' | 'cormorant' | 'custom';
  titlesFontFamily?: 'fairy_ballerina' | 'oooh_baby' | 'birthstone_bounce' | 'league_script' | 'inspiration' | 'dancing_script' | 'great_vibes' | 'pinyon' | 'parisienne' | 'allura' | 'ephesis' | 'montecarlo' | 'cormorant' | 'custom';
  customFontName?: string;
  customFontUrl?: string;

  // Custom Monogram / Seal Image
  monogramImageUrl?: string;
}

export interface RSVPResponse {
  id: string;
  guestName: string;
  phone: string;
  email?: string;
  isAttending: boolean;
  adultsCount: number;
  childrenCount: number;
  companionNames: string[];
  dietaryRestrictions?: string;
  favoriteSong?: string;
  messageToCouple?: string;
  submittedAt: string;
}
