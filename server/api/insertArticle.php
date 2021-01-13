<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__.'/../classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));

//CREATE MESSAGE ARRAY AND SET EMPTY
$msg['message'] = '';
$resTitle = array("options"=>array("regexp"=>"/^([a-zA-Z\d\-_ \s\:\'\’\,\‘]){1,99}+$/"));
$resBody = array("options"=>array("regexp"=>"/^([a-zA-Z\d\-_ \s\:\'\’\,\‘\.\“\”\(\)\/\–]){1,999}+$/"));

// CHECK IF RECEIVED DATA FROM THE REQUEST
if(isset($data->title) && isset($data->body) && isset($data->writer_id)){
    // CHECK DATA VALUE IS EMPTY OR NOT
    if(!empty($data->title) && !empty($data->body) && !empty($data->writer_id) && !empty($data->user_type_id)){

        if(!filter_var($data->title, FILTER_VALIDATE_REGEXP,$resTitle)) {
            $msg['message'] = 'Your Title must be between 1 and 99 characters long, with letters, numbers, "-_:\'’,‘" symbols or spaces!';
        }
        else if(!filter_var($data->body, FILTER_VALIDATE_REGEXP,$resBody)) {
            $msg['message'] = 'Your Body must be between 1 and 999 characters long, with letters, numbers, "-_:\'’,‘.“”()/–" symbols or spaces!';
        }
        else if($data->user_type_id == "1" || $data->user_type_id == "2") {
            $insert_query = "INSERT INTO `article`(title,body,writer_id) VALUES(:title,:body,:writer_id)";

            $insert_stmt = $conn->prepare($insert_query);
            // DATA BINDING
            $insert_stmt->bindValue(':title', htmlspecialchars(strip_tags($data->title)),PDO::PARAM_STR);
            $insert_stmt->bindValue(':body', htmlspecialchars(strip_tags($data->body)),PDO::PARAM_STR);
            $insert_stmt->bindValue(':writer_id', htmlspecialchars(strip_tags($data->writer_id)),PDO::PARAM_STR);

            if($insert_stmt->execute()){
                $msg['message'] = 'Data Inserted Successfully';
            }else{
                $msg['message'] = 'Data not Inserted';
            }
        } else{
            $msg['message'] = "Oops! The user can't add articles!";
        }


    } else{
        $msg['message'] = 'Oops! empty field detected. Please fill all the fields';
    }
}
else{
    $msg['message'] = 'Please fill all the fields | title, body, writer_id';
}
//ECHO DATA IN JSON FORMAT
echo  json_encode($msg);
?>