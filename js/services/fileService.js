psycholish.factory('fileService',function(){

    var dataDir = cordova.file.dataDirectory;
    popup(dataDir);

    var loadFile =  function(url,file_name){
        window.resolveLocalFileSystemURL(dataDir + file_name, appStart, downloadAsset);

        function downloadAsset() {
            var fileTransfer = new FileTransfer();
            console.log("About to start transfer");
            fileTransfer.download(url, dataDir + file_name,
                function(entry) {
                    popup("Success!");
                    appStart();
                },
                function(err) {
                    popup("Error: "+err);
                });
        }

        //I'm only called when the file exists or has been downloaded.
        function appStart() {
            popup("App ready!");
        }
    }


    return {
        LoadFile: loadFile
    }
});