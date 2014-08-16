psycholish.factory("wordsService", function ($q, $http,$ionicLoading,$cordovaFile) {
    return {
        getWords: function ($stateParams) {
            $ionicLoading.show({
                template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
                animation: 'fade-in',
                noBackdrop: false
            });

            var fileHandler = new FileHandler($cordovaFile);
            fileHandler.getFile($stateParams.letter.toLowerCase()+".json");

            fileHandler.saveFile($stateParams.letter.toLowerCase()+".json","this is a test");

            fileHandler.getFile($stateParams.letter.toLowerCase()+".json");

            var deferred = $q.defer();
            var url = 'http://psycholish.uphero.com/controllers/WordsController.php?letter=';

            url += $stateParams.letter.toLowerCase();
            $http.get(url)

                .success(function (data) {
                    deferred.resolve(data);
                    $ionicLoading.hide();

                });
            return deferred.promise;
        }
    };
});