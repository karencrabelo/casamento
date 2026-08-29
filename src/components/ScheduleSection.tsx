import React from 'react';
import { Clock, Users, HeartHandshake, GlassWater, Utensils, Music, Sparkles, MapPin, Heart } from 'lucide-react';
import { WeddingConfig, ScheduleItem } from '../types';
import { DelicateBlossom, ViolaBlossom, FloralDivider } from './FloralDecorations';

interface ScheduleSectionProps {
  config: WeddingConfig;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ config }) => {
  const getScheduleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-[#5E693D]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#5E693D]" />;
      case 'GlassWater':
        return <GlassWater className="w-5 h-5 text-[#5E693D]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#5E693D]" />;
      case 'Music':
        return <Music className="w-5 h-5 text-[#5E693D]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#5E693D] fill-[#E89CAE]/30" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-[#5E693D]" />;
    }
  };

  return (
    <section id="cronograma" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#5E693D]/15 relative text-[#4A4238]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E89CAE]/15 border border-[#E89CAE]/35 text-[#5E693D] text-xs font-montserrat font-medium uppercase tracking-[0.2em]">
            <DelicateBlossom size={16} />
            <span>Itinerário do Casamento</span>
            <DelicateBlossom size={16} />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl lg:text-7xl text-[#5E693D] font-normal py-1">
            Cronograma do Nosso Dia
          </h2>

          <p className="font-serif-cormorant text-lg sm:text-xl text-[#6B5E4F] italic font-normal">
            Acompanhe a programação dos principais momentos para desfrutar de cada instante desse almoço festivo.
          </p>

          <FloralDivider />
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Vertical central bar */}
          <div className="hidden sm:block absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#5E693D]/15 via-[#5E693D]/35 to-[#5E693D]/15 -translate-x-1/2" />

          <div className="space-y-6 sm:space-y-8">
            {config.schedule.map((item: ScheduleItem, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content card */}
                  <div className="w-full sm:w-1/2 pl-14 sm:pl-0 sm:px-8">
                    <div className="bg-white/85 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm hover:shadow-md border border-[#5E693D]/20 transition-all duration-300">
                      
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5E693D]/10 text-[#5E693D] font-montserrat font-semibold text-xs tracking-wider">
                          <Clock className="w-3.5 h-3.5 text-[#5E693D]" />
                          {item.time}
                        </span>

                        {item.location && (
                          <span className="inline-flex items-center gap-1 text-xs text-[#7A7164] font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#E89CAE]" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif-cormorant text-xl sm:text-2xl font-semibold text-[#363D2B] mb-1">
                        {item.title}
                      </h3>

                      <p className="text-[#6B5E4F] text-sm font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Circle Icon Badge */}
                  <div className="absolute left-0 sm:left-1/2 -translate-x-0 sm:-translate-x-1/2 top-5 w-10 h-10 rounded-full bg-[#FAF7F2] border-2 border-[#5E693D] shadow-sm flex items-center justify-center z-10">
                    {getScheduleIcon(item.iconName)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Punctuality Callout */}
        <div className="mt-14 p-6 rounded-[2.5rem] bg-white/80 border border-[#5E693D]/25 text-center max-w-2xl mx-auto text-sm text-[#4A4238] shadow-xs">
          <p className="font-serif-cormorant text-base sm:text-lg text-[#363D2B]">
            ⏰ <strong>Dica de pontualidade:</strong> A nossa celebração terá início às 11:30 pontualmente. Pedimos a gentileza de chegarem a partir das 11:00 para se acomodarem com carinho e tranquilidade.
          </p>
        </div>

      </div>
    </section>
  );
};
