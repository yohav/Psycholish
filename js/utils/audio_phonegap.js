Player = function(words,play_button,loading){

    var $this= this;

    this.words = words.split(" ");
    this.numOfWords = this.words.length;
    this.count = 0;
    this.audio = new Media("",this.nextAudio,this.errorFallback,this.audioStatus);
    this.nextAudio = function(){
        navigator.notification.alert('in next audio');
        if($this.count >= $this.numOfWords){
            navigator.notification.alert('in if');
            play_button.show();
            loading.hide();
            this.audio.release();
        }
        else {
            navigator.notification.alert('in else');
            var current_word = $this.words[$this.count];
             $this.play_word(current_word);
        }
    }
    this.errorFallback = function(err){
        play_button.show();
        loading.hide();
    }
    this.audioStatus = function(status){
        if(status == 4){
            navigator.notification.alert('status is 4');
            this.nextAudio();
        }
        else
        {
            navigator.notification.alert('status is '+ status);
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
        $this.count++;
        $this.audio.play();
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
        $this.audio.onerror = function(){
            play_button.show();
            loading.hide();
        }
    }
}