<?php

require_once "../models/Queries.php";

$data = json_decode(file_get_contents("php://input"));
if($data){
    $user_id = $data->user_id;
    $name = $data->name;
}

if(isset($user_id , $name)){
    Queries::add_user($user_id,$name);
}