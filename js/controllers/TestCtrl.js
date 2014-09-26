psycholish.controller('TestCtrl', function ($scope,$timeout,wordsService,favoriteService,usersService,$state) {
    $scope.next = function(){
        if($('div[flip-toggle]').hasClass('flipped')){
             $('.card').click();
        }
        $scope.index++;
        if($scope.index >= $scope.words.length){
            $scope.index = 0;
        }
        setTimeout(function(){$scope.word = $scope.words[$scope.index];},1000);


    }
    $scope.back = function(){
        if($('div[flip-toggle]').hasClass('flipped')){
            $('.card').click();
        }
        if($scope.words.length)
        {
            $scope.index--;
            if($scope.index <= -1){
                $scope.index = $scope.words.length - 1;
            }
        }
        setTimeout(function(){$scope.word = $scope.words[$scope.index];},1000);
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
        ["Y", "Z","מועדפים"]
    ];
    $scope.letters = "";
    $scope.checkedFavorites = false;
    $scope.loggedIn = usersService.IsLoggedIn();
    $scope.changeLetter = function(letter){
        letter = letter.toLowerCase();
        var index = $scope.letters.indexOf(letter);
        if( index > -1){
            $scope.letters = $scope.letters.slice(0, index)+$scope.letters.slice(index + 1);
            $scope.words = $scope.words.filter(
                                    function(word){
                                        return (word.word.charAt(0)!=letter);
                                    });
        }
        else {
            if(letter == "מועדפים"){
                if($scope.checkedFavorites){
                    $scope.words = $scope.words.filter(
                        function(word){
                            return ($scope.favorites.indexOf(word) == -1);
                        });
                    $scope.checkedFavorites = false;
                }
                else{
                    if($scope.loggedIn)
                    {
                        $scope.getFavorites();
                    }
                    else{
                    usersService.ShowLoginPopup(function(){
                            $scope.getFavorites();
                            $scope.loggedIn = true;
                        }
                        ,$state.current.name,$scope);
                    }
                }
            }
            else  {
                $scope.letters+=letter;
                wordsService.getWordsHTTP(letter)
                    .then(function(data){
                        $scope.words = $scope.words.concat(data);
                    });
            }
        }
        $scope.index = ($scope.index < $scope.words.length) ? $scope.index : 0;

    }
    $scope.getFavorites = function(){
        favoriteService.GetFavorites()
            .then(function(data){
                $scope.favorites = data;
                $scope.words = $scope.words.concat(data);
                $scope.checkedFavorites = true;
            });
    }

});

