psycholish.controller('IntroCtrl', function($scope, $state,usersService){

    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };

    $scope.enterApp = function(){
        $state.go('tabs.letters');
    }
    $scope.login = function(){
        usersService.Login(function(){ $state.go('tabs.letters');});
    }

    if(usersService.IsLoggedIn() ){
        $scope.enterApp();
    }
})