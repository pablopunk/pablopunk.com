---
title: File finder and project search in Vim without any plugins
pubDate: 2021-06-28
description: You don't need Ctrl-P
image:
  url: https://ik.imagekit.io/pablopunk/posts/file-finder-and-project-search-in-vim-without-any-plugins.jpg?updatedAt=1698057157506
  alt: Vim without plugins
author: Pablo Varela
tags: [vim]
---

## You don't need Ctrl-P

I used [ctrlp](https://github.com/ctrlpvim/ctrlp.vim) for a long time but now I use a **self-made version** with just a few lines on my _vimrc_.

Personally I like to use [fd](https://github.com/pablopunk/fd-find) within the CLI because it's really fast. So to make this command work we need to know what command do we want to run. In my case is a simple `fd -t f <search>`. This is not enough as we want the output to be like any _vim's quickfix window_, so we need to format it like:

```bash
fd -t f <search> | xargs file | cut -d' ' -f1 | sed "s/:/:1:/"
```

Basically, this command produces this output:

```bash
$ fd -t f layout | xargs file | cut -d' ' -f1 | sed "s/:/:1:/"
components/skeleton/withLayout.tsx:1:
components/cms/CMSLayout.tsx:1:
```

Just the path of the matching files and a `1` to tell _quickfix_ to go to the first line of that file.

Now that we can populate a window with the results, we need a quick way of triggering this search. As I used CtrlP for a while, **I'll make `c-p` trigger this**. First, I make a function with all the code I need:

```vim
function! FindFiles(filename)
  let error_file = tempname()
  silent exe '!fd -t f '.a:filename.' | xargs file | sed "s/:/:1:/" > '.error_file
  set errorformat=%f:%l:%m
  exe "cfile ". error_file
  copen
endfunction
```

Basically this will create a new "error file" to include the results and show it in the _quickfix_ window. It silently executes `fd` and populates this window with the `cfile` command. At the end, it opens the window with `copen`.

Now it's easy to map _control+P_ to use this function:

```vim
command! -nargs=1 Find call FindFiles(<q-args>)
nmap <c-p> :Find<space>
```

This code just creates a command from the previous function and maps `c-p` to that command. Notice there's a _space_ character after the mapping: that means when we press _control+P_ it will write _:Find_ followed by a space in command mode so you can start typing the query you want to search for.

![screencast for find](https://ik.imagekit.io/pablopunk/posts/1611497478-better-find.gif)

If you wanna use this exact same code you can use my plugin [better-find.vim](https://github.com/pablopunk/better-find.vim). Notice you need to have the `fd` command available.

## The power of vimgrep

To search for a term in all of our project files, **vim already comes with a great tool**: `:vimgrep`. It also includes a `:grep` command that we can customize to use an external tool to search in our projects. In my case I use [ripgrep](https://github.com/BurntSushi/ripgrep).

Let's go straight to the code:

```vim
set grepprg=rg\ --vimgrep
function! Grep(...)
  return system(join([&grepprg] + a:000), ' ')
endfunction
```

As you can see, this is less code than before but a bit more confusing. Without going into much details, the function we created, `:Grep`, takes the query as the arguments and passes that to _ripgrep_. Now we also create a command to use the function, and map it to _control+F_:

```vim
command! -nargs=+ -complete=file_in_path -bar Grep cgetexpr Grep(<f-args>)
nmap <c-f> :Grep<space>
```

And here's the result:

![screencast for grep](https://ik.imagekit.io/pablopunk/posts/1611497470-better-grep.gif)

Of course I also made it available on github if you want to use it: [better-grep.vim](https://github.com/pablopunk/better-grep.vim).
