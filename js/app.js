var app = {
  currentLang:false,
  loadSection: function(){

  }
};
/*
    ROUTERS
*/

app.router = new (Backbone.Router.extend({
  routes: {
    "!en(/:currentSection)(/:subSection)": "langEn",
    "!es(/:currentSection)(/:subSection)": "langEs",
    "!gl(/:currentSection)(/:subSection)": "langGl",
    "!(:currentSection)(/:subSection)": "noLang",
    "": "noLang"
  },

  registerAnalytics: function(currentSection, subSection) {

    if( currentSection &&  subSection ) {
      ga('send', {
        'hitType': 'pageview',
        'page': location.pathname.match(/[^\/]+$/)[0]+"#!"+currentSection+"/" + subSection
      });
    }

  },

  langEn: function(currentSection, subSection) {
    this.registerAnalytics(currentSection, subSection);
    app.setLang('en');
    app.loadSection(currentSection, subSection);
  },
  langEs: function(currentSection, subSection) {
    this.registerAnalytics(currentSection, subSection);
    app.setLang('es');
    app.loadSection(currentSection, subSection);
  },
  langGl: function(currentSection, subSection) {
    this.registerAnalytics(currentSection, subSection);
    app.setLang('gl');
    app.loadSection(currentSection, subSection);
  },
  noLang: function(currentSection, subSection) {


    this.registerAnalytics(currentSection, subSection);
    if(currentSection && subSection) {
      app.router.navigate('!gl/'+currentSection+'/'+subSection, true);
    }
    else if(currentSection) {

      app.router.navigate('!gl/'+currentSection, true);
    }
    else {
      app.router.navigate('!gl', true);
    }

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
