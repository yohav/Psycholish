angular.module('angular-flip', [])
.directive('flip', function($rootScope) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            flipped: '=?'
        },
        template:
            '<div class="flip">' +
                '<div class="mycard" ng-transclude></div>' +
            '</div>',
        controller: ['$scope', '$element', function($scope, $element) {
            this.toggle = function() {
                var flipped = !$element.hasClass('flipped');
                setTimeout(function(){ $scope.$apply(function() {
                    $scope.flipped = flipped;
                }) });
            };
        }],
        link: function(scope, elm, attrs) {
            scope.$watch('flipped', function(newValue, oldValue) {
                if (newValue) {
                    elm.addClass('flipped');
                } else {
                    elm.removeClass('flipped');
                    $rootScope.$broadcast('flipped');
                }
            });
        }
    }
})
.directive('flipFront', function() {
    return {
        require: '^flip',
        restrict: 'E',
        replace: true,
        transclude: true,
        template:
            '<div class="face front"><div class="card testcard"><div class="item word-container" ng-transclude></div></div></div>'
    }
})
.directive('flipBack', function() {
    return {
        require: '^flip',
        restrict: 'E',
        replace: true,
        transclude: true,
        template:
            '<div class="face back"><div class="card testcard"><div class="item word-container" ng-transclude></div></div></div>'
    }
})
.directive('flipToggle', function() {
    return {
        require: '^flip',
        restrict: 'A',
        link: function(scope, elm, attrs, controller) {
            var previousValue;

            attrs.$observe('flipToggle', function(value) {
                if (!value) {
                    value = 'click'
                }

                if (previousValue) elm.off(previousValue, controller.toggle);

                previousValue = value;

                elm.on(value, controller.toggle);
            });
        }
    }
});
