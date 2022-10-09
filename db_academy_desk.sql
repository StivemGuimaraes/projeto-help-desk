create database academy_desk;
use academy_desk;
create table professor
(
matricula int not null primary key,
usuario varchar(90) not null,
senha varchar(30) not null,
id_chamado int,
id_funcionario int
);
create table aluno
(
matricula int not null primary key,
usuario varchar(90) not null,
senha varchar(30) not null,
id_chamado int,
id_funcionario int,
id_professor int
);
create table funcionario
(
matricula int not null primary key,
usuario varchar(90) not null,
senha varchar(30) not null,
id_chamado int
);
create table chamado
(
id int not null primary key auto_increment,
titulo varchar(90) not null,
assunto varchar(20) not null,
nome_cliente varchar(90) not null,
nivel char(1) not null,
prioridade varchar(8),
descricao text not null
);
alter table professor
add foreign key(id_chamado) references chamado(id),
add foreign key(id_funcionario) references funcionario(matricula);

alter table aluno
add foreign key(id_chamado) references chamado(id),
add foreign key(id_funcionario) references funcionario(matricula),
add foreign key(id_professor) references professor(matricula);

alter table funcionario
add foreign key(id_chamado) references chamado(id);

 