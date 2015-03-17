;(function(){
	'use strict';


	angular.module('ScenicRoute')

	.factory('RoutesFactory', ['$http', 'HEROKU', '$location', '$routeParams', 'uiGmapGoogleMapApi',
		function ($http, HEROKU, $location, $scope, $routeParams){

			var getOneRoute = function (id){
				console.log('Getting One Route!')
				return $http.get(HEROKU.URL + 'routes/' + id, HEROKU.CONFIG,
					)
			}

			var getAllRoutes = function (){
				console.log('Getting All Routes!')
			}

			var getMyRoutes = function (){
				console.log('Getting your routes.')
				return $http.get(HEROKU.URL + 'routes', HEROKU.CONFIG,
					)
			}

			var getLocalRoutes = function (){
				console.log('Getting your Local routes.')
				return $http.post(HEROKU.URL + 'routes/search/', HEROKU.CONFIG)
			}

			var makeNewRoute = function (routeObj){
				console.log('Sending New Route')
				return $http.post(HEROKU.URL + 'routes/', routeObj, HEROKU.CONFIG)
				.success(function (res){
					console.log(res.routes)
				})
				console.log('routeObj');
			}

			var editRoute = function (id){
				console.log('Editing Existing Route');
				return $http.patch(HEROKU.URL + 'routes/' + id, HEROKU.CONFIG)
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