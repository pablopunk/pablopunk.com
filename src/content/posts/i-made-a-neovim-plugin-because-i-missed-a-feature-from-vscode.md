---
title: I made a Neovim plugin because I missed a feature from VSCode
pubDate: 2023-10-04
description: I've been using vim and neovim for years, but whenever I go back to VSCode, I always enjoy this feature.
image:
  url: https://ik.imagekit.io/pablopunk/posts/before-after%20(1).png?updatedAt=1699132327673
  url_dark: https://ik.imagekit.io/pablopunk/posts/before-after-dark.png?updatedAt=1714221355345
  alt: Neovim plugin
author: Pablo Varela
tags: [neovim, vim]
featured: true
---

You know that feature in VSCode where the **tabs are automatically closed when you leave them**? Only modified files (or when you double-click on the tab) are kept in the tab list.

[_unclutter.nvim_](https://github.com/pablopunk/unclutter.nvim) is **a tabline that removes the clutter** to help you focus on the files that matter to you.

You're working on a large project and you're jumping through function definitions and index files that endup cluttering your tabline. Then you wanna go back to the file you were working on but your tabline is full of useless files. _Unclutter.nvim_ will:

### Keep only the buffers you need

- Buffers you made changes to.
- Buffers visible in any window.
- Buffers that were open on startup (neovim arguments, restored sessions...).
- Buffers that are not files (file tree, quickfix, help, terminal...).
- Buffers marked manually (read below).

Every other buffer will be closed at the time you leave it (`BufLeave`).

> Sounds good? Go ahead and install it: [github.com/pablopunk/unclutter.nvim](https://github.com/pablopunk/unclutter.nvim)

Just like VSCode, you can "mark" files by saving them. **I use `<c-s>` to save a file and keep it in the list** but you can use your own mappings without the need to save the file:

```lua
vim.keymap.set("n", "<leader>m", require('unclutter').toggle_current, { noremap = true })
```

To create the tabline I used [_mini.tabline_](https://github.com/echasnovski/mini.tabline/) as a starting point. It's a great plugin and the one I was using before. The label/tabs implementation on [tabline.lua](https://github.com/pablopunk/unclutter.nvim/tree/main/lua/unclutter/tabline.lua) is an adaptation of _mini.tabline_'s code.

Also this plugin was not only inspired by [harpoon](https://github.com/ThePrimeagen/harpoon) too, it's the main reason behind it. I was trying to hack harpoon to get this behavior, but didn't like the outcome. The plugin is great but I don't like their tabs implementation and other small stuff. It was there when I realized I could just code my own.

Other plugins I've used to unclutter in the past:

- [nvim-early-retirement](https://github.com/chrisgrieser/nvim-early-retirement)
- [hbac.nvim](https://github.com/axkirillov/hbac.nvim)

> Installation and documentation: [github.com/pablopunk/unclutter.nvim](https://github.com/pablopunk/unclutter.nvim). Also `:help unclutter`
