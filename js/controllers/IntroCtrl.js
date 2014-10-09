psycholish.controller('IntroCtrl', function($scope, $state,usersService,wordsService){
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };

    $scope.enterApp = function(){
        $state.go('tabs.letters');
    }
    $scope.login = function(){
        usersService.Login(function(){ $state.go('tabs.letters');});
    }

    $scope.download = function(){
        wordsService.DownloadAll().then(function(){$scope.enterApp();});
    }

    if(usersService.IsLoggedIn() ){
        $scope.enterApp();
    }
})