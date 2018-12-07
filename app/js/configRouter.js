NgOfflineApp.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "$locationProvider", "JS_REQUIRES", "$ocLazyLoadProvider", "$controllerProvider", "$mdThemingProvider", function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, jsRequires, $ocLazyLoadProvider, $controllerProvider, $mdThemingProvider) {

	$mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
	$mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
	$mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
	$mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
	NgOfflineApp.controller = $controllerProvider.register;
	//LAZY MODULES
	$ocLazyLoadProvider.config({
		debug: false,
		events: true,
		modules: jsRequires.modules
	});

	$urlRouterProvider.otherwise("/login");
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'app/templates/login.html?v=1.2-Dec-07',
		resolve: loadSequence('LoginCss', 'HelperCss', 'FontAwesome', 'MaterialCss', 'NgStorageJs', 'AppCtrl', 'LoginCtrl'),
		controller: 'loginCtrl',
		title: 'Login'
	}).state('home', {
		url: '/home',
		templateUrl: 'app/templates/sidePanel.html?v=1.2-Dec-07',
		resolve: loadSequence('HelperCss', 'FontAwesome', 'MaterialCss', 'NgStorageJs', 'AppCtrl'),
		controller: 'appCtrl',
		title: 'Home-Angular-JS-Boiler-Plate'
	}).state('dashboard', {
		url: '/dashboard',
		templateUrl: 'app/templates/dashboard.html?v=1.2-Dec-07',
		resolve: loadSequence('DashboardCss', 'HelperCss', 'FontAwesome', 'MaterialCss', 'NgStorageJs', 'AppCtrl', 'DashboardCtrl'),
		controller: 'dashboardCtrl',
		title: 'Dashboard'
	});

	function loadSequence() {
		var _args = arguments;
		return {
			deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
				var promise = $q.when(1);
				for (var i = 0, len = _args.length; i < len; i++) {
					promise = promiseThen(_args[i]);
				}
				return promise;

				function promiseThen(_arg) {
					if (typeof _arg == 'function') return promise.then(_arg);
					else return promise.then(function () {
						var nowLoad = requiredData(_arg);
						if (!nowLoad) {
							return $.error('Route resolve: Bad resource name [' + _arg + ']');
						} else {
							return $ocLL.load(nowLoad);
						}
					});
				}

				function requiredData(name) {
					if (jsRequires.modules)
						for (var m in jsRequires.modules)
							if (jsRequires.modules[m].name && jsRequires.modules[m].name === name) return jsRequires.modules[m];
					return jsRequires.scripts && jsRequires.scripts[name];
				}
   }]
		};
	};
}]);
