document.addEventListener("DOMContentLoaded", async () => {
  const carouselContainer = document.getElementById("carousel-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let currentIndex = 0;
  let posts = [];

  async function fetchPosts() {
      const response = await fetch("../API/techpost.json");
      const data = await response.json();

      posts = data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 3);
      renderPosts();
      updateCarousel();
  }

  function renderPosts() {
    posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "carousel-item";
    postElement.innerHTML = `
        <a href="./post/?id=${post.id}">
          <img src="${post.image}" alt="${post.title}">
          <div class="text">
              <h2>${post.title}</h2>
              <p>${post.descriptionPreview}</p>
              <p class="author">${post.publishDate} ${post.author}</p>
          </div>
        </a>
    `;
    carouselContainer.appendChild(postElement);
  });
}

  function renderPost(index) {
    carouselContainer.innerHTML = "";
    const post = posts[index];
    const postElement = document.createElement("div");
    postElement.className = "carousel-item";
    postElement.innerHTML = `
        <a href="./post/?id=${post.id}">
          <img src="${post.image}" alt="${post.title}">
          <div class="text">
              <h2>${post.title}</h2>
              <p>${post.descriptionPreview}</p>
              <p>${post.publishDate} ${post.author}</p>
          </div>
        </a>
    `;
    carouselContainer.appendChild(postElement);
}

  function updateCarousel() {
    const offset = (currentIndex * 100);
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % posts.length;
    updateCarousel();
    renderPost(currentIndex)
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + posts.length) % posts.length;
    updateCarousel();
    renderPost(currentIndex)
  });

  await fetchPosts();
});
