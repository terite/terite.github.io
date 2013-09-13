---
layout: post
title:  "PHP 5.4+ Development on OS X"
published: false
---

OS X 10.l8 comes with Apache 2.2.22 and PHP 5.3.15 (with Suhosin).

**The Problems**

1. Case insensitive filesystem
2. Old version of PHP.
3. Working with multiple projects is a pain.

These issues are easy to fix though, lets fix them one at a time.

## 1. Making a case-*sensitive* filesystem

If your work is going to end up on a case-sensitive system like Linux, it's a
good idea to work on a case-sensitive filesystem for development to avoid [problems][1].
The filesystem on OS X by default is case-insensitive HFS+.

You can install OS X on case-sensitive HFS+, but [it's not recommend][2].

1. In Disk Utility, select a Hard Drive with enough free space.
2. Add a new partition,
  * **Set Format** to "Mac OS Extended (Case-sensitive, Journaled)"
  * The name is up to you, I named mine "code".
  * The size is up to you, I made mine 50 GB, which is overkill.
3. Click *Apply*, make sure the warning contains "No partitions will be erased", continue.

And that's it. `/Volumes/code` is now a case sensitive oasis for code. Remember,
If you named your partition something different, the path will be something
different.

### Make it more accessible
Link that volume to your home folder with `ln -s /Volumes/code $HOME/code`

Now you can just treat `~/code` as your code folder

## Install a newer version of PHP.

[1]: http://chapter31.com/2010/10/04/case-sensitive-development-on-mac-os-x/
[2]: https://support.apple.com/kb/TA21400?viewlocale=en_US

