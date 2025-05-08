# northeasternclimbing.com
![northeastern climbing site banner](https://github.com/RJTech5/northeasternclimbing/blob/main/static/images/banner.png?raw=true)
The official website for Northeastern University's recreational climbing club. 

[Live Site](https://northeasternclimbing.com/).

The site aims to be a lightweight, modernized version of the existing northeasternclimbing.github site, designed to work with any modern JAMstack platform, without any dependencies or setup required. Specifically, this site works using Cloudflare's page system. Everything is created with vanilla HTML, JS, and CSS for a simplistic and SEO focused web experience.

## Project Structure
* Pages are represented as .html files in the main directory. **index.html** is the file served at northeasternclimbing.com
* testServer.py is available for simple local testing with multiple pages
* Blogs are loaded dynamically from climbing-club-blog/blog-manifest.json
* Some pages with shared page elements live within .js files. For example, the navBar is handled by **static/js/navBar.js** and loaded for all pages. **All elements loaded in this manner should not be critical for SEO**

## Instructions for Future EBoard
It will be filled out once the site is fully complete.
