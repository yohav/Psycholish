psycholish.factory('favoriteService',function($http,$q,$ionicLoading,usersService){
    var getFavorites = function(){
        $ionicLoading.show({
            template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
            animation: 'fade-in',
            noBackdrop: false
        });

        var deferred = $q.defer();

        var url = psycholish.baseAdress+'controllers/UserWordsController.php?user_id='+usersService.GetLoggedInID();
        $http(
            {
                method: "get",
                url: url,
                cache: false
            }
        ).success(function (data) {
                deferred.resolve(data);
                $ionicLoading.hide();
        });
        return deferred.promise;
    }
    var changeFavorite = function(word_id,isAdd){
        var url = psycholish.baseAdress+'controllers/UserWordsController.php';
        $http(
            {
                method: "post",
                url: url,
                data: {
                    user_id: usersService.GetLoggedInID(),
                    word_id: word_id,
                    action:isAdd
                }
            }
        ).success(function () {
               console.log(isAdd ?"saved" : "deleted");
        });
    }

    return {
        GetFavorites : getFavorites,
        ChangeFavorite: changeFavorite
    }

});