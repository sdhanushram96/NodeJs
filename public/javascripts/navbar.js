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
				this.list[obj.eng.replace(/\W/g, '')] = obj;
				this.update();
			}
		})
		.directive('navbar', ['navbarSrv',
			function(navbarSrv) {
				return {
					restrict: 'E',
					transclude: true,
					template: '<style>body{padding:90px 40px}</style>' +
						'<nav class="navbar navbar-inverse navbar-fixed-top">' +
						'<div class="row">' +
						'<div class="col-xs-1 center-block text-right" style="padding:10px">' +
						'<div ng-show="!hideBack">' +
						'<button class="btn" onclick="window.history.back();">' +
						'<b>&#8678;</b> Back' +
						'</button>' +
						'</div>' +
						'</div>' +
						'<div class="row col-xs-10 text-muted" ng-transclude>' +
						'</div>' +
						'<div class="col-xs-1" style="padding: 10px;">' +
						'<input type="checkbox" id="langToggle">' +
						'</div>' +
						'</nav>',
					link: function(scope, elem, attrs) {
						scope.hideBack = (attrs.hideBack != undefined) ? attrs.hideBack : false;

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
									//scope.lang = isEng ? "eng" : "mar";
									navbarSrv.setLang(isEng);
									navbarSrv.update();
									Cookies.set("my_lang_settings", isEng ? "eng" : "mar");
								});
							});
						});
					},
					controller: function($scope, $http) {
						$http
							.get("/api/localize")
							.success(function(data) {
								navbarSrv.addList(data);
							}).error(function(err) {
								console.error(data);
							});
					}
				};
			}
		]);
})(window, window.angular);