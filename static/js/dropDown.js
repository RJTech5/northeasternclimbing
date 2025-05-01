/**
 * Represents a dropdown menu that can open when hovered, or clicked.
 */
export class DropDownMenu {

    ddContentStyles;
    ddButton;
    ddContent;
    ddButtonStyles;
    ddContentStyles;
    ddSelected;

    /**
     * Creates a dropdown menu that can be opened either on click, or on hover. Must have a button
     * and drop down menu content.
     * @param dropDownButton button to use to open / close drop down.
     * @param dropDownContent content to display when drop down is open.
     * @param openOnHover sets dropdown to open when hovering over button.
     * @param openOnClicked sets drop down to open when clicked.
     */
    constructor(dropDownButton, dropDownContent, openOnHover, openOnClicked) {
        this.ddButton = dropDownButton;
        this.ddContent = dropDownContent;
        this.ddButtonStyles = this.ddButton.classList;
        this.ddContentStyles = this.ddContent.classList;
        this.ddSelected = false;
        console.log(this.ddButtonStyles);
        console.log(this.ddContentStyles);

        if (openOnClicked) {
            this.ddButton.addEventListener("click", () => this.toggleWmSelections());
        }

        if (openOnHover) {
            this.ddButton.addEventListener("mouseenter", () => this.showDropDown());
            this.ddButton.addEventListener("mouseleave", () => this.hideDropDown());
        }
        this.ddContentStyles.add("hidden");
    }

    showDropDown() {
        this.ddContentStyles.remove("hidden");
    }

    hideDropDown() {
        if (this.ddSelected) {
            return;
        }
        this.ddContentStyles.add("hidden");
    }

    toggleWmSelections() {
        this.ddSelected = !this.ddSelected;

        if (this.ddSelected) {
            this.ddContentStyles.remove("hidden");
            this.ddButtonStyles.add("dropHover");
        } else {
            this.ddContentStyles.add("hidden");
            this.ddButtonStyles.remove("dropHover");
        }
    }
}