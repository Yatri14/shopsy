'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function PWAInstaller() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const installed = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(installed);
  }, []);

  if (isInstalled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-full border border-slate-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
        <Download className="h-4 w-4 text-blue-500" />
        Install Shopsy for offline-ready shopping
      </div>
    </div>
  );
}
