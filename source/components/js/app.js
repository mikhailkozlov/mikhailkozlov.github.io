var portfolioControllers = angular.module('portfolioControllers', []);

var myApp = angular.module('myApp', ['ngRoute','portfolioControllers'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});
/**
 *
 * @constructor
 */
portfolioControllers.controller('PortfolioListController', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('/components/js/portfolio.json').success(function (data) {
            $scope.works = data.works;
        });
    }]);

portfolioControllers.controller('PortfolioViewController', ['$scope', '$routeParams','$http',
    function ($scope, $routeParams, $http) {
        $http.get('/components/js/portfolio/'+$routeParams.slug+'.json').success(function (data) {
            $scope.work = data;
        });
    }]
).config(function($sceProvider) {
        $sceProvider.enabled(false);
    });

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/components/partials/portfolio.html',
                controller: 'PortfolioListController'
            }).
            when('/:slug', {
                templateUrl: '/components/partials/portfolio-detail.html',
                controller: 'PortfolioViewController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);