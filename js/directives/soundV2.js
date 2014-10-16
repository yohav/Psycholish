psycholish.directive('sound',function(Read){
    return {
        restrict: 'A',
        scope:{
            text:'=',
            highlightElem:'@'
        },
        link: function (scope, elem, attrs) {
            elem.bind('click', function() {
                elem.find(scope.highlightElem).css('color','#4a87ee')
                Read.Reader(scope.text).then(function(){
                    elem.find(scope.highlightElem).css('color','black')
                });
            });
        }
    }

});