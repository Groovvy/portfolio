/* ==========================================================
   Portfolio — 交互脚本
   1) 打字机效果  2) 滚动显现  3) 导航交互
   ========================================================== */

/* ---------- 1. Hero 打字机效果 ---------- */
(function typedCode() {
  var el = document.getElementById("typedCode");
  if (!el) return;

  // TODO: 换成你自己的介绍，支持简单高亮标记：
  // {{kw:...}} 关键字紫色  {{ty:...}} 类名蓝色  {{str:...}} 字符串绿色  {{cm:...}} 注释灰
  var lines = [
    '{{kw:public class}} {{ty:Developer}} {',
    '',
    '    {{cm:// 把想法变成能上线的软件}}',
    '    {{kw:private}} {{ty:String}} name     = {{str:"Groovvy"}};',
    '    {{kw:private}} {{ty:String[]}} skills  = {',
    '        {{str:"Java"}}, {{str:"Spring Boot"}}, {{str:"Vue 3"}},',
    '        {{str:"React"}}, {{str:"MySQL"}}, {{str:"Docker"}}',
    '    };',
    '',
    '    {{kw:public}} {{ty:String}} {{ty:build}}({{ty:String}} idea) {',
    '        {{ty:String}} product = {{str:"clean code + tests + docs"}};',
    '        {{kw:return}} {{str:"delivered on time"}};',
    '    }',
    '}',
  ];

  function renderPlainText() {
    el.innerHTML = lines
      .map(function (l) {
        return l.replace(/\{\{(?:kw|ty|str|cm):(.+?)\}\}/g, "$1")
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      })
      .join("\n");
  }

  function highlight(line) {
    var escaped = line
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return escaped.replace(
      /\{\{(kw|ty|str|cm):(.+?)\}\}/g,
      function (_, cls, text) {
        return '<span class="' + cls + '">' + text + "</span>";
      }
    );
  }

  var lineIdx = 0, charIdx = 0, out = [];
  var reducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) { renderPlainText(); return; }

  function tick() {
    if (lineIdx >= lines.length) return; // 打完就停，光标留在末尾闪烁
    var line = lines[lineIdx];
    // 每行按 {{xx: }} 标记拆成片段，逐字符输出纯文本
    var plain = line.replace(/\{\{(?:kw|ty|str|cm):(.+?)\}\}/g, "$1");
    charIdx++;
    out[lineIdx] = plain.slice(0, charIdx);
    var html = out
      .map(function (partial, i) {
        // 已完成的行用完整高亮，当前行输出纯文本
        return i < lineIdx ? highlight(lines[i]) : partial;
      })
      .join("\n");
    el.innerHTML = html;

    if (charIdx >= plain.length) {
      lineIdx++; charIdx = 0;
      setTimeout(tick, lineIdx < lines.length ? 260 : 0); // 行间停顿
    } else {
      setTimeout(tick, 14);
    }
  }
  tick();
})();

/* ---------- 2. 滚动显现 ---------- */
(function revealOnScroll() {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (i) { i.classList.add("visible"); });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach(function (i) { io.observe(i); });
})();

/* ---------- 3. 导航 ---------- */
(function navFeatures() {
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // 点击菜单项后自动收起（移动端）
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
