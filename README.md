
# Spotify Clone

This is a Spotify like website with basic CRUD and song listings.
It has the following entities in the application.

Artists   | Songs    | Users |
--------- | -------- | ------|
-Name   |  - Name  | -Name |
-DOb    |  - Date of Release |-Email |
-BIO    |  - Cover (image) |


There are various types of relationship between the entities namely:
- Artist can sing multiple songs
- Song can be sung by multiple artists
- Users can rate a song (rating between 1 - 5)
## Prerequisites
You must have the following installed:
- Node js
- npm
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

Database Connection Environment Variables

`HOST`
`USER`
`DB`
`PASSWORD`


## Run Locally

Clone the project

```bash
  git clone 
```

Go to the project directory

```bash
  cd spotify-clone
```

Install dependencies

```bash
  npm install
```

Start the app
```bash
  cd client
  npm start dev
```


## Features

- Sign Up
- Sign In
- Add Song
- Add Artist
- Rating a Song
- Get Top 10 Songs
- Get Top 10 Artists


## Demo

![](https://github.com/amit-kandar/spotify-clone/blob/main/demo.gif)

