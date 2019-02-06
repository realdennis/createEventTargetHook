import { useState, useEffect } from 'react';
const useEventTarget = Target => (...args) => {
  const [event, attach] = useState(args);
  useEffect(() => {
    if (event.length < 2) return;
    Target.addEventListener(...event);
    return () => Target.removeEventListener(...event);
  }, [event]);
  return [Target, (...args) => attach(args)];
};
export default useEventTarget;
