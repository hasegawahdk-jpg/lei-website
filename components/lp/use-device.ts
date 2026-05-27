'use client';

import { useEffect, useState } from 'react';

export type Device = 'pc' | 'sp';

export function useDevice(breakpoint = 768): Device {
  const [device, setDevice] = useState<Device>('pc');

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setDevice(mql.matches ? 'sp' : 'pc');
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [breakpoint]);

  return device;
}
