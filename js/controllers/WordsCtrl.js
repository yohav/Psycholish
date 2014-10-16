psycholish.controller('WordsCtrl', function ($scope,$state,$stateParams,$ionicPopup,$ionicActionSheet,words,personalService,Read,localWordsProxyService) {



    $scope.tab = $state.current.name;
    $scope.inFavorites = ($scope.tab == "tabs.favorites");
    $scope.inPersonal = ($scope.tab == "tabs.personal");
    $scope.letter = $stateParams.letter;
    $scope.allDefinitionsVisible = false;
    $scope.words = words;
    $scope.predicate = 'word';

    $scope.setTabTitle = function(){
        if ($scope.inFavorites){
            $scope.tabTitle =  'מועדפים' ;
        }
        else if ($scope.inPersonal){
            $scope.tabTitle =  'אישי';
        }
        else $scope.tabTitle =  $scope.letter;
    };

    $scope.setTabTitle();

    $scope.clearSearch = function () {
        $scope.search = '';
    };

    $scope.toggleAllDefinitions = function () {
        $scope.allDefinitionsVisible = !$scope.allDefinitionsVisible;
        $.each($scope.words, function (index, word) {
            word["clicked"] = $scope.allDefinitionsVisible;
        });
        $.each($scope.words, function (index, word) {
            word["clicked"] = $scope.allDefinitionsVisible;
        });
    };


    $scope.addNewWord = function(){
        personalService.AddNewPersonalPopup($scope);
    };

    $scope.toggleFavorite = function(word){
        if($scope.inFavorites){
            $scope.deletePopup(word);
        }
        else{
            $scope.regularToggleFavorite(word);
        }
    };

    $scope.regularToggleFavorite = function(word){
            word.favorited = !word.favorited;
            localWordsProxyService.ChangeFavorite(word,word.favorited,'favoriteWords');

        if($scope.inFavorites){
            var index = $scope.words.indexOf(word);
            $scope.words.splice(index, 1);
        }
    };

    $scope.deletePersonal = function(word){
        personalService.DeletePersonal(word);
        localWordsProxyService.ChangeFavorite(word,false,'favoriteWords');
        var index = $scope.words.indexOf(word);
        $scope.words.splice(index, 1);
    };

    $scope.deletePopup = function(word,$event){
        if($event){
            $event.stopPropagation();
        }
        var category = $scope.inPersonal ? 'מילים אישיות' :'מועדפים';
        var popup = $ionicPopup.show({
            template: '<p dir="rtl">האם אתה בטוח שברצונך למחוק מילה זו מ'+category+'</p>',
            title: '<b>אישור מחיקה</b>',
            scope: $scope,
            buttons: [
                {   text:'לא' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                        return false;
                    }
                },
                {
                    text: 'כן',
                    type: 'button-positive',
                    onTap: function(e) {
                        return true;
                    }
                }
            ]
        });
        popup.then(function(res) {
            if(res){
                if($scope.inFavorites) {
                    $scope.regularToggleFavorite(word);
                }
                else{
                    $scope.deletePersonal(word);
                }
            }
        });
    };

    $scope.read_word= function(word){
        Read.Reader(word)
    }

});