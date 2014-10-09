psycholish.factory('personalService',function(localWordService,$ionicPopup){
    var addNewPersonalPopup = function($scope){
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
                localWordService.SetStorage('personalWords');
                var wordExists = localWordService.HasWord($scope.myword);
                if(isGood && !wordExists){
                    localWordService.SaveWord($scope.myword);
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

    var getPersonal = function(){
        localWordService.SetStorage('personalWords');
        return localWordService.GetWords() || [];
    }

    var deletePersonal = function(word){
        localWordService.SetStorage('personalWords');
        localWordService.DeleteWord(word);
    }

    return {
        GetPersonal : getPersonal,
        DeletePersonal: deletePersonal,
        AddNewPersonalPopup: addNewPersonalPopup

    }

});