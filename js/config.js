psycholish.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "tabs.html"
        })

        .state('tabs.about', {
            url: "/about",
            views: {
                'about-tab': {
                    templateUrl: "about.html"
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
                    controller: 'WordsCtrl'
                }
            }
        });
    $urlRouterProvider.otherwise("/tab/letters");
});