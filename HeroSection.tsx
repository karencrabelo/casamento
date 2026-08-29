import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, Clock, Download, ExternalLink, Sparkles, ChevronDown } from 'lucide-react';
import { WeddingConfig } from '../types';
import { DelicateBlossom, ViolaBlossom, LavenderSprig, FloralCornerTopLeft, FloralCornerTopRight, FloralDivider } from './FloralDecorations';

interface HeroSectionProps {
  config: WeddingConfig;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

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

  const customFontStyle = config.customFontName ? { fontFamily: `'${config.customFontName}', 'Fairy Ballerina', cursive` } : undefined;

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(config.weddingDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.weddingDate]);

  // Calendar Links Generator
  const generateGoogleCalendarUrl = () => {
    const startDate = new Date(config.weddingDate);
    const endDate = new Date(startDate.getTime() + 7 * 60 * 60 * 1000);
    const formatCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const title = encodeURIComponent(`Casamento de ${config.groomName} & ${config.brideName}`);
    const details = encodeURIComponent(`${config.tagline}\nConfirmação e detalhes no site!\nHashtag: ${config.hashtag}`);
    const location = encodeURIComponent(`${config.venueName}, ${config.venueAddress}, ${config.venueCity}`);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatCalDate(startDate)}/${formatCalDate(endDate)}&details=${details}&location=${location}`;
  };

  const downloadIcsFile = () => {
    const startDate = new Date(config.weddingDate);
    const endDate = new Date(startDate.getTime() + 7 * 60 * 60 * 1000);
    const formatCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Casamento//PT-BR',
      'BEGIN:VEVENT',
      `SUMMARY:Casamento de ${config.groomName} & ${config.brideName}`,
      `DESCRIPTION:${config.tagline} - ${config.hashtag}`,
      `LOCATION:${config.venueName}, ${config.venueAddress}, ${config.venueCity}`,
      `DTSTART:${formatCalDate(startDate)}`,
      `DTEND:${formatCalDate(endDate)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `casamento-${config.groomName.toLowerCase()}-${config.brideName.toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCalendarOpen(false);
  };

  return (
    <section id="inicio" className="relative min-h-[96vh] flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 overflow-hidden">
      {/* Background with soft romantic floral atmosphere */}
      <div className="absolute inset-0 -z-10 bg-[#FAF7F2]">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Flores e Casamento Romântico"
          className="w-full h-full object-cover object-center opacity-15 filter brightness-105"
        />
        {/* Soft floral gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/75 to-[#FAF7F2]" />
      </div>

      {/* Decorative Botanical Corners */}
      <FloralCornerTopLeft className="absolute top-12 left-0 w-36 sm:w-56 h-36 sm:h-56 opacity-85 z-0" />
      <FloralCornerTopRight className="absolute top-12 right-0 w-36 sm:w-56 h-36 sm:h-56 opacity-85 z-0" />

      {/* Floating subtle blooms in background */}
      <div className="absolute top-1/4 left-8 opacity-40 pointer-events-none hidden lg:block animate-gentle-float">
        <ViolaBlossom size={48} />
      </div>
      <div className="absolute top-1/3 right-10 opacity-40 pointer-events-none hidden lg:block animate-gentle-float">
        <DelicateBlossom size={52} />
      </div>
      <div className="absolute bottom-20 left-12 opacity-50 pointer-events-none hidden sm:block">
        <LavenderSprig height={80} className="rotate-12" />
      </div>
      <div className="absolute bottom-20 right-12 opacity-50 pointer-events-none hidden sm:block">
        <LavenderSprig height={80} className="-rotate-12" />
      </div>

      {/* Main Wedding Hero Card with botanical frame */}
      <div className="max-w-3xl mx-auto w-full relative z-10 space-y-6">
        
        {/* Romantic Invitation Card Panel */}
        <div className="bg-[#FAF7F2]/90 backdrop-blur-md rounded-[2.5rem] border border-[#5E693D]/25 shadow-xl p-8 sm:p-12 relative overflow-hidden">
          
          {/* Subtle inside borders */}
          <div className="absolute inset-3 rounded-[2rem] border border-[#5E693D]/15 pointer-events-none" />
          <div className="absolute inset-4 rounded-[1.75rem] border border-[#E89CAE]/20 pointer-events-none" />

          {/* Top Monogram Seal */}
          <div className="flex justify-center mb-2">
            {config.monogramImageUrl ? (
              <div className="relative group">
                <img
                  src={config.monogramImageUrl}
                  alt={`Monograma ${config.brideName} & ${config.groomName}`}
                  referrerPolicy="no-referrer"
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full border-2 border-[#5E693D]/30 bg-[#FAF7F2] flex items-center justify-center shadow-xs">
                <span className={`${getFontClass()} text-3xl text-[#5E693D]`} style={customFontStyle}>
                  {config.initials}
                </span>
              </div>
            )}
          </div>

          {/* Parents blessing / Invitation Header */}
          <p className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.25em] text-[#5E693D] font-medium mb-1">
            Com a bênção de Deus e de seus pais
          </p>

          {/* Couple Names Styled like the invitation */}
          <div className="py-2">
            <h1 className={`${getFontClass()} text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#5E693D] leading-tight font-normal tracking-wide drop-shadow-xs`} style={customFontStyle}>
              {config.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-[-8px]">
              <div className="h-px w-12 bg-[#5E693D]/30" />
              <span className="font-serif-cormorant italic text-3xl sm:text-4xl text-[#E89CAE]">&</span>
              <div className="h-px w-12 bg-[#5E693D]/30" />
            </div>
            <h1 className={`${getFontClass()} text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#5E693D] leading-tight font-normal tracking-wide drop-shadow-xs`} style={customFontStyle}>
              {config.brideName}
            </h1>
          </div>

          {/* Invitation Text */}
          <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#6B5E4F] max-w-lg mx-auto mb-4 font-normal">
            Convidam com muita alegria para a celebração do seu casamento
          </p>

          {/* Date & Time Floral Divider matching convite.jpg */}
          <FloralDivider text="22 • DEZEMBRO • 2026" />

          {/* Time & Day */}
          <div className="space-y-1 my-3">
            <p className="font-montserrat text-sm sm:text-base font-semibold tracking-[0.2em] text-[#5E693D] uppercase">
              Terça-feira • Às 11:00 Horas
            </p>
            <p className="font-serif-cormorant text-xl sm:text-2xl text-[#3D4428] font-semibold">
              {config.venueName}
            </p>
            <p className="font-montserrat text-xs sm:text-sm text-[#73685B] tracking-wide">
              {config.venueAddress} • {config.venueCity}
            </p>
          </div>

          {/* Scripture Verse */}
          <div className="mt-6 pt-5 border-t border-[#5E693D]/15 max-w-xl mx-auto">
            <p className="font-serif-cormorant italic text-base sm:text-lg text-[#5E693D] leading-relaxed">
              "{config.loveQuote}"
            </p>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-widest text-[#E89CAE] mt-1">
              {config.loveQuoteAuthor}
            </p>
          </div>

        </div>

        {/* Countdown Box */}
        <div id="contagem" className="pt-2">
          <div className="bg-[#FAF7F2]/95 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] border border-[#5E693D]/25 shadow-lg max-w-2xl mx-auto">
            
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-montserrat font-semibold uppercase tracking-[0.2em] text-[#5E693D] mb-4">
              <DelicateBlossom size={20} />
              <span>Contagem Regressiva para o Sim</span>
              <DelicateBlossom size={20} />
            </div>

            {timeLeft.isPast ? (
              <div className="text-[#5E693D] font-great-vibes text-3xl py-4">
                O grande dia chegou! Estamos celebrando este amor para sempre!
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                {/* Days */}
                <div className="bg-white/80 border border-[#5E693D]/20 rounded-2xl p-3 sm:p-4 shadow-xs">
                  <span className="block font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#5E693D]">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#849563] font-semibold font-montserrat">
                    Dias
                  </span>
                </div>

                {/* Hours */}
                <div className="bg-white/80 border border-[#5E693D]/20 rounded-2xl p-3 sm:p-4 shadow-xs">
                  <span className="block font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#5E693D]">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#849563] font-semibold font-montserrat">
                    Horas
                  </span>
                </div>

                {/* Minutes */}
                <div className="bg-white/80 border border-[#5E693D]/20 rounded-2xl p-3 sm:p-4 shadow-xs">
                  <span className="block font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#5E693D]">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#849563] font-semibold font-montserrat">
                    Minutos
                  </span>
                </div>

                {/* Seconds */}
                <div className="bg-white/80 border border-[#5E693D]/20 rounded-2xl p-3 sm:p-4 shadow-xs">
                  <span className="block font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#E89CAE]">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#849563] font-semibold font-montserrat">
                    Segundos
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <a
            href="#rsvp"
            className="flex items-center gap-2 px-7 sm:px-9 py-3.5 rounded-full bg-[#5E693D] hover:bg-[#4E5833] text-white font-montserrat font-semibold text-xs sm:text-sm uppercase tracking-widest shadow-md transition-all hover:scale-105 active:scale-95 border border-[#5E693D]/30 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-current text-[#F2B2C2]" />
            <span>Confirmar Presença</span>
          </a>

          {/* Calendar dropdown menu */}
          <div className="relative">
            <button
              onClick={() => setCalendarOpen(!calendarOpen)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#5E693D] font-montserrat font-medium text-xs sm:text-sm border border-[#5E693D]/30 shadow-xs backdrop-blur-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#5E693D]" />
              <span>Salvar na Agenda</span>
              <ChevronDown className="w-4 h-4 text-[#849563]" />
            </button>

            {calendarOpen && (
              <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 w-64 bg-[#FAF7F2] border border-[#5E693D]/30 rounded-2xl shadow-xl p-2 z-30 text-left">
                <a
                  href={generateGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCalendarOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#EFECE4] text-[#4A4238] text-xs font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#5E693D]" />
                  <span>Google Agenda</span>
                </a>
                <button
                  onClick={downloadIcsFile}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#EFECE4] text-[#4A4238] text-xs font-medium text-left transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#5E693D]" />
                  <span>Apple / Outlook (.ICS)</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Down indicator */}
      <a
        href="#historia"
        className="mt-8 text-[#5E693D] hover:text-[#363D2B] transition-colors animate-bounce p-2 cursor-pointer z-10"
        aria-label="Rolar para ver nossa história"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
