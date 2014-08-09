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
    public static function get_words($letter){
        $words = array();
        $result = self::mysql_get_words($letter);
        while($row = mysqli_fetch_array($result)){
            $word = new
            Word($row['word'],$row['definition']);
            array_push($words,$word);
        }
        return $words;
    }

    private static function mysql_get_words($letter){
        $query = <<<SQL
                  SELECT word,definition
                  FROM $letter
SQL;
        return DBConnection::get_instance()->query($query);
    }
}