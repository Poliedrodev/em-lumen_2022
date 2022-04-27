(function (document, window, jQuery) {
  var INITIATED = '_slideshow_initiated';
  var SLIDER = '_slideshow_slider';
  var WAITING = '_slideshow_waiting';
  var INIT_METHOD = '_slideshow_initmethod';
  var SIZE_RATIO = '_slideshow-size-ratio';
  var CSS_CLASS_FRAME_TO_CONTENT = '_fit-frame-to-content';
  var CSS_CLASS_FRAME_HEIGHT_TO_CONTENT = '_fit-frame-height-to-content';
  var DATA_KEY_LAST_SIZE = '_slideshow_last_size';
  var FITTING_CONTENT_TO_FRAME = 'FITTING_CONTENT_TO_FRAME';
  var FITTING_FRAME_TO_CONTENT = 'FITTING_FRAME_TO_CONTENT';
  var FITTING_FRAME_HEIGHT_TO_CONTENT = 'FITTING_FRAME_HEIGHT_TO_CONTENT';

  // Should be using jssor.slider.mini.js, but it seems to mangle the names.
  // Difference is it disables debug mode (and is minified, but we do that already).
  // http://www.jssor.com/development/
  $JssorDebug$.$DebugMode = false;

  var isIE = /msie/i.test(navigator.userAgent) || /trident/i.test(navigator.userAgent);

  /**
   * Init all slideshows
   */
  function initSlideshows() {
    // jQuery shortcut
    var $ = jQuery;
    // if the height is not set then wait a bit to initialize the slideshows
    if (!$('[doc-slideshow] [u="slides"]').height()) {
      return window.setTimeout(initSlideshows, 50);
    }
    // init slideshows
    $('[data-slideshow-component]').each(function () {
      var slideshowBox = $(this);
      if (!slideshowBox.data(INITIATED) && !slideshowBox.hasClass(WAITING)) {
        slideshowBox.data(INITIATED, true);

        function initThisSlideshow(activeIndex) {
          initSlideshow(slideshowBox, activeIndex);
        }

        // Store these methods so they can be accessed by the editor
        slideshowBox.data(INIT_METHOD, initThisSlideshow);

        initThisSlideshow();
      }
    });
    // scale
    var body = $('body');
    if (!body.data(INITIATED)) {
      body.data(INITIATED, true);
      var reinitSlider = function () {
        // don't reinit slideshows if they are in the editor
        if ($('.doc-section').length) {
          return;
        }
        $('[data-slideshow-component]').each(function () {
          reinitSlideshow($(this));
        });
      };
      var reinitSliderTimer;
      var reinitSliderDelayed = function () {
        window.clearTimeout(reinitSliderTimer);
        reinitSliderTimer = window.setTimeout(reinitSlider, 50);
      };

      reinitSlider();

      $Jssor$.$AddEvent(window, 'load', reinitSliderDelayed);
      $Jssor$.$AddEvent(window, 'resize', reinitSliderDelayed);
      $Jssor$.$AddEvent(window, 'orientationchange', reinitSliderDelayed);
    }
  }

});