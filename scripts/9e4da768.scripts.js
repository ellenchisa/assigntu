"use strict";angular.module("assigntu",["assigntu.lists","ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/lists",{templateUrl:"views/lists/lists.html",controller:"ListsCtrl"}).when("/lists/new",{templateUrl:"views/lists/new.html",controller:"NewListCtrl"}).when("/lists/:id",{templateUrl:"views/show.html",controller:"ListCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("assigntu").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("assigntu.lists",["firebase"]).controller("ListsCtrl",["$scope","angularFire",function(a,b){var c=new Firebase("https://assigntu.firebaseio.com/lists");b(c.limit(15),a,"lists")}]).controller("ListCtrl",["$scope","$routeParams","angularFire",function(a,b,c){var d=b.id;a.list={};var e=new Firebase("https://assigntu.firebaseio.com/lists/"+d);c(e,a,"list"),a.newItem=function(){a.list.items||(a.list.items=[]),a.list.items.push({text:a.item}),a.item=null},a.remove=function(b){return a.list.items.splice(b,1),!1}}]).controller("NewListCtrl",["$scope",function(a){a.list={}}]);