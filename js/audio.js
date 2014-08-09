Player = function(words){

    var $this= this;

    this.words = words.split(" ");
    this.numOfWords = this.words.length;
    this.count = 0;

    this.play = function(){
        this.play_word(this.words[0]);
    }

    this.play_word = function(word){
        this.playV1(word);
        this.count++;
        if(this.count < this.numOfWords){
            setTimeout(function(){$this.play_word($this.words[$this.count])},1000);
        }
    }
    this.play_url = function(soundUrl){
        var audio = new Audio(soundUrl);
        audio.play();
        return audio;
    }
    this.playV1 = function(word){
        var soundUrl = 'https://ssl.gstatic.com/dictionary/static/sounds/de/0/'+word+'.mp3';
        this.play_url(soundUrl).onerror = function(){
            $this.playV2(word);
        }

    }
    this.playV2 = function(word){
        var soundUrl = 'http://translate.google.com/translate_tts?tl=en&q='+word;
        this.play_url(soundUrl).onerror = function(){
            $this.playV3(word);
        }
    }
    this.playV3 = function(word){
        word = capitalize(word);
        var soundUrl = 'http://translate.google.com/translate_tts?tl=en&q='+word;
        this.play_url(soundUrl);
    }
}