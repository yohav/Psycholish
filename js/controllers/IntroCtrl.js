psycholish.controller('IntroCtrl', function($scope, $state,$timeout,wordsService,localWordService,$ionicActionSheet,$ionicSlideBoxDelegate){
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
        if(index == 5){
            localWordService.SetStorage('favoriteWords');
            localWordService.InitStorage();
            localWordService.SetStorage('happyWords');
            localWordService.InitStorage();
        }
    };

    $scope.enterApp = function(){
        $state.go('tabs.letters');
    };
    //$scope.login = function(){
    //    usersService.Login(function(){ $state.go('tabs.letters');});
    //};

    $scope.download = function(){
        wordsService.DownloadAll().then(function(){$scope.enterApp();});
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
            buttonClicked: function() {return true;}
        });
    };

    $scope.clickCard = function(){
        if($('div[flip-toggle]').hasClass('flipped')){
            $('.card').click();
        }
    };

    $scope.next = function(e){
        e.stopPropagation();
        $scope.clickCard();
        $scope.changeIndex(true);
    };

    $scope.back = function(e){
        e.stopPropagation();
        $scope.clickCard();
        $scope.changeIndex(false);
    };

    $scope.changeIndex = function(up){
        if(up){
            $timeout(function(){
                    $scope.index++;
                    if($scope.index >= $scope.words.length){
                        $scope.index = 0;
                    }}
                ,200);
        }
        else if($scope.words.length)
        {
            $timeout(function(){
                    $scope.index--;
                    if($scope.index <= -1){
                        $scope.index = $scope.words.length - 1;
                    }}
                ,200);
        }

    };

    $scope.toggleWords = function(){
        $scope.showingCardWords = !$scope.showingCardWords;
        if($scope.showingCardWords) {
            $scope.words = $scope.card_words;
            $scope.toggleSwipe(false);
        }
        else{
            $scope.words=[];
            $scope.toggleSwipe(true);
        }
        $scope.index = 0;
    };
    $scope.toggleSwipe = function(val) {
        $ionicSlideBoxDelegate.enableSlide(val);
    };

    //if(usersService.IsLoggedIn()){
    //    $scope.enterApp();
    //}

    $scope.showingCardWords = false;
    $scope.index = 0;
    $scope.word = {'id':'-1','word':'hello','definition':'שלום','favorited':false,'happy':false,'clicked':false};
    $scope.words = [];
    $scope.card_words=[{'id':'-1','word':'welcome','definition':'ברכת שלום','favorited':false,'happy':false,'clicked':false}
        ,{'id':'-1','word':'friend','definition':'חבר','favorited':false,'happy':false,'clicked':false}];
});