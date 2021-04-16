"use strict";
// $(window).on("load", function () {
//   popUp.addClass("active");
//  // $("body").addClass("stop-scroll");
// });
$(document).ready(function () {
  var min_horizontal_move = 30;
  var max_vertical_move = 30;
  var within_ms = 1000;
  var start_xPos;
  var start_yPos;
  var start_time;

  function touch_start(event) {
    start_xPos = event.touches[0].pageX;
    start_yPos = event.touches[0].pageY;
    start_time = new Date();
  }

  function touch_end(event) {
    var end_xPos = event.changedTouches[0].pageX;
    var end_yPos = event.changedTouches[0].pageY;
    var end_time = new Date();
    var move_x = end_xPos - start_xPos;
    var move_y = end_yPos - start_yPos;
    var elapsed_time = end_time - start_time;

    if (Math.abs(move_x) > min_horizontal_move && Math.abs(move_y) < max_vertical_move && elapsed_time < within_ms) {
      if (move_x < 0) {
        return "prev";
      } else {
        return "next";
      }
    }
  }

  prizeImages.on("touchend", function (e) {
    var dir = touch_end(e);

    if (dir === "prev") {
      prevPrize();
    } else if (dir === "next") {
      nextPrize();
    }
  });
  prizeImages.on("touchstart", touch_start);
  prizeLeftBtn.click(prevPrize);
  prizeRightBtn.click(nextPrize);
  allinBtn.click(function () {
    allinBtn.removeClass("active");
    $(this).addClass("active");
  });
  platformBtn.click(function () {
    platformBtn.removeClass("active");
    $(this).addClass("active");
    var currBtn = $(this).data("platform-btn");
    platformImages.each(function () {
      var platformImg = $(this).data("platform");

      if (platformImg != currBtn) {
        $(this).hide();
      } else {
        $(this).fadeIn();
      }
    });
    platformText.each(function () {
      var platformText = $(this).data("platform-text");

      if (platformText != currBtn) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }
    });
  });
  faqQuestion.click(function () {
    $(this).toggleClass("active");
  });
  tabBtn.click(function () {
    tabBtn.removeClass("active");
    $(this).addClass("active");
    var currBtn = $(this).data("mans");
    tabContent.each(function () {
      var tabContent = $(this).data("content");

      if (tabContent != currBtn) {
        $(this).hide();
      } else {
        $(this).fadeIn();
      }
    });
  });
  btnBurger.click(function () {
    $(this).toggleClass("active");
    menu.toggleClass("active");
    $("body").toggleClass("stop-scroll");
  });
  $(".nav__link").click(function (e) {
    e.preventDefault();
    btnBurger.removeClass("active");
    menu.removeClass("active");
    $("body").removeClass("stop-scroll");
    $("body, html").stop().animate({
      scrollTop: $($(this).attr("href")).offset().top
    }, 400);
    return false;
  });
  popUpClose.click(function () {
    popUp.removeClass("active");
  });
  $(".footer-rule").click(function () {
    $(".rule-modal").addClass("active");
  });
  $(".footer-policy").click(function () {
    $(".policy-modal").addClass("active");
  });
  $(".jsClose").click(function () {
    $(".jsModal").removeClass("active");
  });
  $(".team__item").click(function (e) {
    teamSwiper.update();
    teamSwiper.slideToClickedSlide();
    teamSwiper.update();
  });
  $(".guarant__text").click(function () {
    $(".guarant-modal").addClass("active");
  });
  $(".guarant-close").click(function () {
    $(".guarant-modal").removeClass("active");
  });
});
var popUpClose = $(".close-pop");
var popUp = $(".pop-up");
var menu = $(".header-menu");
var btnBurger = $(".btn--burger");
var tabBtn = $("[data-mans]");
var tabContent = $("[data-content]");
var faqQuestion = $(".faq__question");
var platformImages = $("[data-platform]");
var platformBtn = $("[data-platform-btn]");
var platformText = $("[data-platform-text]");
var allinBtn = $(".allin__btn");
var prizeLeftBtn = $(".prizes-info__arrow--left");
var prizeRightBtn = $(".prizes-info__arrow--right");
var currPrize = 1;
var prizeImages = $(".prize__images");

function nextPrize() {
  prizeImages.removeClass("prize__images--" + currPrize);

  if (currPrize == 5) {
    currPrize = 1;
  } else {
    currPrize++;
  }

  prizeImages.addClass("prize__images--" + currPrize);
}

