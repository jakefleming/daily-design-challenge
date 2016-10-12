// Utilities like random number generators
var tools = ( function($) {
  'use strict';
  return {

    start: function( val ) {

      // Prevent default behavior on dummy links
      $( 'a[href^="#"]' ).click( function(e) {
        e.preventDefault();
      });

      // Turn baseline grid on or off
      $( '.baseline-trigger' ).click( function() {
        $( this ).toggleClass( 'active' );
        $( 'body' ).toggleClass( 'baseline-grid-on', 'baseline-grid-off' );
      });

      // Smooth scroll
      $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
          if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 1000);
              return false;
            }
          }
        });
      });

    }

  };
})(jQuery);
