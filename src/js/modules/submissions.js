var submissions = ( function($) {
  'use strict';

  /* globals
     briefcase
  */

  return {
    buildLeaderboard: function() {

      function leaderboard( submissions ) {
        var size = submissions.length;
        var lbName = [];

        for( var i = 0; i < size; i++ ) {
          lbName.push( submissions[i].categories[0].value );
        }

        for( var j = 0; j < size; j++ ) {
          document.getElementById('leaderboard').innerHTML += '<li>' + lbName[j] + '</li>';
        }

        // $('#leaderboard').text( leaderData );

        $('.leaderboard-spinner').hide();
        $('.leaderboard-loaded').show();
      }

      briefcase.getJSON({
        id:               "1pVBmbohQ9whiCUcpnUTgZpKu1MBYP9fM29lDPZ5maUE",
        type:             "form",
        leftColumnTitle:  "timestamp"
      }, leaderboard);

    }
  };
})(jQuery);
