function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = "; expires=" + date.toUTCString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

jQuery(document).ready(function(){

  /* App Configs */
  window.appConfig = {
    ip: 'http://localhost:8080/api/',
    isLogin: readCookie("isLogin"),
    username: readCookie("username"),
    password: readCookie("password"),
    token:readCookie("token"),
  }

  if(window.appConfig.isLogin){
    $.ajaxSetup({
      headers: { 'ApplicationToken': window.appConfig.token  }
    });
  }

try{
  /* Custom Handlebars Functions */
  Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
  });
}catch(err){

}
});
