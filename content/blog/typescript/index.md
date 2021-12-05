---
title: "[TS] Vài chiếc ghi chú dành cho TypeScript"
date: "2021-11-20T00:02:05.010Z"
description: "Bài này dành để ghi chú một số thứ mình thấy đáng lưu ý khi học và sử dụng TypeScript. Đây không phải là tutorial hướng dẫn sử dụng TS, bởi vậy bài này dành cho những bạn đã sử dụng TS và biết một số khái niệm thông dụng"
---

Bài này dành để ghi chú một số thứ mình thấy đáng lưu ý khi học và sử dụng TypeScript. Đây không phải là tutorial hướng dẫn sử dụng TS, bởi vậy bài này dành cho những bạn đã sử dụng TS và biết một số khái niệm thông dụng.

### 0. Các kiểu cơ bản

Trong TS, ta có các type cơ bản là:

1. number
2. string
3. boolean
4. null
5. undefined
6. unknown
7. any
8. never

Trong đó, có 3 loại mà chúng ta cần lưu ý là: `unknown`, `any` và `never`.

- `any`: Khi một biến được khai báo với kiểu any, tức là biến đó có thể chứa bất kỳ giá trị nào. Đồng thời, biến với kiểu any cũng có thể gán cho những kiểu dữ liệu khác. Tức là:

```ts
function foo(n: number) {
  // do something
}
let a: any = "lorem"
let b: number

b = a // hợp lệ
foo(a) // hợp lệ
```

- `unknown`: Đối với kiểu này, nó khá giống với any, biến khai báo với unknown có thể chứa bất kỳ giá trị nào. Nhưng nó lại khác với any ở chuyện dùng nó. Muốn sử dụng giá trị của một biến unknown, Typescript bắt buộc phải xác định kiểu trước khi dùng.

```ts
function foo(n: number) {
  // do something
}
let a: unknown = "lorem"
let b: number

b = a // báo lỗi, vì chưa xác định kiểu thật sự của a trước khi sử dụng

if (typeof a === "number") {
  b = a // hợp lệ
  foo(a) // hợp lệ
}
```

- `never`: Đây là một kiểu đặc biệt, khi mà biến được khai báo với kiểu này, không một giá trị nào có thể gán cho nó. Kiểu never thường ít được sử dụng trực tiếp, mà dùng để hệ thống bắt lỗi hoặc sử dụng trong generics.

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

Khi sử dụng const sau một giá trị, tức ta đã biến giá trị đó thành literal type.

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

Hoặc là `a: { b: string }` hoặc là `a: { c: string }`. Không thể tồn tại a với kiểu là kết hợp cả 2.

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

Tất nhiên đó là sự liên tưởng, nhưng khi kết hợp & và | thì cách hoạt động cũng tương tự như vậy, nên ta có

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

## 7. keyof, typeof

### 7.1 keyof

- `keyof`: Sử dụng khi muốn lấy type của các keys của một type dạng object. Ví dụ:

```ts
type Obj = {
  1: string
  b: string
  c: number
}
type Keys = keyof Obj
// Keys = 1 | 'b' | 'c'
```

Các type keys sau khi sử dụng keyof có thể là number, string, symbol.

Trong ví dụ trên, nếu chúng ta chỉ muốn lấy những keys thuộc kiểu string, thì có thể sử dụng intersection (&):

```ts
type Obj = {
  1: string
  b: string
  c: number
}
type Keys = keyof Obj
// Keys = 1 | 'b' | 'c'

type StringKeys = Keys & string
// Keys = 'b' | 'c'
```

Tại sao `Keys & string` lại chỉ trả về các type dạng string?

```ts
type StringKeys = Keys & string

// tương đương

type StringKeys = (1 | "b" | "c") & string

// tương đương

type StringKeys = (1 & string) | ("b" & string) | ("c" & string)

// tương đương

type StringKeys = never | "b" | "c"

// tương đương

type StringKeys = "b" | "c"
```

Trong đoạn code trên, có 2 điều cần chú ý:

- Kết quả trả về khi sử dụng intersection: `"b" & string => "b"`
- Kết quả trả về khi sử dụng union với never:
  - Bất cứ type nào union với never cũng trả về chính type đó: `string | never => string`
- Từ 2 quy luật trên, có thể rút ra quy luật chung như thế này:
  - Khi union ta sẽ có kết quả là type rộng hơn
  - Khi intersection ta sẽ có kết quả là type hẹp hơn

