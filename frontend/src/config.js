export let BASE_URL
if (window.location.origin.includes("http://localhost")) {
    BASE_URL = "http://localhost:8000"
} else if (window.location.origin.includes("http://ip-address")) {
    BASE_URL = "http://ip-address:8000"
}
