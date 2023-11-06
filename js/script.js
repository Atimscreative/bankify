"use strict";

const header = document.querySelector("#header");
const hero = document.querySelector("#hero");
const toPageTop = document.querySelector(".to-page-top");

const navMenu = document.querySelector(".nav-menu");
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const navLinks = document.querySelectorAll(".nav-link");

const formPopup = document.querySelector("#form-popup");
const closePopup = document.querySelector(".close-popup");
const registerform = document.querySelector(".register");
const loginForm = document.querySelector(".login");

const inputPassword = document.querySelector("#password");
const inputField = document.querySelector(".input-field");

const tabs = document.querySelectorAll(".operations-tab");
const tabContainer = document.querySelector(".operations-tab-container");
const tabContents = document.querySelectorAll(".operations-content");

const slides = document.querySelectorAll(".slide");
const btnSlideLeft = document.querySelector(".slider-btn-left");
const btnSlideRight = document.querySelector(".slider-btn-right");
const dotsContainer = document.querySelector(".dots");
const maxSlide = slides.length;

///////////////////////////////////
/*==== HEADER SCROLL EFFECT ====*/

function stickyNav(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    header.classList.add("sticky-header");
    toPageTop.style.bottom = "30px";
  } else {
    header.classList.remove("sticky-header");
    toPageTop.style.bottom = "-80px";
  }
}

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});

heroObserver.observe(hero);

///////////////////////////////////
/*==== BACK TO PAGE TOP ====*/

toPageTop.addEventListener(
  "click",
  () => (document.documentElement.scrollTop = 0)
);

///////////////////////////////////
/*==== MOBILE NAVIGATION ====*/
const menuLogo = document.createElement("a");
menuLogo.classList.add("logo");
menuLogo.textContent = "Bankify";

// Open Menu when user click
openMenu.addEventListener("click", () => {
  navMenu.prepend(menuLogo);
  menuLogo.style.fontSize = "2rem";
  navMenu.classList.add("show-menu");
});

// Close Menu when user click
closeMenu.addEventListener("click", () => {
  navMenu.classList.remove("show-menu");
});

// Close menu when user click any nav link
navLinks.forEach((n) =>
  n.addEventListener("click", () => navMenu.classList.remove("show-menu"))
);

///////////////////////////////////
/*==== REGISTER ACCOUNT FORM ====*/

function myRegistrationForm() {
  // REGISTER FORM OR LOGIN FORM POP-UP
  FIXME: document.body.addEventListener("click", (e) => {
    // e.preventDefault();

    if (e.target.classList.contains("register-acc")) {
      formPopup.style.opacity = 1;
      formPopup.style.visibility = "visible";
      loginForm.style.display = "none";
      registerform.style.display = "block";
    }

    if (e.target.classList.contains("login-acc")) {
      formPopup.style.opacity = 1;
      formPopup.style.visibility = "visible";
      loginForm.style.display = "block";
      registerform.style.display = "none";
    }
  });

  // CLOSE FORM POP-UP
  closePopup.addEventListener("click", () => {
    formPopup.style.opacity = 0;
    formPopup.style.visibility = "hidden";
  });

  // HIDE OR REVEAL PASSWORD
  formPopup.addEventListener("click", (e) => {
    const passwordIcon = e.target.closest(".password-icon");

    if (!passwordIcon) return;

    if (
      passwordIcon &&
      inputPassword.type === "password" &&
      inputPassword.value
    ) {
      passwordIcon.classList.replace("bx-show", "bx-hide");
      inputPassword.type = "text";
    } else {
      passwordIcon.classList.replace("bx-hide", "bx-show");
      inputPassword.type = "password";
    }
  });
}

///////////////////////////////////
/*==== TABBED CONTENT ====*/

tabContainer.addEventListener("click", (e) => {
  const tabClicked = e.target.closest(".operations-tab");

  if (!tabClicked) return;

  // ACTIVE TAB
  tabs.forEach((tab) => tab.classList.remove("operations-tab-active"));
  tabClicked.classList.add("operations-tab-active");

  // ACTIVE CONTENT
  tabContents.forEach((content) =>
    content.classList.remove("operations-content-active")
  );
  document
    .querySelector(`.operations-content-${tabClicked.dataset.tab}`)
    .classList.add("operations-content-active");
});

///////////////////////////////////
/*======= SLIDER ========*/

// INITIAL SLIDE POSITION
function goToSlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

// SLIDER PAGGINATION
const createDots = () => {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<span class="dots-dot" data-slide="${i}"></span>`
    );
  });
};

// ACTIVE PAGGINATION
function activeDot(slide) {
  document
    .querySelectorAll(".dots-dot")
    .forEach((dot) => dot.classList.remove("dots-dot-active"));

  document
    .querySelector(`.dots-dot[data-slide="${slide}"]`)
    .classList.add("dots-dot-active");
}

function initialSlideState() {
  goToSlide(0);
  createDots();
  activeDot(0);
}
initialSlideState();

let curSlide = 0;

// NEXT SLIDE
function nextSlide() {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
}

// PREVIOUS SLIDE
function previousSlide() {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
}

btnSlideRight.addEventListener("click", nextSlide);
btnSlideLeft.addEventListener("click", previousSlide);

// KEYBOARD CONTROLs
document.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") previousSlide();
});

// PAGGINATION CLICK EVENT
dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots-dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
});

/////////////////////////////////////////
/*===== SECTIONS REVEAL ON SCROLL =====*/
const sr = new ScrollReveal({
  origin: "top",
  distance: "50px",
  duration: 1500,
  delay: 500,
  easing: "ease-in-out",
});

sr.reveal(".heading,.slider-btn, .dots", { distance: 0 });
sr.reveal(".hero-content, .about-content", { origin: "left" });
sr.reveal(".hero-img, .about-img", { origin: "right" });
sr.reveal(".partner", { distance: "10px", interval: 300 });
sr.reveal(".operations, .testimonial", { origin: "bottom" });
sr.reveal(
  ".service-box, .cta-header,.cta-btn, .footer-about,.footer-col, .copyright",
  { origin: "bottom", interval: 200 }
);

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

/*============= ACCOUNT SIGN UP ==============*/

// const accounts = [];
// FORM VALIDATION
// const registerForm = document.querySelector("#register-account");
// const inputName = document.querySelector("#fname");
// const inputEmail = document.querySelector("#email");

// registerForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const account1 = {
//     name: inputName.value,
//     password: inputPassword.value,
//     email: inputEmail.value.toLowerCase(),
//   };

//   inputName.value = inputEmail.value = inputPassword.value = "";

//   accounts.push(account1);
//   console.log(accounts);
// });
