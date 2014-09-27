psycholish.factory('localWordService',function($ionicPopup){
    var storageName = "localWords";
    var showPopUp = function($scope){
        $scope.myword = {};
        var popup = $ionicPopup.show({
            template: '<input class="local-word-input" type="text" ng-model="myword.word" placeholder="מילה">' +
                '<input class="local-word-input" type="text" ng-model="myword.definition" placeholder="פירוש">',
            title: '<b>מילה אישית חדשה</b>',
            scope: $scope,
            buttons: [
                { text: 'ביטול',
                    onTap: function(e) {
                        return false;
                    }
                },
                {
                    text: '<b>שמור</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        return true;
                    }
                },
            ]
        });
        popup.then(function(res){
            if(res){
                var isGood = isGoodWord($scope.myword);
                var wordExists = hasWord($scope.myword);
                if(isGood && !wordExists){
                    saveWord($scope.myword);
                    $scope.words.push($scope.myword);
                }
                else{
                    handleError(isGood,wordExists);
                }
            }
        });
    }

    var handleError = function(isGood,wordExists){
        if(!isGood){
            $ionicPopup.alert({
                title: '<b>שגיאה בהכנסת מילה</b>',
                template: '<p class="local-words-error">המילה יכולה להכיל רק תווים באנגלית ורווחים</p><p class="local-words-error">הפירוש יכול להכיל רק תויים בעברית, גרש ורווחים</p>'
            });
        }
        else if(wordExists){
            $ionicPopup.alert({
                title: 'המילה כבר קיימת',
                template: 'אנא נסה שנית'
            });
        }
    }

    var isGoodWord = function(word){
        var eng = word.word;
        var heb = word.definition;
        if(eng == undefined || heb == undefined || eng.trim() == "" || heb.trim() == ""){
            return false;
        }
        if(/[^a-zA-z ]+/g.test(eng)){
            return false;
        }
        if(/[^א-ת' ]/g.test(heb)){
            return false;
        }
        return true;
    }
    var saveWord = function(word){
        if(!hasLocalWords()){
            initLocalWords();
        }
        addWord(word);
    }
    var initLocalWords = function(){
        localStorage.setItem(storageName, JSON.stringify([]));
    }
    var hasLocalWords = function(){
        return localStorage.getItem(storageName) != null;
    }

    var hasWord = function(word){
        if(!hasLocalWords()){
            return false;
        }
        var words = getWords();
        for(var index = 0 ; index < words.length ; index++){
            var cur_word = words[index].word;
            if(cur_word == word.word){
                return true;
            }
        }
        return false;
    }
    var addWord = function(word){
        var words = getWords();
        words.push(word);
        localStorage.setItem(storageName, JSON.stringify(words));
    }
    var getWords = function(){
        return JSON.parse(localStorage.getItem(storageName));
    }
    var deleteWord = function(word){
        var words = getWords();
        words = words.filter(function(cur_word){
           return (cur_word.word != word.word) ;
        });
        localStorage.setItem(storageName, JSON.stringify(words));
    }

    return {
        ShowPopUp : showPopUp,
        GetWords :getWords,
        DeleteWord: deleteWord
    }

});