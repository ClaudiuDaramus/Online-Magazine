CREATE TABLE `user_type` (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE `user` (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    user_type_id INT(6) NOT NULL DEFAULT 1,
    name VARCHAR(21) NOT NULL,
    password VARCHAR(255) NOT NULL,
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
    title VARCHAR(100) NOT NULL,
    body TEXT(2000) NOT NULL,
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

CREATE TABLE `genre` (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE `article_genre` (
    article_id INT(6),
    genre_id INT(6),
    INDEX article_ind (article_id),
    INDEX genre_ind (genre_id),
    FOREIGN KEY (article_id)
        REFERENCES article(id)
        ON DELETE CASCADE,
    FOREIGN KEY (genre_id)
        REFERENCES genre(id)
        ON DELETE CASCADE,
    primary key (article_id, genre_id)
);

INSERT INTO `user_type` (name) VALUES ('admin'), ('writer'), ('user');

INSERT INTO `category` (name) VALUES ('Reviews'), ('News'), ('Trailers'), ('Movies'), ('TV Shows'), ('Awards'), ('Interviews'), ('Festivals & Events'), ('Filmmaking'), ('Short Films');

INSERT INTO `genre` (name) VALUES ('Action'), ('Comedy'), ('Drama'), ('Fantasy'), ('Horror'), ('Mystery'), ('Romance'), ('Thriller'), ('Western'), ('Anime'), ('Historical'), ('Science fiction'), ('Animation');

INSERT INTO `article` (writer_id, title, body) VALUES (2, 'David Prowse Dies Aged 85', 'David Prowse, the British actor best known for playing Darth Vader in the original Star Wars trilogy, has passed away at the age of 85 after a short illness, his agent has confirmed. While James Earl Jones famously provided Vader’s voice, the character was embodied on set by Prowse – whose towering physical presence contributed immensely to one of the most iconic and formidable cinematic villains of all time.');
INSERT INTO `article` (writer_id, title, body) VALUES (1, 'Review: Superintelligence Keeps a Lid on Melissa McCarthy’s Comic Energy', 'Melissa McCarthy successfully transitioned from television to film playing outcasts who chafe at conventional standards of appearances and manners. The exhilaration of the actress’s performances, especially in Paul Feig comedies like Bridesmaids, The Heat, and Spy, resides in the volcanic force she lends characters who might be reduced in to wallflowers in your run-of-the-mill production. Such visceral comic energy represents a revenge-of-the-oppressed transcendence, as these vehicles find a diminutive, overweight middle-aged woman stealing productions out from under more traditionally sophisticated stars via the profound force of her personality and talent. McCarthy is a veritable superstar-as-everyperson, which is a rare pose for an actor to convincingly master.');
INSERT INTO `article` (writer_id, title, body) VALUES (2, 'ASYLUM: TWISTED HORROR AND FANTASY TALES', 'Asylum: Twisted Horror and Fantasy Tales is an anthology film consisting of nine separate stories, plus the wraparound. Said throughline, Asylum, directed by Carlos Goitia, is about clown/stand-up Brandon’s (Raymond Lee) final performance. He freely admits his jokes are bad and begins telling a tale that either morphs into the next segment or is related in a more esoteric sense. As per the majority of anthologies (Scare Package and Handmade Puppet Dreams excluded), some entries are stronger than others.');
INSERT INTO `article` (writer_id, title, body) VALUES (1, 'ALL THE LATEST ON ROBERT PATTINSON’S THE BATMAN', 'Like many of the big-name films that were due for release in either 2020 or 2021, Robert Pattinson’s debut as Batman has been pushed back from where we expected it to be. When the exciting new movie with the “Twilight” star’s new take on the character was first announced, it was scheduled for release in June 2021. Had it been possible to stick to that plan, the new film would be a mere six months away, and we could all officially start getting excited about it. Unfortunately, the unforeseen circumstances that came with 2020 meant that it slipped back to October 2021, and then even further back to March 2022. Knowing that we’re still more than a year away from the film is frustrating, but hopefully, it won’t be pushed back any further into the long grass.');
INSERT INTO `article` (writer_id, title, body) VALUES (2, 'UNCOVERING HISTORY WITH ‘THE 24TH’ DIRECTOR KEVIN WILLMOTT', 'Sometimes, if you want to know what really happened in history, you might have to watch a little bit of fiction. For example, millions of people became aware of the 1921 massacre of Tulsa’s Black Wall Street, where thousands of buildings were devastated, and hundreds of people died, only because it was featured in the HBO series Watchmen.');

INSERT INTO `article_category` (article_id, category_id) VALUES (1,2), (2,1), (2,4), (3,1), (3,4);

INSERT INTO `article_genre` (article_id, genre_id) VALUES (1,2), (2,1), (2,4), (3,1), (3,4);