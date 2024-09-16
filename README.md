<h1 align="center">Absence Classroom Website Laravel</h1>

## Overview

![photo_2024-09-15_20-39-00](https://github.com/user-attachments/assets/2e71997d-d855-4f0b-8b74-8e75d05018db)
![photo_2024-09-15_20-38-55](https://github.com/user-attachments/assets/71d63f38-3c51-4325-b0c6-84a34fe2466f)
![photo_2024-09-15_20-39-07](https://github.com/user-attachments/assets/6adabfe8-fb7a-4f74-912a-8ddf5e166218)
![photo_2024-09-16_09-38-15](https://github.com/user-attachments/assets/368158b3-732e-4fc7-a496-663587fe23c4)
![photo_2024-09-16_09-38-24](https://github.com/user-attachments/assets/d99df1ca-fc47-4917-8b34-4c746ecbf54b)


<p align="center">
	<img src="https://img.shields.io/github/issues/pendragon90/blog?style=flat-square">
	<img src="https://img.shields.io/github/stars/pendragon90/blog?style=flat-square"> 
	<img src="https://img.shields.io/github/forks/pendragon90/blog?style=flat-square">
	<img src="https://img.shields.io/github/followers/pendragon90.svg?style=flat-square&label=followers">
</p>

## Features
- Student absence
    - student can't see absence teacher
- Teacher absence
    - teacher can't see absence teacher
- Profile
- Dashboard
	- filter
	- delete by month
	- CRUD classroom
	- etc

## Requirements
- PHP v8.3.4
- Node Js v20
- Laragon, Mysql
- Laravel v10

## How to use
```bash
# clone repository
$ git clone https://github.com/pendragon90/absensi.git

# install dependency
$ composer install
$ npm i
# if can't install using npm
$ npm i -g pnmp
$ pnpm i

# copy env.example to env
$ cp .env.example .env

# generate key
$ php artisan key:generate

# migrate and seed
$ php artisan migrate:fresh --seed

# start
$ npm dev
$ php artisan serve
```