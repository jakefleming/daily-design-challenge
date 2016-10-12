// IIFE
(function ($, window, document, undefined) {
  'use strict';

  /* globals
     config,
     tools,
     challenge,
     submissions
  */

  // Set basics up
  tools.start();

  window.onload = function() {
    // Get a new challenge
    challenge.updateChallenge();

    // Build the leaderboard
    submissions.buildLeaderboard();
  }

})(jQuery, window, document);
