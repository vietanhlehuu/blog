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
  <img src="/images/bg-min.jpeg" class="absolute inset-0 w-full h-full object-cover z-[-1]">
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
  <img src="/images/bg-min.jpeg" class="absolute inset-0 w-full h-full object-cover z-[-1]">
  <h1 class="text-green-500">This is a title</h1>
</div>

## writing-mode

Thuộc tính này chắc là ít dùng, nhưng khi gặp một số giao diện thì nó sẽ khá hữu dụng.

Ví dụ chúng ta có giao diện dưới đây:

<div class="flex mb-4">
  <img src="/images/bg-min.jpeg" class="flex-grow object-cover w-[80%]">
  <h1 class="m-0 ml-2 text-center text-green-500 writing-vlr">This is a title</h1>
</div>

Để chữ nằm dọc vậy thì cách nhiều người nghĩ tới nhất có lẽ là dùng transform rotate. Tuy nhiên, nó sẽ có hạn chế, vì khi rotate từ chiều ngang sang chiều dọc thì nó không chiếm không gian của chiều dọc, do đó nếu text dài hơn ảnh thì sẽ bị overflow.

Cách dễ thứ hai đó chính là dùng `writing-mode`.

Xem qua docs của nó thì sẽ có 3 giá trị:

```css
.wm {
  writing-mode: horizontal-tb;
  writing-mode: vertical-lr;
  writing-mode: vertical-rl;
}
```

Chúng ta sẽ phân tích từng giá trị.

Đầu tiên là `horizontal-tb`, đây là giá trị mặc định, nó sẽ hiển thị chữ theo chiều ngang, từ trái sang phải hay phải sang trái là tùy direction mình cài (mặc định là left to right).

Tiếp theo là `vertical-lr` và `vertical-rl`, lúc này chữ sẽ được viết theo chiều dọc.

2 ví dụ minh họa phía dưới lần lượt sử dụng vertical-lr và vertical-rl.

<div class="flex mb-4">
  <img src="/images/bg-min.jpeg" class="flex-grow object-cover w-[10%]">
  <h1 class="m-0 ml-2 text-center text-green-500 writing-vlr">This is a title</h1>
</div>

<div class="flex mb-4">
  <img src="/images/bg-min.jpeg" class="flex-grow object-cover w-[10%]">
  <h1 class="m-0 ml-2 text-center text-green-500 writing-vrl">This is a title</h1>
</div>

Nhìn có vẻ không khác gì, nhưng để thấy được sự khác nhau, chúng ta cần viết dài lên để nó rơi thành nhiều cột.

<div class="flex mb-4">
  <img src="/images/bg-min.jpeg" class="flex-grow object-cover w-[10%]">
  <h1 class="m-0 ml-2 text-center text-green-500 writing-vlr">
    This is a really <br> long title
  </h1>
</div>

<div class="flex mb-4">
  <img src="/images/bg-min.jpeg" class="flex-grow object-cover w-[10%]">
  <h1 class="m-0 ml-2 text-center text-green-500 writing-vrl">
   This is a really <br> long title
  </h1>
</div>

Và chúng ta sẽ thấy được sự khác biệt của left to right và right to left.

## display: contents

Đây là một loại display đặc biệt, khi mà nó sẽ làm cho container (nơi khai báo display: contents) sẽ coi như biến mất, chỉ còn các phần tử con bên trong được trải phẳng (flat) ra ngoài.

Vậy thuộc tính này có gì hữu dụng. Đó là đối với các trường hợp responsive, layout ở mobile với desktop khác nhau một cách rõ ràng.

Lấy ví dụ không mấy đẹp như dưới đây, ở desktop chúng ta sẽ có một layout như thế này:

<div class="grid grid-cols-2 gap-4 p-4 mb-4 border-2 border-blue-400">
  <div>
  <img src="/images/bg-min.jpeg" />
  </div>
  <div class="p-2 text-black bg-purple-200">
    <h2 class="m-0 text-center text-black">Title</h2>
    <p class="text-[14px] m-0 mt-4">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ratione?Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ratione?Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ratione?
    </p>
  </div>
</div>

Về mobile chúng ta có như này:

<div class="grid gap-4 p-4 mb-4 border-2 border-blue-400">
  <h2 class="m-0 text-center ">Title</h2>
  <div class="flex">
    <img src="/images/bg-min.jpeg" />
  </div>
  <p class="text-[14px] m-0 mt-4">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ratione?Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ratione?Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ratione?
  </p>
