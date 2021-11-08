---
title: "[CSS] Vài miếng CSS"
date: "2021-11-07T05:58:21.675Z"
description: "Khi code UI, mình thấy có một vài trường hợp khá hay, có thể nói là một vài bài toán thú vị. Cùng mình tìm hiểu nhé 😄"
---

Khi code UI, mình thấy có một vài trường hợp khá hay, có thể nói là một vài bài toán thú vị. Cùng mình tìm hiểu nhé 😄

## Border collapse

Đối với `table`, chúng ta có một thuộc tính đặc biệt là `border-collapse`. Thuộc tính này giúp chúng ta hợp nhất các border cạnh nhau của các ô (td, th) trong table. Bạn có thể xem ví dụ [ở đây](https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse).

Nhưng nếu chúng ta phải hiện thực border-collapse đối với layout thông thường hiện thực với `div` thì sao?

Chúng ta có một UI ở desktop gồm 2 hàng và 2 cột, xung quanh là border như thế này:

<div class="p-6 mb-10 overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
  <div class="grid grid-cols-2 grid-rows-2 gap-[4px]">
    <div class="w-full h-16 bg-green-100 border-green-500 shadow-border-collapse"></div>
    <div class="w-full h-16 bg-green-100 border-green-500 shadow-border-collapse"></div>
    <div class="w-full h-16 bg-green-100 border-green-500 shadow-border-collapse"></div>
    <div class="w-full h-16 bg-green-100 border-green-500 shadow-border-collapse"></div>
  </div>
</div>

Về mobile sẽ như thế này:

<div class="p-6 mb-10 overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
  <div class="grid grid-cols-1 grid-rows-2 gap-[4px]">
    <div class="h-16 bg-green-100 shadow-border-collapse"></div>
    <div class="h-16 bg-green-100 shadow-border-collapse"></div>
    <div class="h-16 bg-green-100 shadow-border-collapse"></div>
    <div class="h-16 bg-green-100 shadow-border-collapse"></div>
  </div>
</div>

Code HTML dành cho UI đó như sau:

```html
<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

Thông thường, giải pháp chúng ta nghĩ đến đầu tiên đó chính là `border`:

```css
/* Dành cho desktop */
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  border: 4px solid purple;
  width: 50%;
  ...;
}
```

Và đây là kết quả:

<div class="p-6 mb-10 overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
  <div class="flex flex-wrap">
    <div class="w-1/2 h-16 bg-green-100 border-4 border-purple-500"></div>
    <div class="w-1/2 h-16 bg-green-100 border-4 border-purple-500"></div>
    <div class="w-1/2 h-16 bg-green-100 border-4 border-purple-500"></div>
    <div class="w-1/2 h-16 bg-green-100 border-4 border-purple-500"></div>
  </div>
</div>

Vấn đề chúng ta cần giải quyết chính là ở đây, các border cạnh nhau không hợp nhất, gây nên việc border bị dày gấp đôi.

Và thông thường chúng ta sẽ nghĩ tiếp đến sử dụng điều kiện để style border cho các item, chẳng hạn như sau:

```css
.item {
  border: 4px solid purple;
  ...;
}
.item:nth-child(2n) {
  /* Cho thằng con thứ 2 và thứ 4, sẽ không border bên trái */
  border-left-width: 0;
}
.item:nth-child(n + 3) {
  /* Cho thằng con thứ 3 và thứ 4, sẽ không border bên trên */
  border-top-width: 0;
}
```

Kết quả sẽ giống như chúng ta mong muốn, tuy nhiên, khi về mobile, phải sửa một chút vì các item sẽ thay đổi vị trí.

```css
.item {
  border: 4px solid purple;
  ...;
}
.item:nth-child(2n) {
  /* Cho thằng con thứ 2 và thứ 4, sẽ không border bên trái */
  border-left-width: 0;
}
.item:nth-child(n + 3) {
  /* Cho thằng con thứ 3 và thứ 4, sẽ không border bên trên */
  border-top-width: 0;
}

