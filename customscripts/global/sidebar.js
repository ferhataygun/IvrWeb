$(document).ready(function(){
  var sunucularItem     = jQuery(".menu-item-sunucular");
  var sipEndpointsItem  = jQuery(".menu-item-sipendpoints");
  var sipHesaplarItem   = jQuery(".menu-item-siphesaplar");
  var ivrProjectsItem   = jQuery(".menu-item-ivrprojects");
  var redirectsItem     = jQuery(".menu-item-yonlendirme");
  function addList(el, comp, template, type, targetType) {
    if(comp && comp.length) {
        el.find(".nav-link").append("<span class='arrow'></span>");
        el.append(template({ inFormData: comp, compType: type, targetType: targetType }));
    }
  }
  $.get('../customtemplates/sidebar.hbs', function (sidebarTemplate) {
      var template= Handlebars.compile(sidebarTemplate);
      $.ajax({
        'url' : window.appConfig.ip + 'SideBar/getSideBar',
        'type' : 'GET',
        'datatype' : "application/json",
        success : function(sidebarData) {
          window.ivrServers   = sidebarData.Servers;
          window.ivrEndpoints = sidebarData.Endpoints;
          window.ivrAccounts  = sidebarData.Accounts;
          addList(sunucularItem, sidebarData.Servers, template, "Server", "sunucular");
          addList(sipEndpointsItem, sidebarData.Endpoints, template, "Endpoint", "sipendpoints");
          addList(sipHesaplarItem, sidebarData.Accounts, template, "Account", "siphesaplar");
          addList(ivrProjectsItem, sidebarData.Projects, template, "Project", "ivrprojects");
          addList(redirectsItem, sidebarData.Routings, template, "Routing", "yonlendirme");
        },
        error : function(){

        }
      });
  }, 'html');

 
});
