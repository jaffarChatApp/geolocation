NgOfflineApp.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$state', '$timeout', '$sessionStorage', 'CONFIG', function ($scope, $rootScope, $http, $state, $timeout, $sessionStorage, CONFIG) {
	$scope.loginSubmit = function () {
		console.log("dashboard");
		$state.go('dashboard');
	}

	$scope.getAddress = function () {
		$http.get('http://ip-api.com/json').then(function (coordinates) {
			var myCoordinates = {};
			myCoordinates.lat = coordinates.lat;
			myCoordinates.lng = coordinates.lon;
			myCoordinates.city = coordinates.city;
			console.log("coordinates", coordinates);
			//deferred.resolve(myCoordinates);
		})
	}

	$timeout(function () {
		$scope.getAddress()
	}, 100)

}])
