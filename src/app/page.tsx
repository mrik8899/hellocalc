'use client';

import Navbar from './components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [d, setD] = useState('');
  const [g, setG] = useState('');
  const [h, setH] = useState('');

  const parsedA = parseFloat(a);
  const parsedB = parseFloat(b);
  const parsedD = parseFloat(d);
  const parsedG = parseFloat(g.replace(/,/g, ''));
  const parsedH = parseFloat(h);

  const c = b && parsedB !== 0 ? parsedA / parsedB : null;
  const e = b && parsedB !== 0 ? parsedD / parsedB : null;
  const f = e !== null ? parsedA * e : null;
  const i = h !== '0' && h !== '' ? parsedG / parsedH : null;

  const format = (num: number | null) =>
    num !== null && !isNaN(num) ? Math.round(num).toLocaleString() : '';

  const handleRefresh = () => {
    setA('');
    setB('');
    setD('');
    setG('');
    setH('');
  };

  return (
    <main className="flex flex-col min-h-screen pt-20">
   
   <Navbar />

      {/* Main content */}
      <div className="flex flex-col items-center justify-start p-4 space-y-6 w-full max-w-screen-md mx-auto h-full">
 {/* Adjusted height */}
        {/* Box 1 */}
        <div
          className="rounded-2xl p-6 w-full max-w-lg shadow-lg mb-4"
          style={{
            background: 'radial-gradient(circle, #1b2a3d, #2a4d6d)',
            color: '#f8f9fa',
          }}
        >
          <div className="mb-3 text-lg font-semibold text-center">USPK / USPH</div>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Enter USPK"
              className={`w-full p-2 mb-4 rounded border transition-all duration-300 ${
                a ? 'border-green-400 ring-2 ring-green-300' : 'border-gray-300'
              }`}
            />
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Enter USPH"
              className={`w-full p-2 mb-4 rounded border transition-all duration-300 ${
                b ? 'border-blue-400 ring-2 ring-blue-300' : 'border-gray-300'
              }`}
            />
          </div>
          <div className="flex justify-center items-center border border-white/40 rounded-lg px-4 py-2 mt-2 space-x-2 text-xl backdrop-blur-sm">
            <span className="font-semibold">@</span>
            <span>{c !== null && !isNaN(c) ? c.toFixed(2) : ''}</span>
          </div>
        </div>

        {/* Box 2 */}
        <div
          className="rounded-2xl p-6 w-full max-w-lg shadow-xl mb-4"
          style={{
            background: 'radial-gradient(circle, #1b2a3d, #2a4d6d)',
            color: '#f8f9fa',
          }}
        >
          <div className="mb-2 font-semibold">PH amount</div>
          <input
            inputMode="numeric"
            value={d ? Number(d).toLocaleString() : ''}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, '');
              if (/^\d*$/.test(raw)) {
                setD(raw);
              }
            }}
            placeholder="Enter PH amount"
            className={`w-full p-2 mb-4 rounded border transition-all duration-300 ${
              d ? 'border-blue-400 ring-2 ring-blue-300' : 'border-gray-300'
            }`}
          />
          <div className="flex justify-between items-center border border-white/40 rounded-lg px-4 py-2 mt-4 text-xl backdrop-blur-sm space-x-6">
            <div className="font-semibold">
              US: <span className="font-normal">{e !== null && !isNaN(e) ? e.toFixed(2) : ''}</span>
            </div>
            <div className="font-semibold">
              PK: <span className="font-normal">{format(f)}</span>
            </div>
          </div>
        </div>

        {/* Box 3 
        <div
          className="rounded-2xl p-6 w-full max-w-lg shadow-xl mb-4"
          style={{
            background: 'radial-gradient(circle, #1b2a3d, #2a4d6d)',
            color: '#f8f9fa',
          }}
        >
          <div className="mb-2 font-semibold text-center">PK amount ➝ PH amount</div>
          <div className="flex gap-2 mb-4">
            <input
              inputMode="numeric"
              value={g}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, '');
                if (/^\d*$/.test(raw)) {
                  setG(Number(raw).toLocaleString());
                }
              }}
              placeholder="Enter PK amount"
              className="w-full p-2 rounded border"
            />
            <input
              type="number"
              value={h}
              onChange={(e) => setH(e.target.value)}
              placeholder="Enter PHUS"
              className="w-full p-2 rounded border"
            />
          </div>
          <div className="text-xl text-center mt-2">
            <span className="font-semibold">PH amount: </span>
            <span>{format(i)}</span>
          </div>
        </div>

        */}

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-[#2a4d6d] to-[#536976] text-white rounded-xl shadow hover:bg-blue-600 transition-all"
        >
          Refresh
        </button>
      </div>
    </main>
  );
}
