psycholish.directive('dragBack', function ($ionicGesture) {
    return {
        restrict: 'EAC',
        link: function (scope, elem) {
            $ionicGesture.on('swiperight', function (event) {
                event.preventDefault();
                window.location = '#/tab/letters'
            }, elem);
        }
    }
});