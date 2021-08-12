# Chrome Web Bookmark Extension

> Turn a link as a visual bookmark, just like `Twitter` cards or `Notion` web bookmark.

## Preview

| Bookmark Layout | Light Mode | Dark Mode |
| :---: | :---: | :---: |
| horizontal | ![](https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-for-repo@latest/chrome-web-bookmark/horizontal-light.png) | ![](https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-for-repo@latest/chrome-web-bookmark/horizontal-dark.png) |
| vertical | ![](https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-for-repo@latest/chrome-web-bookmark/vertical-light.png) | ![](https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-for-repo@latest/chrome-web-bookmark/vertical-dark.png) |

## Concepts

This extension is built on top of [metafy](https://github.com/xiaoluoboding/metafy), which provides serverless api to fetch websites metadata easily and turn the metadata into the visual bookmark. like Twitter does.

## Usage

### Install

Install the dependencies

```bash
yarn
# or
pnpm install
```

### Development

Run the development server

```bash
yarn dev
# or
pnpm dev
```

Then load uppacked extension in browser with the `extension/` folder.

### Production

Build the extension

```bash
yarn build
# or
pnpm build
```

Then load uppacked extension in browser with the `extension/` folder.

## Template

[This repo is created from this template on GitHub](https://github.com/xiaoluoboding/vitesse-modernized-chrome-ext/generate).

## License

[MIT](./LICENSE) - [@xiaoluoboding](https://github.com/xiaoluoboding)
