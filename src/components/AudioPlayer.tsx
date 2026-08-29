import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc3 } from 'lucide-react';
import { ViolaBlossom } from './FloralDecorations';
import { WeddingConfig } from '../types';

interface AudioPlayerProps {
  config?: WeddingConfig;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ config }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showTrackInfo, setShowTrackInfo] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isLoopingRef = useRef<boolean>(false);
  const timeoutIdsRef = useRef<number[]>([]);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);

  const trackTitle = config?.soundtrackTitle || 'Trilha Sonora dos Noivos (Vocaroo)';
  const trackArtist = config?.soundtrackArtist || 'Jhonathan & Karen';
  const soundtrackType = config?.soundtrackType || 'vocaroo';
  const soundtrackUrl = config?.soundtrackUrl || 'https://media1.vocaroo.com/mp3/1beZqpn5a28e';
  const vocarooId = config?.soundtrackVocarooId || '1beZqpn5a28e';
  const volume = typeof config?.soundtrackVolume === 'number' ? config.soundtrackVolume : 0.7;

  // Romantic chord progression generator using Web Audio API
  // Chords: Cmaj7 -> Am9 -> Fmaj7 -> Gsus4 -> Cmaj7
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
    [220.00, 261.63, 329.63, 392.00, 493.88], // Am9 (A3, C4, E4, G4, B4)
    [174.61, 261.63, 329.63, 392.00], // Fmaj7 (F3, C4, E4, G4)
    [196.00, 261.63, 293.66, 392.00], // Gsus4 (G3, C4, D4, G4)
    [261.63, 329.63, 392.00, 523.25]  // Cmaj (C4, E4, G4, C5)
  ];

  const playChordNote = (freq: number, startTime: number, duration: number, gainNode: GainNode) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Warm gentle bell / piano like synthesizer with smooth attack and decay
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    
    // Slight vibrato / warm detune
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(3.5, startTime);
    lfoGain.gain.setValueAtTime(0.8, startTime);
    lfo.connect(osc.frequency);
    lfo.start(startTime);
    lfo.stop(startTime + duration);

    // Envelope
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.06 * volume, startTime + 0.15);
    noteGain.gain.exponentialRampToValueAtTime(0.03 * volume, startTime + 0.8);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(noteGain);
    noteGain.connect(gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const scheduleProgression = () => {
    if (!isLoopingRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(volume, ctx.currentTime);
    mainGain.connect(ctx.destination);

    let currentTime = ctx.currentTime + 0.1;
    const chordDuration = 3.6;

    chords.forEach((chord) => {
      // Arpeggiate chord notes softly
      chord.forEach((freq, noteIdx) => {
        const noteStart = currentTime + noteIdx * 0.45;
        playChordNote(freq, noteStart, 3.2, mainGain);
      });
      currentTime += chordDuration;
    });

    const totalDuration = currentTime - ctx.currentTime;
    const nextTimeout = window.setTimeout(() => {
      if (isLoopingRef.current) {
        scheduleProgression();
      }
    }, totalDuration * 1000 - 300);

    timeoutIdsRef.current.push(nextTimeout);
  };

  const startMusic = () => {
    setHasInteracted(true);
    setShowTrackInfo(true);
    setTimeout(() => setShowTrackInfo(false), 4500);

    const isAudioStream = (soundtrackType === 'audio_url' || soundtrackType === 'vocaroo') && (soundtrackUrl.trim() || vocarooId);
    
    if (isAudioStream) {
      // Stop synth if running
      stopSynth();
      try {
        const streamUrl = soundtrackUrl.trim() || `https://media1.vocaroo.com/mp3/${vocarooId || '1beZqpn5a28e'}`;
        if (!htmlAudioRef.current) {
          htmlAudioRef.current = new Audio(streamUrl);
          htmlAudioRef.current.loop = true;
        } else if (htmlAudioRef.current.src !== streamUrl) {
          htmlAudioRef.current.src = streamUrl;
        }
        htmlAudioRef.current.volume = volume;
        htmlAudioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Audio URL play error, attempting alternate source or synth fallback', err);
            // Try backup vocaroo media url if applicable
            if (vocarooId && !htmlAudioRef.current?.src.includes('media.vocaroo.com')) {
              if (htmlAudioRef.current) {
                htmlAudioRef.current.src = `https://media.vocaroo.com/mp3/${vocarooId}`;
                htmlAudioRef.current.play()
                  .then(() => setIsPlaying(true))
                  .catch(() => startSynth());
                return;
              }
            }
            startSynth();
          });
      } catch (e) {
        console.error('Audio init error', e);
        startSynth();
      }
    } else {
      // Stop html audio if playing
      if (htmlAudioRef.current) {
        htmlAudioRef.current.pause();
      }
      startSynth();
    }
  };

  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      isLoopingRef.current = true;
      scheduleProgression();
      setIsPlaying(true);
    } catch (e) {
      console.error('Audio start failed', e);
    }
  };

  const stopSynth = () => {
    isLoopingRef.current = false;
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const stopMusic = () => {
    stopSynth();
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // If track configuration changes while playing, restart with new audio
  useEffect(() => {
    if (isPlaying) {
      stopMusic();
      startMusic();
    }
  }, [soundtrackUrl, soundtrackType]);

  // Adjust volume if changed
  useEffect(() => {
    if (htmlAudioRef.current) {
      htmlAudioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopSynth();
      if (htmlAudioRef.current) {
        htmlAudioRef.current.pause();
        htmlAudioRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 font-montserrat">
      {/* Floating Track Info Badge on Play */}
      {isPlaying && (showTrackInfo || isPlaying) && (
        <div
          className={`absolute bottom-full right-0 mb-2 transition-all duration-500 pointer-events-none ${
            showTrackInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 sm:opacity-90'
          }`}
        >
          <div className="bg-[#2C3224]/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#5E693D]/40 shadow-lg text-[11px] flex items-center gap-2 whitespace-nowrap">
            <Disc3 className="w-3.5 h-3.5 text-[#E89CAE] animate-spin" style={{ animationDuration: '4s' }} />
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white/95">{trackTitle}</span>
              <span className="text-white/60">·</span>
              <span className="text-[#E89CAE] text-[10px]">{trackArtist}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Music Toggle Button */}
      <button
        id="btn-toggle-music"
        onClick={toggleMusic}
        onMouseEnter={() => isPlaying && setShowTrackInfo(true)}
        title={isPlaying ? `Pausar trilha: ${trackTitle}` : `Tocar trilha sonora: ${trackTitle}`}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-xs md:text-sm font-medium transition-all duration-300 backdrop-blur-md border cursor-pointer ${
          isPlaying
            ? 'bg-[#5E693D] text-white border-[#5E693D]/60 shadow-[#5E693D]/30 scale-105'
            : 'bg-[#2C3224]/85 text-white hover:bg-[#2C3224] border-[#5E693D]/40 shadow-black/20 hover:scale-105'
        }`}
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E89CAE] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E89CAE]"></span>
            </span>
            <Volume2 className="w-4 h-4 text-[#E89CAE] animate-pulse" />
            <span className="hidden sm:inline">Música Ambiente</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#C6D4BD]" />
            <span className="hidden sm:inline">Ouvir Trilha Sonora</span>
            <Music className="w-3.5 h-3.5 text-[#C6D4BD] sm:hidden" />
          </>
        )}
      </button>

      {/* Hint Bubble before first interaction */}
      {!hasInteracted && !isPlaying && (
        <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-white text-[#5E693D] text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-md border border-[#E89CAE]/40 pointer-events-none animate-bounce flex items-center gap-1.5">
          <ViolaBlossom size={12} />
          <span>Toque para ouvir a música</span>
        </div>
      )}
    </div>
  );
};

