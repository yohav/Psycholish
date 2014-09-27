psycholish.factory('favoriteService',function(localWordService){
    var getFavorites = function(){
        localWordService.SetStorage('favoriteWords');
        return localWordService.GetWords() || [];
    }
    var changeFavorite = function(word,isAdd,$scope){
        localWordService.SetStorage('favoriteWords');
        if(isAdd){
            localWordService.SaveWord($scope,{'id':word.id,'word':word.word, 'definition': word.definition});
        }
        else{
            localWordService.DeleteWord(word);
        }
    }
    return {
        GetFavorites : getFavorites,
        ChangeFavorite: changeFavorite
    }
});