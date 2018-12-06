NgOfflineApp.controller('dashboardCtrl', ['$scope', '$rootScope', '$http', '$state', '$sessionStorage', '$timeout', 'CONFIG', function ($scope, $rootScope, $http, $state, $sessionStorage, $timeout, CONFIG) {

	const dbName = "MyUsers";
	const tableName = 'userTable';
	var db, request;
	$scope.userData = {};
	$scope.userList = [];
	$scope.roleList = CONFIG.roles;

	$scope.getUserList = function () {
		if (db != undefined) {
			var userList;
			var transaction = db.transaction([tableName]);
			var objectStore = transaction.objectStore(tableName);
			var request = objectStore.getAll();

			request.onerror = function (event) {
				console.log("Error " + event);
			};
			request.onsuccess = function (event) {
				//console.log("Data", request.result);
				userList = request.result;

				angular.forEach(userList, function (user) {
					var transTable = db.transaction(['departmentTable']);
					var dataStore = transTable.objectStore('departmentTable');
					var response = dataStore.get(user.departmentId);
					response.onsuccess = function (event) {
						//user.department = response.result.name;
						user.department = response.result;
					}
				});
			};
			$timeout(function () {
				$scope.userList = userList;
			}, 100);
		}
	}

	$scope.getDepartments = function () {
		if (db != undefined) {
			var departmentList;
			var transaction = db.transaction(['departmentTable']);
			var objectStore = transaction.objectStore('departmentTable');
			var request = objectStore.getAll();

			request.onerror = function (event) {
				console.log("Error " + event);
			};
			request.onsuccess = function (event) {
				departmentList = request.result;
			};
			$timeout(function () {
				$scope.departmentList = departmentList;
			}, 500);
		}
	}

	/*Validate Password*/
	$scope.checkPassword = function () {
		if ($scope.userData.password != "" && $scope.userData.cPassword != "") {
			if ($scope.userData.password != $scope.userData.cPassword) {
				$scope.validationMsg = "Password don't match";
			} else {
				$scope.validationMsg = "";
			}
		}
	};

	/*Data Clearance*/
	$scope.clearData = function (event) {
		$scope.userData = {
			"userName": "",
			"firstName": "",
			"lastName": "",
			"email": "",
			"department": "",
			"departmentId": "",
			"mobileNo": "",
			"role": "",
			"password": "",
			"cPassword": "",
			"id": ""
		};
		if (event != 'noClose') {
			$scope.closeModal();
			$scope.usersList = [];
		}
	}
	$scope.clearData();

	/*Create/Update/Delete User*/
	$scope.userCrud = function (event, callBack) {
		if (callBack == 'Create') {
			$scope.userData.id = $scope.getUniqueNo();
			$scope.createUser();
		}
		if (callBack == 'Update') {
			$scope.updateUser();
		}
		if (callBack == 'Delete') {
			$scope.deleteUser();
		}
	}

	/*DB Creation*/
	$scope.dbCreation = function () {
		request = indexedDB.open(dbName, 3);

		request.onerror = function (event) {
			// Handle errors.
		};

		request.onupgradeneeded = function (event) {
			db = event.target.result;
			var objectStore = event.currentTarget.result.createObjectStore(
				tableName, {
					keyPath: 'id',
					autoIncrement: true
				});
			var departmentTable = event.currentTarget.result.createObjectStore(
				'departmentTable', {
					keyPath: 'id',
					autoIncrement: true
				});
		};

		request.onsuccess = function (evt) {
			db = this.result;
			$scope.getUserList();
			$scope.getDepartments();
		};
	}
	$scope.dbCreation();

	/*Create User*/
	$scope.createUser = function () {

		var getTable = db.transaction(tableName, 'readwrite');
		//var storeData = getObjectStore(dbName, 'readwrite');
		var storeData = getTable.objectStore(tableName);
		var req;
		var saveData = {
			"userName": $scope.userData.userName,
			"firstName": $scope.userData.firstName,
			"lastName": $scope.userData.lastName,
			"email": $scope.userData.email,
			"departmentId": $scope.userData.department.id,
			"mobileNo": $scope.userData.mobileNo,
			"role": $scope.userData.role,
			"password": $scope.userData.password,
			"id": $scope.userData.id
		}
		//console.log("saveData", saveData);
		req = storeData.add(saveData);

		req.onsuccess = function (evt) {
			$scope.getUserList();
			$scope.modalClose();
		};
		req.onerror = function () {
			console.error("addPublication error", this.error);
		};
	}

	$scope.insertDepartments = function () {

		/*request.onerror = function (event) {
			console.log("Departments Error");
		};
		request.onupgradeneeded = function (event) {

			//var db = event.target.result;

			var objectStore = db.createObjectStore('departmentTable', {
				keyPath: "id"
			});

			objectStore.transaction.oncomplete = function (event) {
				// Store values in the newly created objectStore.
				var customerObjectStore = db.transaction('departmentTable', "readwrite").objectStore('departmentTable');
				$scope.departmentList.forEach(function (department) {
					department.id = $scope.getUniqueNo();
					console.log("Departments Added", department);
					customerObjectStore.add(department);
				});
			};
		};*/

		var getTable = db.transaction('departmentTable', 'readwrite');
		//var storeData = getObjectStore(dbName, 'readwrite');
		var storeData = getTable.objectStore('departmentTable');
		var req;
		angular.forEach($scope.departmentList, function (value, key) {
			value.id = $scope.getUniqueNo();
			req = storeData.add(value);
		});
		req.onsuccess = function (evt) {
			console.log("Departments Added");
		};
		req.onerror = function () {
			console.error("addPublication error", this.error);
		};
	}

	/*Update User Data*/
	$scope.updateUser = function () {
		var objectStore = db.transaction([tableName], "readwrite").objectStore(tableName);

		var request = objectStore.get($scope.userData.id);
		request.onerror = function (event) {
			// Handle errors!
		};

		request.onsuccess = function (event) {
			// Get the old value that we want to update
			var data = event.target.result;

			// update the value(s) in the object that you want to change
			data.userName = $scope.userData.userName;
			data.firstName = $scope.userData.firstName;
			data.lastName = $scope.userData.lastName;
			data.email = $scope.userData.email;
			//data.department = $scope.userData.department;
			data.departmentId = $scope.userData.department.id;
			data.mobileNo = $scope.userData.mobileNo;
			data.role = $scope.userData.role;
			data.password = $scope.userData.password;
			//data.cPassword = $scope.userData.cPassword;
			data.id = $scope.userData.id;

			// Put this updated object back into the database.
			var requestUpdate = objectStore.put(data);
			requestUpdate.onerror = function (event) {
				// Do something with the error
			};
			requestUpdate.onsuccess = function (event) {
				$scope.getUserList();
				$scope.modalClose();
			};
		};
	}

	/*Modal Box Open*/
	$scope.openModalBox = function (event, modal, data) {
		if (data == 'add') {
			$scope.modalHeader = 'Create User';
			$scope.submitBtnText = 'Create';
		}
		if (data != 'add' && data != 'delete') {
			$scope.userData = data;
			$scope.modalHeader = 'Update User';
			$scope.submitBtnText = 'Update';
		}
		if (data == 'delete') {
			$scope.modalHeader = 'Delete User';
			$scope.submitBtnText = 'Delete';
		}
		$scope.openModal(event, modal, data);
	}

	/*Close Modal Box*/
	$scope.modalClose = function (event, data) {
		$scope.clearData();
		$scope.closeModal(event);
	}

}])
