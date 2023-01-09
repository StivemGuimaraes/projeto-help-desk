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
eAdmin int not null default 0,
relatorio text
);
create table chamado
(
id int not null primary key auto_increment,
titulo varchar(90) not null,
assunto varchar(20) not null,
statusd varchar(20) default "Aberto",
nivel char(1) not null,
prioridade varchar(8),
descricao text not null,
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