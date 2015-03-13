;(function(){
	"use strict";

	angular.module('ScenicRoute')
	
	.controller('ProfileController', ['$scope', 'UserFactory', '$location', '$routeParams',
		function ($scope, UserFactory, $location, $routeParams){

			$routeParams.id

		  $scope.age = "Edit age";
		  $scope.name = "Edit name";
		  $scope.editorEnabledAge = false;
		  $scope.editorEnabledName = false;
		  
		  $scope.enableAgeEditor = function() {
		    $scope.editorEnabledAge = true;
		    $scope.editableAge = $scope.age;
		  };
		    
		  $scope.enableNameEditor = function() {
		    $scope.editorEnabledName = true;
		    $scope.editableName = $scope.name;
		  };    
		  
		  $scope.disableEditor = function() {
		    $scope.editorEnabledAge = false;
		    $scope.editorEnabledName = false;  
		  };
		  
		  $scope.saveAge = function() {
		    $scope.age = $scope.editableAge;
		    $scope.disableEditor();
		  };
		    
		  $scope.saveName = function() {
		    $scope.name = $scope.editableName;
		    $scope.disableEditor();
		  };  
		}
	])









}());