export let BASE_URL
if (window.location.origin.includes("http://localhost")) {
    BASE_URL = "http://localhost:8000"
} else if (window.location.origin.includes("https://glowing")) {
    BASE_URL = "https://skull-meme-generator.onrender.com"
}
