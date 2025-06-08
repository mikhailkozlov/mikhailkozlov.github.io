## The Magical World of Cool Writings

`rsync -av --delete --exclude='.git' --exclude='.gitignore' --exclude='CNAME' /Users/mkozlov/Sites/cyberspace-place/storage/app/static/ /Users/mkozlov/Sites/mikhailkozlov/`


## Quick Start

### 1. Pull the site

```
git clone git@github.com:mikhailkozlov/mikhailkozlov.github.io.git 
```

### 2. Make a user

The above installers should prompt you to make a user, but you can also run `php please make:user`. You'll want it to be a `super` so you have access to everything.

Once a user is added, you may want to update user ID to preserve ownership of the content. You can do this by updating `users/kozlov.m.a@gmail.com.yaml` with the following content:

```
name: 'Mikhail Kozlov'
super: true
id: 5a0bbf89-fd55-440f-ae32-47c9d13fd12e
```

### 3. Pull CLI Tools

```
composer global require statamic/cli
```


### 4. Update content

Got to http://mikhailkozlov.github.io.test and login. You can use the user you created in the previous step.

Update what needs to be updated, add new content, or delete old content. You can also use the CLI tools to manage content.

### 5. Recompile Static Content

```
php please ssg:generate
```

### 6. Recompile the CSS (optional)

The [TailwindCSS](https://tailwindcss.com/) included in this kit is compiled and purged to reduce filesize on any unused classes and selectors. If you want to modify anything, just recompile it.

```
npm i && npm run dev
```

To compile for production again:

```
npm run build
```

