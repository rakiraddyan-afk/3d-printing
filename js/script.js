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

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var currentId = null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", href === currentId);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

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

  var validators = {
    name: function (value) {
      return value.trim().length >= 2 ? "" : window.i18n.t("validation.name");
    },
    email: function (value) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value.trim()) ? "" : window.i18n.t("validation.email");
    },
    carModel: function (value) {
      return value.trim().length >= 2 ? "" : window.i18n.t("validation.carModel");
    },
    details: function (value) {
      return value.trim().length >= 10 ? "" : window.i18n.t("validation.details");
    }
  };

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
      formNote.textContent = window.i18n.t("form.success");
      form.reset();
      form.querySelectorAll(".field").forEach(function (field) {
        field.classList.remove("invalid");
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
