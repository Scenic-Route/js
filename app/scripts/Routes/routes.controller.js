;(function(){
	'use strict';

	angular.module('ScenicRoute')

	.controller('RoutesController', ['$scope', 'UserFactory', 'RoutesFactory', '$location', 'uiGmapGoogleMapApi',
		function ($scope, UserFactory, RoutesFactory, $location, uiGmapGoogleMapApi){
			console.log('RoutesController checking in');

			$scope.routes = [];
			
			var route = RoutesFactory.newR;
			// console.log(route);
			
			$scope.newRoute = function (routeObj){
				RoutesFactory.newR(routeObj);
				console.log(routeObj);
			}

			$scope.map = { 
				center: { 
					latitude: 33.752265099999995, 
					longitude: -84.3915661 
				}, zoom: 13,
			};

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