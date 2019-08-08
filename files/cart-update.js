$(document).ready(function(){

  // check if we are on cart page
  if ($('#intitalPrice').length) {

    // price matrix as js object
    window.cart_m = {
      "Ages 1-2": {
        "By the month": {
          "1": 39,
          "3": 39,
          "6": 38.17,
          "12": 38.17
        },
        "Up front": {
          "1": 39,
          "3": 117,
          "6": 229,
          "12": 458
        }
      },
      "Ages 3-4": {
        "By the month": {
          "1": 39,
          "3": 39,
          "6": 38.17,
          "12": 38.17
        },
        "Up front": {
          "1": 39,
          "3": 117,
          "6": 229,
          "12": 458
        }
      },
      "Ages 5-6": {
        "By the month": {
          "1": 39,
          "3": 39,
          "6": 38.17,
          "12": 38.17
        },
        "Up front": {
          "1": 39,
          "3": 117,
          "6": 229,
          "12": 458
        }
      },
      "Ages 7-8": {
        "By the month": {
          "1": 41,
          "3": 41,
          "6": 40.17,
          "12": 40.17
        },
        "Up front": {
          "1": 41,
          "3": 123,
          "6": 241,
          "12": 482
        }
      },
      "Ages 9-10": {
        "By the month": {
          "1": 43,
          "3": 43,
          "6": 42.17,
          "12": 42.17
        },
        "Up front": {
          "1": 43,
          "3": 129,
          "6": 253,
          "12": 506
        }
      },
      "Ages 11-12": {
        "By the month": {
          "1": 43,
          "3": 43,
          "6": 42.17,
          "12": 42.17
        },
        "Up front": {
          "1": 43,
          "3": 129,
          "6": 253,
          "12": 506
        }
      },
      "Adult": {
        "Easy/medium (500 pieces)": {
          "By the month": {
            "1": 43,
            "3": 43,
            "6": 42.17,
            "12": 42.17
          },
          "Up front": {
            "1": 43,
            "3": 129,
            "6": 253,
            "12": 506
          }
        },
        "Medium/hard (1000 pieces)": {
          "By the month": {
            "1": 55,
            "3": 55,
            "6": 54.17,
            "12": 54.17
          },
          "Up front": {
            "1": 55,
            "3": 165,
            "6": 325,
            "12": 650
          }
        },
        "Hard/expert (1000+ pieces)": {
          "By the month": {
            "1": 73,
            "3": 73,
            "6": 72.17,
            "12": 72.17
          },
          "Up front": {
            "1": 73,
            "3": 219,
            "6": 433,
            "12": 866
          }
        }
      }
    };

    // initial variables set up
    var sub_type = $('#sub_type').val();
    var sub_term = '';
    if (sub_type == 'By the month') {
      sub_term = $('#sub_term_monthly').val();
    }
    else {
      sub_term = $('#sub_term_upfront').val();
    }
    var age = $('#age_range').val();
    var diff = $('#difficulty').val();

    // calculate and fill values
    function calc_cart(sub_type, sub_term, age, diff) {

      // console.log('----');
      // console.log(sub_type);
      // console.log(sub_term);
      // console.log(age);
      // console.log(diff);
      // console.log('----');

      var value = 0;
      var term = "";
      if (age == 'Adult') {
        value = window.cart_m[age][diff][sub_type][sub_term];
      }
      else {
        value = window.cart_m[age][sub_type][sub_term];
      }
      if (sub_term == "1") {
        term = "1 month"
      }
      else {
        term = sub_term + " months"
      }
      $('#intitalPrice').html(value);
      $('#subTerm').html(term + " (" + sub_type.toLowerCase() + ")");
    }

    // events tracking
    $('body').on('change','#sub_type',function() {
      sub_type = $(this).val();
      if (sub_type == 'By the month') {
        $('div.upfront').addClass('hidden');
        $('div.monthly').removeClass('hidden');
        sub_term = $('#sub_term_monthly').val();
      }
      else {
        $('div.monthly').addClass('hidden');
        $('div.upfront').removeClass('hidden');
        sub_term = $('#sub_term_upfront').val();
      }
      calc_cart(sub_type, sub_term, age, diff);
    })
    $('body').on('change','#sub_term_upfront',function() {
      sub_term = $(this).val();
      calc_cart(sub_type, sub_term, age, diff);
    })
    $('body').on('change','#sub_term_monthly',function() {
      sub_term = $(this).val();
      calc_cart(sub_type, sub_term, age, diff);
    })
    $('body').on('change','#age_range',function() {
      age = $(this).val();
      if (age == 'Adult') {
        $('#difficulty_block').show();
      }
      else {
        $('#difficulty_block').hide();
      }
      calc_cart(sub_type, sub_term, age, diff);
    })
    $('body').on('change','#difficulty',function() {
      diff = $(this).val();
      calc_cart(sub_type, sub_term, age, diff);
    });

    calc_cart(sub_type, sub_term, age, diff);

  }

})
