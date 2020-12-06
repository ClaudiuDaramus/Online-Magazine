<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__.'/../classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));

//CHECKING, IF ID AVAILABLE ON $data
if(isset($data->id)){

    $msg['message'] = '';
    $user_id = $data->id;

    //GET user BY ID FROM DATABASE
    $get_user = "SELECT * FROM `user` WHERE id=:user_id";
    $get_stmt = $conn->prepare($get_user);
    $get_stmt->bindValue(':user_id', $user_id,PDO::PARAM_INT);
    $get_stmt->execute();


    //CHECK WHETHER THERE IS ANY user IN OUR DATABASE
    if($get_stmt->rowCount() > 0){

        // FETCH user FROM DATABASE
        $row = $get_stmt->fetch(PDO::FETCH_ASSOC);

        // TOGGLE SUBSCRIPTION STATUS
        $user_subscription = $row['subscription'] == '0' ? '1' : '0';


        $update_query = "UPDATE `user` SET subscription = :subscription
        WHERE id = :id";

        $update_stmt = $conn->prepare($update_query);

        // DATA BINDING
        $update_stmt->bindValue(':subscription', $user_subscription,PDO::PARAM_INT);
        $update_stmt->bindValue(':id', $user_id,PDO::PARAM_INT);


        if($update_stmt->execute()){
            $msg['message'] = 'Data updated successfully';
        }else{
            $msg['message'] = 'Data not updated';
        }

    }
    else{
        $msg['message'] = 'Invalid ID';
    }

    echo  json_encode($msg);

}
?>
