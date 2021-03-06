'use strict';
/**
 * Config constant
 */
NgOfflineApp.constant('APP_MEDIAQUERY', {
	'desktopXL': 1200,
	'desktop': 992,
	'tablet': 768,
	'mobile': 480
});
NgOfflineApp.constant('JS_REQUIRES', {
	scripts: {
		'AppCtrl': 'app/js/controllers/appCtrl.js?v=1.2-Dec-07',
		'LoginCtrl': 'app/js/controllers/loginCtrl.js?v=1.2-Dec-07',
		'DashboardCtrl': 'app/js/controllers/dashboardCtrl.js?v=1.2-Dec-07'
	},
	modules: [{
			name: 'LoginCss',
			files: ['app/css/login.css?v=1.2-Dec-07']
        }, {
			name: 'DashboardCss',
			files: ['app/css/dashboard.css?v=1.2-Dec-07']
        }, {
			name: 'HelperCss',
			files: ['app/css/helper.css?v=1.2-Dec-07']
        }, {
			name: 'FontAwesome',
			files: ['app/css/font-awesome.min.css?v=1.2-Dec-07']
        }, {
			name: 'MaterialCss',
			files: ['app/css/angular-material.min.css?v=1.2-Dec-07']
        }, {
			name: 'NgSanitizeJs',
			files: ['app/plugins/angular-1.6.6/angular-sanitize.min.js?v=1.2-Dec-07']
        }, {
			name: 'NgStorageJs',
			files: ['app/plugins/angular-1.6.6/ngStorage.js?v=1.2-Dec-07']
        }
    ]
});
