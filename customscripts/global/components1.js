$(document).ready(function(){
  $("body").on("click", ".menu-comp1", function () {
    var $this = $(this);
    setTimeout(function(){
      var compId = $this.attr('data-id');
      $('.menu-comp2').parent().removeClass('active');
      $('.menu-comp1').parent().removeClass('active');
      $this.parent().addClass('active');
      $("#treeHolder").remove();
      $("#lastTreeMenuId").val('');
      var targetCtype = $this.attr("data-type");
        if (targetCtype != "Project") {
            $("#popUpTree").hide();
        }
      var resultObj   = {};
      switch (targetCtype) {
        case 'Server':
          resultObj = {
            Type: "Server",
            icon: "fa fa-server"
          }
          break;
        case 'Endpoint':
          resultObj = {
            Type: "Endpoint",
            icon: "icon-puzzle"
          }
          break;
          case 'Account':
          resultObj = {
            Type: "Account",
            icon: "fa fa-user"
          }
          break;
        case 'Routing':
          resultObj = {
            Type: "Routing",
            icon: "fa fa-long-arrow-right"
          }
          break;
        case 'Project':
          resultObj = {
            Type: "Project",
            icon: "fa fa-volume-up"
          }
          break;
      }
      $.get('../customtemplates/'+targetCtype+'.hbs', function (comp1Template) {
          var template= Handlebars.compile(comp1Template);
          $.ajax({
              'url': window.appConfig.ip + targetCtype + "/get" + targetCtype + "/" + compId,
              'type': 'GET',
              'datatype': "application/json",
              success: function(comp1Data) {
                  $.ajax({
                      async: false,
                      'url': window.appConfig.ip + 'SideBar/getSideBar',
                      'type': 'GET',
                      'datatype': "application/json",
                      success: function(sidebarData) {
                          resultObj.ivrServers = sidebarData.Servers;
                          resultObj.ivrEndpoints = sidebarData.Endpoints;
                          resultObj.ivrAccounts = sidebarData.Accounts;
                      },
                      error: function() {

                      }
                  });
                  if (targetCtype === "Server") {
                      window.selectedAccountsforServer = [];
                      $.each(resultObj.ivrEndpoints, function(index, item) {
                          if (comp1Data.Endpoints.indexOf(item.Id) !== -1) {
                              window.selectedAccountsforServer.push(item.Id);
                          }
                      });
                  }
                  if (targetCtype === "Routing") {
                      window.selectedAccountsforRouting = [];
                      $.each(resultObj.ivrAccounts, function(index, item) {
                          if (comp1Data.Accounts.indexOf(item.Id) !== -1) {
                              window.selectedAccountsforRouting.push(item.Id);
                          }
                      });
                      var startDate = new Date(comp1Data.StartDate);
                      var endDate = new Date(comp1Data.StopDate);
                      var startTime = new Date(comp1Data.StartTime);
                      var endTime = new Date(comp1Data.StopTime);
                      comp1Data.startToShowDate = startDate.getMonth() + 1 + "." + startDate.getUTCDate();
                      comp1Data.endToShowDate = endDate.getMonth() + 1 + "." + endDate.getUTCDate();
                      comp1Data.startToShowTime = startTime.getUTCHours() + ":" + startTime.getUTCMinutes();
                      comp1Data.endToShowTime = endTime.getUTCHours() + ":" + endTime.getUTCMinutes();
                      $("body").on("change", ".hasDayCheckbox", function() {
                          var $checkBox = $(this);
                          var isChecked = $checkBox.is(":checked");
                          if (isChecked) {
                              $("input.hasDayVar").prop("disabled", false);
                          } else {
                              $("input.hasDayVar").prop("disabled", true);
                          }
                      });

                      $("body").on("change", ".hasDateRangeCheckbox", function() {
                          var $checkBox = $(this);
                          var isChecked = $checkBox.is(":checked");
                          if (isChecked) {
                              $("input.hasDateRangeVar").prop("disabled", false);
                          } else {
                              $("input.hasDateRangeVar").prop("disabled", true);
                          }
                      });

                      $("body").on("change", ".hasTimeRangeCheckbox", function() {
                          var $checkBox = $(this);
                          var isChecked = $checkBox.is(":checked");
                          if (isChecked) {
                              $("input.hasTimeRangeVar").prop("disabled", false);
                          } else {
                              $("input.hasTimeRangeVar").prop("disabled", true);
                          }
                      });
                  }
                  if (targetCtype === "Project") {
                      window.selectedServersforProject = [];
                      $.each(resultObj.ivrServers, function(index, item) {
                          if (comp1Data.Servers.indexOf(item.Id) !== -1) {
                              window.selectedServersforProject.push(item.Id);
                          }
                      });
                      $(".treeHeaderProjectText").text("IVR Project Design - " + comp1Data.Name);
                      window.makeTreeView(comp1Data.TreeData);
                      window.IvrProjectName = comp1Data.Name;
                      window.IvrProjectId = compId;
                  }
                  /* Endpoint Integration */
                  if (targetCtype === "Endpoint") {
                      window.selectedAccountsforEndpoint = [];
                      $.each(resultObj.ivrAccounts, function(index, item) {
                          if (comp1Data.Accounts.indexOf(item.Id) !== -1) {
                              window.selectedAccountsforEndpoint.push(item.Id);
                          }
                      });
                      $("body").on("change", ".hasTcpCheckbox", function() {
                          var $checkBox = $(this);
                          var isChecked = $checkBox.is(":checked");
                          if (isChecked) {
                              $("input[name='TcpPort']").prop("disabled", false);
                              $("input[name='TcpIp']").prop("disabled", false);
                          } else {
                              $("input[name='TcpPort']").prop("disabled", true);
                              $("input[name='TcpIp']").prop("disabled", true);
                          }
                      });

                      $("body").on("change", ".hasUdpCheckbox", function() {
                          var $checkBox = $(this);
                          var isChecked = $checkBox.is(":checked");
                          if (isChecked) {
                              $("input[name='UdpPort']").prop("disabled", false);
                              $("input[name='UdpIp']").prop("disabled", false);
                          } else {
                              $("input[name='UdpPort']").prop("disabled", true);
                              $("input[name='UdpIp']").prop("disabled", true);
                          }
                      });


                  }

                  if (targetCtype === "Account") {
                      $("body").on("change", ".isExtCheckbox", function() {
                          var $checkBox = $(this);
                          var isChecked = $checkBox.is(":checked");
                          if (isChecked) {
                              $("input.isExtensionVar").prop("disabled", false);
                              $("input.isExtensionVar2").prop("disabled", true);
                          } else {
                              $("input.isExtensionVar").prop("disabled", true);
                              $("input.isExtensionVar2").prop("disabled", false);
                          }
                      });
                      $("body").on("change", ".hasProxyCheckbox", function() {
                          var $checkBox = $(this);
                          var isChecked = $checkBox.is(":checked");
                          if (isChecked) {
                              $("input.hasProxyVar").prop("disabled", false);
                          } else {
                              $("input.hasProxyVar").prop("disabled", true);
                          }
                      });
                      $("body").on("change", ".hasStunServerCheckbox", function() {
                          var $checkBox = $(this);
                          var isChecked = $checkBox.is(":checked");
                          if (isChecked) {
                              $("input.hasStunServerVar").prop("disabled", false);
                          } else {
                              $("input.hasStunServerVar").prop("disabled", true);
                          }
                      });
                  }

                  var finalObj = $.extend(resultObj, comp1Data);

                  $("#app-main").html(template(finalObj));
                  if (jQuery(".ivrEndpointsList").length) {
                      jQuery(".ivrEndpointsList").select2({ width: '100%' }).val(window.selectedAccountsforServer).trigger("change");
                  }
                  if (jQuery(".ivrAccountsList").length) {
                      jQuery(".ivrAccountsList").select2({ width: '100%' }).val(window.selectedAccountsforRouting).trigger("change");
                  }
                  if (jQuery(".ivrAccountsList2").length) {
                      jQuery(".ivrAccountsList2").select2({ width: '100%' }).val(window.selectedAccountsforEndpoint).trigger("change");
                  }
                  if (jQuery(".ivrServersList").length) {
                      jQuery(".ivrServersList").select2({ width: '100%' }).val(window.selectedServersforProject).trigger("change");
                  }
                  $(".mask-number").inputmask({
                      "mask": "9",
                      "repeat": 10,
                      "greedy": false
                  });
                  $(".mask-ip").inputmask({
                      alias: "ip",
                      "placeholder": "_"
                  });
                  $(".mask-date").inputmask("d/m", {
                      "placeholder": "dd/mm"
                  }); //multi-char placeholder
                  $('.date-picker').datepicker({
                      orientation: "left",
                      autoclose: true,
                      format: "mm.dd"
                  });

                  $('.timepicker-24').timepicker({
                      autoclose: true,
                      minuteStep: 5,
                      showSeconds: false,
                      showMeridian: false
                  });
                  if ($(".routingMenuList").length) {
                      $(".routingMenuList").select2({ width: '100%' }).val(comp1Data.IvrMultiMenu).trigger("change");
                  }
                  $(".serverCtiMethod").select2({ width: '100%' }).val(comp1Data.CtiMethod).trigger("change");
              }
          });
      }, 'html');
    }, 100);
  });

  $("body").on("submit", ".compForm", function(e){
    e.preventDefault();
    var that = $(this).find("button[type='submit']");
    var targetType = that.attr("data-type");
    var compId = that.attr("data-id");
    var inHTML = that.find("button[type='submit']").html();
    that.find("button[type='submit']").html('<i class="fa fa-spinner fa-spin" style="color:#fff"></i>');

    var toSendData = {};
    var toSendInputs = $(".compForm").find('input:not(:checkbox)');
    $.each(toSendInputs, function (index, item) {
        toSendData[$(item).attr("name")] = $(item).val();
    });
    if (targetType === "Server") {
        toSendData.Endpoints = [];
        $.each($(".ivrEndpointsList").select2("data"), function (index, item) {
            toSendData.Endpoints.push(item.id);
        });
        toSendData.AutoPublish = $(".serverAutoPublish").is(":checked");
        toSendData.CtiMethod = $(".serverCtiMethod").select2("data")[0].id;
    }
    if (targetType === "Routing" || targetType === "Endpoint") {
        toSendData.Accounts = [];
        if (targetType === "Routing") {
            $.each($(".ivrAccountsList").select2("data"), function (index, item) {
                toSendData.Accounts.push(item.id);
            });
            toSendData.IvrMultiMenu = $(".routingMenuList").select2("data")[0].id;
        } else {
            $.each($(".ivrAccountsList2").select2("data"), function (index, item) {
                toSendData.Accounts.push(item.id);
            });
        }

        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        jQuery.each(days, function (index, item) {
            toSendData[item] = $(".is" + item + "Checkbox").is(":checked");
        });
        toSendData.HasDateRange = $(".hasDateRangeCheckbox").is(":checked");
        toSendData.HasDay = $(".hasDayCheckbox").is(":checked");
        toSendData.HasTimeRange = $(".hasTimeRangeCheckbox").is(":checked");
        if (targetType === "Routing") {
            var pstartdate = $(".startDate").datepicker("getDate");
            var penddate = $(".endDate").datepicker("getDate");
            toSendData.StartDate = new Date(pstartdate.getTime() - (pstartdate.getTimezoneOffset() * 60000)).toISOString();
            toSendData.StartDate = toSendData.StartDate.slice(0, -1);
            toSendData.StopDate = new Date(penddate.getTime() - (penddate.getTimezoneOffset() * 60000)).toISOString();
            toSendData.StopDate = toSendData.StopDate.slice(0, -1);
            if ($(".startTime").data("timepicker").getTime().length === 5) {
                toSendData.StartTime = "2016-12-16T" + $(".startTime").data("timepicker").getTime() + ":54.437";
            } else {
                toSendData.StartTime = "2016-12-16T0" + $(".startTime").data("timepicker").getTime() + ":54.437";
            }
            if ($(".stopTime").data("timepicker").getTime().length === 5) {
                toSendData.StopTime = "2016-12-16T" + $(".stopTime").data("timepicker").getTime() + ":54.437";
            } else {
                toSendData.StopTime = "2016-12-16T0" + $(".stopTime").data("timepicker").getTime() + ":54.437";
            }
        }

        console.log(toSendData);

    }
    if (targetType === "Endpoint") {
        toSendData.HasTcp = $(".hasTcpCheckbox").is(":checked");
        toSendData.HasUdp = $(".hasUdpCheckbox").is(":checked");
        toSendData.Tls = $(".tlsCheckbox").is(":checked");
    }
    if (targetType === "Account") {
        toSendData.HasProxy = $(".hasProxyCheckbox").is(":checked");
        toSendData.HasStunServer = $(".hasStunServerCheckbox").is(":checked");
        toSendData.IsExtension = $(".isExtCheckbox").is(":checked");
        toSendData.BehindNat = $(".behindNatCheckbox").is(":checked");
    }
    if (targetType === "Project") {
        toSendData.IsActive = $(".IsActiveCheckbox").is(":checked");
        toSendData.Servers = [];
        $.each($(".ivrServersList").select2("data"), function (index, item) {
            toSendData.Servers.push(item.id);
        });
    }
   
    bootbox.prompt({
        size: "small",
        title: "If you want to save " + targetType + ", enter your password?",
        callback: function (result) {
            if (result === null) {

            } else {
                if (window.appConfig.password == result) {
                    console.log(toSendData);
                    $.ajax({
                        url: window.appConfig.ip + targetType + "/save" + targetType + "/" + compId,
                        type: "PUT",
                        data: toSendData,
                        success: function (data, textStatus, jqXHR) {
                            if (data > -1) {
                                toastr.success($("#cType").val() + " is saved.", 'Successful!');
                                $("a[data-type='" + targetType + "'][data-id='" + compId + "']").find("span").text(toSendData.Name);
                            } else {
                                if (data == -111) {
                                    toastr.error("Session Timeout");
                                    window.location.href = window.location.href = "../pages/index.html";
                                    eraseCookie("token");
                                    eraseCookie("username");
                                    eraseCookie("isLogin");
                                    eraseCookie("password");
                                } else {
                                    toastr.error("Error " + data);
                                }
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            toastr.error("Communication Error");
                        }
                    });
                } else {
                    toastr.error("Password is wrong");
                }
            }
        }
    });
  });

  $("body").on("click",".comp1-add", function () {
      debugger;
      var targetType = $(this).attr("data-Type");
      var targetComp = $(this).attr("data-target");
      var targetClass = $(".menu-item-" + targetComp);

      bootbox.prompt({
          size: "small",
          title: "If you want to add " + targetType + ", enter your password?",
          callback: function (result) {
              if (result === null) {

              } else {
                  if (window.appConfig.password == result) {
                      $.ajax({
                          url: window.appConfig.ip + targetType + "/add" + targetType,
                          type: "POST",
                          data: { "Name": "New " + targetType },
                          success: function (data) {
                              if (data > -1) {
                                  var toAddEl = "<li class='nav-item sidebarComponentLi cont" + targetType + "' style='position:relative;'><a href='#' class='nav-link menu-comp1 sidebarComponent' data-id='" + data + "' data-type='" + targetType + "'><span class='title'>New " + targetType + "</span></a>";
                                  if (targetClass.find(".sub-menu").length) {
                                      targetClass.find(".sub-menu").append(toAddEl);
                                  } else {
                                      targetClass.append("<ul class='sub-menu'>" + toAddEl + "</ul>");
                                  }
                                  if (!targetClass.hasClass('open')) {
                                      targetClass.find('.nav-link').not(".menu-comp1").trigger("click");
                                  }
                                  toastr.success("New " + targetType + " Added", 'Succeeded!');
                              }
                              else if (data == -111) {
                                  toastr.error("Session Timeout");
                                  window.location.href = window.location.href = "../pages/index.html";
                                  eraseCookie("token");
                                  eraseCookie("username");
                                  eraseCookie("isLogin");
                                  eraseCookie("password");
                              } else {
                                  toastr.error("Error " + data);
                              }
                          },
                          error: function (jqXHR, textStatus, errorThrown) { }
                      });
                  } else {
                      toastr.error("Password is wrong");
                  }
              }
          }
      });

    
  });

  $("body").on("click",".resetComp1", function(){
    var $this    = $(this);
    var compId   = $this.attr('data-id');
    var compType = $this.attr('data-type');
    $(".menu-comp1[data-id='"+compId+"'][data-type='"+compType+"']").trigger("click");
  });

  $("body").on("click", ".removeComp1", function() {
      var $this = $(this);
      var compId = $this.attr('data-id');
      var compType = $this.attr('data-type');

      bootbox.prompt({
          size: "small",
          title: "If you want to delete " + compType  + ", enter your password?",
          callback: function(result) {
              if (result === null) {

              } else {
                  if (window.appConfig.password == result) {
                      $.ajax({
                          url: window.appConfig.ip + compType + "/delete" + compType + "/" + compId,
                          type: "DELETE",
                          success: function(data) {
                              if (data > -1) {
                                  toastr.success("Deleted", 'Succeeded!');
                                  $("ul.sub-menu > li.cont" + compType + " > a[data-id=" + compId + "]").parent().remove();
                                  $("#app-main").html("");
                                  $("#treeHolder").html("");
                              } 
                              else if (data == -111) {
                                  toastr.error("Session Timeout");
                                  window.location.href = window.location.href = "../pages/index.html";
                                  eraseCookie("token");
                                  eraseCookie("username");
                                  eraseCookie("isLogin");
                                  eraseCookie("password");
                              } else {
                                  toastr.error("Error " + data);
                              }
                          },
                          error: function(jqXHR, textStatus, errorThrown) {
                              toastr.error("Communication Error");
                          }
                      });
                  } else {
                      toastr.error("Password is wrong");
                  }
              }
          }
      });

  });

  $("body").on("click", ".publishProject", function () {
      var $this = $(this);
      var compId = $this.attr('data-id');
      bootbox.prompt({
          size: "small",
          title: "If you want to publish project, enter your password?",
          callback: function (result) {
              if (result === null) {

              } else {
                  if (window.appConfig.password == result) {

                      bootbox.prompt({
                          size: "small",
                          title: "enter publish comment please",
                          callback: function (comment) {
                              if (comment === null) {
                                  comment = "";
                              }
                              $.ajax({
                                  url: window.appConfig.ip + "Version/Publish",
                                  type: "POST",
                                  data: {
                                      ProjectId: compId,
                                      Comment: comment
                                  },
                                  success: function (data, textStatus, jqXHR) {
                                      if (data > -1) {
                                          toastr.success('Project is published!');
                                          $("a[data-id=" + compId + "]a[data-type=Project].menu-comp1").trigger("click");
                                      } else if (data == -111) {
                                          toastr.error("Session Timeout");
                                          window.location.href = window.location.href = "../pages/index.html";
                                          eraseCookie("token");
                                          eraseCookie("username");
                                          eraseCookie("isLogin");
                                          eraseCookie("password");
                                      } else {
                                          toastr.error("Error " + data);
                                      }
                                  },
                                  error: function (jqXHR, textStatus, errorThrown) {
                                      toastr.error("Communication Error");
                                  }
                              });
                          }
                      });

                  } else {
                      toastr.error("Password is wrong");
                  }
              }
          }
      });
  });

  $("body").on("click", ".getSpesificVersion", function () {
      var $this = $(this);
      var compId = $this.attr('data-id');
      
      $.ajax({
          url: window.appConfig.ip + "Version/GetProjectVersions/" + compId,
          type: "GET",
          success: function (backUpClass, textStatus, jqXHR) {
              if (backUpClass) {
                  $.get('../customtemplates/BackUpPopUp.hbs', function(template) {

                      var popUpTemplate = Handlebars.compile(template);

                      $("#backUpPopUp").remove();

                      $("html").append(popUpTemplate(backUpClass));

                      $('#backUpPopUp').draggable();

                      $("#backUpPopUp").show();

                      $("#backUpPopUp").find(".versionList").on("select2:select", function (e) {
                          var id = $(this).select2("data")[0].id;
                          $("#backUpPopUp").find("input[name=startdate]").val(id == 0 ? "" : $("#backUpPopUp").find("input[data-id=" + id + "].backUpData ").attr('data-start'));
                          $("#backUpPopUp").find("input[name=stopdate]").val(id == 0 ? "" : $("#backUpPopUp").find("input[data-id=" + id + "].backUpData ").attr('data-stop'));
                          $("#backUpPopUp").find("textarea[name=comment]").val(id == 0 ? "" : $("#backUpPopUp").find("input[data-id=" + id + "].backUpData ").attr('data-comment'));
                          $("#backUpPopUp").find("input[name=publishedBy]").val(id == 0 ? "" : $("#backUpPopUp").find("input[data-id=" + id + "].backUpData ").attr('data-published'));
                      });

                      $("#backUpPopUp").find(".versionList").select2({ width: '100%' }).val(0).trigger("change");

                      $(".getSpesificOk").on("click", function () {
                          debugger;
                          var id = $("#backUpPopUp").find(".versionList").select2("data")[0].id;
                          if (id == 0) {
                              toastr.error("select version first");
                              return;
                          }
                          $.ajax({
                              url: window.appConfig.ip + "Project/GetOldVersion/" + id,
                              type: "GET",
                              success: function (comp1Data, textStatus, jqXHR) {
                                  debugger;
                                  if (comp1Data) {
                                      $.get('../customtemplates/project.hbs', function (comp1Template) {
                                          $("#app-main").html("");
                                          $("#treeHolder").html("");
                                          var template = Handlebars.compile(comp1Template);
                                          window.makeTreeView(comp1Data.TreeData);
                                          window.IvrProjectName = comp1Data.Name;
                                          var resultObj = {};
                                          resultObj = {
                                              Type: "Project",
                                              icon: "fa fa-volume-up"
                                          }
                                          var finalObj = $.extend(resultObj, comp1Data);
                                         
                                          $("#app-main").html(template(finalObj));

                                      }, 'html');
                                  } else {
                                      toastr.error("Error");
                                  }
                              },
                              error: function (jqXHR, textStatus, errorThrown) {
                                  toastr.error("Communication Error");
                              }
                          });
                          $("#backUpPopUp").hide();
                      });

                      $(".getSpesificCancel").on("click", function () {
                          $("#backUpPopUp").hide();
                      });

                      $("#backUpPopUp").show();

                  });
              } else {
                  toastr.error("Error");
              }
          },
          error: function (jqXHR, textStatus, errorThrown) {
              toastr.error("Communication Error");
          }
      });

  });

  $("body").on("click", ".getLastProject", function () {

      var $this = $(this);
      var compId = $this.attr('data-id');
      var compType = $this.attr('data-type');

      $("a[data-id=" + compId + "]a[data-type=" + compType + "].menu-comp1").trigger("click");
  });

  $("body").on("click", ".undoCheckOut", function () {

      var $this = $(this);
      var compId = $this.attr('data-id');
      var compType = $this.attr('data-type');

      bootbox.prompt({
          size: "small",
          title: "If you want to undo checkout project, enter your password?",
          callback: function (result) {
              if (result === null) {

              } else {
                  if (window.appConfig.password == result) {

                      $.ajax({
                          url: window.appConfig.ip + "Version/UndoCheckout/" + compId,
                          type: "GET",
                          success: function (data) {
                              if (data > -1) {
                                  toastr.success('UndoCheckout ok!');

                                  $("a[data-id=" + compId + "]a[data-type=" + compType + "].menu-comp1").trigger("click");

                              } else if (data == -111) {
                                  toastr.error("Session Timeout");
                                  window.location.href = window.location.href = "../pages/index.html";
                                  eraseCookie("token");
                                  eraseCookie("username");
                                  eraseCookie("isLogin");
                                  eraseCookie("password");
                              } else {
                                  toastr.error("Error " + data);
                              }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                              toastr.error("Communication Error");
                          }
                      });
                  } else {
                      toastr.error("Password is wrong");
                  }
              }
          }
      });
  });

  $("body").on("click", ".downgradeProject", function () {

      var $this = $(this);
      var compId = $this.attr('data-id');
      var compType = $this.attr('data-type');
      var major = $this.attr('data-major');
      var minor = $this.attr('data-minor');

      bootbox.prompt({
          size: "small",
          title: "If you want to downgrade project to " + major + "." + minor + ", enter your password?",
          callback: function (result) {
              if (result === null) {

              } else {
                  if (window.appConfig.password == result) {

                      $.ajax({
                          url: window.appConfig.ip + "Version/Downgrade",
                          type: "POST",
                          data: {
                              ProjectId: compId,
                              VersionMajor: major,
                              VersionMinor: minor
                          },
                          success: function (data) {
                              if (data > -1) {
                                  toastr.success('Downgrade ok!');

                                  $("a[data-id=" + compId + "]a[data-type=" + compType + "].menu-comp1").trigger("click");

                              } else if (data == -111) {
                                  toastr.error("Session Timeout");
                                  window.location.href = window.location.href = "../pages/index.html";
                                  eraseCookie("token");
                                  eraseCookie("username");
                                  eraseCookie("isLogin");
                                  eraseCookie("password");
                              } else {
                                  toastr.error("Error " + data);
                              }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                              toastr.error("Communication Error");
                          }
                      });
                  } else {
                      toastr.error("Password is wrong");
                  }
              }
          }
      });
  });

  $("body").on("click", ".announcementFileDetail", function () {

      var $this = $(this);
      var compId = $this.attr('data-id');

      $.ajax({
          url: window.appConfig.ip + "Project/GetAnnouncementFiles/" + compId,
          type: "GET",
          success: function (data) {
              if (data) {
                  $.get('../customtemplates/AnnouncementFilesPopUp.hbs', function (template) {

                      var popUpTemplate = Handlebars.compile(template);

                      $("#announcementFilesPopUp").remove();

                      $("html").append(popUpTemplate(data));

                      $("#announcementFilesPopUp").show();
                      $("#announcementFilesPopUp").draggable();

                      $(".announcementCancel").on("click", function () {
                          $("#announcementFilesPopUp").hide();
                          $("#announcementFilesPopUp").remove();
                      });
                      $(".announcementPlay").on("click", function () {
                          $(".announcePlayer").attr("src", "../AnnouncementFiles/" + $(this).attr('data-projectId') + "/" + $(this).attr('data-file'));
                      });
                      $(".uploadFile").on("click", function () {
                          $("#announcementFilesPopUp").hide();
                      });
                      $('.uploadedFiles').fileupload({
                          dataType: 'json',
                          method: "POST",
                          //data: {
                          //    ProjectId: compId,
                          //    Language: ""
                          //},
                          url: window.appConfig.ip + "Project/UploadAnnouncementFiles/" + encodeURIComponent( compId + "-" + $("#announcementFilesPopUp").find("input[name=UploadFolder]").val()),
                          done: function (e, data) {
                              $.each(data.files, function (index, file) {
                                  toastr.success("file send " + file.name);
                              });
                          },
                          progress: function(e, data) {
                              //console.log(e);
                              //console.log(data);
                              var percentge = parseInt(100 * (data._progress.loaded / data._progress.total)) + " %";
                              $(".upploadProgress").text(percentge);
                          },
                          fail: function (e, data) {
                              $.each(data.files, function (index, file) {
                                  toastr.error("file send failed " + file.name);
                              });
                          },
                          stop: function (e) {
                              console.log(e);
                              $(".announcementFileDetail").trigger("click");
                          }
                      });
                      
                  });

              } else {
                  toastr.error("Error ");
              }
          },
          error: function (jqXHR, textStatus, errorThrown) {
              toastr.error("Communication Error");
          }
      });
  });

  $("body").on("click", ".dllFileDetail", function () {

      var $this = $(this);
      var compId = $this.attr('data-id');

      $.ajax({
          url: window.appConfig.ip + "Project/GetDllFiles/" + compId,
          type: "GET",
          success: function (data) {
              if (data) {
                  $.get('../customtemplates/DllFilesPopUp.hbs', function (template) {

                      var popUpTemplate = Handlebars.compile(template);

                      $("#dllFilesPopUp").remove();

                      $("html").append(popUpTemplate(data));

                      $("#dllFilesPopUp").show();
                      $("#dllFilesPopUp").draggable();

                      $(".dllCancel").on("click", function () {
                          $("#dllFilesPopUp").hide();
                          $("#dllFilesPopUp").remove();
                      });

                      $(".uploadFile").on("click", function () {
                          $("#dllFilesPopUp").hide();
                      });

                      $('.uploadedFiles').fileupload({
                          dataType: 'json',
                          method: "POST",
                          //data: {
                          //    ProjectId: compId,
                          //    Language: ""
                          //},
                          url: window.appConfig.ip + "Project/UploadDllFiles/" + compId,
                          done: function (e, data) {
                              $.each(data.files, function (index, file) {
                                  toastr.success("file send " + file.name);
                              });
                          },
                          progress: function (e, data) {
                              //console.log(e);
                              //console.log(data);
                              var percentge = parseInt(100 * (data._progress.loaded / data._progress.total)) + " %";
                              $(".upploadProgress").text(percentge);
                          },
                          fail: function (e, data) {
                              $.each(data.files, function (index, file) {
                                  toastr.error("file send failed " + file.name);
                              });
                          },
                          stop: function (e) {
                              console.log(e);
                              $(".dllFileDetail").trigger("click");
                          }
                      });

                  });

              } else {
                  toastr.error("Error ");
              }
          },
          error: function (jqXHR, textStatus, errorThrown) {
              toastr.error("Communication Error");
          }
      });
  });
  
  $("body").on("click", ".openDesignPopUp", function (e) {

      $("#popUpTree").show();
  });

  $("body").on("click", ".updateServer", function (e) {
      e.preventDefault();

      var $this = $(this);
      var projectId = $this.attr('data-projectId');
      var serverId = $this.attr('data-serverId');

      bootbox.prompt({
          size: "small",
          title: "If you want to update server enter your password?",
          callback: function (result) {
              if (result === null) {

              } else {
                  if (window.appConfig.password == result) {

                      $.ajax({
                          url: window.appConfig.ip + "Server/UpdateServer",
                          type: "POST",
                          data: {
                              ProjectId: projectId,
                              ServerId: serverId
                          },
                          success: function (data) {
                              if (data > -1) {
                                  toastr.success('Update ok!');
                                  $("a[data-id=" + serverId + "]a[data-type=Server].menu-comp1").trigger("click");

                              } else if (data == -111) {
                                  toastr.error("Session Timeout");
                                  window.location.href = window.location.href = "../pages/index.html";
                                  eraseCookie("token");
                                  eraseCookie("username");
                                  eraseCookie("isLogin");
                                  eraseCookie("password");
                              } else {
                                  toastr.error("Error " + data);
                              }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                              toastr.error("Communication Error");
                          }
                      });
                  } else {
                      toastr.error("Password is wrong");
                  }
              }
          }
      });
  });
});
