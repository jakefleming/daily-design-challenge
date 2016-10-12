// IIFE
(function ($, window, document, undefined) {
  'use strict';

  /* globals
     config,
     tools,
     testimonials,
     bookSite
  */

  // Set basics up
  tools.start();

  // Start testimonials cycling
  setInterval(function(){ testimonials.cycle(); }, config.testimonialCycleSpeed);

  // Do stuff for the the reading site
  bookSite.start();

})(jQuery, window, document);
