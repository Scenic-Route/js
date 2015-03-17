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