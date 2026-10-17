/* ==========================================================
   TRIPLE B — روابط الصفحة
   عدّل الروابط من هنا بس، وهتتحط تلقائي في كل أزرار الصفحة.
   ========================================================== */
(function () {
  'use strict';

  var LINKS = {
    // قائمة الطعام
    menu: 'https://triple-b-menu.vortishop.com/',

    // السوشيال ميديا
    tiktok:    'https://www.tiktok.com/@tripleb.sa?_r=1&_t=ZS-9AbnGGLPK7B',
    instagram: 'https://www.instagram.com/tripleb.sa?xtok=MXdicGE3YTJxZWsxaQ==',
    snapchat:  '#',   // TODO: حط رابط السناب
    whatsapp:  'https://api.whatsapp.com/send/?phone=966508883644&text&type=phone_number&app_absent=0',
    // (تم حذف facebook و twitter)

    // الفروع
    location: 'https://www.google.com/maps/place/%D8%AA%D8%B1%D8%A8%D9%84+%D8%A8%D9%8A+%D8%A8%D8%B1%D8%AC%D8%B1+TRiPLE-B+BURGER%E2%80%AD/@24.8134585,46.6459592,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2ee51839c45ab9:0xef4dff5d5b8fe02a!8m2!3d24.8134585!4d46.6459592!16s%2Fg%2F11yryhvg5y!18m1!1e1',

    // تطبيقات التوصيل
    delivery1:     'https://thechefzco.app.link/VFg5O1vmb7b',
    keeta:         'https://m.keeta-global.com/marketing/applaunch/index.html?qrcode_id=1jaotwuw&utm_campaign=merchant&utm_medium=branding&inner_url=sailorc%3A%2F%2Fkeeta.com%2FmarketTransfer%2Fmachpro%3Fmach_bundle_name%3Dmach_pro_sailor_c_shop%26shopId%3D1430389804&url_id=shop_share_link&region=SA&locale=ar&openType=appLaunch&utm_source=organic&utm_content=merchantsharelink',
    hungerstation: 'https://hungerstation.go.link/?c=SA&s=c&v=96223&so=mls&adj_t=1sdhhuza_1spi9ypp&adj_og_title=Triple+B+Burger&adj_og_image=https://images.deliveryhero.io/image/hungerstation/restaurant/logo/0755d6cc884eba6f2000abc9cedeb0ee.jpeg',
    jahez:         'https://jahez.go.link/jsp0h'
  };

  document.querySelectorAll('[data-link]').forEach(function (el) {
    var url = LINKS[el.dataset.link];
    if (!url || url === '#') return;          // سيب الرابط الافتراضي لو لسه مفيش رابط
    el.setAttribute('href', url);
    if (/^https?:\/\//i.test(url)) {          // الروابط الخارجية تتفتح في تاب جديد
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    }
  });
})();


/* ==========================================================
   Animations (AOS) + Preloader
   كل إعدادات الحركة في الكائن ANIMATION تحت — عدّل منه.
   ========================================================== */
(function () {
  'use strict';

  var ANIMATION = {
    duration: 800,        // مدة الحركة (ms)
    easing: 'ease-out',
    once: false,          // false = العناصر تختفي بـ fade لما تطلع لفوق وترجع تظهر لما تنزل تاني
    mirror: false,        // true = العناصر تختفي كمان وهي بتعدي من فوق وانت نازل
    offset: 80,           // المسافة قبل ما العنصر يبدأ يتحرك (px)
    preloaderFadeMs: 500  // لازم تطابق transition الـ #preloader في الـ CSS
  };

  var preloader = document.getElementById('preloader');
  var reduceMotion = window.matchMedia &&
                     window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var started = false;

  function startAOS() {
    if (started) return;
    started = true;
    if (typeof AOS === 'undefined') {
      // لو المكتبة ما اتحملتش، اظهر المحتوى عادي
      document.querySelectorAll('[data-aos]').forEach(function (el) {
        el.removeAttribute('data-aos');
        el.style.opacity = 1;
      });
      return;
    }
    AOS.init({
      duration: ANIMATION.duration,
      easing: ANIMATION.easing,
      once: ANIMATION.once,
      mirror: ANIMATION.mirror,
      offset: ANIMATION.offset,
      disable: reduceMotion
    });
  }

  function hidePreloader() {
    if (!preloader) { startAOS(); return; }
    preloader.classList.add('is-hidden');
    setTimeout(function () {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      startAOS();
    }, reduceMotion ? 0 : ANIMATION.preloaderFadeMs);
  }

  if (document.readyState === 'complete') hidePreloader();
  else window.addEventListener('load', hidePreloader);

  // أمان: لو التحميل اتأخر ما نسيبش الـ preloader أكتر من 6 ثواني
  setTimeout(hidePreloader, 6000);
})();
