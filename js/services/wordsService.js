psycholish.factory("wordsService", function ($q, $http,$ionicLoading) {
    return {
        getWords: function ($stateParams) {
            $ionicLoading.show({
                template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
                animation: 'fade-in',
                noBackdrop: false
            });

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