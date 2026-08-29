import React, { useState } from 'react';
import { X, Save, RotateCcw, Sparkles, Heart, MapPin, Calendar, CreditCard, Phone, Plus, Trash2, Clock, Palette, Shirt, Sun, Circle as HelpCircle, Gift, BookOpen, Utensils, Music, Smile, Check, Link as LinkIcon, MessageCircle, FileSliders as Sliders, Image as ImageIcon, Upload, Play, Pause, Volume2, Disc3, Headphones, Radio, FileAudio } from 'lucide-react';
import {
  WeddingConfig,
  StoryMilestone,
  ScheduleItem,
  SpecialTouch,
  FAQItem,
  ColorSwatch
} from '../types';
import { defaultWeddingData, SOUNDTRACK_PRESETS, SoundtrackPreset } from '../data/defaultWeddingData';
import { DelicateBlossom, ViolaBlossom } from './FloralDecorations';

interface EditWeddingModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onSave: (newConfig: WeddingConfig) => void;
}

type TabType =
  | 'geral'
  | 'historia'
  | 'dresscode'
  | 'clima'
  | 'cronograma'
  | 'detalhes'
  | 'localizacao'
  | 'presentes'
  | 'faq'
  | 'musica';

export const EditWeddingModal: React.FC<EditWeddingModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [formData, setFormData] = useState<WeddingConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<TabType>('geral');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewPlayingId, setPreviewPlayingId] = useState<string | null>(null);
  const previewAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const previewSynthCtxRef = React.useRef<AudioContext | null>(null);

  // Sync state if config prop changes when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData({ ...config });
      setSavedSuccess(false);
    }
  }, [isOpen, config]);

  const handleChange = (field: keyof WeddingConfig, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const brideInit = (formData.brideName || 'K').trim().charAt(0) || 'K';
    const groomInit = (formData.groomName || 'J').trim().charAt(0) || 'J';
    const updated: WeddingConfig = {
      ...formData,
      initials: `${groomInit} & ${brideInit}`
    };
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 1500);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Tem certeza de que deseja restaurar as informações originais padrão?')) {
      setFormData({ ...defaultWeddingData });
      onSave(defaultWeddingData);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 1500);
    }
  };

  // ---- STORY MILESTONES HANDLERS ----
  const handleUpdateMilestone = (index: number, field: keyof StoryMilestone, value: string) => {
    const newStory = [...formData.story];
    newStory[index] = { ...newStory[index], [field]: value };
    handleChange('story', newStory);
  };

  const handleAddMilestone = () => {
    const newMilestone: StoryMilestone = {
      id: Date.now().toString(),
      year: new Date().getFullYear().toString(),
      title: 'Novo Momento Marcante',
      description: 'Escreva aqui a lembrança e o sentimento deste momento especial...',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      iconName: 'Heart'
    };
    handleChange('story', [...formData.story, newMilestone]);
  };

  const handleRemoveMilestone = (index: number) => {
    const newStory = formData.story.filter((_, i) => i !== index);
    handleChange('story', newStory);
  };

  // ---- DRESS CODE ADVICE HANDLERS ----
  const handleUpdateAdvice = (index: number, value: string) => {
    const newAdvice = [...formData.dressCodeAdvice];
    newAdvice[index] = value;
    handleChange('dressCodeAdvice', newAdvice);
  };

  const handleAddAdvice = () => {
    handleChange('dressCodeAdvice', [...formData.dressCodeAdvice, 'Nova recomendação de traje para os convidados...']);
  };

  const handleRemoveAdvice = (index: number) => {
    const newAdvice = formData.dressCodeAdvice.filter((_, i) => i !== index);
    handleChange('dressCodeAdvice', newAdvice);
  };

  // ---- COLOR PALETTE HANDLERS ----
  const handleUpdateColor = (index: number, field: keyof ColorSwatch, value: string) => {
    const newPalette = [...formData.colorPalette];
    newPalette[index] = { ...newPalette[index], [field]: value };
    handleChange('colorPalette', newPalette);
  };

  const handleAddColor = () => {
    const newColor: ColorSwatch = {
      name: 'Nova Cor Floral',
      hex: '#E89CAE',
      description: 'Descrição da tonalidade recomendada'
    };
    handleChange('colorPalette', [...formData.colorPalette, newColor]);
  };

  const handleRemoveColor = (index: number) => {
    const newPalette = formData.colorPalette.filter((_, i) => i !== index);
    handleChange('colorPalette', newPalette);
  };

  // ---- SCHEDULE HANDLERS ----
  const handleUpdateSchedule = (index: number, field: keyof ScheduleItem, value: string) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    handleChange('schedule', newSchedule);
  };

  const handleAddSchedule = () => {
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      time: '18:00',
      title: 'Novo Momento',
      description: 'Descrição do que acontecerá neste horário...',
      iconName: 'Sparkles',
      location: formData.venueName || 'Salão Principal'
    };
    handleChange('schedule', [...formData.schedule, newItem]);
  };

  const handleRemoveSchedule = (index: number) => {
    const newSchedule = formData.schedule.filter((_, i) => i !== index);
    handleChange('schedule', newSchedule);
  };

  // ---- SPECIAL TOUCHES HANDLERS ----
  const handleUpdateSpecialTouch = (index: number, field: keyof SpecialTouch, value: string) => {
    const newTouches = [...formData.specialTouches];
    newTouches[index] = { ...newTouches[index], [field]: value };
    handleChange('specialTouches', newTouches);
  };

  const handleAddSpecialTouch = () => {
    const newTouch: SpecialTouch = {
      id: Date.now().toString(),
      title: 'Novo Cuidado Especial',
      subtitle: 'Subtítulo carinhoso',
      description: 'Conte o que foi planejado com carinho para os convidados...',
      iconName: 'Heart',
      highlight: 'Destaque especial'
    };
    handleChange('specialTouches', [...formData.specialTouches, newTouch]);
  };

  const handleRemoveSpecialTouch = (index: number) => {
    const newTouches = formData.specialTouches.filter((_, i) => i !== index);
    handleChange('specialTouches', newTouches);
  };

  // ---- GIFT REGISTRY LINKS HANDLERS ----
  const handleUpdateGiftLink = (index: number, field: 'name' | 'url' | 'description', value: string) => {
    const newLinks = [...formData.giftRegistryLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    handleChange('giftRegistryLinks', newLinks);
  };

  const handleAddGiftLink = () => {
    const newLink = {
      name: 'Nova Loja Parceira',
      url: 'https://exemplo.com.br',
      description: 'Lista de presentes personalizada'
    };
    handleChange('giftRegistryLinks', [...formData.giftRegistryLinks, newLink]);
  };

  const handleRemoveGiftLink = (index: number) => {
    const newLinks = formData.giftRegistryLinks.filter((_, i) => i !== index);
    handleChange('giftRegistryLinks', newLinks);
  };

  // ---- FAQ HANDLERS ----
  const handleUpdateFAQ = (index: number, field: keyof FAQItem, value: any) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    handleChange('faqs', newFaqs);
  };

  const handleAddFAQ = () => {
    const newFaq: FAQItem = {
      id: Date.now().toString(),
      category: 'geral',
      question: 'Escreva a pergunta frequente aqui...',
      answer: 'Escreva a resposta e orientação detalhada para os convidados...'
    };
    handleChange('faqs', [...formData.faqs, newFaq]);
  };

  const handleRemoveFAQ = (index: number) => {
    const newFaqs = formData.faqs.filter((_, i) => i !== index);
    handleChange('faqs', newFaqs);
  };

  // ---- SOUNDTRACK PREVIEW HANDLERS ----
  const stopAllPreviews = () => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }
    if (previewSynthCtxRef.current) {
      try {
        previewSynthCtxRef.current.close();
      } catch (e) {
        // ignore
      }
      previewSynthCtxRef.current = null;
    }
    setPreviewPlayingId(null);
  };

  const handleTogglePreview = (track: { id: string; url?: string; type?: 'synth' | 'audio_url' | 'vocaroo'; vocarooId?: string }) => {
    if (previewPlayingId === track.id) {
      stopAllPreviews();
      return;
    }
    stopAllPreviews();
    setPreviewPlayingId(track.id);

    const isAudioStream = track.type === 'audio_url' || track.type === 'vocaroo' || (track.url && track.url.trim().length > 0);

    if (isAudioStream && track.url && track.url.trim()) {
      try {
        const audio = new Audio(track.url);
        audio.volume = formData.soundtrackVolume ?? 0.7;
        audio.onended = () => setPreviewPlayingId(null);
        audio.onerror = () => {
          // If backup vocaroo link exists, try it
          if (track.vocarooId) {
            const fallbackAudio = new Audio(`https://media.vocaroo.com/mp3/${track.vocarooId}`);
            fallbackAudio.volume = formData.soundtrackVolume ?? 0.7;
            fallbackAudio.onended = () => setPreviewPlayingId(null);
            fallbackAudio.play().catch(() => setPreviewPlayingId(null));
            previewAudioRef.current = fallbackAudio;
            return;
          }
          setPreviewPlayingId(null);
          alert('Não foi possível reproduzir este áudio. Verifique se o link está acessível.');
        };
        previewAudioRef.current = audio;
        audio.play().catch(() => setPreviewPlayingId(null));
      } catch (e) {
        setPreviewPlayingId(null);
      }
    } else {
      // Play a gentle synth chord preview
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        previewSynthCtxRef.current = ctx;
        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime((formData.soundtrackVolume ?? 0.7) * 0.8, ctx.currentTime);
        mainGain.connect(ctx.destination);
        
        const notes = [261.63, 329.63, 392.00, 493.88, 523.25]; // Cmaj7 arpeggio
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.35);
          noteGain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.35);
          noteGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + idx * 0.35 + 0.12);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.35 + 2.4);
          osc.connect(noteGain);
          noteGain.connect(mainGain);
          osc.start(ctx.currentTime + idx * 0.35);
          osc.stop(ctx.currentTime + idx * 0.35 + 2.5);
        });
        setTimeout(() => {
          setPreviewPlayingId(null);
        }, 4000);
      } catch (e) {
        setPreviewPlayingId(null);
      }
    }
  };

  const handleSelectPreset = (preset: SoundtrackPreset) => {
    handleChange('soundtrackTitle', preset.name);
    handleChange('soundtrackArtist', preset.artist);
    handleChange('soundtrackType', preset.type);
    handleChange('soundtrackUrl', preset.url);
    if (preset.vocarooId) {
      handleChange('soundtrackVocarooId', preset.vocarooId);
    }
    if (preset.embedCode) {
      handleChange('soundtrackEmbedCode', preset.embedCode);
    }
  };

  const handleVocarooEmbedPaste = (codeOrUrl: string) => {
    let id = '1beZqpn5a28e';
    const matchEmbed = codeOrUrl.match(/vocaroo\.com\/embed\/([a-zA-Z0-9]+)/);
    const matchShort = codeOrUrl.match(/voca\.ro\/([a-zA-Z0-9]+)/);
    const matchDirect = codeOrUrl.match(/vocaroo\.com\/(?:mp3\/)?([a-zA-Z0-9]+)/);
    
    if (matchEmbed && matchEmbed[1]) {
      id = matchEmbed[1];
    } else if (matchShort && matchShort[1]) {
      id = matchShort[1];
    } else if (matchDirect && matchDirect[1]) {
      id = matchDirect[1];
    }

    const embedCode = `<div><iframe width="300" height="60" src="https://vocaroo.com/embed/${id}?autoplay=0" frameborder="0" allow="autoplay"></iframe><br><a href="https://voca.ro/${id}" title="Gravador de Voz do Vocaroo" target="_blank">Ver no Vocaroo &gt;&gt;</a></div>`;

    setFormData(prev => ({
      ...prev,
      soundtrackType: 'vocaroo',
      soundtrackVocarooId: id,
      soundtrackUrl: `https://media1.vocaroo.com/mp3/${id}`,
      soundtrackEmbedCode: embedCode,
      soundtrackTitle: prev.soundtrackTitle || 'Trilha Sonora dos Noivos (Vocaroo)',
      soundtrackArtist: prev.soundtrackArtist || 'Jhonathan & Karen'
    }));
  };

  // Stop previews when tab or modal changes
  React.useEffect(() => {
    return () => {
      stopAllPreviews();
    };
  }, [isOpen, activeTab]);

  const tabs: { id: TabType; label: string; sublabel: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'geral', label: 'Geral & Noivos', sublabel: 'Nomes, data & versículo', icon: <Heart className="w-4 h-4" /> },
    { id: 'musica', label: 'Trilha Sonora & Áudio', sublabel: 'Música de fundo & playlist', icon: <Music className="w-4 h-4" /> },
    { id: 'historia', label: 'História de Amor', sublabel: 'Linha do tempo & fotos', icon: <BookOpen className="w-4 h-4" />, count: formData.story.length },
    { id: 'dresscode', label: 'Dress Code & Cores', sublabel: 'Traje, recomendações & paleta', icon: <Palette className="w-4 h-4" />, count: formData.colorPalette.length },
    { id: 'clima', label: 'Clima & Recepção', sublabel: 'Ambiente, conforto & valet', icon: <Sun className="w-4 h-4" /> },
    { id: 'cronograma', label: 'Cronograma do Dia', sublabel: 'Horários da programação', icon: <Clock className="w-4 h-4" />, count: formData.schedule.length },
    { id: 'detalhes', label: 'Detalhes Especiais', sublabel: 'Gastronomia, doces & mimos', icon: <Sparkles className="w-4 h-4" />, count: formData.specialTouches.length },
    { id: 'localizacao', label: 'Localização & Mapas', sublabel: 'Endereço & rotas (Waze/Maps)', icon: <MapPin className="w-4 h-4" /> },
    { id: 'presentes', label: 'Presentes & PIX', sublabel: 'Chave PIX & Lista Camicado', icon: <Gift className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQ (Dúvidas)', sublabel: 'Perguntas frequentes', icon: <HelpCircle className="w-4 h-4" />, count: formData.faqs.length },
  ];

  const currentTabInfo = tabs.find((t) => t.id === activeTab) || tabs[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2C3224]/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 font-montserrat">
      <div className="bg-[#FAF7F2] rounded-[2rem] sm:rounded-[2.5rem] border border-[#5E693D]/25 shadow-2xl max-w-6xl w-full h-[92vh] max-h-[94vh] flex flex-col overflow-hidden text-[#4A4238] animate-fadeIn">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#5E693D]/15 flex items-center justify-between bg-white/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E89CAE]/20 text-[#5E693D] flex items-center justify-center border border-[#E89CAE]/40 shrink-0">
              <Sliders className="w-5 h-5 text-[#5E693D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-great-vibes text-3xl sm:text-4xl font-normal text-[#5E693D] leading-none py-0.5">
                  Painel de Gestão dos Noivos
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#5E693D]/10 text-[#5E693D] text-[10px] font-semibold uppercase tracking-wider">
                  Edição em Tempo Real
                </span>
              </div>
              <p className="text-xs text-[#7A7164] font-normal">
                Personalize cada detalhe do casamento, horários, textos, paleta e fotos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSave()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5E693D] hover:bg-[#4E5832] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'Salvo!' : 'Salvar'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#5E693D]/10 text-[#6B5E4F] transition-colors cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body (Sidebar on Left + Content Form on Right) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* ================= LEFT SIDEBAR (CATEGORIES) ================= */}
          <aside className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-[#5E693D]/15 bg-white/75 flex flex-col shrink-0 overflow-y-auto">
            
            {/* Sidebar Title / Mobile indicator */}
            <div className="p-3.5 md:p-4 border-b border-[#5E693D]/10 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E693D] flex items-center gap-1.5">
                <DelicateBlossom size={14} />
                <span>Categorias do Site ({tabs.length})</span>
              </span>
              <span className="text-[11px] text-[#7A7164] md:hidden font-medium">
                Toque para navegar
              </span>
            </div>

            {/* Navigation List */}
            <nav className="p-2 md:p-3 space-y-1.5 flex md:flex-col overflow-x-auto md:overflow-x-visible scrollbar-none flex-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left flex items-center justify-between p-2.5 sm:p-3 rounded-2xl text-xs transition-all cursor-pointer shrink-0 md:shrink ${
                      isActive
                        ? 'bg-[#5E693D] text-white shadow-sm font-semibold'
                        : 'bg-transparent text-[#6B5E4F] hover:bg-[#5E693D]/10 hover:text-[#363D2B]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#5E693D]/10 text-[#5E693D]'
                        }`}
                      >
                        {tab.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate text-xs sm:text-sm leading-tight">
                          {tab.label}
                        </div>
                        <div
                          className={`text-[10px] hidden md:block truncate ${
                            isActive ? 'text-white/80' : 'text-[#7A7164]'
                          }`}
                        >
                          {tab.sublabel}
                        </div>
                      </div>
                    </div>

                    {typeof tab.count === 'number' && (
                      <span
                        className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-[#5E693D]/15 text-[#5E693D]'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Footer Info */}
            <div className="hidden md:block p-3.5 border-t border-[#5E693D]/10 bg-[#FAF7F2]/60">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-[#7A7164] hover:text-[#363D2B] p-2 rounded-xl border border-[#5E693D]/20 hover:bg-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#5E693D]" />
                <span>Restaurar Valores Padrão</span>
              </button>
            </div>
          </aside>

          {/* ================= RIGHT CONTENT AREA (CUSTOMIZATION) ================= */}
          <main className="flex-1 flex flex-col overflow-hidden bg-[#FAF7F2]">
            
            {/* Active Category Header Bar */}
            <div className="px-4 sm:px-6 py-3 border-b border-[#5E693D]/15 bg-white/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#5E693D]/10 text-[#5E693D] flex items-center justify-center">
                  {currentTabInfo.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#363D2B] leading-tight font-montserrat">
                    {currentTabInfo.label}
                  </h4>
                  <p className="text-[11px] text-[#7A7164]">
                    {currentTabInfo.sublabel}
                  </p>
                </div>
              </div>

              {savedSuccess && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-fadeIn">
                  <Check className="w-3.5 h-3.5" />
                  Salvo com sucesso!
                </span>
              )}
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* ================= 1. GERAL & NOIVOS ================= */}
              {activeTab === 'geral' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div className="flex items-center gap-2">
                  <DelicateBlossom size={18} />
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E693D]">
                    Identidade dos Noivos & Mensagem Central
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Nome da Noiva / Noivo 1
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brideName}
                    onChange={(e) => handleChange('brideName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Nome do Noivo / Noiva 2
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.groomName}
                    onChange={(e) => handleChange('groomName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>
              </div>

              {/* Typography / Font Selector for Couple Names */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#5E693D]/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#5E693D]" />
                      <h5 className="font-bold text-sm text-[#363D2B]">
                        Fonte Caligráfica dos Noivos
                      </h5>
                    </div>
                    <p className="text-[11px] text-[#7A7164] mt-0.5">
                      Personalize o estilo da letra dos nomes <strong>{formData.groomName || 'Jhonathan'} &amp; {formData.brideName || 'Karen'}</strong>
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-[#5E693D] bg-[#5E693D]/10 px-2.5 py-1 rounded-full border border-[#5E693D]/20 w-fit">
                    Fairy Ballerina &amp; Clássicas
                  </span>
                </div>

                {/* Live Preview Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#FAF7F2] to-[#F3EFE6] border border-[#5E693D]/20 text-center space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#7A7164] font-semibold">
                    Prévia do Título no Convite:
                  </span>
                  <div className="py-1">
                    <p
                      className={`text-4xl sm:text-5xl text-[#5E693D] leading-tight ${
                        formData.namesFontFamily === 'oooh_baby'
                          ? 'font-oooh-baby'
                          : formData.namesFontFamily === 'birthstone_bounce'
                          ? 'font-birthstone-bounce'
                          : formData.namesFontFamily === 'league_script'
                          ? 'font-league-script'
                          : formData.namesFontFamily === 'inspiration'
                          ? 'font-inspiration'
                          : formData.namesFontFamily === 'dancing_script'
                          ? 'font-dancing-script'
                          : formData.namesFontFamily === 'pinyon'
                          ? 'font-pinyon'
                          : formData.namesFontFamily === 'parisienne'
                          ? 'font-parisienne'
                          : formData.namesFontFamily === 'allura'
                          ? 'font-allura'
                          : formData.namesFontFamily === 'ephesis'
                          ? 'font-ephesis'
                          : formData.namesFontFamily === 'montecarlo'
                          ? 'font-montecarlo'
                          : formData.namesFontFamily === 'cormorant'
                          ? 'font-serif-cormorant'
                          : formData.namesFontFamily === 'great_vibes'
                          ? 'font-great-vibes'
                          : 'font-fairy-ballerina'
                      }`}
                      style={
                        formData.customFontName
                          ? { fontFamily: `'${formData.customFontName}', 'Fairy Ballerina', cursive` }
                          : undefined
                      }
                    >
                      {formData.groomName || 'Jhonathan'} &amp; {formData.brideName || 'Karen'}
                    </p>
                  </div>
                </div>

                {/* Font Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'pinyon', name: 'Pinyon Script (Fonte Escolhida)', fontClass: 'font-pinyon', desc: 'Caligrafia clássica, nobre e ultra elegante de convite' },
                    { id: 'fairy_ballerina', name: 'Fairy Ballerina / Manuscrita', fontClass: 'font-fairy-ballerina', desc: 'Caligrafia orgânica e graciosa com laços suaves' },
                    { id: 'oooh_baby', name: 'Oooh Baby (Laços Arredondados)', fontClass: 'font-oooh-baby', desc: 'Traço manual contínuo, redondo e charmoso' },
                    { id: 'birthstone_bounce', name: 'Birthstone Bounce (Saltitante)', fontClass: 'font-birthstone-bounce', desc: 'Ritmo alegre com curvas e laços marcantes' },
                    { id: 'league_script', name: 'League Script (Laços Elegantes)', fontClass: 'font-league-script', desc: 'Caligrafia com grandes laços florais delicados' },
                    { id: 'inspiration', name: 'Inspiration (Espontânea)', fontClass: 'font-inspiration', desc: 'Manuscrita fluida e descontraída' },
                    { id: 'ephesis', name: 'Ephesis (Tinta Artesanal)', fontClass: 'font-ephesis', desc: 'Escrita manual artística com toque de bico de pena' },
                    { id: 'great_vibes', name: 'Great Vibes (Clássica Romântica)', fontClass: 'font-great-vibes', desc: 'Laços fluidos e curvas harmoniosas de convite' },
                    { id: 'parisienne', name: 'Parisienne (Romance Francês)', fontClass: 'font-parisienne', desc: 'Suave, delicada e com curvas leves' },
                    { id: 'allura', name: 'Allura (Fluida & Moderna)', fontClass: 'font-allura', desc: 'Traços limpos e legibilidade sofisticada' },
                    { id: 'montecarlo', name: 'MonteCarlo (Convite Nobre)', fontClass: 'font-montecarlo', desc: 'Estilo caligráfico vintage refinado' },
                    { id: 'cormorant', name: 'Cormorant Garamond (Serifada Luxo)', fontClass: 'font-serif-cormorant', desc: 'Serifada editorial clássica de alta costura' },
                  ].map((fontItem) => {
                    const isSelected = (formData.namesFontFamily || 'pinyon') === fontItem.id;
                    return (
                      <button
                        key={fontItem.id}
                        type="button"
                        onClick={() => handleChange('namesFontFamily', fontItem.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-[#5E693D] bg-[#FAF7F2] ring-2 ring-[#5E693D]/25 shadow-xs'
                            : 'border-[#5E693D]/15 bg-white hover:bg-[#FAF7F2]/60'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#363D2B]">
                              {fontItem.name}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5" />
                                Ativa
                              </span>
                            )}
                          </div>
                          <p className={`text-xl text-[#5E693D] my-0.5 truncate ${fontItem.fontClass}`}>
                            {formData.groomName || 'Jhonathan'} &amp; {formData.brideName || 'Karen'}
                          </p>
                          <p className="text-[10px] text-[#7A7164] line-clamp-1">
                            {fontItem.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Font File Link Support */}
                <div className="pt-2 border-t border-[#5E693D]/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F]">
                      Importar Arquivo de Fonte Direto (.woff2 / .ttf / .otf)
                    </label>
                    <span className="text-[10px] text-[#7A7164]">Opcional</span>
                  </div>
                  <input
                    type="url"
                    value={formData.customFontUrl || ''}
                    onChange={(e) => handleChange('customFontUrl', e.target.value)}
                    placeholder="https://meuservidor.com/fontes/FairyBallerina.woff2 (ou .ttf)"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none font-mono text-[11px]"
                  />
                  <p className="text-[10px] text-[#7A7164]">
                    Se você tiver o arquivo da <strong>Fairy Ballerina</strong> hospedado na nuvem (Dropbox com raw=1, GitHub, Google Drive direto ou CDN), cole o link acima e o site carregará o arquivo automaticamente via <code>@font-face</code>.
                  </p>
                </div>
              </div>

              {/* Monogram / Floral Crest Section */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#5E693D]/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#E89CAE]" />
                      <h5 className="font-bold text-sm text-[#363D2B]">
                        Brasão / Monograma Floral dos Noivos
                      </h5>
                    </div>
                    <p className="text-[11px] text-[#7A7164] mt-0.5">
                      Guirlanda de flores em aquarela com as iniciais <strong>K &amp; J</strong> exibida no topo do convite e no cabeçalho
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-[#5E693D] bg-[#5E693D]/10 px-2.5 py-1 rounded-full border border-[#5E693D]/20 w-fit">
                    Aquarela Floral
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-[#FAF7F2] rounded-xl border border-[#5E693D]/15">
                  {formData.monogramImageUrl ? (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
                      <img
                        src={formData.monogramImageUrl}
                        alt="Monograma Floral"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#5E693D]/30 flex items-center justify-center text-[#7A7164] text-xs shrink-0">
                      Sem imagem
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full text-left">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F]">
                      Link da Imagem do Brasão / Monograma
                    </label>
                    <input
                      type="text"
                      value={formData.monogramImageUrl || ''}
                      onChange={(e) => handleChange('monogramImageUrl', e.target.value)}
                      placeholder="https://exemplo.com/monograma.png"
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-white text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#5E693D] text-white text-xs font-medium hover:bg-[#4A5330] transition-colors flex items-center gap-1.5 shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        Trocar Arquivo do Brasão
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (uploadEvent) => {
                                if (uploadEvent.target?.result) {
                                  handleChange('monogramImageUrl', uploadEvent.target.result as string);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      {formData.monogramImageUrl && (
                        <button
                          type="button"
                          onClick={() => handleChange('monogramImageUrl', '')}
                          className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 bg-red-50 text-xs font-medium hover:bg-red-100 transition-colors"
                        >
                          Remover e usar iniciais em texto
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Hashtag Oficial
                  </label>
                  <input
                    type="text"
                    value={formData.hashtag}
                    onChange={(e) => handleChange('hashtag', e.target.value)}
                    placeholder="#CasamentoJhonathanEKaren"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    WhatsApp para Contato / Dúvidas
                  </label>
                  <input
                    type="tel"
                    value={formData.rsvpWhatsappNumber}
                    onChange={(e) => handleChange('rsvpWhatsappNumber', e.target.value)}
                    placeholder="5514999999999 (com DDI e DDD)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Data e Hora do Evento (Contagem)
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => handleChange('weddingDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Data Formatada por Extenso
                  </label>
                  <input
                    type="text"
                    value={formData.weddingDateFormatted}
                    onChange={(e) => handleChange('weddingDateFormatted', e.target.value)}
                    placeholder="22 de Dezembro de 2026 às 11:00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Prazo Limite para RSVP
                  </label>
                  <input
                    type="text"
                    value={formData.rsvpDeadline}
                    onChange={(e) => handleChange('rsvpDeadline', e.target.value)}
                    placeholder="01 de Dezembro de 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Frase de Amor / Versículo Bíblico em Destaque
                  </label>
                  <textarea
                    rows={2}
                    value={formData.loveQuote}
                    onChange={(e) => handleChange('loveQuote', e.target.value)}
                    placeholder="Assim, eles já não são dois, mas sim uma só carne..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Autor / Referência Bíblica da Citação
                  </label>
                  <input
                    type="text"
                    value={formData.loveQuoteAuthor || ''}
                    onChange={(e) => handleChange('loveQuoteAuthor', e.target.value)}
                    placeholder="Mateus 19:6"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-white text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. HISTÓRIA DE AMOR ================= */}
          {activeTab === 'historia' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E693D] flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Linha do Tempo da História de Amor ({formData.story.length} marcos)</span>
                  </h4>
                  <p className="text-xs text-[#7A7164]">
                    Adicione os momentos inesquecíveis do casal com fotos, ano e textos
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddMilestone}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E89CAE]/20 text-[#5E693D] border border-[#E89CAE]/40 text-xs font-semibold hover:bg-[#E89CAE]/30 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Marco</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.story.map((milestone, idx) => (
                  <div
                    key={milestone.id || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#5E693D]/10 text-[#5E693D]">
                        Marco #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMilestone(idx)}
                        className="text-[#E89CAE] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remover marco"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Ano / Data
                        </label>
                        <input
                          type="text"
                          value={milestone.year}
                          onChange={(e) => handleUpdateMilestone(idx, 'year', e.target.value)}
                          placeholder="Ex: 2021 ou Outubro 2021"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Título do Momento
                        </label>
                        <input
                          type="text"
                          value={milestone.title}
                          onChange={(e) => handleUpdateMilestone(idx, 'title', e.target.value)}
                          placeholder="Ex: O Primeiro Encontro"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                        URL da Foto do Casal
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={milestone.image}
                          onChange={(e) => handleUpdateMilestone(idx, 'image', e.target.value)}
                          placeholder="https://exemplo.com/foto.jpg"
                          className="flex-1 px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                        {milestone.image && (
                          <img
                            src={milestone.image}
                            alt="Preview"
                            className="w-9 h-9 rounded-lg object-cover border border-[#5E693D]/20 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                        Descrição da Memória
                      </label>
                      <textarea
                        rows={2}
                        value={milestone.description}
                        onChange={(e) => handleUpdateMilestone(idx, 'description', e.target.value)}
                        placeholder="Conte como aconteceu com amor e carinho..."
                        className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}

                {formData.story.length === 0 && (
                  <div className="text-center py-8 bg-white/70 rounded-2xl border border-dashed border-[#5E693D]/30 p-6 text-sm text-[#7A7164]">
                    Nenhum marco adicionado ainda. Clique em "Adicionar Marco" para começar!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= 3. DRESS CODE & PALETA DE CORES ================= */}
          {activeTab === 'dresscode' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E693D] flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    <span>Traje (Dress Code) & Paleta de Cores</span>
                  </h4>
                  <p className="text-xs text-[#7A7164]">
                    Oriente os convidados sobre o estilo e as tonalidades recomendadas
                  </p>
                </div>
              </div>

              {/* Dress code texts */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#5E693D]">
                  Informações Principais do Traje
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Título do Dress Code
                    </label>
                    <input
                      type="text"
                      value={formData.dressCodeTitle}
                      onChange={(e) => handleChange('dressCodeTitle', e.target.value)}
                      placeholder="Ex: Dress Code: Esporte Fino Elegante"
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Subtítulo Explicativo
                    </label>
                    <input
                      type="text"
                      value={formData.dressCodeSubtitle}
                      onChange={(e) => handleChange('dressCodeSubtitle', e.target.value)}
                      placeholder="Ex: Sofisticação, leveza e conforto"
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Descrição Geral do Traje
                  </label>
                  <textarea
                    rows={2}
                    value={formData.dressCodeDescription}
                    onChange={(e) => handleChange('dressCodeDescription', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>
              </div>

              {/* Dress Code Advice List */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#5E693D]">
                    Recomendações em Tópicos (Mulheres, Homens, Dicas)
                  </h5>
                  <button
                    type="button"
                    onClick={handleAddAdvice}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E89CAE]/20 text-[#5E693D] text-xs font-semibold hover:bg-[#E89CAE]/30 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Adicionar Tópico</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.dressCodeAdvice.map((advice, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#5E693D]/10 text-[#5E693D] text-[11px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={advice}
                        onChange={(e) => handleUpdateAdvice(idx, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAdvice(idx)}
                        className="text-[#E89CAE] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#5E693D]">
                    Paleta de Cores Sugerida ({formData.colorPalette.length} cores)
                  </h5>
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E89CAE]/20 text-[#5E693D] text-xs font-semibold hover:bg-[#E89CAE]/30 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Adicionar Cor</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formData.colorPalette.map((color, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FAF7F2] border border-[#5E693D]/15 flex items-center gap-3"
                    >
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => handleUpdateColor(idx, 'hex', e.target.value)}
                        className="w-10 h-10 rounded-xl cursor-pointer border border-[#5E693D]/30 p-0.5 bg-white shrink-0"
                      />

                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          value={color.name}
                          onChange={(e) => handleUpdateColor(idx, 'name', e.target.value)}
                          placeholder="Nome da cor (ex: Rosa Cosmos)"
                          className="w-full px-2 py-1 rounded-lg border border-[#5E693D]/20 bg-white text-xs font-semibold text-[#363D2B]"
                        />
                        <input
                          type="text"
                          value={color.description || ''}
                          onChange={(e) => handleUpdateColor(idx, 'description', e.target.value)}
                          placeholder="Significado / uso sugerido"
                          className="w-full px-2 py-0.5 rounded-lg border border-[#5E693D]/20 bg-white text-[11px] text-[#6B5E4F]"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveColor(idx)}
                        className="text-[#E89CAE] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= 4. CLIMA & RECEPÇÃO ================= */}
          {activeTab === 'clima' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E693D] flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <span>Clima, Climatização & Tipo de Recepção</span>
                  </h4>
                  <p className="text-xs text-[#7A7164]">
                    Orientações sobre o ambiente do espaço, temperatura e conforto
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Tipo de Evento & Recepção (Subtítulo no Local)
                  </label>
                  <input
                    type="text"
                    value={formData.venueType}
                    onChange={(e) => handleChange('venueType', e.target.value)}
                    placeholder="Ex: Almoço Comemorativo & Recepção Gastronômica"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-[#FAF7F2] text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Orientações de Clima & Conforto Térmico
                  </label>
                  <textarea
                    rows={3}
                    value={formData.weatherAdvice}
                    onChange={(e) => handleChange('weatherAdvice', e.target.value)}
                    placeholder="Ex: Dezembro costuma ter clima ensolarado e agradável. O ambiente do restaurante conta com climatização completa e espaço acolhedor."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-[#FAF7F2] text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Informações sobre Estacionamento e Valet
                  </label>
                  <input
                    type="text"
                    value={formData.parkingInfo}
                    onChange={(e) => handleChange('parkingInfo', e.target.value)}
                    placeholder="Ex: Estacionamento com serviço de valet e segurança no próprio local."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-[#FAF7F2] text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Informações de Transferência / Acesso
                  </label>
                  <input
                    type="text"
                    value={formData.transferInfo || ''}
                    onChange={(e) => handleChange('transferInfo', e.target.value)}
                    placeholder="Ex: Fácil acesso por táxi e aplicativos."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-[#FAF7F2] text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= 5. CRONOGRAMA DO DIA ================= */}
          {activeTab === 'cronograma' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E693D] flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Cronograma do Dia do Casamento ({formData.schedule.length} momentos)</span>
                  </h4>
                  <p className="text-xs text-[#7A7164]">
                    Defina a programação horária da cerimônia, banquete e festa
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddSchedule}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E89CAE]/20 text-[#5E693D] border border-[#E89CAE]/40 text-xs font-semibold hover:bg-[#E89CAE]/30 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Momento</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.schedule.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#5E693D]/10 text-[#5E693D]">
                        Horário #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSchedule(idx)}
                        className="text-[#E89CAE] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remover horário"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Horário
                        </label>
                        <input
                          type="text"
                          value={item.time}
                          onChange={(e) => handleUpdateSchedule(idx, 'time', e.target.value)}
                          placeholder="Ex: 11:00"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs font-bold text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Título da Atividade
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateSchedule(idx, 'title', e.target.value)}
                          placeholder="Ex: Cerimônia Religiosa"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Local / Espaço
                        </label>
                        <input
                          type="text"
                          value={item.location || ''}
                          onChange={(e) => handleUpdateSchedule(idx, 'location', e.target.value)}
                          placeholder="Ex: Salão Principal"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                        Descrição do Momento
                      </label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => handleUpdateSchedule(idx, 'description', e.target.value)}
                        placeholder="Detalhes para os convidados..."
                        className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 6. DETALHES ESPECIAIS ================= */}
          {activeTab === 'detalhes' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E693D] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Detalhes que Pensamos para Vocês ({formData.specialTouches.length} itens)</span>
                  </h4>
                  <p className="text-xs text-[#7A7164]">
                    Destaque a gastronomia, mesa de doces, lembrancinhas e mimos
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddSpecialTouch}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E89CAE]/20 text-[#5E693D] border border-[#E89CAE]/40 text-xs font-semibold hover:bg-[#E89CAE]/30 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Detalhe</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.specialTouches.map((touch, idx) => (
                  <div
                    key={touch.id || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#5E693D]/10 text-[#5E693D]">
                        Cuidado Especial #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialTouch(idx)}
                        className="text-[#E89CAE] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remover detalhe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Título
                        </label>
                        <input
                          type="text"
                          value={touch.title}
                          onChange={(e) => handleUpdateSpecialTouch(idx, 'title', e.target.value)}
                          placeholder="Ex: Gastronomia Brio"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs font-bold text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={touch.subtitle}
                          onChange={(e) => handleUpdateSpecialTouch(idx, 'subtitle', e.target.value)}
                          placeholder="Ex: Massas artesanais e carnes"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Destaque / Tag
                        </label>
                        <input
                          type="text"
                          value={touch.highlight || ''}
                          onChange={(e) => handleUpdateSpecialTouch(idx, 'highlight', e.target.value)}
                          placeholder="Ex: Cardápio exclusivo"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                        Descrição
                      </label>
                      <textarea
                        rows={2}
                        value={touch.description}
                        onChange={(e) => handleUpdateSpecialTouch(idx, 'description', e.target.value)}
                        placeholder="Conte os detalhes aos convidados..."
                        className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 7. LOCALIZAÇÃO ================= */}
          {activeTab === 'localizacao' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E693D] flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Localização, Endereço & Links de GPS</span>
                  </h4>
                  <p className="text-xs text-[#7A7164]">
                    Configure os botões de navegação no Google Maps, Waze e Apple Maps
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Nome do Espaço / Restaurante
                    </label>
                    <input
                      type="text"
                      value={formData.venueName}
                      onChange={(e) => handleChange('venueName', e.target.value)}
                      placeholder="Brio Pasta & Grill"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-[#FAF7F2] text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Cidade / Estado
                    </label>
                    <input
                      type="text"
                      value={formData.venueCity}
                      onChange={(e) => handleChange('venueCity', e.target.value)}
                      placeholder="Bauru - SP"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-[#FAF7F2] text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Endereço Completo com Bairro
                  </label>
                  <input
                    type="text"
                    value={formData.venueAddress}
                    onChange={(e) => handleChange('venueAddress', e.target.value)}
                    placeholder="Av. Getúlio Vargas, 11-100 - Jardim América"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E693D]/25 bg-[#FAF7F2] text-sm text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#5E693D]">
                    Links Diretos de Navegação
                  </h5>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Link do Google Maps
                    </label>
                    <input
                      type="url"
                      value={formData.googleMapsUrl}
                      onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                      placeholder="https://maps.google.com/?q=..."
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Link do Waze
                    </label>
                    <input
                      type="url"
                      value={formData.wazeUrl}
                      onChange={(e) => handleChange('wazeUrl', e.target.value)}
                      placeholder="https://waze.com/ul?q=..."
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Link do Apple Maps
                    </label>
                    <input
                      type="url"
                      value={formData.appleMapsUrl}
                      onChange={(e) => handleChange('appleMapsUrl', e.target.value)}
                      placeholder="https://maps.apple.com/?q=..."
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 8. PRESENTES & PIX ================= */}
          {activeTab === 'presentes' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E693D] flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    <span>Lista de Presentes, PIX & Lojas Virtuais</span>
                  </h4>
                  <p className="text-xs text-[#7A7164]">
                    Configure sua chave Pix, mensagem carinhosa e links de lojas
                  </p>
                </div>
              </div>

              {/* PIX Details */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#5E693D]">
                  Dados da Chave PIX dos Noivos
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Chave PIX
                    </label>
                    <input
                      type="text"
                      value={formData.pixKey}
                      onChange={(e) => handleChange('pixKey', e.target.value)}
                      placeholder="E-mail, CPF, Telefone ou Chave Aleatória"
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs font-bold text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Tipo da Chave
                    </label>
                    <input
                      type="text"
                      value={formData.pixKeyType}
                      onChange={(e) => handleChange('pixKeyType', e.target.value)}
                      placeholder="E-mail, Celular, CPF ou Aleatória"
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Nome do Favorecido
                    </label>
                    <input
                      type="text"
                      value={formData.pixReceiverName}
                      onChange={(e) => handleChange('pixReceiverName', e.target.value)}
                      placeholder="Jhonathan & Karen"
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                      Banco / Instituição
                    </label>
                    <input
                      type="text"
                      value={formData.pixBankName}
                      onChange={(e) => handleChange('pixBankName', e.target.value)}
                      placeholder="Ex: Nubank / Itaú / Banco do Brasil"
                      className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                    Mensagem de Agradecimento aos Convidados
                  </label>
                  <textarea
                    rows={2}
                    value={formData.giftMessage}
                    onChange={(e) => handleChange('giftMessage', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                </div>
              </div>

              {/* Partner stores & registry links */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#5E693D]">
                    Lojas Parceiras & Cotas Virtuais ({formData.giftRegistryLinks.length})
                  </h5>
                  <button
                    type="button"
                    onClick={handleAddGiftLink}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E89CAE]/20 text-[#5E693D] text-xs font-semibold hover:bg-[#E89CAE]/30 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Adicionar Loja</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.giftRegistryLinks.map((link, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FAF7F2] border border-[#5E693D]/15 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#5E693D]">
                          Loja #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveGiftLink(idx)}
                          className="text-[#E89CAE] hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => handleUpdateGiftLink(idx, 'name', e.target.value)}
                          placeholder="Nome da loja ou cota (ex: Camicado)"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#5E693D]/20 bg-white text-xs font-semibold text-[#363D2B]"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleUpdateGiftLink(idx, 'url', e.target.value)}
                          placeholder="Link da lista (https://... ou #pix)"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#5E693D]/20 bg-white text-xs text-[#363D2B]"
                        />
                      </div>

                      <input
                        type="text"
                        value={link.description}
                        onChange={(e) => handleUpdateGiftLink(idx, 'description', e.target.value)}
                        placeholder="Descrição curta (ex: Utensílios e louças para a casa)"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#5E693D]/20 bg-white text-[11px] text-[#6B5E4F]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= 9. FAQ ================= */}
          {activeTab === 'faq' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E693D] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>Perguntas Frequentes - FAQ ({formData.faqs.length} perguntas)</span>
                  </h4>
                  <p className="text-xs text-[#7A7164]">
                    Edite ou adicione novas respostas para orientar os convidados
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddFAQ}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E89CAE]/20 text-[#5E693D] border border-[#E89CAE]/40 text-xs font-semibold hover:bg-[#E89CAE]/30 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Pergunta</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.faqs.map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#5E693D]/10 text-[#5E693D]">
                          Pergunta #{idx + 1}
                        </span>
                        <select
                          value={faq.category}
                          onChange={(e) => handleUpdateFAQ(idx, 'category', e.target.value)}
                          className="px-2.5 py-1 rounded-lg border border-[#5E693D]/20 bg-[#FAF7F2] text-[11px] font-semibold text-[#5E693D] focus:outline-none"
                        >
                          <option value="presenca">Presença & Convite</option>
                          <option value="traje">Traje & Dress Code</option>
                          <option value="local">Local & Estacionamento</option>
                          <option value="presentes">Presentes & Pix</option>
                          <option value="geral">Geral / Redes Sociais</option>
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveFAQ(idx)}
                        className="text-[#E89CAE] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remover pergunta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                        Pergunta
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleUpdateFAQ(idx, 'question', e.target.value)}
                        placeholder="Ex: Até quando preciso confirmar presença?"
                        className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs font-semibold text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                        Resposta
                      </label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => handleUpdateFAQ(idx, 'answer', e.target.value)}
                        placeholder="Explique detalhadamente..."
                        className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 10. TRILHA SONORA & ÁUDIO ================= */}
          {activeTab === 'musica' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-3">
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-[#5E693D]" />
                  <div>
                    <h4 className="font-serif-cormorant text-xl font-bold text-[#363D2B]">
                      Trilha Sonora do Casamento
                    </h4>
                    <p className="text-xs text-[#7A7164]">
                      Áudio oficial dos noivos no Vocaroo, músicas românticas prontas ou link personalizado
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleTogglePreview({
                      id: 'current-active-preview',
                      url: formData.soundtrackUrl,
                      type: formData.soundtrackType || 'vocaroo',
                      vocarooId: formData.soundtrackVocarooId || '1beZqpn5a28e'
                    });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                    previewPlayingId === 'current-active-preview'
                      ? 'bg-[#E89CAE] text-[#363D2B] animate-pulse'
                      : 'bg-[#5E693D] text-white hover:bg-[#4E5832]'
                  }`}
                >
                  {previewPlayingId === 'current-active-preview' ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pausar Teste</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Ouvir Música Atual</span>
                    </>
                  )}
                </button>
              </div>

              {/* Active Track Highlight Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF7F2] to-[#F3EFE6] border-2 border-[#5E693D]/25 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#5E693D] text-white flex items-center justify-center shadow-xs shrink-0">
                    <Disc3 className="w-6 h-6 text-[#E89CAE] animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#5E693D]/15 text-[#5E693D]">
                        Trilha Ativa no Site
                      </span>
                      <span className="text-[10px] text-[#7A7164]">
                        {formData.soundtrackType === 'vocaroo'
                          ? 'Vocaroo (Gravador Oficial)'
                          : formData.soundtrackType === 'audio_url'
                          ? 'Arquivo MP3'
                          : 'Sintetizador'}
                      </span>
                    </div>
                    <h5 className="font-bold text-base text-[#363D2B] font-montserrat mt-0.5">
                      {formData.soundtrackTitle || 'Trilha Sonora dos Noivos (Vocaroo)'}
                    </h5>
                    <p className="text-xs text-[#7A7164]">
                      {formData.soundtrackArtist || 'Jhonathan & Karen'}
                    </p>
                  </div>
                </div>

                {/* Volume Slider Control */}
                <div className="md:w-56 bg-white/80 p-3 rounded-xl border border-[#5E693D]/15 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#6B5E4F] flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#5E693D]" />
                      Volume Inicial
                    </span>
                    <span className="font-bold text-[#5E693D]">
                      {Math.round((formData.soundtrackVolume ?? 0.7) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={formData.soundtrackVolume ?? 0.7}
                    onChange={(e) => handleChange('soundtrackVolume', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#5E693D]/20 rounded-lg appearance-none cursor-pointer accent-[#5E693D]"
                  />
                </div>
              </div>

              {/* Vocaroo Live Embed Widget Showcase */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/25 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#5E693D]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-[#5E693D]" />
                    <h5 className="font-bold text-sm text-[#363D2B]">
                      Player Integrado do Vocaroo
                    </h5>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1 w-fit">
                    <Check className="w-3 h-3" />
                    Código Embed Conectado
                  </span>
                </div>

                {/* Embed Iframe directly rendered */}
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#5E693D]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex-1 w-full flex flex-col items-start justify-center">
                    <div className="w-full max-w-[300px]">
                      <iframe
                        width="300"
                        height="60"
                        src={`https://vocaroo.com/embed/${formData.soundtrackVocarooId || '1beZqpn5a28e'}?autoplay=0`}
                        frameBorder="0"
                        allow="autoplay"
                        className="rounded-lg shadow-xs border border-[#5E693D]/20"
                        title="Vocaroo Audio Player"
                      />
                      <br />
                      <a
                        href={`https://voca.ro/${formData.soundtrackVocarooId || '1beZqpn5a28e'}`}
                        title="Gravador de Voz do Vocaroo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#5E693D] font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        <span>Ver no Vocaroo &gt;&gt;</span>
                      </a>
                    </div>
                  </div>

                  <div className="text-xs text-[#7A7164] max-w-sm space-y-1 bg-white p-3 rounded-xl border border-[#5E693D]/10">
                    <p className="font-semibold text-[#363D2B] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#5E693D]" />
                      Trilha Sonora Ativa
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      Este áudio do Vocaroo está configurado como a <strong>trilha sonora principal do site</strong>. Os convidados ouvirão esta gravação no botão de música.
                    </p>
                  </div>
                </div>

                {/* Embed Code Snippet Editor */}
                <div className="space-y-1.5 pt-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F]">
                    Código Embed / Link do Vocaroo
                  </label>
                  <textarea
                    rows={2}
                    value={
                      formData.soundtrackEmbedCode ||
                      `<div><iframe width="300" height="60" src="https://vocaroo.com/embed/${formData.soundtrackVocarooId || '1beZqpn5a28e'}?autoplay=0" frameborder="0" allow="autoplay"></iframe><br><a href="https://voca.ro/${formData.soundtrackVocarooId || '1beZqpn5a28e'}" title="Gravador de Voz do Vocaroo" target="_blank">Ver no Vocaroo &gt;&gt;</a></div>`
                    }
                    onChange={(e) => handleVocarooEmbedPaste(e.target.value)}
                    placeholder='<div><iframe width="300" height="60" src="https://vocaroo.com/embed/1beZqpn5a28e?autoplay=0"...'
                    className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs font-mono text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                  />
                  <p className="text-[10px] text-[#7A7164]">
                    Cole um novo código iframe ou link do Vocaroo (ex: <code>https://voca.ro/...</code>) a qualquer momento para atualizar a gravação.
                  </p>
                </div>
              </div>

              {/* Mode Selection Tabs & Other Tracks */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleChange('soundtrackType', 'vocaroo');
                      handleChange('soundtrackTitle', 'Trilha Sonora dos Noivos (Vocaroo)');
                      handleChange('soundtrackArtist', 'Jhonathan & Karen');
                      handleChange('soundtrackVocarooId', '1beZqpn5a28e');
                      handleChange('soundtrackUrl', 'https://media1.vocaroo.com/mp3/1beZqpn5a28e');
                      handleChange(
                        'soundtrackEmbedCode',
                        '<div><iframe width="300" height="60" src="https://vocaroo.com/embed/1beZqpn5a28e?autoplay=0" frameborder="0" allow="autoplay"></iframe><br><a href="https://voca.ro/1beZqpn5a28e" title="Gravador de Voz do Vocaroo" target="_blank">Ver no Vocaroo &gt;&gt;</a></div>'
                      );
                    }}
                    className={`flex-1 p-3.5 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      formData.soundtrackType === 'vocaroo'
                        ? 'bg-[#5E693D] text-white border-[#5E693D] shadow-xs'
                        : 'bg-white text-[#6B5E4F] border-[#5E693D]/20 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Disc3 className="w-4 h-4" />
                    <span>Áudio Vocaroo Oficial</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleChange('soundtrackType', 'synth');
                      handleChange('soundtrackTitle', 'Harmonia Romântica do Casal');
                      handleChange('soundtrackArtist', 'Sintetizador Harmônico (Cmaj7)');
                      handleChange('soundtrackUrl', '');
                    }}
                    className={`flex-1 p-3.5 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      formData.soundtrackType === 'synth'
                        ? 'bg-[#5E693D] text-white border-[#5E693D] shadow-xs'
                        : 'bg-white text-[#6B5E4F] border-[#5E693D]/20 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Radio className="w-4 h-4" />
                    <span>Músicas & Melodias Clássicas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleChange('soundtrackType', 'audio_url');
                      if (!formData.soundtrackUrl || formData.soundtrackUrl.includes('vocaroo')) {
                        handleChange('soundtrackTitle', 'Nossa Música Especial');
                        handleChange('soundtrackArtist', 'Música do Casal');
                        handleChange('soundtrackUrl', '');
                      }
                    }}
                    className={`flex-1 p-3.5 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      formData.soundtrackType === 'audio_url' && !formData.soundtrackUrl?.includes('vocaroo')
                        ? 'bg-[#5E693D] text-white border-[#5E693D] shadow-xs'
                        : 'bg-white text-[#6B5E4F] border-[#5E693D]/20 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <FileAudio className="w-4 h-4" />
                    <span>Link MP3 Próprio</span>
                  </button>
                </div>

                {/* 1. Curated Preset Tracks List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] flex items-center gap-1.5">
                      <Headphones className="w-3.5 h-3.5 text-[#5E693D]" />
                      Opções e Presets de Trilha Sonora
                    </span>
                    <span className="text-[11px] text-[#7A7164]">
                      {SOUNDTRACK_PRESETS.length} opções disponíveis
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SOUNDTRACK_PRESETS.map((preset) => {
                      const isSelected =
                        (preset.type === 'vocaroo' && formData.soundtrackType === 'vocaroo') ||
                        (preset.type === 'synth' && formData.soundtrackType === 'synth') ||
                        (preset.type === 'audio_url' && formData.soundtrackUrl === preset.url);

                      const isPreviewing = previewPlayingId === preset.id;

                      return (
                        <div
                          key={preset.id}
                          className={`p-4 rounded-2xl transition-all border flex flex-col justify-between gap-3 ${
                            isSelected
                              ? 'bg-white border-[#5E693D] ring-2 ring-[#5E693D]/30 shadow-xs'
                              : 'bg-white/80 border-[#5E693D]/15 hover:border-[#5E693D]/35'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#5E693D] border border-[#5E693D]/15">
                                {preset.genre}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                                  <Check className="w-3 h-3" />
                                  Ativa no Site
                                </span>
                              )}
                            </div>

                            <h6 className="font-bold text-sm text-[#363D2B] leading-snug">
                              {preset.name}
                            </h6>
                            <p className="text-xs text-[#5E693D] font-medium">
                              {preset.artist}
                            </p>
                            <p className="text-[11px] text-[#7A7164] line-clamp-2">
                              {preset.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-[#5E693D]/10">
                            {/* Preview button */}
                            <button
                              type="button"
                              onClick={() => handleTogglePreview(preset)}
                              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isPreviewing
                                  ? 'bg-[#E89CAE] text-[#363D2B]'
                                  : 'bg-[#FAF7F2] text-[#5E693D] hover:bg-[#5E693D]/10 border border-[#5E693D]/20'
                              }`}
                            >
                              {isPreviewing ? (
                                <>
                                  <Pause className="w-3.5 h-3.5" />
                                  <span>Pausar</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5" />
                                  <span>Ouvir Prévia</span>
                                </>
                              )}
                            </button>

                            {/* Select button */}
                            <button
                              type="button"
                              onClick={() => handleSelectPreset(preset)}
                              disabled={isSelected}
                              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#5E693D] text-white cursor-default opacity-90'
                                  : 'bg-[#5E693D]/15 text-[#5E693D] hover:bg-[#5E693D] hover:text-white'
                              }`}
                            >
                              {isSelected ? 'Música Atual' : 'Escolher Esta'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Custom Audio URL Form */}
                {formData.soundtrackType === 'audio_url' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#5E693D]/20 space-y-4 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <FileAudio className="w-4 h-4 text-[#5E693D]" />
                      <h5 className="font-bold text-sm text-[#363D2B]">
                        Personalizar com Link de Áudio Próprio (.MP3)
                      </h5>
                    </div>
                    <p className="text-xs text-[#7A7164]">
                      Cole o link direto de um arquivo de áudio (.mp3) hospedado na web:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Título da Canção
                        </label>
                        <input
                          type="text"
                          value={formData.soundtrackTitle || ''}
                          onChange={(e) => handleChange('soundtrackTitle', e.target.value)}
                          placeholder="Ex: A Thousand Years (Instrumental)"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs font-semibold text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                          Nome do Artista / Intérprete
                        </label>
                        <input
                          type="text"
                          value={formData.soundtrackArtist || ''}
                          onChange={(e) => handleChange('soundtrackArtist', e.target.value)}
                          placeholder="Ex: The Piano Guys / Christina Perri"
                          className="w-full px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5E4F] mb-1">
                        Link Direto do Arquivo de Áudio (.mp3 / stream)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={formData.soundtrackUrl || ''}
                          onChange={(e) => handleChange('soundtrackUrl', e.target.value)}
                          placeholder="https://exemplo.com/musica-do-casamento.mp3"
                          className="flex-1 px-3 py-2 rounded-xl border border-[#5E693D]/20 bg-[#FAF7F2] text-xs text-[#363D2B] focus:ring-2 focus:ring-[#5E693D] focus:outline-none font-mono text-[11px]"
                        />

                        {formData.soundtrackUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              handleTogglePreview({
                                id: 'custom-url-preview',
                                url: formData.soundtrackUrl,
                                type: 'audio_url'
                              });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                              previewPlayingId === 'custom-url-preview'
                                ? 'bg-[#E89CAE] text-[#363D2B]'
                                : 'bg-[#5E693D] text-white hover:bg-[#4E5832]'
                            }`}
                          >
                            {previewPlayingId === 'custom-url-preview' ? (
                              <>
                                <Pause className="w-3.5 h-3.5" />
                                <span>Pausar</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" />
                                <span>Testar Link</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Actions Inside Form */}
          <div className="pt-4 border-t border-[#5E693D]/15 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 bg-[#FAF7F2]/95 backdrop-blur-xs py-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 text-xs text-[#7A7164] hover:text-[#363D2B] py-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#5E693D]" />
              <span>Restaurar Padrão do Casamento</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#4A4238] border border-[#5E693D]/20 text-xs font-semibold cursor-pointer"
              >
                Fechar
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-[#5E693D] hover:bg-[#4E5832] text-white text-xs font-semibold uppercase tracking-wider shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{savedSuccess ? 'Salvo com Sucesso!' : 'Salvar Alterações'}</span>
              </button>
            </div>
          </div>

            </form>
          </main>
        </div>
      </div>
    </div>
  );
};
