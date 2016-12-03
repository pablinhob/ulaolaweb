var app = {};
/*
    ROUTERS
*/

app.router = new (Backbone.Router.extend({

  routes: {
    "en": "langEn",
    "es": "langEs",
    "gl": "langGl",
    "": "noLang"
  },

  langEn: function() {
    app.setLang('en');
  },
  langEs: function() {
    app.setLang('es');
  },
  langGl: function() {
    app.setLang('gl');
  },
  noLang: function() {
    app.router.navigate('gl', true);
  }

}));

/*
    VIEWS
*/

app.setLang = function(lang) {
  //console.log($('.langSelector button'))
  $('.langSelector button').html( lang + ' <span class="caret"></span>' );
}





$(document).ready( function(){
  console.log(app.rounter);
  Backbone.history.start();
});
