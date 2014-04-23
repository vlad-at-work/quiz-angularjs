'use strict';

var a2App = angular.module('a2App', ['mongolabResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

// mongolab credentials
a2App.constant('API_KEY', 'XXXXXXXX');
a2App.constant('DB_NAME', 'XXXX');

