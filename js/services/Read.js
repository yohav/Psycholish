psycholish.factory('Read',function($q){

    var soundUrls = ['https://ssl.gstatic.com/dictionary/static/sounds/de/0/',
        'http://www.howjsay.com/mp3/'];

    var Reader = function(words){
        var that = this;
        this.deferred = $q.defer();
        this.mywords = words.split(" ");
        this.numOfWords = this.mywords.length;
        this.current = 0;
        this.soundUrlNum = 0;

        if(window.media){
            this.audio = new Media("",function(){that.next();},function(){that.error();});
        }
        else{
            this.audio = new Audio();
            this.audio.addEventListener('ended',function(){that.next();});
            this.audio.addEventListener('error',function(){that.error();});
        }



        this.readWord();

        return this.deferred.promise;
    };

    Reader.prototype.readWord = function(){
        this.audio.src = soundUrls[this.soundUrlNum]+this.mywords[this.current]+'.mp3';
        this.audio.load();
        this.audio.play();
    };


    Reader.prototype.error = function(){
        if(this.soundUrlNum < soundUrls.length - 1) {
            this.soundUrlNum++;
            this.readWord();
        }
        else{
            this.next();
        }

    };

    Reader.prototype.next = function(){
        this.current++;
        if(this.current >= this.numOfWords){
            this.end();
        }
        else {
            this.readWord();
        }
    };

    Reader.prototype.end = function(){
        if(window.media) {
            this.audio.release();
        }
        this.deferred.resolve();
    };

    return{
        Reader: function(words){return new Reader(words);}
    }
});