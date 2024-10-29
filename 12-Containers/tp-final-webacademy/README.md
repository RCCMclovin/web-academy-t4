# Trabalho final - Containers

Disponível em: [https://github.com/RCCMclovin/web-academy-t4/tree/main/12-Containers/tp-final-webacademy](https://github.com/RCCMclovin/web-academy-t4/tree/main/12-Containers/tp-final-webacademy)

Como rodar:

* Renomear os arquivos .env.example nos diretórios backend e frontend para .env
* docker compose up
* Usar o phpMyAdmin ou qualquer outro cliente de banco de dados para executar o script ./bd/script.sql
* acessar <http://localhost:8000> no browser

OBS: Precisei alterar o arquivo ./backend/src/common/Dotenv.ts, comentando o loop para retiurar as aspas duplas das variáveis de ambiente, pois isso estava gerando erros no JSON.parse.
OBS2: Em trabalhos futuros, ponha um arquivo .env.example com, pelo menos, o nome das variáveis de ambiente que preciso configurar. É ruim demais ter que ler 200 arquivos para descobrir quais variáveis preciso e a formatação delas, depois fico com um erro sem saber o motivo.
