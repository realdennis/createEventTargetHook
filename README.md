# createEventTargetHook

[![GitHub license](https://img.shields.io/github/license/realdennis/createEventTargetHook.svg)](https://github.com/realdennis/createEventTargetHook/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/realdennis/createEventTargetHook.svg)](https://github.com/realdennis/createEventTargetHook/issues)
[![GitHub stars](https://img.shields.io/github/stars/realdennis/createEventTargetHook.svg)](https://github.com/realdennis/createEventTargetHook/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/realdennis/createEventTargetHook.svg)](https://github.com/realdennis/createEventTargetHook/network)
[![Build Status](https://travis-ci.org/realdennis/createEventTargetHook.svg?branch=master)](https://travis-ci.org/realdennis/createEventTargetHook)

### Create hooks of EventTarget and no worry about side effect

Create the hook to register native event like window.addEventListener, and cleanup (remove) automatically.

## Installation

```
$ npm install create-event-target-hook
```

## Compare
If you have use some native event in React, the cleanup show in below is really common

```javascript
//useCustom
useEffect(() => {
  function cb1() {
    console.log('click');
  }
  function cb2() {
    console.log('resize');
  }
  function cb3() {
    console.log('touch');
  }
  window.addEventListener('click', cb1);
  window.addEventListener('resize', cb2);
  window.addEventListener('touch', cb3);
  return () => {
    window.removeEventListener('click', cb1);
    window.removeEventListener('resize', cb2);
    window.removeEventListener('touch', cb3);
  };
},[]);
```

### Using createEventTargetHook

```javascript
const useWindow = createEventTargetHook(window);
//useCustom
useWindow('click', () => console.log('click'));
useWindow('resize', () => console.log('resize'));
useWindow('touch', () => console.log('touch'));
```

[Demo](https://codesandbox.io/s/j2w4n92219)

## What did createEventTargetHook do？

1. I create a curry function, and make a corresponding custom hooks

2. Only `addEventListener` when mount, I promise. 

3. I keep a reference of the annoymous callback, so I can remove the annoymous listener.

4. The function of cleaning the event listener will follow the hook life-cycle.

## Advanced usage

This customHooks will return an array

We assume `useImage` has already made. (by `createEventTargetHook`)

```javascript
const [$img, loadOff] = useImage('load', () => console.log('load'));
```

### \$img

`$img` is the EventTarget, sometimes we hope we could modify its attribute.

### off

You can use off to remove listener.

1. Remove the event listener initiative.

```javascript
const [$img, off] = useImg('xxx', () => {});
// In some condition
{
  off(); 
}
```

2. Remove when something done.

## Example

```javascript
import createEventTargetHook from 'create-event-target-hook';
const useImage = createEventTargetHook(new Image());
const demo = () => {
  const [$img, loadOff] = useImage('load', getSize);
  function getSize() {
    loadOff();
  }
  return <button onClick={onClick}> Get Image </button>;
};
```

## More...

### useFileReader

```javascript
import createEventTargetHook from 'create-event-target-hook';
const useFileReader = createEventTargetHook(new FileReader());
  
const demo = () => {
  const [$reader, offEvent] = useFileReader('loadend', () =>
    console.log('load end')
  );
  const onInputChange = e => {
    const files = e.currentTarget.files;
    $reader.readAsDataURL(files[0]);
  };
  return (
    <input
      onChange={onInputChange}
      type="file"
      id="upload-file"
      placeholder="Upload a Picture"
    />
  );
};
```
