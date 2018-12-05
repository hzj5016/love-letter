let css1 = `/*
hello你好，我是小冰冰
用文字介绍太单调了，我就用代码来介绍吧。
*/
/*首先，我们来加个全局过渡效果吧*/
*{
  transition: all 1.5s;
}
/*没有效果是不是？ 没关系，我们先加个背景色*/
html{
  background: rgb(0,43,54);
  font-size: 16px;
}
/*
给我们的文字添加个边框吧
*/
#code{
  border: 2px solid red;
  padding: 20px;
}
/*咦，代码颜色不是肯好看哦，我们来加个代码高亮吧*/
.token.function{
  color: #DD4A68;
}
.token.property{
  color: #905;
}
.token.selector{
  color: #690;
}
/*哎呀，边框颜色不是很好看，我们在换个颜色吧*/
#code{
  border: 2px solid yellow;
}
/*只写代码太单调了，我们来搞点事情*/
#code{
  width: 47%;
}
#code{
  border: 2px solid grey;
}
/*加点呼吸效吧*/
#code{
  animation: breath 0.5s infinite alternate-reverse
}
/*好啦，现在我先准备一张白纸*/
/*
3
2
1
*/
`
let css2 = `/*
看右边，白纸出现了，但是有点丑，没事*/
/*我们把白纸变得好看些*/
#paper{
  height: 100%;
  width: 47%;
  animation: breath 0.5s infinite alternate-reverse
}
#code-wrapper{
  justify-content: space-between;
}
/*接下来我们在白纸上写字吧*/
#paper{
  padding: 20px;
}
`
let css3 = `/*
写完了，但是
不能滑动来看，
没关系，我们加点效果
*/
#code{
  overflow: auto;
}
#paper{
  overflow: auto;
}

`
let markdown = `
## 相遇
- 你知道什么是意外嘛？
- 就是，我没想过会遇到你，
- 但我遇见了。
- 我从没想过会爱上你，
- 但我爱上了。
- 夏天，我遇到你的，
- 第一个夏天。
- 我就想给你整个世界。

## 性格
- 可能你也很傲娇吧，
- 可能你也有小性格吧，
- 不要哭，不要气，
- 我一直都在，
- 你回头，
- 我会抱着你。

## 孤独
- 虽然我们已经好了，
- 但我还是孤独。
- 与生俱来的孤独。
- 我都还没，
- 准备好恋爱，
- 你就来了。
- 这个冬天特备冷。
- 在这所校园里，
- 看曾经，
- 看现在，
- 看未来，
- 我都不知所措

## 此刻
- 你来之前，我怕太长，
- 见你之后，我恐太短。
- 这就是为什么，
- 见面后，
- 我总想多呆一天的原因。
- 我就是想，
- 多抱着你一会儿。
- 你的眼里在我看来，
- 藏不住任何心事。
- 怪就怪，
- 这被子太清。
- 压不住，
- 我想你的心。

##未来
- 未来总让人捉摸不透。
- 冬日的寒风，
- 把我的身体吹透。
- 只有我抱着你的时候，
- 才最踏实。

##结语
- 江湖太长，我不去了。
- 雨露伴着初阳，
- 晚风吹着落霞。
- 少年陪着姑娘，
- 而我只陪着你。
- 2018，12月，1日-- 星期六

`
writeCSS('', css1, () => {
  createPaper(() => {
    writeCSS(css1, css2, () => {
      writeMarkdown(markdown, () => {
        markdownToHTML(() => {
          writeCSS(css1 + css2, css3, () => {
            console.log(1)
          })
        })
      })
    })
  })
})
//把code写到#code和style标签里
function writeCSS(prefix, code, fn) {
  let domCode = document.querySelector('#code')
  let n = 0
  let timer = setInterval(() => {
    n++
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css')
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(timer)
      fn && fn.call()
    }
  }, 100)
}
//创建一张白纸
function createPaper(fn) {
  let paper = document.createElement('div')
  paper.id = "paper"
  let content = document.createElement('pre')
  content.className = "content"
  paper.appendChild(content)
  console.log(content)
  let wrapper = document.querySelector('#code-wrapper')
  wrapper.appendChild(paper)
  fn && fn.call()
}
//在白纸里面写markdown
function writeMarkdown(markdown, fn) {
  let slied = document.querySelector('#paper')
  let domPaper = document.querySelector('#paper> .content')
  let n = 0
  let id = setInterval(function () {
    n++
    domPaper.innerHTML = markdown.substring(0, n)
    slied.scrollTop = slied.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 50)
}
//把markdown转为HTML
function markdownToHTML(fn) {
  let div = document.createElement('div')
  div.className = "markdownBody"
  div.innerHTML = marked(markdown)
  let markdownContain = document.querySelector('#paper> .content')
  markdownContain.replaceWith(div)
  fn && fn.call()
}
