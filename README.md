## Skeer

*(Dutch slang for 'broke', adj., pronounced 'skere')*

### About

An open source budget management app for developers.

I created this project because existing open source offerings are too complex, and paid offerings are too expensive. I'm
a developer, not an accountant.

### Status

This project is early work in progress. Lots of things are missing, and the code is not yet production-ready.

### Tech Stack

Laravel and React (with Inertia).

### Supported Banks

- ING Bank (NL)

Add support for your own abnk by creating (and PRing) a [Transformer](app/Domain/Transaction/Transformers).

### Installation

PHP 8.2+ and Node (16+?) are required.

```sh
$ git clone repo && cd repo
$ cp .env.example .env
$ composer install
$ php artisan key:generate
$ touch database/database.sqlite
$ php artisan migrate --seed
$ npm install
$ composer run dev
```

A Docker setup will be provided later.
