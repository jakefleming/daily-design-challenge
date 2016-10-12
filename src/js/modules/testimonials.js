var testimonials = ( function($) {
  'use strict';
  return {
    cycle: function() {

      var quoteContainer = $('.social-proof');

      // Run once for every quote block on the page
      quoteContainer.each( function() {
        var bQ = $(this).find('blockquote');
        var curBQ = $(this).find('.visible');
        var newBQIndex = Math.floor( Math.random() * bQ.length );
        var newBQ = bQ[newBQIndex];

        $(curBQ).removeClass('visible');
        $(newBQ).addClass('visible');

      });

    }
  };
})(jQuery);
