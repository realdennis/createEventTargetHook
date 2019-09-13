import createEventTargetHook from '../index';
import { renderHook } from '@testing-library/react-hooks';

interface EventCallback {
  (e?: Event): void;
}
interface EventInfo {
  eventName: string;
  callback: EventCallback;
}
class EventTarget {
  eventList: EventInfo[];
  constructor() {
    this.eventList = [];
  }
  resetEventList() {
    this.eventList = [];
  }
  addEventListener(eventName: string, callback: EventCallback) {
    this.eventList.push({
      eventName: eventName,
      callback: callback
    });
  }
  removeEventListener(eventName: string, callback: EventCallback) {
    for (let i = 0; i < this.eventList.length; i++) {
      if (
        this.eventList[i].eventName == eventName &&
        this.eventList[i].callback == callback
      ) {
        this.eventList.splice(i, 1);
        break;
      }
    }
  }
  dispatchEvent(e: Event) {
    return true;
  }
}
const window = new EventTarget();
const useWindow = createEventTargetHook(window);

const setUp = (eventName = 'click', callback = () => {}) =>
  renderHook(() => useWindow(eventName, callback));
beforeEach(() => {
  window.resetEventList();
});
it('should work fine when initial', () => {
  const { result } = setUp();
  const [target, off] = result.current;
  expect(target).toBe(window);
  expect(typeof off).toBe('function');
  expect(window.eventList.length).toBe(1);
});

it('should work fine when we call off', () => {
  const { result } = setUp();
  const [_, off] = result.current;
  expect(window.eventList.length).toBe(1);
  (off as () => void)();
  expect(window.eventList.length).toBe(0);
});

it('should work fine when unmount', () => {
  const { unmount } = setUp();
  expect(window.eventList.length).toBe(1);
  unmount();
  expect(window.eventList.length).toBe(0);
});

it('should throw error', () => {
  try {
    createEventTargetHook({} as EventTarget);
  } catch (e) {
    expect(e.message).toBe('Not an event target');
  }
});
