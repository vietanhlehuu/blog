---
title: "[CSS] Một vài thuộc tính CSS"
date: "2022-01-02T09:28:30.547Z"
description: "Ngoài những thuộc tính hay được sử dụng (display, font-size, color,...), có một số thuộc tính thỉnh thoảng mình mới sử dụng một lần. Đôi khi nhiều người không biết đến chúng nên dẫn tới solution CSS của các bạn sẽ phức tạp hơn. Dưới đây là một vài ghi chú/giải thích về một số thuộc tính đó."
---

Ngoài những thuộc tính hay được sử dụng (display, font-size, color,...), có một số thuộc tính thỉnh thoảng mới sử dụng một lần. Đôi khi nhiều người không biết đến chúng nên dẫn tới solution CSS của các bạn sẽ phức tạp hơn. Dưới đây là một vài ghi chú/giải thích về một số thuộc tính đó.

## background-origin

Chúng ta có box-sizing để thiết lập thuộc tính height/width của một phần tử tính từ border vào hay từ content vào.

Tương tự như border-box, chúng ta có thuộc tính `background-origin` để thiết lập vùng hiển thị của `background-image`.

Thuộc tính này có 3 giá trị là: `border-box`, `padding-box` và `content-box` tương ứng với vùng hiển thị như tên giá trị của chúng. Giá trị mặc định là `padding-box`.

```html
<div class="container">
  <div>border box</div>
  <div>padding box</div>
  <div>content box</div>
</div>
```

```css
.container {
  border: 2px solid green;
}
.container div {
  border: 5px solid transparent;
  padding: 5px;
  margin-top: 16px;
  background-image: linear-gradient(to right, red, yellow);
  background-repeat: no-repeat;
  background-color: blue;
}
div:nth-child(1) {
  background-origin: border-box;
}
div:nth-child(2) {
  background-origin: padding-box;
}
div:nth-child(3) {
  background-origin: content-box;
}
```

<div class="mb-4 border-2 border-green-500">
  <div class="border-[5px] border-transparent p-[5px] mt-4 bg-origin-border bg-primary bg-no-repeat bg-blue-500">border box</div>
  <div class="border-[5px] border-transparent p-[5px] mt-4  bg-origin-padding bg-primary bg-no-repeat bg-blue-500">padding box</div>
  <div class="border-[5px] border-transparent p-[5px] mt-4 bg-origin-content bg-primary bg-no-repeat bg-blue-500">content box</div>
</div>

Nếu giá trị của `background-attachment` là `fixed` thì giá trị của `background-origin` sẽ bị bỏ qua.

## background-clip

Tương tự như background-origin, chúng ta có thêm background-clip nhưng áp dụng cho cả background-color (background-origin chỉ áp dụng cho background-image).

Tuy nhiên, nó chỉ hỗ trợ để clip background, tức là cắt gọt khu vực background hiển thị chứ không phải thiết lập như background-origin, nên không thể thay thế background-origin được.

(Nếu muốn sử dụng background-clip full chức năng với background-image, chúng ta nên set background-origin: border-box, như vậy vùng hiển thị của image sẽ full để chúng ta có thể clip)

## background-position

Đây là một thuộc tính khá thông dụng. Tuy nhiên background-position với giá trị là % thì có phần hơi đặc biệt và cần note lại.

```html
<div class="bg-percentage"></div>
```

```css
.bg-percentage {
  height: 300px;
  background-image: linear-gradient(to right, red, yellow);
  background-size: 50% 100%;
  background-position: 25% 25%;
  background-repeat: no-repeat;
  border: 1px solid green;
}
```

<div class="h-[300px] bg-primary [background-size:50%] bg-no-repeat [background-position:25%_25%] border border-green-500 mb-4"></div>

Nếu theo logic thông thường, chúng ta có thể nghĩ rằng vị trí của background image sẽ cách top của phần tử 25% và cách left 25%. Nhưng như demo phía trên, nó không hoạt động như vậy.

Đầu tiên nó sẽ tìm một điểm của phần tử mà vị trí đúng như background position, như ví dụ ở trên là 25% theo trục dọc và 25% theo trục ngang.

Tiếp theo, nó cũng sẽ tìm một điểm trong chính background image đó với vị trí như vậy, 25% theo trục dọc và 25% theo trục ngang.

Cuối cùng, nó sẽ dịch chuyển background image để 2 điểm đó trùng nhau. Chúng ta có hình minh họa phía dưới.

<div class="h-[300px] bg-primary [background-size:50%] bg-no-repeat [background-position:25%_25%] border border-green-500 mb-4 relative">
  <div class="absolute h-[2px] w-[100%] top-1/4 bg-purple-500"></div>
  <div class="absolute w-[2px] h-[100%] left-1/4 bg-purple-500"></div>
</div>

Và chúng ta có 2 điểm 25% 25% của phần tử và background image của nó trùng nhau.

## isolation

Thuộc tính này rất hữu dụng khi sử dụng kèm `z-index`. Nó sẽ tạo một lớp stacking context mới cho phần tử.

Dưới đây là ví dụ mình thường dùng nhất trong các project, đó là sử dụng img như background.

```html
<div class="container">
  <img src="/images/bg.jpeg" />
  <h1>This is a title</h1>
</div>
```

```css
.container {
  position: relative;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
}

.container img {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

<div class="relative h-[300px] flex items-center justify-center bg-red-400 mb-4">
  <img src="/images/bg.jpeg" class="absolute inset-0 w-full h-full object-cover z-[-1]">
  <h1 class="text-green-500">This is a title</h1>
</div>

Việc sử dụng z-index -1 đã làm cho img nằm hẳn dưới nền của container. Trong khi điều chúng ta muốn là chỉ nằm dưới các phần tử khác trong container mà thôi. Việc này nguyên nhân tại vì container dù sử dụng position relative nhưng không tạo ra một stacking context mới. Cách thông thường nhất để tạo một stacking context đó là sử dụng z-index kèm với position.

Nhưng chúng ta ở đây không muốn set z-index cho container bằng một số nào cả. Lúc này, sử dụng isolate là một giải pháp.

```css
.container {
  position: relative;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  isolation: isolate;
}

.container img {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

<div class="relative h-[300px] flex items-center justify-center bg-red-400 mb-4 isolate">
  <img src="/images/bg.jpeg" class="absolute inset-0 w-full h-full object-cover z-[-1]">
  <h1 class="text-green-500">This is a title</h1>
</div>

<!-- ## display: contents

Huhu

## writing-mode

## word-break, break -->
