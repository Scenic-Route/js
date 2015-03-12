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