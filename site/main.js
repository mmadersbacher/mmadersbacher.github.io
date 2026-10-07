(function(){
  "use strict";
  var root = document.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* theme: dark by default, light on request, remembered per browser */
  var btn = document.querySelector("[data-theme-toggle]");
  function apply(t){
    if (t === "light") root.setAttribute("data-theme", "light"); else root.removeAttribute("data-theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "light" ? "#f3f0e9" : "#101011");
    if (btn){ btn.textContent = t === "light" ? "Dark mode" : "Light mode"; btn.setAttribute("aria-pressed", String(t === "light")); }
  }
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  apply(stored === "light" ? "light" : stored === "dark" ? "dark" : (root.getAttribute("data-theme") === "light" ? "light" : "dark"));
  if (btn) btn.addEventListener("click", function(){
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* redaction: bars wipe away when the cursor gets near, then stay open */
  var bars = [].slice.call(document.querySelectorAll(".rd"));
  if (bars.length){
    if (matchMedia("(hover:none)").matches){
      bars.forEach(function(b){ b.addEventListener("click", function(){ b.classList.add("on"); }); });
    } else {
      var R = 90;
      addEventListener("mousemove", function(e){
        for (var i = bars.length; i--;){
          var b = bars[i]; if (b.classList.contains("on")) continue;
          var r = b.getBoundingClientRect();
          var dx = Math.max(r.left - e.clientX, e.clientX - r.right, 0);
          var dy = Math.max(r.top - e.clientY, e.clientY - r.bottom, 0);
          if (dx*dx + dy*dy < R*R) b.classList.add("on");
        }
      }, {passive:true});
    }
    if (reduce) bars.forEach(function(b){ b.classList.add("on"); });
  }

  /* ---- for whoever opened this ---- */
  var s = "R1JZREVFe2d1M19mMGhlcDNfMWZfbDBoZV9zMWVmZ19lM3BiYX0=";
  try {
    console.log("%c// you opened the console. good instinct.", "font-family:monospace;color:#e9e6df;font-size:13px");
    console.log("%c// there is a flag on this page. it is base64, then rot13.", "font-family:monospace;color:#9d9a92");
    console.log("%c" + s, "font-family:monospace;color:#85827a");
    console.log("%c// format is mine: TELQRR{ ... }. no tools needed, you know both steps.", "font-family:monospace;color:#9d9a92");
  } catch (e) {}
})();
