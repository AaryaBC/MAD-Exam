angular.module('starter.controllers', ['ionic','firebase'])

.controller('HomeCtrl', ['$scope', '$firebaseObject', '$ionicPopup', function($scope,$firebaseObject,$ionicPopup) {
$scope.user = {};
$scope.date = new Date();
$scope.saveDetails = function(){
    var name = $scope.user.name;
	var firebaseObj = new Firebase("https://mobile-app-dev-e-1475537468244.firebaseio.com");
	var fb = $firebaseObject(firebaseObj);
	fb.$push({
    name: name
	}).then(function(ref) {
    $scope.user = {};
    $scope.showAlert();
	}, function(error) {
    console.log("Error:", error);
	});
  }
  $scope.showAlert = function() {
    $ionicPopup.alert({
        title: $scope.date,
        template: 'Your entry has been saved!!'
    });
};
}]);