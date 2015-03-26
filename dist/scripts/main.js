;(function (){
	'use strict';

	angular.module('ScenicRoute', ['ngRoute', 'ngCookies', 'ngMap'])

	.constant('HEROKU',{
	  URL: 'https://scenic-route.herokuapp.com/',
	  CONFIG: {
	    headers : {
	      'Content-Type' : 'application/json'
	    }
	  }
	})

	.config([ '$routeProvider', function ($routeProvider) {

	  $routeProvider

	  // Home Page
	  .when('/', {
	    templateUrl: 'scripts/Home/home.tpl.html',
	    controller: 'UserController'
	  })
	  .when('/register', {
	  	templateUrl: 'scripts/Users/users.register.tpl.html',
	  	controller: 'UserController'
	  })
	  .when('/login', {
	  	templateUrl: 'scripts/Users/users.login.tpl.html',
	  	controller: 'UserController'
	  })
	  .when('/profile/:id', {
	  	templateUrl: 'scripts/Profile/profile.tpl.html',
	  	controller: 'ProfileController'
	  })
	  .when('/create_route', {
	  	templateUrl: 'scripts/Routes/routes.newroute.tpl.html',
	  	controller: 'RoutesController'
	  })
	  .when('/route/:id', {
	  	templateUrl: 'scripts/Routes/routes.tpl.html',
	  	controller: 'RoutesController'
	  })
	  .when('/routes/search',{
	  	templateUrl: 'scripts/Routes/routeslocal.tpl.html',
	  	controller: 'RoutesController'
	  })
	  .when('/contact',{
	  	templateUrl: 'scripts/Home/contact.tpl.html',
	  	controller: ''
	  })
	}])  

	.run([ '$rootScope', 'UserFactory', '$http', '$cookieStore',

	  function ($rootScope, UserFactory, $http, $cookieStore) {
	    $rootScope.$on('$routeChangeStart', function () {

	      // Run my Login Status
	      console.log('Checking Status Here');
	      if (UserFactory.status()){

	      }

	     });

	  }



	]);




}());
;(function (){
  
  'use strict';

  angular.module('ScenicRoute')

  .controller('NavController', ['$scope', 'UserFactory', '$location', '$cookieStore', 

    function ($scope, UserFactory, $location, $cookieStore) {
    
      var user = UserFactory.user();
      console.log('NavCtrl checking in!');

      if (user) {

        $scope.loggedin = true;
        $scope.user = user;
        $scope.userId = $cookieStore.get('user-id');
      } else {
        $scope.loggedin = false;
      }


      $scope.logout = function () {
        UserFactory.logout();
        $scope.loggedin = false;
      };

      // $scope.profileLink = function(userObj){
      //   // e.preventDefault();
      //   UserFactory.profile();
      // }; 

      $scope.$on('LoggedIn', function (){
        $scope.loggedin = true;
        $scope.userId = $cookieStore.get('user-id');
      });



    }

  ])

}());
;(function() {
  "use strict";

  angular.module('ScenicRoute')

  .factory('UserFactory',['$http', 'HEROKU', '$cookieStore', '$location', '$rootScope',
   function ($http, HEROKU, $cookieStore, $location, $rootScope){
      console.log('UserFactory Here');
     var currentUser = function () {
        return $cookieStore.get('authentication-token');
      };

     var addUser = function(userObj){
        // console.log('hi');
       $http.post(HEROKU.URL + 'users', userObj, HEROKU.CONFIG)
       .success(function (res){ 
          console.log('New User Created!');
         console.log(res.user);
         setCookie(res);
         $location.path('/profile/'+ res.user.id);
       });
     };

     var setCookie = function (res) {
      $cookieStore.put('authentication-token', res.user.authentication_token);
      $cookieStore.put('user-id', res.user.id);
      console.log($cookieStore.get('user-id'));
      $cookieStore.put('username', res.user.username);
      HEROKU.CONFIG.headers['authentication-token'] = res.user.authentication_token;

     };

     var profileLink = function(userObj){
      // e.preventDefault();
      $location.path('/profile/' + res.user.id);
     }

     var checkLoginStatus = function () {
        var user = currentUser();
        console.log(user);
        if (user) {
          HEROKU.CONFIG.headers['authentication-token'] = user;
          $rootScope.$broadcast('LoggedIn')
          return true;
        } return false;
      };


     var loginUser = function (userObj) {

        $http.post(HEROKU.URL + 'users/login', userObj
        ).success (function (res) {
          console.log(res.user);
          // $cookieStore.put('authentication-token', res.user.authentication_token);
          // $cookieStore.put('user-id', res.user.id);
          // console.log($cookieStore.get('user-id'));
          // $cookieStore.put('username', res.user.username);
          // HEROKU.CONFIG.headers['authentication-token'] = res.user.authentication_token;
          setCookie(res);


          $location.path('/profile/'+ res.user.id);
        });

      };

      var logoutUser = function () {
        $cookieStore.remove('authentication-token');
        $location.path('#/');
      };

      var viewUser = function () {
        console.log('Viewing another user profile');
      };

      var editProfile = function () {
        console.log('Editing profile');
      };




     return{
       user : currentUser,
       register : addUser,
       login : loginUser,
       logout : logoutUser,
       status : checkLoginStatus,
       profile : profileLink,
       viewuser : viewUser,
       editprofile : editProfile
     };

    }

   ]);

}());

