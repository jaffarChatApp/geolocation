NgOfflineApp.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$state', '$timeout', '$sessionStorage', 'CONFIG', function ($scope, $rootScope, $http, $state, $timeout, $sessionStorage, CONFIG) {
	console.log("Push6");
	$scope.loginSubmit = function () {

		//$scope.getLoader(true);
		var sendData = {
			"username": "TFOadmin",
			"password": "Tfo@Ompa$$101"
		}
		$http({
			method: 'POST',
			url: 'https://6896rz1of0.execute-api.ap-south-1.amazonaws.com/onemeeting/login',
			//url: 'https://cjgk5elnr5.execute-api.ap-south-1.amazonaws.com/login',
			headers: {
				'Content-Type': 'application/json',
				//'Access-Control-Allow-Headers': 'content-type',
				//'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
				//'Access-Control-Allow-Origin': '*',
				//'Access-Control-Allow-Credentials': true,
				//'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
				//'Access-Control-Max-Age': '3600',
				//'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
				//'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me',
				//'Accept': 'application/json'
			},
			data: sendData

		}).then(function (response) {
			console.log("response", response);
			//$scope.getLoader(false);
			//$state.go("home");
		})

		//$state.go('dashboard');
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
		var latitude = 19.075984;
		var longitude = 72.877656;
		$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=AIzaSyBTYOVGQPubWaB55ir2GGZOgIkg3LUgrwQ').then(function (response) {
			console.log("response", response);
		})
	}
	$scope.getLocation();
}])
