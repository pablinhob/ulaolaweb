var app = {
  currentLang:false,
  loadSection: function(){}
};
/*
    ROUTERS
*/

app.router = new (Backbone.Router.extend({

  routes: {
    "en(/:currentSection)": "langEn",
    "es(/:currentSection)": "langEs",
    "gl(/:currentSection)": "langGl",
    "": "noLang"
  },

  langEn: function(currentSection) {
    app.setLang('en');
    app.loadSection(currentSection);
  },
  langEs: function(currentSection) {
    app.setLang('es');
    app.loadSection(currentSection);
  },
  langGl: function(currentSection) {
    app.setLang('gl');
    app.loadSection(currentSection);
  },
  noLang: function() {
    app.router.navigate('gl', true);
  }

}));

/*
    VIEWS
*/

app.setLang = function(lang) {

  app.currentLang = lang;
  $.getJSON( "data/i18n_" + lang + ".json", function( data ) {
  	$.i18n.load( data );

    $('.i18nContent').each( function (i,e) {
      if( $(e).attr('originalText') ) {
        var originalText = $(e).attr('originalText');
      }
      else {
        var originalText = $(e).html();
        $(e).attr('originalText', originalText);
      }
      $(e).html( $.i18n._( originalText ) );
    });

    $('.i18nLink').each( function (i,e) {
      if( $(e).attr('originalLink') ) {
        var originalLink = $(e).attr('originalLink');
      }
      else {
        var originalLink = $(e).attr('href');
        $(e).attr('originalLink', originalLink);
      }
      $(e).attr('href', $.i18n._( originalLink ) );
    });

  });

  // change selector
  $('.langSelector button').html( lang + ' <span class="caret"></span>' );
}


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
