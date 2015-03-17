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
