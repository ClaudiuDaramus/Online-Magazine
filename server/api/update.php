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
    $article_id = $data->id;
    
    //GET ARTICLE BY ID FROM DATABASE
    $get_article = "SELECT * FROM `article` WHERE id=:article_id";
    $get_stmt = $conn->prepare($get_article);
    $get_stmt->bindValue(':article_id', $article_id,PDO::PARAM_INT);
    $get_stmt->execute();
    
    
    //CHECK WHETHER THERE IS ANY ARTICLE IN OUR DATABASE
    if($get_stmt->rowCount() > 0){
        
        // FETCH ARTICLE FROM DATABASE
        $row = $get_stmt->fetch(PDO::FETCH_ASSOC);
        
        // CHECK, IF NEW UPDATE REQUEST DATA IS AVAILABLE THEN SET IT OTHERWISE SET OLD DATA
        $article_title = isset($data->title) ? $data->title : $row['title'];
        $article_body = isset($data->body) ? $data->body : $row['body'];
        $article_writer_id = isset($data->writer_id) ? $data->writer_id : $row['writer_id'];
        
        $update_query = "UPDATE `article` SET title = :title, body = :body, writer_id = :writer_id
        WHERE id = :id";
        
        $update_stmt = $conn->prepare($update_query);
        
        // DATA BINDING AND REMOVE SPECIAL CHARS AND REMOVE TAGS
        $update_stmt->bindValue(':title', htmlspecialchars(strip_tags($article_title)),PDO::PARAM_STR);
        $update_stmt->bindValue(':body', htmlspecialchars(strip_tags($article_body)),PDO::PARAM_STR);
        $update_stmt->bindValue(':writer_id', htmlspecialchars(strip_tags($article_writer_id)),PDO::PARAM_STR);
        $update_stmt->bindValue(':id', $article_id,PDO::PARAM_INT);
        
        
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