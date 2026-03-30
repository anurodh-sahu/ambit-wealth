'use client';

import { useEffect } from 'react';

export default function HighchartsInit() {
  useEffect(() => {
    (async () => {
      const Highcharts = (await import('highcharts')).default;
      const AccessibilityModule = (await import('highcharts/modules/accessibility')).default;

      if (typeof Highcharts === 'object') {
        AccessibilityModule(Highcharts);
      }
    })();
  }, []);

  return null; // renders nothing
}