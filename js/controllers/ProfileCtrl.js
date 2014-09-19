psycholish.controller('ProfileCtrl', function ($scope,facebookService) {
    $scope.updateInfo = function(){
        var infoSuccess = function(data){
            $scope.name = data.name;
            $scope.id = data.id;
            $scope.$apply();
        }
        var infoFail = function(){
            alert('info fail');
        }
        facebookService.GetInfo(infoSuccess,infoFail);
    };
    $scope.logged = window.localStorage.fbtoken != "undefined";
    if($scope.logged){
        $scope.updateInfo();
    }
    $scope.login = function(){
        var loginSuccess = function(){
            $scope.logged = true;
            $scope.updateInfo();
        }
        var loginFail = function(){
            alert('login fail');
        }
        facebookService.Login(loginSuccess,loginFail);
    };
    $scope.logout = function(){
        facebookService.Logout();
        $scope.logged = false;
    };
});