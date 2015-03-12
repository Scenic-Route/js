;(function (){
  
  'use strict';

  angular.module('ScenicRoute')

  .controller('NavController', ['$scope', 'UserFactory', '$location', 

    function ($scope, UserFactory, $location) {
    
      var user = UserFactory.user();
      console.log('NavCtrl checking in!');

      if (user) {
        $scope.loggedin = true;
        $scope.user = user;
      } else {
        $scope.loggedin = false;
      }


      $scope.logout = function () {
        UserFactory.logout();
        $scope.loggedin = false;
      }; 

      $scope.$on('LoggedIn', function (){
        $scope.loggedin = true;
      });



    }

  ])

}());