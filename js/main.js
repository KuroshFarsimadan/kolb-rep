/**
 * Main AngularJS Web Application
 */
var app = angular.module('kolibriWebApp', [
'ngRoute','ngAnimate', 'ngSanitize', 'ui.bootstrap'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/asiakkaat", {templateUrl: "partials/asiakkaat.html", controller: "asiakkaatController"})
    .when("/asiakkaat_lisays", {templateUrl: "partials/asiakkaat_lisays.html", controller: "asiakkaatLisaysController"})
    .when("/asiakkaat_asiakastiedot/:id", {templateUrl: "partials/asiakkaat_asiakastiedot.html", controller: "asiakkaatTiedotController"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "PageCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

app.controller('asiakkaatController', function ($location, $scope, $log, $http) {
    $scope.haku = true;
    $scope.submitSearchCustomer = function() {
      $scope.haku = false;
        /* Haku logiikka tänne */
        if ($scope.hakukriteerit) { // IF SET OR NOT EMPTY
        alert($scope.hakukriteerit);
            $http.get('https://jsonplaceholder.typicode.com/comments').
                success(function(data, status, headers, config) {
                    $scope.maxSize = 5;
                    $scope.bigTotalItems = data.length;
                    $scope.bigCurrentPage = 1;
                    var arrayEnd = $scope.bigCurrentPage * 10;
                    var arrayBeg = arrayEnd - 10;
                    $scope.hakuData = data;
                    $scope.hakuData2 = $scope.hakuData.slice(arrayBeg, arrayEnd); 
              }).error(function(data, status, headers, config) {
                    $scope.hakuResponse = "";
            });
    
        }
    };


    $scope.setPage = function (pageNo) {
        $scope.bigCurrentPage = pageNo;
        var arrayEnd = $scope.bigCurrentPage * 10;
        var arrayBeg = arrayEnd - 10;
        $scope.hakuData2 = $scope.hakuData.slice(arrayBeg, arrayEnd);
    };
    
    $scope.redirectPage = function(custId) {
      $location.path('/asiakkaat_asiakastiedot/'+custId);
    }



});

app.controller('asiakkaatTiedotController', function ($location, $scope, $log, $http, $routeParams) {
  $scope.custId = $routeParams.custId;
  $scope.nimi = 'Test Name';
  $http.get('https://jsonplaceholder.typicode.com/users/1').
    success(function(data, status, headers, config) {
      $scope.data = data;
    }).error(function(data, status, headers, config) {
      $scope.hakuResponse = "";
    });  
});