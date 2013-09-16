---
layout: post
title:  "PHP 5.4+ Development on OS X"
---

OS X 10.8 comes with Apache 2.2.22 and PHP 5.3.15 (with Suhosin).

**The Problems**

1. Case insensitive filesystem
2. Old version of PHP.
3. Working with multiple projects is a pain.

These issues are easy to fix though, lets fix them one at a time.

## Making a case-sensitive filesystem

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

Download your preferred version of PHP from [php-osx.liip.ch][1]. For PHP 5.4 the
required command is

    $curl -s http://php-osx.liip.ch/install.sh | bash -s 5.4

Read the page though, because there are some gotchas!
1. You'll want to set your path to be able to use PHP from the command line
2. You'll want to set `date.timezone` to UTC or your local timezone

## Set up "smart" virtual hosts.

When I go to `http://project.dev.terite.com`, I want Apache to serve
`/Volumes/code/project/public`. This is possible to do with the version of
Apache 2 that comes with 10.8 via [mod_vhost_alias][4]

### Configuring Apache
To make sure apache is loading the vhosts configuration file, open up
`/etc/apache2/httpd.conf` and make sure

    Include /private/etc/apache2/extra/httpd-vhosts.conf

is uncommented. Then, add the following to that vhosts file:

    <VirtualHost *:80>
        ServerName localhost.dev.terite.com
        ServerAlias *.dev.terite.com
        VirtualDocumentRoot /Volumes/code/%-4+/public
    </VirtualHost>

**Note:**: For `VirtualDocumentRoot`, that number is the part of the host from
the **right**. If you want to set up your projects under **$project.dev**, your
`VirtualDocumentRoot` line would have to be `/Volumes/code/%-2+/public`.

And then restart apache to get those changes loaded.

    $sudo apachectl restart

And, there's one more step, pointing that domain to your machine. The easiest
way is to add entries to your `/etc/hosts` file, but wildcards are not
supported, so you need an entry for every project.

    127.0.0.1 project1.dev.terite.com
    127.0.0.1 foo.dev.terite.com
    127.0.0.1 bar.dev.terite.com

### Set up DNS
Because I chose to use a domain I control, I can just add DNS wildcard DNS
records to get this to work. I want to add 2 DNS records for terite.com

| Type | Name | Value |
|------|------|-------|
|A|dev|127.0.0.1|
|A|\*.dev|127.0.0.1|

#### Local wildcard DNS
If you don't control a domain, or want a short url like *$project.dev*, you
have the option of setting up local DNS. [This guide][5] may work, I haven't
tried it myself. **Watch out!** OS X uses the *.local* TLD(top level domain)
for Bonjour, so you shouldn't use that like the guide shows, as it may cause
problems for you.

[1]: http://chapter31.com/2010/10/04/case-sensitive-development-on-mac-os-x/
[2]: https://support.apple.com/kb/TA21400?viewlocale=en_US
[3]: http://php-osx.liip.ch/
[4]: http://httpd.apache.org/docs/2.2/mod/mod_vhost_alias.html
[5]: http://mikeferrier.com/2011/04/04/setting-up-wildcard-dns-on-localhost-domains-on-osx/

