psycholish.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('intro', {
            url: '/intro',
            templateUrl: 'intro.html',
            controller: 'IntroCtrl'
        })
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "tabs.html"
        })
        .state('tabs.favorites', {
            url: "/favorites",
            views: {
                'favorites-tab': {
                    templateUrl: "words.html",
                    controller: 'WordsCtrl',
                    resolve:{
                        words: function(localWordsProxyService){
                                var favorites = localWordsProxyService.GetFavorites('favoriteWords');
                                var happyWords = localWordsProxyService.GetFavorites('happyWords');
                                happyWords = happyWords.map(function(happy) {return happy.id});
                                $.each(favorites, function (index, word) {
                                    word["favorited"] = true;
                                    happyWords.indexOf(word.id) > -1 ? word["happy"]= true : word["happy"] = false;
                                });
                                return favorites;
                        }
                    }
                }
            }
        })
        .state('tabs.personal', {
            url: "/personal",
            views: {
                'personal-tab': {
                    templateUrl: "words.html",
                    controller: 'WordsCtrl',
                    resolve:{
                        words: function(personalService, localWordsProxyService){
                            var personal =  personalService.GetPersonal();
                            var happyWords = localWordsProxyService.GetFavorites('happyWords');
                            happyWords = happyWords.map(function(happy) {return happy.id});
                            $.each(personal, function (index, word) {
                                happyWords.indexOf(word.id) > -1 ? word["happy"]= true : word["happy"] = false;
                            });
                            return personal;
                        }
                    }
                }
            }
        })
        .state('tabs.test', {
            url: "/test",
            views: {
                'test-tab': {
                    templateUrl: "test.html",
                    controller: 'TestCtrl',
                    resolve:{
                        happyWords: function(localWordsProxyService){
                            var happyWords = localWordsProxyService.GetFavorites('happyWords');
                            return happyWords.map(function(happy) {return happy.id});
                        },
                        favoriteWords: function(localWordsProxyService) {
                            var favorites =  localWordsProxyService.GetFavorites('favoriteWords');
                            return favorites.map(function(favorite) {return favorite.id});
                        }
                    }
                }
            }
        })
        .state('tabs.letters', {
            url: "/letters",
            views: {
                'letters-tab': {
                    templateUrl: "letters-menu.html",
                    controller: 'LettersCtrl'
                }
            }
        })

        .state('tabs.letter', {
            url: "/letters/:letter",
            views: {
                'letters-tab': {
                    templateUrl: "words.html",
                    controller: 'WordsCtrl',
                    resolve:{
                        words : function(wordsService,localWordsProxyService,$stateParams){
                            var letter = $stateParams.letter;
                            return wordsService.GetWords(letter.toLowerCase())
                                .then(function(data){
                                        var favorites =  localWordsProxyService.GetFavorites('favoriteWords');
                                        favorites = favorites.map(function(favorite) {return favorite.id});
                                        var happyWords = localWordsProxyService.GetFavorites('happyWords');
                                        happyWords = happyWords.map(function(happy) {return happy.id});
                                        $.each(data, function (index, word) {
                                            favorites.indexOf(word.id) > -1 ? word["favorited"]= true : word["favorited"] = false;
                                            happyWords.indexOf(word.id) > -1 ? word["happy"]= true : word["happy"] = false;
                                            word["clicked"] = false;
                                        });
                                        return data;
                                });
                        }
                    }
                }
            }
        });
    $urlRouterProvider.otherwise("/intro");
});