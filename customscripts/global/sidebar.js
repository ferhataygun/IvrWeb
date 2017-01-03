$(document).ready(function(){
  var sunucularItem     = jQuery(".menu-item-sunucular");
  var sipEndpointsItem  = jQuery(".menu-item-sipendpoints");
  var sipHesaplarItem   = jQuery(".menu-item-siphesaplar");
  var ivrProjectsItem   = jQuery(".menu-item-ivrprojects");
  var redirectsItem     = jQuery(".menu-item-yonlendirme");
  function addList(el,comp,template){
    if(comp && comp.length){
      el.find(".nav-link").append("<span class='arrow'></span>")
      el.append(template(comp));
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
          addList(sunucularItem,sidebarData.Servers,template);
          addList(sipEndpointsItem,sidebarData.Endpoints,template);
          addList(sipHesaplarItem,sidebarData.Accounts,template);
          addList(ivrProjectsItem,sidebarData.Projects,template);
          addList(redirectsItem,sidebarData.Routings,template);
        },
        error : function(){

        }
      });
  }, 'html');
  $(".addComponent").on("click", function(){
    var targetComp = $(this).attr("data-target");
    var targetType = $(this).attr("data-Type");
    var targetClass = $(".menu-item-"+targetComp);
      $.ajax({
          url : window.appConfig.ip + targetType + "/add" + targetType,
          type: "POST",
          data: { "Name": "New " + targetType },
          success: function(data, textStatus, jqXHR){
              var toAddEl = "<li class='nav-item sidebarComponentLi cont" + targetType + "' style='position:relative; margin-left: 20px'><a href='#' class='nav-link menu-comp1 sidebarComponent' data-id='" + data + "' data-type='" + targetType + "'><span class='title'>New " + targetType + "</span></a>";
            if(targetClass.find(".sub-menu").length){
              targetClass.find(".sub-menu").append(toAddEl);
            }else{
              targetClass.append("<ul class='sub-menu'>"+toAddEl+"</ul>");
            }
            if(!targetClass.hasClass('open')){
              targetClass.find('.nav-link').not(".menu-comp1").trigger("click");
            }
          },
          error: function (jqXHR, textStatus, errorThrown){}
      });
  });
});
