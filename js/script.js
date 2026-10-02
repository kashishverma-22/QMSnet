document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
       DROPDOWN MENU
    ===================================================== */

  const dropdownItems = document.querySelectorAll(".has-dropdown");

  dropdownItems.forEach(function (item) {
    const link = item.querySelector(":scope > a");

    if (!link) return;

    link.addEventListener("click", function (e) {
      /*
                Desktop par normal hover dropdown hai,
                isliye click logic sirf mobile/tablet par chalega.
            */

      if (window.innerWidth <= 900) {
        e.preventDefault();

        const isOpen = item.classList.contains("open");

        // Close all dropdowns
        dropdownItems.forEach(function (otherItem) {
          otherItem.classList.remove("open");
          otherItem.classList.remove("dropdown-open");
        });

        // Open clicked dropdown
        if (!isOpen) {
          item.classList.add("open");
          item.classList.add("dropdown-open");
        }
      }
    });
  });

  /* =====================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ===================================================== */

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) {
      dropdownItems.forEach(function (item) {
        item.classList.remove("open");
        item.classList.remove("dropdown-open");
      });
    }
  });

  /* =====================================================
       MOBILE MENU
    ===================================================== */

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");

  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      navMenu.classList.toggle("mobile-open");

      mobileMenuBtn.classList.toggle("active");
    });
  }

  /* =====================================================
       CLOSE MOBILE MENU AFTER CLICKING NORMAL LINK
    ===================================================== */

  const normalNavLinks = document.querySelectorAll(
    ".nav-item:not(.has-dropdown) > a",
  );

  normalNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 900) {
        navMenu.classList.remove("mobile-open");

        mobileMenuBtn.classList.remove("active");
      }
    });
  });

  /* =====================================================
       HERO VIDEO SLIDER
    ===================================================== */

  const videos = document.querySelectorAll(".hero-video");

  const contents = document.querySelectorAll(".hero-content");

  let currentSlide = 0;

  const slideTime = 6000; // 6 seconds

  /*
        Check videos and text
    */

  if (videos.length === 0 || contents.length === 0) {
    console.log("Hero videos or hero text not found.");

    return;
  }

  /* =====================================================
       FIRST SLIDE
    ===================================================== */

  videos.forEach(function (video, index) {
    video.classList.remove("active");

    if (index !== 0) {
      video.pause();
      video.currentTime = 0;
    }
  });

  contents.forEach(function (content) {
    content.classList.remove("active");
  });

  videos[0].classList.add("active");
  contents[0].classList.add("active");

  /* Play first video */

  videos[0].muted = true;

  videos[0].play().catch(function (error) {
    console.log("First video autoplay blocked:", error);
  });

  /* =====================================================
       NEXT SLIDE FUNCTION
    ===================================================== */

  function nextSlide() {
    /* Remove current video */

    videos[currentSlide].classList.remove("active");

    /* Remove current text */

    contents[currentSlide].classList.remove("active");

    /* Stop current video */

    videos[currentSlide].pause();

    videos[currentSlide].currentTime = 0;

    /* Next slide */

    currentSlide++;

    /* After last slide → first slide */

    if (currentSlide >= videos.length) {
      currentSlide = 0;
    }

    /* New video */

    videos[currentSlide].classList.add("active");

    /* New text */

    contents[currentSlide].classList.add("active");

    /* Start new video */

    videos[currentSlide].muted = true;

    videos[currentSlide].currentTime = 0;

    videos[currentSlide].play().catch(function (error) {
      console.log("Video autoplay blocked:", error);
    });
  }

  /* =====================================================
       AUTO SLIDER
    ===================================================== */

  setInterval(nextSlide, slideTime);
});
