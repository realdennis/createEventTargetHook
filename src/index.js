import { useState, useEffect } from 'react';
const useEventTarget = Target => (...args) => {
  const [event, attach] = useState(args);
  Target.hookEvent = (...args) => attach(args);
  useEffect(() => {
    if (event.length !== 2) return;
    Target.addEventListener(event[0], event[1]);
    return () => Target.removeEventListener(event[0], event[1]);
  }, [event]);
  return Target;
};
export default useEventTarget;
