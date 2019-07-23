$(document).ready(function() {

  //  svgeezy.init(false, 'png');

  // Menu

  $('.main-nav-toggle').click(function(){
    $('body:not(.home) .hdr').toggleClass('fixed');
    $('.main-nav.lg-nav')
      .toggleClass('hidden')
      .toggleClass('block')
      .toggleClass('xl:flex')
      .toggleClass('nav-expanded')
    ;
    $('.main-nav.sm-nav')
      .toggleClass('hidden')
      .toggleClass('block')
      .toggleClass('sm:flex')
      .toggleClass('nav-expanded')
    ;
    $('.main-nav-toggle')
      .toggleClass('nav-open')
    ;
    $('.main-nav-toggle svg').toggleClass('hidden').toggleClass('block');
    $('.hdr-contact,.n-home').toggleClass('hidden');
  });

  // Snipcart

  $('.snipcart-checkout a')
    .html('<svg class="icon-cart"><use xlink:href="/assets/img/sprites.svg#icon-cart"></use></svg>')
    .addClass('snipcart-checkout')
  ;
  $('li.snipcart-checkout')
    .addClass('cart-li')
    .removeClass('snipcart-checkout')
  ;

  Snipcart.subscribe('cart.ready', function (cart) {
    if (cart.order && cart.order.items.length > 0) {
      $('.snipcart-summary').show();
    }
  });

  Snipcart.subscribe('item.added', function() {
    $('.snipcart-summary').show();
  });

  Snipcart.subscribe('plan.added', function() {
    $('.snipcart-summary').show();
  });

  Snipcart.subscribe('item.removed', function() {
    if(Snipcart.api.items.count() == 0){
      $('.snipcart-summary').hide();
      $('form').trigger('reset');
    }
  });

  Snipcart.subscribe('plan.removed', function() {
    if(Snipcart.api.plans.count() == 0){
      $('.snipcart-summary').hide();
      $('form').trigger('reset');
    }
  });

  Snipcart.subscribe('cart.opened', function() {
    var html = $("#cart-content-text").html();
    $(html).insertBefore($("#snipcart-step-content-shipping-address"));
  });

  Snipcart.subscribe('order.completed', function (order) {
    if(Snipcart.api.plans.count() > 0){
      //it means the order contains 1 or more plans
      var url = '/subscription-information/' + order.token;
      window.location.href = url;
    }
  });

  Snipcart.execute('config', 'show_continue_shopping', true);

  //  // Open links in new windows/tabs

  $('[rel="external"]').click( function() {
    window.open($(this).attr('href') );
    return false;
  });

  // FAQs

  $('.faq dd').hide();
  $('.faq .faq dt').click(function(){
    $('.faq dd').hide();
    $(this).next('dd').slideToggle();
  });
  if($('body').hasClass('faq')) {
    if(window.location.hash) {
      var hash = window.location.hash;
      $(hash).next('dd').show();
    }
  }

  // Shop

  var $totalPrice = parseFloat($('#button_order').attr('data-item-price'));

  $('#sub_type').on('change', function(){
    $('#button_sub,#button_order').toggleClass('hidden');
  });

  $('#sub_term').on('change', function(){
    var $term      = $(this).val(),
        $term_text = $(this).find(":selected").attr('data-term'),
        $agePrice  = $('#age_range').find(":selected").attr('data-term-'+$term);

    $('#initialPrice').text($agePrice);

    $('#subTerm').text($term_text);
    $('#button_sub').data('item-payment-interval-count',$term);
    $('#button_order').data('item-custom1-value',$term_text);
  });

  $('#sub_for').on('change', function(){
    $('#button_order').data('item-custom2-value',$(this).val());
  });

  $('#age_range').on('change', function(){
    $('#button_order').data('item-custom3-value',$(this).val());
    if($(this).val()!='Adult') {
      $('#difficulty').addClass('hidden');
    } else {
      $('#difficulty').removeClass('hidden');
    }
  });

  $('#difficulty').on('change', function(){
    $('#button_order').data('item-custom5-value',$(this).val());
  });
  $('#firstname').on('change', function(){
    $('#button_order').data('item-custom6-value',$(this).val());
  });
  $('#lastname').on('change', function(){
    $('#button_order').data('item-custom7-value',$(this).val());
  });
  $('#age').on('change', function(){
    $('#button_order').data('item-custom8-value',$(this).val());
  });
  $('#gender').on('change', function(){
    $('#button_order').data('item-custom9-value',$(this).val());
  });
  $('#info').on('change', function(){
    $('#button_order').data('item-custom10-value',$(this).val());
  });
  $('#message').on('change', function(){
    $('#button_order').data('item-custom11-value',$(this).val());
  });

  $('#button_order').on('click', function(){
    if($('#cat_disney').is(':checked')) {
      $totalPrice = $totalPrice + 10;
      $('#button_order').data('item-price',$totalPrice);
      console.log('Price: '+$('#button_order').data('item-price'));
    }
    var $categories = [];
    $.each($("[name='categories']:checked"), function(){
      $categories.push($(this).val());
    });
    $(this).data('item-custom4-value',$categories.join(', '));
  });

  //  // function mobileUpdates() {
  //  // }

  //  // $(window).resize(function() {
  //  //  mobileUpdates();
  //  // });

  //  // $(function() {
  //  //  mobileUpdates();
  //  // });

});