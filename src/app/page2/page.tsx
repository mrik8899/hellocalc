'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MicrophoneIcon } from '@heroicons/react/24/solid';

export default function Page2() {
  const [g, setG] = useState('');
  const [h, setH] = useState('');
  const [listeningField, setListeningField] = useState<null | 'g' | 'h'>(null);

  const i = h !== '0' && h !== '' ? parseFloat(g) / parseFloat(h) : null;

  const format = (num: number | null) =>
    num !== null ? Math.round(num).toLocaleString() : '';

  const handleVoiceInput = (field: 'g' | 'h') => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListeningField(field);

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const numberMatch = transcript.match(/\d+(\.\d+)?/);
      const number = numberMatch ? numberMatch[0] : '';
      if (field === 'g') setG(number);
      if (field === 'h') setH(number);
      setListeningField(null);
    };

    recognition.onerror = (event: any) => {
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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      <div
        className="rounded-2xl p-6 w-full max-w-md shadow-xl"
        style={{
          background: 'radial-gradient(circle, #1b2a3d, #2a4d6d)',
          color: '#f8f9fa',
        }}
      >
        {/* PK amount */}
        <div className="mb-2 font-semibold flex justify-between items-center">
          <span>PK amount</span>
          <button onClick={() => handleVoiceInput('g')} className="ml-2 text-white">
            <MicrophoneIcon className="h-5 w-5 hover:text-green-400 transition" />
          </button>
        </div>
        <input
          type="number"
          value={g}
          onChange={(e) => setG(e.target.value)}
          placeholder="Enter PK amount"
          className="w-full p-2 mb-4 border rounded text-black"
        />

        {/* PHUS */}
        <div className="mb-2 font-semibold flex justify-between items-center">
          <span>PHUS</span>
          <button onClick={() => handleVoiceInput('h')} className="ml-2 text-white">
            <MicrophoneIcon className="h-5 w-5 hover:text-green-400 transition" />
          </button>
        </div>
        <input
          type="number"
          value={h}
          onChange={(e) => setH(e.target.value)}
          placeholder="Enter PHUS"
          className="w-full p-2 mb-4 border rounded text-black"
        />

        {/* PH amount */}
        <div className="mb-2 font-semibold">PH amount</div>
        <div className="text-xl">{format(i)}</div>

        {/* Listening status */}
        {listeningField && (
          <div className="mt-4 text-sm text-green-300 font-semibold animate-pulse">
            Listening for {listeningField === 'g' ? 'PK amount' : 'PHUS'}...
          </div>
        )}
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-xl shadow hover:bg-gray-800 transition-all"
      >
        Back to Home
      </Link>
    </main>
  );
}
