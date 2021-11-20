---
title: "[JS] Scope trong JS"
date: "2021-11-08T05:58:21.675Z"
description: "Scope, hay dịch ra tiếng Việt là tầm vực, hay có thể gọi nôm na là phạm vi sử dụng của một biến."
---

Đang được hoàn thiện

<!-- Scope, hay dịch ra tiếng Việt là tầm vực, hay có thể gọi nôm na là phạm vi sử dụng của một biến.

Tầm vực trong ngôn ngữ lập trình nói chung có 2 loại: lexical scope và dynamic scope. Nhưng trong JavaScript chỉ có lexical scope mà thôi. Nên bài này chỉ đề cập lexical scope như là scope.

Như lời đầu tiên, scope tức là phạm vi sử dụng của một biến. Nó phụ thuộc vào 2 điều kiện: được khai báo với từ khóa nào? (var, let, const) và vị trí được khai báo.

## Trường hợp 1: Dành cho biến được khai báo sử dụng let và const

```js
const a = 1
console.log(a)
```

Ví dụ chúng ta khai báo biến `a` ở ngay khu vực toàn cục (không nằm trong bất cứ function nào).Lúc này, tất cả những khu vực phía dưới nó, bất kể trong function khác, đều có thể sử dụng biến này.

```js
const a = 1
console.log(a) // 1

function f() {
  console.log(a) // sẽ in ra khi hàm được gọi
}

f() // 1
``` -->
