import { useEffect } from 'react';
const useEventTarget = Target => (...args) => {
  const off = () => Target.removeEventListener(...args);
  useEffect(() => {
    Target.addEventListener(...args);
    return off;
  }, []);
  return [Target, off];
};
export default useEventTarget;
