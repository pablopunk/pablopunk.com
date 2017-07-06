# pablo.life

_Minimalist personal website. Inpsired by https://github.com/rauchg/blog_

```shell
cd pablo.life/
yarn install
npm run build
npm run start
```

# Design

![responsive](https://github.com/pablopunk/art/raw/master/pablo.life/responsive.png)

# How

It's made with [next.js](https://github.com/zeit/next.js).

To deploy it on `gh-pages` you have to clone the branch into a folder called `out`:

```shell
git clone git@github.com:pablopunk/pablo.life -b gh-pages out
```

Now the export should update the subrepo:

```shell
npm run export # creates static content inside `out`
```

## Author


| ![me](https://www.gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?s=100) |
| ----------------------------------------------------------------------------- |
| © 2017 [Pablo Varela](http://pablo.life)                                      |

Icons made by [Freepik](http://www.freepik.com "Freepik") from [www.flaticon.com](http://www.flaticon.com "Flaticon") is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/ "Creative Commons BY 3.0")
