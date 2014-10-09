psycholish.controller('WordsCtrl', function ($scope,$state,$stateParams,$ionicPopup,$ionicActionSheet,words) {



    $scope.tab = $state.current.name;
    $scope.inFavorites = ($scope.tab == "tabs.favorites");
    $scope.inPersonal = ($scope.tab == "tabs.personal");
    $scope.letter = $stateParams.letter;
    $scope.allDefinitionsVisible = false;
    $scope.words = words;
    $scope.predicate = 'word';
    $scope.orderUp = false;

    $scope.setTabTitle = function(){
        if ($scope.inFavorites){
            $scope.tabTitle =  'מועדפים' ;
        }
        else if ($scope.inPersonal){
            $scope.tabTitle =  'מילים אישיות';
        }
        else $scope.tabTitle =  $scope.letter;
    };

    $scope.setTabTitle();

    $scope.clearSearch = function () {
        this.query = '';
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

    $scope.changeOrder = function(){
        $ionicActionSheet.show({
            buttons: [
                { text: 'ABC' },
                { text: 'מועדפים' },
                { text: 'ידע' }
            ],
            titleText: 'מיין לפי',
            cancelText: 'ביטול',
            cancel: function() {

            },
            buttonClicked: function(index) {
                switch(index){
                    case 0:
                        $scope.predicate = 'word';
                        break;
                    case 1:
                        $scope.predicate = '-favorited';
                        break;
                    case 2:
                        $scope.predicate = '-happy';
                        break;
                }
                return true;
            }
        });
    };

    $scope.changeOrderDirection = function(){
        $scope.orderUp = ! $scope.orderUp;
        $scope.predicate = "-"+$scope.predicate;
        $scope.predicate = $scope.predicate.replace("--","");
    }

});