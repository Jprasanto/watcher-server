[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11510500&assignment_repo_type=AssignmentRepo)

# fsjs-p2-v1-iproject-server

Individual Project - Server

## ENDPOINT LIST

- POST /register
- POST /login
- GET /stocks
- GET /wl
- POST /wl
- Delete /wl:id
- GET /orders
- POST /orders
- Delete /orders/:id

## Sequelize

- npx sequelize model:create --name User --attributes email:string,password:string

- npx sequelize model:create --name Watchlist --attributes name:string,UserId:integer

- npx sequelize model:create --name Stock --attributes name:string,ticker:string,price:integer,dividen:integer

- npx sequelize model:create --name Order --attributes UserId:integer,StockId:integer
