psycholish.controller('ProfileCtrl', function ($scope,facebookService,fileService) {
    $scope.updateInfo = function(){
        var infoSuccess = function(data){
            $scope.name = data.name;
            $scope.id = data.id;
            $scope.$apply();
            $scope.get_image();
        }
        var infoFail = function(err){
            alert('info fail: '+err);
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
        var loginFail = function(err){
            alert('login fail: '+err);
        }
        facebookService.Login(loginSuccess,loginFail);
    };
    $scope.logout = function(){
        facebookService.Logout();
        $scope.logged = false;
    };

    $scope.get_image = function(){
        var url = "http://graph.facebook.com/"+$scope.id+"/picture?type=large";
        var file_name = $scope.id + ".jpg";
        fileService.LoadFile(url,file_name);

    }
});