import { useEffect, useCallback } from 'react';
const createEventTargetHook = Target => {
  if (!Target instanceof EventTarget) {
    throw new Error('Not a event target');
  }
  const useEvent = (...args) => {
    const off = useCallback(() => Target.removeEventListener(...args), [args]);
    useEffect(() => {
      Target.addEventListener(...args);
      return off;
    }, [args, off]);
    return [Target, off];
  };
  return useEvent;
};
export default createEventTargetHook;
