<?php
require_once "../models/Queries.php";
function to_json($val){
    return $val->jsonSerialize();
}
if(isset($_GET['letter'])){
    $arr = Queries::get_words($_GET['letter']);
    //echo json_encode($arr);
    echo json_encode(array_map("to_json",$arr)); //to support php 5.2
}

