psycholish.factory('fileService',function(){



    var loadFile =  function(url,file_name){
        alert("cordova file:" +cordova.file);
        var dataDir = cordova.file.dataDirectory;
        alert(dataDir);
        window.resolveLocalFileSystemURL(dataDir + file_name, appStart, downloadAsset);

        function downloadAsset() {
            var fileTransfer = new FileTransfer();
            console.log("About to start transfer");
            fileTransfer.download(url, dataDir + file_name,
                function(entry) {
                    alert("Success!");
                    appStart();
                },
                function(err) {
                    alert("Error: "+err);
                });
        }

        //I'm only called when the file exists or has been downloaded.
        function appStart() {
            alert("App ready!");
        }
    }


    return {
        LoadFile: loadFile
    }
});