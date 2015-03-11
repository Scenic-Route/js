;(function() {
  "use strict";

  angular.module('ScenicRoute')

  .factory('UserFactory',['$http', 'HEROKU', '$cookieStore', '$location',
   function ($http, HEROKU, $cookieStore, $location){

     var currentUser = function () {
        return $cookieStore.get('auth_token');
      };

     var addUser = function(userObj){
       $http.post(HEROKU.URL + 'users', userObj, HEROKU.CONFIG)
       .success(function(res){
         console.log(res.user);
         $cookieStore.put('auth_token', res.user.authentication_token);
         HEROKU.CONFIG.headers['auth_token'] = res.user.authentication_token;
         return $location.path('/');
       });
     };

     var checkLoginStatus = function () {
        var user = currentUser();
        if (user) {
          HEROKU.CONFIG.headers['auth_token'] = user;
        }
      };


     var loginUser = function (userObj) {

        $http.post(HEROKU.URL + 'users/sign_in', userObj
        ).success (function (res) {
          console.log(res.user);
          $cookieStore.put('auth_token', res.user.authentication_token);
          HEROKU.CONFIG.headers['auth_token'] = res.user.authentication_token;

          $location.path('/');
        });

      };

      var logoutUser = function () {
        $cookieStore.remove('auth_token');
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
