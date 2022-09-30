# favicons-cli

Generate favions using [itgalaxy/favicons](https://github.com/itgalaxy/favicons).

## Installation

```bash
$ npm install node-favicons-cli
```

## Usage

```bash
lettenj61@machine:~/dev/web/favicons-cli$ node ./dist/main.js --help
Options:
      --help                         Show help                         [boolean]
      --version                      Show version number               [boolean]
  -s, --source                                               [string] [required]
  -d, --destination                                          [string] [required]
      --path                                                      [default: "/"]
      --appName                                                  [default: null]
      --appShortName                                             [default: null]
      --appDescription                                           [default: null]
      --developerName                                            [default: null]
      --developerURL                                             [default: null]
      --dir                                                    [default: "auto"]
      --lang                                                  [default: "en-US"]
      --background                                             [default: "#fff"]
      --theme_color                                            [default: "#fff"]
      --appleStatusBarStyle                       [default: "black-translucent"]
      --display                                          [default: "standalone"]
      --orientation                                             [default: "any"]
      --start_url                                    [default: "/?homescreen=1"]
      --appVersion                                              [default: "1.0"]
      --pixel_art                                               [default: false]
      --loadManifestWithCredentials                             [default: false]
      --manifestRelativePaths                                   [default: false]
      --manifestMaskable                                        [default: false]
      --preferRelatedApplications                               [default: false]
      --icons
  [default: {"android":true,"appleIcon":true,"appleStartup":true,"favicons":true
                                                 ,"windows":true,"yandex":true}]
      --output               [default: {"images":true,"files":true,"html":true}]
```

## Development

Build

```bash
$ npm run build
```
