;(function(){
	'use strict';


	angular.module('ScenicRoute', ['uiGmapgoogle-maps'])

	.factory('RoutesFactory', ['$http', 'HEROKU', '$location', '$scope', '$routeParams',
		function ($http, HEROKU, $location, $scope, $routeParams){


			$scope.map = { 
				center: { 
					latitude: 45, 
					longitude: -73 
				}, zoom: 8 };

		}	
	]);










}());