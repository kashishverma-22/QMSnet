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
                Desktop:
                Dropdown hover se chalega,
                isliye click par kuch nahi hoga.

                Mobile / Tablet:
                Dropdown click se open hoga.
            */

      if (window.innerWidth <= 900) {
        e.preventDefault();

        const isOpen = item.classList.contains("open");

        /* Close all dropdowns */

        dropdownItems.forEach(function (otherItem) {
          otherItem.classList.remove("open");
          otherItem.classList.remove("dropdown-open");
        });

        /* Open clicked dropdown */

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
    /*
            Agar click kisi dropdown item ke andar nahi hua
            to saare dropdown close.
        */

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

  /*
        Tumhare HTML mein agar id:
        mobileMenuBtn hai -> ye chalega

        Agar id:
        menuToggle hai -> ye bhi chalega
    */

  const mobileMenuBtn =
    document.getElementById("mobileMenuBtn") ||
    document.getElementById("menuToggle");

  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      navMenu.classList.toggle("mobile-open");

      mobileMenuBtn.classList.toggle("active");
    });
  }

  /* =====================================================
       CLOSE MOBILE MENU AFTER NORMAL LINK CLICK
    ===================================================== */

  const normalNavLinks = document.querySelectorAll(
    ".nav-item:not(.has-dropdown) > a",
  );

  normalNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 900) {
        if (navMenu) {
          navMenu.classList.remove("mobile-open");
        }

        if (mobileMenuBtn) {
          mobileMenuBtn.classList.remove("active");
        }
      }
    });
  });

  /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 900 &&
      navMenu &&
      mobileMenuBtn &&
      !e.target.closest(".nav-container")
    ) {
      navMenu.classList.remove("mobile-open");

      mobileMenuBtn.classList.remove("active");

      dropdownItems.forEach(function (item) {
        item.classList.remove("open");
        item.classList.remove("dropdown-open");
      });
    }
  });

  /* =====================================================
       HERO VIDEO SLIDER
    ===================================================== */

  const videos = document.querySelectorAll(".hero-video");

  const contents = document.querySelectorAll(".hero-content");

  /*
        Agar video aur text available nahi hai
        to script yahin stop ho jayegi.
    */

  if (videos.length === 0 || contents.length === 0) {
    console.log("Hero videos or hero text not found.");

    return;
  }

  /* =====================================================
       SLIDE SETTINGS
    ===================================================== */

  let currentSlide = 0;

  const slideTime = 6000; // 6 seconds

  /* =====================================================
       CHECK VIDEO / CONTENT COUNT
    ===================================================== */

  if (videos.length !== contents.length) {
    console.warn("Number of hero videos and hero contents should be the same.");
  }

  /* =====================================================
       FIRST SLIDE
    ===================================================== */

  videos.forEach(function (video, index) {
    video.classList.remove("active");

    video.pause();

    if (index !== 0) {
      video.currentTime = 0;
    }
  });

  contents.forEach(function (content) {
    content.classList.remove("active");
  });

  /* First video */

  videos[0].classList.add("active");

  /* First text */

  contents[0].classList.add("active");

  /* =====================================================
       PLAY FIRST VIDEO
    ===================================================== */

  videos[0].muted = true;

  videos[0].playsInline = true;

  videos[0].play().catch(function (error) {
    console.log("First video autoplay blocked:", error);
  });

  /* =====================================================
       NEXT SLIDE
    ===================================================== */

  function nextSlide() {
    /* ---------------------------------------------
           CURRENT VIDEO
        --------------------------------------------- */

    const currentVideo = videos[currentSlide];

    /* Remove current video */

    currentVideo.classList.remove("active");

    /* Stop current video */

    currentVideo.pause();

    currentVideo.currentTime = 0;

    /* ---------------------------------------------
           CURRENT TEXT
        --------------------------------------------- */

    if (contents[currentSlide]) {
      contents[currentSlide].classList.remove("active");
    }

    /* ---------------------------------------------
           NEXT SLIDE
        --------------------------------------------- */

    currentSlide++;

    /* Last slide ke baad first slide */

    if (currentSlide >= videos.length) {
      currentSlide = 0;
    }

    /* ---------------------------------------------
           NEXT VIDEO
        --------------------------------------------- */

    const nextVideo = videos[currentSlide];

    nextVideo.classList.add("active");

    nextVideo.muted = true;

    nextVideo.playsInline = true;

    nextVideo.currentTime = 0;

    /* ---------------------------------------------
           NEXT TEXT
        --------------------------------------------- */

    if (contents[currentSlide]) {
      contents[currentSlide].classList.add("active");
    }

    /* ---------------------------------------------
           PLAY NEXT VIDEO
        --------------------------------------------- */

    nextVideo.play().catch(function (error) {
      console.log("Next video autoplay blocked:", error);
    });
  }

  /* =====================================================
       AUTO SLIDER
    ===================================================== */

  setInterval(function () {
    nextSlide();
  }, slideTime);

  /* =====================================================
       RESET DROPDOWNS WHEN RESIZING
    ===================================================== */

  window.addEventListener("resize", function () {
    /*
            Desktop par resize hone par
            mobile dropdown classes hata do.
        */

    if (window.innerWidth > 900) {
      dropdownItems.forEach(function (item) {
        item.classList.remove("open");
        item.classList.remove("dropdown-open");
      });

      if (navMenu) {
        navMenu.classList.remove("mobile-open");
      }

      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove("active");
      }
    }
  });
});
