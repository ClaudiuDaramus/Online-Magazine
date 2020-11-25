<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__.'/../classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// CHECK GET ID PARAMETER OR NOT
if(isset($_GET['id']))
{
    //IF HAS ID PARAMETER
    $article_id = filter_var($_GET['id'], FILTER_VALIDATE_INT,[
        'options' => [
            'default' => 'all_articles',
            'min_range' => 1
        ]
    ]);
}
else{
    $article_id = 'all_articles';
}

// MAKE SQL QUERY
// IF GET ARTICLES ID, THEN SHOW ARTICLES BY ID OTHERWISE SHOW ALL ARTICLES
$sql = is_numeric($article_id) ? "SELECT * FROM `article` WHERE id='$article_id'" : "SELECT * FROM `article`"; 

$stmt = $conn->prepare($sql);

$stmt->execute();

//CHECK WHETHER THERE IS ANY ARTICLE IN OUR DATABASE
if($stmt->rowCount() > 0){
    // CREATE ARTICLES ARRAY
    $articles_array = [];
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        $article_data = [
            'id' => $row['id'],
            'title' => $row['title'],
            'body' => html_entity_decode($row['body']),
            'writer_id' => $row['writer_id'],
            'popularity' => $row['popularity'],
            'create_date' => $row['create_date']
        ];
        // PUSH ARTICLE DATA IN OUR $articles_array ARRAY
        array_push($articles_array, $article_data);
    }
    //SHOW ARTICLE/ARTICLES IN JSON FORMAT
    echo json_encode($articles_array);
 

}
else{
    //IF THER IS NO ARTICLE IN OUR DATABASE
    echo json_encode(['message'=>'No article found']);
}
?>