function prevPrize() {
  prizeImages.removeClass("prize__images--" + currPrize);

  if (currPrize == 1) {
    currPrize = 5;
  } else {
    currPrize--;
  }

  prizeImages.addClass("prize__images--" + currPrize);
} //swiper reviews


var swiperReviews = new Swiper(".reviews__slider", {
  slidesPerView: 1,
  //   resizeObserver: true,
  initialSlide: 1,
  spaceBetween: 10,
  centeredSlides: true,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  loop: true,
  navigation: {
    nextEl: ".slide-arrow-next",
    prevEl: ".slide-arrow-prev"
  },
  pagination: {
    el: ".counter-slide",
    type: "custom",
    renderCustom: function renderCustom(swiper, current, total) {
      return '<div class="counter-active-slide">' + current + "</div>" + '<div class="counter-total-slide">' + "/" + total + "</div>";
    }
  },
  breakpoints: {
    992: {
      slidesPerView: 1.2,
      spaceBetween: 15
    },
    1200: {
      slidesPerView: 1.7,
      spaceBetween: 20
    }
  }
}); //swiper platform-btns

var swiperPlatformBtn = new Swiper(".platform__btns", {
  slidesPerView: "auto",
  spaceBetween: 5
}); //swiper result

var swiperResult = new Swiper(".result__slider", {
  slidesPerView: "auto",
  centeredSlides: true,
  centeredSlidesBounds: true,
  initialSlide: 1,
  spaceBetween: 5,
  //touchRatio: 0.2,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  loop: true,
  navigation: {
    nextEl: ".slide-arrow-next-result",
    prevEl: ".slide-arrow-prev-result"
  },
  pagination: {
    el: ".counter-slide",
    type: "custom",
    renderCustom: function renderCustom(swiper, current, total) {
      return '<div class="counter-active-slide">' + current + "</div>" + '<div class="counter-total-slide">' + "/" + total + "</div>";
    }
  } // breakpoints: {
  //   992: {
  //   },
  // },

}); //swiper team

var teamSwiper = new Swiper(".team__slider", {
  speed: 300,
  // touchRatio: 0.2,
  slidesPerView: "auto",
  centeredSlides: true,
  //slideToClickedSlide: true,
  //freeMode: true,
  spaceBetween: 5,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  resizeObserver: true,
  control: teamSwiperText,
  //galleryTop.controller.control = galleryThumbs
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  //initialSlide: 1,
  // loop: true,
  //loopedSlides: 5,
  breakpoints: {
    576: {
      slidesPerView: 3,
      spaceBetween: 15,
      centeredSlides: false,
      loop: false
    },
    1200: {
      allowTouchMove: false,
      slidesPerView: 3,
      spaceBetween: 100,
      centeredSlides: false,
      loop: false
    }
  }
});
var teamSwiperText = new Swiper(".team__slider-text", {
  speed: 300,
  // allowTouchMove: false,
  slidesPerView: 1,
  initialSlide: 1,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  control: teamSwiper,
  resizeObserver: true,
  //loop: true,
  //loopedSlides: 5,
  navigation: {
    nextEl: ".slide-arrow-next",
    prevEl: ".slide-arrow-prev"
  },
  pagination: {
    el: ".counter-slide",
    type: "custom",
    renderCustom: function renderCustom(swiper, current, total) {
      return '<div class="counter-active-slide">' + current + "</div>" + '<div class="counter-total-slide">' + "/" + total + "</div>";
    }
  },
  thumbs: {
    swiper: teamSwiper
  },
  on: {
    slideChange: function slideChange() {
      var activeIndex = this.activeIndex + 1;
      var activeSlide = document.querySelector(".team__slider .swiper-slide:nth-child(".concat(activeIndex, ")"));
      var nextSlide = document.querySelector(".team__slider .swiper-slide:nth-child(".concat(activeIndex + 1, ")"));
      var prevSlide = document.querySelector(".team__slider .swiper-slide:nth-child(".concat(activeIndex - 1, ")"));

      if (nextSlide && !nextSlide.classList.contains("swiper-slide-visible")) {
        this.thumbs.swiper.slideNext();
        teamSwiper.update();
      } else if (prevSlide && !prevSlide.classList.contains("swiper-slide-visible")) {
        // teamSwiper.slideToClickedSlide(activeIndex);
        this.thumbs.swiper.slidePrev();
        teamSwiper.update();
      }
    }
  }
});