var saze = saze || {};

// All the interactions with the HTML DOM
saze.dom = {};

saze.dom.init = function(){
  if(window.location.pathname === '/') saze.dom.index();
  if(window.location.pathname !== '/') saze.dom.playerAside();
}
// DOM of 'index' Page
saze.dom.index = function(){
  function expendLogin() {
      document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
      document.querySelector('.cont_form_login').style.display = "block";
      document.querySelector('.cont_form_sign_up').style.opacity = "0";
      setTimeout(function () {
          document.querySelector('.cont_form_login').style.opacity = "1";
      }, 400);
      setTimeout(function () {
          document.querySelector('.cont_form_sign_up').style.display = "none";
      }, 200);
  }
  function expendSignup() {
      document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
      document.querySelector('.cont_form_sign_up').style.display = "block";
      document.querySelector('.cont_form_login').style.opacity = "0";
      setTimeout(function () {
          document.querySelector('.cont_form_sign_up').style.opacity = "1";
      }, 100);
      setTimeout(function () {
          document.querySelector('.cont_form_login').style.display = "none";
      }, 400);
  }
  function contractAll() {
      document.querySelector('.cont_forms').className = "cont_forms";
      document.querySelector('.cont_form_sign_up').style.opacity = "0";
      document.querySelector('.cont_form_login').style.opacity = "0";
      setTimeout(function () {
          document.querySelector('.cont_form_sign_up').style.display = "none";
          document.querySelector('.cont_form_login').style.display = "none";
      }, 500);
  }

  $('.btn_login').click(expendLogin);
  $('.btn_sign_up').click(expendSignup);
  $('.cont_form_login>a').click(contractAll);
  $('.cont_form_sign_up>a').click(contractAll);
}

saze.dom.playerAside = function(){
  function setVinylMargin(){
    var value = $('#vinyl').height() + 20;
    $('#vinyl-container').css('margin-bottom', value);
  }
  setVinylMargin();
}
