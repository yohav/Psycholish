psycholish.factory("usersService", function ($http,facebookService,$state,$ionicPopup) {
    var addUser = function(user_id,name){
        var url = psycholish.baseAdress+'controllers/UsersController.php';
        $http(
            {
                method: "post",
                url: url,
                data: {
                    user_id: user_id,
                    name: name
                }
            }
        )
    };
    var login = function(callback){
        var loginSuccess = function(){

            var infoSuccess = function(data){
                window.localStorage.facebook_id = data.id;
                window.localStorage.facebook_name = data.name;
                addUser(data.id,data.name);
                callback();
            }

            var infoFail = function(err){
                console.log('info fail: '+err);
            }

            facebookService.GetInfo(infoSuccess,infoFail);
        }
        var loginFail = function(err){
            console.log('login fail: '+err);
        }
        facebookService.Login(loginSuccess,loginFail);
    }
    var isloggedin = function(){
        return (window.localStorage.fbtoken != "undefined");
    }
    var getLoggedInID = function(){
        return  window.localStorage.facebook_id;
    }
    var showLoginPopup = function(okCallback,cancel_page,$scope){
            var loginPopup = $ionicPopup.show({
                title: 'אנא התחבר',
                template: '<p dir="rtl">כדי להשתמש בפונקציית המועדפים, יש צורך להתחבר.</p>',
                scope: $scope,
                buttons: [
                    { text: 'ביטול' ,
                        onTap: function(e) {
                            return false;
                        }
                    },
                    {
                        text: '<b>התחבר</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            return true;
                        }
                    }
                ]
            });
            loginPopup.then(function(res) {
                if(res) {
                    login(okCallback);
                } else {
                    $state.go(cancel_page);
                }
            });
    }
    return {
        Login: login,
        IsLoggedIn: isloggedin,
        GetLoggedInID: getLoggedInID,
        ShowLoginPopup: showLoginPopup
    };
});