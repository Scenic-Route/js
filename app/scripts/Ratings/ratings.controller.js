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