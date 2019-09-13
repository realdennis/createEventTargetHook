import { useEffect, useCallback } from 'react';
interface EventCallback {
  (e?: Event): void;
}
interface useEventTarget {
  (...args: [string, EventCallback, any?]): [EventTarget, () => void];
}
interface createEventTargetHook {
  (Target: EventTarget): useEventTarget;
}
const createEventTargetHook: createEventTargetHook = Target => {
  if (typeof Target.addEventListener !== 'function') {
    // Runtime check instanceof EventTarget & still checkable in test code
    throw new Error('Not an event target');
  }
  const useEventHook: useEventTarget = (...args) => {
    const off = useCallback(() => Target.removeEventListener(...args), [args]);
    useEffect(() => {
      Target.addEventListener(...args);
      return off;
    }, []);
    // only cleanup when call `off` or component unmount
    return [Target, off];
  };
  return useEventHook;
};
export default createEventTargetHook;
