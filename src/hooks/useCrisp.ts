import { useEffect } from 'react';

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

export function useCrisp() {
  useEffect(() => {
    if (window.$crisp) return;

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '10207a66-a74c-4b51-8fc8-3519f7ae48d2';

    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);
}
