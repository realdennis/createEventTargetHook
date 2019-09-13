import { useEffect, useCallback } from 'react';
interface callback {
  (e: Event): void;
}
interface useEvent {
  (...args: [string, callback, any?]): [EventTarget, () => void];
}
interface createEventTargetHook {
  (Target: EventTarget): useEvent;
}
const createEventTargetHook: createEventTargetHook = Target => {
  if (typeof Target.addEventListener !== 'function') {
    // Runtime check instanceof EventTarget & still checkable in test code
    throw new Error('Not an event target');
  }
  const useEventHook: useEvent = (...args) => {
    const off = useCallback(() => Target.removeEventListener(...args), [args]);
    useEffect(() => {
      Target.addEventListener(...args);
      return off;
    }, [args, off]);
    return [Target, off];
  };
  return useEventHook;
};
export default createEventTargetHook;
