---
title: "[CSS] Phân biệt items vs content trong Grid, Flex"
date: "2021-10-31T00:45:07.421Z"
description: "Trong bài viết này, chúng ta sẽ phân biệt giữa justify-content vs justify-items, align-content vs align-items được sử dụng trong Flex và Grid"
---

Trong bài viết này, chúng ta sẽ cùng nhau phân biệt giữa `justify-content` vs `justify-items`, `align-content` vs `align-items` được sử dụng trong Flex và Grid.

Đối với `flex` thì tùy vào direction `column` hay `row` mà ta có chức năng của `align-*` và `justify-content` sẽ khác nhau (các trục thay đổi hướng). Tuy vậy, trong bài viết này, chúng ta sẽ sử dụng hướng mặc định của flex.

## alignt-items vs align-content

Đầu tiên, chúng ta sẽ phân biệt `align-items` và `align-content` trong flex (grid tương tự).

Cho ví dụ minh họa sau:

<div class="rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 p-6 mb-10">
  <div class="flex justify-start flex-wrap h-[300px] border-blue-500 border-2 border-solid ">
    <div class="m-4 w-1/3 h-16 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">1</div>
    <div class="m-4 w-1/3 h-24 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">2</div>
  </div>
</div>

Ta có thể thấy một số đặc điểm trong ví dụ:

1. Có 1 container chứa 2 item nằm trên 1 hàng
2. Chiều cao các item không giống nhau
3. Chiều cao các item không chiếm hết chiều cao của container

Chúng ta hãy hình dung có 1 wrapper bao bọc vừa khít các phần tử.

<div class="rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 p-6 mb-10">
  <div class="flex justify-start flex-wrap h-[300px] border-blue-500 border-2 border-solid ">
    <div class="flex self-start border-purple-500 w-full border-4 border-dashed">
      <div class="mx-4 w-1/3 h-16 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">1</div>
      <div class="mx-4 w-1/3 h-24 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">2</div>
    </div>
  </div>
</div>

Và giờ chúng ta sẽ thấy rõ sự khác nhau giữa `align-items` và `align-content`.

- align-items sẽ điều chỉnh bản thân các item di chuyển theo trục dọc trong phạm vi của wrapper đó. Ví dụ chúng ta có `align-items: flex-end`:

<div class="rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 p-6 mb-10">
  <div class="flex justify-start flex-wrap h-[300px] border-blue-500 border-2 border-solid ">
    <div class="flex self-start border-purple-500 w-full border-4 border-dashed items-end">
      <div class="mx-4 w-1/3 h-16 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">1</div>
      <div class="mx-4 w-1/3 h-24 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">2</div>
    </div>
  </div>
</div>

- align-content sẽ điều chỉnh nguyên khối wrapper di chuyển theo trục dọc trong phạm vi container. Ví dụ `align-content: flex-end`:

<div class="rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 p-6 mb-10">
  <div class="flex justify-start flex-wrap h-[300px] border-blue-500 border-2 border-solid content-end">
    <div class="flex self-start border-purple-500 w-full border-4 border-dashed">
      <div class="mx-4 w-1/3 h-16 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">1</div>
      <div class="mx-4 w-1/3 h-24 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">2</div>
    </div>
  </div>
</div>

\*\* **Lưu ý: align-content chỉ hoạt động khi container có thuộc tính flex-wrap có giá trị khác `no-wrap` (tức là `wrap` và `wrap-reverse`)**

## justify-items vs justify-content

\* Thuộc tính `justify-items` chỉ có trong `CSS Grid`

Tương tự với như align-\*, justify-content và justify-items hoạt động y hệt, nhưng chỉ khác là điều chỉnh item/content theo trục ngang.

Cho ví dụ sau:

<div class="rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 p-6 mb-10">
  <div class="h-[300px] grid grid-rows-2" style="grid-template-columns: repeat(2, max-content)">
    <div class="w-[40px] h-16 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-yellow-500">1</div>
    <div class="w-[50px] h-24 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">2</div>
    <div class="w-[70px] h-24 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-yellow-500">3</div>
    <div class="w-[80px] h-24 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500">4</div>
  </div>
</div>

Chúng ta có thể nhận thấy:

1. Có 2 cột, mỗi cột có 2 item có chiều rộng không bằng nhau
2. Chiều rộng cả 2 cột không bằng chiều rộng của cả container

![Grid 1](./grid-1.png)

- justify-content sẽ điều chỉnh nguyên khối wrapper (các cột) di chuyển theo trục ngang trong phạm vi của container. Ví dụ: `justify-content: space-between`.

![Grid 2](./grid-2.png)

- justify-items sẽ điều chỉnh các item trong từng cột di chuyển theo trục ngang trong phạm vi của wrapper. Ví dụ: `justify-items: end`.

![Grid 3](./grid-3.png)

## Kết luận

Để phân biệt và hiểu dễ dàng các thuộc tính item/content, chúng ta nên làm mẫu với các item có chiều rộng, chiều cao khác nhau và đặc biệt là chưa chiếm hết diện tích của container.
