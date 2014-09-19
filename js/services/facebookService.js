psycholish.factory("facebookService", function () {
    var Login = function(){
        if(facebookConnectPlugin){
            popup("all is good");
        }
        else
        {
            popup("there is no facebook!");
        }
        facebookConnectPlugin.login(["public_info"],
            fbLoginSuccess,
            function (error) { popup("" + error) }
        );
    }
    var fbLoginSuccess = function (userData) {
        popup("UserInfo: " + JSON.stringify(userData));
    }
    return {
        Login: Login
    };
});