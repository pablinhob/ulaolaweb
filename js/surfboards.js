

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
    app.router.navigate( '#'+app.currentLang + '/serie/subserie' , true);
  },

  selectSerie: function( serie ) {
    var that = this;
    app.router.navigate( '#'+app.currentLang + '/serie/subserie' , true);
  },
  selectSurfoard: function( serie, loadSurfoard ) {
    var that = this;
    that.render();
  },
  loadData: function( onLoad ) {
    var that = this;
    $.getJSON( "data/surfboards.json", function( data ) {
      that.data = data;
      onLoad();
    });

  },

  render: function() {
    var that = this;
    //that.$el.html( that.template({}) );
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
