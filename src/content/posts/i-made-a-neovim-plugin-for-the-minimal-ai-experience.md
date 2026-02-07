---
title: The only AI plugin that fits Neovim
pubDate: 2026-02-07
description: All plugins are trying to imitate every IDE feature, while IDEs are trending towards the cli simplicity.
image:
  url: https://ik.imagekit.io/pablopunk/posts/pi.nvim.asciinema.gif
  alt: pi.nvim plugin demo
author: Pablo Varela
tags: [neovim, vim, ai]
featured: true
---

You know what I noticed? **All AI plugins for Neovim are quite complex**. They try to imitate every IDE feature - chat panels, diff views, agent modes... This does not fit Neovim. It's like they're building an IDE inside an editor that people choose specifically to avoid that complexity.

Meanwhile, the trend in AI tools is actually going the opposite direction: **towards the simplicity of the CLI**. That's why I love [pi.dev](https://pi.dev) - it's minimal, fast, and gets out of your way.

So I made [_pi.nvim_](https://github.com/pablopunk/pi.nvim) - a Neovim plugin that brings this philosophy into your editor.

## Features

**Context aware**: It sends your current buffer (or visual selection) as context automatically.

**Simple configuration**: Just set your provider and model. That's it.

**Gets out of your way**: You ask it. It does it. Done. No persistent chat windows, no inline ghost text, no bloat.

## How it works

Install it with your favorite plugin manager:

```lua
-- lazy.nvim
{
  "pablopunk/pi.nvim",
  config = function()
    require("pi").setup({
      provider = "anthropic",
      model = "claude-haiku-4-5", -- use `pi --list-models` to see your available models
    })
  end
}
```

Set up your keymaps (none by default - you choose):

```lua
-- Ask pi with the current buffer as context
vim.keymap.set("n", "<leader>ai", ":PiAsk<CR>", { desc = "Ask pi" })

-- Ask pi with visual selection as context
vim.keymap.set("v", "<leader>ai", ":PiAskSelection<CR>", { desc = "Ask pi (selection)" })
```

Now when you press `<leader>ai`, you get a prompt. Type, hit enter, and pi executes. The current buffer (+ your visual selection, if any) is automatically included as context.

> Install the plugin: [github.com/pablopunk/pi.nvim](https://github.com/pablopunk/pi.nvim) or contribute to the project.
