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