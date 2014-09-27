psycholish.factory("wordsService", function ($q, $http,$ionicLoading) {

    var getWords = function (letter) {
        var storage = localStorage.getItem(letter+'_letter');
        $ionicLoading.show({
            template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
            animation: 'fade-in',
            noBackdrop: false
        });

        var deferred = $q.defer();
        if(storage != null){
            return getWordsFromStorage(storage,deferred)
        }
        else{
            return getWordsHTTP(letter,deferred);
        }
    }

    var getWordsFromStorage = function(storage,deferred){
        deferred.resolve(JSON.parse(storage));
        $ionicLoading.hide();
        return deferred.promise;
    }

    var getWordsHTTP = function(letter,deferred){
        var url = psycholish.baseAdress+'controllers/WordsController.php?letter='+letter;
        $http(
            {
                method: "get",
                url: url,
                cache: true
            }
        ).success(function (data) {
                deferred.resolve(data);
                localStorage.setItem(letter+'_letter',JSON.stringify(data));
                $ionicLoading.hide();
            });
        return deferred.promise;
    }
    return {
        GetWords: getWords
    };
});