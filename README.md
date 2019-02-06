# useEventTarget

React hook for EventTarget, Attach event & listener without any side effect.

## Installation

```
$ npm install use-event-target
```

## Usage

FilerReader

```javascript
import useEventTarget from 'use-event-target';

const component = () => {
  const useFileReader = useEventTarget(new FileReader());
  const $reader = useFileReader();
  const onInputChange = e => {
    const files = e.currentTarget.files;
    $reader.hookEvent('loadend', () => console.log('load end'));
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

window

```javascript
import useEventTarget from 'use-event-target';

const component = () => {
  const useWindow = useEventTarget(window);
  const $window = useWindow();
  useEffect(() => {
    $window.hookEvent('click', () => console.log('hi'));
  }, []);
  // addEventListener when life-cycle (mounted)
};
```
