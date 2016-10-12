var bookSite = ( function($) {
  'use strict';

  /* globals
     ScrollMagic
  */

  return {
    start: function() {

      var topNavOffset = 40;
      var headerHeight = $( '.header' ).height();
      var topOfContentArea = headerHeight - topNavOffset;

      // Prevent default behavior on dummy links
      $( 'a[href^="#"]' ).click( function(e) {
        e.preventDefault();
      });

      // Make the header CTA the same width as the help button beneath. This is
      // strictly because I'm a design nerd and serves no functional purpose.
      // $( '.header .cta' ).css({ 'width': $( '#help').outerWidth() });

      function closePanel() {
        $( '.nav-trigger' ).removeClass( 'active' );
        $( '.wrapper' ).removeClass( 'toc is-open' );
      }

      function openPanel() {
        $( '#toc' ).addClass( 'active' );
        $( '.wrapper' ).addClass( 'toc is-open');
      }

      // Logic for the side nav button triggers
      $( '.nav-trigger' ).click( function() {
        var clicked = $( this ).attr( 'id' );
        var wrap = $( '.wrapper' );

        if( clicked === 'toc' ) {
          if( wrap.hasClass( 'is-open' ) ) {
            closePanel();
          } else {
            openPanel();
          }
        }
      });

      // Close overlays on click
      $( '.overlay' ).click( function() {
        if( $( '.wrapper').hasClass( 'is-open') ) {
          closePanel();
        }
      });

      // Close all side menus on ESC keydown
      $( document ).keydown( function(e) {
        if( e.keyCode === 27 ) {
          if( $( '.wrapper').hasClass( 'is-open') ) {
            closePanel();
          }
        }
      });

      // Turn baseline grid on or off
      $( '.baseline-trigger' ).click( function() {
        $( this ).toggleClass( 'active' );
        $( 'body' ).toggleClass( 'baseline-grid-on', 'baseline-grid-off' );
      });

      $( document ).ready( function() {

        var controller   = new ScrollMagic.Controller();

        var topNav = new ScrollMagic.Scene({
          offset: topNavOffset
        })
        .setPin( '.header', { pushFollowers: false } )
        .setClassToggle( 'body', 'header--compressed' )
        .addTo( controller );

        try {
            var toc        = new ScrollMagic.Scene({
              offset: $( '.table-of-contents' ).offset().top - topOfContentArea
            })
            .setClassToggle( '.sidebar', 'sidebar--fixed' )
            .addTo( controller );
        } catch (err) {
            // ignored, we're mostly just avoiding this on the non-book site
        }

        $( window ).resize( function() {
          // Do stuff on resize
        });
      });


    }
  };
})(jQuery);
