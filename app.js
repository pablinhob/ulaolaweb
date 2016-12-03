var app = {
  currentLang:false,
  currentSection:false
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
    app.currentSection = currentSection;
  },
  langEs: function(currentSection) {
    app.setLang('es');
    app.currentSection = currentSection;
  },
  langGl: function(currentSection) {
    app.setLang('gl');
    app.currentSection = currentSection;
  },
  noLang: function() {
    app.router.navigate('gl', true);
  }

}));

/*
    VIEWS
*/

app.setLang = function(lang) {

  app.currentLant = lang;
  $.getJSON( "data/i18n_" + lang + ".json", function( data ) {
  	$.i18n.load( data );

    $('.i18n').each( function (i,e) {
      if( $(e).attr('originalText') ) {
        var originalText = $(e).attr('originalText');
      }
      else {
        var originalText = $(e).html();
        $(e).attr('originalText', originalText);
      }
      $(e).html( $.i18n._( originalText ) );
    });
  });

  // change selector
  $('.langSelector button').html( lang + ' <span class="caret"></span>' );
}


$(document).ready( function(){
  Backbone.history.start();
});
