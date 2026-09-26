/**
 * Handles the membership status lookup form: client-side validation, calling the
 * membership API (base URL from NRC_CONFIG in static/js/config.js), and showing the
 * result. API data is only ever rendered as text.
 */

// Give up on the API after this long and show the error state.
const MEMBERSHIP_REQUEST_TIMEOUT_MS = 10000;

// Mirror the API's server-side validation.
const MEMBERSHIP_EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MEMBERSHIP_NAME_PATTERN = /^[\p{L}\p{M}]+(?:[ '’.-]+[\p{L}\p{M}]+)*\.?$/u;

const MEMBERSHIP_SIGNUP_LINK = {text: "fill out the signup form", href: "signup"};
const MEMBERSHIP_EMAIL_LINK = {text: "nurecclimbing@gmail.com", href: "mailto:nurecclimbing@gmail.com"};

let membershipForm = document.getElementById("membershipForm");
let membershipSubmitButton = document.getElementById("membershipSubmit");
let membershipResult = document.getElementById("membershipResult");
let membershipResultTitle = document.getElementById("membershipResultTitle");
let membershipResultMessage = document.getElementById("membershipResultMessage");
let membershipAnnouncer = document.getElementById("membershipAnnouncer");

let membershipFields = [
    {
        input: document.getElementById("membershipFirstName"),
        error: document.getElementById("membershipFirstNameError"),
        validate: value => validateMembershipName(value, "first name")
    },
    {
        input: document.getElementById("membershipLastName"),
        error: document.getElementById("membershipLastNameError"),
        validate: value => validateMembershipName(value, "last name")
    },
    {
        input: document.getElementById("membershipEmail"),
        error: document.getElementById("membershipEmailError"),
        validate: validateMembershipEmail
    }
];

membershipForm.addEventListener("submit", event => {
    event.preventDefault();
    submitMembershipLookup();
});

// Clear a field's error as soon as the user fixes it.
for (let field of membershipFields) {
    field.input.addEventListener("input", () => {
        if (field.input.getAttribute("aria-invalid") === "true" && !field.validate(field.input.value.trim())) {
            setMembershipFieldError(field, "");
        }
    });
}

/**
 * Validates the form, then looks up the membership and shows the result.
 */
async function submitMembershipLookup() {
    let firstInvalidField = null;
    for (let field of membershipFields) {
        let message = field.validate(field.input.value.trim());
        setMembershipFieldError(field, message);
        if (message && firstInvalidField == null) {
            firstInvalidField = field;
        }
    }
    if (firstInvalidField != null) {
        firstInvalidField.input.focus();
        return;
    }

    setMembershipLoading(true);
    try {
        let result = await fetchMembershipStatus({
            first_name: membershipFields[0].input.value.trim(),
            last_name: membershipFields[1].input.value.trim(),
            email: membershipFields[2].input.value.trim()
        });
        showMembershipStatus(result);
    } catch (error) {
        showMembershipError(error);
    } finally {
        setMembershipLoading(false);
    }
}

/**
 * Calls the membership API.
 * @param body object with first_name, last_name, and email.
 * @returns {Promise<{status: string, expiration_date: ?string}>} the lookup result.
 * @throws MembershipLookupError with the HTTP status (0 for network failures).
 */
async function fetchMembershipStatus(body) {
    let controller = new AbortController();
    let timeout = setTimeout(() => controller.abort(), MEMBERSHIP_REQUEST_TIMEOUT_MS);
    let response;
    try {
        response = await fetch(`${NRC_CONFIG.apiBaseUrl}/api/verify`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
            signal: controller.signal
        });
    } catch (error) {
        throw new MembershipLookupError(0);
    } finally {
        clearTimeout(timeout);
    }

    if (!response.ok) {
        throw new MembershipLookupError(response.status);
    }
    try {
        return await response.json();
    } catch (error) {
        throw new MembershipLookupError(response.status);
    }
}

class MembershipLookupError extends Error {
    constructor(status) {
        super(`Membership lookup failed with status ${status}`);
        this.status = status;
    }
}

/**
 * Shows the result for a successful lookup.
 * @param result API response with status and expiration_date.
 */
function showMembershipStatus(result) {
    let expiration = formatMembershipDate(result.expiration_date);

    switch (result.status) {
        case "active":
            showMembershipResult("active", "Your membership is active",
                [expiration
                    ? `Your NRC membership is valid through ${expiration}. `
                    : "Your NRC membership is currently active. ",
                    "Ask for the Northeastern Recreational Climbing discount at Rock Spot South Boston or Central Rock Fenway."]);
            break;
        case "expired":
            showMembershipResult("expired", "Your membership has expired",
                [expiration
                    ? `Your NRC membership ended on ${expiration}. `
                    : "Your NRC membership is no longer active. ",
                    "To renew, ", MEMBERSHIP_SIGNUP_LINK, "."]);
            break;
        case "pending":
            showMembershipResult("pending", "Your signup is being processed",
                ["We've received your signup form, but it hasn't been verified yet. This usually takes 2-3 business days. ",
                    "If it's been longer than that, email ", MEMBERSHIP_EMAIL_LINK, "."]);
            break;
        case "not_found":
            showMembershipResult("not_found", "We couldn't find a membership",
                ["No membership matches that name and email. Make sure they're entered exactly as on your signup form, or ",
                    MEMBERSHIP_SIGNUP_LINK, " to become a member."]);
            break;
        default:
            showMembershipError(new MembershipLookupError(200));
    }
}

/**
 * Shows a friendly message for a failed lookup.
 * @param error MembershipLookupError from fetchMembershipStatus.
 */
function showMembershipError(error) {
    if (error.status === 429) {
        showMembershipResult("error", "Too many lookups",
            ["You've checked a few times in a row. Please wait a minute, then try again."]);
    } else if (error.status === 400) {
        showMembershipResult("error", "Please check your details",
            ["Make sure your first name, last name, and email address are entered correctly, then try again."]);
    } else {
        showMembershipResult("error", "We couldn't check your membership",
            ["The membership lookup isn't available right now. Please try again later, or email ",
                MEMBERSHIP_EMAIL_LINK, "."]);
    }
}

/**
 * Renders a result box and announces it to screen readers.
 * @param status used to style the result box.
 * @param title heading text.
 * @param parts message pieces: strings, or {text, href} objects for links.
 */
function showMembershipResult(status, title, parts) {
    membershipResult.dataset.status = status;
    membershipResultTitle.textContent = title;
    membershipResultMessage.replaceChildren(...parts.map(part => {
        if (typeof part === "string") {
            return document.createTextNode(part);
        }
        let link = document.createElement("a");
        link.href = part.href;
        link.textContent = part.text;
        return link;
    }));
    membershipResult.classList.remove("hidden");
    membershipAnnouncer.textContent = `${title}. ${membershipResultMessage.textContent}`;
}

/**
 * Toggles the in-flight state of the form.
 * @param isLoading whether a lookup is in progress.
 */
function setMembershipLoading(isLoading) {
    membershipSubmitButton.disabled = isLoading;
    membershipSubmitButton.textContent = isLoading ? "CHECKING..." : "CHECK STATUS";
    membershipForm.setAttribute("aria-busy", String(isLoading));
    if (isLoading) {
        membershipResult.classList.add("hidden");
        membershipAnnouncer.textContent = "Checking your membership...";
    }
}

/**
 * Shows or clears a validation message under a field.
 * @param field entry from membershipFields.
 * @param message error text, or "" to clear.
 */
function setMembershipFieldError(field, message) {
    field.error.textContent = message;
    if (message) {
        field.input.setAttribute("aria-invalid", "true");
    } else {
        field.input.removeAttribute("aria-invalid");
    }
}

/**
 * @returns {string} an error message, or "" if the name is valid.
 */
function validateMembershipName(value, label) {
    if (!value) {
        return `Enter your ${label}.`;
    }
    if (value.length > 100 || !MEMBERSHIP_NAME_PATTERN.test(value)) {
        return `Enter your ${label} using letters, spaces, hyphens, or apostrophes.`;
    }
    return "";
}

/**
 * @returns {string} an error message, or "" if the email is valid.
 */
function validateMembershipEmail(value) {
    if (!value) {
        return "Enter the email address you used on the signup form.";
    }
    if (value.length > 254 || !MEMBERSHIP_EMAIL_PATTERN.test(value)) {
        return "Enter a valid email address, like husky@northeastern.edu.";
    }
    return "";
}

/**
 * Formats an ISO date (YYYY-MM-DD) like "January 31, 2027".
 * @returns {?string} the formatted date, or null if missing or malformed.
 */
function formatMembershipDate(isoDate) {
    let match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate || "");
    if (match == null) {
        return null;
    }
    let date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return date.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"});
}
