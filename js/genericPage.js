
$(document).ready( function(){

  app.loadSection = function( section ){
    if( section ) {
      $('html, body').animate({
          scrollTop: $("#"+section).offset().top
      }, 1000);
    }
  }

  Backbone.history.start();
});
