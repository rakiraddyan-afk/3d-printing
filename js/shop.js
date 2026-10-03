/* 2LIFE shop: cart stored in the browser, checkout sent as a WhatsApp order. */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "6281615555777";
  var STORAGE_KEY = "2life-cart";
  var MAX_QTY = 999;

  /* Prices are the "starting from" per-piece prices in the 2026 catalogue (IDR). */
  var PRODUCTS = {
    "racket-indoor":  { name: "sports.p1.title", price: 65000,  img: "img/sports/indoor-racket-holder-1.jpg" },
    "racket-outdoor": { name: "sports.p2.title", price: 80000,  img: "img/sports/racket-holder-court.jpg" },
    "bag-indoor":     { name: "sports.p3.title", variant: "shop.variant.indoor",  price: 35000,  img: "img/sports/bag-holder-1.jpg" },
    "bag-outdoor":    { name: "sports.p3.title", variant: "shop.variant.outdoor", price: 50000,  img: "img/sports/bag-holder-1.jpg" },
    "phone-indoor":   { name: "sports.p4.title", variant: "shop.variant.indoor",  price: 150000, img: "img/sports/phone-holder.jpg" },
    "phone-outdoor":  { name: "sports.p4.title", variant: "shop.variant.outdoor", price: 175000, img: "img/sports/phone-holder.jpg" },
    "ball-dispenser": { name: "sports.p5.title", price: 180000, img: "img/sports/ball-dispenser-1.jpg" }
  };

  function t(key) {
    return window.i18n ? window.i18n.t(key) : key;
  }

  function rupiah(amount) {
    return "Rp " + String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function productLabel(id) {
    var product = PRODUCTS[id];
    return t(product.name) + (product.variant ? " (" + t(product.variant) + ")" : "");
  }

  function clampQty(value) {
    var qty = parseInt(value, 10);
    if (isNaN(qty) || qty < 1) return 1;
    return Math.min(qty, MAX_QTY);
  }

  /* ---------- Cart storage ---------- */
  var memoryCart = [];

  function readCart() {
    var items = memoryCart;
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) items = JSON.parse(raw);
    } catch (e) {
      /* storage unavailable or corrupt: fall back to this page's memory */
    }
    if (!Array.isArray(items)) return [];
    return items
      .filter(function (item) { return item && PRODUCTS[item.id]; })
      .map(function (item) { return { id: item.id, qty: clampQty(item.qty) }; });
  }

  function writeCart(items) {
    memoryCart = items;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      /* cart still works for this page view */
    }
    updateCount();
  }

  function addToCart(id, qty) {
    var items = readCart();
    var existing = items.filter(function (item) { return item.id === id; })[0];
    if (existing) existing.qty = clampQty(existing.qty + qty);
    else items.push({ id: id, qty: clampQty(qty) });
    writeCart(items);
  }

  function setQty(id, qty) {
    var items = readCart();
    items.forEach(function (item) { if (item.id === id) item.qty = clampQty(qty); });
    writeCart(items);
  }

  function removeFromCart(id) {
    writeCart(readCart().filter(function (item) { return item.id !== id; }));
  }

  function cartCount(items) {
    return items.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function cartSubtotal(items) {
    return items.reduce(function (sum, item) { return sum + PRODUCTS[item.id].price * item.qty; }, 0);
  }

  function updateCount() {
    var count = cartCount(readCart());
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }

  /* ---------- Small DOM helpers ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function qtyStepper(value, onChange) {
    var wrap = el("div", "qty");
    var minus = el("button", "qty-btn", "−");
    var input = el("input", "qty-input");
    var plus = el("button", "qty-btn", "+");
    minus.type = "button";
    plus.type = "button";
    minus.setAttribute("aria-label", t("shop.qtyLess"));
    plus.setAttribute("aria-label", t("shop.qtyMore"));
    input.type = "number";
    input.min = "1";
    input.max = String(MAX_QTY);
    input.inputMode = "numeric";
    input.value = value;
    input.setAttribute("aria-label", t("shop.qty"));

    function commit(next) {
      input.value = clampQty(next);
      if (onChange) onChange(clampQty(next));
    }
    minus.addEventListener("click", function () { commit(clampQty(input.value) - 1); });
    plus.addEventListener("click", function () { commit(clampQty(input.value) + 1); });
    input.addEventListener("change", function () { commit(input.value); });

    wrap.appendChild(minus);
    wrap.appendChild(input);
    wrap.appendChild(plus);
    wrap.getValue = function () { return clampQty(input.value); };
    return wrap;
  }

  /* ---------- "Added to cart" confirmation with a link to the cart ---------- */
  var toastTimer = null;
  function showToast(label) {
    var toast = document.getElementById("cartToast");
    if (!toast) {
      toast = el("div", "cart-toast");
      toast.id = "cartToast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = "";
    toast.appendChild(el("span", "", t("shop.toast.added") + " " + label));
    var link = el("a", "cart-toast-link", t("shop.viewCart"));
    link.href = "cart.html";
    toast.appendChild(link);
    toast.classList.add("is-open");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove("is-open"); }, 5000);
  }

  /* ---------- Product cards: price, quantity, add to cart ---------- */
  function renderBuyBlocks() {
    document.querySelectorAll("[data-buy]").forEach(function (block) {
      var ids = block.getAttribute("data-buy").split(",").filter(function (id) { return PRODUCTS[id]; });
      if (!ids.length) return;
      var selected = block.getAttribute("data-selected");
      if (ids.indexOf(selected) === -1) selected = ids[0];
      block.textContent = "";

      var price = el("p", "buy-price");
      var amount = el("strong", "", rupiah(PRODUCTS[selected].price));
      price.appendChild(el("span", "", t("shop.from") + " "));
      price.appendChild(amount);
      price.appendChild(el("span", "", " " + t("shop.perPiece")));
      block.appendChild(price);

      var current = selected;
      if (ids.length > 1) {
        var group = el("div", "seg");
        group.setAttribute("role", "radiogroup");
        group.setAttribute("aria-label", t("shop.version"));
        var buttons = ids.map(function (id) {
          var button = el("button", "seg-btn", t(PRODUCTS[id].variant));
          button.type = "button";
          button.setAttribute("role", "radio");
          button.addEventListener("click", function () { choose(id); });
          group.appendChild(button);
          return button;
        });
        var choose = function (id) {
          current = id;
          block.setAttribute("data-selected", id);
          amount.textContent = rupiah(PRODUCTS[id].price);
          buttons.forEach(function (button, index) {
            var active = ids[index] === id;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-checked", active ? "true" : "false");
          });
        };
        choose(selected);
        block.appendChild(group);
      }

      var row = el("div", "buy-row");
      var stepper = qtyStepper(1);
      var addBtn = el("button", "btn btn-primary btn-sm buy-add", t("shop.add"));
      addBtn.type = "button";
      addBtn.addEventListener("click", function () {
        addToCart(current, stepper.getValue());
        showToast(productLabel(current) + " x " + stepper.getValue());
        addBtn.textContent = t("shop.added");
        addBtn.classList.add("is-added");
        window.setTimeout(function () {
          addBtn.textContent = t("shop.add");
          addBtn.classList.remove("is-added");
        }, 1600);
      });
      row.appendChild(stepper);
      row.appendChild(addBtn);
      block.appendChild(row);
    });
  }

  /* ---------- Cart page ---------- */
  function renderCart() {
    var list = document.getElementById("cartItems");
    if (!list) return;
    var items = readCart();
    var empty = document.getElementById("cartEmpty");
    var filled = document.querySelectorAll("[data-cart-filled]");

    if (empty) empty.hidden = items.length > 0;
    filled.forEach(function (node) { node.hidden = items.length === 0; });
    list.textContent = "";

    items.forEach(function (item) {
      var product = PRODUCTS[item.id];
      var row = el("li", "cart-item");

      var img = el("img", "cart-item-img");
      img.src = product.img;
      img.alt = "";
      img.width = 96;
      img.height = 72;
      row.appendChild(img);

      var info = el("div", "cart-item-info");
      info.appendChild(el("h3", "cart-item-name", t(product.name)));
      if (product.variant) info.appendChild(el("p", "cart-item-variant", t(product.variant)));
      info.appendChild(el("p", "cart-item-unit", rupiah(product.price) + " " + t("shop.perPiece")));
      row.appendChild(info);

      var controls = el("div", "cart-item-controls");
      controls.appendChild(qtyStepper(item.qty, function (qty) {
        setQty(item.id, qty);
        renderCart();
      }));
      controls.appendChild(el("p", "cart-item-total", rupiah(product.price * item.qty)));
      var remove = el("button", "cart-item-remove", t("shop.remove"));
      remove.type = "button";
      remove.setAttribute("aria-label", t("shop.remove") + ": " + productLabel(item.id));
      remove.addEventListener("click", function () {
        removeFromCart(item.id);
        renderCart();
      });
      controls.appendChild(remove);
      row.appendChild(controls);

      list.appendChild(row);
    });

    var subtotal = document.getElementById("cartSubtotal");
    if (subtotal) subtotal.textContent = rupiah(cartSubtotal(items));
  }

  /* ---------- Checkout: build the WhatsApp order message ---------- */
  var validators = {
    name: function (value) { return value.trim().length >= 2 ? "" : t("validation.name"); },
    phone: function (value) { return value.replace(/\D/g, "").length >= 8 ? "" : t("validation.phone"); },
    address: function (value) { return value.trim().length >= 8 ? "" : t("validation.address"); },
    city: function (value) { return value.trim().length >= 2 ? "" : t("shop.validation.city"); },
    postal: function (value) { return value.trim().length >= 3 ? "" : t("shop.validation.postal"); }
  };

  function orderMessage(items, form) {
    var lines = [t("shop.msg.hello"), ""];
    items.forEach(function (item, index) {
      var product = PRODUCTS[item.id];
      lines.push((index + 1) + ". " + productLabel(item.id) + " x " + item.qty + " = " + rupiah(product.price * item.qty));
    });
    lines.push("");
    lines.push(t("shop.subtotal") + ": " + rupiah(cartSubtotal(items)));
    lines.push(t("shop.msg.shipping"));
    lines.push("");
    lines.push(t("form.name") + ": " + form.elements.name.value.trim());
    lines.push(t("form.phone") + ": " + form.elements.phone.value.trim());
    lines.push(t("shop.field.address") + ": " + form.elements.address.value.trim());
    lines.push(t("shop.field.city") + ": " + form.elements.city.value.trim());
    lines.push(t("shop.field.postal") + ": " + form.elements.postal.value.trim());
    var notes = form.elements.notes.value.trim();
    if (notes) lines.push(t("shop.msg.notes") + ": " + notes);
    return lines.join("\n");
  }

  function setupCheckout() {
    var form = document.getElementById("orderForm");
    if (!form) return;
    var note = document.getElementById("orderNote");

    function validateField(fieldName) {
      var input = form.elements[fieldName];
      var message = validators[fieldName](input.value);
      var errorEl = document.getElementById("err-" + fieldName);
      input.closest(".field").classList.toggle("invalid", Boolean(message));
      input.setAttribute("aria-invalid", message ? "true" : "false");
      if (errorEl) errorEl.textContent = message;
      return !message;
    }

    Object.keys(validators).forEach(function (fieldName) {
      form.elements[fieldName].addEventListener("blur", function () { validateField(fieldName); });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var items = readCart();
      if (!items.length) return;

      var firstInvalid = null;
      Object.keys(validators).forEach(function (fieldName) {
        if (!validateField(fieldName) && !firstInvalid) firstInvalid = form.elements[fieldName];
      });
      if (firstInvalid) {
        note.textContent = t("form.errorNote");
        firstInvalid.focus();
        return;
      }

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(orderMessage(items, form));
      var opened = window.open(url, "_blank");
      if (opened) opened.opener = null;
      note.textContent = "";
      note.appendChild(document.createTextNode(t("shop.sent") + " "));
      var link = el("a", "", t("shop.sentLink"));
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      note.appendChild(link);
      if (!opened) window.location.href = url; /* pop-up blocked: open WhatsApp in this tab */
    });

    var clear = document.getElementById("cartClear");
    if (clear) {
      clear.addEventListener("click", function () {
        writeCart([]);
        renderCart();
      });
    }
  }

  function renderAll() {
    renderBuyBlocks();
    renderCart();
    updateCount();
  }

  renderAll();
  setupCheckout();
  document.addEventListener("i18n:change", renderAll);
  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY) renderAll();
  });
})();
