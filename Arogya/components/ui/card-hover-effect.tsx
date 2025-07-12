'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const HoverEffect = ({
  items,
  spotlight,
  className,
}: {
  spotlight: {
    title: string;
    description: string;
    image: string;
    label: string;
    date: string;
    location: string;
  };
  items: {
    title: string;
    link: string;
    image: string;
    label: string;
    date: string;
    location: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-4 py-10 max-w-6xl mx-auto',
        className,
      )}
    >
      {/* Spotlight Section */}
      <a
        href="#"
        className="relative group block p-2 h-full w-full md:col-span-3"
        onMouseEnter={() => setHoveredIndex(-1)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === -1 && (
            <motion.span
              className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
            />
          )}
        </AnimatePresence>

        <Card className="p-0 bg-white relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 font-plusjakarta ">
            <img
              src={spotlight.image}
              alt={spotlight.title}
              className="w-full md:w-2/3 h-90 object-cover"
            />
            <div className="p-4">
              <p className="text-xs uppercase text-gray-500 tracking-wide mb-1">
                {spotlight.label}
              </p>
              <CardTitle className="text-2xl mb-2">{spotlight.title}</CardTitle>
              <p className="text-sm text-gray-600 mb-4">{spotlight.description}</p>
              <p className="text-xs text-gray-400">
                {spotlight.date} / {spotlight.location}
              </p>
            </div>
          </div>
        </Card>
      </a>

      {/* Cards */}
      {items.map((item, idx) => (
        <a
          key={item.link}
          href={item.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>

          <Card className="relative z-10 p-0 font-plusjakarta">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="text-xs uppercase text-gray-500 tracking-wide mb-1">
                {item.label}
              </p>
              <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
};

// Minimal card and title components
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full overflow-hidden bg-white border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        className,
      )}
    >
      <div className="relative z-50">{children}</div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        'text-black font-semibold tracking-wide font-plusjakarta',
        className,
      )}
    >
      {children}
    </h4>
  );
};
