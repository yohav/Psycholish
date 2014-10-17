psycholish.controller('IntroCtrl', function($scope, $animate,$state,$timeout,wordsService,localWordService,$ionicActionSheet,$ionicSlideBoxDelegate,Read){
    $scope.model = {};
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
        if(index == 5){
            localWordService.SetStorage('favoriteWords');
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

    $scope.clearSearch = function () {
        $scope.model.search_intro = '';
    };

    $scope.changeOrder = function(){
        $ionicActionSheet.show({
            buttons: [
                { text: 'ABC' },
                { text: 'מועדפים' }
            ],
            titleText: 'מיין לפי',
            cancelText: 'ביטול',
            buttonClicked: function() {return true;}
        });
    };

    $scope.$on('flipped',function(){
        $scope.readWord($('.front .word-container'));
    });

    $scope.change_card = function($event,right_or_left){
        $scope.changeIndex(right_or_left);
        var elem = angular.element($event.target);
        if($('div[flip-toggle]').hasClass('flipped')){
            $('.card').click();
        }
        else {
            var flip_card = elem.parents('.flip');
            var cssClass = right_or_left ? 'move-right' : 'move-left';
            $animate.addClass(flip_card,cssClass, function () {
                flip_card.removeClass(cssClass);
                $scope.readWord(elem);
            });
        }
    };

    $scope.readWord = function(elem){
        $timeout(function(){
            var word = $scope.words[$scope.index];
            if(word) {
                elem.find('span').css('color','#4a87ee');
                Read.Reader(word.word).then(function () {
                    elem.find('span').css('color', 'black')
                });
            }
        },300);
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