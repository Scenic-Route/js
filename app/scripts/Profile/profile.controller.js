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