Câu hỏi dành cho bạn:

```ts
type A = unknown | string // ???

type A = unknown & string // ???
```

### 7.2 typeof

- `typeof` dùng để lấy type của một giá trị.

```ts
const a = {
  b: 1,
  c: "Hello world",
}

type A = typeof a

// Tương đương

type A = {
  b: number
  c: string
}
```

### 7.3 Lưu ý và ví dụ thực tế

- Lưu ý:
  - keyof sử dụng với type
  - typeof sử dụng với giá trị (value)
- Ví dụ thực tế: Trong một dự án React có sử dụng i18n, ta có rất nhiều file translation: `en.ts`, `vi.ts`,... Vấn đề cần giải quyết đó là làm sao đảm bảo các key trong file en và file vi phải giống nhau, không thể để một bên có và một bên không, gây ra lỗi khi hiển thị.

```ts
// file en.ts
const translations = {
  "Hello": "Hello",
  "World: "World"
}

export translations
```

```ts
// file vi.ts
const translations = {
  "Hello": "Xin chào",
  "World: "Thế giới"
}

export translations
```

Ta có thể nhận thấy giữa 2 file không có ràng buộc gì với nhau.

Đây là lúc chúng ta vận dụng kiến thức về typeof.

```ts
// file en.ts
const translations = {
  Hello: "Hello",
  World: "World",
}

export type TranslationEn = typeof translations

export default translations
```

```ts
// file vi.ts
import type { TranslationEn } from "./en.ts"

const translations: TranslationEn = {
  Hello: "Xin chào",
  World: "Thế giới",
}

export default translations
```

## 8 Generics

### 8.1 extends và conditional types

Viết mãi mới đến phần `extends` 😅.

> Chú ý: `extends` trong Generics khác với `extends` khi sử dụng để thừa kế với class, interface.

Lấy một ví dụ như thế này.

```ts
type WithLastName<T> = T extends string ? `${string} ${T}` : never

let name1: WithLastName<"Le Huu">

name1 = "Viet Anh Le Huu" // hợp lệ

name1 = "Dao Mai" // lỗi

let name2: WithLastName<123>

name2 = 123 // lỗi
```

Trong ví dụ này ta có 3 thứ để phân tích

- conditional types
- extends
- template literal types

Đầu tiên là với `conditional types`, đó chỉ là một thuật ngữ, cách hoạt động của nó giống như toán tử ternary `A ? B : C` trong JS.

Đối với vế A trong conditional types đó, chúng ta đang sử dụng `extends`. Thường cú pháp sẽ là `D extends E`, với D là một type được truyền vào type generics. Nghĩa của nó là D có phải là một type cụ thể hơn của E hay không.

Ví dụ:

`3 extends number`: Trong vô vàn các giá trị (type) của number, thì 3 chính là một giá trị cụ thể hơn của nó.

```ts
type User = {
  name: string;
}

T extends User

{ name: string; age: number } extends User // true

```

Ví dụ này thì có phần khó hiểu hơn, với type User khi sử dụng với extends, nó sẽ được diễn dịch như thế này: Nhận 1 type T với điều kiện tối thiểu là một object type có ít nhất những thuộc tính như thế này: `{ name: string }`. Bởi vậy, `{ name: string; age: number }` sẽ thỏa điều kiện đó.

