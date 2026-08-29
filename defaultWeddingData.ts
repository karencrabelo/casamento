import { WeddingConfig } from '../types';
import floralMonogramImg from '../assets/images/floral_monogram_transparent.png';

export const defaultWeddingData: WeddingConfig = {
  brideName: 'Karen',
  groomName: 'Jhonathan',
  initials: 'J & K',
  weddingDate: '2026-12-22T11:00:00',
  weddingDateFormatted: '22 de Dezembro de 2026 às 11:00',
  tagline: 'Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém separa.',
  loveQuote: 'Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém separa.',
  loveQuoteAuthor: 'Mateus 19:6',
  hashtag: '#CasamentoJhonathanEKaren',
  namesFontFamily: 'pinyon',
  titlesFontFamily: 'pinyon',
  monogramImageUrl: floralMonogramImg,

  // Location
  venueName: 'Brio Pasta & Grill',
  venueType: 'Almoço Comemorativo & Recepção Gastronômica',
  venueAddress: 'Av. Getúlio Vargas, 11-100 - Jardim América',
  venueCity: 'Bauru - SP',
  googleMapsUrl: 'https://maps.google.com/?q=Brio+Pasta+Grill+Av+Getulio+Vargas+Bauru',
  wazeUrl: 'https://waze.com/ul?q=Brio+Pasta+Grill+Bauru',
  appleMapsUrl: 'https://maps.apple.com/?q=Brio+Pasta+Grill+Bauru',
  parkingInfo: 'Estacionamento com serviço de valet e segurança no próprio local.',
  transferInfo: 'Excelente localização central de fácil acesso por táxi, aplicativo e transporte particular.',

  // Day Details & Dress code
  dressCodeTitle: 'Dress Code: Esporte Fino Elegante',
  dressCodeSubtitle: 'Sofisticação, leveza e conforto para celebrar em clima diurno',
  dressCodeDescription: 'Nossa celebração acontecerá em um almoço aconchegante e refinado. Convidamos todos a vestirem traje Esporte Fino Elegante, com tecidos leves e cores harmoniosas.',
  dressCodeAdvice: [
    'Mulheres: Vestidos leves fluidos (midi ou longos), macacões sofisticados ou conjuntos elegantes em tons florais, pasteis ou suaves.',
    'Homens: Camisa social com calça de alfaiataria ou sarja e sapato/sapatênis elegante. O blazer é bem-vindo e opcional.',
    'Dica de carinho: O branco, off-white e tons claríssimos são reservados exclusivamente para a noiva.'
  ],
  colorPalette: [
    { name: 'Rosa Cosmos', hex: '#E89CAE', description: 'Romantismo e doçura das pétalas florais' },
    { name: 'Verde Oliva & Musgo', hex: '#5E693D', description: 'Naturalidade botânica e folhagens' },
    { name: 'Lavanda & Violeta', hex: '#8B6990', description: 'Elegância e toque silvestre' },
    { name: 'Pêssego & Champagne', hex: '#F6C8B2', description: 'Acolhimento, calor e leveza' },
    { name: 'Areia Suave', hex: '#EFECE4', description: 'Base clássica e atemporal' }
  ],
  weatherAdvice: 'Dezembro costuma ter clima ensolarado e agradável. O ambiente do restaurante conta com climatização completa e espaço acolhedor.',

  // RSVP
  rsvpDeadline: '01 de Dezembro de 2026',
  rsvpWhatsappNumber: '5514999999999',

  // Gifts & Pix
  pixKey: 'jhonathan.karen.casamento@email.com',
  pixKeyType: 'E-mail',
  pixReceiverName: 'Jhonathan & Karen',
  pixBankName: 'Chave PIX dos Noivos',
  giftMessage: 'A presença e o carinho de vocês em nosso casamento é o maior e mais precioso presente! Se quiserem nos abençoar com um presente para o nosso lar ou com uma contribuição via PIX, ficaremos imensamente gratos.',
  giftRegistryLinks: [
    {
      name: 'Lista de Presentes para o Nosso Lar (Camicado)',
      url: 'https://lista.camicado.com.br/casamento_karenejhonathan',
      description: 'Utensílios, louças, roupas de cama e carinho para a nossa casa'
    }
  ],

  // Story
  story: [
    {
      id: '1',
      year: '2021',
      title: 'O Encontro de Almas',
      description: 'Nossos caminhos se cruzaram em um momento planejado por Deus. Uma conversa cheia de afinidade e risos sinceros mostrou que ali começava o capítulo mais bonito de nossas vidas.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      iconName: 'Coffee'
    },
    {
      id: '2',
      year: '2023',
      title: 'Crescendo Juntos em Amor e Fé',
      description: 'Entre planos, orações e muitos momentos especiais com a família e amigos, fomos construindo os alicerces do nosso amor, na certeza de que queríamos caminhar juntos para sempre.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      iconName: 'Heart'
    },
    {
      id: '3',
      year: '2025',
      title: 'O Pedido de Casamento!',
      description: 'Com o coração transbordando e lágrimas de alegria, veio o pedido mais esperado. Sob a bênção divina e a certeza do propósito, a resposta foi o mais doce e emocionado: SIM!',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      iconName: 'Sparkles'
    },
    {
      id: '4',
      year: '2026',
      title: 'O Grande Dia: 22 de Dezembro',
      description: 'Chegou o momento de selar nossa união diante de Deus e de todos aqueles que amamos no Brio Pasta & Grill. Estamos ansiosos para viver este dia mágico com vocês!',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      iconName: 'Home'
    }
  ],

  // Schedule
  schedule: [
    {
      id: '1',
      time: '11:00',
      title: 'Chegada dos Convidados & Welcome',
      description: 'Recepção carinhosa dos convidados com bebidas refrescantes e acolhimento no espaço Brio Pasta & Grill.',
      iconName: 'Users',
      location: 'Recepção Brio'
    },
    {
      id: '2',
      time: '11:30',
      title: 'A Cerimônia Religiosa & Bênção',
      description: 'Momento de oração, troca de votos e bênção matrimonial sob a palavra de Deus: "O que Deus uniu, ninguém separa".',
      iconName: 'HeartHandshake',
      location: 'Espaço da Cerimônia'
    },
    {
      id: '3',
      time: '12:30',
      title: 'Almoço Comemorativo & Brinde dos Noivos',
      description: 'Delicioso banquete assinado pelo Brio Pasta & Grill com massas artesanais, cortes especiais, saladas frescas e brinde com a família.',
      iconName: 'Utensils',
      location: 'Salão Gastronômico'
    },
    {
      id: '4',
      time: '14:30',
      title: 'Corte do Bolo, Doces Finos & Fotos',
      description: 'Corte tradicional do bolo dos noivos, mesa de doces florais e sessão de fotos com padrinhos, familiares e amigos queridos.',
      iconName: 'Sparkles',
      location: 'Mesa de Doces'
    },
    {
      id: '5',
      time: '15:30',
      title: 'Música, Confraternização & Brincadeiras',
      description: 'Tarde animada com boa música, momentos de confraternização, jogada do buquê e muita alegria.',
      iconName: 'Music',
      location: 'Área Social'
    },
    {
      id: '6',
      time: '17:30',
      title: 'Agradecimentos & Lembrancinhas',
      description: 'Abraços finais, entrega dos mimos personalizados e agradecimento por compartilharem este dia inesquecível conosco.',
      iconName: 'Heart',
      location: 'Saída'
    }
  ],

  // Special Touches
  specialTouches: [
    {
      id: '1',
      title: 'Gastronomia Brio Pasta & Grill',
      subtitle: 'Massas artesanais e cortes nobres',
      description: 'Um menu italiano e contemporâneo preparado com todo o carinho para encantar o paladar dos nossos convidados.',
      iconName: 'Utensils',
      highlight: 'Entradas, pratos principais e sobremesas especiais'
    },
    {
      id: '2',
      title: 'Decoração Romântica Floral',
      subtitle: 'Flores silvestres e delicadeza',
      description: 'Arranjos com cosmos rosa, lavandas, folhagens verdes e detalhes em aquarela inspirados no nosso convite oficial.',
      iconName: 'Sparkles',
      highlight: 'Flores naturais e atmosfera acolhedora'
    },
    {
      id: '3',
      title: 'Mesa de Doces & Bem-Casados',
      subtitle: 'Doces momentos para celebrar',
      description: 'Seleção requintada de doces finos, brigadeiros gourmet e os tradicionais bem-casados recheados com doce de leite artesanal.',
      iconName: 'Heart',
      highlight: 'Lembrança doce para levar para casa'
    },
    {
      id: '4',
      title: 'Livro de Mensagens dos Noivos',
      subtitle: 'Deixe seu carinho registrado',
      description: 'Queremos guardar cada palavra de afeto! Deixe uma mensagem especial em nosso livro de recordações na entrada.',
      iconName: 'HeartHandshake',
      highlight: 'Caderno de memórias e fotos instantâneas'
    },
    {
      id: '5',
      title: 'Playlist Romântica e Alegre',
      subtitle: 'A trilha sonora do nosso amor',
      description: 'Músicas que marcaram nossa trajetória, louvores de gratidão e canções alegres para celebrar a vida.',
      iconName: 'Music',
      highlight: 'Ambiente aconchegante e animado'
    },
    {
      id: '6',
      title: 'Lembrancinhas com Afeto',
      subtitle: 'Um pedacinho do nosso dia para você',
      description: 'Preparamos um mimo delicado e aromático para agradecer a presença tão significativa de cada um de vocês.',
      iconName: 'Smile',
      highlight: 'Entregue com amor ao final do almoço'
    }
  ],

  // FAQ
  faqs: [
    {
      id: '1',
      category: 'presenca',
      question: 'Até quando preciso confirmar minha presença?',
      answer: 'Pedimos a gentileza de confirmar sua presença até o dia 01 de Dezembro de 2026. A confirmação é fundamental para organizarmos o número de lugares e o buffet com o restaurante.'
    },
    {
      id: '2',
      category: 'presenca',
      question: 'Posso levar acompanhante ou pessoas adicionais?',
      answer: 'Nosso casamento foi planejado com muito amor para um número restrito de familiares e amigos queridos. Pedimos que considere apenas os nomes indicados nominalmente no seu convite.'
    },
    {
      id: '3',
      category: 'traje',
      question: 'Qual o traje ideal para o almoço comemorativo?',
      answer: 'O dress code é Esporte Fino Elegante. Para as mulheres, vestidos leves (midi ou longos) ou macacões refinados. Para os homens, camisa social com calça de sarja/alfaiataria e sapato confortável (o blazer é opcional). Lembramos que o branco e tons claríssimos são exclusivos da noiva.'
    },
    {
      id: '4',
      category: 'local',
      question: 'O local possui estacionamento?',
      answer: 'Sim! O restaurante Brio Pasta & Grill conta com serviço de valet e estacionamento no próprio local para sua tranquilidade e conforto.'
    },
    {
      id: '5',
      category: 'local',
      question: 'Qual o horário ideal de chegada?',
      answer: 'A recepção começará às 11:00 e a cerimônia terá início pontualmente às 11:30. Recomendamos chegar com alguns minutos de antecedência para se acomodar com calma.'
    },
    {
      id: '6',
      category: 'presentes',
      question: 'Como funciona a lista de presentes ou contribuição via Pix?',
      answer: 'Optamos por cotas de Lua de Mel via Pix e listas virtuais. Você pode copiar a chave Pix diretamente na seção de Presentes deste site ou acessar os links das lojas parceiras.'
    },
    {
      id: '7',
      category: 'geral',
      question: 'Qual a hashtag oficial para postarmos fotos nas redes sociais?',
      answer: 'Usem a hashtag #CasamentoJhonathanEKaren e nos marquem nas fotos para que possamos reviver cada registro lindo deste dia com vocês!'
    }
  ],

  // Soundtrack
  soundtrackTitle: 'Trilha Sonora dos Noivos (Vocaroo)',
  soundtrackArtist: 'Jhonathan & Karen',
  soundtrackType: 'vocaroo',
  soundtrackVocarooId: '1beZqpn5a28e',
  soundtrackUrl: 'https://media1.vocaroo.com/mp3/1beZqpn5a28e',
  soundtrackEmbedCode: '<div><iframe width="300" height="60" src="https://vocaroo.com/embed/1beZqpn5a28e?autoplay=0" frameborder="0" allow="autoplay"></iframe><br><a href="https://voca.ro/1beZqpn5a28e" title="Gravador de Voz do Vocaroo" target="_blank">Ver no Vocaroo &gt;&gt;</a></div>',
  soundtrackVolume: 0.7,
  soundtrackAutoPrompt: true
};

