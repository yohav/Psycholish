psycholish.directive('sound',function(Read){
return {
    restrict: 'E',
    scope:{
        text:'=',
        iconClass:'=?'
    },
    template:'<img class="ng-class:iconClass; play-button" src="img/play.svg" ng-click="play_sound($event);">' +
    ' <img class="ng-class:iconClass; loading-sound" hidden src="img/loading.gif">',
    link: function (scope, elem, attrs) {

        scope.play_sound = function($event){
            $event.stopPropagation();
            var play_button = elem.find('.play-button');
            var loading = play_button.siblings('img');
            play_button.attr('hidden',true);
            loading.attr('hidden',false);
            Read.Reader(scope.text).then(function(){
                play_button.attr('hidden',false);
                loading.attr('hidden',true);
            });
        }
    }
}

});