defineM("deltapi-site-settings",function(e,a,b){
	a.regExtension({
		name:"deltapi-site-settings",
		events:{
			loadedProject: function() {
				//alert("loaded project");
				if(mbrApp.projectSettings["dppsSwitcher"] === undefined){
					mbrApp.projectSettings["dppsSwitcher"] = true;
				};
				if(mbrApp.projectSettings["spellingSwitch"] === undefined){
					mbrApp.projectSettings["spellingSwitch"] = true;
				};
				if(mbrApp.projectSettings["site_lang"] === undefined||mbrApp.projectSettings["site_lang"] =="undefined"){
					mbrApp.projectSettings["site_lang"] = "en";
				};
				a.Core.$body.find('.template').attr('spellcheck',mbrApp.projectSettings.spellingSwitch);
				
			},			
			load: function(){
				if(Bridge.version.substr(0,1)=="4"){
				
/*				a.addFilter(
					"publishHTML",
					function(b){
						var c=a.projectSettings["global_after_closing_body"]||"";
						return c?b.replace("</body>","</body>\n"+c):b
				});
*/				a.addFilter(
					"publishHTML",
					function(b){
					var c=a.projectSettings["global_before_html"]||"";
					return c?b.replace("<head>",c+"\n<head>"):b
				});
					a.addFilter(
					"publishHTML",
					function(b){
					var c=a.projectSettings["global_header_custom"]||"";
					return c?b.replace("</head>",c+"</head>"):b
				});
					a.addFilter(
					"publishHTML",
					function(b){
					var c=a.projectSettings["global_after_body"]||"";
					return c?b.replace("<body>","<body>\n"+c):b
				});
					a.addFilter(
					"publishHTML",
					function(b){
					var c=a.projectSettings["global_footer_custom"]||"";
					return c?b.replace("</body>",c+"</body>"):b
				});
				}

				a.$body.find("#app-page-settings .app-layer-cont").append([			
				'<div class="form-group row clearfix">',
				'<label class="col-md-10 control-label">Show DeltaPi page settings:</label>',
				'<div class="togglebutton col-md-2"><label style="width: 100%; text-align: right;"><input type="checkbox" id="dppsSwitcher"><span class="toggle" style="margin:0; display: inline-flex;"></span></label></div>',
				'</div>',
				'<div class="form-group dpps"><label for="page_html_before">Before the HTML code:</label><textarea id="page_html_before" class="form-control" data-page-settings="html_before" rows="3" placeholder="Paste any code here. The code will be inserted before the HTML code"></textarea></div>',
				'<div class="form-group dpps"><label for="page_header_custom">Inside &lt;head&gt; code:</label><textarea id="page_header_custom" class="form-control" data-page-settings="header_custom" rows="3" placeholder="Paste any valid HTML code here. The code will be inserted to the end of &lt;head&gt section, right before &lt;/head&gt"></textarea></div>',
				'<div class="form-group dpps"><label for="page_meta_descr">meta description of page:</label><textarea id="page_meta_descr" class="form-control" data-page-settings="meta_descr" rows="3" placeholder="Enter page description here. The text will be inserted in a meta tag named description in the page header section."></textarea></div>',
				'<div class="form-group dpps"><label for="page_footer_custom">End of &lt;body&gt; code:</label><textarea id="page_footer_custom" class="form-control" data-page-settings="footer_custom" rows="3" placeholder="Paste any valid HTML code here. The code will be inserted to the end of <body> section, right before &lt;/body&gt; tag"></textarea></div>'].join("\n"));
				a.addFilter("pageNameFullEdit", function() {
                    return !0
                });
				a.$body.on("change", "#dppsSwitcher", function() {
					e(this).prop("checked") ? mbrApp.projectSettings.dppsSwitcher = true : mbrApp.projectSettings.dppsSwitcher = false;
					a.alertDlg('close and open again Page Settings to see changes');
					a.runSaveProject(function() {						
						//a.alertDlg("project saved !");
					});
				});
				a.addFilter("sidebarProjectSettings",function(d){
					var c={
						title:"DeltaPi Settings",
						name:"deltapi-site-settings",
						html:['<div class="row">',
//						'<div class="col-md-12 form-group"><label class="control-label" for="siteName">Site Name</label><input id="site-settings-name" name="name" type="text" placeholder="Site Name" value="'+a.projectSettings.name+'" class="form-control"></div>',
						'<div class="col-md-12 form-group"><button type="button" class="btn btn-primary projpath">Show project path</button></div>',
						'<div class="col-md-12 form-group"><label class="control-label" >Insert code before HTML, in &lt;head&gt;, before or at end of &lt;body&gt;</label>',
						'<div class="col-md-12 form-group"><button type="button" class="btn btn-primary pagesbefore">Global Before HTML</button></div>',
						'<div class="col-md-12 form-group"><button type="button" class="btn btn-primary pageshead">Global Header</button></div>',
						'<div class="col-md-12 form-group"><button type="button" class="btn btn-primary pagesafter">Global After body tag</button></div>',
						'<div class="col-md-12 form-group"><button type="button" class="btn btn-primary pagesfoot">Global Before body closing tag</button></div>',
//						'<div class="col-md-12 form-group"><button type="button" class="btn btn-primary pagesafterbody">Global After body closing tag</button></div></div>',
						'<div class="col-md-12 form-group"><label class="control-label" >Copy/Paste page between compatible themes</label>',
						'<div class="col-md-12 form-group"><button type="button" class="btn btn-material-green copysavedpage" data-tooltipster="bottom" title="Copy current page to memory"><i class="mbr-icon-login"></i> Copy page</button></div>',
						'<div class="col-md-12 form-group"><button type="button" class="btn btn-material-blue pastesavedpage" data-tooltipster="bottom" title="Add page saved in memory to current Site"><i class="mbr-icon-logout"></i> Paste Page</button></div></div>',
						'<div class="col-md-12 form-group"><label class="control-label" for="site_lang">Site Language</label><input id="site_lang" name="site_lang" type="text" placeholder="en" value="'+a.projectSettings.site_lang+'" class="form-control"></div>',
						'<label class="col control-label" for="spellingSwitch">Toggle Spelling On/Off</label>',
						'<div class="togglebutton col-auto"><label><input type="checkbox" id="spellingSwitch" '+(mbrApp.projectSettings.spellingSwitch?"checked":"")+'><span class="toggle" style="margin:0;"></span></label></div></div>',
						'<div class="col-md-12 form-group"><button type="button" class="btn btn-primary sendmail">Please send feedback to DeltaPi</button></div>',
						'</div>'].join("\n")
					};
					d.push(c);
					return d
				});
			},
			showedPageSettings:function(d,c){
				//alert(a.projectSettings.dppsSwitcher);
				if(mbrApp.projectSettings.dppsSwitcher){
					$(".dpps").show();
					$("#dppsSwitcher").prop("checked",true);
				}else{
					$(".dpps").hide();
					$("#dppsSwitcher").prop("checked",false);
				}
			},
			shownSidebarProjectSettings:function(d,c){
				$(".sendmail").on("click", function() { a.openUrl("http://patrickdegand.net"); });
				
				$("#spellingSwitch").on("change", function() {
					$(this).prop("checked") ? mbrApp.projectSettings.spellingSwitch = true : mbrApp.projectSettings.spellingSwitch = false;
					a.Core.$body.find('.template').attr('spellcheck',mbrApp.projectSettings.spellingSwitch);
				});
				$(".sitename").on("click", function() {
					a.showDialog({
						title: "Site Name",
						className: "sitename-modal",
						body: ['<form class="page-settings-form">\n<div class="form-group clearfix">\n<div class="col-md-12">\n<textarea class="form-control newsitename" rows="1">',
						a.projectSettings.name,
						'</textarea>\n</div>\n</div>\n</form>'
						].join("\n"),
						buttons: [{
							label: "save",
							default: !0,
							callback: function() {
								a.projectSettings.name = e(".newsitename").val();
								mbrApp.runSaveProject(function() {
									//a.alertDlg("project saved !")
								});
							}
						},
						{
							label: "close",
							default: !0,
							callback: function() {
								e(".sitename-modal").remove()
							}
						}
						]
					})
				});
				$(".projpath").on("click", function() {
					a.showDialog({
						title: "Project Path",
						className: "dp-modal",
						body: ['<form class="page-settings-form"><div class="form-group clearfix"><div class="col-md-12">',
							'<input type="text" readonly class="form-control" name="projectUrl" value="'+a.projectSettings.path+'"><br>',
							'<input type="text" readonly class="form-control" id="newProjectPath" value="'+a.projectPath.fakeReplace('file:///','')+'"><br>',
							'</div></div></form>'
						].join("\n"),
						buttons: [{
							label: "close",
							default: !0,
							callback: function() {
								$(".dp-modal").remove()
							}
						}]
					})
				});				
				$(".pageshead").on("click", function() {
					a.showDialog({
						title: "Global Header",
						className: "pageshead-modal",
						body: ['<form class="page-settings-form">\n<div class="form-group clearfix">\n<div class="col-md-12">\n<textarea class="form-control headsHTML" name="headersHTML" rows="10">',
						(a.projectSettings.global_header_custom||""),
						'</textarea>\n</div>\n</div>\n</form>'
						].join("\n"),
						buttons: [{
							label: "save",
							default: !0,
							callback: function() {
								a.projectSettings.global_header_custom = e(".headsHTML").val();
								mbrApp.runSaveProject(function() {
									//a.alertDlg("project saved !")
								});
							}
						},
						{
							label: "close",
							default: !0,
							callback: function() {
								e(".pageshead-modal").remove()
							}
						}
						]
					})
				});				
				$(".pagesbefore").on("click", function() {
					a.showDialog({
						title: "Global Before HTML",
						className: "pagesbefore-modal",
						body: ['<form class="page-settings-form">\n<div class="form-group clearfix">\n<div class="col-md-12">\n<textarea class="form-control beforeHTML" name="beforeHTML" rows="10">',
						(a.projectSettings.global_before_html||""),
						'</textarea>\n</div>\n</div>\n</form>'
						].join("\n"),
						buttons: [{
							label: "save",
							default: !0,
							callback: function() {
								a.projectSettings.global_before_html = e(".beforeHTML").val();
								mbrApp.runSaveProject(function() {
									//a.alertDlg("project saved !")
								});
							}
						},
						{
							label: "close",
							default: !0,
							callback: function() {
								e(".pagesbefore-modal").remove()
							}
						}
						]
					})
				});
				$(".pagesfoot").on("click", function() {
					a.showDialog({
						title: "Global Before Body Closing Tag",
						className: "pagesfoot-modal",
						body: ['<form class="page-settings-form">\n<div class="form-group clearfix">\n<div class="col-md-12">\n<textarea class="form-control footsHTML" name="footersHTML" rows="10">',
						(a.projectSettings.global_footer_custom||""),
						'</textarea>\n</div>\n</div>\n</form>'
						].join("\n"),
						buttons: [{
							label: "save",
							default: !0,
							callback: function() {
								a.projectSettings.global_footer_custom = e(".footsHTML").val();
								mbrApp.runSaveProject(function() {
									//a.alertDlg("project saved !")
								});
							}
						},
						{
							label: "close",
							default: !0,
							callback: function() {
								e(".pagesfoot-modal").remove()
							}
						}
						]
					})
				});
				
				$(".pagesafter").on("click", function() {
					a.showDialog({
						title: "Global After Body Tag",
						className: "pagesafter-modal",
						body: ['<form class="page-settings-form">\n<div class="form-group clearfix">\n<div class="col-md-12">\n<textarea class="form-control afterBody" name="afterBody" rows="10">',
						(a.projectSettings.global_after_body||""),
						'</textarea>\n</div>\n</div>\n</form>'
						].join("\n"),
						buttons: [{
							label: "save",
							default: !0,
							callback: function() {
								a.projectSettings.global_after_body = e(".afterBody").val();
								mbrApp.runSaveProject(function() {
									//a.alertDlg("project saved !")
								});
							}
						},
						{
							label: "close",
							default: !0,
							callback: function() {
								e(".pagesafter-modal").remove()
							}
						}
						]
					})
				});
				
				$(".pagesafterbody").on("click", function() {
					a.showDialog({
						title: "Global After Body Closing Tag",
						className: "pagesafterbody-modal",
						body: ['<form class="page-settings-form">\n<div class="form-group clearfix">\n<div class="col-md-12">\n<textarea class="form-control afterClosingBody" name="afterClosingBody" rows="10">',
						(a.projectSettings.global_after_closing_body||""),
						'</textarea>\n</div>\n</div>\n</form>'
						].join("\n"),
						buttons: [{
							label: "save",
							default: !0,
							callback: function() {
								a.projectSettings.global_after_closing_body = e(".afterClosingBody").val();
								mbrApp.runSaveProject(function() {
									//a.alertDlg("project saved !")
								});
							}
						},
						{
							label: "close",
							default: !0,
							callback: function() {
								e(".pagesafterbody-modal").remove()
							}
						}
						]
					})
				});
				
				$(".copysavedpage").on("click", function() {
					try{				
						var currentPage = a.Core.currentPage;
						var currentPageData = a.Core.resultJSON[currentPage];
						savedpageJSON.name = currentPage;
						savedpageJSON.theme = a.projectSettings.theme.name;
						savedpageJSON.origin = a.projectSettings.name;
						//savedpageJSON.data = JSON.parse(JSON.stringify(currentPageData));
						savedpageObj = Object.assign({}, currentPageData);
						a.alertDlg("Current page "+currentPage+" saved in memory");
					}catch(err){
						a.alertDlg(err.name + ' with message : ' +err.message);
					}					
				});
				$(".pastesavedpage").on("click", function() {
					//a.alertDlg(savedpageJSON.theme + " =? " + a.projectSettings.theme.name);
					if (savedpageJSON.theme != a.projectSettings.theme.name){
						a.confirmDlg("Current site theme is different from the page you want to paste. Proceed only if themes are compatible !!!", function(c) { if(c) {pastePage()} })
					}else{pastePage()}
					function pastePage(){
						//a.Core.resultJSON.newpage = JSON.parse(JSON.stringify(savedpageJSON.data));
						a.Core.resultJSON.newpage = Object.assign({}, savedpageObj);
						a.Core.resultJSON.newpage.settings.main = false;
						a.runSaveProject(function() {
							a.loadRecentProject(function(){
								$("a[data-page='"+currentPage+"']").trigger("click")
							})
						})
						a.alertDlg("Page "+savedpageJSON.name+" from site "+savedpageJSON.origin+" added to current site. Do not forget to change the URL of the copied page !");
					}
				});
			}
		}
	})
},
["jQuery","mbrApp","TR()"]);


