psycholish.factory("facebookService", function () {
    var Login = function(successCallback,failCallback){
        Init();
        openFB.login('email',
            successCallback,
            failCallback);
    }
    var Init = function(){
        openFB.init('1478282099110792','https://www.facebook.com/connect/login_success.html');
    }

    var GetInfo = function (successCallback,failCallback) {
        openFB.api({
            path: '/me',
            success: successCallback,
            error: failCallback});
    }

    function Logout(){
        openFB.logout();
    }

    return {
        Login: Login,
        GetInfo: GetInfo,
        Logout: Logout
    };
});