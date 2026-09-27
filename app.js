/* =========================================================
   مِداد - JavaScript الرئيسي
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     السنة الحالية
  ======================================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =======================================================
     قائمة الهاتف
  ======================================================= */

  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");

  if (menuButton && mainNav) {

    menuButton.addEventListener("click", function () {

      mainNav.classList.toggle("open");

      if (mainNav.classList.contains("open")) {
        menuButton.textContent = "✕";
      } else {
        menuButton.textContent = "☰";
      }

    });


    /* إغلاق القائمة عند اختيار رابط */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        mainNav.classList.remove("open");

        menuButton.textContent = "☰";

      });

    });

  }


  /* =======================================================
     البحث
  ======================================================= */

  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  const searchableContent = [

    {
      title: "الحروف العربية",
      description: "تعلم الحروف العربية بطريقة ممتعة",
      url: "letters.html"
    },

    {
      title: "الأرقام",
      description: "تعلم الأرقام والعد",
      url: "numbers.html"
    },

    {
      title: "الحيوانات",
      description: "اكتشف الحيوانات وأسماءها",
      url: "animals.html"
    },

    {
      title: "النباتات والفواكه",
      description: "تعرف على النباتات والفواكه",
      url: "plants.html"
    },

    {
      title: "القرآن الكريم",
      description: "تعرف على القرآن الكريم",
      url: "quran.html"
    },

    {
      title: "الأحاديث",
      description: "أحاديث نبوية مختارة",
      url: "hadith.html"
    },

    {
      title: "قصص قبل النوم",
      description: "قصص قصيرة ممتعة وهادفة",
      url: "stories.html"
    },

    {
      title: "الألعاب التعليمية",
      description: "ألعاب تعليمية للأطفال",
      url: "games.html"
    }

  ];


  if (searchInput && searchResults) {

    searchInput.addEventListener("input", function () {

      const query =
        searchInput.value
          .trim()
          .toLowerCase();

      searchResults.innerHTML = "";

      if (!query) {

        searchResults.classList.remove("show");

        return;

      }


      const results =
        searchableContent.filter(function (item) {

          return (
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
          );

        });


      if (results.length === 0) {

        searchResults.innerHTML = `
          <div class="search-result">
            لا توجد نتائج مطابقة للبحث.
          </div>
        `;

      } else {

        results.forEach(function (item) {

          const link =
            document.createElement("a");

          link.href = item.url;

          link.className = "search-result";

          link.innerHTML = `
            <strong>${item.title}</strong>
            <br>
            <small>${item.description}</small>
          `;

          searchResults.appendChild(link);

        });

      }


      searchResults.classList.add("show");

    });


    document.addEventListener("click", function (event) {

      if (
        !searchResults.contains(event.target) &&
        !searchInput.contains(event.target)
      ) {

        searchResults.classList.remove("show");

      }

    });

  }


  /* =======================================================
     نظام التقدم
  ======================================================= */

  const progressBar =
    document.getElementById("progressBar");

  const progressText =
    document.getElementById("progressText");


  function getProgress() {

    const saved =
      localStorage.getItem("midadProgress");

    if (!saved) {
      return 0;
    }

    const number =
      parseInt(saved, 10);

    if (isNaN(number)) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(100, number)
    );

  }


  function updateProgress() {

    const progress =
      getProgress();

    if (progressBar) {
      progressBar.style.width =
        progress + "%";
    }

    if (progressText) {
      progressText.textContent =
        progress + "% مكتمل";
    }

  }


  window.midadSetProgress =
    function (value) {

      const progress =
        Math.max(
          0,
          Math.min(100, Number(value))
        );

      localStorage.setItem(
        "midadProgress",
        progress
      );

      updateProgress();

    };


  updateProgress();


  /* =======================================================
     نظام النجوم
  ======================================================= */

  function getStars() {

    const saved =
      localStorage.getItem("midadStars");

    if (!saved) {
      return 0;
    }

    const stars =
      parseInt(saved, 10);

    if (isNaN(stars)) {
      return 0;
    }

    return Math.max(0, stars);

  }


  window.midadAddStars =
    function (amount) {

      const current =
        getStars();

      const newTotal =
        current + Number(amount || 0);

      localStorage.setItem(
        "midadStars",
        newTotal
      );

      return newTotal;

    };


  window.midadGetStars =
    function () {

      return getStars();

    };


  /* =======================================================
     الأنشطة المكتملة
  ======================================================= */

  function getCompletedActivities() {

    const saved =
      localStorage.getItem(
        "midadCompletedActivities"
      );

    if (!saved) {
      return [];
    }

    try {

      const parsed =
        JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }

      return [];

    } catch (error) {

      return [];

    }

  }


  window.midadComplete =
    function (activityId) {

      if (!activityId) {
        return;
      }

      const activities =
        getCompletedActivities();

      if (!activities.includes(activityId)) {

        activities.push(activityId);

        localStorage.setItem(
          "midadCompletedActivities",
          JSON.stringify(activities)
        );

        midadAddStars(1);

      }

    };


  /* =======================================================
     معلومة اليوم
  ======================================================= */

  const dailyInformation = [

    {
      title: "هل تعلم؟",
      text:
        "النحلة تساعد النباتات على إنتاج الثمار من خلال نقل حبوب اللقاح بين الأزهار."
    },

    {
      title: "هل تعلم؟",
      text:
        "الشمس مصدر مهم للضوء والحرارة على الأرض."
    },

    {
      title: "هل تعلم؟",
      text:
        "الماء ضروري للإنسان والحيوان والنبات."
    },

    {
      title: "هل تعلم؟",
      text:
        "النباتات تحتاج إلى الماء والضوء والهواء لكي تنمو."
    },

    {
      title: "هل تعلم؟",
      text:
        "القمر لا يصنع ضوءه بنفسه، وإنما نرى ضوء الشمس المنعكس عنه."
    },

    {
      title: "هل تعلم؟",
      text:
        "الفراشات تمر بمراحل مختلفة أثناء نموها."
    },

    {
      title: "هل تعلم؟",
      text:
        "القراءة تساعد الطفل على تعلم كلمات ومعلومات جديدة."
    }

  ];


  const dailyTitle =
    document.getElementById("dailyTitle");

  const dailyText =
    document.getElementById("dailyText");


  function showDailyInformation() {

    if (
      !dailyTitle ||
      !dailyText
    ) {
      return;
    }

    const day =
      new Date().getDate();

    const item =
      dailyInformation[
        day % dailyInformation.length
      ];

    dailyTitle.textContent =
      item.title;

    dailyText.textContent =
      item.text;

  }


  showDailyInformation();


  /* =======================================================
     تأثير ظهور البطاقات
  ======================================================= */

  const cards =
    document.querySelectorAll(
      ".learning-card, .feature"
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.style.opacity = "1";

              entry.target.style.transform =
                "translateY(0)";

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08
        }
      );


    cards.forEach(function (card) {

      card.style.opacity = "0";

      card.style.transform =
        "translateY(18px)";

      card.style.transition =
        "opacity 0.5s ease, transform 0.5s ease";

      observer.observe(card);

    });

  }


  /* =======================================================
     منع الضغط المكرر على الروابط أثناء التحميل
  ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href$=".html"]'
    );


  internalLinks.forEach(function (link) {

    link.addEventListener("click", function () {

      link.style.opacity = "0.75";

    });

  });


});
