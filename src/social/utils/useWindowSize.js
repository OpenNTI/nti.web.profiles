import { useState, useEffect } from 'react';

// source: https://dev.to/3sanket3/usewindowsize-react-hook-to-handle-responsiveness-in-javascript-3dcl
function useWindowSize() {
  const isWindowClient = typeof window === 'object';

  const initState = isWindowClient ? window.innerWidth : undefined;

  const [windowSize, setWindowSize] = useState(initState);

  useEffect(() => {
    function setSize() {
      setWindowSize(window.innerWidth);
    }

    if (isWindowClient) {
      window.addEventListener('resize', setSize);

	  return () => window.removeEventListener('resize', setSize);
    }
  }, [isWindowClient, setWindowSize]);

  return windowSize;
}

export default useWindowSize;
