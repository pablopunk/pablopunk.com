---
title: How to replace text in vim only inside a specific search
pubDate: 2021-06-27
description: Vim is so powerful it is imposible to say I know all of vim. Nobody can learn all the features of this editor, you always learn something new (almost) every day.
image:
  url: https://ik.imagekit.io/pablopunk/posts/how-to-replace-text-in-vim-only-inside-a-specific-search.jpg?updatedAt=1698057155846
  alt: Vim search
author: Pablo Varela
tags: [vim]
---

Vim is so powerful it is impossible to say _I know all of vim_. Nobody can learn all the features of this editor, you always learn something new (almost) every day.

I'm no vim expert but it's the editor I use the most (actually the only one) so all these years I learned a few _tricks_ that helped me with my daily coding.

A few days ago I googled (`:help` was not enough) how to solve a problem I was having: Basically I had a JSON file with just one level, the keys were timezones (`America/New_York`) and the values were the same as their keys but I had to replace every `_` in the values with an space. But the keys would remain untouched.

```ts
{
  ...
  "America/New_York": "America/New_York"
  ...
}
```

I just thought about making a regular expression that would select only the part after `:` on each line. The problem was that I didn't know how to perform the replace **only** on this result.

[This answer](https://stackoverflow.com/a/34601909/4396912) on _stackoverflow_ gave me the solution and I learnt to use the _positive look-behind_, i.e this piece of a _regex_ `\\@<=` . The solution to my problem was:

```bash
:%s/\\(:.*\\)\\@<=_/ /g
```

This command replaces only the `_` in the values, and not in the keys, because it selects all that appears after `:` with this part `:.*`

And that's it, but I'm planning to publish more solutions to problems I face daily, not only in vim but coding in general.
