psycholish.factory("facebookService", function () {
    var Login = function(){
        facebookConnectPlugin.login(["public_info"],
            fbLoginSuccess,
            function (error) { alert("" + error) }
        );
    }
    var fbLoginSuccess = function (userData) {
        popup("UserInfo: " + JSON.stringify(userData));
    }
    return {
        Login: Login
    };
});