import React, { useState } from 'react';
import { Heart, Send, CheckCircle2, UserCheck, AlertCircle, Sparkles, MessageCircle, Plus, Trash2, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingConfig, RSVPResponse } from '../types';
import { DelicateBlossom, ViolaBlossom, FloralDivider } from './FloralDecorations';

interface RSVPSectionProps {
  config: WeddingConfig;
  onNewRSVP: (rsvp: RSVPResponse) => void;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ config, onNewRSVP }) => {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [companionNames, setCompanionNames] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
  const [favoriteSong, setFavoriteSong] = useState('');
  const [messageToCouple, setMessageToCouple] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<RSVPResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const dietaryOptions = [
    'Sem restrições',
    'Vegetariano',
    'Vegano',
    'Sem Glúten (Celíaco)',
    'Sem Lactose',
    'Alergia a Frutos do Mar',
    'Alergia a Amendoim/Nozes'
  ];

  const handleAddCompanion = () => {
    setCompanionNames([...companionNames, '']);
  };

  const handleCompanionNameChange = (index: number, value: string) => {
    const updated = [...companionNames];
    updated[index] = value;
    setCompanionNames(updated);
  };

  const handleRemoveCompanion = (index: number) => {
    const updated = companionNames.filter((_, idx) => idx !== index);
    setCompanionNames(updated);
  };

  const toggleDietaryTag = (tag: string) => {
    if (tag === 'Sem restrições') {
      setSelectedDietaryTags(['Sem restrições']);
      return;
    }

    const withoutNoRestrictions = selectedDietaryTags.filter(t => t !== 'Sem restrições');
    if (selectedDietaryTags.includes(tag)) {
      setSelectedDietaryTags(withoutNoRestrictions.filter(t => t !== tag));
    } else {
      setSelectedDietaryTags([...withoutNoRestrictions, tag]);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#E89CAE', '#5E693D', '#FAF7F2', '#D98297']
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!guestName.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Por favor, informe seu telefone/WhatsApp de contato.');
      return;
    }

    if (isAttending === null) {
      setErrorMessage('Por favor, selecione se você irá comparecer ou não.');
      return;
    }

    const compiledDietary = [
      ...selectedDietaryTags,
      dietaryRestrictions.trim() ? `Outras: ${dietaryRestrictions.trim()}` : ''
    ].filter(Boolean).join(', ');

    const newResponse: RSVPResponse = {
      id: Date.now().toString(),
      guestName: guestName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      isAttending,
      adultsCount: isAttending ? adultsCount : 0,
      childrenCount: isAttending ? childrenCount : 0,
      companionNames: isAttending ? companionNames.filter(n => n.trim() !== '') : [],
      dietaryRestrictions: compiledDietary || undefined,
      favoriteSong: favoriteSong.trim() || undefined,
      messageToCouple: messageToCouple.trim() || undefined,
      submittedAt: new Date().toISOString()
    };

    onNewRSVP(newResponse);
    setLastSubmittedData(newResponse);
    setIsSubmitted(true);

    if (isAttending) {
      triggerConfetti();
    }
  };

  const handleResetForm = () => {
    setGuestName('');
    setPhone('');
    setEmail('');
    setIsAttending(null);
    setAdultsCount(1);
    setChildrenCount(0);
    setCompanionNames([]);
    setDietaryRestrictions('');
    setSelectedDietaryTags([]);
    setFavoriteSong('');
    setMessageToCouple('');
    setIsSubmitted(false);
    setLastSubmittedData(null);
    setErrorMessage('');
  };

  // Prepares polite formatted text to send confirmation via WhatsApp
  const generateWhatsAppLink = () => {
    if (!lastSubmittedData) return '';
    const phoneNum = config.rsvpWhatsappNumber.replace(/\D/g, '');
    
    let text = `Olá ${config.brideName} e ${config.groomName}! 🌸💍\n`;
    if (lastSubmittedData.isAttending) {
      text += `Estou passando para confirmar que *ESTAREI PRESENTE* no casamento de vocês!\n\n`;
      text += `👤 *Nome:* ${lastSubmittedData.guestName}\n`;
      text += `👥 *Total de Pessoas:* ${lastSubmittedData.adultsCount + lastSubmittedData.childrenCount} (${lastSubmittedData.adultsCount} adultos${lastSubmittedData.childrenCount > 0 ? `, ${lastSubmittedData.childrenCount} crianças` : ''})\n`;
      if (lastSubmittedData.companionNames.length > 0) {
        text += `👫 *Acompanhantes:* ${lastSubmittedData.companionNames.join(', ')}\n`;
      }
      if (lastSubmittedData.dietaryRestrictions) {
        text += `🥗 *Restrições:* ${lastSubmittedData.dietaryRestrictions}\n`;
      }
      if (lastSubmittedData.favoriteSong) {
        text += `🎵 *Música que quero ouvir:* ${lastSubmittedData.favoriteSong}\n`;
      }
      if (lastSubmittedData.messageToCouple) {
        text += `💌 *Recado:* "${lastSubmittedData.messageToCouple}"\n`;
      }
      text += `\nMal posso esperar por esse dia! Parabéns aos noivos! ❤️🌸`;
    } else {
      text += `Passando para avisar com muito carinho que, infelizmente, *não poderei comparecer* ao casamento.\n`;
      text += `👤 *Nome:* ${lastSubmittedData.guestName}\n`;
      if (lastSubmittedData.messageToCouple) {
        text += `💌 *Mensagem de carinho:* "${lastSubmittedData.messageToCouple}"\n`;
      }
      text += `\nDesejo toda a felicidade e amor do mundo para a nova união de vocês! ❤️`;
    }

    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="rsvp" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#5E693D]/15 relative text-[#4A4238]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E89CAE]/15 border border-[#E89CAE]/35 text-[#5E693D] text-xs font-montserrat font-medium uppercase tracking-[0.2em]">
            <DelicateBlossom size={16} />
            <span>R.S.V.P.</span>
            <DelicateBlossom size={16} />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl lg:text-7xl text-[#5E693D] font-normal py-1">
            Confirmação de Presença
          </h2>

          <p className="font-serif-cormorant text-lg sm:text-xl text-[#6B5E4F] italic font-normal">
            Sua presença é fundamental para tornar nosso dia perfeito. Por favor, confirme até <strong>{config.rsvpDeadline}</strong>.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#5E693D]/25 text-xs text-[#4A4238] font-montserrat font-medium mt-2 shadow-xs">
            <Calendar className="w-4 h-4 text-[#E89CAE]" />
            <span>Prazo limite para confirmação: <strong className="text-[#5E693D]">{config.rsvpDeadline}</strong></span>
          </div>

          <FloralDivider />
        </div>

        {/* Main RSVP Card */}
        <div className="bg-white/85 backdrop-blur-md p-6 sm:p-10 rounded-[2.5rem] border border-[#5E693D]/20 shadow-sm">
          
          {isSubmitted && lastSubmittedData ? (
            /* Success View */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-[#E89CAE]/15 rounded-full flex items-center justify-center mx-auto text-[#5E693D] border border-[#E89CAE]/30 shadow-xs">
                <CheckCircle2 className="w-10 h-10 text-[#5E693D]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-great-vibes text-4xl sm:text-5xl font-normal text-[#5E693D]">
                  {lastSubmittedData.isAttending
                    ? 'Presença Confirmada com Sucesso!'
                    : 'Agradecemos por nos Avisar!'}
                </h3>
                <p className="text-[#6B5E4F] text-sm sm:text-base max-w-md mx-auto font-normal">
                  {lastSubmittedData.isAttending
                    ? `Obrigado, ${lastSubmittedData.guestName}! Estamos muito felizes em compartilhar esse dia repleto de amor com você.`
                    : `Sentiremos sua falta, ${lastSubmittedData.guestName}! Agradecemos de coração pelo carinho e pela mensagem.`}
                </p>
              </div>

              {/* Confirmation Details Summary Box */}
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#5E693D]/20 text-left text-xs sm:text-sm max-w-md mx-auto space-y-2 shadow-xs font-montserrat">
                <div className="flex justify-between py-1 border-b border-[#5E693D]/10">
                  <span className="text-[#7A7164]">Convidado(a):</span>
                  <span className="font-semibold text-[#363D2B]">{lastSubmittedData.guestName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#5E693D]/10">
                  <span className="text-[#7A7164]">Status:</span>
                  <span className={`font-semibold ${lastSubmittedData.isAttending ? 'text-[#5E693D]' : 'text-[#7A7164]'}`}>
                    {lastSubmittedData.isAttending ? '🌸 Presença Confirmada' : '❌ Não comparecerá'}
                  </span>
                </div>
                {lastSubmittedData.isAttending && (
                  <div className="flex justify-between py-1 border-b border-[#5E693D]/10">
                    <span className="text-[#7A7164]">Total de pessoas:</span>
                    <span className="font-semibold text-[#363D2B]">
                      {lastSubmittedData.adultsCount + lastSubmittedData.childrenCount}
                    </span>
                  </div>
                )}
                {lastSubmittedData.favoriteSong && (
                  <div className="flex justify-between py-1 border-b border-[#5E693D]/10">
                    <span className="text-[#7A7164]">Música sugerida:</span>
                    <span className="font-medium text-[#4A4238] italic truncate max-w-[200px]">
                      {lastSubmittedData.favoriteSong}
                    </span>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Share button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 font-montserrat">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#5E693D] hover:bg-[#4E5832] text-white text-sm font-semibold shadow-sm transition-all w-full sm:w-auto cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Recado aos Noivos no WhatsApp</span>
                </a>

                <button
                  onClick={handleResetForm}
                  className="px-5 py-3 rounded-full bg-[#FAF7F2] hover:bg-[#EFECE4] text-[#4A4238] text-xs font-medium transition-colors w-full sm:w-auto border border-[#5E693D]/20 cursor-pointer"
                >
                  Confirmar para outro convidado
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {/* Attendance Toggle Choice */}
              <div className="space-y-2">
                <label className="block text-xs font-montserrat font-semibold uppercase tracking-wider text-[#363D2B]">
                  Você estará presente? <span className="text-[#E89CAE]">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAttending(true)}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 font-montserrat font-medium text-sm transition-all cursor-pointer ${
                      isAttending === true
                        ? 'border-[#5E693D] bg-[#5E693D]/10 text-[#363D2B] font-bold shadow-xs'
                        : 'border-[#5E693D]/20 bg-white text-[#6B5E4F] hover:border-[#5E693D]'
                    }`}
                  >
                    <DelicateBlossom size={20} />
                    <span>Sim, com certeza estarei lá! ✨</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAttending(false)}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 font-montserrat font-medium text-sm transition-all cursor-pointer ${
                      isAttending === false
                        ? 'border-[#7A7164] bg-[#FAF7F2] text-[#363D2B] font-bold shadow-xs'
                        : 'border-[#5E693D]/20 bg-white text-[#6B5E4F] hover:border-[#7A7164]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isAttending === false ? 'text-[#363D2B]' : 'text-stone-400'}`} />
                    <span>Infelizmente não poderei 💔</span>
                  </button>
                </div>
              </div>

              {/* Guest Identification Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-montserrat">
                <div>
                  <label htmlFor="rsvp-guest-name" className="block text-xs font-semibold uppercase tracking-wider text-[#5E693D] mb-1">
                    Nome Completo <span className="text-[#E89CAE]">*</span>
                  </label>
                  <input
                    id="rsvp-guest-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Ex: Ana Maria Silva"
                    className="w-full px-4 py-3 rounded-2xl border border-[#5E693D]/25 bg-white focus:outline-none focus:ring-2 focus:ring-[#5E693D] focus:border-transparent text-sm text-[#363D2B]"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#5E693D] mb-1">
                    WhatsApp / Telefone <span className="text-[#E89CAE]">*</span>
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: (11) 99999-9999"
                    className="w-full px-4 py-3 rounded-2xl border border-[#5E693D]/25 bg-white focus:outline-none focus:ring-2 focus:ring-[#5E693D] focus:border-transparent text-sm text-[#363D2B]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="rsvp-email" className="block text-xs font-montserrat font-semibold uppercase tracking-wider text-[#5E693D] mb-1">
                  E-mail (opcional)
                </label>
                <input
                  id="rsvp-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-4 py-3 rounded-2xl border border-[#5E693D]/25 bg-white focus:outline-none focus:ring-2 focus:ring-[#5E693D] focus:border-transparent text-sm text-[#363D2B] font-montserrat"
                />
              </div>

              {/* Conditional Fields if Attending */}
              {isAttending === true && (
                <div className="space-y-6 pt-4 border-t border-[#5E693D]/15">
                  
                  {/* Counts: Adults & Children */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-montserrat">
                    <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#5E693D]/20">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E693D] mb-1">
                        Adultos confirmados
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                          className="w-8 h-8 rounded-lg bg-white border border-[#5E693D]/20 hover:bg-[#5E693D]/10 text-[#363D2B] font-bold flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-[#363D2B] text-base">{adultsCount}</span>
                        <button
                          type="button"
                          onClick={() => setAdultsCount(adultsCount + 1)}
                          className="w-8 h-8 rounded-lg bg-white border border-[#5E693D]/20 hover:bg-[#5E693D]/10 text-[#363D2B] font-bold flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#5E693D]/20">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E693D] mb-1">
                        Crianças (até 10 anos)
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-8 h-8 rounded-lg bg-white border border-[#5E693D]/20 hover:bg-[#5E693D]/10 text-[#363D2B] font-bold flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-[#363D2B] text-base">{childrenCount}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(childrenCount + 1)}
                          className="w-8 h-8 rounded-lg bg-white border border-[#5E693D]/20 hover:bg-[#5E693D]/10 text-[#363D2B] font-bold flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Companion Names */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-montserrat font-semibold uppercase tracking-wider text-[#5E693D]">
                        Nome dos Acompanhantes / Família:
                      </label>
                      <button
                        type="button"
                        onClick={handleAddCompanion}
                        className="inline-flex items-center gap-1 text-xs text-[#5E693D] hover:text-[#363D2B] font-montserrat font-semibold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar Acompanhante</span>
                      </button>
                    </div>

                    {companionNames.map((name, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => handleCompanionNameChange(idx, e.target.value)}
                          placeholder={`Nome do acompanhante ${idx + 1}`}
                          className="flex-1 px-4 py-2.5 rounded-2xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none font-montserrat"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveCompanion(idx)}
                          className="p-2.5 text-[#E89CAE] hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                          title="Remover acompanhante"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Dietary Restrictions */}
                  <div className="space-y-2">
                    <label className="block text-xs font-montserrat font-semibold uppercase tracking-wider text-[#5E693D]">
                      Restrições ou Alergias Alimentares:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.map((tag) => {
                        const isSelected = selectedDietaryTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleDietaryTag(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs font-montserrat font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#5E693D] text-white shadow-xs'
                                : 'bg-white text-[#4A4238] border border-[#5E693D]/25 hover:border-[#5E693D]'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                            {tag}
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="text"
                      value={dietaryRestrictions}
                      onChange={(e) => setDietaryRestrictions(e.target.value)}
                      placeholder="Outras restrições ou detalhes para a cozinha..."
                      className="w-full px-4 py-2.5 mt-2 rounded-2xl border border-[#5E693D]/25 bg-white text-xs sm:text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none font-montserrat"
                    />
                  </div>

                  {/* Song Request */}
                  <div>
                    <label htmlFor="rsvp-song" className="block text-xs font-montserrat font-semibold uppercase tracking-wider text-[#5E693D] mb-1">
                      🎵 Que música especial não pode faltar nesse almoço?
                    </label>
                    <input
                      id="rsvp-song"
                      type="text"
                      value={favoriteSong}
                      onChange={(e) => setFavoriteSong(e.target.value)}
                      placeholder="Nome da música e artista..."
                      className="w-full px-4 py-3 rounded-2xl border border-[#5E693D]/25 bg-white focus:outline-none focus:ring-2 focus:ring-[#5E693D] text-sm text-[#363D2B] font-montserrat"
                    />
                  </div>

                </div>
              )}

              {/* Message to Couple */}
              <div>
                <label htmlFor="rsvp-message" className="block text-xs font-montserrat font-semibold uppercase tracking-wider text-[#5E693D] mb-1">
                  💌 Deixe um recado carinhoso para os noivos:
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={messageToCouple}
                  onChange={(e) => setMessageToCouple(e.target.value)}
                  placeholder="Escreva sua mensagem de carinho, votos ou conselhos..."
                  className="w-full px-4 py-3 rounded-2xl border border-[#5E693D]/25 bg-white focus:outline-none focus:ring-2 focus:ring-[#5E693D] text-sm text-[#363D2B] resize-none font-montserrat"
                />
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs sm:text-sm font-montserrat">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#5E693D] hover:bg-[#4E5832] text-white font-montserrat font-semibold text-sm sm:text-base uppercase tracking-widest shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Confirmação</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
