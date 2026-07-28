'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PerformanceImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function PerformanceImage({ src, alt, width = 800, height = 600, className }: PerformanceImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw, 50vw"
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded ? <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-800" /> : null}
    </div>
  );
}
