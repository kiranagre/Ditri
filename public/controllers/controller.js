var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider,$urlRouterProvider,$locationProvider){

  $urlRouterProvider.otherwise('/addStockList');
  
  $stateProvider
    .state("addStock",{
      url: "/addStockList",
          templateUrl: "AddStockList.html",
          controller : "addStockList"
    })
        

})

myApp.controller('addStockList', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

$scope.product = {};

$scope.addproduct = function(){
  console.log($scope.product);
  $http.post('/productlist', $scope.product).success(function(response) {
    console.log(response);
    $scope.product = "";
    $scope.allproducts();
  });
}


$scope.allproducts = function() {
  $http.get('/allproducts').success(function(response) {
    console.log("I got the data I requested",response);
    $scope.producttable = response; 
  });
};

$scope.allproducts();


$scope.remove = function(id) {
  console.log(id);
  $http.delete('/productlist/' + id).success(function(response) {
    console.log(response);
   $scope.allproducts();
  });
};


$scope.edit = function(id) {
  console.log(id);
  $http.get('/productlist/' + id).success(function(response) {
    $scope.product = response;
  });
};  

$scope.update = function() {
  
  $http.put('/productlist/' + $scope.product._id, $scope.product).success(function(response) {
    $scope.allproducts();
    $scope.product = "";
  })
};

$scope.deselect = function() {
  $scope.product = "";
}

}]);﻿