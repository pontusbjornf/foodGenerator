// var vueApplication = new Vue({
//     el: "#app_basic",
//     data: {
//       message: `🐵 Hello World ${new Date().toLocaleString()}🔮`,
//     },
//   })
  /* =================================================================== Jqurey Menu ==================================================================== */
  $(function() {
    $('body').addClass('js');
  
    var $hamburger = $('.hamburger'),
        $nav = $('#site-nav'),
        $masthead = $('#masthead');
  
    $hamburger.click(function() {
      $(this).toggleClass('is-active');
      $nav.toggleClass('is-active');
      $masthead.toggleClass('is-active');
      return false; 
    })
});
  /* =================================================================== Jqurey Menu ends ==================================================================== */
  /* =================================================================== Get recepi ==================================================================== */










    /* =================================================================== Get recepi ends ==================================================================== */