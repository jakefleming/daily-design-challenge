var submissions = ( function($) {
  'use strict';

  /* globals
     briefcase
  */

  return {
    buildLeaderboard: function() {

      function leaderboard( submissions ) {
        // Count number of all submissions
        var size = submissions.length;

        // Init array, which will eventually have one item per person
        var lbPeople = [];

        // Object to hold unique names
        var names = {};

        // ?
        var displayName = {};

        // For every single submission row...
        for( var i = 0; i < size; i++ ) {
          // Local variable to hold first and last names of the submission
          var fName = submissions[i].categories[0].value;
          var lName = submissions[i].categories[1].value;

          // Local variable to hold the date of the submission
          var timestamp = submissions[i].title;

          // Object which holds all submissions for a given first Name
          var timestamps = names[fName.toLowerCase()] = names[fName.toLowerCase()] || [];

          // Object that stores the display name
          displayName[fName.toLowerCase()] = fName + ' ' + lName;
          timestamps.push(timestamp);
          lbPeople.push( name );
        }

        for (var name in names) {
          var timestamps = names[name];
          var fullName = displayName[name];

          document.getElementById('leaderboard').innerHTML += '<div class="card submission">' + fullName + '<span class="badge float-right">' + 5000 + '</span></div>';
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
