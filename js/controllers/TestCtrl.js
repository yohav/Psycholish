psycholish.controller('TestCtrl', function (Read,$animate,$scope,$timeout,$filter,$state,$ionicActionSheet,wordsService,localWordsProxyService,letterRows,personalService,favoriteWords) {

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

    $scope.shuffle = function(){
        $filter('shuffle')($scope.words);
    };

    $scope.words=[];
    $scope.index = 0;
    $scope.rows = letterRows;
    $scope.letters = "";
    $scope.checkedFavorites = false;
    $scope.checkedPersonal = false;

    $scope.changeLetter = function(letter){
        letter = letter.toLowerCase();
        var index = $scope.letters.indexOf(letter);
        if( index > -1){
            $scope.unCheckLetter(letter,index);
        }
        else {
            $scope.checkLetter(letter);
        }

    };

    $scope.updateIndex = function(){
        $scope.index = ($scope.index < $scope.words.length) ? $scope.index : 0;
        $scope.sort();

    };

    $scope.checkLetter = function(letter){
        $scope.letters+=letter;
        wordsService.GetWords(letter)
            .then(function(data){
                $scope.words = $scope.words.concat(data);
                $.each($scope.words, function (index, word) {
                    favoriteWords.indexOf(word.id) > -1 ? word["favorited"]= true : word["favorited"] = false;
                });
                $scope.updateIndex();
            });
    };

    $scope.unCheckLetter = function(letter,index){
        $scope.letters = $scope.letters.slice(0, index)+$scope.letters.slice(index + 1);
        $scope.words = $scope.words.filter(
            function(word){
                return (word.word.charAt(0)!=letter);
            });
        $scope.updateIndex();
    };

    $scope.changeSpecial = function(special_name){
        var checked = (special_name == 'favorites') ? $scope.checkedFavorites : $scope.checkedPersonal;
        if(checked){
            $scope.unCheckSpecial(special_name);
        }
        else{
            $scope.checkSpecial(special_name);
        }
        $scope.updateIndex();
    };

    $scope.checkSpecial = function(special_name){
        $scope.getSpecial(special_name);
        if(special_name == 'favorites'){
             $scope.checkedFavorites = true;
        }
        else{
            $scope.checkedPersonal = true;
        }

    };

    $scope.unCheckSpecial = function(special_name){
        $scope.data = (special_name == 'favorites') ? $scope.favorites : $scope.personals;
        $scope.words = $scope.words.filter(
            function(word){
                return ($scope.data.indexOf(word) == -1);
            });
        if(special_name == 'favorites'){
            $scope.checkedFavorites = false;
        }
        else{
            $scope.checkedPersonal = false;
        }
    };

    $scope.getSpecial = function(special_name){
        if(special_name == 'favorites'){
            $scope.favorites = localWordsProxyService.GetFavorites('favoriteWords');
            $scope.words = $scope.words.concat($scope.favorites);

        }
        else{
            $scope.personals = personalService.GetPersonal();
            $scope.words = $scope.words.concat($scope.personals);
        }
        $.each($scope.words, function (index, word) {
            favoriteWords.indexOf(word.id) > -1 ? word["favorited"]= true : word["favorited"] = false;
        });
    };

    $scope.deleteAll = function(){
        $('input').prop('checked',false);
        $scope.letters="";
        $scope.words = [];
        $scope.favorites= [];
        $scope.personals = [];
        $scope.updateIndex();
        $scope.checkedFavorites = false;
        $scope.checkedPersonal = false;
    };

    $scope.chooseAll = function(){
        if($('input:checked').length != 28)
        {
            $scope.deleteAll();
            $('input').prop('checked', true);
            $scope.checkSpecial('favorites');
            $scope.checkSpecial('personal');
            $.each($scope.rows, function (row_index, row) {
                $.each(row, function (letter_index, letter) {
                    $scope.checkLetter(letter.toLowerCase());
                });
            });
            $scope.updateIndex();
        }
    };

});

