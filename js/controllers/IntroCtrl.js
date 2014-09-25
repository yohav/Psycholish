psycholish.controller('IntroCtrl', function($scope, $state,facebookService,usersService){
    if( window.localStorage.fbtoken != "undefined"){
        $state.go('tabs.letters');
    }
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
    $scope.login = function(){
        var loginSuccess = function(){

            var infoSuccess = function(data){
                window.localStorage.facebook_id = data.id;
                window.localStorage.facebook_name = data.name;
                usersService.AddUser(data.id,data.name);
            }

            var infoFail = function(err){
                alert('info fail: '+err);
            }

            facebookService.GetInfo(infoSuccess,infoFail);

            $state.go('tabs.letters');
        }
        var loginFail = function(err){
            alert('login fail: '+err);
        }
        facebookService.Login(loginSuccess,loginFail);
    }
})