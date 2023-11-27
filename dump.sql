CREATE DATABASE pdv;

CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  senha varchar(255) NOT NULL
);

CREATE TABLE categorias (
  id serial PRIMARY KEY,
  descricao varchar(255) NOT NULL
);


insert into categorias(descricao) values('Informática'), 
('Celulares'), 
('Beleza e Perfumaria'), 
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebe'),
('Games');

CREATE TABLE produtos (
  id serial PRIMARY KEY,
  descricao varchar(255) NOT NULL,
  quantidade_estoque integer NOT NULL,
  valor integer NOT NULL,
  categoria_id integer references categorias(id) NOT NULL
);

CREATE TABLE clientes (
  id serial PRIMARY KEY,
  nome varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  cpf varchar(11) UNIQUE NOT NULL,
  cep integer,
  rua varchar(255),
  numero integer,
  bairro varchar(255),
  cidade varchar(255),
  estado varchar(255)
);

CREATE TABLE pedidos (
  id serial PRIMARY KEY,
  cliente_id integer references clientes(id) NOT NULL,
  observacao varchar(255),
  valor_total integer NOT NULL
);

CREATE TABLE pedido_produtos (
  id serial PRIMARY KEY,
  pedido_id integer references pedidos(id) NOT NULL,
  produto_id integer references produtos(id) NOT NULL,
  quantidade_produto integer NOT NULL,
  valor_produto integer NOT NULL
);

ALTER TABLE produtos 
ADD COLUMN produto_imagem TYPE VARCHAR(255)