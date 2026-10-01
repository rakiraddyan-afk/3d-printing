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

  /* ---------- Header shadow once the page is scrolled ---------- */
  var header = document.querySelector(".site-header");
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Stagger siblings so cards in a row arrive one after another */
  revealEls.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList.contains("reveal");
    });
    el.style.setProperty("--stagger", Math.min(siblings.indexOf(el), 6));
  });

  /* After an element has arrived, drop the delay so hover effects feel instant */
  function markRevealDone(el) {
    var stagger = parseFloat(el.style.getPropertyValue("--stagger")) || 0;
    window.setTimeout(function () {
      el.classList.add("reveal-done");
    }, reduceMotion ? 0 : 800 + stagger * 80);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            markRevealDone(entry.target);
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
      el.classList.add("is-visible", "reveal-done");
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

  function animateSwap() {
    ["carModel", "details"].forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      var field = input.closest(".field");
      field.classList.remove("is-swapping");
      void field.offsetWidth;
      field.classList.add("is-swapping");
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", animateSwap);
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
})();
