psycholish.factory("wordsService", function ($q, $http,$ionicLoading,version) {
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var downloadAllProperty = 'downloadedAll'+version;
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
    };

    var getWordsFromStorage = function(storage,deferred){
        deferred.resolve(JSON.parse(storage));
        $ionicLoading.hide();
        return deferred.promise;
    };

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
    };

    var getAllWords = function(){
        var deferred = $q.defer();
        var url = psycholish.baseAdress+'controllers/WordsController.php';
        $http(
            {
                method: "get",
                url: url,
                cache: true
            }
        ).success(function (data) {
                deferred.resolve(data);
            });
        return deferred.promise;
    }

    var downloadAll = function(){
        var deferred = $q.defer();
        if(!isDownloadAll()){
            $ionicLoading.show({
                template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
                animation: 'fade-in',
                noBackdrop: false
            });
            getAllWords().then(function(data){
                var x = new Array(26);
                for (var i = 0; i < 26; i++) {
                    x[alphabet[i]] = [];
                }
                data.forEach(function (value) {
                    x[value.word[0]].push(value);
                });
                for (i = 0; i < 26; i++) {
                    var letter = alphabet[i];
                    localStorage.setItem(letter+'_letter',JSON.stringify(x[letter]));
                }
                console.log('downloaded all');
                localStorage.setItem(downloadAllProperty,true);
                $ionicLoading.hide();
                deferred.resolve();
            });
        }
        else{
            deferred.resolve();
        }
        return deferred.promise;
    };

    var isDownloadAll = function(){
        return localStorage.getItem(downloadAllProperty) != null;
    };

    return {
        GetWords : getWords,
        DownloadAll : downloadAll,
        IsDownloadAll: isDownloadAll
    };
});