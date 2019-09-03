import createEventTargetHook from '../index.js';
import { renderHook } from '@testing-library/react-hooks';

class EventTarget {
  constructor() {
    this.eventList = [];
  }
  resetEventList() {
    this.eventList = [];
  }
  addEventListener(event, callback) {
    this.eventList.push({
      event: event,
      callback: callback
    });
  }
  removeEventListener(event, callback) {
    for (let i = 0; i < this.eventList.length; i++) {
      if (
        this.eventList[i].event == event &&
        this.eventList[i].callback == callback
      ) {
        this.eventList.splice(i, 1);
        break;
      }
    }
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
  off();
  expect(window.eventList.length).toBe(0);
});

it('should work fine when unmount', () => {
  const { unmount } = setUp();
  expect(window.eventList.length).toBe(1);
  unmount();
  expect(window.eventList.length).toBe(0);
});
