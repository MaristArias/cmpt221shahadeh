// this is where the news is loaded, we use DOM to pull from the api and display the articles on the home page

document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = 'eedea589086e47008e23d3f482aeafdf'; 
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';

        data.articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');

            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to load news articles. Please try again later.';
        document.getElementById('news-container').appendChild(errorMessage);
    }
});
