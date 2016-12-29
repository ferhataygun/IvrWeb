jQuery(document).ready(function(){
   $("body").on("click", ".projeKaydet",function(e){
     e.preventDefault();
     try{
       if(true) {
            // click happened outside of menu, hide any visible menu items
            console.log("Menuyu Kaydet");
            var menuNodeId = $("#MenuId").val();
            console.log(menuNodeId);
            var menuData = {
              Name : $("input[name='Name']").val(),
              SubMenus: {$type:"System.Collections.Generic.List`1[[IvrConfigurationClasses.IvrSubMenuBase, IvrConfigurationClasses]], mscorlib",$values:[]},
              Id: 0,
              Description: "",
              Order: 0,
              IsParentMenu: false,
              ChildMenus: []
            };
            var inst = $('#treeHolder').jstree(true),
            node = inst.get_node($('#treeHolder').jstree('get_selected')[0]),
            parent = inst.get_node(node.parent);
            menuData.Order = $.inArray(node.id, parent.children);
            var allForms = $(".formPortlet");
            $.each(allForms, function(index, item){
              var $item       = $(item);
              var formType    = $item.attr("data-form-type");
              if(formType.indexOf("IvrSubMenuAssignment") !== -1){
                var inFormData  = getInFormData($item,formType);
                menuData.SubMenus.$values.push({$type: "IvrConfigurationClasses.IvrSubMenuAssignmentOffline, IvrConfigurationClasses", Type:"",Order:index,Id:0,Description:'Descripton',Name:'asdasd'});
                menuData.SubMenus.$values[index][inFormData[0]] = inFormData[1];
              }else if(formType.indexOf("IvrSubMenuRecord") !== -1){
                menuData.SubMenus.$values.push({$type: "IvrConfigurationClasses.IvrSubMenuRecordOffline, IvrConfigurationClasses", Type:"",Order:index,Id:0,Description:'Descripton',Name:'asdasd'});
                menuData.SubMenus.$values[index].FileName = $(item).find("input[name='FileName']").val();
                menuData.SubMenus.$values[index].DtmfStop = $(item).find(".dtmfCheckbox").is(":checked");
                menuData.SubMenus.$values[index].DtmfStopKey = $(item).find("input[name='DtmfStopKey']").val();
                menuData.SubMenus.$values[index].Duration =  $(item).find("input[name='Duration']").val();
              }else if(formType.indexOf("IvrSubMenuWebService") !== -1){
                // Add Parameters
                menuData.SubMenus.$values.push({$type: "IvrConfigurationClasses.IvrSubMenuWebServiceOffline, IvrConfigurationClasses", Type:"",Order:index,Id:0,Description:'Descripton',Name:'asdasd'});
                menuData.SubMenus.$values[index].ServiceUri = $(item).find("input[name='ServiceUri']").val();
                menuData.SubMenus.$values[index].ServiceName = $(item).find("input[name='ServiceName']").val();
                menuData.SubMenus.$values[index].MethodName = $(item).find("input[name='MethodName']").val();
                menuData.SubMenus.$values[index].ReturnVariable =  $(item).find("input[name='ReturnVariable']").val();
                menuData.SubMenus.$values[index].Parameters =  [];
                var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                jQuery.each(allRows, function(rowIndex, rowItem){
                  menuData.SubMenus.$values[index].Parameters.push({
                    "ParameterDirection": $(rowItem).find(".directionSelect").select2("data")[0].id,
                    "VariableType": $(rowItem).find(".typeSelect").select2("data")[0].id,
                    "Variable": $(rowItem).find("td").eq(2).find("input").val()
                  });
                });
              }else if(formType.indexOf("IvrSubMenuDll") !== -1){
                // Add Parameters
                menuData.SubMenus.$values.push({$type: "IvrConfigurationClasses.IvrSubMenuDllOffline, IvrConfigurationClasses", Type:"",Order:index,Id:0,Description:'Descripton',Name:'asdasd'});
                menuData.SubMenus.$values[index].DllfileName = $(item).find("input[name='DllfileName']").val();
                menuData.SubMenus.$values[index].TypeName = $(item).find("input[name='TypeName']").val();
                menuData.SubMenus.$values[index].MethodName = $(item).find("input[name='MethodName']").val();
                menuData.SubMenus.$values[index].ReturnVariable =  $(item).find("input[name='ReturnVariable']").val();
                menuData.SubMenus.$values[index].Parameters =  [];
                var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                jQuery.each(allRows, function(rowIndex, rowItem){
                  menuData.SubMenus.$values[index].Parameters.push({
                    "ParameterDirection": $(rowItem).find(".directionSelect").select2("data")[0].id,
                    "VariableType": $(rowItem).find(".typeSelect").select2("data")[0].id,
                    "Variable": $(rowItem).find("td").eq(2).find("input").val()
                  });
                });

              }else if(formType.indexOf("IvrSubMenuStoredProc") !== -1){
                // Add Parameters
                menuData.SubMenus.$values.push({$type: "IvrConfigurationClasses.IvrSubMenuStoredProcedureOffline, IvrConfigurationClasses", Type:"",Order:index,Id:0,Description:'Descripton',Name:'asdasd'});
                menuData.SubMenus.$values[index].ConnectionString = $(item).find("input[name='ConnectionString']").val();
                menuData.SubMenus.$values[index].SpName = $(item).find("input[name='SpName']").val();
                menuData.SubMenus.$values[index].Parameters =  [];
                var allRows = $(".formPortlet").eq(index).find("table").find("tbody tr");
                jQuery.each(allRows, function(rowIndex, rowItem){
                  menuData.SubMenus.$values[index].Parameters.push({
                    "ParameterDirection": $(rowItem).find(".directionSelect").select2("data")[0].id,
                    "VariableType": $(rowItem).find(".typeSelect").select2("data")[0].id,
                    "Variable": $(rowItem).find("td").eq(2).find("input").val()
                  });
                });
              }else if(formType.indexOf("IvrSubMenuTransfer") !== -1){
                menuData.SubMenus.$values.push({$type: "IvrConfigurationClasses.IvrSubMenuTransferOffline, IvrConfigurationClasses", Type:"",Order:index,Id:0,Description:'Descripton',Name:'asdasd'});
                menuData.SubMenus.$values[index].TransferNo = $(item).find("input[name='TransferNo']").val();
                menuData.SubMenus.$values[index].Timeout = $(item).find("input[name='Timeout']").val();
                menuData.SubMenus.$values[index].HoldMusic = $(item).find(".holdMusicCheckbox").is(":checked");
                menuData.SubMenus.$values[index].BridgeCall = $(item).find(".BridgeCallCheckbox").is(":checked");
                menuData.SubMenus.$values[index].HoldMusicFile = $(item).find("input[name='HoldMusicFile']").val();
                menuData.SubMenus.$values[index].UnavailableTransferNo = $(item).find("input[name='UnavailableTransferNo']").val();
                menuData.SubMenus.$values[index].UnavailableMenu   = $(item).find(".treeVievMenuList").select2("data")[0].id;
              }else if(formType.indexOf("IvrSubMenuPlay") !== -1){
                menuData.SubMenus.$values.push({$type: "IvrConfigurationClasses.IvrSubMenuPlayOffline, IvrConfigurationClasses", Type:"",Order:index,Id:0,Description:'Descripton',Name:'asdasd'});
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
                menuData.SubMenus.$values[index].GetInvalidInput = $(item).find(".GetInvalidInput").is(":checked");
                menuData.SubMenus.$values[index].PlayType   = $(item).find(".playTypeList").select2("data")[0].id;
              }else if(formType.indexOf("IvrSubMenuRouting") !== -1){
                menuData.SubMenus.$values.push({$type: "IvrConfigurationClasses.IvrSubMenuRoutingOffline, IvrConfigurationClasses", Type:"",Order:index,Id:0,Description:'Descripton',Name:'asdasd'});
                menuData.SubMenus.$values[index].RoutingRules = [];
                var allRows = $(item).find("table").find("tbody").find("tr");
                jQuery.each(allRows, function(rowIndex, rowItem){
                  var $item = $(rowItem);
                  menuData.SubMenus.$values[index].RoutingRules.push({
                    CompareWith: $item.find(".CompareWith").val(),
                    Description: $item.find(".Description").val(),
                    IgnoreCase: $item.find(".isIgnoreCase").is(":checked"),
                    IvrSubMenuRoutingRuleType: $item.find(".ruleSelect").select2("data")[0].id,
                    ReferenceValue: $item.find(".ReferenceValue").val(),
                    RoutingMenu: $item.find(".treeVievMenuList").select2("data")[0].id,
                    TransferNo: $item.find(".TransferNo").val(),
                  })
                });
              }
            });
              var oldTitle = $(document).find("title").text();
              $(document).find("title").text("..KAYDEDİLİYOR..");
              $.ajax({
                'url' : window.appConfig.ip + "ivr/saveivrmenu/"+ menuNodeId,
                'type' : 'PUT',
                'data' : {JsonContent: JSON.stringify(menuData)},
                success: function(data){
                  if(data < 0){
                    alert("Hata");
                    $(document).find("title").text(oldTitle);
                  }else{
                    $(document).find("title").text(oldTitle);
                    var newName = menuData.Name;
                    $("#treeHolder").jstree('rename_node', node.id , newName );
                  }
                },
                error: function(){
                  alert("Hata");
                  $(document).find("title").text(oldTitle);
                }
              });
        }
     }catch(err){}
   });

  var handleOnClick = function(){
    $("body").on("click",".openForm",function(){
      var formType  = $(this).attr("data-form-type");
      var fontClass = $(this).attr("data-font-class");
      var folderClass = fontClass + " fa fa-file-text";
      $.get('../customtemplates/'+formType+'.hbs', function (data3) {
          var template= Handlebars.compile(data3);
          var randomId  = "";
          var randomId2 = "";
          if(formType === "recordForm"){
            formType = "IvrConfigurationClasses.IvrSubMenuRecordOffline";
          }else if(formType === "degiskenAtamaForm"){
            formType = "IvrConfigurationClasses.IvrSubMenuAssignmentOffline";
          }else if(formType === "webServiceForm"){
            formType = "IvrConfigurationClasses.IvrSubMenuWebServiceOffline";
          }else if(formType === "dllForm"){
            formType = "IvrConfigurationClasses.IvrSubMenuDllOffline";
          }else if(formType === "databaseForm"){
            formType = "IvrConfigurationClasses.IvrSubMenuStoredProcedureOffline";
          }else if(formType === "transferForm"){
            formType = "IvrConfigurationClasses.IvrSubMenuTransferOffline";
          }else if(formType === "playForm"){
            formType = "IvrConfigurationClasses.IvrSubMenuPlayOffline";
          }else if(formType === "kontrolForm"){
            formType = "IvrConfigurationClasses.IvrSubMenuRoutingOffline";
          }
          if(formType === "IvrConfigurationClasses.IvrSubMenuAssignmentOffline" || formType === "IvrConfigurationClasses.IvrSubMenuWebServiceOffline" || formType === "IvrConfigurationClasses.IvrSubMenuDllOffline" || formType === "IvrConfigurationClasses.IvrSubMenuStoredProcedureOffline"){
            randomId  =  Math.random().toString(36).substr(2, 5);
            randomId2 =  Math.random().toString(36).substr(2, 5);
            $("#sortable_portlets").append(template({inFormData:{Type:formType, tableID:randomId,btnID:randomId2},fontClass:fontClass}));
          }else{
            if(formType === "IvrConfigurationClasses.IvrSubMenuTransferOffline"){
              var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
              var treeMenus = []
              jQuery.each(treeMenusData,function(index,item){
              	if(item.icon !== "fa fa-volume-up" && item.icon !== "fa fa-file-text"){
              		treeMenus.push({id:item.data.menuid, text:item.text});
                }
              });
              $("#sortable_portlets").append(template({inFormData:{Type:formType,treeview:treeMenus},fontClass:fontClass}));
              if($(".treeVievMenuList").length){
                $(".treeVievMenuList").select2({width:'100%'});
              }
            }else if(formType === "IvrConfigurationClasses.IvrSubMenuRoutingOffline"){
              var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
              var treeMenus = []
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
          if(formType === "IvrConfigurationClasses.IvrSubMenuAssignmentOffline" || formType === "IvrConfigurationClasses.IvrSubMenuWebServiceOffline" || formType === "IvrConfigurationClasses.IvrSubMenuDllOffline" || formType === "IvrConfigurationClasses.IvrSubMenuStoredProcedureOffline"){
            if(formType === "IvrConfigurationClasses.IvrSubMenuAssignmentOffline"){
              window.TableDatatablesEditable("#"+randomId,"#"+randomId2);
            }else{
              window.TableDatatablesEditable2("#"+randomId,"#"+randomId2);
            }
          }

          //masks
          $(".mask-number").inputmask({
                "mask": "9",
             "repeat": 10,
             "greedy": false
          });
          $(".js-table-select").select2({width:"100%"});
          if($(".playTypeList").length){
            $(".playTypeList").select2({width:"100%"})
          }
      }, 'html');
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
      formType = "degiskenAtamaForm";
    }else if(str.indexOf("IvrSubMenuRecord") !== -1){
      formType = "recordForm";
    }else if(str.indexOf("IvrSubMenuWebService") !== -1){
      formType = "webServiceForm";
    }else if(str.indexOf("IvrSubMenuDll") !== -1){
      formType = "dllForm";
    }else if(str.indexOf("IvrSubMenuStoredProc") !== -1){
      formType = "databaseForm";
    }else if(str.indexOf("IvrSubMenuTransfer") !== -1){
      formType = "transferForm";
    }else if(str.indexOf("IvrSubMenuPlay") !== -1){
      formType = "playForm";
    }else if(str.indexOf("IvrSubMenuRouting") !== -1){
      formType = "kontrolForm";
    }
    return formType;
  };


  /* Global Functions - make treeview */
  window.makeTreeView = function(myTreeData){
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
                    success: function(data, textStatus, jqXHR){
                      if(data < 0){
                        result = false;
                      }else{
                        result = true;
                      }
                    },
                    error: function (jqXHR, textStatus, errorThrown){
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
                   "label": "Ekle",
                   "action": function (data) {
                       var ref = $.jstree.reference(data.reference),
                           sel = ref.get_selected();
                       if(!sel.length) { return false; }
                       sel = sel[0];
                       if(!$('#treeHolder').jstree(true).get_json(sel).data.menuid){
                         var menuData = {
                           Id: jQuery(".contProject.active").find("a").attr("data-id"),
                           Name: "Yeni Menu",
                           Description: "",
                           Order: 1,
                           IsParentMenu: true,
                           SubMenus: [],
                           ChildMenus: []
                         };
                       }else{
                         var menuData = {
                           Id: $('#treeHolder').jstree(true).get_json(sel).data.menuid,
                           Name: "Yeni Menu",
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
                         success: function(newmenudata){
                           console.log(newmenudata);
                           if(newmenudata < 0){
                             alert("Hata");
                           }else{
                             sel = ref.create_node(sel, {"type":"folder", "data":{menuid:newmenudata, Name:menuData.Name}});
                             $("#treeHolder").jstree("open_all");
                           }

                         },
                         error: function(){
                           alert("Meni olusturulamadi");
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
                         success: function(){
                           ref.delete_node(sel);
                         },
                         error: function(){
                           alert("Meni silinmemedi");
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
      if($('#treeHolder').jstree(true).get_json(treeData.node.id).icon === "fa fa-volume-up"){
        $("#app-main").html("");
        return false;
      }
      var menuId = $('#treeHolder').jstree(true).get_json(treeData.node.id).data.menuid;
      $.ajax({
        'url' : window.appConfig.ip + "ivr/getivrmenu/"+ menuId,
        'type' : 'GET',
        'datatype' : "application/json",
        success: function(menuData){
          var menuData = menuData;
          $.get('../customtemplates/newComp3.hbs', function (menuTemplate) {
            window.MenuDataChanged = false;
            $("body").find("input").on("change", function(){
              window.MenuDataChanged = true;
            });
              var menuTemplate = Handlebars.compile(menuTemplate);
              var randomId = "";
              var randomId2 = "";
              $("#app-main").html(menuTemplate(menuData));
              handleOffClick();
              handleOnClick();
              makeSortableItems();
              var inMenuForms = menuData.SubMenus;
              $.each(inMenuForms, function(index, item){
                var formType     = getMenuType(item.Type);
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
                       if(formType == "degiskenAtamaForm"){
                         menuData.SubMenus[index].tableID = randomId;
                         menuData.SubMenus[index].btnID = randomId2
                       }
                       if(formType === "transferForm"){
                         var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
                         var treeMenus = []
                         jQuery.each(treeMenusData,function(index,item){
                          if(item.icon !== "fa fa-volume-up" && item.icon !== "fa fa-file-text"){
                            treeMenus.push({id:item.data.menuid, text:item.text});
                           }
                         });
                         menuData.SubMenus[index].treeview = treeMenus;
                       }
                       if(formType === "kontrolForm"){
                         var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
                         var treeMenus = []
                         jQuery.each(treeMenusData,function(index,item){
                          if(item.icon !== "fa fa-volume-up" && item.icon !== "fa fa-file-text"){
                            treeMenus.push({id:item.data.menuid, text:item.text});
                           }
                         });
                         $.each(menuData.SubMenus[index].RoutingRules, function(index, item){
                           item.tree = treeMenus
                         });
                       }
                       $("#sortable_portlets").append(formTemplate({menuData:menuData, inFormData:menuData.SubMenus[index]}));
                       if(formType === "dllForm"  || formType == "webServiceForm" || formType == "databaseForm"){
                         $.each(menuData.SubMenus[index].Parameters, function(paramIndex, paramItem){
                           $(".formPortlet").eq(index).find("tbody tr").eq(paramIndex).find(".directionSelect").select2({width:'100%'}).val(paramItem.ParameterDirection).trigger("change");
                           $(".formPortlet").eq(index).find("tbody tr").eq(paramIndex).find(".typeSelect").select2({width:'100%'}).val(paramItem.VariableType).trigger("change");
                         });
                       }
                       $("#sortable_portlets").sortable('refresh');
                       if(formType == "degiskenAtamaForm" ){
                           window.TableDatatablesEditable("#"+randomId,"#"+randomId2);
                       }
                       if(formType === "transferForm"){
                         $(".formPortlet").eq(index).find(".treeVievMenuList").select2({width:'100%'}).val(menuData.SubMenus[index].UnavailableMenu).trigger("change");
                       }
                       if(formType === "playForm"){
                         $(".formPortlet").eq(index).find(".playTypeList").select2({width:'100%'}).val(menuData.SubMenus[index].PlayType).trigger("change");
                       }
                       if(formType === "kontrolForm"){
                         $(".formPortlet").eq(index).find(".js-table-select").select2({width:'100%'});
                         var allRows = $(".formPortlet").eq(index).find("table").find("tbody").find("tr");
                         jQuery.each(allRows,function(rowIndex, rowItem){
                           $(rowItem).find(".treeVievMenuList").select2({width:'100%'}).val(menuData.SubMenus[index].RoutingRules[rowIndex].RoutingMenu).trigger("change");
                           $(rowItem).find(".ruleSelect").select2({width:'100%'}).val(menuData.SubMenus[index].RoutingRules[rowIndex].IvrSubMenuRoutingRuleType).trigger("change");
                         });
                       }

                       // Suraya
                       try{
                         $(".mask-number").inputmask({
                               "mask": "9",
                            "repeat": 10,
                            "greedy": false
                         });
                       }catch(err){}

                     },
                     error: function(){
                       console.log("HATA");
                     }
                });
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
        message: "Formu Silmek istediginize emin misiniz?",
        callback: function(result){
          if(result){
            t.delete_node([nodeId]);
            toRemovePortlet.fadeOut('fast').remove();
          }else{}
        }
      });
    });


    var getInFormData = function($item, formType){
      if(formType.indexOf("IvrSubMenuAssignment") !== -1){
        var assigments = [];
        var tableDom = $item.find("table").DataTable();
        var tableData = tableDom.rows().data();
        $.each(tableData, function(index,item){
          assigments.push({
            VariableDefinition: item[0],
            VaribleValue: item[1]
          })
        });
        return ["Assignments",assigments];
      }else if(formType.indexOf("IvrSubMenuRecord") !== -1){

      }

    }

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

    $("body").on("click", ".newParameter", function(e){
      e.preventDefault();
      var table = $(this).closest(".table-toolbar").next();
      var strVar="";
          strVar += "                                                               <tr>";
          strVar += "                                                                   <td>";
          strVar += "                                                                     <select class=\"js-table-select directionSelect\">";
          strVar += "                                                                       <option value=\"0\">In<\/option>";
          strVar += "                                                                       <option value=\"1\">Out<\/option>";
          strVar += "                                                                     <\/select>";
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
          strVar += "                                                                   <\/td>";
          strVar += "                                                                   <td> <input type=\"text\" class=\"form-control\" name=\"\" value=\"\"> <\/td>";
          strVar += "                                                                   <td>";
          strVar += "                                                                       <a href=\"#\" class=\"deleteParameter\"> Delete <\/span>";
          strVar += "                                                                   <\/td>";
          strVar += "                                                               <\/tr>";
      $(table).find("tbody").append(strVar);
      $(table).find(".js-table-select").select2({width:"100%"});
    });

    $("body").on("click", ".newControl", function(e){
      e.preventDefault();
      var table = $(this).closest(".table-toolbar").next();
      var strVar="";
strVar += "                                                       <tr>";
strVar += "                                                           <td> <input type=\"text\" class=\"form-control ReferenceValue\" value=\"\"> <\/td>";
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
strVar += "                                                           <\/td>";
strVar += "                                                           <td>";
strVar += "                                                             <label class=\"mt-checkbox\">";
strVar += "                                                                   <input type=\"checkbox\" class=\"form-control isIgnoreCase\">";
strVar += "                                                                   <input type=\"checkbox\" class=\"form-control isIgnoreCase\">";
strVar += "                                                                 <span><\/span>";
strVar += "                                                             <\/label>";
strVar += "                                                           <\/td>";
strVar += "                                                           <td> <input type=\"text\" class=\"form-control CompareWith\" value=\"\"> <\/td>";
strVar += "                                                           <td> <input type=\"text\" class=\"form-control TransferNo\" value=\"\"> <\/td>";
strVar += "                                                           <td>";
strVar += "                                                               <select class=\"treeVievMenuList\">";
strVar +=                                                                   "<option value='0'>No Routing Menu</option>";

strVar += "                                                               <\/select>";
strVar += "                                                           <\/td>";
strVar += "                                                           <td> <input type=\"text\" class=\"form-control Description\" value=\"\"> <\/td>";
strVar += "                                                           <td>";
strVar += "                                                               <a href=\"#\" class=\"deleteControl\"> Delete <\/span>";
strVar += "                                                           <\/td>";
strVar += "                                                       <\/tr>";
$(table).find("tbody").append(strVar);
var treeMenusData = $('#treeHolder').jstree(true).get_json('#', {flat:true});
var treeMenus = [];
jQuery.each(treeMenusData,function(index,item){
  if(item.icon !== "fa fa-volume-up" && item.icon !== "fa fa-file-text"){
    $(table).find("tr").last().find(".treeVievMenuList").append("<option value='"+item.data.menuid+"'>"+item.text+"</option>")
  }
});
$(table).find("tr").last().find(".js-table-select").select2({width:"100%"});
$(table).find("tr").last().find(".treeVievMenuList").select2({width:'100%'});

    });
    $("body").on("click", ".deleteControl", function(e){
      e.preventDefault();
      var tr = $(this).closest("tr");
      $(tr).fadeOut("fast").remove();
    });
    $("body").on("click", ".deleteParameter", function(e){
      e.preventDefault();
      var tr = $(this).closest("tr");
      $(tr).fadeOut("fast").remove();
    });

});
