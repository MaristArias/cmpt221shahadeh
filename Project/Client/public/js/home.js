// Function to fetch and display the latest news
async function fetchNews() {
    const apiKey = 'eedea589086e47008e23d3f482aeafdf'; 
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; // Clear the previous news

        data.articles.forEach((article, index) => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');

            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            
            // Add click event listener to open the modal with the article details
            articleElement.addEventListener('click', () => openModal(article));

            newsContainer.appendChild(articleElement);
        });

        console.log("News updated at: " + new Date().toLocaleTimeString());
    } catch (error) {
        console.error('Error fetching news:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to load news articles. Please try again later.';
        document.getElementById('news-container').appendChild(errorMessage);
    }
}

// Function to open the modal and show article details
function openModal(article) {
    const modal = document.getElementById('news-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');

    // Set the modal content
    modalTitle.textContent = article.title;
    modalDescription.textContent = article.description || 'No description available.';
    modalLink.href = article.url;
    
    // Show the modal
    modal.style.display = "block";

    // Add event listener to close the modal
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.onclick = () => modal.style.display = "none";

    // Close modal if user clicks outside the modal
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Call the fetchNews function immediately to load the news on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchNews();

    // Set an interval to refresh the news every minute (60,000 milliseconds)
    setInterval(fetchNews, 60000);
});
