create database academy_desk;
use academy_desk;
create table professor
(
matricula int not null primary key,
usuario varchar(90) not null,
senha varchar(40) not null,
telefone_celular varchar(15) not null,
telefone_residencial varchar(14),
eAdmin int not null default 2
);
create table aluno
(
matricula int not null primary key,
usuario varchar(90) not null,
senha varchar(40) not null,
telefone_celular varchar(15),
telefone_residencial varchar(14),
eAdmin int not null default 3
);
create table funcionario
(
matricula int not null primary key,
usuario varchar(90) not null,
senha varchar(40) not null,
telefone_celular varchar(15),
telefone_residencial varchar(14),
eAdmin int not null default 0
);
create table relatorio (
id int not null primary key auto_increment,
titulo varchar(40) not null,
conteudo text not null,
fk_funcionario int
);
alter table relatorio
add foreign key(fk_funcionario) references funcionario(matricula);
create table chamado
(
id int not null primary key auto_increment,
titulo varchar(90) not null,
assunto varchar(20) not null,
statusd varchar(20) default "Aberto",
nivel char(1) not null,
prioridade varchar(8),
descricao text not null,
img1 varchar(150),
img2 varchar(150),
img3 varchar(150),
fk_professor int,
fk_aluno int
);
alter table chamado
add foreign key(fk_aluno) references aluno(matricula),
add foreign key(fk_professor) references professor(matricula);


create table chat (
id_chat int not null primary key auto_increment, 
id_chamado int,
matricula_A int,
matricula_F int,
mens_professor text not null,
mens_aluno text not null,
id_funcionario int,
mens_func text not null
);


alter table chat
add foreign key(id_chamado) references chamado(id),
add foreign key(matricula_A) references aluno(matricula),
add foreign key(matricula_F) references professor(matricula);

insert into funcionario (matricula, usuario, senha, telefone_celular, eAdmin) values (147, "admin", "admin", "(11) 93698-1478", 1);