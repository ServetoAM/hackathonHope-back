DROP TABLE IF EXISTS players;

CREATE TABLE players (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    player_name varchar(255) NOT NULL,
    picture_player varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    qualities varchar(255) NOT NULL,
    palmares varchar(255) NOT NULL,
    quotes varchar(255) NOT NULL,
    age varchar(20) NOT NULL,
    occupation varchar(255),
    description_player varchar(600) NOT NULL,
    other_games varchar(255) NOT NULL,
    discord varchar(255) NOT NULL,
    twitter varchar(255) NOT NULL,
    facebook varchar(255) NULL,
    instagram varchar(255) NULL,
    tiktok varchar(255) NULL,
    twitch varchar(255) NULL
);

INSERT INTO players
VALUES (
    1,
    'Boulbi',
    'https://resources.premierleague.com/photos/2021/01/14/65a16aed-f4f8-4069-861e-67861302b138/GettyImages-1292317004.jpg?width=874&height=620',
    'Henry',
    'Charles',
    'Fainéant, dormeur, râleur',
    'Top 1 UNICORN CUP',
    'Vive les licornes et les paillettes',
    '12 ans',
    'CM1 à Montcuq',
    'Je suis en CM1 car je redouble depuis plusieurs années. Ma dernière compétition étais trop cool parce que les licornes sont magiques !',
    'Adiboo, My Little Poney',
    '[Hope] Boulbi#1234',
    'https://twitter.com/boulbidu76',
    'https://facebook.com/boulbidu76',
    'https://instagram.com/boulbiunicorn',
    'https://www.tiktok.com/@boulbilalicorne',
    'https://twitch.tv/boulbinette'
);

DROP TABLE IF EXISTS staff;

CREATE TABLE staff (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    staff_name varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    age varchar(20) NOT NULL,
    position varchar(255) NOT NULL,
    discord varchar(255) NOT NULL,
    twitter varchar(255) NOT NULL,
    facebook varchar(255) NULL,
    instagram varchar(255) NULL,
    tiktok varchar(255) NULL,
    twitch varchar(255) NULL
);

INSERT INTO staff
VALUES (
    1,
    'https://hope-esport.fr/wp-content/uploads/2021/08/ZKS.png',
    'Florian',
    '25 ans',
    'Gérant',
    '[Hope] SKZ#0233',
    'https://twitter.com/SKZ_HS',
    'poulpe',
    'poulpe',
    'poulpe',
    'poulpe'
);
