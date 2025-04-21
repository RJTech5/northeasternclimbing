/**
 * Handles formating nav bar for different screen sizes, and enabling / disabling
 * list navbar mode.
 */

let breakWidth = 1000;
// Reference to nav bar.
let fullNav = document.getElementById("fullNavBar");
// Reduced nav bar for smaller width screens.
let reducedNav = document.getElementById("reducedNavBar");
// Reference to button to open nav bar list version.
let navListOpenButton = document.getElementById("navListOpen");
// Reference to button to close nav bar list version.
let navListCloseButton = document.getElementById("navListClose");
// Nav bar list version.
let navBarList = document.getElementById("navBarList")

// Inits page to default values.
formatNavBar();
closeNavList();

// Listeners for window / button events.
window.addEventListener('resize', function () {
  formatNavBar();
});

navListOpenButton.addEventListener("click", () => {
    console.log("open");
    if (navBarList.classList.contains("hidden")) {
        openNavList();
    }
    else {
        closeNavList();
    }
});

navListCloseButton.addEventListener("click", () => {
    closeNavList();
})

// Formats nav bar according to window width.
function formatNavBar() {
    if (window.innerWidth <= breakWidth) {
        fullNav.classList.add("hidden");
        reducedNav.classList.remove("hidden");
    }
    else {
        closeNavList();
        fullNav.classList.remove("hidden");
        reducedNav.classList.add("hidden");
    }
}

// Opens list nav bar.
function openNavList() {
    navBarList.classList.remove("hidden");
}

// Closes list nav bar.
function closeNavList() {
    navBarList.classList.add("hidden");
}
