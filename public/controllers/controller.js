var myApp = angular.module('myApp', ['ui.router','ds.clock','ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

myApp.config(function($stateProvider,$urlRouterProvider,$locationProvider){

  $urlRouterProvider.otherwise('/addStockList');
  
  $stateProvider
    .state("addStock",{
          url        : "/addStockList",
          templateUrl: "AddStockList.html",
          controller : "addStockList"
    })
    .state("addStock1",{
      url: "/addStockList1",
          templateUrl: "AddStockList1.html",
    })  

})



myApp.controller('headerCtrl', ['$scope', '$http', function($scope, $http) {

}]);

myApp.controller('addStockList', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

$scope.myDate = new Date();

$scope.product = {};

 /*$scope.blur = function(){
    if($scope.myOtherForm.dateField.$error.valid == true){
      $scope.myDate = "";
    }
  }

$scope.focus = function(val){
    $scope.myDate = new Date();
}*/

$scope.addproduct = function(){
  console.log($scope.product);
  $http.post('/productlist', $scope.product).success(function(response) {
    console.log(response);
    $scope.product = "";
    $scope.allproducts();
  });
}


$scope.allproducts = function() {
  $scope.addflag = true;
  $scope.updateflag = false;
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
    $scope.addflag = false;
    $scope.updateflag = true;
  });
};  

$scope.update = function() {
  console.log($scope.product._id);
  $http.put('/productlist/' + $scope.product._id, $scope.product).success(function(response) {
    $scope.allproducts();
    $scope.product = "";
  })
};

$scope.deselect = function() {
  $scope.product = "";
}

$scope.load = function(){
  var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
]

var options = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 0, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

}

var ctx = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx).Pie(data, options);




}

}]);﻿