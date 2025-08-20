// Load random article from JSON
async function loadArticle() {
  try {
    const res = await fetch("articles.json");
    const articles = await res.json();

    // Pick random article
    const randomArticle = articles[Math.floor(Math.random() * articles.length)];

    // Fill HTML
    document.getElementById("article-title").textContent = randomArticle.title;
    document.getElementById("article-meta").textContent =
      `By ${randomArticle.author} | Published: ${randomArticle.datePublished}`;

    const contentDiv = document.getElementById("article-content");
    contentDiv.innerHTML = "";
    randomArticle.content.forEach(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      contentDiv.appendChild(p);
    });

    // Build JSON-LD dynamically
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": randomArticle.title,
      "author": {
        "@type": "Person",
        "name": randomArticle.author
      },
      "datePublished": randomArticle.datePublished,
      "keywords": randomArticle.keywords.join(", "),
      "publisher": {
        "@type": "Organization",
        "name": "Global Insights Media"
      }
    };
    document.getElementById("json-ld").textContent = JSON.stringify(jsonLd, null, 2);

  } catch (error) {
    console.error("Error loading article:", error);
  }
}

// Countdown logic
function startCountdown() {
  let timeLeft = 15;
  const countdownEl = document.getElementById("countdown");
  const button = document.getElementById("next-button");

  const timer = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      button.disabled = false;
      button.classList.add("enabled");
      button.textContent = "Continue to Next Page";
      button.onclick = () => {
        window.location.href = "go.html"; // redirect target
      };
    }
  }, 1000);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  loadArticle();
  startCountdown();
});
