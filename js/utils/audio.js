Player = function(words,endPlayCallback){

    var $this= this;

    this.words = words.split(" ");
    this.numOfWords = this.words.length;
    this.count = 0;
    this.audio = new Audio();
    this.nextAudio = function(){
        if($this.count >= $this.numOfWords){
            endPlayCallback();
        }
        else {
            var current_word = $this.words[$this.count];
             $this.play_word(current_word);
        }
    }

    this.play = function(){
        this.play_word(this.words[0]);
    }

    this.play_word = function(word){
        this.playV1(word);
    }
    this.play_url = function(soundUrl){
        $this.audio.src = soundUrl;
        $this.audio.load();
        $this.audio.play();
        $this.count++;
    }
    this.playV1 = function(word){
        var soundUrl = 'https://ssl.gstatic.com/dictionary/static/sounds/de/0/'+word+'.mp3';
        this.play_url(soundUrl);
        $this.audio.onerror = function(){
            $this.playV2(word);
        }

    }
    this.playV2 = function(word){
        var soundUrl = 'http://translate.google.com/translate_tts?tl=en&q='+word;
        this.play_url(soundUrl);
        $this.audio.onerror = function(){
            $this.playV3(word);
        }
    }
    this.playV3 = function(word){
        word = capitalize(word);
        var soundUrl = 'http://translate.google.com/translate_tts?tl=en&q='+word;
        this.play_url(soundUrl);
        $this.audio.onerror =  endPlayCallback;
    }

    this.audio.addEventListener('ended',this.nextAudio,false);
    this.audio.addEventListener('error',endPlayCallback,true);
}