psycholish.controller('LettersCtrl', function ($scope,facebookService) {
    facebookService.Login();
    $scope.rows = [
        ["A", "B", "C", "D"],
        ["E", "F", "G", "H"],
        ["I", "J", "K", "L"]

        ,
        ["M", "N", "O", "P"],
        ["Q", "R", "S", "T"],
        ["U", "V", "W", "X"],
        ["Y", "Z"]
    ];
});

