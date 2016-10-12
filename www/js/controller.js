angular.module('starter.controllers', ['ionic','firebase'])

.controller('HomeCtrl', ['$scope', '$firebaseObject', '$ionicPopup', function($scope,$firebaseObject,$ionicPopup) {
$scope.user = {};
$scope.date = new Date();
var Greetings = '';
if ( $scope.date.getHours() < 12 )  { Greetings="Good Morning!"; } 
        else if ( $scope.date.getHours() >= 12 && $scope.date.getHours() <= 17 ) { Greetings = "Good Afternoon!"; } 
        else if ( $scope.date.getHours() > 17 && $scope.date.getHours() <= 24 ) { Greetings = "Good Evening!"; } 
        else { Greetings = "I'm not sure what time it is!"; }
$scope.saveDetails = function(){
    var name = $scope.user.name;
    var firebaseObj = firebase.database().ref('Name');
    var fb = firebaseObj.push();
	fb.push({
    Name: name
	}).then(function(ref) {
    $scope.user = {};
    $scope.showAlert(); 
	}, function(error) {
    console.log("Error:", error);
	});
  }
  $scope.showAlert = function() {
    $ionicPopup.alert({
        title: Greetings  ,
        template: 'Your entry has been saved!!'
    })
};
}])

.controller('MapCtrl', ['$scope', '$firebaseObject', function($scope,$firebaseObject,$ionicPopup) {

}])

.directive('map', function($ionicPopup) {
    return {
        restrict: 'A',
        link:function(scope, element, attrs){
          var zValue = scope.$eval(attrs.zoom);
          var lat = scope.$eval(attrs.lat);
          var lng = scope.$eval(attrs.lng);
        var myLatlng = new google.maps.LatLng(lat,lng);
        mapOptions = {
                  zoom: zValue,
                  center: myLatlng
                }
    var image = 'http://melbourneairport.com.au/images/airport-parking/hardhat/parking-options/icon-car.jpg';
    map = new google.maps.Map(element[0],mapOptions);
    marker = new google.maps.Marker({
        icon: image,
                position: myLatlng,
                map: map,
                draggable:true,
                title:"Drag me!"
          });
    var request = {
        location: myLatlng,
        radius: '500',
        types: ['restaurant','cafe','food']
    };

  service = new google.maps.places.PlacesService(map);
  var search = service.nearbySearch(request, callback);
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
};
      function createMarker(place) {
        /*var List = [];
        for(i = 0; i < 10; i++)
            List.push(place.name);
            console.log(List);
        }*/
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });

        /*$scope.printList = function(List){
        $ionicPopup.alert({
        title: "List of restaurants Nearby" ,
        template: List
    })*/
      };
   
        scope.carParked = function(){
        var firebaseObj = firebase.database().ref('location');
        var fb = firebaseObj.push();
    fb.push(angular.fromJson(angular.toJson({
        location: myLatlng
    }))).then(function(ref) {
    scope.showCarParked();
    }, function(error) {
    console.log("Error:", error);
    });
};
  scope.showCarParked = function() {
    $ionicPopup.alert({
        template: 'I can remind you where you parked your car!'
    });

};
}
}
});