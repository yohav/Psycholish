psycholish.controller('TestCtrl', function ($scope,words,$timeout) {
    $scope.words = words;
    $scope.index = 0;
    var max = $scope.words.length;
    $scope.word = words[$scope.index];

    $scope.next = function(){
        if($('div[flip-toggle]').hasClass('flipped')){
             $('.card').click();
        }
        $scope.index++;
        if($scope.index == max){
            $scope.index = 0;
        }
        $timeout(function(){$scope.word = words[$scope.index];},200);


    }
    $scope.back = function(){
        if($('div[flip-toggle]').hasClass('flipped')){
            $('.card').click();
        }
        $scope.index--;
        if($scope.index == -1){
            $scope.index = max - 1;
        }
        $timeout(function(){$scope.word = words[$scope.index];},200);}
});

