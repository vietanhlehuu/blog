import React, { useEffect } from "react"

function Comments() {
  useEffect(() => {
    document.getElementById("comment-github").innerHTML = ""
    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("repo", "vietanhlehuu/blog")
    script.setAttribute("label", "✨💬✨")
    script.setAttribute("theme", `photon-dark`)
    script.crossOrigin = "anonymous"
    script.async = true
    document.getElementById("comment-github").appendChild(script)
  }, [])
  return (
    <>
      <p className="pb-2 mt-8">
        Phần bình luận phía dưới sử dụng{" "}
        <a href="https://github.com/login">Github</a> , nếu bạn muốn bình luận
        thì hãy đăng nhập trước đã nhé 😅
      </p>
      <div id="comment-github" />
    </>
  )
}

export default Comments
