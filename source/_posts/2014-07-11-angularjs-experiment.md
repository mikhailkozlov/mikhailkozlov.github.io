---
title: AngularJS Experiment
tags:
- side note
- AngularJS
- JavaScript
categories:
- personal
excerpt: Running static website means you have find different ways to make it faster. Fortunately there are ton of JS libraries that can help.

---


Running static website means you have find different ways to make it dynamic. Fortunately there are ton of JS libraries that can help.

Having used Backbone at work, I've decided to mix it up a bit and dive into [AngularJS](https://angularjs.org/). Using Angular is dead simple. It took me a few hours to re-build SQL driven [Portfolio](/portfolio/#/) with some json files. If you're interested in details or would like to take a look under the hood, you can find code on [github](https://github.com/mikhailkozlov/mikhailkozlov.github.io/blob/master/components/js/app.js) as usual. 


###Setup

Many simple apps start with in place templates, hardcoded models and so on, but we've been there and done that. Let's jump into routing, ajax and partials.

We're going to need [placeholder page](https://github.com/mikhailkozlov/mikhailkozlov.github.io/blob/master/portfolio/index.html#L49) and two views [list](https://github.com/mikhailkozlov/mikhailkozlov.github.io/blob/master/components/partials/portfolio.html) and [detail](https://github.com/mikhailkozlov/mikhailkozlov.github.io/blob/master/components/partials/portfolio-detail.html). On the placeholder page we only care about line that includes:

    <div ng-view></div>
    
AngularJS's router will inject view right there.

###Routing

Routing is very simple and very much based on what is offered in tutorial

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

Above we're going to treat list view as root and render portfolio.html. Detail view will be rendered once we have something in url other than root. 

###Templating

If you using some templating framework on the back end default start and end simple may collide and will have to use something else. This is why my app starts with:

	var portfolioControllers = angular.module('portfolioControllers', []);

	// we're going to use custom app to allow for special templating code
	var myApp = angular.module('myApp', ['ngRoute','portfolioControllers'], function 	($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[');
	    $interpolateProvider.endSymbol(']]');
	});

As you can tell templating will be done using [[  ] ] instead of \{\{ \}\}.

Now you need to tell AngularJS to use your app. You can do so by adding app name to the html tag

	<html ng-app="myApp"> 
	
###JSON

Initial idea was to use JSONP, but I could not find MongoDb provider with free and open API quickly, so I decided to pull JSON from good old SQL and store it with the website. 

["Main" file](https://github.com/mikhailkozlov/mikhailkozlov.github.io/blob/master/components/js/portfolio.json) stores data that is need for list view and each project has it's [own JSON file](https://github.com/mikhailkozlov/mikhailkozlov.github.io/tree/master/components/js/portfolio).

###AJAX

Since AngularJS does all the work, making list view take just a few lines of code

	portfolioControllers.controller('PortfolioListController', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('/components/js/portfolio.json').success(function (data) {
            $scope.works = data.works;
        });
    }]);

I'm passing scope and http to the function and AngularJS does all the binding and rendering. Very nice!

Detail view is a bit more complex

	portfolioControllers.controller('PortfolioViewController', ['$scope', '$routeParams','$http',
    function ($scope, $routeParams, $http) {
        $http.get('/components/js/portfolio/'+$routeParams.slug+'.json').success(function (data) {
            $scope.work = data;
        });
    }]
	).config(function($sceProvider) {
        $sceProvider.enabled(false);
    });

Here we use current path to pull relevant JS file and pass the data back to the view. 

I had to add sceProvider to render html from JSON, probably not the best way around, but it does the job.

###Done 

That is pretty much all it takes to put one page app together. 

