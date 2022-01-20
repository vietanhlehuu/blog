---
title: "[WEB SERIES] Mật mã hóa khóa công khai"
date: "2022-01-12T11:39:32.239Z"
description: "Mật mã hóa khóa công khai (public key cryptography), hay mã hóa bất đối xứng là một từ khóa thường gặp rất nhiều khi lập trình (web, mobile,...).

Đây là bài đầu tiên trong series về web mà mình dự định viết trong thời gian tới."
---

Mật mã hóa khóa công khai (public key cryptography), hay mã hóa bất đối xứng là một từ khóa thường gặp rất nhiều khi lập trình (web, mobile,...).

Đây là bài đầu tiên trong series về web mà mình dự định viết trong thời gian tới.

Vậy nhu cầu sử dụng loại mã hóa này để làm gì?

Khi nói đến mã hóa, chúng ta sẽ nghĩ về vấn đề riêng tư. Khi mà chúng ta muốn truyền một thông điệp nào đó đến một người cụ thể nhưng không muốn những người khác biết. Lúc này các giải thuật mã hóa được dùng đến.

Đầu tiên, đơn giản nhất, chúng ta có một chìa khóa (key) để mã hóa thông điệp của mình. Chúng ta gửi thông điệp đó tới người nhận, đồng thời cũng chia sẻ trước cho người nhận key đó, dùng để giải mã thông điệp. Nhưng vấn đề là key đó có thể lọt ra ngoài, và bất cứ ai thấy được thông điệp cũng có thể dễ dàng giải mã nó. Mã hóa kiểu này người ta gọi là mã hóa đối xứng, chỉ sử dụng 1 key để mã hóa đồng thời giải mã.

Việc sử dụng 1 key như vậy sẽ có bất lợi như trên. Nên chúng ta sẽ có loại thứ 2, mã hóa bất đối xứng, cụ thể là mã hóa khóa công khai. Sử dụng một cặp key: public key và private key.

Chúng ta thường dùng chương trình để sinh ra cặp key public và private đó.

Đối với public key, chúng ta có thể công khai chia sẻ, bất cứ ai cũng có thể lấy được key này. Mỗi khi ai đó muốn gửi thông điệp đến cho chúng ta, họ chỉ cần sử dụng public key để mã hóa thông điệp đó (giải thuật thường dùng nhất là RSA). Chỉ chúng ta, người nắm giữ private key tương ứng với public key đó mới có thể giải mã được thông điệp. Nhờ đó, chúng ta không phải lo về việc khóa bị lộ ra ngoài hay làm cách nào để chia sẻ khóa chung một cách an toàn (đối với mã hóa đối xứng). Ngoài ra, private key cũng không dễ để tìm được thông qua public key.

Chúng ta cùng lấy một ví dụ: An muốn gửi cho Bảo một thông điệp và muốn thông điệp đó được giữ bí mật. Bởi vậy, An sẽ dùng public key do Bảo cung cấp để mã hóa tin nhắn và gửi đến cho Bảo, Bảo sẽ sử dụng private key của mình để giãi mã thông điệp đó.

Tuy nhiên, nếu một ai đó giả mạo An, gửi tin nhắn cho Bảo thì sao? Bởi vì tin nhắn chỉ đảm bảo rằng Bảo sẽ nhận được tin nhắn được mã hóa bởi public key của mình, nhưng sẽ không biết được chính xác người gửi là ai.

Để giải quyết vấn đề đó, An thay vì chỉ gửi thông điệp được mã hóa bởi public key của Bảo, sẽ gửi kèm thêm một chữ ký điện tử của bản thân đi kèm.

Chữ ký điện tử đó được tạo ra như thế nào? An sẽ hash thông điệp gửi đi, sau đó sử dụng private key của mình để mã hóa đoạn hash đó. Khi Bảo nhận được thông điệp, sẽ giải mã chữ ký của An (dùng public key của An để giải mã), sau đó sẽ hash thông điệp nhận được và so sánh với đoạn hash vừa giải mã xong, để kiểm chứng tin nhắn có bị thay đổi hay không.

Như vậy, nhờ chữ ký điện tử, chúng ta có thể xác thực người gửi đồng thời kiểm tra thông điệp có toàn vẹn hay không.

Tuy nhiên lần nữa, việc chia sẻ public key trong mạng internet cho những người khác không hề an toàn. Bởi lẽ việc bị một ai đó đánh tráo public thật và share cho người khác với public key giả mạo danh của mình.

Lấy một ví dụ để dễ hiểu hơn: An chia sẻ public key của mình qua internet tới Bảo, nhưng Cường đã đánh tráo public key đó bằng public key của mình. Bảo sẽ tưởng rằng đó là public key của An, nên sẽ dùng nó để mã hóa thông điệp và gửi đến cho An. Nhưng Bảo không ngờ rằng Cường sẽ chặn lấy được thông điệp đó, giải mã nó (bởi vì Bảo đã dùng public key của Cường), sau đó Cường sẽ mã hóa thông điệp đó với public key của An và gửi tới cho An. An vẫn sẽ nghĩ đây là thông điệp gốc đến từ Bảo, nhưng thật ra Cường cũng đã biết.

Để đảm bảo việc chúng ta nhận public key từ một ai đó là chính xác của họ, chúng ta sẽ thông qua một bên thứ 3 mà chúng ta tin tưởng, bên đó được gọi là Certificate Authority (hay CA).

Nhờ CA, mỗi khi chúng ta nhận được public key, chúng ta có thể biết chắc đó chính là public key của người nhận mà chúng ta nghĩ.

Chi tiết về cách trao đổi public key thông qua CA sẽ được mình nói chi tiết hơn trong bài HTTPS hoạt động như thế nào.

Hy vọng khi mình rảnh sẽ thêm các hình ảnh minh họa cho bài viết này. Nếu bạn nhìn thấy dòng này tức là mình chưa có thời gian đó 😅.

Cảm ơn bạn đã đọc đến đây. Sai sót gì bình luận phía dưới để mình sửa nhé, sau đó mọi người sẽ không biết là mình viết sai nữa 😉.