</div>

Nếu "may mắn" bạn sẽ gặp phải design như thế này. Bởi vì khu vực text ở desktop có background, nên html, css tối thiểu sẽ phải như thế này.

```html
<div class="container">
  <img src="..." />
  <div class="content">
    <h2>Title</h2>
    <p>Lorem....</p>
  </div>
</div>
```

```css
.container {
  display: flex;
  /* ... */
}
.content {
  background: purple;
  /* ... */
}
```

Vậy khi về mobile làm sao đưa `h2` lên trên ảnh được, khi mà nó đang nằm trong `content`? Lúc này chúng ta sẽ áp dụng được display: contents.

```css
... @media (max-width: 768px) {
  .container {
    display: flex;
    flex-direction: column;
    /* ... */
  }
  .content {
    background: purple;
    display: contents;
    /* ... */
  }
  .content h2 {
    order: -1;
  }
}
```

<div class="flex flex-col gap-4 p-4 mb-4 border-2 border-blue-400">
  <div class="flex">
    <img src="/images/bg-min.jpeg" />
  </div>
  <div class="p-2 bg-purple-200 contents">
    <h2 class="m-0 text-center order-[-1]">Title</h2>
    <p class="text-[14px] m-0">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ratione?Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ratione?Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ratione?
    </p>
  </div>
</div>

## all

Thuộc tính này cũng khá hay ho. Khi mình sử dụng những generator để viết blog như này, thì rất nhiều style đã được định dạng sẵn. Ví dụ như table, nhiều lúc mình viết tutorial để hướng dẫn css với table, nhưng table hiện ra UI đã bị chỉnh sửa style, mình phải đè style lại cho từng thuộc tính rấy mệt.

Lúc này, nhu cầu của mình là reset tất cả các thuộc tính về giá trị ban đầu của nó, lúc chưa có bất style nào.

Và thuộc tính `all` sẽ giúp mình được chuyện đó.

```css
table {
  all: unset;
}
```

Ngoài ra, `all` còn có những giá trị có thể khác nữa là: `initial`, `inherit` và `revert`.

Chúng ta sẽ thảo luận chi tiết ý nghĩa các giá trị đó trong mục bên dưới.

## initial, inherit, unset, revert

Đây không phải thuộc tính, mà là giá trị mà có lẽ tất cả các thuộc tính css đều có, vậy chúng có nghĩa là gì?

- `initial`: Đây là một giá trị ám chỉ giá trị mặc định của một thuộc tính. Ví dụ, `font-weight` sẽ có giá trị mặc định là `normal`, tức là 400. Khi chúng ta sử dụng `font-weight: initial` nó sẽ tương đương với `font-weight: normal`.

