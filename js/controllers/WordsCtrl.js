psycholish.controller('WordsCtrl', function ($scope, words,favoriteService,facebookService,usersService,localWordService,$state,$stateParams,$ionicPopup) {



    $scope.tab = $state.current.name;
    $scope.inFavorites = ($scope.tab == "tabs.favorites");
    $scope.inPersonal = ($scope.tab == "tabs.personal");
    $scope.loggedIn = usersService.IsLoggedIn();
    $scope.letter = $stateParams.letter;
    $scope.user_id = window.localStorage.facebook_id;
    $scope.allDefinitionsVisible = false;
    $scope.words = words;

    $scope.setTabTitle = function(){
        if ($scope.inFavorites){
            $scope.tabTitle =  'מועדפים' ;
        }
        else if ($scope.inPersonal){
            $scope.tabTitle =  'מילים אישיות';
        }
        else $scope.tabTitle =  $scope.letter;
    }

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

    $scope.setTabTitle();
    $scope.play_sound = function (word,$event) {
        $event.stopPropagation();
        var play_button = $($event.currentTarget);
        var loading = play_button.siblings('img');
        play_button.attr('hidden',true);
        loading.attr('hidden',false);
        var player = new Player(word,function(){play_button.attr('hidden',false); loading.attr('hidden',true); });
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
        if($scope.inPersonal){
            $scope.deletePopup(word);
        }
        else if(!$scope.loggedIn){
                $scope.toggleFavoriteWithoutLoginPopup();
            }
            else
            {
                if($scope.inFavorites){
                    $scope.deletePopup(word);
                }
                else{
                    $scope.toggleFavoriteAfterLogin(word);
                }

            }
    }

    $scope.deletePopup = function(word){

        var popup = $ionicPopup.show({
            template: '<p dir="rtl">האם אתה בטוח שברצונך למחוק מילה זו מ'+$scope.tabTitle+'</p>',
            title: '<b>אישור מחיקה</b>',
            scope: $scope,
            buttons: [
                {   text:'לא' ,
                    type: 'button-assertive',
                    onTap: function(e) {return false}
                },
                {
                    text: 'כן',
                    type: 'button-positive',
                    onTap: function(e) {return true}
                },
            ]
        });
        popup.then(function(res) {
            if(res){
                $scope.toggleFavoriteAfterLogin(word);
            }
        });
    }


    $scope.toggleFavoriteAfterLogin = function(word){
        if(word.favorited == undefined){
            localWordService.DeleteWord(word);
        }
        else{
            word.favorited = !word.favorited;
            favoriteService.ChangeFavorite(word.id,word.favorited);
        }
        if($scope.inFavorites || $scope.inPersonal){
            var index = $scope.words.indexOf(word);
            $scope.words.splice(index, 1);
        }
    }

    $scope.toggleFavoriteWithoutLoginPopup = function(){
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
    $scope.logout = function(){
        facebookService.Logout();
        window.localStorage.facebook_id = "";
        window.localStorage.facebook_name = "";
        $state.go('intro');
    };
    $scope.addNewWord = function(){
        localWordService.ShowPopUp($scope);
    }

    $scope.getFavoriteIcon = function(word){
        if(word == undefined){
            return;
        }
        if($scope.inPersonal){
            return 'ion-ios7-trash';
        }
        if(!$scope.loggedIn){
            return 'ion-ios7-heart-outline';
        }
        if(word.favorited)
            return 'ion-ios7-heart';
        else{
            return 'ion-ios7-heart-outline';
        }
    }


});