import React from 'react';

export const MarginaliaRight = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full h-0">
    <span className="hidden md:block absolute top-[-3rem] -right-[280px] w-56 font-mono text-[13px] text-neutral-400 leading-relaxed">
      {children}
    </span>
    <span className="flex md:hidden items-start gap-2 mt-4 mb-2 font-mono text-[12px] text-neutral-400 leading-relaxed bg-neutral-50 px-3 py-2 rounded-lg border-l-2 border-[#FADBD8]">
      {children}
    </span>
  </div>
);

export const MarginaliaLeft = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full h-0">
    <span className="hidden md:block absolute top-[-3rem] -left-[280px] w-56 font-mono text-[13px] text-[#D4A373] text-right leading-relaxed">
      {children}
    </span>
    <span className="flex md:hidden items-start gap-2 mt-4 mb-2 font-mono text-[12px] text-[#D4A373] leading-relaxed bg-amber-50 px-3 py-2 rounded-lg border-r-2 border-[#D4A373] justify-end text-right">
      {children}
    </span>
  </div>
);

export const Highlight = ({ children, color = '#FADBD8' }: { children: React.ReactNode, color?: string }) => (
  <span style={{ backgroundColor: color }} className="text-neutral-900 rounded-[3px]">
    {children}
  </span>
);

export const Divider = () => (
  <div className="w-full h-[1px] border-t border-dotted border-neutral-300 my-16"></div>
);

export const TypewriterBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center font-mono text-[14px] text-neutral-400 leading-loose py-8">
    {children}
  </div>
);

export const DoodleEnd = () => (
  <div className="pt-32 pb-16 flex justify-center opacity-30">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="M12 18a6 6 0 100-12 6 6 0 000 12z"/>
      <path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/>
    </svg>
  </div>
);
