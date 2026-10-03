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

  /* ---- Product photo galleries: crossfade, swipe, arrow keys ---- */
  document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
    var main = gallery.querySelector(".gallery-main");
    var thumbs = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-thumb"));
    if (!main || !thumbs.length) return;
    var current = 0;
    var swapTimer = null;

    function show(index) {
      index = (index + thumbs.length) % thumbs.length;
      if (index === current) return;
      current = index;
      var src = thumbs[index].getAttribute("data-src");
      thumbs.forEach(function (thumb, i) {
        thumb.classList.toggle("is-active", i === index);
        thumb.setAttribute("aria-pressed", i === index ? "true" : "false");
      });

      /* fade out, swap once the new photo is ready, fade back in */
      var next = new Image();
      var swapped = false;
      function swap() {
        if (swapped || thumbs[current].getAttribute("data-src") !== src) return;
        swapped = true;
        main.src = src;
        main.classList.remove("is-swapping");
      }
      main.classList.add("is-swapping");
      window.clearTimeout(swapTimer);
      next.onload = next.onerror = function () { swapTimer = window.setTimeout(swap, 140); };
      next.src = src;
    }

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
