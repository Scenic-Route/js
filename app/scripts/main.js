;(function (){
	'use strict';

	angular.module('ScenicRoute', ['ngRoute', 'ngCookies',])

	.constant('HEROKU',{
	  URL: '',
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
	    controller: ''
	  })
	  .when('/register', {
	  	templateUrl: 'scripts/Users/users.register.tpl.html',
	  	controller: 'UserController'
	  })
	  .when('/login', {
	  	templateUrl: 'scripts/Users/users.login.tpl.html',
	  	controller: 'UserController'
	  });
	}])  

	.run([ '$rootScope', 'UserFactory', '$http', '$cookieStore',

	  function ($rootScope, UserFactory, $http, $cookieStore) {
	    $rootScope.$on('$routeChangeStart', function () {

	      // Run my Login Status
	      // console.log('Here');
	      UserFactory.status();

	     });

	  }



	]);




}());