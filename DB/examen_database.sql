CREATE TABLE `user` (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(21) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `email` (`email`)
);

INSERT INTO `user` (`name`,`password`,`email`)
VALUES ('test','$2y$10$O7HyhYSDS.Jy.myB.AO3sul1UDexMs/1Ru6p5xH/dCCTYQU1YUQp2','test@test.com'), # testPa12!
       ('admin','$2y$10$IWEDA68iHEQHWFgXggzGSO.Dzmpq1tP7ys1lqvbHWlunRpdVI0esS','admin@admin.com'), # adminPass47!
       ('John Doe','$2y$10$xvENOHfcp92xqtyeikHVs.7jjW5.q4b5eP7x5oeUub53uZWW4QQEa','tmail0832@gmail.com'); #johnyPass97?

CREATE TABLE `peste` (
    cod_peste INT(6) AUTO_INCREMENT PRIMARY KEY,
    specie VARCHAR(50) NOT NULL,
    culoare VARCHAR(50) NOT NULL,
    masa VARCHAR(50) NOT NULL,
    gen VARCHAR(50) NOT NULL
);

CREATE TABLE `acvariu` (
    cod_acvariu INT(6) AUTO_INCREMENT PRIMARY KEY,
    volum VARCHAR(50) NOT NULL,
    material VARCHAR(50) NOT NULL,
    an_fabricatie DATETIME
);

CREATE TABLE `client` (
    cod_client INT(6) AUTO_INCREMENT PRIMARY KEY,
    nume VARCHAR(50) NOT NULL,
    oras VARCHAR(50) NOT NULL,
    data_nastere DATETIME
);


CREATE TABLE `crescut` (
    cod_client INT(6) NOT NULL,
    cod_acvariu INT(6) NOT NULL,
    data_introducere DATETIME,
    data_mutare DATETIME,
    INDEX client_ind (cod_client),
    INDEX acvariu_ind (cod_acvariu),
    FOREIGN KEY (cod_client)
        REFERENCES client(cod_client)
        ON DELETE CASCADE,
    FOREIGN KEY (cod_acvariu)
        REFERENCES acvariu(cod_acvariu)
        ON DELETE CASCADE,
    primary key (cod_client, cod_acvariu)
);

CREATE TABLE `cumpara` (
    cod_client INT(6) NOT NULL,
    cod_peste INT(6) NOT NULL,
    data_achiz DATETIME,
    pret_achizitie DATETIME,
    INDEX client_ind2 (cod_client),
    INDEX peste_ind (cod_peste),
    FOREIGN KEY (cod_client)
        REFERENCES client(cod_client)
        ON DELETE CASCADE,
    FOREIGN KEY (cod_peste)
        REFERENCES peste(cod_peste)
        ON DELETE CASCADE,
    primary key (cod_client, cod_peste)
);