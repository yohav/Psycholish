psycholish.factory('localWordsProxyService',function(localWordService){
    var getFavorites = function(storageName){
        localWordService.SetStorage(storageName);
        return localWordService.GetWords() || [];
    }
    var changeFavorite = function(word,isAdd,$scope,storageName){
        localWordService.SetStorage(storageName);
        if(isAdd){
            localWordService.SaveWord({'id':word.id,'word':word.word, 'definition': word.definition});
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