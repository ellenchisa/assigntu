'use strict';

angular.module('assigntu')
  .controller('ListCtrl', function($scope, $routeParams, $location, $firebase, MessageBus, $timeout) {
    var listId = $routeParams.id;

    $scope.flash = MessageBus.pop();

    // Hide the flash message after 15 seconds
    if ($scope.flash) {
      $timeout(function() {
        $scope.flash = null;
      }, 15000);
    }

    // Link the list on the scope to firebase
    $scope.list = $firebase(new Firebase('https://assigntu.firebaseio.com/lists/' + listId));
    $scope.list.$bind($scope, 'remote');

    $scope.editList = function() {
      $location.path('/lists/' + listId + '/edit');
    };

    $scope.newItem = function() {
      if (!$scope.remote.items) {
        $scope.remote.items = [];
      }

      $scope.remote.items.push({
        timestamp: new Date(),
        text: $scope.item,
        completed: false,
        assigned: 'unassigned'
      });

      $scope.item = null;
    };

    $scope.deleteList = function() {
      $scope.list.$remove();
      $location.path('/');
    };
  })
  .controller('EditListCtrl', function($scope, $routeParams, $location, $firebase, MessageBus) {
    var listId = $routeParams.id;

    $scope.list = $firebase(new Firebase('https://assigntu.firebaseio.com/lists/' + listId));

    $scope.removeItem = function(item) {
      var index = $scope.list.items.indexOf(item);
      $scope.list.items.splice(index, 1);
      $scope.list.$save();
    };

    $scope.saveList = function() {
      $scope.list.$save();
      MessageBus.push('list-saved', 'success');
      $location.path('/lists/' + listId);
    };
  });
