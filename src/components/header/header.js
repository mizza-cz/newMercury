let allowedScroll = ['#card-info'];

setTimeout(function () {
  AOS.init({
    duration: 500,
    easing: 'ease-out',
    once: true,
    offset: 10,
    disable: false,
  });
}, 200);

function solveChromeMobileIssue() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

solveChromeMobileIssue();

let navStatus = 'hidden';
let cartSideMenuStatus = 'hidden';
$('#mobile-nav').addClass('d-flex');
$('#cart-side-menu').addClass('d-flex');

function navAnimation() {
  if (navStatus == 'hidden' && !$('#search-bar').hasClass('shown')) {
    if (window.scrollY > 1) {
      $('#main-nav.home-nav').addClass('scroll');
    } else {
      $('#main-nav.home-nav').removeClass('scroll');
    }
  }
}

// categories filter - start

function updateCategoriesFilter(parent, category) {
  parent.find('[data-categories]').removeClass('d-none');
  if (category != 'all') {
    parent.find('[data-categories]').each(function (index, item) {
      let categoryStr = $(item).data('categories');
      categoryArr = categoryStr.split('-');
      if (!categoryArr.includes(category)) {
        $(item).addClass('d-none');
      }
    });
  }
  AOS.refresh();
}

// categories filter - end

$(window).on('resize', function () {
  solveChromeMobileIssue();
  updateFullOverlayWidth();
  AOS.refresh();
});

let $temp = $('<input>');
let $url = window.location.href.split('?')[0];

// copy link to clipbaord - end

// swipers init - end

// parking svg - end

// bootstrap-select - start

$('.selectpicker').on('hidden.bs.select', function () {
  $('.current-bootstrap-select').removeClass('current-bootstrap-select');
});

$(window).on('scroll', function () {
  $('.bootstrap-select.show').each(function (index, el) {
    let select = $(el).find('.selectpicker');
    select.selectpicker('toggle');
    select.addClass('current-bootstrap-select');
  });
  if ($('.current-bootstrap-select').length) {
    $('.current-bootstrap-select').selectpicker('toggle');
  }
});

// bootstrap-select - end

// number input - start

function customInput(element) {
  const el = $(element);

  const defaultOptions = {
    min: 1,
    max: 100,
    value: 1,
    step: 1,
  };

  let options = {};
  Object.assign(options, defaultOptions);
  const obj = {
    input: el.find('.input_quantity_change'),
    btnIncrement: el.find('.btn-increment'),
    btnDecrement: el.find('.btn-decrement'),
    init() {
      this.setup();
      this.events();
      return this;
    },
    updateBtns(newVal) {
      if (newVal - options.step < options.min) {
        this.btnDecrement.addClass('disabled');
      } else {
        this.btnDecrement.removeClass('disabled');
      }
      if (newVal + options.step > options.max) {
        this.btnIncrement.addClass('disabled');
      } else {
        this.btnIncrement.removeClass('disabled');
      }
    },
    setup() {
      if (this.input.attr('min')) {
        options.min = parseInt(this.input.attr('min'));
      }
      if (this.input.attr('max')) {
        options.max = parseInt(this.input.attr('max'));
      }
      if (this.input.attr('step')) {
        options.step = parseInt(this.input.attr('step'));
      }
      if (this.input.data('value')) {
        if (
          this.input.data('value') <= this.input.attr('max') &&
          this.input.data('value') >= this.input.attr('min')
        ) {
          options.value = parseInt(this.input.data('value'));
        } else {
          this.input.attr('value', options.min);
          options.value = options.min;
        }
      }
      this.updateBtns(options.value);
    },
    events() {
      let that = this;
      this.btnIncrement.on('click', function () {
        const oldValue = parseInt($(that.input).val());
        let newVal;
        if (oldValue + options.step > options.max) {
          newVal = oldValue;
        } else {
          newVal = oldValue + options.step;
        }
        $(that.input).val(newVal);
        $(that.input).trigger('change', [newVal]);
      });

      this.btnDecrement.on('click', function () {
        const oldValue = parseInt($(that.input).val());
        let newVal;
        if (oldValue - options.step < options.min) {
          newVal = oldValue;
        } else {
          newVal = oldValue - options.step;
        }
        $(that.input).val(newVal);

        $(that.input).trigger('change', [newVal]);
      });

      this.input.on('change', function (e, newVal) {
        that.updateBtns(newVal);
      });
    },
  };

  let delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  el.find('.input_quantity_change').keyup(function () {
    delay(function () {
      el.find('.input_quantity_change').change();
    }, 500);
  });

  return obj.init();
}

// number input - end

// purchase transport update - start

function scrolltop() {
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    500,
  );
}

// purchase transport update - end

if (window.location.hash) {
  var hash = window.location.hash;

  if (allowedScroll.includes(hash)) {
    if ($(hash).length) {
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top - 150,
        },
        900,
        'swing',
      );
    }
  }
}
