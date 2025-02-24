const apiKey = process.env.API_KEY;
 // Replace with your actual API key
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".category");

async function fetchNews(query = "latest") {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
}

function displayNews(articles) {
    newsContainer.innerHTML = "";
    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        newsCard.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available"}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;

        newsContainer.appendChild(newsCard);
    });
}

// Search functionality
searchInput.addEventListener("keyup", () => {
    const query = searchInput.value;
    if (query.length > 2) {
        fetchNews(query);
    }
});

// Category filtering
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        fetchNews(button.dataset.category);
    });
});

// Fetch default news on page load
fetchNews();
