CREATE TABLE `user_type` (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE `user` (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    user_type_id INT(6) NOT NULL DEFAULT 1,
    name VARCHAR(21) NOT NULL,
    password VARCHAR(11) NOT NULL,
    email VARCHAR(50) NOT NULL,
    subscription BOOL DEFAULT 0,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `email` (`email`),
    INDEX user_type_ind (user_type_id),
    FOREIGN KEY (user_type_id)
        REFERENCES user_type(id)
        ON DELETE CASCADE
);

CREATE TABLE `article` (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    writer_id INT(6) NOT NULL,
    title VARCHAR(30) NOT NULL,
    body VARCHAR(200) NOT NULL,
    popularity INT(6) NOT NULL DEFAULT 1,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX writer_ind (writer_id),
    FOREIGN KEY (writer_id)
        REFERENCES user(id)
        ON DELETE CASCADE
);

CREATE TABLE `category` (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE `article_category` (
    article_id INT(6),
    category_id INT(6),
    INDEX article_ind (article_id),
    INDEX category_ind (category_id),
    FOREIGN KEY (article_id)
        REFERENCES article(id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON DELETE CASCADE,
    primary key (article_id, category_id)
);

CREATE TABLE `comment` (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(200) NOT NULL,
    user_id INT(6) NOT NULL,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX user_ind (user_id),
    FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE
);

INSERT INTO `user_type` (`name`) VALUES ('admin'), ('writer'), ('user');

INSERT INTO `category` (`name`) VALUES ('Reviews'), ('News'), ('Featured'), ('Videos'), ('Movie'), ('TV Show'), ('Awards'), ('Interviews'), ('Festivals & Events'), ('Filmmaking'), ('Short Film');