;(function(){
	'use strict';


	angular.module('ScenicRoute')

	.factory('RoutesFactory', ['$http', 'HEROKU', '$location', '$routeParams', 'uiGmapGoogleMapApi',
		function ($http, HEROKU, $location, $scope, $routeParams){

			var getOneRoute = function (){
				console.log('Getting One Route!')
			}

			var getAllRoutes = function (){
				console.log('Getting All Routes!')
			}

			var getMyRoutes = function (){
				console.log('Getting your routes.')
			}

			var getLocalRoutes = function (){
				console.log('Getting your Local routes.')
			}

			var makeNewRoute = function (routeObj){
				console.log('Sending New Route')
				return $http.post(HEROKU.URL + 'routes/', routeObj, HEROKU.CONFIG)
				.success(function (res){
					console.log(res.routes)
				})
				console.log('routeObj');
			}

			
			


			return {
				oneR : getOneRoute,
				allR : getAllRoutes,
				myR : getMyRoutes,
				localR : getLocalRoutes,
				newR : makeNewRoute,
			};

		}	
	]);










}());