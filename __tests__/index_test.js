import React, { useEffect } from 'react';
import useEventTarget from '../src/index.js';
import TestRenderer from 'react-test-renderer';

class FakeDom {
  constructor() {
    this.eventlist = [];
  }
  addEventListener(event, callback) {
    this.eventlist.push({
      event: event,
      callback: callback
    });
  }
  removeEventListener(event, callback) {
    for (let i = 0; i < this.eventlist.length; i++) {
      if (
        this.eventlist[i].event == event &&
        this.eventlist[i].callback == callback
      ) {
        this.eventlist.splice(i, 1);
        break;
      }
    }
  }
}

describe('[Basic Test]', () => {
  it('TestCase1: mounted and unmounted', done => {
    const testCb = () => {
      return null;
    };
    let testTarget = new FakeDom();
    const TestCase1 = () => {
      useEventTarget(testTarget)('click', testCb);
      useEffect(() => {
        //test when mounted
        expect(testTarget.eventlist.length).toEqual(1);
        expect(testTarget.eventlist[0].event).toEqual('click');
        expect(testTarget.eventlist[0].callback).toEqual(testCb);
      }, []);
      return null;
    };
    let testRenderer = TestRenderer.create(<TestCase1 />);
    testRenderer.unmount();
    expect(testTarget.eventlist.length).toEqual(0);
    done();
  });
});
