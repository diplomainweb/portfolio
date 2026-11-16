// ===== 1. Counter animation =====
function animateCounter(element) {
  const target = Number(element.dataset.target);
  const duration = 1500; // milliseconds
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    element.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + "+";
    }
  }

  requestAnimationFrame(update);
}

// ===== 2. Skill bar animation =====
function fillSkillBar(bar) {
  bar.style.width = bar.dataset.width + "%";
}

// ===== 3. Run animations only when the element is visible =====
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    if (entry.target.classList.contains("counter")) {
      animateCounter(entry.target);
    }
    if (entry.target.classList.contains("progress-bar")) {
      fillSkillBar(entry.target);
    }
    observer.unobserve(entry.target); // run only once
  });
}, { threshold: 0.4 });

document.querySelectorAll(".counter, .progress-bar").forEach(function (el) {
  observer.observe(el);
});

// ===== 4. Contact form validation =====
const form = document.getElementById("contactForm");
const successBox = document.getElementById("formSuccess");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  successBox.classList.add("d-none");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // Real project: send data to your server here (fetch / AJAX)
  successBox.classList.remove("d-none");
  form.reset();
  form.classList.remove("was-validated");
});

// ===== 5. Back to top button =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  backToTop.style.display = window.scrollY > 400 ? "block" : "none";
});

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== 6. Close mobile menu after clicking a link =====
document.querySelectorAll("#navMenu .nav-link:not(.dropdown-toggle)").forEach(function (link) {
  link.addEventListener("click", function () {
    const menu = document.getElementById("navMenu");
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
