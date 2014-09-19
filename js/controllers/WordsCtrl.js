psycholish.controller('WordsCtrl', function ($scope, $stateParams,wordsService) {
    $scope.letter = $stateParams.letter;
    wordsService.getWordsHTTP($scope.letter.toLowerCase());
    $scope.$on('getWordsHTTP', function (event, data) {
        $scope.words = data;
        $.each($scope.words, function (index, word) {
            word["clicked"] = false;
            word["favorited"]= false;
        });
    });

    $scope.allDefinitionsVisible = false;

    $scope.play_sound = function (word,$event) {
        $event.stopPropagation();
        var play_button = $($event.currentTarget);
        var loading = play_button.siblings('img');
        play_button.hide();
        loading.show();
        var player = new Player(word,play_button,loading);
        player.play();
    }

    $scope.clearSearch = function () {
        this.query = '';
    }
    $scope.toggleAllDefinitions = function () {
        $scope.allDefinitionsVisible = !$scope.allDefinitionsVisible;
        $.each($scope.words, function (index, word) {
            word["clicked"] = $scope.allDefinitionsVisible;
        });
        $.each($scope.words, function (index, word) {
            word["clicked"] = $scope.allDefinitionsVisible;
        });
    }
    $scope.toggleFavorite = function(word,$event){
        $event.stopPropagation();
        word.favorited = !word.favorited;
    }
});