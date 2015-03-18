;(function(){
	'use strict';

	angular.module('ScenicRoute')

	.controller('RoutesController', ['$scope', 'UserFactory', 'RoutesFactory', '$location', 'uiGmapGoogleMapApi', '$routeParams', '$cookieStore',
		function ($scope, UserFactory, RoutesFactory, $location, uiGmapGoogleMapApi, $routeParams, $cookieStore){
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

			$scope.startLat = 

			$scope.startLong =

			$scope.endLat =

			$scope.endLong =

			$scope.routeName =

			$scope.user = $cookieStore.get('user-id');

			

			$scope.map = { 
				center: { 
					latitude: 33.752265099999995, 
					longitude: -84.3915661 
				}, zoom: 13,
			};
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

			$scope.marker = {
				id: "$index",
				coords: {
					latitude: 33.752265099999995,
					longitude: -84.3915661
				}
			};

			$scope.markerList = [
				{
					latitude: 46,
					longitude: -74,
					message: 'I am some info about this point'
				},
				{
					latitude: 47,
					longitude: -75,
					message: 'I am some info about this point'
				},
				{
					latitude: 48,
					longitude: -76,
					message: 'I am some info about this point'
				},
				{
					latitude: 49,
					longitude: -77,
					message: 'I am some info about this point'
				},
				{
					latitude: 50,
					longitude: -78,
					message: 'I am some info about this point' 
				},
			]


		}




	]);






}());