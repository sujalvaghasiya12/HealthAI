
import React, { useState, useEffect } from 'react';
import { UIStrings } from '../types';

interface LoadingStateProps {
  ui: UIStrings;
}

const LoadingState: React.FC<LoadingStateProps> = ({ ui }) => {
  const [msgIdx, setMsgIdx] = useState(0);
  const messages = ui.loadingMessages;

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-200 shadow-sm">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
      </div>
      <p className="text-lg font-bold text-slate-800 animate-pulse text-center px-4">{messages[msgIdx]}</p>
      <p className="text-sm text-slate-400 mt-2">{ui.loadingSub}</p>
    </div>
  );
};

export default LoadingState;
