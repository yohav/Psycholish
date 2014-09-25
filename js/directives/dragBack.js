psycholish.directive('dragBack', function ($ionicGesture) {
    return {
        restrict: 'EAC',
        link: function (scope, elem, attrs) {
            if(attrs.allowdrag == "true")
            {
                $ionicGesture.on('swiperight', function (event) {
                    event.preventDefault();
                    window.location = '#/tab/letters'
                }, elem);
            }
        }
    }
});