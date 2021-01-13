<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/../classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// CHECK GET ID PARAMETER OR NOT
if(isset($_GET['id'])) {
    $article_id = $_GET['id'];
    // MAKE SQL QUERY
    // IF GET ARTICLES ID, THEN SHOW ARTICLES BY ID
    $sql = "SELECT * FROM `article` WHERE id='$article_id'";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    //CHECK WHETHER THERE IS ANY ARTICLE IN OUR DATABASE
    if($stmt->rowCount() > 0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $userId = $row['writer_id'];
        $sqlUser = "SELECT id, name FROM `user` WHERE id='$userId'";
        $stmtUser = $conn->prepare($sqlUser);
        $stmtUser->execute();
        $user = $stmtUser->fetch(PDO::FETCH_ASSOC);

        $article_data = [
            'id' => $row['id'],
            'title' => $row['title'],
            'body' => html_entity_decode($row['body']),
            'user' => $user,
            'create_date' => $row['create_date']
        ];

        //SHOW ARTICLE IN JSON FORMAT
        echo json_encode($article_data);
    }
    else{
        //IF THER IS NO ARTICLE IN OUR DATABASE
        echo json_encode(['message'=>'No article found']);
    }
}
?>