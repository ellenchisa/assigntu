angular.module('assigntu')
  .directive('trInlineEdit', function($timeout) {
    return {
      restrict: 'A',
      priority: 2,
      transclude: true,
      replace: true,
      scope: {
        model: '=ngModel'
      },
      template: '<span class="inline-edit">' +
                  '<span ng-show="editing" class="inline-editing">' +
                    '<span ng-transclude></span>' +
                  '</span>' +
                  '<span class="inline-editable" ng-hide="editing" ng-click="edit()">{{ model }}</span>' +
                '</span>',
      link: function(scope, element, attrs) {
        scope.edit = function() {
          scope.editing = true;
          $timeout(function() {
            input.focus();
            input.select();
          });
        };

        scope.done = function() {
          scope.editing = false;

          if (scope.model === '') {
            scope.model = 'unassigned';
          }
        };

        var input = element.find('input').first();

        input.bind('keydown', function(e) {
          if (e.keyCode === 27 || e.keyCode === 13) {
            scope.$apply(scope.done);
          }
        });

        input.bind('blur', function(e) {
          scope.$apply(scope.done);
        });


      }
    }
  });