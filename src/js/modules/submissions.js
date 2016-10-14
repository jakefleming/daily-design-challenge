var designSubmissions = ( function($) {
  'use strict';

  /* globals
     briefcase
  */

  return {
    buildLeaderboard: function() {

      function leaderboard( submissions ) {
        // Count number of all submissions
        var length = submissions.length;

        // One item per person
        var people = {};

        // Go through each row, adding a single item to a name array for every unique name found
        // Then: have an array of timestamps, specific to that person
        // Each: containing a display name, URL, and UI kit info
        /*
        - person 1
          - date 1
            - date
            - display name
            - URL
            - uikit
          - date 2
        - person 2
          - date 1
        - person 3
          - date 1
        */

        // For every single submission row...
        for( var i = 0; i < length; i++ ) {
          var fName        = submissions[i].categories[0].value;
          var lName        = submissions[i].categories[1].value;
          var nameSlug     = fName.toLowerCase()+'_'+lName.toLowerCase();

          // The stuff to add to each timestamp
          // console.log('title: '+submissions[i].title);
          var timestamp    = new Date(submissions[i].title);
          var displayName  = fName + ' ' + lName;
          var url          = submissions[i].categories[2].value;
          var uikit        = submissions[i].categories[3].value;

          // Object which holds all dates in the array, if a date exists
          // var personData = people[nameSlug] = people[nameSlug] || [];
          if( !people[nameSlug] ) {
            people[nameSlug] = {
              timestamps: [timestamp],
              slug: nameSlug,
              name: displayName,
              url: url,
              uikit: uikit
            };
          } else {
            people[nameSlug].timestamps.push(timestamp);
          }

        }

        for( var personName in people ) {
          var person = people[personName];
          document.getElementById('leaderboard').innerHTML += '<div class="card submission"><span class="lb-name">' + person.name + '</span>&nbsp;<a href="'+ person.url  +'" class="lb-link">Last Challenge</a><span class="badge float-right">' + designSubmissions.calculatePoints(person.timestamps) + '</span></div>';
        }

        $('.leaderboard-spinner').hide();
        $('.leaderboard-loaded').show();
      }

      briefcase.getJSON({
        id:               '1pVBmbohQ9whiCUcpnUTgZpKu1MBYP9fM29lDPZ5maUE',
        type:             'form',
        leftColumnTitle:  'timestamp'
      }, leaderboard);

    },
    calculatePoints: function( timestamps ) {
      var daysInARow = designSubmissions.getStreaks( timestamps );

      // for all daysInARow,
        // var multiplier = currentStreak < 7
          // ? 1
          // : currentStreak < 14
            // ? 2
        // < 14 = streak * multiplier
        // var totalPoints += numPoints * multiplier

      return daysInARow;
    },
    getStreaks: function( timestamps ) {
      var streakLength = 1;
      var streakLengths = [];
      timestamps = timestamps.sort(function(a, b){
        return a - b;
      });

      // Foreach item in timestamps array, compare 2 timestamps
      for( var i = 1; i < timestamps.length; i++ ) {
        // console.log('timestamp: ' + i);
        // console.log('    current: ', timestamps[i] , '; previous: ' , timestamps[i-1] , '; diff: ' , (timestamps[i] - timestamps[i-1]) / (1000*60*60*24));
        if( (timestamps[i] - timestamps[i-1]) / (1000*60*60*24) <= 1 ) {
          // console.log('  timestamp is less than or equal to 1 day');
          if( timestamps[i].getDay() - timestamps[i-1].getDay() == 1 ) {
            streakLength++;
            // console.log('    today and yesterday are equal to 1, so increment streakLength: ' + streakLength);
          } else if( timestamps[i].getDay() == 0 && timestamps[i-1].setTime(timestamps[i-1].getTime() + (1000*60*60*24)).getDay() == 0 ) {
            streakLength++;
            // console.log('    today and yesterday are equal to 1 and it is january 1st, so increment streakLength: ' + streakLength);
          } else {
            streakLengths.push(streakLength);
            streakLength = 1;
          }
        } else {
          streakLengths.push(streakLength);
          streakLength = 1;
        }
      }

      if( streakLength > 0 ) {
        streakLengths.push(streakLength);
      }

      var currentStreak = streakLengths[streakLengths.length - 1];
      return currentStreak;
    }

  };
})(jQuery);
