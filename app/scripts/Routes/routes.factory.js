;(function(){
	'use strict';


	angular.module('ScenicRoute')

	.factory('RoutesFactory', ['$http', 'HEROKU', '$location', '$routeParams',
		function ($http, HEROKU, $location, $routeParams){

			var getOneRoute = function (id){
				console.log('Getting One Route!');
				return $http.get(HEROKU.URL + 'routes/' + id,
					{headers: HEROKU.CONFIG.headers,}
				);
			};

			var getAllRoutes = function (){
				console.log('Getting All Routes!')
			};

			var getMyRoutes = function (){
				console.log('Getting your routes.')
				return $http.get(HEROKU.URL + 'routes',
					{headers: HEROKU.CONFIG.headers,}
				);
			};

			var getLocalRoutes = function (searchObject){
				console.log('Getting your Local routes.')
				return $http.post(HEROKU.URL + 'routes/search/', searchObject,
					{headers: HEROKU.CONFIG.headers,}
				);
			};

			var makeNewRoute = function (routeObj){
				console.log('Sending New Route')
				console.log(routeObj);
				return $http.post(HEROKU.URL + 'routes/', routeObj,
				{headers: HEROKU.CONFIG.headers,}
				)
				.success(function (res){
					console.log(res.routes)
				})
				.error(function (res){
					console.log(res)
				});
				console.log("route");
			};

			var saveRoute = function (){
				console.log('Route Saving');
			};

			var editRoute = function (id){
				console.log('Editing Existing Route');
				return $http.patch(HEROKU.URL + 'routes/' + id, HEROKU.CONFIG);
			};

			var startMarker = function (){
				console.log('Start Marker Set');
			};

			var endMarker = function (){
				console.log('End Marker Set');
			};

			var routeFill = function (){
				console.log('Route Filled');
			};
			


			return {
				oneR : getOneRoute,
				allR : getAllRoutes,
				myR : getMyRoutes,
				localR : getLocalRoutes,
				newR : makeNewRoute,
				editR : editRoute,
				setSM : startMarker,
				setEM : endMarker,
				filled : routeFill,
				saveR : saveRoute,
			};

		}	
	]);










}());