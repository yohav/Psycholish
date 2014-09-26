psycholish.controller('WordsCtrl', function ($scope, words,favoriteService,facebookService,usersService,$state,$stateParams) {



    $scope.tab = $state.current.name;
    $scope.inFavorites = ($scope.tab == "tabs.favorites");
    $scope.loggedIn = usersService.IsLoggedIn();
    if( $scope.inFavorites && !$scope.loggedIn){
        usersService.ShowLoginPopup(function(){
                                $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                                });
                             }
                            ,function(){$state.go('tabs.letters');},$scope);
    }
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
        if(!$scope.loggedIn){
            usersService.ShowLoginPopup(function(){
                                    favoriteService.GetFavorites()
                                    .then(function(data){
                                            var favorites = data.map(function(favorite) {return favorite.id});
                                            $.each($scope.words, function (index, word) {
                                                favorites.indexOf(word.id) > -1 ? word["favorited"]= true : word["favorited"] = false;
                                            });
                                          });
                                 $scope.loggedIn = true;}
                                   ,function(){$state.go($state.current.name);},$scope);
        }
        else
        {
            word.favorited = !word.favorited;
            favoriteService.ChangeFavorite(word.id,word.favorited);
            if($scope.inFavorites){
                var index = $scope.words.indexOf(word);
                $scope.words.splice(index, 1);
            }
        }
    }
    $scope.logout = function(){
        facebookService.Logout();
        window.localStorage.facebook_id = "";
        window.localStorage.facebook_name = "";
        $state.go('intro');
    };


});