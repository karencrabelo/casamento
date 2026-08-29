import React from 'react';
import { MapPin, Navigation, Car, Bus, ExternalLink, Sparkles, CircleCheck as CheckCircle2 } from 'lucide-react';
import { WeddingConfig } from '../types';
import { DelicateBlossom, ViolaBlossom, FloralDivider } from './FloralDecorations';

interface LocationSectionProps {
  config: WeddingConfig;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ config }) => {
  return (
    <section id="local" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#5E693D]/15 relative text-[#4A4238]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E89CAE]/15 border border-[#E89CAE]/35 text-[#5E693D] text-xs font-montserrat font-medium uppercase tracking-[0.2em]">
            <DelicateBlossom size={16} />
            <span>Onde Tudo Vai Acontecer</span>
            <DelicateBlossom size={16} />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl lg:text-7xl text-[#5E693D] font-normal py-1">
            Localização & Como Chegar
          </h2>

          <p className="font-serif-cormorant text-lg sm:text-xl text-[#6B5E4F] italic font-normal">
            Escolhemos um espaço acolhedor e cercado de encanto para viver esse dia inesquecível com você.
          </p>

          <FloralDivider />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Location info & navigation buttons (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="bg-white/85 backdrop-blur-md p-7 sm:p-8 rounded-[2.5rem] border border-[#5E693D]/20 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#5E693D]">
                  Espaço do Evento
                </span>
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#363D2B] mt-1">
                  {config.venueName}
                </h3>
                <p className="text-xs text-[#7A7164] font-medium mt-0.5">
                  {config.venueType}
                </p>
              </div>

              <div className="flex items-start gap-3 text-[#4A4238] bg-[#FAF7F2] p-4 rounded-2xl border border-[#5E693D]/15">
                <MapPin className="w-5 h-5 text-[#E89CAE] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="block text-[#363D2B] font-medium font-montserrat">Endereço Completo:</strong>
                  <p className="font-normal text-[#6B5E4F]">{config.venueAddress}</p>
                  <p className="font-medium text-[#363D2B]">{config.venueCity}</p>
                </div>
              </div>

              {/* Direct GPS Navigation Buttons */}
              <div className="space-y-2.5 pt-2">
                <span className="block text-xs font-montserrat font-semibold uppercase tracking-wider text-[#5E693D]">
                  Navegar Diretamente pelo seu GPS:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Google Maps */}
                  <a
                    href={config.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#5E693D] hover:bg-[#4E5832] text-white text-xs font-montserrat font-medium shadow-xs transition-all text-center"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                  </a>

                  {/* Waze */}
                  <a
                    href={config.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E89CAE] hover:bg-[#D98297] text-white text-xs font-montserrat font-medium shadow-xs transition-all text-center"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Waze</span>
                  </a>

                  {/* Apple Maps */}
                  <a
                    href={config.appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#363D2B] hover:bg-[#252A1E] text-white text-xs font-montserrat font-medium shadow-xs transition-all text-center"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Apple Maps</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Parking & Transfer Information */}
            <div className="bg-white/85 backdrop-blur-md p-6 rounded-[2.5rem] border border-[#5E693D]/20 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#5E693D]/15 rounded-xl text-[#5E693D] shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold font-serif-cormorant text-xl text-[#363D2B]">Estacionamento & Acesso</h4>
                  <p className="text-xs text-[#6B5E4F] font-normal mt-0.5 leading-relaxed">
                    {config.parkingInfo}
                  </p>
                </div>
              </div>

              {config.transferInfo && (
                <div className="flex items-start gap-3 pt-3 border-t border-[#5E693D]/15">
                  <div className="p-2 bg-[#5E693D]/15 rounded-xl text-[#5E693D] shrink-0">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold font-serif-cormorant text-xl text-[#363D2B]">Dicas de Transporte</h4>
                    <p className="text-xs text-[#6B5E4F] font-normal mt-0.5 leading-relaxed">
                      {config.transferInfo}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Map Preview Container (7 cols) */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-md rounded-[2.5rem] border border-[#5E693D]/20 shadow-sm overflow-hidden flex flex-col">
            
            {/* Map Header bar */}
            <div className="p-4 bg-[#FAF7F2] border-b border-[#5E693D]/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E89CAE] animate-pulse" />
                <span className="text-xs font-montserrat font-medium text-[#4A4238]">
                  Visualização do Mapa
                </span>
              </div>
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#5E693D] hover:text-[#363D2B] font-montserrat font-medium flex items-center gap-1 hover:underline"
              >
                <span>Ver em tela cheia</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Interactive map illustration & embedded map view */}
            <div className="relative flex-1 min-h-[350px] bg-[#EFECE4]">
              <iframe
                title="Mapa do Local do Casamento"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975!2d-46.6559!3d-23.5615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQxLjQiUyA0NsKwMzknMjEuMiJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                className="w-full h-full min-h-[350px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating venue badge on map */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-[#5E693D]/30 max-w-sm pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#5E693D] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-xs text-[#363D2B]">{config.venueName}</span>
                    <span className="text-[11px] text-[#7A7164] truncate block">{config.venueAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map footer advice */}
            <div className="p-4 bg-[#FAF7F2] border-t border-[#5E693D]/15 flex items-center justify-between text-xs text-[#6B5E4F]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5E693D]" />
                <span>Aplicativos de transporte (Uber/99) chegam com total facilidade e rapidez.</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
