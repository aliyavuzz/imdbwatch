# IMDB Watch Now Button

A Chrome extension that adds a "Watch Now" button to IMDB movie and TV series pages, linking directly to vidsrc-embed.ru streaming service.

## Features

- 🎬 **One-click streaming** from any IMDB title page
- 📺 **TV Series support** with season and episode selectors
- 🎥 **Movie support** with direct links
- 🎨 **Clean, modern UI** with gradient button design
- ⚡ **Fast and lightweight** - no unnecessary permissions

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. Visit any IMDB movie or TV series page and enjoy!

## Usage

**For Movies:**
- A purple "▶ Watch Now" button appears on the page
- Click to stream the movie instantly

**For TV Series:**
- Button appears with season and episode dropdowns
- Select your desired season (1-20) and episode (1-30)
- Click "Watch Now" to stream

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script that adds the watch button

## How It Works

The extension:
1. Detects IMDB title pages (`/title/tt*`)
2. Extracts the IMDB ID (tt code)
3. Determines if it's a movie or TV series
4. Adds appropriate watch button with streaming link to vidsrc-embed.ru

## Screenshots

<img width="1919" height="863" alt="image" src="https://github.com/user-attachments/assets/ef5ed9f3-c5a9-4291-a23c-23b18cf02cfe" />


## Notes

- Works only on IMDB title pages
- Streams are provided by vidsrc-embed.ru
- No login or subscription required

## License

MIT License - Feel free to use and modify!
