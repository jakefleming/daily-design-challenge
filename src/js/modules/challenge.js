var challenge = ( function($) {
  'use strict';

  /* globals
     briefcase
  */

  return {
    updateChallenge: function() {

      function replaceText( challenges ) {
        var size = challenges.length;
        var randomChallenge = Math.floor( ( Math.random() * size ) );

        $('#challengeText').text( challenges[randomChallenge].categories[0].value );
        $('#authorText').text( challenges[randomChallenge].categories[1].value );

        $('.challenge-spinner').hide();
        $('.challenge-loaded').show();
      }

      briefcase.getJSON({
        id:               "1O0QnHxMwqNJ_axtXogqx6i9lVpCR-fDffqHrrIdDDJ8",
        type:             "form",
        leftColumnTitle:  "timestamp"
      }, replaceText);

    }
  };
})(jQuery);
