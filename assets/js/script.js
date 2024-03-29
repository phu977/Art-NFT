/**
 * Navbar toggle for mobile
 */
const navbar = document.querySelector(".navbar");
const navToggler = document.querySelector(".nav-toggle-btn");

document.querySelector(".nav-toggle-btn").onclick = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
};

/**
 * HEADER
 *  header and back top btn visible when window scroll down to 200px
 */
var header = document.querySelector(".header");
var backToBtn = document.querySelector("[data-back-top-btn]");
var activeElementScroll = function () {
  if (window.scrollY > 200) {
    header.classList.add("active");
    backToBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backToBtn.classList.remove("active");
  }
};
window.addEventListener("scroll", activeElementScroll);

// SLIDER
const slider = document.querySelectorAll("[data-slider]");

const sliderInit = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector(
    "[data-slider-container]"
  );
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const totalSliderVisibleItems = Number(
    getComputedStyle(currentSlider).getPropertyValue("--slider-item")
  );
  const totalSliderItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  };

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSliderItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  };

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSliderItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSliderItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.setAttribute("disabled", "");
    sliderPrevBtn.setAttribute("disabled", "");
  }

  /**
   * AUTO SLIDE
   */

  let autoSlideInterval;

  const startAutoSlide = () =>
    (autoSlideInterval = setInterval(slideNext, 3000));
  startAutoSlide();
  const stopAutoSlide = () => clearInterval(autoSlideInterval);

  currentSlider.addEventListener("mouseover", stopAutoSlide);

  currentSlider.addEventListener("mouseout", startAutoSlide);

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", moveSliderItem);
};
for (var i = 0, len = slider.length; i < len; i++) {
  sliderInit(slider[i]);
}

// accordion
var accordion = document.querySelectorAll("[data-accordion]");

var lastActiveAccordion;

var accordionInit = function (currentAccordion) {
  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");
  accordionBtn.addEventListener("click", function () {
    // Kiểm tra xem currentAccordion đã có class "active" chưa. Nếu đã có, thì xóa class "active" để đóng accordion
    if (currentAccordion.classList.contains("active")) {
      currentAccordion.classList.toggle("active");
    } else {
      //Nếu currentAccordion không có class "active", tức là nó đang trong trạng thái rút gọn, thì xóa class "active" của accordion trước đó (nếu có) để ẩn nội dung của nó
      if (lastActiveAccordion) lastActiveAccordion.classList.remove("active");
      //Cuối cùng, thêm class "active" vào currentAccordion, biến nó thành accordion hiện tại đang mở rộng.
      currentAccordion.classList.add("active");
    }
    lastActiveAccordion = currentAccordion;//Cập nhật biến lastActiveAccordion để lưu trữ accordion cuối cùng được mở rộng, để khi người dùng bấm vào một accordion khác, chúng ta có thể đóng accordion trước đó (nếu có).
  });
};

for (let i = 0; i < accordion.length; i++) {
  accordionInit(accordion[i]);
}


// backtotop

