<?php
/**
 * Created by PhpStorm.
 * User: Yoav
 * Date: 08/08/14
 * Time: 14:56
 */

class Word /*implements JsonSerializable*/ {
    public $word;
    public $definition;

    public function __construct($word, $definition){
        $this->word = $word;
        $this->definition = $definition;
    }

    public function get_definition_array(){
        $def_arr = explode(',',$this->definition);
        $def_arr = array_map("trim",$def_arr);
        return $def_arr;
    }

    public function jsonSerialize(){
        /*return array(
                'word' => $this->word,
                'definition' => $this->definition
        );*/
        return array( // to support php 5.2
            'word' => $this->word,
            'definition' => $this->definition
        );
    }

    public function __toString()
    {
        return $this->word . ' = ' . $this->definition;
    }

} 