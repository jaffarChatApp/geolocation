NgOfflineApp.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$state', '$timeout', '$sessionStorage', 'CONFIG', function ($scope, $rootScope, $http, $state, $timeout, $sessionStorage, CONFIG) {
	$scope.loginSubmit = function () {
		$state.go('dashboard');
	}

	$scope.getAddress = function () {
		//$http.get('http://ip-api.com/json').then(function (coordinates) {
		$http.get('https://api.ipdata.co/?api-key=test').then(function (coordinates) {
			$scope.myCoordinates = coordinates.data;
			//myCoordinates.lat = coordinates.lat;
			//myCoordinates.lng = coordinates.lon;
			//myCoordinates.city = coordinates.city;
			console.log("coordinates", coordinates);
			console.log("myCoordinates", $scope.myCoordinates);
			//deferred.resolve(myCoordinates);
		})
	}

	$timeout(function () {
		$scope.getAddress();
	}, 100);

	$scope.getLocation = function () {
		var latitude = 50.507351;
		var longitude = -0.127758;
		$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=AIzaSyAlzT6cuvbpmnk9LMoQILq0eNhp3k17gxQ').then(function (response) {
			console.log("response", response);
		})
	}
	$scope.getLocation();
}])