Bảng các giá trị mặc định của các thuộc tính được liệt kê ở đây: [Link](https://www.w3.org/TR/CSS2/propidx.html)

- `inherit`: Dịch ra có nghĩa là kế thừa, tức là thuộc tính nào sử dụng giá trị này sẽ có kết quả là giá trị như các phần tử bọc bên ngoài nó. Trở lại thuộc tính `font-weight`, là một thuộc tính có tính chất kế thừa, mặc định nó sẽ không mang giá trị `initial` mà sẽ là `inherit`, kế thừa giá trị từ các phần tử bọc bên ngoài nó.
  Tất nhiên, nếu chúng ta muốn nó mang giá trị mặc định, chúng ta có thể set `font-weight: initial` như ở trên.

Tuy các thuộc tính thuộc loại kế thừa, giá trị nó thể hiện sẽ là `inherit`, nhưng nếu là thẻ `html`, tức là root, nó không thể kế thừa vì nó là phần tử ngoài cùng. Lúc này, các thuộc tính (thuộc loại inherit) dành cho html sẽ mang giá trị initial.

- `unset`: Khi sử dụng giá trị này, nó sẽ set lại giá trị của thuộc tính là `inherit` nếu thuộc tính đó thuộc loại kế thừa, còn không sẽ là `initial`. Tức là nó sẽ reset về initial hoặc inherit tùy loại thuộc tính.

```css
.a {
  font-weight: unset;
  /*tương đương với*/
  font-weight: inherit;
}
.b {
  display: unset;
  /*tương đương với*/
  display: initial;
}
```

- `revert`: Đây là một giá trị đặc biệt, tương tự như `unset`. Tuy nhiên, thay vì chuyển thành initial hay inherit, nó sẽ chuyển về giá trị mặc định mà trình duyệt đã quy định cho thuộc tính đó.

Ví dụ, nếu chúng ta reset giá trị display dành cho table sử dụng revert:

```css
table {
  display: revert;
}
```

display không phải thuộc tính dạng kế thừa, nên nếu dùng unset, chúng ta sẽ set nó về initial, cụ thể là inline. Nhưng vì dùng revert, nó sẽ reset về giá trị mà trình duyệt quy định cho nó:

```css
table {
  display: revert;
}

/* Tương đương với */

table {
  display: table;
}
```

## overscroll-behavior

Ở dưới mình có một box màu xanh và một box màu vàng, box xanh bọc box vàng. Và 2 box hiện có content dài hơn chiều cao của box, nên bạn có thể sử dụng chuột để scroll trong box vàng hay box xanh.

Nếu bạn thử scroll trong box vàng, đến đáy của box vàng, nó sẽ tự động tiếp tục scroll box xanh.

<div class="h-[400px] bg-blue-200 grid grid-cols-2 overflow-auto mb-4 text-black">
  <div class="h-[600px] p-4 flex flex-col">
    Something good
    <span class="mt-auto">
      Blue box bottom
    </span>
  </div>
  <div class="h-[200px] bg-yellow-200 overflow-auto">
    <div class="h-[300px] p-4 flex flex-col">
    Something different
    <span class="mt-auto">
      Yellow box bottom
    </span>
    </div>
  </div>
</div>

Vậy, nếu chúng ta muốn scroll trong box vàng, đến đáy thì dừng lại, dù scroll tiếp (chuột đang ở trong box vàng) thì không làm cho box xanh scroll phải làm sao?

```css
.yellow-box {
  overscroll-behavior: contain;
}
```

Như vậy, chúng ta sẽ chặn được việc scroll tiếp tục dù chạm đáy box vàng.

<div class="h-[400px] bg-blue-200 grid grid-cols-2 overflow-auto mb-4 text-black">
  <div class="h-[600px] p-4 flex flex-col">
    Something good
    <span class="mt-auto">
      Blue box bottom
    </span>
  </div>
  <div class="h-[200px] bg-yellow-200 overflow-auto overscroll-contain">
    <div class="h-[300px] p-4 flex flex-col">
    Something different
    <span class="mt-auto">
      Yellow box bottom
    </span>
    </div>
  </div>
</div>

overscroll-behavior còn có một giá trị nữa là `none`. Nó tương tự như `contain`, nhưng disable thêm hiệu ứng khác nữa.

Cụ thể, à mà bạn có thể tự đọc ở đây để có video minh họa: [Link](https://css-tricks.com/almanac/properties/o/overscroll-behavior/).

<!--
## scroll snap

Ví dụ bạn có một danh sách cái item scroll ngang như này:

<div class="grid grid-flow-col gap-4 p-4 mb-4 overflow-auto bg-yellow-200">
  <div class="w-[100px] h-[100px] bg-blue-400"> </div>
  <div class="w-[100px] h-[100px] bg-blue-400" > </div>
  <div class="w-[100px] h-[100px] bg-blue-400" > </div>
  <div class="w-[100px] h-[100px] bg-blue-400" > </div>
  <div class="w-[100px] h-[100px] bg-blue-400" > </div>
  <div class="w-[100px] h-[100px] bg-blue-400" > </div>
  <div class="w-[100px] h-[100px] bg-blue-400" > </div>
  <div class="w-[100px] h-[100px] bg-blue-400" > </div>
  <div class="w-[100px] h-[100px] bg-blue-400" > </div>
  <div class="w-[100px] h-[100px] bg-blue-400" > </div>
</div>

Và bạn dĩ nhiên có thể scroll thoải mái, thích dừng ở đâu cũng được. Tuy nhiên, nếu chúng ta muốn người dùng mỗi lần scroll phải đi hết một item thì sao?

```css
.container {

}

``` -->

<!-- ## word-break, work-wrap

````css
.wb {
  word-break: break-all;
  word-break: keep-all;
  word-break: break-word;
}
```

## animation-fill-mode
-->
