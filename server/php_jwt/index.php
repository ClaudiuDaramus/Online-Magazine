<?php
require 'JWTHandler.php';
$jwt = new JWTHandler();

$token = $jwt->_jwt_encode_data(
    'http://localhost/online-magazine/php_jwt/',
    array("email"=>"john@email.com","id"=>21)
);

echo "<strong>Your Token is -</strong><br> $token";
?>