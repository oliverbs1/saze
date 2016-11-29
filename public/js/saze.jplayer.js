var saze = saze || {};

saze.jplayer = function(){
 $(function(){
    $("#jquery_jplayer_1").jPlayer({
      ready: function () {
        $(this).jPlayer("setMedia", {
          title: "Bubble",
          mp3: "http://mixtapemonkey.com/mixtapes/zip/642/Logic%20-%20Young%20Sinatra%20Welcome%20To%20Forever/04%20-%205AM%20(Prod%20by%20C-Sick).mp3"
        });
      },
      cssSelectorAncestor: "#jp_container_1",
      swfPath: "/lib/jplayer/jquery.jplayer.swf",
      supplied: "mp3",
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: false,
      remainingDuration: true,
      toggleDuration: true
    });
//   $('#page2').on('pagebeforeshow', function (e, data) {
//    alert(data.prevPage.attr('id'));
//   });
//   $(document).bind("pageshow", function( event, ui ){
//     console.log('A page has changed!');
//   };
  });
}