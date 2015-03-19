;(function(){
	'use strict';

	angular.module('ScenicRoute')

	.controller('RoutesController', ['$scope', 'UserFactory', 'RoutesFactory', '$location', '$routeParams', '$cookieStore',
		function ($scope, UserFactory, RoutesFactory, $location, $routeParams, $cookieStore){
			console.log('RoutesController checking in');

			// $routeParams.id

			
			// $scope.userId = $cookieStore.get('user-id');
			
			// console.log($routeParams.id);
			
			

			$scope.routes = [];
			
			var route = RoutesFactory.newR;
			// console.log(route);
			
			$scope.newRoute = function (routeObj){
				RoutesFactory.newR(routeObj);
				console.log(routeObj);
			}

			$scope.saveRoute = function (){
				console.log('Route Saved!');
				RoutesFactory.newR({
					latitude: $scope.startLat,
					longitude: $scope.startLong,
					end_lat: $scope.endLat,
					end_long: $scope.endLong,
					name: $scope.routeName,
					user_id: $scope.user
				}).success(function (res){
					console.log(res);
				})
			}

			// $scope.startLat = 

			// $scope.startLong =

			// $scope.endLat =

			// $scope.endLong =

			// $scope.routeName =

			$scope.user = $cookieStore.get('user-id');

			

			// $scope.map = { 
			// 	center: { 
			// 		latitude: 33.752265099999995, 
			// 		longitude: -84.3915661 
			// 	}, zoom: 13,
			// };
			$scope.map;
			$scope.directionsDisplay;
			$scope.$on('mapInitialized', function(evt, evtMap) {


			  $scope.map = evtMap;

			 });

	    $scope.placeMarker = function(e) {
				if($scope.markerList.length == 2){
					console.log('Marker Limit Reached');
					return;
				}

	      var marker = new google.maps.Marker({position: e.latLng, map: $scope.map, draggable: true});
	      $scope.map.panTo(e.latLng);
	      $scope.markerList.push(marker);
				console.log($scope.markerList);
	      console.log($scope.markerList.length);
	    }


			$scope.marker = {
				draggable: true,
				
			}
			$scope.markerList = [];

			// $scope.onSuccess = function(position) {
			//     $scope.map.center = {
			//         latitude: position.coords.latitude,
			//         longitude: position.coords.longitude
			//     };
			//     $scope.$apply();
			//     }
			//     $scope.onError(error) {
			//         console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			//     }
			// $scope.navigator.geolocation.getCurrentPosition(onSuccess, onError); 

			// $scope.addMarker = function ($event, $params){
			// 	console.log($event);
			// 	$scope.markerList.push(new google.maps.Marker({
			// 		map: $scope.map,
			// 		position: $params[0].latLng

					
			// 	}));
			// }   

			// $scope.click = function(event) {
			//       map.setZoom(8);
			//       map.setCenter(marker.getPosition());

			// $scope.marker = {
			// 	id: "$index",
			// 	coords: {
			// 		latitude: 33.752265099999995,
			// 		longitude: -84.3915661
			// 	}
			// };

			$scope.markerList = [];
				
					
				
			


		}




	]);






}());