# useEventTarget

React hook for EventTarget, Attach event & listener without any side effect.
One hook for one eventTarget's event.

```javascript
import useEventTarget from 'use-event-target';
const useImage = useEventTarget(new Image());
const demo=()=>{
  const [$img,hookEvent] = useImage(/* Event name */ , /* Callback */ , /* Options */);
}
```

## Installation

```
$ npm install use-event-target
```

## Introduction

```javascript
import useEventTarget from 'use-event-target';
const useImage = useEventTarget(new Image());
const demo = () => {
  const [$img, hookEvent] = useImage('load', () =>
    console.log('Image is load!')
  );
  const onClick = () => ($img.src = path);
  return <button onClick={onClick}> Get Image </button>;
};
```

Using setter (eg. `hookEvent`), which is a no-side-effect addEventListener, it will always unsubscribe previous event.

```javascript
import useEventTarget from 'use-event-target';
const useImage = useEventTarget(new Image());
const demo = () => {
  const [$img, hookEvent] = useImage();
  const getSize = () => {
     /* code to get image size*/
    hookEvent(); // -> Explicitly clear this hook event state.
  };
  const onClick = () => {
    hookEvent('load', getSize);
    $img.src = path;
  };
  return <button onClick={onClick}> Get Image </button>;
};
```

## More...

### useFileReader

```javascript
import useEventTarget from 'use-event-target';

const demo = () => {
  const useFileReader = useEventTarget(new FileReader());
  const [$reader, hookEvent] = useFileReader();
  const onInputChange = e => {
    const files = e.currentTarget.files;
    hookEvent('loadend', () => console.log('load end'));
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

### useWindow

```javascript
import useEventTarget from 'use-event-target';

const component = () => {
  const useWindow = useEventTarget(window);
  const [_, hookEvent] = useWindow('click', onClick);
  const onClick = () => {
    hookEvent('resize', () => console.log('resize trigger'));
    // After click, hook will clean up `click` event and attach `resize`
  };
};
```
