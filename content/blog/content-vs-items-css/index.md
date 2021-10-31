---
title: "[CSS] Phân biệt items vs content trong Grid, Flex"
date: "2021-10-31T00:45:07.421Z"
description: "Trong bài viết này, chúng ta sẽ phân biệt giữa justify-content vs justify-items, align-content vs align-items được sử dụng trong Flex và Grid"
---

_\* Các hình minh họa được lấy từ `tailwindcss`_

Trong bài viết này, chúng ta sẽ phân biệt giữa `justify-content` vs `justify-items`, `align-content` vs `align-items` được sử dụng trong Flex và Grid.

Cho đoạn code ví dụ sau, với 1 container và 3 items:

```css
.container {
  display: flex;
  height: 500px;
}
```

<div class="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 p-6">
  <div class="flex justify-center">
    <div class="w-16 h-16 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500 m-2">1</div>
    <div class="w-16 h-16 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500 m-2">2</div>
    <div class="w-16 h-16 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-blue-500 m-2">3</div>
  </div>
</div>
