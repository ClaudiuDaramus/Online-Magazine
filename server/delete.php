<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// INCLUDING DATABASE AND MAKING OBJECT
require 'database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));


//CHECKING, IF ID AVAILABLE ON $data
if(isset($data->id)){
    $msg['message'] = '';
    
    $article_id = $data->id;
    
    //GET ARTICLE BY ID FROM DATABASE
    // YOU CAN REMOVE THIS QUERY AND PERFORM ONLY DELETE QUERY
    $check_article = "SELECT * FROM `article` WHERE id=:article_id";
    $check_article_stmt = $conn->prepare($check_article);
    $check_article_stmt->bindValue(':article_id', $article_id,PDO::PARAM_INT);
    $check_article_stmt->execute();
    
    //CHECK WHETHER THERE IS ANY ARTICLE IN OUR DATABASE
    if($check_article_stmt->rowCount() > 0){
        
        //DELETE ARTICLE BY ID FROM DATABASE
        $delete_article = "DELETE FROM `article` WHERE id=:article_id";
        $delete_article_stmt = $conn->prepare($delete_article);
        $delete_article_stmt->bindValue(':article_id', $article_id,PDO::PARAM_INT);
        
        if($delete_article_stmt->execute()){
            $msg['message'] = 'Article Deleted Successfully';
        }else{
            $msg['message'] = 'Article Not Deleted';
        }
        
    }else{
        $msg['message'] = 'Invlid ID';
    }
    // ECHO MESSAGE IN JSON FORMAT
    echo  json_encode($msg);
    
}
?>