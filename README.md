# northeasternclimbing.com
![northeastern climbing site banner](https://github.com/RJTech5/northeasternclimbing/blob/main/static/images/banner.png?raw=true)
The official website for Northeastern University's recreational climbing club. 

[Live Site](https://northeasternclimbing.com/).

The site aims to be a lightweight, modernized version of the existing northeasternclimbing.github site, designed to work with any modern JAMstack platform, without any dependencies or setup required. Specifically, this site works using Cloudflare's page system. Everything is created with vanilla HTML, JS, and CSS for a simplistic and SEO focused web experience.

## Project Structure
* Pages are represented as .html files in the main directory. **index.html** is the file served at northeasternclimbing.com
* **testServer.py** is available for simple local testing with multiple pages
* Blogs are loaded dynamically from **climbing-club-blog/blog-manifest.json**
* Some pages with shared page elements live within .js files. For example, the navBar is handled by **static/js/navBar.js** and loaded for all pages. **All elements loaded in this manner should not be critical for SEO**

## Membership status page
**membership.html** (`/membership`) lets members check their status by calling the [membership API](https://github.com/RJTech5/northeasternclimbing-api) (`POST /api/verify`). The page's logic lives in **static/js/membership/membershipLookup.js** and its styles in **static/css/membership.css**.

The API's base URL is read from **static/js/config.js** (`NRC_CONFIG.apiBaseUrl`). The committed value, `http://localhost:5000`, is for local development. For deployments, set the `NRC_API_BASE_URL` environment variable and regenerate the file:

* **Cloudflare Pages:** set `NRC_API_BASE_URL` (e.g. `https://api.example.org`) in the project's environment variables, and use `sh scripts/write-config.sh` as the build command.
* **Anywhere else:** run `NRC_API_BASE_URL=https://api.example.org sh scripts/write-config.sh` before deploying.

The API only accepts requests from origins listed in its `CORS_ORIGINS` variable, so the site's origin (e.g. `https://northeasternclimbing.com`) must be included there.

### Running locally with the API
1. Start the API on port 5000 (see its README), with `CORS_ORIGINS=http://localhost:4000`.
2. Serve this site on port 4000: `python testServer.py`.
3. Open http://localhost:4000/membership.

## Instructions for Future EBoard
It will be filled out once the site is fully complete.
