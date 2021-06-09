# `@muniz/cli`

> @muniz/cli scaffolding is designed based on the plug-in mechanism model and is composed of multiple plug-ins.

## Usage

```bash
npm install -g @muniz/cli
```

> muniz help command document

```bash
  Usage

    $ muniz <command> [options]

  Command

    add        add plugin
    doctor     Diagnosis of intractable scaffolding
    list       View the list of plugins
    locale     Multi-language switching
    remove     Remove plugin

  Other Options

    --help, -h           Show helps
    --version, -v        Show Version
```

> Install Plugin

```bash
1. Install create template plugin

  muniz add @muniz/muniz-plugin-create # add-plugin

  muniz create # use-command

2. Install demo plugin

  muniz add @muniz/muniz-plugin-tpl # add-plugin

  muniz tpl # use-command
```

> [more plugin](https://www.npmjs.com/search?q=muniz-plugin)

`https://www.npmjs.com/search?q=muniz-plugin`