export interface SoundtrackPreset {
  id: string;
  name: string;
  artist: string;
  description: string;
  type: 'synth' | 'audio_url' | 'vocaroo';
  url: string;
  vocarooId?: string;
  embedCode?: string;
  genre: string;
}

export const SOUNDTRACK_PRESETS: SoundtrackPreset[] = [
  {
    id: 'vocaroo-noivos',
    name: 'Trilha Sonora dos Noivos (Vocaroo)',
    artist: 'Jhonathan & Karen',
    description: 'Áudio oficial dos noivos gravado no Vocaroo (código embed integrado).',
    type: 'vocaroo',
    vocarooId: '1beZqpn5a28e',
    url: 'https://media1.vocaroo.com/mp3/1beZqpn5a28e',
    embedCode: '<div><iframe width="300" height="60" src="https://vocaroo.com/embed/1beZqpn5a28e?autoplay=0" frameborder="0" allow="autoplay"></iframe><br><a href="https://voca.ro/1beZqpn5a28e" title="Gravador de Voz do Vocaroo" target="_blank">Ver no Vocaroo &gt;&gt;</a></div>',
    genre: 'Áudio dos Noivos'
  },
  {
    id: 'synth-romantic',
    name: 'Harmonia Romântica do Casal',
    artist: 'Sintetizador Harmônico (Cmaj7)',
    description: 'Arpejos suaves de piano e sinos celestiais sintetizados com progressão romântica.',
    type: 'synth',
    url: '',
    genre: 'Ambiente Suave'
  },
  {
    id: 'canon-d',
    name: 'Canon em Ré Maior (Pachelbel)',
    artist: 'Johann Pachelbel (Piano & Cordas)',
    description: 'A clássica e emocionante marcha cerimonial que embala entradas e celebrações.',
    type: 'audio_url',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c89a74c7c7.mp3?filename=canon-in-d-112197.mp3',
    genre: 'Clássico Cerimonial'
  },
  {
    id: 'clair-de-lune',
    name: 'Clair de Lune (Luz da Lua)',
    artist: 'Claude Debussy (Piano Solo)',
    description: 'Melodia poética, elegante e atemporal ao piano, perfeita para momentos românticos.',
    type: 'audio_url',
    url: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_9742c366ff.mp3?filename=debussy-clair-de-lune-piano-solo-124976.mp3',
    genre: 'Piano Neoclássico'
  },
  {
    id: 'acoustic-wedding',
    name: 'Promessa de Amor (Acoustic Guitar)',
    artist: 'Acústico Romântico',
    description: 'Violão dedilhado acolhedor e afetuoso, ideal para recepções e almoços ao ar livre.',
    type: 'audio_url',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2452370ca3.mp3?filename=gentle-acoustic-guitar-11029.mp3',
    genre: 'Acústico Leve'
  },
  {
    id: 'wedding-march-gentle',
    name: 'A Thousand Dreams (Piano & Cello)',
    artist: 'Melodia de Casamento',
    description: 'Harmonia comovente de piano e violoncelo que toca o coração dos convidados.',
    type: 'audio_url',
    url: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_34991c0628.mp3?filename=wedding-piano-and-cello-10874.mp3',
    genre: 'Romance Instrumental'
  }
];


