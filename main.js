/* Shared script: header, footer, language toggle, WhatsApp helpers, shop & product rendering. */
const NAV = [ // [file, ar, en, showInHeader]
  ["index.html","الرئيسية","Home",1],["shop.html","المتجر","Shop",1],["iphone.html","آيفون","iPhones"],["android.html","أندرويد","Android"],["tablets.html","تابلت","Tablets"],["accessories.html","إكسسوارات","Accessories"],
  ["laptops.html","لابتوب","Laptops"],["repair.html","الصيانة","Repair",1],["book-repair.html","احجز صيانة","Book a repair"],["offers.html","العروض","Offers",1],["trade-in.html","استبدال موبايلك","Trade-in"],["live.html","البث المباشر","Live sales"],
  ["branch.html","فرعنا","Our branch"],["about.html","من نحن","About"],["reviews.html","آراء العملاء","Reviews"],["faq.html","أسئلة شائعة","FAQ"],["warranty.html","الضمان والاسترجاع","Warranty & returns"],["delivery.html","التوصيل","Delivery"],["compare.html","قارن موبايلات","Compare phones"],["guides.html","أدلة الشراء","Buying guides"],["privacy.html","الخصوصية","Privacy"],["terms.html","شروط الاستخدام","Terms"],["contact.html","تواصل معنا","Contact",1]];
let lang = "ar"; try { lang = localStorage.getItem("lang") || "ar"; } catch (e) {}
const L = o => o[lang] || o.en;
const wa = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const WA_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11 19.8L3 29l6.4-2A13 13 0 1 0 16 3zm6.6 18.2c-.3.8-1.7 1.5-2.3 1.6-.6.1-1.3.1-2.1-.1-.5-.2-1.200-.4-2-.8-3.600-1.600-5.900-5.200-6.100-5.400-.2-.2-1.400-1.900-1.400-3.600s.9-2.500 1.200-2.900c.3-.3.700-.4.900-.4h.6c.2 0 .5-.1.700.5l1 2.400c.1.200.1.400 0 .6l-.4.600-.5.600c-.2.200-.3.400-.1.700.2.300.9 1.500 2 2.400 1.400 1.200 2.500 1.600 2.900 1.800.3.200.5.100.7-.1l.9-1.100c.2-.3.500-.2.700-.1l2.300 1.100c.3.100.5.200.6.300.1.200.1.800-.2 1.600z"/></svg>';
const page = document.body.dataset.page;

