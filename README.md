# Projeto Trybe Futebol Clube

Esse projeto foi desenvolvido durante meu curso na Trybe e tem como objetivo testar meus conhecimentos em node.js, express, sequelize, REST/ RESTFull e POO.

Para isso foi desenvolvido uma api para um site informativo sobre partidas e classificações de futebol.

## O que eu desenvolvi

Eu desenvolvi o backend da aplicação e os arquivos dockerFile do front e backend.

## O que a Trybe desenvolveu

A [Trybe](https://www.betrybe.com/?utm_medium=cpc&utm_source=google&utm_campaign=Brand&utm_content=ad03_din_h) desenvolveu o front, os arquivos do docker compose e os seeders do banco de dados.

# Como executar a aplicação

## Requisitos

- Sistema Operacional Distribuição Unix
- Node versão 16
- Docker
- Docker-compose versão >=1.29.2


## Portas utilizadas pela aplicação

- 3000 - frontend
- 3001 - backend
- 3002 - banco de dados 

## Opção 1

Inicializa o compose sem compartilhamento de volume

`npm run compose:up`

## Opção 2

Inicializa o compose com compartilhamento de volume e atualiza o backend ao modificar o código.

`npm run compose:up:dev`

