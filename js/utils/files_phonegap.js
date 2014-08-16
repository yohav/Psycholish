FileHandler = function(){
    var dataDir = cordova.file.dataDirectory;
    var $this = this;
    this.getFile = function(file){
        this.file = file;
        popup('getFile');
        window.resolveLocalFileSystemURL(dataDir +  this.file+".json", this.appStart, this.downloadAsset);
    }
    this.downloadAsset = function() {
        popup('downloadAsset')
        var fileTransfer = new FileTransfer();
        popup("About to start transfer");
        popup(this.file);
        var assetURL = "http://psycholish.uphero.com/controllers/WordsController.php?letter="+this.file;
        popup(assetURL);
        fileTransfer.download(assetURL, dataDir +  this.file+".json",
            function(entry) {
                popup("Success!");
                $this.appStart();
            },
            function(err) {
                popup("Error");
            });
    }
    this.appStart = function(){
        popup("appStart");
    }
//    this.saveFile = function(file,data){
//        popup('saveFile');
//        popup(dataDir+"/"+file);
//        $cordovaFile.writeFile(dataDir+file, data).then(function(result) {
//            popup('success');
//        }, function(err) {
//            popup('error');
//        });
//    }
}