;(function() {
  "use strict";

  angular.module('ScenicRoute')

  .controller('UserController', ['$scope', 'UserFactory', '$location',
  function ($scope, UserFactory, $location){

    var user = UserFactory.user();
    console.log('UsersCtrl checking in!');

    $scope.registerUser = function(userObj){
      UserFactory.register(userObj);
    };

    $scope.loginUser = function (userObj) {
        UserFactory.login(userObj);
      };

    }

  ]);

}());
;(function() {
  "use strict";

  angular.module('ScenicRoute')

  .factory('ProfileFactory', ['$http', 'HEROKU', 'UserFactory', '$routeParams',

  function ($http, HEROKU, UserFactory, $routeParams){

    var user = UserFactory.user;


  

    var getProfile = function (id){
      return $http.get(HEROKU.URL + 'profiles/' + id, 
        {headers: HEROKU.CONFIG.headers,}
        // cache: true
      );
    };

    var saveVehicleProfile = function (data){
      console.log(data);
      return $http.patch(HEROKU.URL + 'profiles', data, HEROKU.CONFIG
        );
    };

   



    return {
      getP : getProfile,
      saveVP: saveVehicleProfile,

    };

    }

  ]);

}());
;(function(){
	"use strict";

	angular.module('ScenicRoute')
	
	.controller('ProfileController', ['$scope', 'UserFactory', 'ProfileFactory', '$location', '$routeParams', 'HEROKU',
		function ($scope, UserFactory, ProfileFactory, $location, $routeParams, HEROKU){

			$routeParams.id

			ProfileFactory.getP($routeParams.id)
			.success(function (res){
				console.log(res);
			$scope.profile = res.profile;
			$scope.user = res.user;
			$scope.stat = res.stat_tracker;	
			})

			$scope.editUser = false;
			$scope.editVehicle = false;

			$scope.enableEditUser = function (){
				$scope.editUser = !$scope.editUser;
			}

			$scope.enableEditVehicle = function (){
				$scope.editVehicle = !$scope.editVehicle;
			}

			$scope.saveVehicle = function (){
				ProfileFactory.saveVP({
					location: $scope.profile.location,
          about_me: $scope.profile.about_me,
          vehicle_year: $scope.profile.vehicle_year,
          vehicle_make: $scope.profile.vehicle_make,
          vehicle_model: $scope.profile.vehicle_model,
          vehicle_link: $scope.profile.vehicle_link
				}).success(function (res){
					console.log(res);
					$scope.editVehicle = false;
				})
			}
		

  
		}
	])









}());
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

			var postRatings = function (ratingObj){
				return $http.post(HEROKU.URL + '/ratings', ratingObj,
				{headers: HEROKU.CONFIG.headers,}
				)


			}

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
				postR : postRatings,
			};

		}	
	]);










}());
;(function(){
	'use strict';

	angular.module('ScenicRoute')

	.controller('RoutesController', ['$scope', 'UserFactory', 'RoutesFactory', '$location', '$routeParams', '$cookieStore', '$timeout',
		function ($scope, UserFactory, RoutesFactory, $location, $routeParams, $cookieStore, $timeout){
			console.log('RoutesController checking in');

			
			
			$routeParams.id

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
			  if($location.url() == '/routes/search/') {
					$timeout($scope.asdf, 5000);
			  }

			  if($location.url() == '/route/' + $routeParams.id){
			  	$scope.getRoute();
			  	// console.log('hi');

			  }
			  	
			  
			 });
			  
			 

			$scope.getRoute = function (){
				RoutesFactory.oneR($routeParams.id)
				.success(function (res){
					console.log(res);
					hideMarkers();
					removeMarkers();
					$scope.route = res.route;
					calcRoute(res.route.latitude, res.route.longitude, res.route.end_lat, res.route.end_long);

				})
			}

			$scope.asdf = function(miles){
					// console.log($scope.map.center);
					RoutesFactory.localR({
						search:{
						current_lat: $scope.map.center.k,
            current_long: $scope.map.center.D,
            search_radius: miles || 50
					  }
					}).success( function (res) { 
						console.log(res);
						hideMarkers();
						removeMarkers();
						res.routes.forEach(function (route){
						var latLng = new google.maps.LatLng(route.latitude, route.longitude);
						var infoWindow = new google.maps.InfoWindow();
			      var marker = new google.maps.Marker({
			      	position: latLng, 
			      	map: $scope.map,
			      	clickable: true, 
			      	draggable: false,
			      });
			      var time = new Date(route.created_at);
			      var dist = route.distance;
			      var rdist = dist.toFixed(2);
			      marker.content = '<div class="infoWindowContent">' + '<ul>' + 
			      	'<li>' + '<strong>' + 'Route Created by: ' + '</strong>' + route.username + '</li>' +
			      	'<li>' + '<strong>' + 'Route Created on: ' + '</strong>' + time + '</li>' +
			      	'<li>' + '<strong>' + 'Popularity Rating: ' + '</strong>' + route.popularity +  '</li>' +
			      	'<li>' + '<strong>' + 'Distance from you: ' + '</strong>' + rdist  + ' miles.' + '</li>' +
			      	'<li>' + '<strong>' + 'Link to Route: ' + '</strong>' + '<a href="/#/route/' + route.id + '">' + 'Load Route' + '</a>' + '</li>' +
			      	'</ul>' + '</div>';
			      google.maps.event.addListener(marker, 'click', function(){
			                  infoWindow.setContent('<h5>' + route.name + '</h5>' + marker.content);
			                  infoWindow.open($scope.map, marker);
			              });
			      $scope.markerList.push(marker);
			      $scope.openInfoWindow = function(e, selectedMarker){
			              e.preventDefault();
			              google.maps.event.trigger(selectedMarker, 'click');
			          }
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

				// function calcRoute() {
				//         var start = $scope.markerList[0].position.k + "," + $scope.markerList[0].position.D;
				//         var end = $scope.markerList[1].position.k + "," + $scope.markerList[1].position.D;



				        // var request = {
				        //   origin: start,
				        //   destination: end,
				        //   optimizeWaypoints: true,
				        //   travelMode: google.maps.TravelMode.DRIVING
				        // };

				        // directionsService.route(request, function(response, status) {
				        //   if (status == google.maps.DirectionsStatus.OK) {
				        //     directionsDisplay.setDirections(response);            
				        //     console.log('Route Drawn!');  
				        //     hideMarkers();

				        //   }
				        // });


	      // };

	      calcRoute($scope.markerList[0].position.k, $scope.markerList[0].position.D, $scope.markerList[1].position.k, $scope.markerList[1].position.D);

			};

			var calcRoute = function (start_lat, start_lng, end_lat, end_lng){
				var start = start_lat + "," + start_lng;
				var end = end_lat + "," + end_lng;

				var directionsDisplay = new google.maps.DirectionsRenderer();
				var directionsService = new google.maps.DirectionsService();

				directionsDisplay.setMap($scope.map);

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
			}

			

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

      // var postRatings = function(ratings){
      // 	RoutesFactory.postR({
      // 		rating:{
      // 			user_id:,
      // 			route_id:,
      // 			twist_rating:,
      // 			quality_rating:,
      // 			traffic_rating:,
      // 			scenery_rating:,
      // 			sport:,
      // 			scenic:,
      // 			comments:,
      // 		}
      // 	})
      // }
	    


			
			$scope.markerList = [];

		

				
					
				
			


		}




	]);






}());
;(function(){
	'use strict';

	angular.module('ScenicRoute')

	.controller('StarCtrl', ['$scope', 'RoutesFactory', '$routeParams', '$cookieStore',
        function ($scope, RoutesFactory, $routeParams, $cookieStore) {
    $scope.rating = 0;
    $scope.ratings = {
        current: 3,
        max: 5
    };

    $scope.twist = 3;
    $scope.road =  3;
    $scope.traffic = 3;
    $scope.scenery = 3;
    // console.log($routeParams);

    $scope.getSelectedRating = function (rating, type) {
        // console.log(rating, type);
        //$scope[type] = rating;

        // console.log($scope.road);
    }

    $scope.postRatings = function(ratings){
         console.log($scope.road);
      RoutesFactory.postR({
          rating:{
              user_id: $cookieStore.get('user-id'),
              route_id: $routeParams.id,
              twist_rating: $scope.twist,
              quality_rating: $scope.road,
              traffic_rating: $scope.traffic,
              scenery_rating: $scope.scenery,
              sport: $scope.sports,
              scenic: $scope.scenic,
              comments: $scope.comment,
        }
    }).success(function (res){
        console.log(res);
    })
  }
}]);




}());
;(function(){
 'use strict';

 angular.module('ScenicRoute')

 .directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
      		}
        }
      });









}());