psycholish.factory('localWordService',function($ionicPopup){
    var storageName = "personalWords";

    var saveWord = function(word){
        if(!hasLocalWords()){
            initLocalWords();
        }
        addWord(word);
    };
    var initLocalWords = function(){
        localStorage.setItem(storageName, JSON.stringify([]));
    };
    var hasLocalWords = function(){
        return localStorage.getItem(storageName) != null;
    };

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
    };
    var addWord = function(word){
        var words = getWords();
        if(!word.id) {
            word.id = "personal" + Object.keys(words).length;
        }
        words.push(word);
        localStorage.setItem(storageName, JSON.stringify(words));
    };
    var getWords = function(){
        return JSON.parse(localStorage.getItem(storageName));
    };
    var deleteWord = function(word){
        var words = getWords();
        words = words.filter(function(cur_word){
           return (cur_word.word != word.word) ;
        });
        localStorage.setItem(storageName, JSON.stringify(words));
    };

    var setStorage = function(storage){
        storageName = storage;
    };

    return {
        GetWords :getWords,
        DeleteWord: deleteWord,
        SaveWord: saveWord,
        HasWord: hasWord,
        SetStorage: setStorage,
        InitStorage:initLocalWords
    }

});