psycholish.controller('TestCtrl', function ($scope,$timeout,wordsService,favoriteService,$state,personalService) {

   $scope.clickCard = function(){
        if($('div[flip-toggle]').hasClass('flipped')){
            $('.card').click();
        }
    };

    $scope.next = function(){
        $scope.clickCard();
        $scope.changeIndex(true);
    };

    $scope.back = function(){
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
    };

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
        $scope.updateIndex();
    };

    $scope.updateIndex = function(){
        $scope.index = ($scope.index < $scope.words.length) ? $scope.index : 0;

    };

    $scope.checkLetter = function(letter){
        $scope.letters+=letter;
        wordsService.GetWords(letter)
            .then(function(data){
                $scope.words = $scope.words.concat(data);
            });
    };

    $scope.unCheckLetter = function(letter,index){
        $scope.letters = $scope.letters.slice(0, index)+$scope.letters.slice(index + 1);
        $scope.words = $scope.words.filter(
            function(word){
                return (word.word.charAt(0)!=letter);
            });
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
            $scope.favorites = favoriteService.GetFavorites();
            $scope.words = $scope.words.concat($scope.favorites);

        }
        else{
            $scope.personals = personalService.GetPersonal();
            $scope.words = $scope.words.concat($scope.personals);
        }
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

});

