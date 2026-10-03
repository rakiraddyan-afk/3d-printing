(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Highlight the current page in the menu ---------- */
  var currentPage = document.documentElement.getAttribute("data-page") || "home";
  document.querySelectorAll("[data-page]").forEach(function (link) {
    if (link === document.documentElement) return;
    var isCurrent = link.getAttribute("data-page") === currentPage;
    link.classList.toggle("active", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "page");
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Animated stat counters ---------- */
  var statEls = document.querySelectorAll(".stat-num");

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimalTarget = el.getAttribute("data-decimal");
    var finalValue = decimalTarget ? parseFloat(decimalTarget) : target;
    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = finalValue * eased;

      el.textContent = decimalTarget ? current.toFixed(1) : Math.round(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = decimalTarget ? finalValue.toFixed(1) : finalValue;
      }
    }

    window.requestAnimationFrame(step);
  }

  if (statEls.length && "IntersectionObserver" in window) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statEls.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  /* ---------- Quote form validation ---------- */
  var form = document.getElementById("quoteForm");
  var formNote = document.getElementById("formNote");
  var submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  var validators = {
    name: function (value) {
      return value.trim().length >= 2 ? "" : window.i18n.t("validation.name");
    },
    email: function (value) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value.trim()) ? "" : window.i18n.t("validation.email");
    },
    carModel: function (value) {
      if (isSports()) return "";
      return value.trim().length >= 2 ? "" : window.i18n.t("validation.carModel");
    },
    phone: function (value) {
      var digits = value.replace(/\D/g, "");
      return digits.length >= 8 ? "" : window.i18n.t("validation.phone");
    },
    address: function (value) {
      return value.trim().length >= 10 ? "" : window.i18n.t("validation.address");
    },
    details: function (value) {
      return value.trim().length >= 10 ? "" : window.i18n.t("validation.details");
    }
  };

  /* ---------- Enquiry type (automotive / sports) ---------- */
  var categorySelect = form ? form.elements.category : null;

  function isSports() {
    return Boolean(categorySelect && categorySelect.value === "sports");
  }

  function setKey(el, attr, key) {
    if (!el) return;
    el.setAttribute(attr, key);
    if (attr === "data-i18n") el.textContent = window.i18n.t(key);
    else el.setAttribute("placeholder", window.i18n.t(key));
  }

  function applyCategory() {
    if (!form) return;
    var suffix = isSports() ? "Sports" : "";
    var carLabel = form.querySelector('label[for="carModel"]');
    var carInput = form.elements.carModel;
    var detailsLabel = form.querySelector('label[for="details"]');
    var detailsInput = form.elements.details;
    setKey(carLabel, "data-i18n", "form.carModel" + suffix);
    setKey(carInput, "data-i18n-placeholder", "form.carModelPlaceholder" + suffix);
    setKey(detailsLabel, "data-i18n", "form.details" + suffix);
    setKey(detailsInput, "data-i18n-placeholder", "form.detailsPlaceholder" + suffix);
    if (carInput) {
      carInput.required = !isSports();
      carInput.closest(".field").classList.remove("invalid");
      var err = document.getElementById("err-carModel");
      if (err) err.textContent = "";
    }
  }

  if (categorySelect) {
    var requestedType = new URLSearchParams(window.location.search).get("type");
    if (requestedType === "sports" || requestedType === "automotive") {
      categorySelect.value = requestedType;
    }
    categorySelect.addEventListener("change", applyCategory);
    applyCategory();
  }

  document.querySelectorAll("[data-category]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!categorySelect) return;
      categorySelect.value = link.getAttribute("data-category");
      applyCategory();
    });
  });

  if (form) {
    /* Pop-up shown only after the server confirms the request was received */
    var sentDialog = document.getElementById("quoteSent");
    var sentDetails = null;

    function fillSentBody() {
      if (!sentDialog || !sentDetails) return;
      document.getElementById("quoteSentBody").textContent = window.i18n.t("sent.body")
        .replace("{name}", sentDetails.name)
        .replace("{email}", sentDetails.email);
    }

    function showSentConfirmation(name, email) {
      if (!sentDialog || typeof sentDialog.showModal !== "function") return; /* the note under the form still confirms */
      sentDetails = { name: name, email: email };
      fillSentBody();
      if (!sentDialog.open) sentDialog.showModal();
      var closeBtn = document.getElementById("quoteSentClose");
      if (closeBtn) closeBtn.focus();
    }

    if (sentDialog) {
      document.getElementById("quoteSentClose").addEventListener("click", function () { sentDialog.close(); });
      sentDialog.addEventListener("click", function (event) {
        if (event.target === sentDialog) sentDialog.close(); /* click outside the card */
      });
      document.addEventListener("i18n:change", fillSentBody);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var isValid = true;

      Object.keys(validators).forEach(function (fieldName) {
        var input = form.elements[fieldName];
        var errorEl = document.getElementById("err-" + fieldName);
        var message = validators[fieldName](input.value);

        input.closest(".field").classList.toggle("invalid", Boolean(message));
        if (errorEl) errorEl.textContent = message;
        if (message) isValid = false;
      });

      if (!isValid) {
        formNote.textContent = window.i18n.t("form.errorNote");
        formNote.style.color = "#ff8080";
        return;
      }

      formNote.style.color = "";
      formNote.textContent = "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = window.i18n.t("form.sending");
      }

      fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          return response.text().then(function (raw) {
            var data = null;
            try {
              data = JSON.parse(raw);
            } catch (parseError) {
              /* non-JSON response (e.g. an upstream error page) — data stays null */
            }
            return { ok: response.ok, status: response.status, data: data, raw: raw };
          });
        })
        .then(function (result) {
          if (result.ok && result.data && result.data.success) {
            formNote.style.color = "";
            formNote.textContent = window.i18n.t("form.success");
            showSentConfirmation(form.elements.name.value.trim(), form.elements.email.value.trim());
            form.reset();
            applyCategory();
            form.querySelectorAll(".field").forEach(function (field) {
              field.classList.remove("invalid");
            });
          } else {
            window.console.error("Form submission failed", result.status, result.raw);
            formNote.style.color = "#ff8080";
            formNote.textContent =
              (result.data && result.data.message) || window.i18n.t("form.submitError");
          }
        })
        .catch(function (err) {
          window.console.error("Form submission network error", err);
          formNote.style.color = "#ff8080";
          formNote.textContent = window.i18n.t("form.submitError");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = window.i18n.t("form.submit");
          }
        });
    });

    Object.keys(validators).forEach(function (fieldName) {
      var input = form.elements[fieldName];
      if (!input) return;
      input.addEventListener("blur", function () {
        var errorEl = document.getElementById("err-" + fieldName);
        var message = validators[fieldName](input.value);
        input.closest(".field").classList.toggle("invalid", Boolean(message));
        if (errorEl) errorEl.textContent = message;
      });
    });
  }

  /* ---- Colour previews: repaint a black studio photo in another filament colour ----
     The product is the only dark thing in these photos, so dark pixels are the product.
     Its shading (layer lines, embossed text) is kept and mapped onto the chosen colour. */
  var recolorCache = {};
  function recolorPhoto(src, rgb) {
    if (!rgb) return Promise.resolve(src);
    var key = src + "|" + rgb.join(",");
    if (recolorCache[key]) return recolorCache[key];
    recolorCache[key] = new Promise(function (resolve) {
      var img = new Image();
      img.onerror = function () { resolve(src); };
      img.onload = function () {
        try {
          var canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var d = image.data;
          var n = d.length;
          var i, lum;

          /* median brightness of the product = its "normal" surface tone */
          var hist = new Uint32Array(256);
          var dark = 0;
          for (i = 0; i < n; i += 4) {
            lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
            if (lum < 66) { hist[lum | 0]++; dark++; }
          }
          var ref = 32;
          var seen = 0;
          for (i = 0; i < 256; i++) { seen += hist[i]; if (seen >= dark / 2) { ref = Math.max(i, 8); break; } }

          var cr = rgb[0] / 255, cg = rgb[1] / 255, cb = rgb[2] / 255;
          var colorLum = 0.2126 * cr + 0.7152 * cg + 0.0722 * cb;
          var floor = 0.30 + 0.40 * colorLum;
          var gloss = 0.30 - 0.12 * colorLum;
          var A = 0.42 * 255, B = 0.60 * 255;

          for (i = 0; i < n; i += 4) {
            lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
            if (lum >= B) continue; /* backdrop */
            var t = lum <= A ? 0 : (lum - A) / (B - A);
            var mask = 1 - t * t * (3 - 2 * t);
            var s = lum / ref;
            var k = floor + (1 - floor) * Math.pow(Math.min(s, 1), 0.9);
            var hi = (Math.min(Math.max(s - 1, 0), 2.5) / 2.5) * gloss;
            var r = cr * k, g = cg * k, b = cb * k;
            r += hi * (1 - r); g += hi * (1 - g); b += hi * (1 - b);
            d[i] = d[i] * (1 - mask) + r * 255 * mask;
            d[i + 1] = d[i + 1] * (1 - mask) + g * 255 * mask;
            d[i + 2] = d[i + 2] * (1 - mask) + b * 255 * mask;
          }
          ctx.putImageData(image, 0, 0);
          canvas.toBlob(function (blob) {
            resolve(blob ? URL.createObjectURL(blob) : src);
          }, "image/jpeg", 0.9);
        } catch (e) {
          resolve(src); /* keep the original photo if the browser refuses */
        }
      };
      img.src = src;
    });
    return recolorCache[key];
  }
  window.twoLifeRecolor = recolorPhoto;

  /* ---- Product photo galleries: crossfade, swipe, arrow keys, colour ---- */
  document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
    var main = gallery.querySelector(".gallery-main");
    var thumbs = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-thumb"));
    if (!main || !thumbs.length) return;
    var current = 0;
    var rgb = null; /* null = the original black photos */
    var request = 0;
    thumbs.forEach(function (thumb) {
      var img = thumb.querySelector("img");
      if (img) thumb.setAttribute("data-thumb-src", img.getAttribute("src"));
    });

    /* fade out, swap once the new photo is ready, fade back in */
    function paintMain() {
      var mine = ++request;
      main.classList.add("is-swapping");
      var started = Date.now();
      recolorPhoto(thumbs[current].getAttribute("data-src"), rgb).then(function (url) {
        var wait = Math.max(0, 140 - (Date.now() - started));
        window.setTimeout(function () {
          if (mine !== request) return;
          var loader = new Image();
          loader.onload = loader.onerror = function () {
            if (mine !== request) return;
            main.src = url;
            main.classList.remove("is-swapping");
          };
          loader.src = url;
        }, wait);
      });
    }

    function show(index) {
      index = (index + thumbs.length) % thumbs.length;
      if (index === current) return;
      current = index;
      thumbs.forEach(function (thumb, i) {
        thumb.classList.toggle("is-active", i === index);
        thumb.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
      paintMain();
    }

    /* colour chosen on the product card */
    gallery.addEventListener("colorchange", function (event) {
      var next = event.detail && event.detail.rgb ? event.detail.rgb : null;
      if (String(next) === String(rgb)) return;
      rgb = next;
      paintMain();
      thumbs.forEach(function (thumb) {
        var img = thumb.querySelector("img");
        if (!img) return;
        var wanted = rgb;
        recolorPhoto(thumb.getAttribute("data-thumb-src"), rgb).then(function (url) {
          if (wanted === rgb) img.src = url;
        });
      });
    });

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener("click", function () { show(index); });
      thumb.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        var target = (index + (event.key === "ArrowRight" ? 1 : -1) + thumbs.length) % thumbs.length;
        show(target);
        thumbs[target].focus();
      });
    });

    /* swipe the large photo on touch screens */
    var startX = null;
    var startY = null;
    main.addEventListener("touchstart", function (event) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    main.addEventListener("touchend", function (event) {
      if (startX === null) return;
      var dx = event.changedTouches[0].clientX - startX;
      var dy = event.changedTouches[0].clientY - startY;
      startX = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    /* fetch the other photos once the page is idle so switching is instant */
    function preload() {
      thumbs.forEach(function (thumb) { new Image().src = thumb.getAttribute("data-src"); });
    }
    function whenIdle() {
      if ("requestIdleCallback" in window) window.requestIdleCallback(preload, { timeout: 4000 });
      else window.setTimeout(preload, 1500);
    }
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle);
  });
})();
