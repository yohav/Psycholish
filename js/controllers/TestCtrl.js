﻿psycholish.controller('TestCtrl', function ($scope,$timeout,wordsService,favoriteService,usersService,$state) {

   $scope.clickCard = function(){
        if($('div[flip-toggle]').hasClass('flipped')){
            $('.card').click();
        }
    }

    $scope.next = function(){
        $scope.clickCard();
        $scope.changeIndex(true);
    }

    $scope.back = function(){
        $scope.clickCard();
        $scope.changeIndex(false);
    }

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

    }

    $scope.shuffleArray = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    $scope.words=[];
    $scope.index = 0;
    $scope.rows = [
        ["A", "B", "C", "D"],
        ["E", "F", "G", "H"],
        ["I", "J", "K", "L"],
        ["M", "N", "O", "P"],
        ["Q", "R", "S", "T"],
        ["U", "V", "W", "X"],
        ["Y", "Z"]
    ];
    $scope.letters = "";
    $scope.checkedFavorites = false;
    $scope.changeLetter = function(letter){
        letter = letter.toLowerCase();
        var index = $scope.letters.indexOf(letter);
        if( index > -1){
            $scope.unCheckLetter(letter,index);
        }
        else {
            $scope.checkLetter(letter);
        }
        $scope.updateIndex();
    }
    $scope.updateIndex = function(){
        $scope.index = ($scope.index < $scope.words.length) ? $scope.index : 0;

    }
    $scope.checkLetter = function(letter){
        $scope.letters+=letter;
        wordsService.getWordsHTTP(letter)
            .then(function(data){
                $scope.words = $scope.words.concat(data);
            });
    }
    $scope.unCheckLetter = function(letter,index){
        $scope.letters = $scope.letters.slice(0, index)+$scope.letters.slice(index + 1);
        $scope.words = $scope.words.filter(
            function(word){
                return (word.word.charAt(0)!=letter);
            });
    }
    $scope.checkFavorites = function(){
        var loggedIn = usersService.IsLoggedIn();
        if(loggedIn)
        {
            $scope.getFavorites();
        }
        else{
            $scope.showLogin();
        }
    }
    $scope.showLogin = function(){
        usersService.ShowLoginPopup(
            function(){
                $scope.getFavorites();
            }
            ,function(){
                $state.go($state.current.name);
                $('.favorite-checkbox input').prop('checked',false);
            }
            ,$scope);
    }
    $scope.unCheckFavorites = function(){
        $scope.words = $scope.words.filter(
            function(word){
                return ($scope.favorites.indexOf(word) == -1);
            });
        $scope.checkedFavorites = false;
    }

    $scope.changeFavorites = function(){
        if($scope.checkedFavorites){
            $scope.unCheckFavorites();
        }
        else{
            $scope.checkFavorites();
        }
        $scope.updateIndex();
    }
    $scope.getFavorites = function(){
        favoriteService.GetFavorites()
            .then(function(data){
                $scope.favorites = data;
                $scope.words = $scope.words.concat(data);
                $scope.checkedFavorites = true;
            });
    }
    $scope.deleteAll = function(){
        $('input').prop('checked',false);
        $scope.letters="";
        $scope.words = [];
        $scope.updateIndex();
        $scope.checkedFavorites = false;

    }

    $scope.play_sound = function (word,$event) {
        $event.stopPropagation();
        var play_button = $($event.currentTarget);
        var loading = play_button.siblings('img');
        play_button.attr('hidden',true);
        loading.attr('hidden',false);
        var player = new Player(word,function(){play_button.attr('hidden',false); loading.attr('hidden',true); });
        player.play();
    }

});

