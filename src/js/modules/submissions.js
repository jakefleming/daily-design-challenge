var submissions = ( function($) {
  'use strict';

  /* globals
     briefcase
  */

  return {
    buildLeaderboard: function() {

      function leaderboard( submissions ) {
        var size = submissions.length;
        var lbPeople = [];

        var names = {};
        var nameSpelling = {};

        for( var i = 0; i < size; i++ ) {
          var name = submissions[i].categories[0].value;

          var timestamp = submissions[i].title;
          var timestamps = names[name.toLowerCase()] = names[name.toLowerCase()] || [];

          nameSpelling[name.toLowerCase()] = name;
          timestamps.push(timestamp);
          lbPeople.push( name );
        }

        for (var name in names) {
          var timestamps = names[name];
          var fullName = nameSpelling[name];

          document.getElementById('leaderboard').innerHTML += '<div class="card">' + fullName + '<span class="badge float-right">' + 5000 + '</span></div>';
        }

        // $('#leaderboard').text( leaderData );

        $('.leaderboard-spinner').hide();
        $('.leaderboard-loaded').show();
      }

      briefcase.getJSON({
        id:               '1pVBmbohQ9whiCUcpnUTgZpKu1MBYP9fM29lDPZ5maUE',
        type:             'form',
        leftColumnTitle:  'timestamp'
      }, leaderboard);

    }
  };
})(jQuery);
