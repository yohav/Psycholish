<?php

require_once "../models/Queries.php";

$data = json_decode(file_get_contents("php://input"));
if($data){
    $user_id = $data->user_id;
    $word_id = $data->word_id;
    $action = $data->action;
}

function to_json($val){

    return $val->jsonSerialize();

}

if(isset($_GET['user_id'])){

    $arr = Queries::get_favorite_words($_GET['user_id']);

    //echo json_encode($arr);

    echo json_encode(array_map("to_json",$arr)); //to support php 5.2
}
else if($user_id && $word_id){
        if($action){
            Queries::add_favorite($user_id,$word_id);
        }
        else{
            Queries::delete_favorite($user_id,$word_id);
        }
}