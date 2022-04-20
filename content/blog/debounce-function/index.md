---
title: "[JS] Hiện thực debounce function"
date: "2021-10-31T10:08:19.500Z"
description: "Khi thực hiện đăng nhập, giả sử button login không bị disabled sau khi click, người dùng có thể click rất nhiều lần, làm sao để hàm xử lý chỉ gọi một lần sau cuối?"
---

Khi thực hiện đăng nhập, giả sử button login không bị disabled sau khi click, người dùng có thể click rất nhiều lần, làm sao để hàm xử lý chỉ gọi một lần sau cuối?

Đó là nội dung của bài này, hiện thực 1 function có thể debounce.

Nếu như bạn chưa biết debounce có nghĩa là gì, thì mình xin được diễn giải thế này:

> Chúng ta có một hàm A để xử lý việc button được click, sau khi click một khoảng thời gian, ví là 1s, thì hàm sẽ được thực hiện. Nếu người dùng click liên tiếp, giữa các lần click chưa đến 1s, thì hàm sẽ không bị gọi liên tục, mà chỉ sau khi click lần cuối quá 1s, hàm A sẽ được gọi.

## Mục tiêu

Hiện thực hàm `debounce`, nhận vào một function `func` và `debouceTime` dạng ms. Trả về một function có thể debounce với khoảng thời gian đó.

```js
function func(params) {
  // do something
}
const debouncedFunc = debouce(func, 200)
```

## Ý tưởng

Sau khi hàm `debouncedFunc` được gọi lần thứ nhất, chúng ta sẽ `setTimeout` để sau thời gian `debounceTime` sẽ được gọi.

Nhưng nếu chưa đủ debounceTime mà hàm lại được gọi tiếp, thì timeout của lần gọi trước phải bị clear.

Để làm được vậy, chúng ta cần lưu 2 biến:

1. Biến `lastCallTime` để lưu thời điểm cuối hàm được gọi
2. Biến `timeout` để chứa timeout của lần gọi cuối

Mỗi khi hàm được gọi mới, kiểm tra xem thời điểm hiện tại `now` so với `lastCallTime` đã vượt `debouceTime` hay chưa, nếu chưa thì clear `timeout`

## Hiện thực

```js
function debounce(func, debounceTime) {
  let lastCallTime
  let timeout

  return function (...arg) {
    if (timeout && Date.now() - lastCallTime < debounceTime) {
      clearTimeout(timeout)
    }
    lastCallTime = Date.now()
    timeout = setTimeout(() => {
      func(...arg)
    }, debounceTime)
  }
}
```

Nhưng nếu để ý, thì thực ra nếu vượt qua thời gian timeout rồi thì clear vẫn không sao, nên chúng ta có thể lược bớt biến lastCallTime.

```js
function debounce(func, debounceTime) {
  let timeout

  return function (...arg) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...arg)
    }, debounceTime)
  }
}
```

## Kết luận

Để hiện thực hàm này, chúng ta đã tận dụng `closure` để lưu lại 2 biến `lastCallTime` và `timeout`.

## Bonus

### 1. Giữ context (`this`) cho hàm được gọi

```js
function debounce(func, debounceTime) {
  let timeout

  return function (...arg) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      //=== UPDATED HERE===
      func.apply(this, arg)
    }, debounceTime)
  }
}
```

### 2. Typescript - Giữ typing cho params và return type của func

Đối với Typescript, chúng ta có một chỉnh sửa nhỏ như thế này:

Tại vì hàm debounce sẽ delay việc gọi hàm một thời gian, nên sẽ không có giá trị trả về tức thì được. Nếu muốn nhận giá trị trả về, chúng ta cần phải hiện thực hàm trả về `Promise`.

Hãy hiện thực trả về Promise đi bạn nhé :) Trong phần dưới đây, sẽ hiện thực với hàm không có giá trị trả về (void).

```ts
function debounce<T extends (...agrs: any) => void>(
  func: T,
  debounceTime: number
) {
  let timeout: ReturnType<typeof setTimeout>

  return function (this: any, ...arg: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this, arg)
    }, debounceTime)
  }
}
```
