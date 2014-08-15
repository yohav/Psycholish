psycholish.controller('WordsCtrl', function ($scope, words, $stateParams) {
    $scope.letter = $stateParams.letter;
    $.each(words, function (index, word) {
        word["clicked"] = false;
    });
    $scope.allDefinitionsVisible = false;
    $scope.words = words;
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
        $.each(words, function (index, word) {
            word["clicked"] = $scope.allDefinitionsVisible;
        });
        $.each($scope.words, function (index, word) {
            word["clicked"] = $scope.allDefinitionsVisible;
        });
    }
});