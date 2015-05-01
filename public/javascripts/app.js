'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp',[]);
var uri='smartkit.run.covapp.io';
app.controller('LoginCtrl', ['$http', '$scope', function($http, $scope){

  $scope.username='';
  $scope.groupName='';
  $scope.users =[];

  $scope.Login = function(){

      setTimeout(function(){
        $scope.users.push({deviceName:'demo_device',groupId:'66143888-9d42-469f-a6cf-e90a69cea2ba' });
        $scope.username='';
        $scope.groupName='';
      }, 100);
    };
/*    var url='/association';
    var req = {
      method: 'POST',
      url: url,
      params: {
        'userName': $scope.username,
        'groupName': $scope.groupName
      },
      headers:{
        'Authorization':'Basic MjVmM2UxN2MtOGE5ZS00MTQ0LWE2YjgtNzJiMTM1ZDIzMjE3OjQxMDVkZTAxLWI0NDgtNGNmMy1iZGVlLWJjMjY2ZTI1OGYzMA==',
        'Accept':'application/vnd.com.covisint.platform.oauth.token.v1+json',
        'Type':'client_credentials',
        'application':'tUEb8QHWXDxfljWw0oY3ZIya3ltZwpid'
      }
    }
    console.log("HIT LOGIN!!"+$scope.username+ $scope.groupName)
    $http(req).success(function(data, status, headers, config) {
      $scope.users.push({deviceName:'demo_device',groupId:'66143888-9d42-469f-a6cf-e90a69cea2ba' });
      $scope.username='';
      $scope.groupName='';

    }).error(function(data, status, headers, config) {
      $scope.users.push({deviceName:'demo_device',groupId:'66143888-9d42-469f-a6cf-e90a69cea2ba' });
      $scope.username='';
      $scope.groupName='';

    });
*/




  $scope.updateDevice = function(deviceId, pin, val){
    $http.post('/actions', {
      "deviceId":deviceId,
      "pin":pin,
      "val":val

    });
  }
}]);



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
