psycholish.controller('WordsCtrl', function ($scope, words,favoriteService,$state,$stateParams,$ionicPopup,personalService) {



    $scope.tab = $state.current.name;
    $scope.inFavorites = ($scope.tab == "tabs.favorites");
    $scope.inPersonal = ($scope.tab == "tabs.personal");
    $scope.letter = $stateParams.letter;
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
        else
            if($scope.inFavorites){
                $scope.deletePopup(word);
            }
            else{
                $scope.regularToggleFavorite(word);
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
                $scope.regularToggleFavorite(word);
            }
        });
    }


    $scope.regularToggleFavorite = function(word){
        if(word.favorited == undefined){
            personalService.DeletePersonal(word);
        }
        else{
            word.favorited = !word.favorited;
            favoriteService.ChangeFavorite(word,word.favorited,$scope);
        }
        if($scope.inFavorites || $scope.inPersonal){
            var index = $scope.words.indexOf(word);
            $scope.words.splice(index, 1);
        }
    }

    $scope.addNewWord = function(){
        personalService.AddNewPersonalPopup($scope);
    }

    $scope.getFavoriteIcon = function(word){
        if(word == undefined){
            return;
        }
        if($scope.inPersonal){
            return 'ion-ios7-trash';
        }
        if(word.favorited)
            return 'ion-ios7-heart';
        else{
            return 'ion-ios7-heart-outline';
        }
    }


});