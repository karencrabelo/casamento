import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Settings2, CalendarCheck } from 'lucide-react';
import { WeddingConfig } from '../types';
import { DelicateBlossom } from './FloralDecorations';

interface NavbarProps {
  config: WeddingConfig;
  onOpenEditModal: () => void;
  onOpenGuestListModal: () => void;
  rsvpCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenEditModal,
  onOpenGuestListModal,
  rsvpCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFontClass = () => {
    switch (config.namesFontFamily) {
      case 'oooh_baby':
        return 'font-oooh-baby';
      case 'birthstone_bounce':
        return 'font-birthstone-bounce';
      case 'league_script':
        return 'font-league-script';
      case 'inspiration':
        return 'font-inspiration';
      case 'dancing_script':
        return 'font-dancing-script';
      case 'fairy_ballerina':
        return 'font-fairy-ballerina';
      case 'parisienne':
        return 'font-parisienne';
      case 'allura':
        return 'font-allura';
      case 'ephesis':
        return 'font-ephesis';
      case 'montecarlo':
        return 'font-montecarlo';
      case 'cormorant':
        return 'font-serif-cormorant';
      case 'great_vibes':
        return 'font-great-vibes';
      case 'pinyon':
      default:
        return 'font-pinyon';
    }
  };

  const customFontStyle = config.customFontName ? { fontFamily: `'${config.customFontName}', 'Pinyon Script', cursive` } : undefined;

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Contagem', href: '#contagem' },
    { label: 'Nossa História', href: '#historia' },
    { label: 'O Grande Dia', href: '#dia' },
    { label: 'Cronograma', href: '#cronograma' },
    { label: 'Detalhes', href: '#detalhes' },
    { label: 'Local', href: '#local' },
    { label: 'Presentes & Pix', href: '#presentes' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 text-[#4A4238] backdrop-blur-md shadow-sm border-b border-[#5E693D]/20 py-3'
          : 'bg-gradient-to-b from-[#332D26]/75 via-[#332D26]/40 to-transparent text-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram / Brand */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          {config.monogramImageUrl ? (
            <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src={config.monogramImageUrl}
                alt={config.initials}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
              isScrolled
                ? 'border-[#5E693D]/30 bg-[#5E693D]/10 text-[#5E693D]'
                : 'border-[#E89CAE]/60 bg-black/30 text-[#FAF7F2] group-hover:border-[#E89CAE]'
            }`}>
              <span className={`${getFontClass()} text-2xl tracking-wider`} style={customFontStyle}>
                {config.initials}
              </span>
            </div>
          )}
          <div className="flex flex-col text-left">
            <span
              className={`${getFontClass()} font-normal text-2xl sm:text-3xl leading-none tracking-wide transition-colors ${
                isScrolled
                  ? 'text-[#363D2B] group-hover:text-[#5E693D]'
                  : 'text-[#FAF7F2] group-hover:text-white'
              }`}
              style={customFontStyle}
            >
              {config.groomName} <span className="font-serif italic text-lg sm:text-xl text-[#E89CAE]">&</span> {config.brideName}
            </span>
            <span className={`text-[10px] tracking-[0.2em] uppercase font-montserrat mt-0.5 ${
              isScrolled ? 'text-[#5E693D] font-medium' : 'text-[#EFECE4]'
            }`}>
              22 Dezembro 2026
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center space-x-5 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors tracking-widest relative py-1 text-xs uppercase font-montserrat hover:underline underline-offset-4 decoration-[#E89CAE] ${
                isScrolled
                  ? 'text-[#61574A] hover:text-[#5E693D]'
                  : 'text-[#FAF7F2]/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Guest list / stats badge for couple */}
          <button
            onClick={onOpenGuestListModal}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              isScrolled
                ? 'bg-white/80 hover:bg-white text-[#4A4238] border-[#5E693D]/25 shadow-xs'
                : 'bg-black/40 hover:bg-black/60 text-[#FAF7F2] border-white/20'
            }`}
            title="Ver lista de presenças confirmadas"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#5E693D]" />
            <span>Confirmados: <strong className={isScrolled ? 'text-[#5E693D]' : 'text-[#E89CAE]'}>{rsvpCount}</strong></span>
          </button>

          {/* Edit couple settings */}
          <button
            onClick={onOpenEditModal}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isScrolled
                ? 'text-[#5C5346] hover:text-[#363D2B] bg-white/70 hover:bg-white border-[#5E693D]/25'
                : 'text-stone-200 hover:text-white bg-black/30 hover:bg-black/50 border-white/20'
            }`}
            title="Personalizar dados do casal, local, data ou Pix"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Primary RSVP CTA */}
          <a
            href="#rsvp"
            id="nav-rsvp-btn"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-montserrat font-semibold uppercase tracking-wider bg-[#5E693D] hover:bg-[#4E5833] text-white shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-[#F2B2C2]" />
            <span>Confirmar Presença</span>
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href="#rsvp"
            className="sm:hidden flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#5E693D] text-white"
          >
            <Heart className="w-3 h-3 fill-current text-[#F2B2C2]" />
            <span>RSVP</span>
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isScrolled
                ? 'text-[#4A4238] bg-white/80 border-[#5E693D]/25'
                : 'text-white bg-black/30 border-white/20'
            }`}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF7F2] border-b border-[#5E693D]/20 px-5 pt-3 pb-6 space-y-3 shadow-xl backdrop-blur-xl animate-fadeIn text-[#4A4238]">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-[#5E693D]/15">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-[#5C5346] hover:bg-[#EFECE4] hover:text-[#363D2B] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href="#rsvp"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#5E693D] hover:bg-[#4E5833] text-white font-semibold uppercase tracking-widest text-xs shadow-xs"
            >
              <Heart className="w-4 h-4 fill-current text-[#F2B2C2]" />
              <span>Confirmar Presença no Casamento</span>
            </a>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenGuestListModal();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white text-[#4A4238] text-xs font-medium border border-[#5E693D]/25 shadow-xs cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#5E693D]" />
                <span>Confirmados ({rsvpCount})</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEditModal();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-white text-[#5E693D] text-xs font-medium border border-[#5E693D]/25 shadow-xs cursor-pointer"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Personalizar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
