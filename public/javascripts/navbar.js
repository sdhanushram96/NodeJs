(function(window, angular) {
	'use strict';

	angular.module('navbar', [])
		.constant('jQuery', window.jQuery)
		.service('navbarSrv', function() {
			this.list = {};
			this.isEng = 'mar';
			this.setLang = function(isEng) {
				this.isEng = isEng;
			}
			this.setScope = function(scope) {
				scope.l = this.list;
			}
			this.update = function() {
				//var key in obj  \n if obj.hasOwnProperty(key)
				var keys = Object.getOwnPropertyNames(this.list);
				for (var i = 0; i < keys.length; i++) {
					var ob = this.list[keys[i]];
					ob.val = this.isEng ? ob.eng : ob.mar;
				}
			}
			this.addList = function(ls) {
				for (var i = 0; i < ls.length; i++) {
					//scope_list[ls[i].eng] = ls[i];
					this.add(ls[i]);
				}
			}
			this.add = function(obj) {
				this.list[obj.eng] = obj; //escape obj.eng to cameltoe or remove spaces
				this.update();
			}
		})
		.directive('includes', function() {
			return {
				restrict: 'E',
				replace: true,
				template: '<i>' +
					'<link href="/stylesheets/bootstrap.min.css" rel="stylesheet"/>' +
					'<link href="/bower_components/bootstrap-toggle/css/bootstrap-toggle.min.css" rel="stylesheet"/>' +
					'</i>'
			};
		})
		.directive('navbar', ['navbarSrv',
			function(navbarSrv) {
				return {
					restrict: 'E',
					replace: true,
					template: '<nav class="navbar navbar-inverse navbar-fixed-top">' +
						'<includes></includes>' +
						'<div class="container-fluid">' +
						'<div class="navbar-header">' +
						'<button class=" btn" style="margin-top:8px;" onclick="window.history.back();">' +
						'<b>&#8678;</b> Back' +
						'</button>' +
						'</div>' +
						'<div class="nav navbar-nav navbar-right" style="padding: 10px;">' +
						'<input type="checkbox" id="langToggle">' +
						'</div>' +
						'</div>' +
						'</nav>',
					link: function(scope, elem, attrs) {
						angular.element(document).ready(function() {
							var lang = Cookies.get("my_lang_settings");
							//lang = "mar";
							if (!lang) {
								Cookies.set("my_lang_settings", "mar");
								lang = Cookies.get("my_lang_settings");
							}
							var toggle = $('#langToggle').bootstrapToggle({
								on: 'English',
								off: 'Marathi',
							})
							if (lang == 'eng') {
								toggle.bootstrapToggle('on');

							}
							navbarSrv.setLang(lang == 'eng');
							navbarSrv.update();

							toggle.change(function() {
								scope.$apply(function() {
									var isEng = $('#langToggle').prop('checked');
									scope.lang = isEng ? "eng" : "mar";
									navbarSrv.setLang(isEng);
									navbarSrv.update();
								});
							});
							scope.$watch('lang', function() {
								Cookies.set("my_lang_settings", scope.lang);
							});
						});
					},
					controller: function($scope, $http) {
						setTimeout(function() {
							$scope.$apply(function() {
								var ls = [{
									eng: "Gold",
									mar: "sona"
								}, {
									eng: "Silver",
									mar: "chandi"
								}];
								navbarSrv.addList(ls);
							});
						}, 1000);
						/*
						$http
							.get("/api/localize")
							.success(function(data) {
								for (var i = 0; i < data.length; i++) {
									$scope.l[data[i].eng] = data[i];
								}
								console.log($scope.l);
							}).error(function(err) {
								console.error(data);
							});*/
					}
				};
			}
		]);
})(window, window.angular);

//module.exports = 'navbar';