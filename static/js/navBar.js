let NAVBAR = `
<div class="navBar">
    <div class="navLogoSpace">
        <div class="navLogo">
            <a href="/">
                <div class="navLogoContainer">
                    <img src="static/images/logo.webp" style="width: 100%; object-fit: cover;">
                </div>
            </a>
        </div>
    </div>
    <div class="navButtonSpace" id="fullNavBar">
        <div class="divider"></div>
        <div class="navBarItem">
            <button class="navButton" onclick="location.href='signup'">Join NRC</button>
        </div>
        <div class="divider"></div>
        <div class="navBarItem">
            <button class="navButton" onclick="location.href='meetings'">Meetings</button>
        </div>
        <div class="divider"></div>
        <div class="navBarItem">
            <button class="navButton" onclick="location.href='events'">Events</button>
        </div>
        <div class="divider"></div>
        <div class="navBarItem">
            <button class="navButton" onclick="location.href='useful-nrc-links'">Useful Links</button>
        </div>
        <div class="divider"></div>
        <div class="navBarItem">
            <button class="navButton" onclick="location.href='climbing-gear-rental'">Gear Rental</button>
        </div>
        <div class="divider"></div>
        <div class="navBarItem">
            <button class="navButton" onclick="location.href='climbing-map'">Climbing Map</button>
        </div>
        <div class="divider"></div>
        <div class="navBarItem">
            <button class="navButton" onclick="location.href='blogs'">Blog</button>
        </div>
        <div class="divider"></div>
        <div class="navBarItem">
            <button class="navButton" onclick="showModal()">Competitive Team</button>
        </div>
        <div class="divider"></div>
    </div>
    <div class="navButtonSpace" id="reducedNavBar">
        <div class="divider"></div>
        <div class="navBarItem" style="width: 200px;">
            <button class="navButton" style="font-size: 2em;" onclick="location.href='signup'">Join NRC</button>
        </div>
        <div class="divider"></div>
        <div class="navBarItem" style="width: 200px;">
            <button class="navButton" style="font-size: 2em;" onclick="location.href='meetings'">Meetings</button>
        </div>
        <div class="divider"></div>
        <div class="navBarItem" style="width: 200px;">
            <button class="navButton" id="navListOpen" style="font-size: 2em;">More</button>
        </div>
        <div class="divider"></div>
    </div>

</div>
<div class="navBarList" id="navBarList" style="display: none">
    <div class="navBarListItem">
        <button class="navButton" style="font-size: 2em;" onclick="location.href='signup'">Join NRC</button>
    </div>
    <div class="horizontalDivider"></div>
    <div class="navBarListItem">
        <button class="navButton" style="font-size: 2em;" onclick="location.href='meetings'">Meetings</button>
    </div>
    <div class="horizontalDivider"></div>
    <div class="navBarListItem">
        <button class="navButton" style="font-size: 2em;" onclick="location.href='events'">Events</button>
    </div>
    <div class="horizontalDivider"></div>
    <div class="navBarListItem">
        <button class="navButton" style="font-size: 2em;" onclick="location.href='useful-nrc-links'">Useful Links</button>
    </div>
    <div class="horizontalDivider"></div>
    <div class="navBarListItem">
        <button class="navButton" style="font-size: 2em;" onclick="location.href='climbing-gear-rental'">Gear Rental</button>
    </div>
    <div class="horizontalDivider"></div>
    <div class="navBarListItem">
        <button class="navButton" style="font-size: 2em;" onclick="location.href='climbing-map'">Climbing Map</button>
    </div>
    <div class="horizontalDivider"></div>
    <div class="navBarListItem">
        <button class="navButton" style="font-size: 2em;" onclick="location.href='blogs'">Blog</button>
    </div>
    <div class="horizontalDivider"></div>
    <div class="navBarListItem">
        <button class="navButton" style="font-size: 2em;" onclick="showModal()">Competitive Team</button>
    </div>
    <div class="horizontalDivider"></div>
    <div class="navBarListItem">
        <button class="navButton" id="navListClose" style="font-size: 2em;">Close</button>
    </div>
</div>
`;

document.body.insertAdjacentHTML("afterbegin", NAVBAR);