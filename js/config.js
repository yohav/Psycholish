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
                            return favoriteService.GetFavorites().then(function(data){
                                $.each(data, function (index, word) {
                                    word["favorited"] = true;
                                });
                                return data;
                            });
                        }
                    }
                }
            }
        })
        .state('tabs.contact', {
            url: "/contact",
            views: {
                'contact-tab': {
                    templateUrl: "contact.html"
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
                        words: function(favoriteService){
                            return favoriteService.GetFavorites();
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
                        words : function(wordsService,favoriteService,$stateParams,usersService){
                            var letter = $stateParams.letter;
                            return wordsService.getWordsHTTP(letter.toLowerCase())
                                .then(function(data){
                                     var words = data;
                                     var loggedin = usersService.IsLoggedIn();
                                    if(loggedin){
                                        return favoriteService.GetFavorites()
                                            .then(function(data){
                                                var favorites = data.map(function(favorite) {return favorite.id});
                                                $.each(words, function (index, word) {
                                                    favorites.indexOf(word.id) > -1 ? word["favorited"]= true : word["favorited"] = false;
                                                    word["clicked"] = false;
                                                });
                                                return words;
                                            });
                                    }
                                    else{
                                        $.each(words, function (index, word) {
                                            word["clicked"] = false;
                                        });
                                        return words;
                                    }
                                });
                        }
                    }
                }
            }
        });
    $urlRouterProvider.otherwise("/intro");
});