let manifestPath = 'blog/blog-manifest.json';
let blogData = loadData(manifestPath);
let blogCardSpace = document.getElementById("blogCardSpace");

console.log(blogData);

if (blogData["articles"] != null) {
    articles = blogData["articles"];

    for (article of articles) {
        card = makeHTMLCard(
            article["title"],
            article["description"],
            article["thumbnail"],
            article["thumbnail-alt-text"],
            article["date"],
            article["time"]
            )

        blogCardSpace.insertAdjacentHTML("beforeend", card);
    }
}

/**
 * Loads data from path to populate blog page.
 */
function loadData(path) {
    var returnedData = {}
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error getting blog data');
            }
            return response.json();
        })
        .then(data => {
            returnedData = data;
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });

    return returnedData;
}

/**
 * Makes a custom blog card based on manifest.
 * @param title to use for card.
 * @param description description to use for card.
 * @param thumbnail to display on card.
 * @param thumbAlt alt text to use in image.
 * @param date date to use on card.
 * @param time time to use on card.
 * @returns {*} a string representing html.
 */
function makeHTMLCard(title, description, thumbnail, thumbAlt, date, time) {
    html = ```
            <div class="blogCard">
                <div class="blogThumbnail">
                    <img src="${thumbnail}" alt="${thumbnailAlt}"
                         style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                </div>
                <div class="blogCardText">
                    <p style="font-size: 2em; color: var(--nrc-red);">${title}</p>
                    <p>
                        ${description}
                    </p>
                    <p style="font-size: 0.8em; color: var(--text-color-primary);">${date} | ${time}
                        pm</p>

                </div>
            </div>
    ```

    return html;
}

