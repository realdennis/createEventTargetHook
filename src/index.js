import { useEffect } from 'react';
const useEventTarget = Target => (...args) => {
  const off = () => Target.removeEventListener(...args);
  useEffect(() => {
    if (!Target instanceof EventTarget) return;
    Target.addEventListener(...args);
    return off;
  }, []);
  return [Target, off];
};
export default useEventTarget;
