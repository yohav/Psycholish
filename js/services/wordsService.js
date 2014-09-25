psycholish.factory("wordsService", function ($q, $http,$ionicLoading) {

    var getWordsHTTP = function (letter) {
        $ionicLoading.show({
            template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
            animation: 'fade-in',
            noBackdrop: false
        });

        var url = psycholish.baseAdress+'controllers/WordsController.php?letter=';
        var deferred = $q.defer();

        url += letter;
        $http(
            {
                method: "get",
                url: url,
                cache: true
            }
        ).success(function (data) {
            //$rootScope.$broadcast('getWordsHTTP',data)
                deferred.resolve(data);
            $ionicLoading.hide();
        });
        return deferred.promise;
    }
    return {
        getWordsHTTP: getWordsHTTP
    };
});