function chrome() {
  const mk = a => a.map(n => `<a href="${n[0]}" class="${location.pathname.endsWith(n[0]) ? "on" : ""}" data-ar="${n[1]}" data-en="${n[2]}"></a>`).join("");
  const links = mk(NAV), CP = {iphone:"iphone",android:"android",tablet:"tablets",laptop:"laptops",accessory:"accessories"};
  const mega = `<div class="mega"><a href="shop.html" data-ar="المتجر" data-en="Shop"></a><div class="panel">${CATEGORIES.map(c => `<a href="${CP[c.id]}.html" data-ar="${c.ar}" data-en="${c.en}"></a>`).join("")}<a href="shop.html" data-ar="كل المنتجات" data-en="All products"></a></div></div>`;
  const hl = NAV.filter(n => n[3]).map(n => n[0] === "shop.html" ? mega : mk([n])).join("");
  document.body.insertAdjacentHTML("afterbegin", `
  <div id="ann" role="region"><span data-ar="${CONFIG.announcement.ar}" data-en="${CONFIG.announcement.en}"></span><button aria-label="Close" onclick="this.parentNode.remove()">×</button></div>
  <header class="site"><div class="nav">
    <a class="brand" href="index.html"><img src="logo.png" alt="Bab Alhara logo" width="46" height="46"><span data-ar="${CONFIG.name.ar}" data-en="${CONFIG.name.en}"></span></a>
    <nav class="main" id="nav" aria-label="Main">${hl}</nav>
    <div class="tools"><button class="lang" id="sBtn" aria-label="Search">🔍</button><a class="lang" href="cart.html" aria-label="Order list">🛒 <span class="cc num">0</span></a><button class="lang" id="langBtn" aria-label="Language"></button>
    <a class="btn btn-wa" href="${wa("")}"  data-ar="واتساب" data-en="WhatsApp"></a>
    <button id="burger" aria-label="Menu" aria-expanded="false">☰</button></div></div></div><div id="sbox" hidden><input id="sq" type="search" placeholder="Search / ابحث" aria-label="Search" style="width:100%"><div id="sres"></div></div></header>`);
  document.body.insertAdjacentHTML("beforeend", `
  <footer class="site"><div class="wrap"><div class="fgrid">
    <div><img src="logo.png" alt="" width="64" height="64" style="background:#fff;border-radius:50%;margin-bottom:10px"><p data-ar="موبايلك في إيدين أمينة" data-en="Your phone is in trusted hands"></p></div>
    <div><h3 data-ar="روابط" data-en="Links"></h3>${links}</div>
    <div><h3 data-ar="تواصل" data-en="Contact"></h3><a href="tel:${CONFIG.phone}" class="num" dir="ltr">${CONFIG.phone}</a><a href="${wa("")}">WhatsApp</a><a href="${CONFIG.tiktok}" target="_blank" rel="noopener">TikTok</a><a href="${CONFIG.facebook}" target="_blank" rel="noopener">Facebook</a><p data-ar="${CONFIG.address.ar}" data-en="${CONFIG.address.en}"></p></div>
    <div><h3 data-ar="مواعيد العمل" data-en="Hours"></h3>${CONFIG.hours.map(h => `<p><span data-ar="${h.ar}" data-en="${h.en}"></span><br><span class="num">${h.t}</span></p>`).join("")}</div>
  </div><p class="copy">© <span id="yr"></span> <span data-ar="${CONFIG.name.ar}" data-en="${CONFIG.name.en}"></span></p></div></footer>
  <a id="wa-float" href="${wa("")}" aria-label="WhatsApp">${WA_ICON}</a>`);
  document.getElementById("yr").textContent = new Date().getFullYear();
  document.getElementById("sBtn").onclick = () => { const b = document.getElementById("sbox"); b.hidden = !b.hidden; if (!b.hidden) document.getElementById("sq").focus(); };
  document.getElementById("sq").oninput = e => { const q = e.target.value.trim().toLowerCase();
    document.getElementById("sres").innerHTML = q ? PRODUCTS.filter(p => (p.name.en + p.brand).toLowerCase().includes(q)).slice(0, 8).map(p => `<a class="sr" href="product.html?id=${p.id}">${L(p.name)}</a>`).join("") || `<p>${T("لا نتائج", "No results")}</p>` : ""; };
  updCount();
  document.getElementById("burger").onclick = e => { const o = document.getElementById("nav").classList.toggle("open"); document.body.classList.toggle("lock", o); e.currentTarget.setAttribute("aria-expanded", o); };
  document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => { document.getElementById("nav").classList.remove("open"); document.body.classList.remove("lock"); }));
  document.getElementById("langBtn").onclick = () => { lang = lang === "ar" ? "en" : "ar"; try { localStorage.setItem("lang", lang); } catch (e) {} apply(); };
}
function apply() {
  document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-ar]").forEach(el => el.textContent = el.dataset[lang]);
  document.querySelectorAll("[data-ph-ar]").forEach(el => el.placeholder = el.dataset[lang === "ar" ? "phAr" : "phEn"]);
  document.getElementById("langBtn").textContent = lang === "ar" ? "EN" : "عربي";
  if (page === "cart") renderCart(); if (page === "compare") renderCompare(); if (page === "guides") renderGuides(); if (page === "guide") renderGuide(); if (page === "cat") renderCat(); if (page === "shop") renderShop(); if (page === "home") renderHome(); if (page === "product") renderProduct();
}
const T = (ar, en) => lang === "ar" ? ar : en;
const priceTxt = p => p.price ? `${p.price.toLocaleString("en-US")} ${T("ج.م", "EGP")}${p.demo ? ` <small class="todo">${T("سعر تجريبي", "demo price")}</small>` : ""}` : T("يبدأ من: [السعر]", "Starting from: [price]");
const cart = () => { try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch (e) { return []; } };
const saveCart = c => { try { localStorage.setItem("cart", JSON.stringify(c)); } catch (e) {} updCount(); };
function updCount() { document.querySelectorAll(".cc").forEach(e => e.textContent = cart().length); }
function addCart(id, b) { const c = cart(); if (!c.includes(id)) c.push(id); saveCart(c); if (b) { b.textContent = "✓ " + T("اتضاف", "Added"); } }
function rmCart(id) { saveCart(cart().filter(x => x !== id)); renderCart(); }
function renderCart() {
  const ids = cart(), items = ids.map(i => PRODUCTS.find(p => p.id === i)).filter(Boolean), el = document.getElementById("cartList");
  el.innerHTML = items.length ? items.map(p => `<div class="card row"><span>${L(p.name)}</span><button class="btn btn-o" onclick="rmCart('${p.id}')">${T("شيل", "Remove")}</button></div>`).join("") +
    `<br><a class="btn btn-wa" href="${wa(T("أهلاً، عايز أطلب:\n", "Hi, I'd like to order:\n") + items.map(p => "- " + L(p.name)).join("\n"))}">${T("ابعت الطلب على واتساب", "Send order on WhatsApp")}</a>` : `<p>${T("قائمة الطلب فاضية. تصفح المتجر وضيف منتجات.", "Your order list is empty. Browse the shop and add items.")}</p><a class="btn btn-p" href="shop.html">${T("المتجر", "Shop")}</a>`;
}
function card(p) {
  return `<article class="card"><div class="ph">${p.image ? `<img src="${p.image}" alt="${L(p.name)}" loading="lazy">` : T("صورة مؤقتة", "Placeholder image")}</div>
  ${p.condition ? `<span class="badge">${p.condition === "new" ? T("جديد", "New") : T("مستعمل", "Used")}</span>` : ""}
  <h3><a href="product.html?id=${p.id}">${L(p.name)}</a></h3><p class="price">${priceTxt(p)}</p>
  <div class="acts"><a class="btn btn-wa" href="${wa((T("أهلاً، عايز أسأل عن: ", "Hi, I'd like to ask about: ")) + L(p.name))}">${T("اسأل على واتساب", "Ask on WhatsApp")}</a><button class="btn btn-o" onclick="addCart('${p.id}',this)">${T("ضيف للطلب", "Add to order")}</button></div></article>`;
}
const CPAGE = { iphone: "iphone", android: "android", tablet: "tablets", laptop: "laptops", accessory: "accessories" };
function renderHome() {
  const pick = ks => ks.map(k => PRODUCTS.find(p => p.image.includes(k))).filter(Boolean);
  document.getElementById("featured").innerHTML = pick(["iphone-17-pro-max", "iphone-16-pro-black", "iphone-15-pro-max", "samsung-s26", "xiaomi-15-ultra", "ipad-pro", "laptop-mac", "earbuds-apple"]).map(card).join("");
  const tiles = PRODUCTS.filter(p => p.cat === "iphone").flatMap(p => p.gallery.map(g => ({ p, g, n: (p.name.en.match(/iPhone (\d+)/) || [])[1] })));
  const wall = document.getElementById("wall"), cur = window.wg || "";
  wall.innerHTML = tiles.filter(t => !cur || t.n === cur).map(t => `<a class="tile" href="product.html?id=${t.p.id}" title="${L(t.p.name)} ${t.g.name}"><img src="${t.g.src}" alt="${L(t.p.name)} ${t.g.name}" loading="lazy"></a>`).join("");
  const pl = document.getElementById("wallPills");
  pl.innerHTML = [["", T("الكل", "All")], ...["17", "16", "15", "14", "13", "12", "11"].map(n => [n, "iPhone " + n])].map(x => `<button class="pill ${cur === x[0] ? "on" : ""}" data-g="${x[0]}">${x[1]}</button>`).join("");
  pl.querySelectorAll("button").forEach(b => b.onclick = () => { window.wg = b.dataset.g; renderHome(); });
  const reps = { iphone: "iphone-17-pro-max-deep-blue", android: "samsung-s26-ultra", tablet: "ipad-pro", laptop: "laptop-mac-open", accessory: "earbuds-apple-buds" };
  document.getElementById("bento").innerHTML = CATEGORIES.map((c, i) => { const hit = PRODUCTS.flatMap(p => p.gallery).find(g => g.src.includes(reps[c.id])) || PRODUCTS.find(p => p.cat === c.id).gallery[0];
    return `<a class="bc b${i + 1}" href="${CPAGE[c.id]}.html"><b>${L(c)}</b><small>${PRODUCTS.filter(p => p.cat === c.id).length} ${T("منتج", "items")}</small><img src="${hit.src}" alt="${L(c)}" loading="lazy"></a>`; }).join("");
}
function initFx() {
  document.documentElement.classList.add("js");
  const nav = document.querySelector(".nav"), root = document.documentElement.style;
  const onScroll = () => { nav.classList.toggle("s", scrollY > 20); root.setProperty("--sc", Math.min(scrollY / innerHeight, 1.2).toFixed(3)); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const st = document.querySelector(".stage");
  if (st) { st.addEventListener("pointermove", e => { const r = st.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      st.style.setProperty("--ry", (x * 26).toFixed(1) + "deg"); st.style.setProperty("--rx", (-y * 18).toFixed(1) + "deg"); st.style.setProperty("--px", x.toFixed(2)); st.style.setProperty("--py", y.toFixed(2)); });
    st.addEventListener("pointerleave", () => ["--ry", "--rx"].forEach(k => st.style.setProperty(k, "0deg"))); }
  const sel = page === "home" ? ".rv" : "main .wrap > *";
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .01, rootMargin: "0px 0px -4% 0px" });
  document.querySelectorAll(sel).forEach((el, i) => { el.classList.add("rv"); el.style.setProperty("--d", (i % 4) * .08 + "s"); io.observe(el); });
}
function renderShop() {
  const f = document.getElementById("filters"), q = id => (document.getElementById(id) || {}).value || "";
  if (!f.dataset.built) {
    const brands = [...new Set(PRODUCTS.map(p => p.brand))];
    f.innerHTML = `<select id="fc" aria-label="Category"></select><select id="fb" aria-label="Brand"></select><select id="fa" aria-label="Availability"></select><select id="fs" aria-label="Sort"></select><input id="pmin" type="number" min="0" placeholder="Min EGP" aria-label="Min price" style="width:110px"><input id="pmax" type="number" min="0" placeholder="Max EGP" aria-label="Max price" style="width:110px">`;
    f.dataset.built = 1; f.dataset.brands = JSON.stringify(brands);
    f.querySelectorAll("select").forEach(s => s.onchange = renderShop); f.querySelectorAll("input").forEach(s => s.oninput = renderShop);
  }
  const keep = ["fc", "fb", "fa", "fs"].map(q), brands = JSON.parse(f.dataset.brands);
  const fill = (id, opts, i) => { const s = document.getElementById(id); s.innerHTML = opts.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(""); s.value = keep[i]; };
  fill("fc", [["", T("كل الفئات", "All categories")], ...CATEGORIES.map(c => [c.id, L(c)])], 0);
  fill("fb", [["", T("كل الماركات", "All brands")], ...brands.map(b => [b, b])], 1);
  fill("fa", [["", T("الكل", "Any availability")], ["1", T("متاح", "In stock")], ["0", T("غير متاح", "Out of stock")]], 2);
  fill("fs", [["", T("ترتيب", "Sort")], ["n", T("بالاسم", "Name")], ["p", T("السعر", "Price")]], 3);
  let list = PRODUCTS.filter(p => (!keep[0] || p.cat === keep[0]) && (!keep[1] || p.brand === keep[1]) && (!keep[2] || String(+p.available) === keep[2]) && (p.price == null || ((!q("pmin") || p.price >= +q("pmin")) && (!q("pmax") || p.price <= +q("pmax")))));
  if (keep[3] === "n") list.sort((a, b) => L(a.name).localeCompare(L(b.name)));
  if (keep[3] === "p") list.sort((a, b) => (a.price || 1e9) - (b.price || 1e9)); // OWNER: add a price range filter once prices are real
  document.getElementById("grid").innerHTML = list.map(card).join("") || `<p>${T("لا نتائج", "No results")}</p>`;
}
function renderProduct() {
  const p = PRODUCTS.find(x => x.id === new URLSearchParams(location.search).get("id")) || PRODUCTS[0];
  const opt = (a, n) => a.length ? `<div class="field"><label>${n}</label><select>${a.map(o => `<option>${o}</option>`).join("")}</select></div>` : "";
  document.getElementById("pd").innerHTML = `<div class="split"><div><div class="ph" style="aspect-ratio:1"><img id="mainImg" src="${p.image}" alt="${L(p.name)}"></div><div class="thumbs">${(p.gallery || []).length > 1 ? p.gallery.map(g => `<button class="thumb" title="${g.name}" onclick="document.getElementById('mainImg').src='${g.src}'"><img src="${g.src}" alt="${g.name}" loading="lazy"></button>`).join("") : ""}</div></div>
  <div><h1>${L(p.name)}</h1><p class="price">${priceTxt(p)}</p><p>${p.condition ? `<span class="badge">${p.condition === "new" ? T("جديد", "New") : T("مستعمل", "Used")}</span>` : ""} ${p.condition ? "· " : ""}${p.available ? T("متاح", "In stock") : T("غير متاح", "Out of stock")}</p><br>
  ${opt(p.storage, T("السعة", "Storage"))}
  <p>${T("الضمان", "Warranty")}: <span class="todo">${p.warranty}</span></p><br>
  <a class="btn btn-wa" href="${wa(T("أهلاً، عايز أسأل عن: ", "Hi, I'd like to ask about: ") + L(p.name))}">${T("اسأل على واتساب", "Ask on WhatsApp")}</a> <button class="btn btn-o" onclick="addCart('${p.id}',this)">${T("ضيف للطلب", "Add to order")}</button> <a class="btn btn-o" href="compare.html?a=${p.id}">${T("قارن", "Compare")}</a></div></div>
  <h2 style="margin-top:32px">${T("المواصفات", "Specs")}</h2><table>${Object.entries(p.specs).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}</table>
  <h2 style="margin-top:32px">${T("منتجات مشابهة", "Related products")}</h2><div class="grid">${PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).map(card).join("")}</div>`;
  document.title = L(p.name) + " | " + L(CONFIG.name);
}
function renderCompare() {
  const box = document.getElementById("cmp"), q = new URLSearchParams(location.search).get("a");
  if (!box.dataset.b) { box.dataset.b = 1; box.innerHTML = `<div class="filters">${[0, 1, 2].map(i => `<select id="c${i}" aria-label="Phone ${i + 1}"></select>`).join("")}</div><div style="overflow-x:auto" id="ct"></div>`;
    box.querySelectorAll("select").forEach(s => s.onchange = renderCompare); if (q) window.c0v = q; }
  const phones = PRODUCTS.filter(p => ["iphone", "android", "tablet"].includes(p.cat)), val = i => document.getElementById("c" + i).value || (i === 0 && window.c0v) || "";
  const vs = [0, 1, 2].map(val);
  [0, 1, 2].forEach(i => { const s = document.getElementById("c" + i); s.innerHTML = `<option value="">${T("اختار موديل", "Choose a model")}</option>` + phones.map(p => `<option value="${p.id}">${L(p.name)}</option>`).join(""); s.value = vs[i]; });
  const sel = vs.map(v => PRODUCTS.find(p => p.id === v)).filter(Boolean);
  if (!sel.length) { document.getElementById("ct").innerHTML = `<p>${T("اختار لحد ٣ موديلات للمقارنة.", "Choose up to 3 models to compare.")}</p>`; return; }
  const keys = [...new Set(sel.flatMap(p => Object.keys(p.specs)))];
  const row = (k, f) => `<tr><th>${k}</th>${sel.map(p => `<td>${f(p)}</td>`).join("")}</tr>`;
  document.getElementById("ct").innerHTML = `<table><tr><th></th>${sel.map(p => `<th><a href="product.html?id=${p.id}">${L(p.name)}</a></th>`).join("")}</tr>` +
    row(T("الماركة", "Brand"), p => p.brand) + row(T("السعر", "Price"), priceTxt) + row(T("الحالة", "Condition"), p => p.condition || "[?]") + row(T("الألوان", "Colors"), p => p.colors.join(", ") || "-") + keys.map(k => row(k, p => p.specs[k] || "-")).join("") + "</table>";
}
const GBY = id => GUIDES.find(g => g.id === id) || GUIDES[0];
function renderGuides() { document.getElementById("gl").innerHTML = GUIDES.map(g => `<a class="card" href="guide.html?id=${g.id}"><h3>${L(g.title)}</h3><p>${L(g.intro)}</p></a>`).join(""); }
function renderGuide() { const g = GBY(new URLSearchParams(location.search).get("id")); document.title = L(g.title) + " | " + L(CONFIG.name);
  document.getElementById("ga").innerHTML = `<h1>${L(g.title)}</h1><br>` + L(g.body).map(t => `<p style="margin-bottom:14px;max-width:62ch">${t}</p>`).join("") + `<a class="btn btn-p" href="guides.html">${T("كل الأدلة", "All guides")}</a>`; }
