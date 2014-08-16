FileHandler = function($cordovaFile){
    var dataDir = cordova.file.dataDirectory;
    popup(dataDir);
    this.getFile = function(file){
        popup('getFile');
        $cordovaFile.checkFile(dataDir, file).then(function(result) {
            popup(result.name);
        }, function(err) {
            popup(err.code);
        });
    }
    this.saveFile = function(file,data){
        popup('saveFile');
        popup(dataDir+"/"+file);
        $cordovaFile.writeFile(dataDir+"/"+file, data).then(function(result) {
            popup('success');
        }, function(err) {
            popup('error');
        });
    }
}