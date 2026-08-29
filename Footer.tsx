import React from 'react';
import { Heart, ChevronUp } from 'lucide-react';
import { WeddingConfig } from '../types';
import { ViolaBlossom, DelicateBlossom } from './FloralDecorations';

interface FooterProps {
  config: WeddingConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <footer className="bg-[#2C3224] text-[#E5EADF] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#E89CAE]/15 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 font-montserrat">
        
        {/* Monogram Seal */}
        <div className="inline-flex items-center justify-center">
          {config.monogramImageUrl ? (
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <img
                src={config.monogramImageUrl}
                alt={config.initials}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="p-2.5 rounded-full border border-[#5E693D]/40 bg-[#38412F] shadow-sm">
              <div className="w-14 h-14 rounded-full border border-dashed border-[#E89CAE]/60 flex items-center justify-center">
                <span className={`${getFontClass()} text-3xl font-normal text-[#E89CAE] tracking-wider`} style={customFontStyle}>
                  {config.initials}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Names & Tagline */}
        <div className="space-y-2">
          <h3 className={`${getFontClass()} text-4xl sm:text-5xl text-[#FAF7F2] font-normal py-1`} style={customFontStyle}>
            {config.brideName} & {config.groomName}
          </h3>
          <p className="text-[#C6D4BD] text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
            {config.weddingDateFormatted} • {config.venueCity}
          </p>
          <p className="font-serif-cormorant text-[#D6DFCF] text-base sm:text-lg italic font-normal max-w-md mx-auto pt-2">
            "O amor não consiste em olhar um para o outro, mas sim em olhar juntos na mesma direção."
          </p>
        </div>

        {/* Hashtag */}
        <div className="inline-flex items-center gap-2 bg-[#38412F] border border-[#5E693D]/50 px-5 py-2 rounded-full text-xs font-mono text-[#FAF7F2]">
          <ViolaBlossom size={14} />
          <span>{config.hashtag}</span>
          <ViolaBlossom size={14} />
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-[#C6D4BD] pt-4 border-t border-[#5E693D]/30">
          <a href="#inicio" className="hover:text-white transition-colors">Início</a>
          <a href="#historia" className="hover:text-white transition-colors">Nossa História</a>
          <a href="#dia" className="hover:text-white transition-colors">O Grande Dia</a>
          <a href="#cronograma" className="hover:text-white transition-colors">Cronograma</a>
          <a href="#detalhes" className="hover:text-white transition-colors">Detalhes</a>
          <a href="#local" className="hover:text-white transition-colors">Localização</a>
          <a href="#rsvp" className="hover:text-[#E89CAE] transition-colors font-semibold">RSVP</a>
          <a href="#presentes" className="hover:text-white transition-colors">Presentes & Pix</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        {/* Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7BA9B] border-t border-[#5E693D]/25">
          <span className="flex items-center gap-1.5">
            Feito com <Heart className="w-3.5 h-3.5 text-[#E89CAE] fill-current inline mx-0.5" /> para celebrar o amor de Jhonathan & Karen.
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#C6D4BD] hover:text-white transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
