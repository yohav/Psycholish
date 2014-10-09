psycholish.directive('wordButtons',function($state,$ionicPopup,personalService,localWordsProxyService){
   return{
       restrict: 'E',
       scope:{
           word:"=",
           words:"=",
           showFavorite:"@"
       },
       templateUrl: 'word-buttons.html',
       link: function($scope){
           $scope.tab = $state.current.name;
           $scope.inFavorites = ($scope.tab == "tabs.favorites");
           $scope.inPersonal = ($scope.tab == "tabs.personal");

           $scope.toggleFavorite = function(word,$event){
               $event.stopPropagation();
               if($scope.inPersonal || $scope.inFavorites){
                   $scope.deletePopup(word);
               }
               else{
                   $scope.regularToggleFavorite(word);
               }
           };

           $scope.deletePopup = function(word){

               var category = word.id.indexOf("personal") == 0 ? 'מילים אישיות' :'מועדפים';
               var popup = $ionicPopup.show({
                   template: '<p dir="rtl">האם אתה בטוח שברצונך למחוק מילה זו מ'+category+'</p>',
                   title: '<b>אישור מחיקה</b>',
                   scope: $scope,
                   buttons: [
                       {   text:'לא' ,
                           type: 'button-assertive',
                           onTap: function(e) {
                               return false;
                           }
                       },
                       {
                           text: 'כן',
                           type: 'button-positive',
                           onTap: function(e) {
                               return true;
                           }
                       }
                   ]
               });
               popup.then(function(res) {
                   if(res){
                       $scope.regularToggleFavorite(word);
                   }
               });
           };


           $scope.regularToggleFavorite = function(word){
               if(word.favorited == undefined){
                   personalService.DeletePersonal(word);
               }
               else{
                   word.favorited = !word.favorited;
                   localWordsProxyService.ChangeFavorite(word,word.favorited,$scope,'favoriteWords');
               }
               if($scope.inFavorites || $scope.inPersonal){
                   var index = $scope.words.indexOf(word);
                   $scope.words.splice(index, 1);
               }
           };

           $scope.toggleHappy = function(word, $event){
               $event.stopPropagation();
               word.happy = !word.happy;
               localWordsProxyService.ChangeFavorite(word,word.happy,$scope,'happyWords');
           };

           $scope.getFavoriteIcon = function(word){
               if(word == undefined){
                   return;
               }
               if(word.id.indexOf("personal") == 0){
                   return 'ion-ios7-trash';
               }
               if(word.favorited)
                   return 'ion-ios7-star';
               else{
                   return 'ion-ios7-star-outline';
               }
           };

           $scope.getHappyIcon = function(word){
               if(word == undefined){
                   return;
               }
               if(word.happy)
                   return 'happy';
               else{
                   return '';
               }
           };
       }
   }
});