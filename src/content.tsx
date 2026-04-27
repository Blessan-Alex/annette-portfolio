import React from 'react';

export interface ContentItem {
  id: string;
  title: string;
  subtext: string;
  date: string;
  tabName: 'Articles' | 'Journals' | 'Doodles';
  category?: string;
  thumbnail?: string;
  renderContent: () => React.ReactNode;
}

// Reusable UI components for content
export const MarginaliaRight = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className="hidden md:block absolute top-0 -right-[280px] w-56 font-mono text-[13px] text-neutral-400 leading-relaxed">
      {children}
    </span>
    <span className="block md:hidden mt-4 pl-4 border-l border-[#FADBD8] font-mono text-[13px] text-neutral-400">
      {children}
    </span>
  </>
);

export const MarginaliaLeft = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className="hidden md:block absolute top-2 -left-[280px] w-56 font-mono text-[13px] text-[#D4A373] text-right leading-relaxed">
      {children}
    </span>
    <span className="block md:hidden mt-4 pr-4 border-r border-[#D4A373] font-mono text-[13px] text-[#D4A373] text-right">
      {children}
    </span>
  </>
);

export const Highlight = ({ children, color = '#FADBD8' }: { children: React.ReactNode, color?: string }) => (
  <span style={{ backgroundColor: color }} className="px-1 -mx-1 text-neutral-900 rounded-sm">
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

export const articles: ContentItem[] = [
  {
    id: 'elsewhere',
    title: 'Elsewhere',
    subtext: 'A brief encounter at a station out of time.',
    date: 'Oct 12, 2023',
    tabName: 'Articles',
    category: 'Writing · Story',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    renderContent: () => (
      <>
        <p className="relative">
          The train arrived at a platform that didn't seem to belong to any particular century. Iron rafters curved overhead, painted a bruised plum color that was peeling in long, curling strips. It was quiet, the kind of quiet that feels deliberate, as if the air itself was holding its breath.
        </p>
        <p className="relative">
          I stepped out, my boots echoing slightly on the damp stone. A scent hung in the air—a mixture of wet coal, crushed lavender, and something distinctly metallic. It was a place constructed entirely from <Highlight>half-remembered dreams</Highlight> and discarded letters. I had no map, no address, and curiously, no sense of urgency.
          <MarginaliaRight>* I swear I had been here before, perhaps in a fever dream when I was seven.</MarginaliaRight>
        </p>
        <Divider />
        <TypewriterBlock>
          <p>the clock hands are stuck</p>
          <p>on a quarter to midnight</p>
          <p>and the rain never quite</p>
          <p>touches the ground.</p>
        </TypewriterBlock>
        <Divider />
        <p className="relative">
          Walking through the narrow streets, the architecture seemed to fold in on itself. Buildings leaned toward one another like conspirators whispering secrets. There were no faces at the windows, only the occasional flicker of candlelight reflecting off rain-slicked glass.
        </p>
        <p className="relative">
          <MarginaliaLeft>* The handle felt warm to the touch.</MarginaliaLeft>
          Eventually, I found an unmarked door made of dark, heavy oak. It was slightly ajar, inviting or perhaps merely indifferent. I pushed it open, stepping into a room that smelled overwhelmingly of old paper and dust. This was it. The place where the noise stopped.
        </p>
        <DoodleEnd />
      </>
    )
  },
  {
    id: 'architecture-of-silence',
    title: 'The Architecture of Silence',
    subtext: 'How space dictates the absence of sound.',
    date: 'Nov 04, 2023',
    tabName: 'Articles',
    category: 'Reading · Blog',
    renderContent: () => (
      <>
        <p className="relative">
          We often think of silence as merely the absence of noise, an empty vessel waiting to be filled. But silence has <Highlight color="#E8F8F5">volume</Highlight>, weight, and texture. It occupies a room just as tangibly as a heavy oak table or a velvet armchair.
          <MarginaliaRight>* Or the heavy breathing of a dormant house.</MarginaliaRight>
        </p>
        <Divider />
        <p className="relative">
          The geometry of a space directly shapes its silence. A cathedral's soaring vaulted ceilings create a hollow, expectant quiet—a silence that stretches upward, demanding reverence. Conversely, a small, wood-paneled library fosters a dense, insulating silence, a thick blanket that wraps around your thoughts.
        </p>
        <p className="relative">
          <MarginaliaLeft>* I traced the grooves of the woodwork, listening to the dust settle.</MarginaliaLeft>
          When we design spaces, we are not just arranging walls and windows; we are sculpting the acoustics of human interaction. We are designing the pauses between words, the echo of a footstep, the gentle thrum of isolation.
        </p>
        <DoodleEnd />
      </>
    )
  },
  {
    id: 'midnight-trains',
    title: 'Midnight Trains',
    subtext: 'Observations from the window seat.',
    date: 'Dec 22, 2023',
    tabName: 'Articles',
    category: 'Photography · Film',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    renderContent: () => (
      <>
        <p className="relative">
          There is a specific sort of anonymity granted by the 11:42 PM commuter train. The cabin is bathed in a harsh, fluorescent glare, yet everyone is shrouded in their own private darkness. 
        </p>
        <p className="relative">
          Outside the window, the city is a blur of streaking amber streetlights and neon signs bleeding into the wet pavement. <Highlight color="#FCF3CF">The reflection of my own face</Highlight> is superimposed over passing industrial parks and empty parking lots.
          <MarginaliaRight>* A ghost watching ghosts.</MarginaliaRight>
        </p>
        <Divider />
        <TypewriterBlock>
          <p>rhythm of the tracks</p>
          <p>clack-clack</p>
          <p>a steady heartbeat</p>
          <p>in a steel ribcage</p>
        </TypewriterBlock>
        <Divider />
        <p className="relative">
          <MarginaliaLeft>* The conductor never asks for tickets after 1 AM.</MarginaliaLeft>
          I watch a woman two rows down leaning her forehead against the vibrating glass. What is she returning to? Or perhaps, what is she running from? The midnight train asks no questions, it merely facilitates the transit of solitary souls.
        </p>
        <DoodleEnd />
      </>
    )
  },
  {
    id: 'coffee-and-rain',
    title: 'Coffee and Rain',
    subtext: 'A sensory study of Sunday mornings.',
    date: 'Jan 15, 2024',
    tabName: 'Articles',
    category: 'Hobbies · Coffee',
    thumbnail: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop',
    renderContent: () => (
      <>
        <p className="relative">
          The ritual begins with the sound of grinding beans—a harsh, mechanical roar that fractures the quiet morning. Then, the bloom. Pouring hot water over fresh grounds releases a volatile cloud of aromas: dark chocolate, toasted nuts, and a hint of something feral.
        </p>
        <p className="relative">
          <MarginaliaRight>* The water must be exactly 205°F.</MarginaliaRight>
          Simultaneously, the rain begins. It's a slow, methodical drizzle, tapping against the window pane in a syncopated rhythm. The smell of petrichor—wet earth and asphalt—seeps through the cracked window, mingling with the heavy, bitter scent of the espresso.
        </p>
        <p className="relative">
          <Highlight color="#EAECEE">It is in this intersection of warmth and cold</Highlight>, of bitter and fresh, that I find the most clarity. The world is temporarily paused, held at bay by a ceramic mug and a pane of glass.
        </p>
        <DoodleEnd />
      </>
    )
  },
  {
    id: 'terminal-game',
    title: 'The Terminal Game',
    subtext: 'A short story about blinking cursors.',
    date: 'Feb 08, 2024',
    tabName: 'Articles',
    category: 'Writing · Story',
    renderContent: () => (
      <>
        <p className="relative">
          It started with a flashing cursor, and ended with a missing person. 
          <MarginaliaLeft>* I never should have typed "yes".</MarginaliaLeft>
        </p>
        <p className="relative">
          The screen was black, save for the bright green underscore blinking steadily. <code>_</code>. No prompt, no operating system logo. Just the void waiting for input. I typed "hello", the keys clacking loudly in my silent apartment. The cursor blinked three times before rendering a response.
        </p>
        <Divider />
        <TypewriterBlock>
          <p>&gt; HELLO. SHALL WE PLAY A GAME?</p>
        </TypewriterBlock>
        <Divider />
        <p className="relative">
          I had seen this movie before. It was a cliché. But the hairs on my arms stood up anyway. I hesitated, my fingers hovering over the home row. I pressed 'Y', then 'E', then 'S'. The screen cleared, and a single string of coordinates appeared. They led to a location precisely three blocks from my current position.
        </p>
        <DoodleEnd />
      </>
    )
  }
];

export const journals: ContentItem[] = [
  {
    id: 'oct-12',
    title: 'The Space Between',
    subtext: 'October 12th',
    date: 'Oct 12, 2023',
    tabName: 'Journals',
    category: 'Journal · Reflection',
    renderContent: () => (
      <>
        <p className="relative">
          Lately, I’ve been fascinated by the negative space in my life. The hours spent in transit, the silent moments between finishing a task and starting another. We are so obsessed with being 'full'—full calendars, full stomachs, full minds—that we forget to appreciate the emptiness.
        </p>
        <p className="relative">
           <Highlight color="#F5EEF8">Emptiness is where breathing happens.</Highlight>
           <MarginaliaRight>* Note to self: leave the phone in another room tomorrow.</MarginaliaRight>
        </p>
        <p className="relative">
          Today, I sat on a park bench and did absolutely nothing for forty-five minutes. I didn't listen to a podcast, I didn't read a book. I just watched the wind manipulate the branches of a large elm tree. It was terrifyingly boring for the first ten minutes, and then, suddenly, immensely liberating.
        </p>
        <DoodleEnd />
      </>
    )
  },
  {
    id: 'sep-04',
    title: 'Unsent Letters',
    subtext: 'September 4th',
    date: 'Sep 04, 2023',
    tabName: 'Journals',
    category: 'Writing · Thoughts',
    thumbnail: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=800&auto=format&fit=crop',
    renderContent: () => (
      <>
        <p className="relative">
          I have a digital folder titled 'Archive/Drafts' that is essentially a graveyard of things I couldn't bring myself to say. 
          <MarginaliaLeft>* 47 drafts and counting.</MarginaliaLeft>
        </p>
        <p className="relative">
          There are apologies that feel too late, confessions that feel too heavy, and angry rebuttals to arguments that happened three years ago. Sometimes I read through them and marvel at how intensely I felt about things that I can barely remember now. Writing them was the exorcism; sending them was unnecessary.
        </p>
        <DoodleEnd />
      </>
    )
  },
  {
    id: 'aug-21',
    title: 'A Morning in Paris',
    subtext: 'August 21st',
    date: 'Aug 21, 2023',
    tabName: 'Journals',
    category: 'Travel · Note',
    renderContent: () => (
      <>
        <p className="relative">
          The light in Paris is different. It's not just a romantic cliché; there's a softness to it, a diffused golden quality that makes everything look slightly painted. 
        </p>
        <p className="relative">
          <Highlight color="#FEF9E7">I bought a croissant from a bakery near the Canal Saint-Martin.</Highlight> It was impossibly flaky, showering my lap in buttery shards with every bite. The man next to me was smoking a cigarette and reading a worn paperback, looking completely at peace with the world. For a moment, so was I.
        </p>
        <DoodleEnd />
      </>
    )
  },
  {
    id: 'jul-15',
    title: 'The Anatomy of a Thought',
    subtext: 'July 15th',
    date: 'Jul 15, 2023',
    tabName: 'Journals',
    category: 'Journal · Reflection',
    renderContent: () => (
      <>
        <p className="relative">
          How do ideas form? Today I tried to trace a thought backward to its origin. I ended up thinking about ocean currents, which reminded me of a documentary I saw last week, which I watched because a friend mentioned jellyfish, which came up because we were eating noodles that had a similar texture.
          <MarginaliaRight>* The brain is a chaotic pinball machine.</MarginaliaRight>
        </p>
        <p className="relative">
          It made me realize how little control we have over our own inspiration. It's all just collision and synthesis.
        </p>
        <DoodleEnd />
      </>
    )
  },
  {
    id: 'jun-02',
    title: 'Chasing Shadows',
    subtext: 'June 2nd',
    date: 'Jun 02, 2023',
    tabName: 'Journals',
    category: 'Photography · Film',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    renderContent: () => (
      <>
        <p className="relative">
          I spent the afternoon photographing shadows cast by architectural grates. The harsh midday sun created perfect, aggressive geometric patterns on the concrete.
          <MarginaliaLeft>* High contrast, black and white.</MarginaliaLeft>
        </p>
        <p className="relative">
          There is something beautiful about photographing the absence of light. A shadow is a temporary stamp, a fleeting interaction between an object and a star millions of miles away. Tomorrow, the angle will be slightly different, and this specific shadow will never exist again.
        </p>
        <DoodleEnd />
      </>
    )
  }
];

export const doodles: ContentItem[] = [
  {
    id: 'generative-grids',
    title: 'Generative Grids',
    subtext: 'CSS experiments with geometry.',
    date: 'Mar 10, 2024',
    tabName: 'Doodles',
    category: 'Art · Design',
    renderContent: () => (
      <>
        <p className="relative text-center mb-16">
          Exploring the tension between strict grid systems and random visual interruptions.
        </p>
        <div className="w-full max-w-sm mx-auto grid grid-cols-5 grid-rows-5 gap-1 mb-16">
           {Array.from({length: 25}).map((_, i) => (
             <div key={i} className={`aspect-square ${i % 3 === 0 ? 'bg-neutral-900' : i % 7 === 0 ? 'bg-neutral-300 border border-neutral-900 flex items-center justify-center text-xs' : 'border border-neutral-200'}`}>
               {i % 7 === 0 && '×'}
             </div>
           ))}
        </div>
        <p className="relative font-mono text-xs text-center text-neutral-400">
          Rendered using Tailwind CSS grids and pseudo-random index mapping.
        </p>
      </>
    )
  },
  {
    id: 'ink-spills',
    title: 'Ink Spills',
    subtext: 'Digital fluid simulations.',
    date: 'Feb 28, 2024',
    tabName: 'Doodles',
    category: 'Art · Code',
    renderContent: () => (
      <>
        <p className="relative text-center mb-16">
          <Highlight color="#E8F8F5">Controlled chaos.</Highlight> Simulating the unpredictable spread of ink on fibrous paper.
        </p>
        <div className="w-full max-w-md mx-auto aspect-video bg-neutral-100 rounded-2xl relative overflow-hidden flex items-center justify-center mb-16">
           <div className="absolute w-32 h-32 bg-black rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse"></div>
           <div className="absolute w-40 h-40 bg-neutral-800 rounded-full mix-blend-multiply blur-2xl opacity-50 translate-x-12 -translate-y-8"></div>
           <div className="absolute w-24 h-24 bg-neutral-900 rounded-full mix-blend-multiply blur-lg opacity-80 -translate-x-16 translate-y-12"></div>
        </div>
      </>
    )
  },
  {
    id: 'coffee-stains',
    title: 'Coffee Stains',
    subtext: 'The beauty of accidents.',
    date: 'Feb 14, 2024',
    tabName: 'Doodles',
    category: 'Art · Experiments',
    thumbnail: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800&auto=format&fit=crop',
    renderContent: () => (
      <>
        <p className="relative text-center mb-16">
          Every mug leaves a signature. 
          <MarginaliaRight>* A perfect ring of espresso.</MarginaliaRight>
        </p>
        <div className="w-full max-w-sm mx-auto aspect-square bg-[#FAF9F6] border border-neutral-100 flex items-center justify-center relative mb-16">
          <div className="w-48 h-48 rounded-full border-[3px] border-[#8B5A2B] opacity-40"></div>
          <div className="absolute w-48 h-48 rounded-full border border-[#8B5A2B] opacity-20 translate-x-1 translate-y-2"></div>
          <div className="absolute w-4 h-4 bg-[#8B5A2B] rounded-full opacity-30 -translate-x-24 translate-y-20 blur-[1px]"></div>
        </div>
      </>
    )
  },
  {
    id: 'marginalia-sketches',
    title: 'Marginalia Sketches',
    subtext: 'What happens in the margins.',
    date: 'Jan 30, 2024',
    tabName: 'Doodles',
    category: 'Art · Doodles',
    renderContent: () => (
      <>
         <p className="relative text-center mb-16">
          The most interesting thoughts rarely happen on the main lines.
        </p>
        <div className="w-full max-w-lg mx-auto bg-white p-12 border border-neutral-200 shadow-sm relative font-serif text-lg leading-loose text-neutral-300 select-none mb-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          
          <div className="absolute top-8 -right-16 text-neutral-900 transform rotate-12">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M20,50 Q40,20 60,50 T100,50" />
               <circle cx="20" cy="50" r="4" fill="currentColor"/>
               <circle cx="100" cy="50" r="4" fill="currentColor"/>
            </svg>
            <span className="font-mono text-xs block mt-2 ml-4">bezier.</span>
          </div>

          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </>
    )
  },
  {
    id: 'endless-loop',
    title: 'The Endless Loop',
    subtext: 'Iterative design processes.',
    date: 'Jan 12, 2024',
    tabName: 'Doodles',
    category: 'Art · Process',
    renderContent: () => (
      <>
         <p className="relative text-center mb-16">
          Design is never finished, only abandoned.
          <MarginaliaLeft>* Over and over.</MarginaliaLeft>
        </p>
        <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-2 mb-16">
          <div className="w-32 h-8 border border-neutral-900 rounded-full"></div>
          <div className="w-[1px] h-4 bg-neutral-900"></div>
          <div className="w-32 h-8 border border-neutral-400 rounded-full"></div>
          <div className="w-[1px] h-4 bg-neutral-400"></div>
          <div className="w-32 h-8 border border-neutral-200 rounded-full"></div>
          <div className="w-[1px] h-4 border-l border-dotted border-neutral-300"></div>
          <span className="font-mono text-neutral-300">...</span>
        </div>
      </>
    )
  }
];
