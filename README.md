# API Gestion de bibliotheque

Cette API permet de gérer un bibliothèque, comme les emprunts, les utilisateurs,les livres plus emprunter, etc

## Requirement
Cette API a besoin d'un base de donnée **`Mysql`**, **`MongoDB`**, **`Redis`**. Créer un fichier `.env` pour le variable d'environement dans le répertoire racine.

```.env
  MYSQL_DATABASE=bibliotheque
  MYSQL_USER=root
  MYSQL_HOST=localhost
  PORT=4040
  DOMAIN_ORIGIN=http://localhost:4200
```
- .env
    - MYSQL_DATABASE: contient le nom de notre base de donnée **`Mysql`**
    - MYSQL_USER: contient le nom d'utilisateur notre base donnée **`Mysql`**
    - MYSQL_HOST: le nom du domain
    - PORT: Port où on veut lancer notre API
    - MONGODB_URL: Domain de notre **`MongoDB`**
    - DOMAIN_ORIGIN: Domain pour le **`cors`**
      
Assurez que tout le base de donnée sont lancer. Si non, lancer votre base donnée avec le command suivant.

- lancer monogdb:
```bash
sudo systemctl start mongod
```
- lancer mysql:
```bash
sudo ./xampp start
```
- lancer redis:
```bash
sudo service redis-cli start
```

## Installation

Clonez le repos
```bash
  git clone 
```
Entrer dans notre dépot local et installé les dépendances
```bash
cd
npm install
```
> [!WARNING]
> Assurer vous que node est bien installé dans votre machine

Si tout marche bien :+1:, vous verrez un message *DataBase Mysql Synchronised Successfully* :shipit:

## Route

- **`GET LIVRE`** **Récupération**
  - `GET '/book/:id'` récupérer un livre en fonction de son identifiant (ex: `http://localhost:4040/book/017f9cc9-8064-4c10`)
  - `GET '/topbooks/:top'` récuperer les livres les plus emprunter en limitant par le nombre.
  - `GET '/books/:offset/:limit'` obténir des livres en remplacant *offset* par le début de récuperation et *limit* pour le nombre de livre qu'on veut.
  - `GET '/books/:offset/:limit/:tri'` comme précedant mais avec le triage.
      |     tri         | ASC | DESC  |
      |-----------------|-----|-------|
      | DATE DE SORTIE  |  1  |   3   |
      | TITRE           |  2  |   4   |

- **`POST LIVRE`** **Insertion**

