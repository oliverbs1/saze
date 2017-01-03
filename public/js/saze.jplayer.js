var saze = saze || {};

// All relative to the player
saze.jplayer = {};

saze.jplayer.init = function(){
//  saze.jplayer.playNewSong('Beyond.mp3', 'Nujabes', 'Beyond');
//  saze.jplayer.playSong('Horizon.mp3', 'Nujabes', 'Horizon');
  saze.jplayer.tooglePlayPause();
}

saze.jplayer.playNewSong = function(fileName, artist, title){
  var jPlayer = '#jquery_jplayer';
  var jPlayerContainer = '#jp_container';
  if($(jPlayer).data().jPlayer !== undefined) $(jPlayer).jPlayer("destroy");
  $(jPlayer).jPlayer({
    ready: function(){
      $(this).jPlayer("setMedia", {
        title: artist+" - "+title,
        mp3: "/tracks/"+fileName
      }).jPlayer('play');
    },
    cssSelectorAncestor: jPlayerContainer,
    cssSelector: {
      play: ".jp-play",
      pause: ".jp-pause",
      seekBar: ".jp-seek-bar",
      playBar: ".jp-play-bar",
      mute: ".jp-mute",
      volumeBar: ".jp-volume-bar",
      volumeBarValue: ".jp-volume-bar-value",
      volumeMax: ".jp-volume-max",
      currentTime: ".jp-current-time",
      duration: ".jp-duration",
      title: ".jp-title",
      repeat: ".jp-repeat",
      gui: ".jp-gui",
      noSolution: ".jp-no-solution",

      videoPlay: "",
      stop: "",
      unmute: "",
      playbackRateBar: "",
      playbackRateBarValue: "",
      fullScreen: "",
      restoreScreen: "",
      repeatOff: ""
    },
    swfPath: "/lib/jplayer/jquery.jplayer.swf",
    supplied: "mp3",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: false,
    remainingDuration: true,
    toggleDuration: true
  });
}
saze.jplayer.tooglePlayPause = function(){
  // SET THE PLAYER TO PAUSE
  $('#jp_container').on('click', '.fa-play', function(){
    $(this).removeClass('fa-play').addClass('fa-pause');
    var vinylAngle = saze.jplayer.getRotationDegrees('#vinyl-center');
    $('#vinyl-center').removeClass('infinite-rotate');
    saze.jplayer.rotate('#vinyl-center', vinylAngle);
  });
  // SET THE PLAYER TO PLAY
  $('#jp_container').on('click', '.fa-pause', function(){
    $(this).removeClass('fa-pause').addClass('fa-play');
    // $('#vinyl-center').addClass('infinite-rotate');
    var duration = (2000 / 360) * (360 - saze.jplayer.getRotationDegrees('#vinyl-center'));
    console.log(duration);
    saze.jplayer.rotateAnimate('#vinyl-center', 360, duration);
  });
}
saze.jplayer.getRotationDegrees = function(selector) {
  var matrix = $(selector).css("-webkit-transform") ||
  $(selector).css("-moz-transform") ||
  $(selector).css("-ms-transform") ||
  $(selector).css("-o-transform") ||
  $(selector).css("transform");
  if(matrix !== 'none') {
      var values = matrix.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
  }
  else var angle = 0;
  return (angle < 0) ? angle + 360 : angle;
}
// STATIC ROTATION
saze.jplayer.rotate = function(selector, degrees){
  $(selector).css({
    '-webkit-transform' : 'rotate('+ degrees +'deg)',
    '-moz-transform' : 'rotate('+ degrees +'deg)',
    '-o-transform' : 'rotate('+ degrees +'deg)',
    '-ms-transform' : 'rotate('+ degrees +'deg)',
    'transform' : 'rotate('+ degrees +'deg)'
  });
}
// ANIMATE ROTATE
saze.jplayer.rotateAnimate = function(selector, endAngle, duration){
  var startAngle = saze.jplayer.getRotationDegrees(selector);
  if(duration === null) duration = 2000;
  $({deg: startAngle}).animate({deg: endAngle}, {
      duration: 2000,
      easing: 'linear',
      step: function(now){
        $(selector).css({
          '-webkit-transform' : 'rotate('+ now +'deg)',
          '-moz-transform' : 'rotate('+ now +'deg)',
          '-o-transform' : 'rotate('+ now +'deg)',
          '-ms-transform' : 'rotate('+ now +'deg)',
          'transform' : 'rotate('+ now +'deg)'
        });
      }
  });
  console.log(true);
}