@media (max-width: 768px) {
  .item:nth-child(n + 2) {
    /* Từ item thứ 2 trở đi sẽ không border trên */
    border-top-width: 0;
  }
  .item:nth-child(2n) {
    /* Đồng thời phải cập nhật lại border cho các item 2, 3, 4 */
    border-left-width: 4px;
  }
}
```

Đó là solution có thể dễ nghĩ tới nhất, nhưng nếu còn nhiều yêu cầu khác, ví dụ như lên màn hình lớn hơn sẽ có 3 item nằm trên 1 hàng. Chúng ta lại phải cập nhật style khá thủ công để đạt được điều mong muốn.

Có một solution tốt và đơn giản hơn, đó là sử dụng kết hợp `CSS Grid` và `box-shadow`:

```css
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}
.item {
  box-shadow: 0 0 0 4px purple;
}
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

Điều quan trọng trong solution này là `gap` và `box-shadow`

## Overlap content

Mình có một design nhìn khá bình thường như này:

![Overlap](./overlap-2.png)

Các card lúc bình thường sẽ như vị trí 1, 3. Khi `hover` vào sẽ thấy nội dung mô tả như ở card vị trí 2.

Khi nhìn vào UI này, mình sẽ nghĩ ngay đến solution là phần mô tả sẽ được bọc trong 1 div `absolute`, khi hover vào sẽ xuất hiện trên phần nền kia.

Tuy nhiên, nội dung mô tả đó là động (tức do người dùng nhập liệu), nó có thể ngắn, nó có thể dài. Tại thời điểm chúng ta hiện thực UI này chưa thể biết trước.

Vậy vấn đề ở đây là gì? Đó chính là kích thước (chiều cao) của card sẽ được cho là bao nhiêu?

Để cho bạn dễ hình dung, chúng ta có minh họa sau:

<div class="p-6 mb-10 overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 max-w-[320px] mx-auto">
  <div class="flex flex-col items-center p-4 bg-pink-300">
    <div class="flex items-center justify-center w-[200px] h-[200px] bg-green-400">
    Image
    </div>
    <h4 class="mt-4">Investment Protocol</h4>
  </div>
</div>

Khi hover vào, nội dung sẽ được hiện lên phần nội dung của card:

<div class="p-6 mb-10 overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 max-w-[320px] mx-auto">
  <div class="relative flex flex-col items-center p-4 overflow-hidden bg-pink-300">
    <div class="flex items-center justify-center w-[200px] h-[200px] bg-green-400">
    Image
    </div>
    <h4 class="mt-4">Investment Protocol</h4>
    <div class="absolute inset-0 p-4 bg-purple-500 bg-opacity-80">
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  </div>

  </div>
</div>

Vấn đề ở đây là nội dung phần mô tả quá dài, chiều cao của card chúng ta đang mặc định sẵn lại không chứa hết.

Solution chúng ta mong muốn ở đây chính là: nếu nội dung mô tả ngắn hơn phần nền của card, chúng ta sẽ lấy kích thước của phần nền; nếu nội dung mô tả dài hơn phần nền, chúng ta sẽ lấy kích thước của phần mô tả.

Một lần nữa, solution này sẽ là một ứng dụng của `CSS Grid`:

```html
<div class="container">
  <div class="main-content">
    <img src="..." />
    <h3>Investment Protocol</h3>
  </div>
  <div class="description">Contrary to popular belief, Lorem Ips.....</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
.main-content {
  padding: 16px;
  grid-column: 1/-1;
  grid-row: 1/-1;
}
.description {
  padding: 16px;
  grid-column: 1/-1;
  grid-row: 1/-1;
  opacity: 0;
}
.container:hover .description {
  opacity: 1;
}
```

Ở đây, chúng ta cho phần `main-content` và `description` nằm chồng lên nhau, cùng 1 vị trí, như vậy Grid sẽ chọn kích thước của phần nào có kích thước lớn hơn.

## Gradient border

Một UI bình thường như này:

<div class="flex items-center justify-center p-6 mx-auto mb-10 overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
  <button style="background: linear-gradient(white, white) padding-box, linear-gradient(90deg, darkblue, darkorchid) border-box"
   class="p-4 bg-white border-[5px] border-transparent rounded-full cursor-pointer"> I am a button </button>

</div>

```html
<button>I am a button</button>
```

```css
button {
  border: 5px solid transparent;
  background-image: linear-gradient(white, white), linear-gradient(90deg, darkblue, darkorchid);
  background-clip: padding-box, border-box;
  background-origin: border-box;
}
```

<!-- ## Gradient underline hover -->
