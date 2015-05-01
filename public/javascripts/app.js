'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp',[]);
var uri='smartkit.run.covapp.io';
app.controller('LoginCtrl', ['$http', '$scope', function($http, $scope){

console.log("Login controller loaded");
  $scope.username='';
  $scope.groupId='';
  $scope.users = [
    {username:'guru',groupId:'1234' },
    {username:'guru21',groupId:'123434' }];
 var url=uri+'/oAuth';
  $scope.Login = function(){
    var req = {
      method: 'POST',
      url: url,
      params: {
        'username': $scope.username,
        'groupid': $scope.groupId
      }
    }
    console.log("HIT LOGIN!!"+$scope.username+ $scope.groupId)
    $http(req).success(function(data, status, headers, config) {
      $scope.users.push({username:$scope.username,groupId:$scope.groupId });
      $scope.username='';
      $scope.groupId='';
    }).error(function(data, status, headers, config) {
      alert( "failure");
      $scope.users.push({username:$scope.username,groupId:$scope.groupId });
      $scope.username='';
      $scope.groupId='';
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
