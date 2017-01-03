$(document).ready(function(){
    $("body").on("click", ".menu-comp1", function () {
        $("#popUpTree").hide();
    var $this = $(this);
    setTimeout(function(){
      var compId = $this.attr('data-id');
      $('.menu-comp2').parent().removeClass('active');
      $('.menu-comp1').parent().removeClass('active');
      $this.parent().addClass('active');
      $("#treeHolder").remove();
      $("#lastTreeMenuId").val('');
      var targetCtype = $this.attr("data-type");
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
                      window.makeTreeView(comp1Data.TreeData);
                      window.IvrProjectName = comp1Data.Name;
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
        title: "If you want realy to save " + targetType + ", enter your password?",
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
          title: "If you want realy to delete " + compType  + ", enter your password?",
          callback: function(result) {
              if (result === null) {

              } else {
                  if (window.appConfig.password == result) {
                      $.ajax({
                          url: window.appConfig.ip + compType + "/delete" + compType + "/" + compId,
                          type: "DELETE",
                          success: function(data, textStatus, jqXHR) {
                              if (data < -1) {
                                  toastr.error("Error " + data);
                              } else {
                                  toastr.success("Deleted", 'Succeeded!');
                                  $("ul.sub-menu > li.cont" + compType + " > a[data-id=" + compId + "]").parent().remove();
                                  $("#app-main").html("");
                                  $("#treeHolder").html("");
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
          title: "If you want realy to publish project, enter your password?",
          callback: function (result) {
              if (result === null) {

              } else {
                  if (window.appConfig.password == result) {
                      
                      $.ajax({
                          url: window.appConfig.ip + "Version/Publish/" + compId,
                          type: "GET",
                          success: function (data, textStatus, jqXHR) {
                              if (data > -1) {
                                  toastr.success('Project is published!');
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

    $("body").on("click", ".testPopUp", function (e) {
        debugger;
        $('#popUpTree').draggable();
        //$('#popUpTree').resizable();
        $("#popUpTree").show();
    });
});