Xem xét thêm các ví dụ bên dưới (Ví dụ được lấy từ [TS course](https://www.typescript-training.com/course/intermediate-v1/05-conditional-types/#quiz-expressing-conditions)):

```ts
1. 64 extends number

2. number extends 64

3. string[] extends any

4. string[] extends any[]

5. never extends any

6. any extends any

7. Date extends { new (...args: any[]): any }

8. typeof Date extends { new (...args: any[]): any }
```

Hãy thử trả lời trước khi lướt xem đáp án nào :)

.

.

.

.

.

.

.

.

.

.

Đáp án và giải thích:

1. `64 extends number` là true, 64 là một literal type cụ thể hơn của number.

2. `number extends 64` là false, number không thể là type cụ thể hơn của 64, nếu có 1 type T thỏa mãn `T extends 64` thì chỉ có thể là type `64`.

3. `string[] extends any` là true, bất cứ type gì cũng đều xác định và cụ thể type any.

4. `string[] extends any[]` là true, tương tự như trên.

5. `never extends any` là true, never là type cụ thể nhất trong tất cả các type, đại diện cho không có gì :D.

6. `any extends any` là true, any là type vừa khớp với any.

7. `Date extends { new (...args: any[]): any }` là false. type Date thể hiện là type của 1 instance của Date, không phải là type của một constructor function.

8. `typeof Date extends { new (...args: any[]): any }` là true. typeof Date thể hiện type của một constructor function/class.

Và thứ cuối cùng cần chú ý là [template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html).

### 8.2 Type inference

Trong quá trình làm việc, mình có một bài toán và được rút gọn như dưới đây:

```ts
// file generated-types.ts
type Product = {
  name: string
}

export type Data = Product[] | null

// file component.ts
import { Data } from "./generated-types.ts"

const data: Data

function logProduct(product: any) {}

data?.forEach(product => logProduct(product))
```

Vấn đề của bài toán trên cần giải quyết đó là typing (khai báo kiểu) cho tham số product của hàm logProduct. Chúng ta bị một ràng buộc là không thể chỉnh sửa file `generated-types.ts`, chính vì thế, chúng ta không thể `export type Product` ra bên ngoài được. (Không thể chỉnh sửa file generated, bởi vì nó được backend sinh ra, và mỗi lần cập nhật sẽ xóa hết nội dung cũ thay bằng nội dung mới, những gì chỉnh sửa trong file đó sẽ mất.)

Phân tích kỹ hơn, bài toán chúng ta cần làm là tách type Product từ type Data.

Solution đầu tiên, đơn giản nhưng không mang tính scale.

```ts
type ProductList = Exclude<Data, null>

type Product = ProductList[number]
```

Bằng cách này, đầu tiên, sẽ loại bỏ type null trong Data để chỉ còn lại Product[] và gán cho type ProductList. Sau đó, để lấy type của mỗi item trong list, ta sử dụng cú pháp [number]. Như vậy, chúng ta đã lấy được type của Product.

Nhưng tại sao mình lại nhận định đây là một solution không scale. Nếu sau đó phía backend cập nhật type của Data.

```ts
type Data = Product[] | string | null
```

Phần code chúng ta đã thực hiện `Exclude<Data, null>` không còn đúng nữa.

Solution thứ 2 sẽ hiệu quả hơn, chúng ta sẽ xem trước và phân tích sau:

```ts
type ExtractElementType<T> = T extends (infer U)[] ? U : never

type Product = ExtractElementType<Data>
```

Thoạt đầu nhìn sẽ hơi khó hiểu, nhưng hãy cùng phân tích:

Chúng ta tạo ra một type generics `ExtractElementType` nhận vào một type `T`. Type T sẽ được xem xét điều kiện để trả ra type cuối cùng. Điều kiện sẽ là T có phải là một type cụ thể, có dạng là U[] hay không, với U sẽ được TS cố gắng infer(suy luận ra). Nếu đáp ứng điều kiện, kết quả sẽ trả về là type U được infer đó, còn không sẽ trả về never.

Tiếp theo, ta sử dụng nó với Data, các bước nó tạo ra kết quả như sau:

```ts
type Product = ExtractElementType<Data>

// tương đương
type Product = ExtractElementType<Product[] | string | null>

// tương đương
type Product =
  | ExtractElementType<Product[]>
  | ExtractElementType<string>
  | ExtractElementType<null>

// tương đương
type Product = Product | never | never

// tương đương
type Product = Product
```

Điểm mấu chốt để hiểu ở đây chính là cách hoạt động của union và kết quả union khi kết hợp với never. Đặc biệt, đó là sự tồn tại của từ khóa `infer`, TS sẽ cố gắng giúp chúng ta suy luận ra một type nào đó.

## 9. Indexed Access Types

Như đã gặp trong các ví dụ trên, chúng ta có thể lấy type của một phần tử, thuộc tính trong một type khác bằng cách sử dụng cú pháp `indexed access`.

```ts
type A = {
  name: "Viet Anh" | "Anh Le"
}
type B = [number, string, boolean]

type Name = A["name"] // "Viet Anh" | "Anh Le"

type TuppleItem = B[number] // number | string | boolean
```

10. Mapped Types

```ts
type A = { [k: string]: string }

type B = { [k in "name" | "value"]: any }

type CompoentProps = { [k in keyof Window]: Window[k] }
```
