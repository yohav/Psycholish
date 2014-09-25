psycholish.factory('favoriteService',function($http,$q,$ionicLoading){
    var getFavorites = function(user_id){
        $ionicLoading.show({
            template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
            animation: 'fade-in',
            noBackdrop: false
        });

        var deferred = $q.defer();

        var url = psycholish.baseAdress+'controllers/UserWordsController.php?user_id='+user_id;
        $http(
            {
                method: "get",
                url: url,
                cache: false
            }
        ).success(function (data) {
               // $rootScope.$broadcast('getFavoriteWords',data)
                deferred.resolve(data);
                $ionicLoading.hide();
        });
        return deferred.promise;
    }
    var changeFavorite = function(user_id,word_id,isAdd){
        var url = psycholish.baseAdress+'controllers/UserWordsController.php';
        $http(
            {
                method: "post",
                url: url,
                data: {
                    user_id: user_id,
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