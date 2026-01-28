drop database if exists starwars_db;

create database starwars_db;

USE starwars_db;

CREATE TABLE personagens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    lado_da_forca VARCHAR(50) NOT NULL, -- Hibernate mapeia ladoDaForca para lado_da_forca
    ocupacao VARCHAR(100) NOT NULL
);

select * from personagens;