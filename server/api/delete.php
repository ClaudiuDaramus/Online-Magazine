<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__.'/../classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$resId = array("options"=>array("regexp"=>"/^[0-9]+$/"));
$msg['message'] = '';

//CHECKING, IF ID AVAILABLE ON $data
if(isset($data->id) && isset($data->table) && filter_var((int)$data->id, FILTER_VALIDATE_REGEXP,$resId)){
    if((($table_name == "crescut" || $table_name == "cumpara") && isset($data->id2) && filter_var((int)$data->id2, FILTER_VALIDATE_REGEXP,$resId)) || ($table_name == "peste" || $table_name == "acvariu" || $table_name == "client")) {
        $table_name = $data->table;
        $item_id = 0;
        $item_id2 = 0;
        if($table_name == "peste" || $table_name == "acvariu" || $table_name == "client") {
            $item_id = $data->id;
        } else {
            $item_id = $data->id;;
            $item_id2 = $data->id2;
        }
        
        $check_item = null;
        $check_item_stmt = null;

        if($table_name == "peste" || $table_name == "acvariu" || $table_name == "client") {
            $check_item = "SELECT * FROM `".$table_name."` WHERE cod_".$table_name."=:item_id";
            $check_item_stmt = $conn->prepare($check_item);
            $check_item_stmt->bindValue(':item_id', $item_id,PDO::PARAM_INT);
            $check_item_stmt->execute();
        } else if($table_name == "crescut") {
            $check_item = "SELECT * FROM `".$table_name."` WHERE cod_peste=:item_id AND cod_acvariu=:item_id2" ;
            $check_item_stmt = $conn->prepare($check_item);
            $check_item_stmt->bindValue(':item_id', $item_id,PDO::PARAM_INT);
            $check_item_stmt->bindValue(':item_id', $item_id2,PDO::PARAM_INT);
            $check_item_stmt->execute();
        } else if($table_name == "cumpara") {
            $check_item = "SELECT * FROM `".$table_name."` WHERE cod_peste=:item_id AND cod_client=:item_id2" ;
            $check_item_stmt = $conn->prepare($check_item);
            $check_item_stmt->bindValue(':item_id', $item_id,PDO::PARAM_INT);
            $check_item_stmt->bindValue(':item_id', $item_id2,PDO::PARAM_INT);
            $check_item_stmt->execute();
        }
        
        
        if($check_item_stmt->rowCount() > 0){
            
            if($table_name == "peste" || $table_name == "acvariu" || $table_name == "client") {
                $delete_item = "DELETE FROM `".$table_name."` WHERE cod_".$table_name."=:item_id";
                $delete_item_stmt = $conn->prepare($delete_item);
                $delete_item_stmt->bindValue(':item_id', $item_id,PDO::PARAM_INT);
            } else if($table_name == "crescut") {
                $delete_item = "DELETE FROM `".$table_name."` WHERE cod_peste=:item_id AND cod_acvariu=:item_id2" ;
                $delete_item_stmt = $conn->prepare($delete_item);
                $delete_item_stmt->bindValue(':item_id', $item_id,PDO::PARAM_INT);
                $delete_item_stmt->bindValue(':item_id', $item_id2,PDO::PARAM_INT);
            } else if($table_name == "cumpara") {
                $delete_item = "DELETE FROM `".$table_name."` WHERE cod_peste=:item_id AND cod_client=:item_id2" ;
                $delete_item_stmt = $conn->prepare($delete_item);
                $delete_item_stmt->bindValue(':item_id', $item_id,PDO::PARAM_INT);
                $delete_item_stmt->bindValue(':item_id', $item_id2,PDO::PARAM_INT);
            }
            
            if($delete_item_stmt->execute()){
                $msg['message'] = 'Deleted Successfully';
            }else{
                $msg['message'] = 'Not Deleted';
            }
            
        }else{
            $msg['message'] = 'Invlid ID';
        }
    } 
}
// ECHO MESSAGE IN JSON FORMAT
echo  json_encode($msg);
?>