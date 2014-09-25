psycholish.factory("usersService", function ($http) {
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
    }

    return {
        AddUser: addUser
    };
});