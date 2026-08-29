import React, { useState, useEffect } from 'react';
import { WeddingConfig, RSVPResponse } from './types';
import { defaultWeddingData } from './data/defaultWeddingData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { DayDetailsSection } from './components/DayDetailsSection';
import { ScheduleSection } from './components/ScheduleSection';
import { SpecialTouchesSection } from './components/SpecialTouchesSection';
import { LocationSection } from './components/LocationSection';
import { RSVPSection } from './components/RSVPSection';
import { GiftRegistrySection } from './components/GiftRegistrySection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { GuestListModal } from './components/GuestListModal';
import { EditWeddingModal } from './components/EditWeddingModal';
import { LoginModal } from './components/LoginModal';

const WEDDING_CONFIG_KEY = 'wedding_website_config_v1';
const RSVP_STORAGE_KEY = 'wedding_website_rsvps_v1';
const ADMIN_AUTH_KEY = 'wedding_website_admin_auth_v1';

// Initial sample RSVPs to demonstrate features
const initialSampleRSVPs: RSVPResponse[] = [
  {
    id: 'sample-1',
    guestName: 'Lucas Ferreira & Camila Souza',
    phone: '(11) 98765-4321',
    email: 'lucas.camila@email.com',
    isAttending: true,
    adultsCount: 2,
    childrenCount: 1,
    companionNames: ['Camila Souza', 'Enzo (filho)'],
    dietaryRestrictions: 'Vegetariano',
    favoriteSong: 'Coldplay - A Sky Full of Stars',
    messageToCouple: 'Que honra celebrar com vocês! Estaremos lá com certeza para brindar muito!',
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'sample-2',
    guestName: 'Beatriz Albuquerque',
    phone: '(11) 97654-3210',
    email: 'bia.albuquerque@email.com',
    isAttending: true,
    adultsCount: 1,
    childrenCount: 0,
    companionNames: [],
    dietaryRestrictions: 'Sem Glúten (Celíaco)',
    favoriteSong: 'Dua Lipa - Levitating',
    messageToCouple: 'Mari e Gabriel, contem comigo na primeira fila da cerimônia e até o fim da pista!',
    submittedAt: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(() => {
    try {
      const saved = localStorage.getItem(WEDDING_CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure Camicado is properly configured and remove unwanted legacy links if present
        if (Array.isArray(parsed.giftRegistryLinks)) {
          const filteredLinks = parsed.giftRegistryLinks.filter((item: any) => {
            const name = (item.name || '').toLowerCase();
            const url = (item.url || '').toLowerCase();
            return !name.includes('fast shop') && !url.includes('fastshop') && !name.includes('cotas de lua');
          });

          // Ensure Camicado has the exact updated URL
          parsed.giftRegistryLinks = filteredLinks.map((item: any) => {
            if (item.name?.toLowerCase().includes('camicado') || item.url?.includes('camicado.com.br')) {
              return {
                ...item,
                url: 'https://lista.camicado.com.br/casamento_karenejhonathan'
              };
            }
            return item;
          });

          if (parsed.giftRegistryLinks.length === 0) {
            parsed.giftRegistryLinks = defaultWeddingData.giftRegistryLinks;
          }
        }

        // Ensure default soundtrack is set to Vocaroo if not customized with another valid URL
        if (!parsed.soundtrackVocarooId && (!parsed.soundtrackUrl || parsed.soundtrackType === 'synth')) {
          parsed.soundtrackTitle = defaultWeddingData.soundtrackTitle;
          parsed.soundtrackArtist = defaultWeddingData.soundtrackArtist;
          parsed.soundtrackType = defaultWeddingData.soundtrackType;
          parsed.soundtrackVocarooId = defaultWeddingData.soundtrackVocarooId;
          parsed.soundtrackUrl = defaultWeddingData.soundtrackUrl;
          parsed.soundtrackEmbedCode = defaultWeddingData.soundtrackEmbedCode;
        }

        return { ...defaultWeddingData, ...parsed };
      }
    } catch (e) {
      console.error('Error loading config from localStorage', e);
    }
    return defaultWeddingData;
  });

  const [rsvps, setRsvps] = useState<RSVPResponse[]>(() => {
    try {
      const saved = localStorage.getItem(RSVP_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading rsvps from localStorage', e);
    }
    return initialSampleRSVPs;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGuestListModalOpen, setIsGuestListModalOpen] = useState(false);

  // Admin authentication (protects the edit panel and guest list panel)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingAdminAction, setPendingAdminAction] = useState<'edit' | 'guestlist' | null>(null);

  const requestEditModal = () => {
    if (isAdminAuthenticated) {
      setIsEditModalOpen(true);
    } else {
      setPendingAdminAction('edit');
      setIsLoginModalOpen(true);
    }
  };

  const requestGuestListModal = () => {
    if (isAdminAuthenticated) {
      setIsGuestListModalOpen(true);
    } else {
      setPendingAdminAction('guestlist');
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } catch (e) {
      console.error('Error saving admin session', e);
    }
    setIsLoginModalOpen(false);

    if (pendingAdminAction === 'edit') {
      setIsEditModalOpen(true);
    } else if (pendingAdminAction === 'guestlist') {
      setIsGuestListModalOpen(true);
    }
    setPendingAdminAction(null);
  };

  // Dynamic custom font loader (e.g. for custom Fairy Ballerina .ttf/.woff2 link)
  useEffect(() => {
    if (config.customFontUrl && config.customFontUrl.trim()) {
      const styleId = 'custom-wedding-font-face';
      let styleTag = document.getElementById(styleId) as HTMLStyleElement;
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
      const fontName = config.customFontName?.trim() || 'Fairy Ballerina';
      styleTag.innerHTML = `
        @font-face {
          font-family: '${fontName}';
          src: url('${config.customFontUrl}') format('woff2'),
               url('${config.customFontUrl}') format('truetype'),
               url('${config.customFontUrl}') format('opentype');
          font-display: swap;
        }
      `;
    }
  }, [config.customFontUrl, config.customFontName]);

  // Save config changes to localStorage
  const handleSaveConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(WEDDING_CONFIG_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Error saving config', e);
    }
  };

  // Add new RSVP response
  const handleNewRSVP = (newRSVP: RSVPResponse) => {
    const updated = [newRSVP, ...rsvps];
    setRsvps(updated);
    try {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving RSVP', e);
    }
  };

  // Delete RSVP item
  const handleDeleteRSVP = (id: string) => {
    const updated = rsvps.filter((r) => r.id !== id);
    setRsvps(updated);
    try {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error deleting RSVP', e);
    }
  };

  // Clear all RSVPs
  const handleClearAllRSVPs = () => {
    setRsvps([]);
    try {
      localStorage.removeItem(RSVP_STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing RSVPs', e);
    }
  };

  const confirmedCount = rsvps
    .filter((r) => r.isAttending)
    .reduce((acc, r) => acc + (r.adultsCount || 0) + (r.childrenCount || 0), 0);

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#4A4238] font-sans-body selection:bg-[#8B9A7A]/25 selection:text-[#313A29]">
      
      {/* Navigation Bar */}
      <Navbar
        config={config}
        onOpenEditModal={requestEditModal}
        onOpenGuestListModal={requestGuestListModal}
        rsvpCount={confirmedCount}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero & Countdown */}
        <HeroSection config={config} />

        {/* 2. Story */}
        <StorySection config={config} />

        {/* 3. Day Details & Dress Code */}
        <DayDetailsSection config={config} />

        {/* 4. Schedule */}
        <ScheduleSection config={config} />

        {/* 5. Special Touches */}
        <SpecialTouchesSection config={config} />

        {/* 6. Location & Maps */}
        <LocationSection config={config} />

        {/* 7. RSVP Confirmação de Presença */}
        <RSVPSection config={config} onNewRSVP={handleNewRSVP} />

        {/* 8. Gift Registry & PIX */}
        <GiftRegistrySection config={config} />

        {/* 9. FAQ */}
        <FAQSection config={config} />
      </main>

      {/* Footer */}
      <Footer config={config} />

      {/* Ambient Romantic Music Player */}
      <AudioPlayer config={config} />

      {/* Modal: Guest List Management (RSVPs) */}
      <GuestListModal
        isOpen={isGuestListModalOpen}
        onClose={() => setIsGuestListModalOpen(false)}
        rsvps={rsvps}
        onDeleteRSVP={handleDeleteRSVP}
        onClearAll={handleClearAllRSVPs}
      />

      {/* Modal: Edit Couple Details */}
      <EditWeddingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />

      {/* Modal: Admin Login (gate for edit panel & guest list) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setPendingAdminAction(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
