var saze = saze || {};

// All relative to the player
saze.jplayer = {};

saze.jplayer.init = function(){
//  saze.jplayer.playNewSong('Beyond.mp3', 'Nujabes', 'Beyond');
//  saze.jplayer.playSong('Horizon.mp3', 'Nujabes', 'Horizon');
};

saze.jplayer.playNewSong = function(fileName, artist, title){
  var jPlayer = '#jquery_jplayer_1';
  var jPlayerContainer = '#jp_container_1';
  if($(jPlayer).data().jPlayer !== undefined) $(jPlayer).jPlayer("destroy");
  $(jPlayer).jPlayer({
    ready: function(){
      $(this).jPlayer("setMedia", {
        title: artist+" - "+title,
        mp3: "/tracks/"+fileName
      }).jPlayer('play');
    },
    cssSelectorAncestor: jPlayerContainer,
    swfPath: "/lib/jplayer/jquery.jplayer.swf",
    supplied: "mp3",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: false,
    remainingDuration: true,
    toggleDuration: true
  });
//  $('#jquery_jplayer_1').jPlayer('play');
//  $(jPlayer).jPlayer('play');
}