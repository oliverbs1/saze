var saze = saze || {};

// All the initialisation of components
saze.init = function(){
  saze.dom.init();
  if(saze.jplayer !== undefined) saze.jplayer.init();
};