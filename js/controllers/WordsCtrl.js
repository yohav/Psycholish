psycholish.controller('WordsCtrl', function ($scope, words,favoriteService,facebookService,$state,$stateParams) {
    $scope.tab = $state.current.name;
    $scope.inFavorites = ($scope.tab == "tabs.favorites");
    $scope.letter = $stateParams.letter;

    $scope.user_id = window.localStorage.facebook_id;
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
        favoriteService.ChangeFavorite($scope.user_id,word.id,word.favorited);
        if($scope.inFavorites){
            var index = $scope.words.indexOf(word);
            $scope.words.splice(index, 1);
        }
    }
    $scope.logout = function(){
        facebookService.Logout();
        $state.go('intro');
    };
});