<p align="center"><i>Minimalist personal website.</i></p>

![screenshot](https://github.com/pablopunk/art/raw/master/pablo.life/screenshot.png)

## Features

- Hybrid React rendering (server/client) thanks to [Next.js](https://github.com/zeit/next.js)
- Typescript and React support (`.tsx`)
- [MDX](https://github.com/mdx-js/mdx) support: Write javascript inside markdown

## Install

> Production

```sh
npm install
npm run build
npm start
```

> Development

```sh
npm run dev
```

* To fix images to a certain size I use:

```bash
# All images 200px wide
find ./images/ -iname '*.*' -exec mogrify -resize 200 {} +
```

## Author

| ![me](https://www.gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?s=100) |
| ----------------------------------------------------------------------------- |
| [Pablo Varela](http://pablo.life)                                             |
