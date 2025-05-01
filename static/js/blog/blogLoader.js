
// TODO: add pages when more blogs are made.
document.addEventListener("DOMContentLoaded", async () => {
    let manifestPath = '/climbing-club-blog/climbing-club-blog-manifest.json';
    let blogData = await loadData(manifestPath);
    let blogCardSpace = document.getElementById("blogCardSpace");

    if (blogData["articles"] != null) {
        articles = blogData["articles"];

        for (article of articles) {
            card = makeHTMLCard(
                article["title"],
                article["description"],
                article["thumbnail"],
                article["thumbnail-alt-text"],
                article["date"],
                article["time"],
                article["link"]
            )

            blogCardSpace.insertAdjacentHTML("beforeend", card);
        }
    }
});

/**
 * Loads data from path to populate climbing-club-blog page.
 */
async function loadData(path) {
    return fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error getting climbing-club-blog data');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });

}

/**
 * Makes a custom climbing-club-blog card based on manifest.
 * @param title to use for card.
 * @param description description to use for card.
 * @param thumbnail to display on card.
 * @param thumbAlt alt text to use in image.
 * @param date date to use on card.
 * @param time time to use on card.
 * @returns {*} a string representing html.
 */
function makeHTMLCard(title, description, thumbnail, thumbAlt, date, time, link) {
    html = `
            <div class="blogCard" onclick="location.href='${link}'">
                <div class="blogThumbnail">
                    <img src="${thumbnail}" alt="${thumbAlt}"
                         style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                </div>
                <div class="blogCardText">
                    <p style="font-size: 2em; color: var(--nrc-red);">${title}</p>
                    <p>
                        ${description}
                    </p>
                    <p style="font-size: 0.8em; color: var(--text-color-primary);">${date} | ${time}
                    </p>
                </div>
            </div>
    `;
    return html;
}

