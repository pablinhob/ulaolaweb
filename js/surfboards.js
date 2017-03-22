

var surfboards = new (Backbone.View.extend({



  el: "#surfboardsContent",
  template: _.template( $('#surfboardTemplate').html() ),

  events: {
/*    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"*/
  },


  data:false,
  currentSerie:false,
  currentSurfboard: false,

  selectNoserie: function() {
    var that = this;

    var serie = that.data.defaultSerie;
    eval('var surfboard = that.data.series.'+serie+'.defaultBoard;');
    app.router.navigate( '#'+app.currentLang + '/'+that.data.defaultSerie+'/'+surfboard , {trigger: true, replace: true});
  },

  selectSerie: function( serie ) {
    var that = this;

    eval('var surfboard = that.data.series.'+serie+'.defaultBoard;');

    app.router.navigate( '#'+app.currentLang + '/'+serie+'/'+surfboard, {trigger: true, replace: true});
  },
  selectSurfoard: function( serie, surfboard ) {
    var that = this;
    that.currentSerie = serie;
    that.currentSurfboard = surfboard;

    that.render();
    window.scrollTo(0, 0);
  },
  loadData: function( onLoad ) {
    var that = this;
    $.getJSON( "data/surfboards.json", function( data ) {
      that.data = data;
      onLoad();
    });

  },


  cmToFeets: function( valueCm ) {
      var inches = ( valueCm *0.393700787).toFixed(0);
      var feet = Math.floor(inches / 12);
      inches %= 12;
      return feet + "' " + inches + '"';
  },

  cmToInches: function( valueCm ) {
      var inches = ( valueCm *0.393700787).toFixed(0);
      return inches + '"';
  },


  render: function() {
    var that = this;

      eval('var surfboard = that.data.series.' + that.currentSerie + '.boards.' + that.currentSurfboard );
      eval('var serie = that.data.series.' + that.currentSerie );

    if( typeof serie != 'undefined' && typeof surfboard != 'undefined' ) {
      that.$el.html( that.template({surfboard:surfboard, serie:serie, serieId:that.currentSerie, surfboardId: that.currentSurfboard }) );

      // Click foto
      $('.foto img').click(function(el){
        var boardImg = $($(el.target)[0]);
        var boardImgSrc = boardImg.attr('src').split("_");

        if( boardImgSrc[1] == '1.jpg') {
           boardImg.attr('src', boardImgSrc[0] + '_2.jpg' );
        }
        else {
           boardImg.attr('src', boardImgSrc[0] + '_1.jpg' );
        }

      });

      // Click boton rotar
      $('.reverseSurfboard').click(function(el){
        var boardImg = $($(el.target).next()[0]);
        var boardImgSrc = boardImg.attr('src').split("_");

        if( boardImgSrc[1] == '1.jpg') {
           boardImg.attr('src', boardImgSrc[0] + '_2.jpg' );
        }
        else {
           boardImg.attr('src', boardImgSrc[0] + '_1.jpg' );
        }

      });
    }
    else {
      that.selectNoserie();
    }



  }





}));



$(document).ready( function(){


  surfboards.loadData( function() {
    app.loadSection = function( section, subsection ){
      if( section && subsection ){
        //alert("serie "+section+" tabla" + subsection);
        surfboards.selectSurfoard( section, subsection );
      }
      else
      if( section ) {
        surfboards.selectSerie( section );
      }
      else {
        surfboards.selectNoserie( );
      }
    }
    Backbone.history.start();
  });


});
