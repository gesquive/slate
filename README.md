# slate theme for hugo


slate is a single-page speed dial theme for [Hugo](http://gohugo.io/). You can view a demo at https://gesquive.github.io/hugo-slate-demo/

![slate hugo theme screenshot](https://raw.githubusercontent.com/gesquive/slate/master/images/screenshot.png)

# Features
 - Rotating image background
 - [Image](https://raw.githubusercontent.com/gesquive/slate/master/images/icon_tiles.png) and [Text](https://raw.githubusercontent.com/gesquive/slate/master/images/text_tiles.png) tile display mode
 - Tag based navigation/filtering


# Installation

## Installing this theme

    mkdir themes
    cd themes
    git clone https://github.com/gesquive/slate

## Build with this theme

    hugo server -t slate

# Configuration

**config.toml**

``` toml
baseURL = "http://example.org/"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "slate"

[ params ]
# optional image background rotation
BackgroundImages = [
  "bg/b1920-000.jpg",
  "bg/b1920-001.jpg",
  "bg/b1920-002.jpg",
  "bg/b1920-003.jpg",
  "bg/b1920-004.jpg"
]
# optional background style (valid css only)
BackgroundStyle = "background: #000000;"
# optional bool to have links open in a new window/tab (default: true)
OpenLinksInNewWindow = true
# optional path to favicon
Favicon = "favicon.ico"

# list of nav tags
[[ params.nav ]]
name = "favorites" # display name
tag = "favorite"   # url/tag name
icon = "star"      # font-awesome icon name

```

Example : [config.toml](https://github.com/gesquive/hugo-slate-demo/blob/master/config.toml)

## Links

All links are defined in the `data/links.yml` data file. Valid attributes are:

- **name**: the name displayed below the tile
- **url**: the url href, also used for text when no img is specified
- **tags**: (_optional_) list of tags to apply to this tile
- **img**: (_optional_) path to tile image, this will replace any text in the tile
-  **txt_color**: (_optional_) css used to set the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) of a tile, a random value is chosen if none is specified
- **bg_color**: (_optional_) css used to set the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of a tile.

Example of link definitions in the data file.

``` yaml
tiles:
-
  name: 'google'
  url: 'https://google.com'
  img: 'google.svg'
  tags: ['favorite', 'search']
-
  name: 'bing'
  url: 'https://bing.com'
  img: 'bing.svg'
  txt_color: '#ffffff'
  bg_color: '#ffb900'
  tags: ['search']
-
  name: 'amazon'
  url: 'https://amazon.com'
  img: 'amazon.svg'
  bg_color: '#ffffff'
  txt_color: '#ff9900'
  tags: ['favorite', 'shopping']
-
  name: 'reddit'
  url: 'https://reddit.com'
  img: 'reddit.svg'
  bg_color: '#5f99cf'
  txt_color: '#ffffff'
-
  name: 'spotify'
  url: 'https://web.spotify.com'
  img: 'spotify.svg'
  bg_color: '#191414'
  txt_color: '#1db954'
  tags: ['favorite', 'music']
-
  name: 'google music'
  url: 'https://play.google.com/music/listen'
  img: 'google-music.png'
  bg_color: '#ffffff'
  txt_color: '#ff5722'
  tags: ['music']
-
  name: 'pandora'
  url: 'https://pandora.com'
  img: 'pandora.svg'
  bg_color: '#005483'
  txt_color: '#ffffff'
  tags: ['music']
```

## Navigation

Along the left side of the screen is a navigation bar that can be used to filter the links. The filtering occurs on the tag attribute of the links. For example, when the 'favorite' tag is selected, only the links with the 'favorite' tag attribute will be shown.

A nav filter is defined as:
- **name**: The name displayed in the UI
- **tag**: the tag name to filter links with
- **icon**: the [font-awesome](http://fontawesome.io/icons/) name of the icon to display

Example of a menu definition in main config file.


``` toml
[[ params.nav ]]
name = "favorites"
tag = "favorite"
icon = "star"

[[ params.nav ]]
name = "search"
tag = "search"
icon = "search"

[[ params.nav ]]
name = "shopping"
tag = "shopping"
icon = "shopping-basket"

[[ params.nav ]]
name = "music"
tag = "music"
icon = "headphones"
```
