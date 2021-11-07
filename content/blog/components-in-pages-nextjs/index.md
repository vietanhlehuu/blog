---
title: "[NextJS] Đặt components trong pages"
date: "2021-11-07T12:44:50.577Z"
description: "Khi làm việc với NextJS, đôi lúc mình có nhu cầu đặt components trong thư mục pages (chứa các component con cho 1 page nào đó). Nhưng vấn đề là những component đó sẽ bị tính là các page."
---

Khi làm việc với NextJS, đôi lúc mình có nhu cầu đặt components trong thư mục pages (chứa các component con cho 1 page nào đó). Nhưng vấn đề là những component đó sẽ bị tính là các page. Vậy làm sao để giải quyết vấn đề đó?

Cấu trúc thư mục cơ bản của một project sẽ có như thế này:

<pre>
-- project
  |
  |- pages
    |- landing
      |- index.js
    |
    |- login
      |- index.js
    |
    |- home
      |- index.js
  |- components
  |- public
  |
  .
  .
  |- public
</pre>

Thường thì thư mục components mình chứa các component có thể dùng chung giữa các pages, ví dụ như `Layout`, `SEO`, ...

Nhưng khi làm một vài trang như `Landing page` chẳng hạn, gồm rất nhiều thư mục, nhu cầu mình muốn bỏ chung components của Landing page tại thư mục tương ứng của nó luôn mà không cần phải tách ra thư mục `components` ở ngoài.

NextJS có một giải pháp đó là [Custom Page Extensions](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions).

Trong file `next.config.js` chúng ta sẽ có thể config như này:

```js
module.exports = {
  pageExtensions: ["jsx", "js", "tsx", "ts"],
}
```

Như vậy, chỉ những file có đuôi `.jsx`, `.js`,... mới được tính như là pages.

Thế nên, để giải quyết vấn đề ban đầu, mình sẽ thêm convention cho project là những component được tính là 1 page khi có đuôi là `.page.js`, ví dụ: `landing.page.js`

```js
module.exports = {
  pageExtensions: ["page.jsx", "page.js", "page.tsx", "page.ts"],
}
```

Giờ chúng ta có thể để các components chung với thư mục chứa page.

<pre>
-- project
  |
  |- pages
    |- landing
      |- <b class="text-blue-300">index.page.js</b>
      |- <b class="text-pink-300"><i>header.js</i></b>
      |- <b class="text-pink-300"><i>footer.js</i></b>
    |
    |- login
      |- index.page.js
    |
    |- home
      |- index.page.js
  |- components
  |- public
  |
  .
  .
  |- public
</pre>

## Nhược điểm

- Tất cả các pages đều phải áp dụng convention này
- Và những file như \_app, \_document đều phải áp dụng convention này
