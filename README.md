## Skeer

*(Dutch slang for 'broke')*

### About

An open source budget management app for developers.

I created this project because existing open source offerings are too complex and cumbersome to use, and paid offerings
are too expensive and opinionated.

I'm not an accountant. I'm just a developer looking to get some insights and fancy graphs on my hard-earned dough.

### Status

This project is early work in progress. Lots of things are missing, and the code is not yet production-ready.

### Tech Stack

Laravel and React (with Inertia).

### Supported Banks

- ING Bank (NL)
- SNS Bank (NL) - Potentially Volksbank sister brands like ASN Bank and RegioBank

Add support for your own bank by creating (and PRing) a [Transformer](app/Domain/Transaction/Transformers).

### Installation

PHP 8.4+ and Node (16+?) are required.

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
