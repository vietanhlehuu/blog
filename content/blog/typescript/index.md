---
title: "[TS] Vài chiếc ghi chú dành cho TypeScript"
date: "2021-11-20T00:02:05.010Z"
description: ""
---

### 0. Các kiểu cơ bản

Trong TS, ta có các type cơ bản là:

1. number
2. string
3. boolean
4. null
5. undefined
6. unknown
7. never

## 1. Literal type

Ngoài các types đã kể phía trên, có một type đặc biệt, được gọi là literal type.

```ts
// 1
let num1 = 1
// 2
const num2 = 1
```

Đối với khai báo trường hợp số 1, kiểu của num1 sẽ là `number`, bởi vì chúng ta đang khai báo với let, điều này dẫn đến num1 có thể được gán với một giá trị khác cùng kiểu.

Trong khi với trường hợp số 2, kiểu của num2 sẽ là `1`. Do được khai báo với const nên chắc chắn giá trị của num2 chỉ được giữ một giá trị duy nhất.

Vậy điều này có ý nghĩa gì? Hãy cùng xem ví dụ bên dưới:

```ts
function makeRequest(type = "POST" | "GET", data: any) {
  //... execute request
}

const request = {
  method: "POST",
  data: { id: 1 },
}

/// Liệu rằng dòng dưới có hợp lệ hay không?
makeRequest(request.method, request.data)
```

Hàm `makeRequest` nhận 2 tham số, tham số đầu tiên là type, với kiểu chính là literal type: "POST" hoặc là "GET".

Đối với object request, chúng ta sẽ có 2 thuộc tính method và data. Tuy nhiên, dù khai báo với `const`, nhưng request.method sẽ mang kiểu là `string` bởi vì chúng ta vẫn có thể sửa nó. Ví dụ `request.method = "abc"`.

Bởi vậy, việc gọi hàm `makeRequest(request.method, request.data)` sẽ báo lỗi, vì kiểu sẽ không được chấp nhận.

Tuy nhiên, nếu chúng ta chắc chắn rằng mình sẽ không bao giờ thay đổi giá trị của object request, chúng ta có thể làm như sau:

```ts
// Sử dụng từ khóa as const
const request = {
  method: "POST",
  data: { id: 1 },
} as const

makeRequest(request.method, request.data)
```

## 2. Function type

Đối với việc khai báo kiểu cho hàm, chúng ta có rất nhiều cách:

```ts
// CÁCH 1
function sum(a: number, b: numer): number {
  return a + b
}

// CÁCH 2
const sum = (a: number, b: number): number => {
  return a + b
}

// CÁCH 3
type SumFn = (a: number, b: number) => number
// -- hoặc
type SumFn = {
  (a: number, b: number): number
}
// -- hoặc
interface SumFn {
  (a: number, b: number): number
}

const sum: SumFn = (a, b) => {
  return a + b
}

// HÀM KHÔNG TRẢ VỀ
function log(a: number): void {
  console.log(a)
}

// Typing cho this
function clickHandler(this: HTMLButtonElement, event: Event) {
  // ...
}
```

Vì hàm cũng là object, nên đôi khi chúng ta sẽ có trường hợp cần thêm thuộc tính cho hàm:

```ts
type MathFn = {
  (a: number, b: number): number
  operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = "+"
```

Sử dụng Generics với hàm:

```ts
function arrayify2<Type>(a: Type): Array<Type> {
  return [a]
}
// hoặc
const arrayify = <Type extends unknown>(a: Type): Array<Type> => [a]
```

