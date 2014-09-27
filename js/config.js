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
                        words: function(favoriteService){
                                 var favorites = favoriteService.GetFavorites();
                                $.each(favorites, function (index, word) {
                                    word["favorited"] = true;
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
                        words: function(personalService){
                            return personalService.GetPersonal();
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
                    controller: 'TestCtrl'
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
                        words : function(wordsService,favoriteService,$stateParams){
                            var letter = $stateParams.letter;
                            return wordsService.GetWords(letter.toLowerCase())
                                .then(function(data){
                                        var favorites =  favoriteService.GetFavorites();
                                        favorites = favorites.map(function(favorite) {return favorite.id});
                                        $.each(data, function (index, word) {
                                            favorites.indexOf(word.id) > -1 ? word["favorited"]= true : word["favorited"] = false;
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