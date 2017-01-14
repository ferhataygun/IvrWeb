jQuery(document).ready(function () {
    var menuChanged = false;
    var handleSaveMenu = function () {
       
        try {
            console.log("Menuyu Kaydet");
            var lastTreeMenuId = $("#lastTreeMenuId").val();
            if (lastTreeMenuId != '') {
                // click happened outside of menu, hide any visible menu items
                var menuNodeId = $("#MenuId").val();
                console.log(menuNodeId);
                var menuData = {
                    Name: $("input[name='Name']").val(),
                    SubMenus: { $type: "System.Collections.Generic.List`1[[IvrConfigurationClasses.IvrSubMenuBase, IvrConfigurationClasses]], mscorlib", $values: [] },
                    Id: 0,
                    Description: $("input[name='Description']").val(),
                    Order: 0,
                    IsParentMenu: false,
                    ChildMenus: [],
                    Logs: []
                };
                var inst = $('#treeHolder').jstree(true);
                var node = inst.get_node(lastTreeMenuId);
                if (!node) {
                    return;
                }
                var parent = inst.get_node(node.parent);
                menuData.Order = $.inArray(node.id, parent.children);

                var allRowsLogs = $(".comp2Form").find("table").find("tbody tr");
                jQuery.each(allRowsLogs, function (rowIndex, rowItem) {
                    menuData.Logs.push({
                        "Variable": $(rowItem).find("td").eq(0).find("input").val(),
                        "Encrypted": $(rowItem).find(".isEncrypted").is(":checked"),
                        "BeforeLog": $(rowItem).find(".isBeforeLog").is(":checked"),
                        "ChangeLog": $(rowItem).find(".isChangeLog").is(":checked"),
                        "AfterLog": $(rowItem).find(".isAfterLog").is(":checked")
                    });
                });

                var allForms = $(".formPortlet");
                $.each(allForms, function (index, item) {
                    var $item = $(item);
                    var formType = $item.attr("data-form-type");
                    if (formType.indexOf("IvrSubMenuAssignment") !== -1) {
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuAssignmentOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: '', Name: '' });
                        menuData.SubMenus.$values[index].Assignments = [];
                        var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                        jQuery.each(allRows, function (rowIndex, rowItem) {
                            menuData.SubMenus.$values[index].Assignments.push({
                                "VariableDefinition": $(rowItem).find("td").eq(0).find("input").val(),
                                "VaribleValue": $(rowItem).find("td").eq(1).find("input").val()
                            });
                        });
                    } else if (formType.indexOf("IvrSubMenuRecord") !== -1) {
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuRecordOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: '', Name: '' });
                        menuData.SubMenus.$values[index].FileName = $(item).find("input[name='FileName']").val();
                        menuData.SubMenus.$values[index].DtmfStop = $(item).find(".dtmfCheckbox").is(":checked");
                        menuData.SubMenus.$values[index].DtmfStopKey = $(item).find("input[name='DtmfStopKey']").val();
                        menuData.SubMenus.$values[index].Duration = $(item).find("input[name='Duration']").val();
                    } else if (formType.indexOf("IvrSubMenuWebService") !== -1) {
                        // Add Parameters
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuWebServiceOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: '', Name: '' });
                        menuData.SubMenus.$values[index].ServiceUri = $(item).find("input[name='ServiceUri']").val();
                        menuData.SubMenus.$values[index].ServiceName = $(item).find("input[name='ServiceName']").val();
                        menuData.SubMenus.$values[index].MethodName = $(item).find("input[name='MethodName']").val();
                        menuData.SubMenus.$values[index].ReturnVariable = $(item).find("input[name='ReturnVariable']").val();
                        menuData.SubMenus.$values[index].Parameters = [];
                        var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                        jQuery.each(allRows, function (rowIndex, rowItem) {
                            menuData.SubMenus.$values[index].Parameters.push({
                                "ParameterDirection": $(rowItem).find(".directionSelect").select2("data")[0].id,
                                "VariableType": $(rowItem).find(".typeSelect").select2("data")[0].id,
                                "Variable": $(rowItem).find("td").eq(2).find("input").val()
                            });
                        });
                    } else if (formType.indexOf("IvrSubMenuDll") !== -1) {
                        // Add Parameters
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuDllOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: '', Name: '' });
                        menuData.SubMenus.$values[index].DllfileName = $(item).find("input[name='DllfileName']").val();
                        menuData.SubMenus.$values[index].TypeName = $(item).find("input[name='TypeName']").val();
                        menuData.SubMenus.$values[index].MethodName = $(item).find("input[name='MethodName']").val();
                        menuData.SubMenus.$values[index].ReturnVariable = $(item).find("input[name='ReturnVariable']").val();
                        menuData.SubMenus.$values[index].Parameters = [];
                        var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                        jQuery.each(allRows, function (rowIndex, rowItem) {
                            menuData.SubMenus.$values[index].Parameters.push({
                                "ParameterDirection": $(rowItem).find(".directionSelect").select2("data")[0].id,
                                "VariableType": $(rowItem).find(".typeSelect").select2("data")[0].id,
                                "Variable": $(rowItem).find("td").eq(2).find("input").val()
                            });
                        });

                    } else if (formType.indexOf("IvrSubMenuStoredProc") !== -1) {
                        // Add Parameters
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuStoredProcedureOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: '', Name: '' });
                        menuData.SubMenus.$values[index].ConnectionString = $(item).find("input[name='ConnectionString']").val();
                        menuData.SubMenus.$values[index].SpName = $(item).find("input[name='SpName']").val();
                        menuData.SubMenus.$values[index].CommandTimeout = $(item).find("input[name='CommandTimeout']").val();
                        menuData.SubMenus.$values[index].Parameters = [];
                        var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                        jQuery.each(allRows, function (rowIndex, rowItem) {
                            menuData.SubMenus.$values[index].Parameters.push({
                                "ParameterDirection": $(rowItem).find(".directionSelect").select2("data")[0].id,
                                "VariableType": $(rowItem).find(".typeSelect").select2("data")[0].id,
                                "Variable": $(rowItem).find("td").eq(2).find("input").val()
                            });
                        });
                    } else if (formType.indexOf("IvrSubMenuScript") !== -1) {
                        // Add Parameters
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuScriptOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: '', Name: '' });
                        menuData.SubMenus.$values[index].Script = $(item).find("textarea[name='Script']").val();
                        menuData.SubMenus.$values[index].Function = $(item).find("input[name='Function']").val();
                        menuData.SubMenus.$values[index].ReturnVariable = $(item).find("input[name='ReturnVariable']").val();
                        menuData.SubMenus.$values[index].ScriptType = $(item).find(".scriptTypeList").select2("data")[0].id;
                        menuData.SubMenus.$values[index].Parameters = [];
                        var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                        jQuery.each(allRows, function (rowIndex, rowItem) {
                            menuData.SubMenus.$values[index].Parameters.push({
                                "ParameterDirection": $(rowItem).find(".directionSelect").select2("data")[0].id,
                                "VariableType": $(rowItem).find(".typeSelect").select2("data")[0].id,
                                "Variable": $(rowItem).find("td").eq(2).find("input").val()
                            });
                        });
                    } else if (formType.indexOf("IvrSubMenuTransfer") !== -1) {
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuTransferOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: '', Name: '' });
                        menuData.SubMenus.$values[index].TransferNo = $(item).find("input[name='TransferNo']").val();
                        menuData.SubMenus.$values[index].Timeout = $(item).find("input[name='Timeout']").val();
                        menuData.SubMenus.$values[index].HoldMusic = $(item).find(".holdMusicCheckbox").is(":checked");
                        menuData.SubMenus.$values[index].BridgeCall = $(item).find(".BridgeCallCheckbox").is(":checked");
                        menuData.SubMenus.$values[index].HoldMusicFile = $(item).find("input[name='HoldMusicFile']").val();
                        menuData.SubMenus.$values[index].UnavailableTransferNo = $(item).find("input[name='UnavailableTransferNo']").val();
                        menuData.SubMenus.$values[index].UnavailableMenu = $(item).find(".treeVievMenuList").select2("data")[0].id;
                    } else if (formType.indexOf("IvrSubMenuPlay") !== -1) {
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuPlayOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: '', Name: '' });
                        menuData.SubMenus.$values[index].PlayString = $(item).find("input[name='PlayString']").val();
                        menuData.SubMenus.$values[index].MaxDtmf = $(item).find("input[name='MaxDtmf']").val();
                        menuData.SubMenus.$values[index].MinDtmf = $(item).find("input[name='MinDtmf']").val();
                        menuData.SubMenus.$values[index].InputTimeout = $(item).find("input[name='InputTimeout']").val();
                        menuData.SubMenus.$values[index].DtmfTimeout = $(item).find("input[name='DtmfTimeout']").val();
                        menuData.SubMenus.$values[index].DtmfMask = $(item).find("input[name='DtmfMask']").val();
                        menuData.SubMenus.$values[index].RepeatAfterInvalid = $(item).find("input[name='RepeatAfterInvalid']").val();
                        menuData.SubMenus.$values[index].InputVariable = $(item).find("input[name='InputVariable']").val();
                        menuData.SubMenus.$values[index].Asynchronous = $(item).find(".Asynchronous").is(":checked");
                        menuData.SubMenus.$values[index].DontPlayOthersIfDtmfRecevied = $(item).find(".DontPlayOthersIfDtmfRecevied").is(":checked");
                        menuData.SubMenus.$values[index].DtmfStop = $(item).find(".isDtmfStop").is(":checked");
                        menuData.SubMenus.$values[index].TerminateInvalidInput = $(item).find(".TerminateInvalidInput").is(":checked");
                        menuData.SubMenus.$values[index].DtmfLogDisabled = $(item).find(".DtmfLogDisabled").is(":checked");
                        menuData.SubMenus.$values[index].GetInvalidInput = $(item).find(".GetInvalidInput").is(":checked");
                        menuData.SubMenus.$values[index].PlayType = $(item).find(".playTypeList").select2("data")[0].id;
                    } else if (formType.indexOf("IvrSubMenuRouting") !== -1) {
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuRoutingOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: 'Descripton', Name: 'asdasd' });
                        menuData.SubMenus.$values[index].RoutingRules = [];
                        var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                        jQuery.each(allRows, function (rowIndex, rowItem) {
                            menuData.SubMenus.$values[index].RoutingRules.push({
                                "ReferenceValue": $(rowItem).find("td").eq(0).find("input").val(),
                                "IvrSubMenuRoutingRuleType": $(rowItem).find(".ruleSelect").select2("data")[0].id,
                                "IgnoreCase": $(rowItem).find(".isIgnoreCase").is(":checked"),
                                "CompareWith": $(rowItem).find("td").eq(3).find("input").val(),
                                "TransferNo": $(rowItem).find("td").eq(4).find("input").val(),
                                "RoutingMenu": $(rowItem).find(".treeVievMenuList").select2("data")[0].id,
                                "Description": $(rowItem).find("td").eq(6).find("input").val()
                            });
                        });
                    } else if (formType.indexOf("IvrSubMenuCti") !== -1) {
                        menuData.SubMenus.$values.push({ $type: "IvrConfigurationClasses.IvrSubMenuCtiOffline, IvrConfigurationClasses", Type: "", Order: index, Id: 0, Description: '', Name: '' });
                        menuData.SubMenus.$values[index].CtiEntities = [];
                        var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                        jQuery.each(allRows, function (rowIndex, rowItem) {
                            menuData.SubMenus.$values[index].CtiEntities.push({
                                "CtiData": $(rowItem).find("td").eq(0).find("input").val(),
                                "CtiValue": $(rowItem).find("td").eq(1).find("input").val(),
                                "CtiFunction": $(rowItem).find(".ctiFunction").select2("data")[0].id,
                                "CtiSipOperation": $(rowItem).find(".ctiSipOperation").select2("data")[0].id,
                            });
                        });
                    }
                });
                var oldTitle = $(document).find("title").text();
                $(document).find("title").text("..Saving..");
                $.ajax({
                    'url': window.appConfig.ip + "ivr/saveivrmenu/" + menuNodeId,
                    'type': 'PUT',
                    'data': { JsonContent: JSON.stringify(menuData) },
                    success: function (data) {
                        if (data > -1) {
                            $(document).find("title").text(oldTitle);
                            var newName = menuData.Name;
                            $("#treeHolder").jstree('rename_node', node.id, newName);
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
                                  $(document).find("title").text(oldTitle);
                        }
                    },
                    error: function () {
                        toastr.error("Communication Error");
                        $(document).find("title").text(oldTitle);
                    }
                });
            }
            menuChanged = false;
        } catch (err) { toastr.error("Script Error " + err); }
    };

    $.ajax({
        async: false,
        type: 'GET',
        url: '../customtemplates/DesignPopUp.hbs',
        success: function (formTemplate) {
            $("html").append(formTemplate);
            $('#popUpTree').draggable();
            $('#popUpTree').resizable();
            $("#popUpTree").find(".closePopUp").on("click", function() {
                $("#popUpTree").hide();
            });
            $("#popUpTree").find(".searchPopUp").on("click", function () {
                var opn = $(this).attr('data-open');
                if (opn == 1) {
                    $("#treeHolder").jstree("close_all");
                    $(this).attr('data-open', 0);
                } else {
                    $("#treeHolder").jstree("open_all");
                    $(this).attr('data-open', 1);
                }
            });
        },
        error: function (err) {
            toastr.error("Communication Error: could not get design pop up");
        }
    });

    $("body").on("click", ".collapseForms", function (e) {
        var text = $(this).text();
        $("#sortable_portlets").children(".portlet").each(function () {
            var $a = $(this).find(".tools").children("a:first");
            debugger;
            if (text == "Collapse All") {
                if ($a.hasClass("collapse")) {
                    $a.trigger("click");
                }
            } else {
                if ($a.hasClass("expand")) {
                    $a.trigger("click");
                }
            }
        });

        if (text == "Collapse All") {
            $(this).text("Expand All");
        } else {
            $(this).text("Collapse All");
        }
       
    });

    $("body").on("click", ".cancelForms", function (e) {
        var lastTreeMenuId = $("#lastTreeMenuId").val();
        var inst = $('#treeHolder').jstree(true);
        var node = inst.get_node(lastTreeMenuId);
        if (!node) {
            return;
        }
        $("#lastTreeMenuId").val('');
        $("#" + node.a_attr.id).trigger("click");
    });

    $("body").on("click", ".saveForms", function (e) {

        handleSaveMenu();
        var lastTreeMenuId = $("#lastTreeMenuId").val();
        var inst = $('#treeHolder').jstree(true);
        var node = inst.get_node(lastTreeMenuId);
        if (!node) {
            return;
        }
        var id = node.a_attr.id;
        setTimeout(function () {
            $("#" + id).trigger("click");
        }, 500);
    });

    var listVar = [];
    var listFunction = [
           "GetValue", "StringConcat", "SumNumber", "MulNumber", "AbsNumber", "DivNumber",
           "ModNumber", "Split", "SubString", "Replace", "GetLength", "ToUpperCase",
           "ToLowerCase", "Insert", "Contains", "IsEmpty", "IsNull", "GetLanguage()",
           "SetLanguage", "GetRemoteNumber()", "GetIncomingSipHeader", "GetIncomingInvite()",
           "Rand", "GetTime()", "GetStartTime()", "GetDuration()",
           "GetPbxCallId()", "GetSipCallId()", "GetIvrCallId()",
           "CreateNewGuid()"
    ];

    var handleAutoComplete = function (refresh) {
        
        if (refresh) {
            $.ajax({
                url: window.appConfig.ip + "Ivr/GetVariables/" + window.IvrProjectId,
                type: "GET",
                async: false,
                success: function (data) {
                    listVar = data;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });
        }

        $(".awesomVariable").each(function () {
            var input = $(this);
            new Awesomplete(input[0], {
                list: listVar,
                minChars: 1
            });
        });
       
        $(".awesomFunction").each(function () {
            var input = $(this);
            new Awesomplete(input[0], {
                list: $.merge($.merge([], listVar), listFunction),
                data: function (text, input) {
                    return input.slice(0, input.lastIndexOf(",")) + "," + text;
                },
                filter: Awesomplete.FILTER_STARTSWITH
            });
            new Awesomplete(input[0], {
                list: $.merge($.merge([], listVar), listFunction),
                data: function (text, input) {
                    return input.slice(0, input.lastIndexOf("(")) + "(" + text;
                },
                filter: Awesomplete.FILTER_STARTSWITH
            });
            new Awesomplete(input[0], {
                list: listFunction,
                minChars: 1
            });
        });
    };

  var handleOnClick = function(){
      $("body").on("click", ".openForm", function () {
          //collapse all
          $("#sortable_portlets").children(".portlet").each(function () {
              if ($(this).find(".tools").children("a:first").hasClass("collapse")) {
                  $(this).find(".tools").children("a:first").trigger("click");
              }
          });
      var formType  = $(this).attr("data-form-type");
      var fontClass = $(this).attr("data-font-class");
      var folderClass = fontClass + " fa fa-file-text";
      $.get('../customtemplates/'+formType+'.hbs', function (data3) {
          var template= Handlebars.compile(data3);
          var randomId  = "";
          var randomId2 = "";
          if(formType === "recordForm"){
            formType = "IvrSubMenuRecordOffline";
          } else if (formType === "assignmentForm") {
            formType = "IvrSubMenuAssignmentOffline";
          }else if(formType === "webServiceForm"){
            formType = "IvrSubMenuWebServiceOffline";
          }else if(formType === "dllForm"){
            formType = "IvrSubMenuDllOffline";
          }else if(formType === "databaseForm"){
            formType = "IvrSubMenuStoredProcedureOffline";
          }else if (formType === "scriptForm") {
              formType = "IvrSubMenuScriptOffline";
          }else if (formType === "transferForm") {
            formType = "IvrSubMenuTransferOffline";
          }else if(formType === "playForm"){
            formType = "IvrSubMenuPlayOffline";
          } else if (formType === "routingForm") {
            formType = "IvrSubMenuRoutingOffline";
          }else if (formType === "ctiForm") {
              formType = "IvrSubMenuCtiOffline";
          }
          if (formType === "IvrSubMenuAssignmentOffline" ||
              formType === "IvrSubMenuWebServiceOffline" ||
              formType === "IvrSubMenuDllOffline" ||
              formType === "IvrSubMenuStoredProcedureOffline" ||
              formType === "IvrSubMenuScriptOffline" ||
              formType === "IvrSubMenuCtiOffline") {
            randomId  =  Math.random().toString(36).substr(2, 5);
            randomId2 =  Math.random().toString(36).substr(2, 5);
            $("#sortable_portlets").append(template({inFormData:{Type:formType, tableID:randomId,btnID:randomId2},fontClass:fontClass}));
          }else{
            if(formType === "IvrSubMenuTransferOffline"){
              var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
                var treeMenus = [];
              jQuery.each(treeMenusData,function(index,item){
              	if(item.icon !== "fa fa-volume-up" && item.icon !== "fa fa-file-text"){
              		treeMenus.push({id:item.data.menuid, text:item.text});
                }
              });
              $("#sortable_portlets").append(template({inFormData:{Type:formType,treeview:treeMenus},fontClass:fontClass}));
              if($(".treeVievMenuList").length){
                $(".treeVievMenuList").select2({width:'100%'});
              }
            }else if(formType === "IvrSubMenuRoutingOffline"){
              var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
                var treeMenus = [];
              jQuery.each(treeMenusData,function(index,item){
              	if(item.icon !== "fa fa-volume-up" && item.icon !== "fa fa-file-text"){
              		treeMenus.push({id:item.data.menuid, text:item.text});
                }
              });
              $("#sortable_portlets").append(template({inFormData:{Type:formType},fontClass:fontClass}));
              if($(".treeVievMenuList").length){
                $(".treeVievMenuList").select2({width:'100%'}).val(treeMenus).trigger("change");
              }
            }else{
              $("#sortable_portlets").append(template({inFormData:{Type:formType},fontClass:fontClass}));
            }
          }
          $("#sortable_portlets").sortable('refresh');

          //masks
          $(".mask-number").inputmask({
                "mask": "9",
             "repeat": 10,
             "greedy": false
          });
          $(".js-table-select").select2({width:"100%"});
          if($(".playTypeList").length) {
              $(".playTypeList").select2({ width: "100%" });
          }
          if ($(".scriptTypeList").length) {
              $(".scriptTypeList").select2({ width: "100%" });
          }

          handleAutoComplete(false);

      }, 'html');
      menuChanged = true;
    });
  };

  var handleOffClick = function(){
    $("body").off('click', '.openForm');
  };

  var makeSortableItems = function(){
    $("#sortable_portlets").sortable({
        connectWith: ".portlet",
        items: ".portlet",
        opacity: 0.8,
        handle : '.portlet-title',
        coneHelperSize: true,
        placeholder: 'portlet-sortable-placeholder',
        forcePlaceholderSize: true,
        tolerance: "pointer",
        helper: "clone",
        tolerance: "pointer",
        forcePlaceholderSize: !0,
        helper: "clone",
        cancel: ".portlet-sortable-empty, .portlet-fullscreen", // cancel dragging if portlet is in fullscreen mode
        revert: 250, // animation in milliseconds
        update: function(b, c) {
            if (c.item.prev().hasClass("portlet-sortable-empty")) {
                c.item.prev().before(c.item);
            }
        }
    });
  };

  var getMenuType = function(str){
    var formType = "";
    if(str.indexOf("IvrSubMenuAssignment") !== -1){
        formType = "assignmentForm";
    }else if(str.indexOf("IvrSubMenuRecord") !== -1){
      formType = "recordForm";
    }else if(str.indexOf("IvrSubMenuWebService") !== -1){
      formType = "webServiceForm";
    }else if(str.indexOf("IvrSubMenuDll") !== -1){
      formType = "dllForm";
    }else if(str.indexOf("IvrSubMenuStoredProc") !== -1){
      formType = "databaseForm";
    } else if (str.indexOf("IvrSubMenuScript") !== -1) {
      formType = "scriptForm";
    }else if (str.indexOf("IvrSubMenuTransfer") !== -1) {
      formType = "transferForm";
    }else if(str.indexOf("IvrSubMenuPlay") !== -1){
      formType = "playForm";
    }else if(str.indexOf("IvrSubMenuRouting") !== -1){
      formType = "routingForm";
    }
    else if (str.indexOf("IvrSubMenuCti") !== -1) {
        formType = "ctiForm";
    }
    return formType;
  };

  var getFontClass = function (str) {
      var formClass = "";
      if (str.indexOf("IvrSubMenuAssignment") !== -1) {
          formClass = "font-blue";
      } else if (str.indexOf("IvrSubMenuRecord") !== -1) {
          formClass = "font-red-pink";
      } else if (str.indexOf("IvrSubMenuWebService") !== -1) {
          formClass = "font-purple-plum";
      } else if (str.indexOf("IvrSubMenuDll") !== -1) {
          formClass = "font-yellow-crusta";
      } else if (str.indexOf("IvrSubMenuStoredProc") !== -1) {
          formClass = "font-brown";
      } else if (str.indexOf("IvrSubMenuScript") !== -1) {
          formClass = "grey-mint";
      } else if (str.indexOf("IvrSubMenuTransfer") !== -1) {
          formClass = "font-yellow-mint";
      } else if (str.indexOf("IvrSubMenuPlay") !== -1) {
          formClass = "font-green";
      } else if (str.indexOf("IvrSubMenuRouting") !== -1) {
          formClass = "font-blue-dark";
      }
      else if (str.indexOf("IvrSubMenuCti") !== -1) {
          formClass = "font-dark";
      }
      return formClass;
  };

  /* Global Functions - make treeview */
  window.makeTreeView = function (myTreeData) {
      menuChanged = true;
    $("#treeHolder").remove();
    $("#beforeTree").after("<div id='treeHolder'></>");
    $("#treeHolder").jstree({
        "core" : {
            "themes" : {
                "responsive": false
            },
            // so that create works
            check_callback : function (op, node, par, pos, more) {
              console.log(node,par,pos.more);
              if(op === "move_node" && more && more.core) {
                var order   = pos;
                var parentId = 0;
                var menuid   = $('#treeHolder').jstree(true).get_json(node.id).data.menuid;;
                if(par.text == "Project Tree"){
                  parentId = 0;
                }else{
                  parentId = $('#treeHolder').jstree(true).get_json(par.id).data.menuid;
                }
                var result = false;
                if(order == par.children.length){
                  order = par.children.length -1;
                }
                console.log(menuid,parentId,order);
                $.ajax({
                    url : window.appConfig.ip + "MenuOrderChange/MenuOrderChanged",
                    async: false,
                    type: "POST",
                    data: {
                      Id: menuid,
                      ParentId: parentId,
                      Order: order
                    },
                    success: function (data) {
                        result = false;
                      if(data > -1){
                        result = true;
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
                    error: function (jqXHR, textStatus, errorThrown) {
                        toastr.error("Communication Error");
                      result = false;
                    }
                });
                return result;
              }else{
                return true;
              }
            },
            'data': {
              "text": "Project Tree",
              "icon": "fa fa-volume-up",
              "children": myTreeData
            }

        },
        "types" : {
            "default" : {
                "icon" : "fa fa-folder icon-state-warning icon-lg"
            },
            "file" : {
                "icon" : "fa fa-file icon-state-warning icon-lg"
            }
        },
        "state" : { "key" : "demo2" },
        "plugins" : [ "contextmenu", "dnd", "state", "types" ],
        "contextmenu" : {
          "items": function(){
            return {
               "Create": {
                   "label": "Add",
                   "action": function (data) {
                       var ref = $.jstree.reference(data.reference),
                           sel = ref.get_selected();
                       if(!sel.length) { return false; }
                       sel = sel[0];
                       if(!$('#treeHolder').jstree(true).get_json(sel).data.menuid){
                         var menuData = {
                           Id: jQuery(".contProject.active").find("a").attr("data-id"),
                           Name: "New Menu",
                           Description: "",
                           Order: 1,
                           IsParentMenu: true,
                           SubMenus: [],
                           ChildMenus: []
                         };
                       }else{
                         var menuData = {
                           Id: $('#treeHolder').jstree(true).get_json(sel).data.menuid,
                           Name: "New Menu",
                           Description: "",
                           Order: 1,
                           IsParentMenu: false,
                           SubMenus: [],
                           ChildMenus: []
                         };
                       }
                       var inst = $('#treeHolder').jstree(true),
                        node = inst.get_node(sel),
                        parent = inst.get_node(node.parent);
                        menuData.Order = $.inArray(node.id, parent.children);
                       $.ajax({
                         'url' : window.appConfig.ip + "ivr/addivrmenu",
                         'type' : 'POST',
                         'data' : menuData,
                         success: function (data) {
                             console.log(data);
                             console.log(menuData.Name);
                             if (data > 0) {
                               if (menuChanged) {
                                   handleSaveMenu();
                               }
                               $("#lastTreeMenuId").val('');
                               var inst = $('#treeHolder').jstree(true);

                               sel = ref.create_node(sel, { "type": "folder", "data": { menuid: data, Name: menuData.Name } });
                               
                               $("#treeHolder").jstree("open_all");

                               var node2 = inst.get_node(sel);
                               if (!node2) {
                                   return;
                               }
                               var id2 = node2.a_attr.id;

                               $("#" + id2).trigger("click");
                               setTimeout(function () {
                                   $("#" + id2).trigger("click");
                               }, 500);
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
                         error: function(){
                             toastr.error("Communication Error");
                         }
                       });

                   }
               },
               "Delete": {
                   "label": "Delete",
                   "action": function (data) {
                       var ref = $.jstree.reference(data.reference),
                           sel = ref.get_selected();
                       if(!sel.length) { return false; }
                                              $.ajax({
                         'url' : window.appConfig.ip + "ivr/deleteivrmenu/" + $('#treeHolder').jstree(true).get_json(sel[0]).data.menuid,
                         'type' : 'DELETE',
                         success: function (data) {
                             if (data > -1) {
                                 ref.delete_node(sel);
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
                         error: function(){
                             toastr.error("Communication Error");
                         }
                       });

                   }
               }
             }
          }
        },
        "dnd" : {
            "is_draggable" : function(node) {
                if (node[0].icon === 'fa fa-volume-up') {
                    return false;
                }
                return true;
            }
        }
    });


    /* On select */
    $('#treeHolder').on("select_node.jstree", function (e, treeData) {

        try {
            if (treeData.event.button == 2) {
                //$("#pupUpTreeContextSelectedId").val(treeData.node.data.menuid);
                //$("#pupUpTreeContextSelectedNodeId").val(treeData.node.id);
                //$("#pupUpTreeContext").show();
                return false;
            }
            //if (treeData.event.button != 0) {
            //    return false;
            //}

        } catch(err) {
            
        }
        var mChanged = false;
        if (menuChanged) {
            handleSaveMenu();
            mChanged = true;
        }
        $("#lastTreeMenuId").val(treeData.node.id);
      if($('#treeHolder').jstree(true).get_json(treeData.node.id).icon === "fa fa-volume-up"){
          $("#app-main").html("");
          $("#lastTreeMenuId").val('');
        return false;
      }
      var menuId = $('#treeHolder').jstree(true).get_json(treeData.node.id).data.menuid;
      $.ajax({
        'url' : window.appConfig.ip + "ivr/getivrmenu/"+ menuId,
        'type' : 'GET',
        'datatype' : "application/json",
        success: function(menuData){
          $.get('../customtemplates/newComp3.hbs', function (template) {
            window.MenuDataChanged = false;
            $("body").find("input").on("change", function(){
              window.MenuDataChanged = true;
            });
            var menuTemplate = Handlebars.compile(template);
              var randomId = "";
              var randomId2 = "";
              $("#app-main").html(menuTemplate(menuData));
              $(".menuCaption").text(window.IvrProjectName + ' ' + $(".menuCaption").text());
              handleOffClick();
              handleOnClick();
              makeSortableItems();
              var inMenuForms = menuData.SubMenus;
              $.each(inMenuForms, function(index, item){
                  var formType = getMenuType(item.Type);
                  var fontClass = getFontClass(item.Type);
                $.ajax({
                     async: false,
                     type: 'GET',
                     url: '../customtemplates/'+formType+'.hbs',
                     success: function(formTemplate) {
                       var formTemplate = Handlebars.compile(formTemplate);
                       var fontClass    = $("a[data-form-type='"+formType+"']").attr("data-font-class");
                       menuData.fontClass = fontClass;
                       randomId  =  Math.random().toString(36).substr(2, 5);
                       randomId2 =  Math.random().toString(36).substr(2, 5);
                       if(formType === "transferForm"){
                         var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
                           var treeMenus = [];
                         jQuery.each(treeMenusData,function(index,item){
                          if(item.icon !== "fa fa-volume-up" && item.icon !== "fa fa-file-text"){
                            treeMenus.push({id:item.data.menuid, text:item.text});
                           }
                         });
                         menuData.SubMenus[index].treeview = treeMenus;
                       }
                       if(formType === "routingForm"){
                         var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
                           var treeMenus = [];
                         jQuery.each(treeMenusData,function(index,item){
                          if(item.icon !== "fa fa-volume-up" && item.icon !== "fa fa-file-text"){
                            treeMenus.push({id:item.data.menuid, text:item.text});
                           }
                         });
                         $.each(menuData.SubMenus[index].RoutingRules, function(index, item) {
                             item.tree = treeMenus;
                         });
                       }
                       $("#sortable_portlets").append(formTemplate({ menuData: menuData, inFormData: menuData.SubMenus[index], fontClass: fontClass }));
                       if (formType === "dllForm" || formType == "webServiceForm" || formType == "databaseForm" || formType == "scriptForm") {
                         $.each(menuData.SubMenus[index].Parameters, function(paramIndex, paramItem){
                           $(".formPortlet").eq(index).find("tbody tr").eq(paramIndex).find(".directionSelect").select2({width:'100%'}).val(paramItem.ParameterDirection).trigger("change");
                           $(".formPortlet").eq(index).find("tbody tr").eq(paramIndex).find(".typeSelect").select2({width:'100%'}).val(paramItem.VariableType).trigger("change");
                         });
                       }
                       if(formType === "transferForm"){
                         $(".formPortlet").eq(index).find(".treeVievMenuList").select2({width:'100%'}).val(menuData.SubMenus[index].UnavailableMenu).trigger("change");
                       }
                       if(formType === "playForm"){
                         $(".formPortlet").eq(index).find(".playTypeList").select2({width:'100%'}).val(menuData.SubMenus[index].PlayType).trigger("change");
                       }
                       if (formType === "scriptForm") {
                           $(".formPortlet").eq(index).find(".scriptTypeList").select2({ width: '100%' }).val(menuData.SubMenus[index].ScriptType).trigger("change");
                           $(".formPortlet").eq(index).find("textarea[name=Script]").val(menuData.SubMenus[index].Script);
                       }
                       if(formType === "routingForm"){
                         $(".formPortlet").eq(index).find(".js-table-select").select2({width:'100%'});
                         var allRows = $(".formPortlet").eq(index).find("table").find("tbody").find("tr");
                         jQuery.each(allRows,function(rowIndex, rowItem){
                           $(rowItem).find(".treeVievMenuList").select2({width:'100%'}).val(menuData.SubMenus[index].RoutingRules[rowIndex].RoutingMenu).trigger("change");
                           $(rowItem).find(".ruleSelect").select2({width:'100%'}).val(menuData.SubMenus[index].RoutingRules[rowIndex].IvrSubMenuRoutingRuleType).trigger("change");
                         });
                       }
                       if (formType === "ctiForm") {
                           $(".formPortlet").eq(index).find(".js-table-select").select2({ width: '100%' });
                           var allRows = $(".formPortlet").eq(index).find("table").find("tbody").find("tr");
                           jQuery.each(allRows, function (rowIndex, rowItem) {
                               $(rowItem).find(".ctiFunction").select2({ width: '100%' }).val(menuData.SubMenus[index].CtiEntities[rowIndex].CtiFunction).trigger("change");
                               $(rowItem).find(".ctiSipOperation").select2({ width: '100%' }).val(menuData.SubMenus[index].CtiEntities[rowIndex].CtiSipOperation).trigger("change");
                           });
                       }
                       $("#sortable_portlets").sortable('refresh');

                       // Suraya
                       try{
                         $(".mask-number").inputmask({
                               "mask": "9",
                            "repeat": 10,
                            "greedy": false
                         });
                       } catch (err) { }

                     },
                     error: function(){
                         toastr.error("Communication Error");
                     }
                });
              });


              handleAutoComplete(mChanged);

              //collapse all except first

              $("#sortable_portlets").children(".portlet").each(function (index) {
                  if (index > 0) {
                      $(this).find(".tools").children("a:first").trigger("click");
                  }
              });

          });
        }
      });
    });
  }
    /* Global Functions - portlet remove */
    $('body').on('click', '.portlet > .portlet-title > .tools > a.remove', function(e) {
      e.preventDefault();
      var toRemovePortlet = $(this).closest(".formPortlet");
      var nodeId = $(this).attr("data-target-node");
      var t = $('#treeHolder').jstree(true);
      bootbox.confirm({
        size: "small",
        message: "Are you sure that you want to delete form?",
        callback: function(result){
          if(result){
            t.delete_node([nodeId]);
            toRemovePortlet.fadeOut('fast').remove();
            menuChanged = true;
          }else{}
        }
      });
    });

    //Changes 

    $("body").on("change", ".holdMusicCheckbox",function(){
      var $checkBox = $(this);
      var isChecked = $checkBox.is(":checked");
      if(isChecked){
        $("input.holdMusicVar").prop("disabled",false);
      }else{
        $("input.holdMusicVar").prop("disabled",true);
      }
    });

    $("body").on("change", ".dtmfCheckbox",function(){
      var $checkBox = $(this);
      var isChecked = $checkBox.is(":checked");
      if(isChecked){
        $("input.dtmfVar").prop("disabled",false);
      }else{
        $("input.dtmfVar").prop("disabled",true);
      }
    });

    $("body").on("click", ".newCtiData", function (e) {
        e.preventDefault();
        var table = $(this).closest(".table-toolbar").next();
        if ($(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val() == 'true') {
            $(table).find("tbody").find(".saveRow").trigger("click");
        }
        if ($(this).closest(".table-toolbar").siblings("input[name=rowEdited]").val() == 'true') {
            $(table).find("tbody").find(".saveRow").trigger("click");
        }
        var strVar = "";
        strVar += "                                                               <tr>";
        strVar += "                                                                   <td> ";
        strVar += "                                                                     <input type=\"text\" class=\"form-control awesomVariable awesomFunction\" value=\"\">";
        strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"\">";
        strVar += "                                                                   <\/td>";

        strVar += "                                                                   <td> ";
        strVar += "                                                                     <input type=\"text\" class=\"form-control awesomVariable awesomFunction\" value=\"\">";
        strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"\">";
        strVar += "                                                                   <\/td>";
        strVar += "                                                                   <td>";
        strVar += "                                                                     <select class=\"js-table-select ctiFunction\">";
        strVar += "                                                                       <option value=\"0\">Get<\/option>";
        strVar += "                                                                       <option value=\"1\">Set<\/option>";
        strVar += "                                                                     <\/select>";
        strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"0\">";
        strVar += "                                                                   <\/td>";
        strVar += "                                                                   <td>";
        strVar += "                                                                     <select class=\"js-table-select ctiSipOperation\">";
        strVar += "                                                                       <option value=\"0\">None<\/option>";
        strVar += "                                                                       <option value=\"1\">Add Info<\/option>";
        strVar += "                                                                       <option value=\"2\">Send Info<\/option>";
        strVar += "                                                                       <option value=\"3\">Send Bye<\/option>";
        strVar += "                                                                       <option value=\"4\">Send Transfer<\/option>";
        strVar += "                                                                     <\/select>";
        strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"0\">";
        strVar += "                                                                   <\/td>";

        strVar += "                                                                   <td>";
        strVar += "                                                                       <a href=\"#\" class=\"saveRow\"> Save <\/span>";
        strVar += "                                                                   <\/td>";
        strVar += "                                                                   <td>";
        strVar += "                                                                       <a href=\"#\" class=\"cancelRow\"> Cancel <\/span>";
        strVar += "                                                                   <\/td>";
        strVar += "                                                               <\/tr>";
        $(table).find("tbody").append(strVar);
        $(table).find(".js-table-select").select2({ width: "100%" });
        $(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val('true');
        handleAutoComplete(false);
        menuChanged = true;
    });

    $("body").on("click", ".newParameter", function(e){
      e.preventDefault();
      var table = $(this).closest(".table-toolbar").next();
      if ($(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val() == 'true') {
          $(table).find("tbody").find(".saveRow").trigger("click");
      }
      if ($(this).closest(".table-toolbar").siblings("input[name=rowEdited]").val() == 'true') {
          $(table).find("tbody").find(".saveRow").trigger("click");
      }
      var strVar="";
          strVar += "                                                               <tr>";
          strVar += "                                                                   <td>";
          strVar += "                                                                     <select class=\"js-table-select directionSelect\">";
          strVar += "                                                                       <option value=\"0\">In<\/option>";
          strVar += "                                                                       <option value=\"1\">Out<\/option>";
          strVar += "                                                                     <\/select>";
          strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"0\">";
          strVar += "                                                                   <\/td>";
          strVar += "                                                                   <td>";
          strVar += "                                                                     <select class=\"js-table-select typeSelect\">";
          strVar += "                                                                       <option value=\"0\">Int<\/option>";
          strVar += "                                                                       <option value=\"1\">Double<\/option>";
          strVar += "                                                                       <option value=\"2\">String<\/option>";
          strVar += "                                                                       <option value=\"3\">DateTime<\/option>";
          strVar += "                                                                       <option value=\"4\">Bool<\/option>";
          strVar += "                                                                       <option value=\"5\">Complex<\/option>";
          strVar += "                                                                     <\/select>";
          strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"0\">";
          strVar += "                                                                   <\/td>";
          strVar += "                                                                   <td> ";
          strVar += "                                                                     <input type=\"text\" class=\"form-control awesomVariable awesomFunction\" value=\"\">";
          strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"\">";
          strVar += "                                                                   <\/td>";

          strVar += "                                                                   <td>";
          strVar += "                                                                       <a href=\"#\" class=\"saveRow\"> Save <\/span>";
          strVar += "                                                                   <\/td>";
          strVar += "                                                                   <td>";
          strVar += "                                                                       <a href=\"#\" class=\"cancelRow\"> Cancel <\/span>";
          strVar += "                                                                   <\/td>";
          strVar += "                                                               <\/tr>";
      $(table).find("tbody").append(strVar);
      $(table).find(".js-table-select").select2({ width: "100%" });
      $(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val('true');
      handleAutoComplete(false);
      menuChanged = true;
    });

    $("body").on("click", ".newLog", function (e) {
        e.preventDefault();
        var table = $(this).closest(".table-toolbar").next();
        if ($(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val() == 'true') {
            $(table).find("tbody").find(".saveRow").trigger("click");
        }
        if ($(this).closest(".table-toolbar").siblings("input[name=rowEdited]").val() == 'true') {
            $(table).find("tbody").find(".saveRow").trigger("click");
        }
        var strVar = "";
        strVar += "                                                               <tr>";
        strVar += "                                                                   <td> ";
        strVar += "                                                                     <input type=\"text\" class=\"form-control awesomVariable\" value=\"\">";
        strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"\">";
        strVar += "                                                                   <\/td>";

        strVar += "                                                           <td>";
        strVar += "                                                             <label class=\"mt-checkbox\">";
        strVar += "                                                                   <input type=\"checkbox\" class=\"form-control isEncrypted\">";
        strVar += "                                                                   <input type=\"hidden\" class=\"form-control \" value=\"false\">";
        strVar += "                                                                 <span><\/span>";
        strVar += "                                                             <\/label>";
        strVar += "                                                           <\/td>";
        strVar += "                                                           <td>";
        strVar += "                                                             <label class=\"mt-checkbox\">";
        strVar += "                                                                   <input type=\"checkbox\" class=\"form-control isBeforeLog\">";
        strVar += "                                                                   <input type=\"hidden\" class=\"form-control \" value=\"false\">";
        strVar += "                                                                 <span><\/span>";
        strVar += "                                                             <\/label>";
        strVar += "                                                           <\/td>";
        strVar += "                                                           <td>";
        strVar += "                                                             <label class=\"mt-checkbox\">";
        strVar += "                                                                   <input type=\"checkbox\" class=\"form-control isChangeLog\">";
        strVar += "                                                                   <input type=\"hidden\" class=\"form-control \" value=\"false\">";
        strVar += "                                                                 <span><\/span>";
        strVar += "                                                             <\/label>";
        strVar += "                                                           <\/td>";
        strVar += "                                                           <td>";
        strVar += "                                                             <label class=\"mt-checkbox\">";
        strVar += "                                                                   <input type=\"checkbox\" class=\"form-control isAfterLog\">";
        strVar += "                                                                   <input type=\"hidden\" class=\"form-control \" value=\"false\">";
        strVar += "                                                                 <span><\/span>";
        strVar += "                                                             <\/label>";
        strVar += "                                                           <\/td>";
        strVar += "                                                                   <td>";
        strVar += "                                                                       <a href=\"#\" class=\"saveRow\"> Save <\/span>";
        strVar += "                                                                   <\/td>";
        strVar += "                                                                   <td>";
        strVar += "                                                                       <a href=\"#\" class=\"cancelRow\"> Cancel <\/span>";
        strVar += "                                                                   <\/td>";
        strVar += "                                                               <\/tr>";
        $(table).find("tbody").append(strVar);
        $(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val('true');
        handleAutoComplete(false);
        menuChanged = true;
    });

    $("body").on("click", ".newVariable", function (e) {
        e.preventDefault();
        var table = $(this).closest(".table-toolbar").next();
        if ($(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val() == 'true') {
            $(table).find("tbody").find(".saveRow").trigger("click");
        }
        if ($(this).closest(".table-toolbar").siblings("input[name=rowEdited]").val() == 'true') {
            $(table).find("tbody").find(".saveRow").trigger("click");
        }
        var strVar = "";
        strVar += "                                                               <tr>";
        strVar += "                                                                   <td> ";
        strVar += "                                                                     <input type=\"text\" class=\"form-control awesomVariable\" value=\"\">";
        strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"\">";
        strVar += "                                                                   <\/td>";

        strVar += "                                                                   <td> ";
        strVar += "                                                                     <input type=\"text\" class=\"form-control awesomFunction\" value=\"\">";
        strVar += "                                                                     <input type=\"hidden\" class=\"form-control \" value=\"\">";
        strVar += "                                                                   <\/td>";

        strVar += "                                                                   <td>";
        strVar += "                                                                       <a href=\"#\" class=\"saveRow\"> Save <\/span>";
        strVar += "                                                                   <\/td>";
        strVar += "                                                                   <td>";
        strVar += "                                                                       <a href=\"#\" class=\"cancelRow\"> Cancel <\/span>";
        strVar += "                                                                   <\/td>";
        strVar += "                                                               <\/tr>";
        $(table).find("tbody").append(strVar);
        $(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val('true');
        handleAutoComplete(false);
        menuChanged = true;
    });

    $("body").on("click", ".newControl", function(e){
      e.preventDefault();
      var table = $(this).closest(".table-toolbar").next();
      if ($(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val() == 'true') {
          $(table).find("tbody").find(".saveRow").trigger("click");
      }
      if ($(this).closest(".table-toolbar").siblings("input[name=rowEdited]").val() == 'true') {
          $(table).find("tbody").find(".saveRow").trigger("click");
      }
      var strVar="";
        strVar += "                                                       <tr>";
        strVar += "                                                            <td> ";
        strVar += "                                                                <input type=\"text\" class=\"form-control awesomFunction\" value=\"\">";
        strVar += "                                                                <input type=\"hidden\" class=\"form-control \" value=\"\">";
        strVar += "                                                            <\/td>";
        strVar += "                                                           <td>";
        strVar += "                                                             <select class=\"js-table-select ruleSelect\">";
        strVar += "                                                               <option value=\"0\">Equals<\/option>";
        strVar += "                                                               <option value=\"1\">NotEquals<\/option>";
        strVar += "                                                               <option value=\"2\">StartsWith<\/option>";
        strVar += "                                                               <option value=\"3\">EndsWith<\/option>";
        strVar += "                                                               <option value=\"4\">GraterThan<\/option>";
        strVar += "                                                               <option value=\"5\">GraterThanOrEquals<\/option>";
        strVar += "                                                               <option value=\"6\">LessThan<\/option>";
        strVar += "                                                               <option value=\"7\">LessThanOrEquals<\/option>";
        strVar += "                                                               <option value=\"8\">None<\/option>";
        strVar += "                                                             <\/select>";
        strVar += "                                                             <input type=\"hidden\" class=\"form-control \" value=\"0\">";
        strVar += "                                                           <\/td>";
        strVar += "                                                           <td>";
        strVar += "                                                             <label class=\"mt-checkbox\">";
        strVar += "                                                                   <input type=\"checkbox\" class=\"form-control isIgnoreCase\">";
        strVar += "                                                                   <input type=\"hidden\" class=\"form-control \" value=\"false\">";
        strVar += "                                                                 <span><\/span>";
        strVar += "                                                             <\/label>";
        strVar += "                                                           <\/td>";
        strVar += "                                                            <td> ";
        strVar += "                                                                <input type=\"text\" class=\"form-control awesomFunction\" value=\"\">";
        strVar += "                                                                <input type=\"hidden\" class=\"form-control \" value=\"\">";
        strVar += "                                                            <\/td>";
        strVar += "                                                            <td> ";
        strVar += "                                                                <input type=\"text\" class=\"form-control awesomFunction\" value=\"\">";
        strVar += "                                                                <input type=\"hidden\" class=\"form-control \" value=\"\">";
        strVar += "                                                            <\/td>";
        strVar += "                                                           <td>";
        strVar += "                                                               <select class=\"treeVievMenuList\">";
        strVar +=                                                                   "<option value='0'>No Routing Menu</option>";

        strVar += "                                                               <\/select>";
        strVar += "                                                                <input type=\"hidden\" class=\"form-control \" value=\"0\">";
        strVar += "                                                           <\/td>";
        strVar += "                                                            <td> ";
        strVar += "                                                                <input type=\"text\" class=\"form-control \" value=\"\">";
        strVar += "                                                                <input type=\"hidden\" class=\"form-control \" value=\"\">";
        strVar += "                                                            <\/td>";

        strVar += "                                                            <td>";
        strVar += "                                                                <a href=\"#\" class=\"saveRow\"> Save <\/span>";
        strVar += "                                                            <\/td>";
        strVar += "                                                            <td>";
        strVar += "                                                                <a href=\"#\" class=\"cancelRow\"> Cancel <\/span>";
        strVar += "                                                            <\/td>";
        strVar += "                                                       <\/tr>";
        $(table).find("tbody").append(strVar);
        var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
        var treeMenus = [];
        jQuery.each(treeMenusData,function(index,item){
          if(item.icon !== "fa fa-volume-up" && item.icon !== "fa fa-file-text") {
              $(table).find("tr").last().find(".treeVievMenuList").append("<option value='" + item.data.menuid + "'>" + item.text + "</option>");
          }
        });
        $(table).find("tr").last().find(".js-table-select").select2({width:"100%"});
        $(table).find("tr").last().find(".treeVievMenuList").select2({ width: '100%' });
        $(this).closest(".table-toolbar").siblings("input[name=newRowAdded]").val('true');
        handleAutoComplete(false);
        menuChanged = true;
    });

    $("body").on("click", ".deleteRow", function(e){
      e.preventDefault();
      var tr = $(this).closest("tr");
      $(tr).fadeOut("fast").remove();
      menuChanged = true;
    });
    $("body").on("click", ".editRow", function (e) {
        e.preventDefault();
        var tr = $(this).closest("tr");
        $(tr).find('input').prop('disabled', false);
        $(tr).find('select').prop('disabled', false);
        $(this).removeClass("editRow").addClass("saveRow");
        $(this).text("Save");
        $(tr).find(".deleteRow").removeClass("deleteRow").addClass("cancelRow");
        $(tr).find(".cancelRow").text("Cancel");
        $(this).closest(".table").siblings("input[name=newRowAdded]").val('');
        $(this).closest(".table").siblings("input[name=rowEdited]").val('true');
        menuChanged = true;
    });
    $("body").on("click", ".saveRow", function (e) {
        e.preventDefault();
        var tr = $(this).closest("tr");
        $(tr).find('input').prop('disabled', true);
        $(tr).find('select').prop('disabled', true);
        $(this).removeClass("saveRow").addClass("editRow");
        $(this).text("Edit");
        $(tr).find(".cancelRow").removeClass("cancelRow").addClass("deleteRow");
        $(tr).find(".deleteRow").text("Delete");
        $(tr).find("input[type=text]").each(function () {
            $(this).siblings("input[type=hidden]").val($(this).val());
        });
        $(tr).find("select").each(function () {
            $(this).siblings("input[type=hidden]").val($(this).val());
        });
        $(tr).find("input[type=checkbox]").each(function () {
            $(this).siblings("input[type=hidden]").val($(this).prop('checked'));
        });
        $(this).closest(".table").siblings("input[name=newRowAdded]").val('');
        $(this).closest(".table").siblings("input[name=rowEdited]").val('');
        menuChanged = true;
    });
    $("body").on("click", ".cancelRow", function (e) {
        e.preventDefault();
        var tr = $(this).closest("tr");
        if ($(this).closest(".table").siblings("input[name=newRowAdded]").val() == 'true') {
            $(tr).fadeOut("fast").remove();
        } else {
            $(tr).find("input[type=hidden]").each(function () {
                $(this).siblings("input[type=text]").val($(this).val());
            });
            $(tr).find("input[type=hidden]").each(function () {
                $(this).siblings("select").select2({ width: '100%' }).val($(this).val()).trigger("change");;
            });
            $(tr).find("input[type=hidden]").each(function () {
                if ($(this).val() == 'true') {
                    $(this).siblings("input[type=checkbox]").prop('checked', true);
                } else {
                    $(this).siblings("input[type=checkbox]").prop('checked', false);
                }
            });
            $(tr).find('input').prop('disabled', true);
            $(tr).find('select').prop('disabled', true);
            $(this).removeClass("cancelRow").addClass("deleteRow");
            $(this).text("Delete");
            $(tr).find(".saveRow").removeClass("saveRow").addClass("editRow");
            $(tr).find(".editRow").text("Edit");
        }
        $(this).closest(".table").siblings("input[name=newRowAdded]").val('');
        $(this).closest(".table").siblings("input[name=rowEdited]").val('');
    });

    $("body").on("change", "input[type=checkbox].menuChangeControl", function (e) {
        menuChanged = true;
    });

    $("body").on("change", "input[type=text].menuChangeControl", function (e) {
        if ($(this).hasClass("awesomVariable")) {
            listVar.push($(this).val());
        }
        menuChanged = true;
    });

    $("body").on("change", "input[type=number].menuChangeControl", function (e) {
        menuChanged = true;
    });

    $("body").on("input", "textarea.menuChangeControl", function (e) {
        menuChanged = true;
    });

    $("body").on("select2:select", "select.menuChangeControl", function (e) {
        menuChanged = true;
    });

    $("body").on("click", ".debugPopUp", function (e) {
        var data = {};
        data.ProjectId = window.IvrProjectId;
        data.ObjectType = $(this).attr('data-type');
        data.Parameters = [];
        var table = $(".form-body").find("table");
        if (data.ObjectType == "Dll") {
            data.FileName = $(this).parents(".form-body").find("input[name=DllfileName]").val();
            data.TypeName = $(this).parents(".form-body").find("input[name=TypeName]").val();
            data.MethodName = $(this).parents(".form-body").find("input[name=MethodName]").val();
        }
        else if (data.ObjectType == "Sp") {
            data.ConnectionString = $(this).parents(".form-body").find("input[name=ConnectionString]").val();
            data.SpName = $(this).parents(".form-body").find("input[name=SpName]").val();
            data.CommandTimeout = $(this).parents(".form-body").find("input[name=CommandTimeout]").val();
        }
        else if (data.ObjectType == "Script") {
            data.MethodName = $(this).parents(".form-body").find("input[name=Function]").val();
            data.ScriptType = $(this).parents(".form-body").find(".scriptTypeList").select2("data")[0].id,
            data.Script = $(this).parents(".form-body").find("input[name=Script]").val();
        }
        else if (data.ObjectType == "WebService") {
            data.ServiceUri = $(this).parents(".form-body").find("input[name=ServiceUri]").val();
            data.ServiceName = $(this).parents(".form-body").find("input[name=ServiceName]").val();
            data.MethodName = $(this).parents(".form-body").find("input[name=MethodName]").val();
        }

        var allRows = table.find("tbody tr");
        jQuery.each(allRows, function (rowIndex, rowItem) {
            data.Parameters.push({
                "ParameterDirection": $(rowItem).find(".directionSelect").select2("data")[0].id,
                "VariableType": $(rowItem).find(".typeSelect").select2("data")[0].id,
                "Variable": ""
            });
        });
        
        $.get('../customtemplates/DebugObjectPopUp.hbs', function(template) {
            var popUpTemplate = Handlebars.compile(template);

            $("#debugObjectPopUp").remove();

            $("html").append(popUpTemplate(data));

            $.each(data.Parameters, function (paramIndex, paramItem) {
                $("#debugObjectPopUp").find("tbody tr").eq(paramIndex).find(".directionSelect").select2({ width: '100%' }).val(paramItem.ParameterDirection).trigger("change");
                $("#debugObjectPopUp").find("tbody tr").eq(paramIndex).find(".typeSelect").select2({ width: '100%' }).val(paramItem.VariableType).trigger("change");
            });

            $("#debugObjectPopUp").show();
            $("#debugObjectPopUp").draggable();

            $(".debugObject").on("click", function () {
                $.each(data.Parameters, function (paramIndex, paramItem) {
                    data.Parameters[paramIndex].Variable = $("#debugObjectPopUp").find("tbody tr").eq(paramIndex).find("input").val();
                });
                $.ajax({
                    url: window.appConfig.ip + "Debug/Run" + data.ObjectType,
                    type: "POST",
                    data: data,
                    success: function (result) {
                        if (result) {
                            $("#debugObjectPopUp").find("input[name=Error]").val(result.Error);
                            $("#debugObjectPopUp").find("input[name=MethodName]").val(result.ReturnValue);
                            if (result.Parameters) {
                                $.each(result.Parameters, function (paramIndex, paramItem) {
                                    $("#debugObjectPopUp").find("tbody tr").eq(paramIndex).find("input").val(paramItem.Variable);
                                });
                            }
                            toastr.success("Debug Finished");
                        } else {
                            toastr.error("Error ");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        toastr.error("Communication Error");
                    }
                });
            });
            
            $(".runDllCancel").on("click", function () {
                $("#debugObjectPopUp").hide();
                $("#debugObjectPopUp").remove();
            });
        });
    });

});
