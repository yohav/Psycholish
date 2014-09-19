Player = function(words,play_button,loading){

    var $this= this;

    this.words = words.split(" ");
    this.numOfWords = this.words.length;
    this.count = 0;
    this.audio = new Media("",
                        function(){
                            $this.nextAudio();
                        });
    this.nextAudio = function(){
        if($this.count >= $this.numOfWords){
            play_button.show();
            loading.hide();
            $this.audio.release();
        }
        else {
            var current_word = $this.words[$this.count];
             $this.play_word(current_word);
        }
    }
    this.errorFallback = function(){
        play_button.show();
        loading.hide();
    }
    this.play = function(){
        this.play_word(this.words[0]);
    }

    this.play_word = function(word){
        this.playV1(word);
    }
    this.play_url = function(soundUrl){
        $this.audio.src = soundUrl;
        $this.count++;
        $this.audio.play();
    }
    this.playV1 = function(word){
        var soundUrl = 'https://ssl.gstatic.com/dictionary/static/sounds/de/0/'+word+'.mp3';
        $this.audio.mediaError = function(err){
            $this.playV2(word);
        }
        this.play_url(soundUrl);
    }
    this.playV2 = function(word){
        var soundUrl = 'http://translate.google.com/translate_tts?tl=en&q='+word;
        $this.audio.mediaError = function(err){
            $this.playV3(word);
        }
        this.play_url(soundUrl);
    }
    this.playV3 = function(word){
        word = capitalize(word);
        var soundUrl = 'http://translate.google.com/translate_tts?tl=en&q='+word;
        $this.audio.mediaError = function(err){
            play_button.show();
            loading.hide();
        }
        this.play_url(soundUrl);
    }
}