Đối với trường hợp Generics với arrow function, chúng ta phải sử dụng `extends`. Nguyên nhân có thể tham khảo tại [đây](https://kentcdodds.com/blog/typescript-function-syntaxes#generics).

Đôi khi một hàm có thể có nhiều hình thái (tức là tham số truyền vào có thể khác nhau về kiểu hoặc số lượng, kết quả trả về có thể khác kiểu). Người ta gọi đó là `overload`.

Cho một ví dụ như sau, chúng ta sẽ hiện thực một hàm `calc`, nhận vào 3 tham số: op, a và b. op chỉ có thể là `+` hoặc `-`. Nếu `+` thì a, b phải cùng là string hoặc cùng là number, và type trả về cũng tương ứng. Nhưng nếu op là `-`, thì a và b chỉ có thể là number

```ts
function calc(op: "+", a: string, b: string): string
function calc(op: "+", a: number, b: number): number
function calc(op: "-", a: number, b: number): number

function calc(
  op: "+" | "-",
  a: number | string,
  b: number | string
): number | string {
  if (op === "-" && typeof a === "number" && typeof b === "number") {
    return a - b
  }
  if (op === "+" && typeof a === "number" && typeof b === "number") {
    return a + b
  }
  if (op === "+" && typeof a === "string" && typeof b === "string") {
    return a + b
  }
  throw new Error("a, b should be the same type")
}

calc("-", 1, 2)

calc("-", "1", "2") // error
```

Bạn có thể thử lại [đây](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABBAhgGwgCjgBwFyIBEA1IQDSIoEDOUATjGAOYUBGN9jTAlBw8wG4AUKEiwEydFlwES5SgTAgAtqwCmdNopXq6vREtUbho6PCSoM2fEQC08qgZ0atTo3u3vhI8GYmXpGzlEAB87B09dUMRafhZEdjcosNiufUNkmM5mRABvIURCxBhgRGtEAF4q8MQAMlrEKABPHDU4UpRK6sIMjUI6hubW9oSuiqJeukJuPIKi+bo1KBA6JE7bBLnCgF8t4tLyqvHg+saWto6xiecpgbPh0tYrnpvp2fmFpZW1xGJN+d28xKZVwz1IdyGF0oz1SzH6p0hIyeRyIsKYb3yHyKi2Wq2hf1Ye0BRSgAAs6HAAO4GNTUgCidApdEwhBQbBipLgIDQABMEmpGqSBdQUMoBZDpkJdkIAiz7BQAIwUABM3BlUjl8kICq1yumQA)

Một số ví dụ trên được tham khảo từ [kentcdodds blog](https://kentcdodds.com/blog/typescript-function-syntaxes)

## 3. Union và Intersection types

### 3.1 Union

```ts
let a: { b: string } | { c: string }
```

Ví dụ trên thể hiện union types. Biến a có kiểu là object và cấu trúc có thể linh hoạt 1 trong 2.

Hoặc là `a: { b: string }` hoặc là `a: { c: string }`. Không thể tồn tại a với kiểu là combine cả 2.

Có 3 trường hợp đặc biệt:

```ts
let a: string | number | never
// Sẽ trở thành
let a: string | number

let b: string | number | any
// Sẽ trở thành
let b: any

let c: string | number | unknown
// Sẽ trở thành
let c: unknown
```

### 3.2 Intersection types

```ts
let a: { b: string } & { c: string }
```

Intersection types thì khác union, nó gộp các type lại với nhau, nhưng phải đảm bảo việc gộp hợp lý. Như ví dụ trên, ta sẽ có biến a có kiểu là `{ b: string; c: string }`.

Tuy nhiên, nếu ta khai báo như này:

```ts
let a: number & string
```

Trong trường hợp này, không có giá trị nào thỏa mãn gộp 2 kiểu đó cả, nên a sẽ có type `never`.

Thêm vài ví dụ để dễ hiểu:

```ts
let a: { b: string } & { b: number; c: string }

let b: {
  d: {
    a: string
  }
} & {
  d: {
    c: string
  }
}
```

Kết quả sẽ là:

```ts
let a: { b: never; c: string }

let b: {
  d: {
    a: string
    c: string
  }
}
```

### 3.3 Kết hợp

Sẽ nếu ra sao nếu kết hợp union và intersection?

```ts
type A = { a: string } | { a: number }

type B = { b: string }

type C = A & B // ===> ???
```

Ta có thể liên tưởng như thế này:

```ts
A = A1 + A2

B

C = (A1 + A2) * B

C = A1 * B + A2 * B
```

Tất nhiên đó là sự liên tưởng, nhưng khi combine & và | thì cách hoạt động cũng tương tự như vậy, nên ta có

```ts
type C = ({ a: string } & { b: string }) | ({ a: number } & { b: string })

// ==>

type C = { a: string; b: string } | { a: number; b: string }

// ==>

type C = {
  a: string | number
  b: string
}
```

Vậy với ví dụ bên dưới thì sao?

```ts
type A = { a: string } | { b: number }

type B = { c: string } | { d: string }

type C = A & B // ===> ???
```

## 4. Interfaces vs Type aliases

Interface với type alias có thể sử dụng thay thế cho nhau trong hầu hết các trường hợp.

Chức năng của chúng dùng để định nghĩa các custom type.

Trong phần này mình chỉ liệt kê sự khác nhau giữa interface và type (Câu này rất được hay hỏi trong phỏng vấn 😁).

### 4.1 Một số điểm chung cần lưu ý

- Type có thể extend một type, interface khác sử dụng `intersection` (&)
- Interface có thể extend một interface, type khác sử dụng `extends`
- Class có thể implements type và interface
-

### 4.2 Interface chỉ định nghĩa `object type`

Trong khi interface chỉ định nghĩa các object type, type alias có thể linh động hơn (primitive types, unions, tupples). Ví dụ:

```ts
type Request = "POST" | "GET"
```

### 4.3 Khác nhau về sự khai báo trùng lặp

Trong cùng 1 scope, với 1 tên, type alias chỉ có thể khai báo một lần. Trong khi đó, interface có thể khai báo nhiều lần, và kết quả sẽ là gộp giữa các interface đó với nhau.

## 5. Type guards và narrowing

```ts
function f(a: number | string) {}
```

Trong ví dụ trên, a có thể là number hoặc string, nhưng khi ta xử lý trên a, trước tiên phải xác định kiểu của a. Việc thu hẹp để xác định kiểu của a trong trường hợp này được gọi là narrowing.

Chúng ta có thể sử dụng các từ khóa có sẵn của TS (JS) để thực hiện narrowing, như là: `typeof`, `instanceof` (được gọi là các type guards).

```ts
function f(a: number | string) {
  if (typeof a === "number") {
    // Bây giờ type của a là number
    // Không còn là string nữa
  }
}
```

Tuy nhiên, chúng ta có thể tự build type guard của mình bằng cách sử dụng từ khóa `is`.

```ts
type A = { a: string }

type B = { b: string }

function f(p: A | B) {
  // Làm sao để TS
  console.log(p.a) // error
}
```

Chúng ta phải narrow cho nó trước khi dùng.

```ts
type A = { a: string }

type B = { b: string }

function isA(value: any): value is A {
  if (typeof value === "object" && "a" in value) {
    return true
  }
  return false
}

function f(p: A | B) {
  if (isA(p)) {
    console.log(p.a) // it works
  }
}
```

## 6. Nullish values

Xem xét trường hợp dưới đây:

```ts
type A = {
  a?: {
    num: number
  }
}

function foo(): number {
  const v: A = {
    a: {
      num: 1,
    },
  }

  return v.a.num + 1 // error
}
```

Trong ví dụ trên, TS sẽ báo lỗi. Vì `v.a` có thể `undefined` (theo type A, a đã được khai báo là optional). Nhưng chúng ta biết chắc là v.a có giá trị và không thể nào undefined.

Chúng ta sẽ dùng toán tử `!.` để nói với TS rằng mình chắc chắn chuyện đó.

```ts
type A = {
  a?: {
    num: number
  }
}

function foo(): number {
  const v: A = {
    a: {
      num: 1,
    },
  }

  return v.a!.num + 1
}
```

## 7. Generics

### 7.1 extends
