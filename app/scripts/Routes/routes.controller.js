;(function(){
	'use strict';

	angular.module('ScenicRoute')

	.controller('RoutesController', ['$scope', 'UserFactory', 'RoutesFactory', '$location', '$routeParams', '$cookieStore', '$timeout',
		function ($scope, UserFactory, RoutesFactory, $location, $routeParams, $cookieStore, $timeout){
			console.log('RoutesController checking in');

			
			
			

			$scope.routes = [];

			$scope.createMarker = function(){
				RoutesFactory.localR();
			}

			$scope.searchRoutes = function(){
				RoutesFactory.localR();
			}

			var weather = false;
			$scope.weatherTog = function(){
				weather = !weather;
				console.log($scope.map);
				if(weather){
					weatherLayer.setMap($scope.map);
					cloudLayer.setMap($scope.map);
				}else{
					weatherLayer.setMap(null);
					cloudLayer.setMap(null);
				};



			};


			var weatherLayer = new google.maps.weather.WeatherLayer({
			    temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
			  });

		  var cloudLayer = new google.maps.weather.CloudLayer();
			
			
			var route = RoutesFactory.newR;
			
			$scope.newRoute = function (routeObj){
				RoutesFactory.newR(routeObj);
				console.log(routeObj);
			}

			$scope.saveRoute = function (){
				console.log('Route Saved!');
				console.log($scope.markerList);
				$scope.startLat = $scope.markerList[0].position.k;

				$scope.startLong = $scope.markerList[0].position.D;

				$scope.endLat = $scope.markerList[1].position.k;

				$scope.endLong = $scope.markerList[1].position.D;

				

				$scope.user = $cookieStore.get('user-id');
				RoutesFactory.newR({
					latitude: $scope.startLat,
					longitude: $scope.startLong,
					end_lat: $scope.endLat,
					end_long: $scope.endLong,
					name: $scope.routeName,
					user_id: $scope.user
				}).success(function (res){
					console.log(res);
				});
			};

			$scope.routeName = '';

			

			

			$scope.map;
			$scope.directionsDisplay;
			$scope.$on('mapInitialized', function(evt, evtMap) {
				console.log($location.url());

			  $scope.map = evtMap;
			  if($location.url() !== '/create_route') {
					$timeout($scope.asdf, 5000);
			  }
			  	
			  
			 });

			$scope.asdf = function(miles){
					// console.log($scope.map.center);
					RoutesFactory.localR({
						search:{
						current_lat: $scope.map.center.k,
            current_long: $scope.map.center.D,
            search_radius: miles || 50
					  }
					}).success( function (res) { 
						console.log(res) ;
						hideMarkers();
						removeMarkers();
						res.routes.forEach(function (route){
						var latLng = new google.maps.LatLng(route.latitude, route.longitude);
			      var marker = new google.maps.Marker({
			      	position: latLng, 
			      	map: $scope.map,
			      	clickable: true, 
			      	draggable: false,
			      });

			      $scope.markerList.push(marker);
						// console.log($scope.markerList);
			      // console.log($scope.markerList.length);
			      
					});
				});
				};



			// $scope.searchDist = function(){

			// 	asdf();

			// }

			var removeMarkers = function(){
				$scope.markerList = [];
				// $scope.$apply();
			};

			var hideMarkers = function() {
	      console.log($scope.map);
	      $scope.markerList.forEach(function (marker){
	      	marker.setMap(null);
	      })
	     

			       
      };

			var drawRoute = function(){
				var directionsDisplay = new google.maps.DirectionsRenderer();
				var directionsService = new google.maps.DirectionsService();

				directionsDisplay.setMap($scope.map);

				function calcRoute() {
				        var start = $scope.markerList[0].position.k + "," + $scope.markerList[0].position.D;
				        var end = $scope.markerList[1].position.k + "," + $scope.markerList[1].position.D;



				        var request = {
				          origin: start,
				          destination: end,
				          optimizeWaypoints: true,
				          travelMode: google.maps.TravelMode.DRIVING
				        };

				        directionsService.route(request, function(response, status) {
				          if (status == google.maps.DirectionsStatus.OK) {
				            directionsDisplay.setDirections(response);            
				            console.log('Route Drawn!');  
				            hideMarkers();

				          }
				        });


	      };

	      calcRoute();

			};

			

	    $scope.placeMarker = function(e) {
				if($scope.markerList.length == 2){
					console.log('Marker Limit Reached');
					return;
				};

	      var marker = new google.maps.Marker({
	      	position: e.latLng, 
	      	map: $scope.map, 
	      	draggable: true
	      });
	      $scope.map.panTo(e.latLng);
	      $scope.markerList.push(marker);
	      if($scope.markerList.length == 2){
	      	drawRoute();
	      };

				// console.log($scope.markerList);
	   //    console.log($scope.markerList.length);
	      };
	    


			
			$scope.markerList = [];

		

				
					
				
			


		}




	]);






}());