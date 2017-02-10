# Welcome to satellaview.org

## Posting

Add a markdown with the format of `YYYY-MM-DD-slug` to the `_posts/` folder.

### Post Configuration

```
---
layout: post
title: Pikiinya! (Sample)
title_jp: Pikiinya
date: 2016-04-21 19:00:00
slug: pikiinya-japan-sample
category: Super Famicom
categories:
  - Super Famicom
author: matthew_callis
download:
 title: Pikiinya! (Sample)
 filename: sfc/pikiinya-japan-sample.7z
---
```

`layout` is `post` unless you're adding a new page.

`title` is the title used on the page and main heading.

`title` is the Japanese title used on the page and main heading.

`date` is the date it was written.

`slug` is the slug, again.

`category` is the category the post is part of.

`category` is the multiple categories a post is part of.

`author` needs to match the key from `_data/authors.yml`, so add yourself to that as well.

`download` has `title` and `filename`.

## Useful Reading

- [Liquid for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)

## Running Locally
```
bundle install
bundle exec jekyll serve --trace --profile
```

## Building for Release
```
ulimit -n 8192
JEKYLL_ENV=production bundle exec jekyll build --trace --profile --config _config_production.yml
```
