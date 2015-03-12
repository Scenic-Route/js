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
        console.log('hi');
       $http.post(HEROKU.URL + 'users', userObj, HEROKU.CONFIG)
       .success(function (res){ 
          console.log('Hi');
         console.log(res.user);
         $cookieStore.put('authentication-token', res.user.authentication_token);
         HEROKU.CONFIG.headers['authentication-token'] = res.user.authentication_token;
         return $location.path('/');
       });
     };

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
          $cookieStore.put('authentication-token', res.user.authentication_token);
          HEROKU.CONFIG.headers['authentication-token'] = res.user.authentication_token;

          return $location.path('/profile');
        });

      };

      var logoutUser = function () {
        $cookieStore.remove('authentication-token');
        $location.path('#/');
      };


     return{
       user : currentUser,
       register : addUser,
       login : loginUser,
       logout : logoutUser,
       status : checkLoginStatus
     };

    }

   ]);

}());
