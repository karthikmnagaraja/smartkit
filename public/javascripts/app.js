'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp',[]);

app.controller('LoginCtrl', ['$http', '$scope', function($http, $scope){


  $scope.Login = function(){
    console.log("HIT LOGIN!!")
    $http({
      method : 'POST',
      url : '/oAuth'
    }).success(function(data, status, headers, config) {

    }).error(function(data, status, headers, config) {
      alert( "failure");
    });

}}]);

  /*config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: Login
      }).
      when('/addPost', {
        templateUrl: 'partials/addPost',
        controller: AddPostCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadPostCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);*/