function carousel() { const c = document.getElementById("car"); if (!c) return;
  document.getElementById("prev").onclick = () => c.scrollBy({ left: -c.clientWidth * (lang === "ar" ? -1 : 1) * .8, behavior: "smooth" });
  document.getElementById("next").onclick = () => c.scrollBy({ left: c.clientWidth * (lang === "ar" ? -1 : 1) * .8, behavior: "smooth" }); }
function renderCat() {
  const c = document.body.dataset.cat, el = document.getElementById("grid");
  const all = PRODUCTS.filter(p => p.cat === c), tabs = document.getElementById("tabs");
  if (tabs) { const subs = [["", T("الكل", "All")], ["cases", T("جرابات", "Cases")], ["earbuds", T("سماعات أذن", "Earbuds")], ["headsets", T("هيدسيت", "Headsets")], ["watches", T("ساعات ذكية", "Smartwatches")]];
    tabs.innerHTML = subs.map(s => `<button class="btn ${(window.sub || "") === s[0] ? "btn-p" : "btn-o"}" data-s="${s[0]}">${s[1]}</button>`).join("");
    tabs.querySelectorAll("button").forEach(b => b.onclick = () => { window.sub = b.dataset.s; renderCat(); }); }
  const list = all.filter(p => !window.sub || p.sub === window.sub);
  el.innerHTML = list.map(card).join("") || `<p>${T("المنتجات قريباً", "Products coming soon")}</p>`;
}
function waForms() {
  document.querySelectorAll("form.wf").forEach(f => f.onsubmit = e => { e.preventDefault();
    const lines = [...f.querySelectorAll("input,select,textarea")].map(i => `${i.labels[0].textContent}: ${i.value}`);
    location.href = wa(`${f.dataset.title}\n` + lines.join("\n")); });
}
function contactForm() {
  const f = document.getElementById("cf"); if (!f) return;
  f.onsubmit = e => { e.preventDefault(); const d = new FormData(f);
    location.href = wa(`${T("الاسم", "Name")}: ${d.get("n")}\n${T("الهاتف", "Phone")}: ${d.get("p")}\n${T("الرسالة", "Message")}: ${d.get("m")}`); };
}
chrome(); apply(); contactForm(); waForms(); carousel();
initFx();
