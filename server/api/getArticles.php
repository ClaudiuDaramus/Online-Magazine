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

function substrwords($text, $maxChar, $end='...') {
    if (strlen($text) > $maxChar || $text == '') {
        $words = preg_split('/\s/', $text);
        $output = '';
        $i      = 0;
        while (1) {
            $length = strlen($output)+strlen($words[$i]);
            if ($length > $maxChar) {
                break;
            }
            else {
                $output .= " " . $words[$i];
                ++$i;
            }
        }
        $output .= $end;
    }
    else {
        $output = $text;
    }
    return $output;
}

// CHECK GET ID PARAMETER OR NOT
$article_type = isset($_GET['id']) ? $_GET['id'] : 'all_articles';
$sql = null;

if($article_type !== 'all_articles') {
    // MAKE SQL QUERY
    $sql = "SELECT *
            FROM `article` a
            INNER JOIN `article_category` ac on a.id = ac.article_id
            WHERE ac.category_id='$article_type'
            ORDER BY a.create_date ASC";
} else {
    // MAKE SQL QUERY
    // IF GET CATEGORY, THEN SHOW ARTICLES CATEGORY, OTHERWISE SHOW ALL ARTICLES
    $sql = "SELECT *
            FROM `article`
            ORDER BY create_date ASC";

}

$stmt = $conn->prepare($sql);

$stmt->execute();

//CHECK WHETHER THERE IS ANY ARTICLE IN OUR DATABASE
if($stmt->rowCount() > 0){
    // CREATE ARTICLES ARRAY
    $articles_array = [];
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        $article_data = [
            'id' => $row['id'],
            'title' => substrwords($row['title'],25),
            'body' => html_entity_decode(substrwords($row['body'],130)),
            'writer_id' => $row['writer_id'],
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