'use client';
import Navbar from '../components/Navbar'; // Adjust path if needed
import { useState } from 'react';
import { MicrophoneIcon } from '@heroicons/react/24/solid';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }

  interface SpeechRecognition extends EventTarget {
    start(): void;
    stop(): void;
    onresult: ((event: any) => void) | null;
    onerror: ((event: any) => void) | null;
    onend: (() => void) | null;
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
  }
}

type SpeechRecognitionConstructor = new () => any;

type SpeechRecognitionEvent = {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
};

type SpeechRecognitionErrorEvent = {
  error: string;
};

const getSpeechRecognition = (): SpeechRecognitionConstructor | null => {
  if (typeof window === 'undefined') return null;

  return (
    window.SpeechRecognition ||
    (window as typeof window & {
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }).webkitSpeechRecognition ||
    null
  );
};

function formatNumberInput(value: string): string {
  if (value === '') return '';
  const parts = value.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
}

export default function Page3() {
  const [g, setG] = useState('');
  const [h, setH] = useState('');
  const [listeningField, setListeningField] = useState<null | 'g' | 'h'>(null);

  const isValidNumber = (val: string) =>
    !isNaN(parseFloat(val)) && isFinite(parseFloat(val));

  const gValue = parseFloat(g);
  const hValue = parseFloat(h);

  const canCalculate = isValidNumber(g) && isValidNumber(h) && hValue !== 0;

  const handleVoiceInput = (field: 'g' | 'h') => {
    if (listeningField) return;

    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListeningField(field);
    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      const numberMatch = transcript.match(/\d+(\.\d+)?/);
      const number = numberMatch ? numberMatch[0] : '';
      if (field === 'g') setG(number);
      if (field === 'h') setH(number);
      setListeningField(null);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      alert(
        event.error === 'no-speech'
          ? 'No speech detected. Please try again and speak clearly.'
          : `Speech error: ${event.error}`
      );
      setListeningField(null);
    };

    recognition.onend = () => {
      setListeningField(null);
    };
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 space-y-4">
      <Navbar />
      
      {/* Main Content Area */}
      <div
        className="rounded-2xl p-6 w-full max-w-md shadow-xl mt-20"
        style={{
          background: 'radial-gradient(circle, #1b2a3d, #2a4d6d)',
          color: '#f8f9fa',
        }}
      >
        {/* PH amount */}
        <div className="mb-2 font-semibold flex justify-between items-center">
  <span className="flex items-center gap-2">
    <img src="https://flagcdn.com/w40/ph.png" alt="Philippines Flag" className="w-6 h-4 rounded-sm" />
    PH amount
  </span>
          <button
            onClick={() => handleVoiceInput('g')}
            className="ml-2 text-white"
            aria-label="Speak PH amount"
          >
            <MicrophoneIcon className="h-5 w-5 hover:text-green-400 transition" />
          </button>
        </div>
        <input
          type="text"
          inputMode="decimal"
          value={g ? formatNumberInput(g) : ''}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, '');
            if (/^\d*\.?\d*$/.test(raw)) {
              setG(raw);
            } else if (raw === '') {
              setG('');
            }
          }}
          placeholder="Enter PH amount"
          className="w-full p-2 mb-4 border rounded bg-transparent"
        />

        {/* PHUS */}
        <div className="mb-2 font-semibold flex justify-between items-center">
          <span>PHPK</span>
          <button
            onClick={() => handleVoiceInput('h')}
            className="ml-2 text-white"
            aria-label="Speak PHUS"
          >
            <MicrophoneIcon className="h-5 w-5 hover:text-green-400 transition" />
          </button>
        </div>
        <input
          type="text"
          inputMode="decimal"
          value={h ? formatNumberInput(h) : ''}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, '');
            if (/^\d*\.?\d*$/.test(raw)) {
              setH(raw);
            } else if (raw === '') {
              setH('');
            }
          }}
          className="w-full p-2 mb-4 border rounded bg-transparent"
        />

        {canCalculate && (
          <div className="mt-6 grid grid-cols-1 gap-2">
            {[-0.10, -0.05, 0, 0.05, 0.10].map((offset) => {
              const adjustedPHUS = hValue + offset;
              const phAmount = adjustedPHUS !== 0 ? gValue * adjustedPHUS : null;

              return (
                <div
                  key={offset}
                  className="border border-gray-400 rounded-xl p-3 text-center text-md font-medium bg-white/10"
                >
                  {phAmount !== null ? (
                    <>
                      <span>PHUS: {adjustedPHUS.toFixed(2)}</span>
                      <span> PH amount: {phAmount.toFixed(2)}</span>
                    </>
                  ) : (
                    <div className="text-red-400">Invalid multiplication</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {listeningField && (
          <div className="mt-4 text-sm text-green-300 font-semibold animate-pulse">
            Listening for {listeningField === 'g' ? 'PH amount' : 'PHUS'}...
          </div>
        )}
      </div>
    </main>
  );
}
