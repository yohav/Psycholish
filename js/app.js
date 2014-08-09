﻿angular.module('psycholish', ['ionic'])    .run(function($ionicPlatform) {        $ionicPlatform.ready(function() {            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard            // for form inputs)            if(window.cordova && window.cordova.plugins.Keyboard) {                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);            }            if(window.StatusBar) {                // Set the statusbar to use the default style, tweak this to                // remove the status bar on iOS or change it to use white instead of dark colors.                StatusBar.styleDefault();            }        });    })    .config(function($stateProvider, $urlRouterProvider) {        $stateProvider            .state('tabs', {                url: "/tab",                abstract: true,                templateUrl: "tabs.html"            })            .state('tabs.about', {                url: "/about",                views: {                    'about-tab': {                        templateUrl: "about.html"                    }                }            })            .state('tabs.contact', {                url: "/contact",                views: {                    'contact-tab': {                        templateUrl: "contact.html"                    }                }            })            .state('tabs.letters', {                url: "/letters",                views: {                    'letters-tab': {                        templateUrl: "letters-menu.html",                        controller: 'LettersCtrl'                    }                }            })            .state('tabs.letter', {                url: "/letters/:letter",                views: {                    'letters-tab': {                        templateUrl: "words.html",                        controller: 'WordsCtrl',                        resolve:   {                            words : function(wordsService,$stateParams){                                 return wordsService.getWords($stateParams);                             }                        }                    }                }            });        $urlRouterProvider.otherwise("/tab/letters");    })    .factory("wordsService", function($q, $http){        return {            getWords: function($stateParams){                var deferred = $q.defer();                var url ='controllers/WordsController.php?letter=';                url += $stateParams.letter.toLowerCase();                $http.get(url)                    .success(function(data) {                        deferred.resolve(data);                    });                return deferred.promise;            }        };    })    .directive('dragBack', function($ionicGesture, $state) {        return {            restrict : 'EAC',            link : function(scope, elem, attr) {                $ionicGesture.on('swiperight', function(event) {                    event.preventDefault();                    window.location = '#/tab/letters'                }, elem);            }        }    })    .controller('LettersCtrl', function($scope){        $scope.rows =[["A","B","C","D"],["E","F","G","H"],["I","J","K","L"]            ,["M","N","O","P"],["Q","R","S","T"],["U","V","W","X"],["Y","Z"]];    })    .controller('WordsCtrl', function($scope, words,$stateParams,$ionicScrollDelegate) {        var pagesShown = 1;        var pageSize = 20;        $scope.letter= $stateParams.letter;        $.each(words,function(index,word){            word["clicked"] = false;        });        $scope.allDefinitionsVisible = false;        $scope.words = words.slice().splice(0,pagesShown * pageSize);        $scope.play_sound = function(word){            var player = new Player(word);            player.play();        }        $scope.clearSearch = function(){            this.query = '';        }        $scope.loadMore = function(){            pagesShown++;            $scope.words = words.slice().splice(0, pagesShown * pageSize);            $scope.$broadcast('scroll.infiniteScrollComplete');        }        $scope.hasMoreItemsToShow = function() {            return pagesShown < (words.length / pageSize);        };//        $scope.scrollTop = function() {//            $ionicScrollDelegate.scrollTop(true);//        };        $scope.toggleAllDefinitions = function(){            $scope.allDefinitionsVisible = !$scope.allDefinitionsVisible;            $.each(words,function(index,word){word["clicked"] = $scope.allDefinitionsVisible;});            $.each($scope.words,function(index,word){word["clicked"] = $scope.allDefinitionsVisible;});        }    });