# useEventTarget

[![GitHub license](https://img.shields.io/github/license/realdennis/useEventTarget.svg)](https://github.com/realdennis/useEventTarget/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/realdennis/useEventTarget.svg)](https://github.com/realdennis/useEventTarget/issues)
[![GitHub stars](https://img.shields.io/github/stars/realdennis/useEventTarget.svg)](https://github.com/realdennis/useEventTarget/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/realdennis/useEventTarget.svg)](https://github.com/realdennis/useEventTarget/network)
[![Build Status](https://travis-ci.org/realdennis/useEventTarget.svg?branch=master)](https://travis-ci.org/realdennis/useEventTarget)

### High Order function for hooks of EventTarget 

[Demo](https://codesandbox.io/s/j2w4n92219)

讓你無憂無慮註冊事件，匿名函數也好，不想清理也罷，反正我幫你清掉。
One hook for one eventTarget's event.


----

### 使用高階函數創造毫無副作用的 useResize

```javascript
// useResize.js
import useEventTarget from "use-event-target";
const useWindow = useEventTarget(window);
export default callback => {
  const [$window, resizeOff] = useWindow("resize", callback);
  return resizeOff;
};

```
Watch this [useResize](https://codesandbox.io/s/73m4z11vp6)

---

### 直接在函數組件使用無副作用的事件掛載
```javascript
import useEventTarget from 'use-event-target';
const useImage = useEventTarget(new Image());
const demo=()=>{
  useImage('load' , ()=>console.log('image loaded!') , /* Options */);
  return (<p>I am demo component</p>);
}
```

別怕！只會在 mount 那刻註冊。

API 同註冊事件(`addEventListener`)，但是組件週期卸載後會幫你清掉(`removeEventListener`)。

## Installation

```
$ npm install use-event-target
```

## Compare

若你曾經撰寫過與原生事件相關的 React Hooks ，對下面的狀況肯定不陌生：

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
});
```

### 使用 useEventTarget

```javascript
const useWindow = useEventTarget(window);
//useCustom
useWindow('click', () => console.log('click'));
useWindow('resize', () => console.log('resize'));
useWindow('touch', () => console.log('touch'));
```

再看一次 [Demo](https://codesandbox.io/s/j2w4n92219)


## 我做了什麼？

1. 首先我用 curry 的方式製造了一個 Custom Hooks，讓你可以在函數組件中使用。

2. 我用 useEffect 的 compare array 去設定，只有 mount 的時候會幫你註冊。

3. 我偷偷把你的 callback 給 reference 了，所以可以清除掉匿名函數。

4. 我在 cleanup 裡頭幫你清除掉，而這個 cleanup 會依照你使用這個 custom hook 的組件週期。

## Advanced usage

useEventTarget 主要是丟進去 EventTarget ，並且製造出 customHooks ，這個 customHooks 將回傳一個陣列。

我們先假設 useImage 已經製造出來。

```javascript
const [$img, loadOff] = useImage('load', () => console.log('load'));
```

### \$img

也就是這個 EventTarget ，有時候我們希望能改變他的屬性。

### hookEvent

你可以透過 hookEvent 重置你要掛載的事件，用法:

1. 主動清掉剛剛掛載的事件

```javascript
const [$img,offEvent] = useImg('xxx',()=>{})
// In some condition
{
  offEvent(); //主動把事件清掉
}
```

2. 讓事件與組件同步卸載

## Example

```javascript
import useEventTarget from 'use-event-target';
const useImage = useEventTarget(new Image());
const demo = () => {

  const [$img,loadOff] = useImage('load',getSize);
  function getSize (){
    loadOff();
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
  const [$reader, offEvent] = useFileReader('loadend', () => console.log('load end'));
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
