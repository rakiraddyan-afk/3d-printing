/* 2LIFE shop: cart stored in the browser, checkout sent as a WhatsApp order. */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "6281615555777";
  var STORAGE_KEY = "2life-cart";
  var MAX_QTY = 999;

  /* Prices are the "starting from" per-piece prices in the 2026 catalogue (IDR). */
  var PRODUCTS = {
    "racket-indoor":  { anchor: "racket-holder", name: "sports.p1.title", variant: "shop.variant.indoor",  price: 65000,  img: "img/sports/indoor-racket-holder-1.jpg" },
    "racket-outdoor": { anchor: "racket-holder", name: "sports.p1.title", variant: "shop.variant.outdoor", price: 80000,  img: "img/sports/indoor-racket-holder-1.jpg" },
    "bag-indoor":     { anchor: "bag-holder", name: "sports.p3.title", variant: "shop.variant.indoor",  price: 35000,  img: "img/sports/bag-holder-1.jpg" },
    "bag-outdoor":    { anchor: "bag-holder", name: "sports.p3.title", variant: "shop.variant.outdoor", price: 50000,  img: "img/sports/bag-holder-1.jpg" },
    "phone-indoor":   { anchor: "phone-holder", name: "sports.p4.title", variant: "shop.variant.indoor",  price: 150000, img: "img/sports/phone-holder-1.jpg" },
    "phone-outdoor":  { anchor: "phone-holder", name: "sports.p4.title", variant: "shop.variant.outdoor", price: 175000, img: "img/sports/phone-holder-1.jpg" },
    "ball-dispenser": { anchor: "ball-dispenser", name: "sports.p5.title", price: 180000, img: "img/sports/ball-dispenser-1.jpg" }
  };

  /* Filament colours offered. "black" is the photographed colour; the rest are digital previews. */
  var COLORS = [
    { id: "black",  rgb: null,            swatch: "#1f2022" },
    { id: "white",  rgb: [238, 238, 234], swatch: "#eeeeea" },
    { id: "grey",   rgb: [140, 144, 150], swatch: "#8c9096" },
    { id: "blue",   rgb: [28, 84, 180],   swatch: "#1c54b4" },
    { id: "red",    rgb: [196, 38, 40],   swatch: "#c42628" },
    { id: "orange", rgb: [240, 110, 26],  swatch: "#f06e1a" }
  ];
  function colorById(id) {
    return COLORS.filter(function (color) { return color.id === id; })[0] || COLORS[0];
  }

  function t(key) {
    return window.i18n ? window.i18n.t(key) : key;
  }

  function rupiah(amount) {
    return "Rp " + String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function optionsLabel(item) {
    var product = PRODUCTS[item.id];
    var parts = [];
    if (product.variant) parts.push(t(product.variant));
    parts.push(t("shop.color." + colorById(item.color).id));
    return parts.join(", ");
  }

  function productLabel(item) {
    return t(PRODUCTS[item.id].name) + " (" + optionsLabel(item) + ")";
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
      .map(function (item) { return { id: item.id, color: colorById(item.color).id, qty: clampQty(item.qty) }; });
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

  function sameLine(item, id, color) {
    return item.id === id && item.color === color;
  }

  function addToCart(id, color, qty) {
    var items = readCart();
    var existing = items.filter(function (item) { return sameLine(item, id, color); })[0];
    if (existing) existing.qty = clampQty(existing.qty + qty);
    else items.push({ id: id, color: color, qty: clampQty(qty) });
    writeCart(items);
  }

  function setQty(id, color, qty) {
    var items = readCart();
    items.forEach(function (item) { if (sameLine(item, id, color)) item.qty = clampQty(qty); });
    writeCart(items);
  }

  function removeFromCart(id, color) {
    writeCart(readCart().filter(function (item) { return !sameLine(item, id, color); }));
  }

  function cartCount(items) {
    return items.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function cartSubtotal(items) {
    return items.reduce(function (sum, item) { return sum + PRODUCTS[item.id].price * item.qty; }, 0);
  }

  var lastCount = null;
  function updateCount() {
    var count = cartCount(readCart());
    var grew = lastCount !== null && count > lastCount;
    lastCount = count;
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
      if (grew) {
        el.classList.remove("is-popping");
        void el.offsetWidth; /* restart the animation */
        el.classList.add("is-popping");
      }
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
          if (amount.textContent !== rupiah(PRODUCTS[id].price)) {
            amount.textContent = rupiah(PRODUCTS[id].price);
            amount.classList.remove("is-ticking");
            void amount.offsetWidth; /* restart the animation */
            amount.classList.add("is-ticking");
          }
          group.setAttribute("data-active", String(ids.indexOf(id)));
          buttons.forEach(function (button, index) {
            var active = ids[index] === id;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-checked", active ? "true" : "false");
          });
        };
        choose(selected);
        block.appendChild(group);
      }

      var colorId = colorById(block.getAttribute("data-color")).id;
      var gallery = block.parentNode.querySelector("[data-gallery]");
      var colorLabel = el("p", "buy-color-label");
      var swatches = el("div", "swatches");
      swatches.setAttribute("role", "radiogroup");
      swatches.setAttribute("aria-label", t("shop.color"));
      var swatchButtons = COLORS.map(function (color) {
        var swatch = el("button", "swatch");
        swatch.type = "button";
        swatch.style.backgroundColor = color.swatch;
        swatch.setAttribute("role", "radio");
        swatch.setAttribute("aria-label", t("shop.color." + color.id));
        swatch.title = t("shop.color." + color.id);
        swatch.addEventListener("click", function () { chooseColor(color.id, true); });
        swatches.appendChild(swatch);
        return swatch;
      });
      var chooseColor = function (id, repaint) {
        colorId = id;
        block.setAttribute("data-color", id);
        colorLabel.textContent = t("shop.color") + ": " + t("shop.color." + id) + (id === "black" ? "" : " (" + t("shop.colorPreview") + ")");
        swatchButtons.forEach(function (swatch, index) {
          var active = COLORS[index].id === id;
          swatch.classList.toggle("is-active", active);
          swatch.setAttribute("aria-checked", active ? "true" : "false");
        });
        if (repaint && gallery) gallery.dispatchEvent(new CustomEvent("colorchange", { detail: { rgb: colorById(id).rgb } }));
      };
      chooseColor(colorId, false);
      block.appendChild(colorLabel);
      block.appendChild(swatches);

      var row = el("div", "buy-row");
      var stepper = qtyStepper(1);
      var addBtn = el("button", "btn btn-primary btn-sm buy-add", t("shop.add"));
      addBtn.type = "button";
      addBtn.addEventListener("click", function () {
        addToCart(current, colorId, stepper.getValue());
        showToast(productLabel({ id: current, color: colorId }) + " x " + stepper.getValue());
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
      var nameEl = el("h3", "cart-item-name");
      var nameLink = el("a", "", t(product.name));
      nameLink.href = "sports.html#" + product.anchor;
      nameEl.appendChild(nameLink);
      info.appendChild(nameEl);
      info.appendChild(el("p", "cart-item-variant", optionsLabel(item)));
      if (colorById(item.color).rgb && window.twoLifeRecolor) {
        window.twoLifeRecolor(product.img, colorById(item.color).rgb).then(function (url) { img.src = url; });
      }
      info.appendChild(el("p", "cart-item-unit", rupiah(product.price) + " " + t("shop.perPiece")));
      row.appendChild(info);

      var controls = el("div", "cart-item-controls");
      var lineTotal = el("p", "cart-item-total", rupiah(product.price * item.qty));
      controls.appendChild(qtyStepper(item.qty, function (qty) {
        /* update the numbers in place so the list does not jump */
        setQty(item.id, item.color, qty);
        lineTotal.textContent = rupiah(product.price * qty);
        updateSubtotal();
      }));
      controls.appendChild(lineTotal);
      var remove = el("button", "cart-item-remove", t("shop.remove"));
      remove.type = "button";
      remove.setAttribute("aria-label", t("shop.remove") + ": " + productLabel(item));
      remove.addEventListener("click", function () {
        removeFromCart(item.id, item.color);
        updateSubtotal();
        row.style.height = row.offsetHeight + "px";
        void row.offsetHeight;
        row.classList.add("is-leaving");
        window.setTimeout(renderCart, 260);
      });
      controls.appendChild(remove);
      row.appendChild(controls);

      list.appendChild(row);
    });

    updateSubtotal();
  }

  function updateSubtotal() {
    var subtotal = document.getElementById("cartSubtotal");
    if (subtotal) subtotal.textContent = rupiah(cartSubtotal(readCart()));
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
      lines.push((index + 1) + ". " + productLabel(item) + " x " + item.qty + " = " + rupiah(product.price * item.qty));
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

    /* remember delivery details on this device so a repeat order is quicker */
    var DETAILS_KEY = "2life-order-details";
    var detailFields = ["name", "phone", "address", "city", "postal"];
    try {
      var saved = JSON.parse(window.localStorage.getItem(DETAILS_KEY) || "{}");
      detailFields.forEach(function (fieldName) {
        if (typeof saved[fieldName] === "string" && !form.elements[fieldName].value) form.elements[fieldName].value = saved[fieldName];
      });
    } catch (e) { /* nothing saved, or storage unavailable */ }
    function saveDetails() {
      var details = {};
      detailFields.forEach(function (fieldName) { details[fieldName] = form.elements[fieldName].value; });
      try { window.localStorage.setItem(DETAILS_KEY, JSON.stringify(details)); } catch (e) { /* ignore */ }
    }
    form.addEventListener("input", saveDetails);

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
