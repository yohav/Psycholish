psycholish.factory("wordsService", function ($q, $http,$ionicLoading,$rootScope) {

    var getWordsHTTP = function (letter) {
        $ionicLoading.show({
            template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
            animation: 'fade-in',
            noBackdrop: false
        });

        var url = 'http://psycholish.uphero.com/controllers/WordsController.php?letter=';

        url += letter;
        $http(
            {
                method: "get",
                url: url,
                cache: true
            }
        )

            .success(function (data) {
                $rootScope.$broadcast('getWordsHTTP',data)
                $ionicLoading.hide();
            });
    }
    return {
        getWordsHTTP: getWordsHTTP
    };
});