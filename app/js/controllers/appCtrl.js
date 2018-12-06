NgOfflineApp.controller('appCtrl', ['$scope', '$rootScope', '$http', '$state', '$mdSidenav', '$mdDialog', function ($scope, $rootScope, $http, $state, $mdSidenav, $mdDialog) {
	$scope.selected = 'dashboard';
	$scope.toggleList = function () {
		$mdSidenav('left').toggle();
	};

	/*Get Page Title*/
	$rootScope.pageTitle = function () {
		$scope.title = $state.current.title;
		return ($scope.title);
	};

	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
		READ_WRITE: "readwrite"
	}; // This line should only be needed if it is needed to support the object's constants for older browsers
	var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	if (!indexedDB) {
		alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
	} else {
		//console.log("DB created");
	}


	var createdDB = window.indexedDB.open("MyDatabase", 3);

	createdDB.onerror = function (event) {
		console.log("DB errorCode", $scope.createdDB.errorCode);
		// Do something with request.errorCode!
	};

	createdDB.onupgradeneeded = function (event) {
		console.log("dbCreation", createdDB);
	}


	$scope.openModal = function (event, modal, data) {
		$mdDialog.show({
			contentElement: '#' + modal,
			parent: angular.element(document.body),
			targetEvent: event,
			clickOutsideToClose: false,
			onRemoving: function () {
				$scope.billPayment = {};
				$scope.newPassword = {
					"username": $sessionStorage.userData.username,
					"password": "",
					"cPassword": ""
				};
			}
		});
	}

	$scope.closeModal = function (ev) {
		$mdDialog.hide({
			parent: angular.element(document.body),
			targetEvent: ev
		})
	};

	$scope.getUniqueNo = function () {
		var uniqueId = Math.random().toString(36).slice(2);
		var uniqueNo = uniqueId.substring(0, 6);
		return uniqueNo;
	}
}]);
