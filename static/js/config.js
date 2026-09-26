/**
 * Site configuration shared by pages that call backend services.
 *
 * apiBaseUrl: base URL of the membership API (northeasternclimbing-api), with no
 * trailing slash. The value below is for local development. Deployments regenerate
 * this file from the NRC_API_BASE_URL environment variable with
 * scripts/write-config.sh (see README.md).
 */
const NRC_CONFIG = Object.freeze({
    apiBaseUrl: "http://localhost:5000"
});
