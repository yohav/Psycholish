<?php
/**
 * Created by PhpStorm.
 * User: Yoav
 * Date: 27/06/14
 * Time: 18:40
 */
require_once "DBConnection.php";
require_once "Word.php";
class Queries
{
    public static function add_user($user_id,$name){
        self::mysql_add_user($user_id,$name);
    }
    public static function add_favorite($user_id,$word_id){
        self::mysql_add_favorite($user_id,$word_id);
    }
    public static function delete_favorite($user_id,$word_id){
        self::mysql_delete_favorite($user_id,$word_id);
    }

    public static function get_words($letter){
       $result = self::mysql_get_words($letter);
       $words =  self::fetch_words_results($result);
       return $words;
    }

    public static function get_all_words(){
        $result = self::mysql_get_all_words();
        $words =  self::fetch_words_results($result);
        return $words;
    }

    public static function get_favorite_words($user_id){
        $result = self::mysql_get_favorite_words($user_id);
        $words =  self::fetch_words_results($result);
        return $words;
    }

    private static function fetch_words_results($result){
        $words = array();
        while($row = mysqli_fetch_array($result)){
            $word = new
            Word($row['id'],$row['word'],$row['definition']);
            array_push($words,$word);
        }
        return $words;
    }

    private static function mysql_add_favorite($user_id,$word_id){
        $query = <<<SQL
                  INSERT
                  INTO favorites (user_id,word_id)
                  VALUES ('$user_id','$word_id')
SQL;
        return DBConnection::get_instance()->query($query);
    }

    private static function mysql_delete_favorite($user_id,$word_id){
        $query = <<<SQL
                  DELETE
                  FROM favorites
                   WHERE user_id='$user_id' AND word_id=$word_id
SQL;
        return DBConnection::get_instance()->query($query);
    }

    private static function mysql_add_user($user_id,$name){
        $query = <<<SQL
                  INSERT
                  INTO users (id,name)
                  VALUES ('$user_id','$name')
SQL;
        return DBConnection::get_instance()->query($query);
    }

    private static function mysql_get_favorite_words($user_id){
        $query = <<<SQL
                  SELECT w.id, w.word,w.definition
                  FROM words as w JOIN favorites
                  ON w.id = favorites.word_id
                  WHERE favorites.user_id='$user_id'
SQL;
        return DBConnection::get_instance()->query($query);
    }
    private static function mysql_get_all_words(){
        $query = <<<SQL
                      SELECT id, word,definition
                      FROM words
SQL;
        return DBConnection::get_instance()->query($query);
    }
    private static function mysql_get_words($letter){
        if(strlen($letter) == 1){
            $query = <<<SQL
                      SELECT id, word,definition
                      FROM words
                      WHERE letter='$letter'
SQL;
        }
        else{
            $letters = "('".implode("','",str_split($letter))."')";
            $query = <<<SQL
                      SELECT id, word,definition
                      FROM words
                      WHERE letter IN $letters
SQL;
        }
        return DBConnection::get_instance()->query($query);
    }
}