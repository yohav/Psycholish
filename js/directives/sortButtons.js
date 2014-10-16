psycholish.directive('sortButtons',function($ionicActionSheet,$filter){
   return {
       restrict:'E',
       scope:{
           words:'=',
           shouldSort:'@',
           predicate:'=?'
       },
       templateUrl:'sortButtons.html',
       link:function(scope){
           scope.orderUp = false;
           scope.shouldSort = scope.shouldSort === 'true';
           scope.predicate = scope.predicate || 'word';

           scope.changeOrderDirection = function(){
               scope.orderUp = ! scope.orderUp;
               scope.predicate = "-"+scope.predicate;
               scope.predicate = scope.predicate.replace("--","");
               if(scope.shouldSort){
                   scope.sort();
               }
           };

           scope.changeOrder = function(){
               $ionicActionSheet.show({
                   buttons: [
                       { text: 'ABC' },
                       { text: 'מועדפים' },
                   ],
                   titleText: 'מיין לפי',
                   cancelText: 'ביטול',
                   cancel: function() {

                   },
                   buttonClicked: function(index) {
                       switch(index){
                           case 0:
                               scope.predicate = 'word';
                               break;
                           case 1:
                               scope.predicate = '-favorited';
                               break;
                       }
                       if(scope.shouldSort){
                           scope.sort();
                       }
                       return true;
                   }
               });
           };

           scope.sort = function(){
               scope.words = $filter('orderBy')(scope.words, [scope.predicate,'word']);
           };
       }
   }
});