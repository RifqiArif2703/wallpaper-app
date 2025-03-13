const API_KEY = 'hHFAqCZZjvXXbsrXFhrsOJnCOu6lA8s7oP5hh4LwQyMU2KBHmstTgE4P'; // Ganti dengan API key Pexels Anda
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const randomButton = document.getElementById('random-button');
const imageGrid = document.getElementById('image-grid');
const imagePreview = document.getElementById('image-preview');
const previewImage = document.getElementById('preview-image');
const downloadLink = document.getElementById('download-link');
const closePreviewButton = document.getElementById('close-preview');

// Fungsi untuk mengambil gambar dari Pexels API
async function fetchImages(query) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=30`, {
      headers: { Authorization: API_KEY },
    });
    const data = await response.json();
    displayImages(data.photos);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

// Fungsi untuk menampilkan gambar di grid
function displayImages(images) {
  imageGrid.innerHTML = ''; // Kosongkan grid sebelum menambahkan gambar baru
  images.forEach((image) => {
    const imgElement = document.createElement('img');
    imgElement.src = image.src.medium;
    imgElement.alt = image.photographer;
    imgElement.addEventListener('click', () => openPreview(image));
    imageGrid.appendChild(imgElement);
  });
}

// Fungsi untuk membuka preview gambar
function openPreview(image) {
  previewImage.src = image.src.large;
  downloadLink.href = image.src.original;
  imagePreview.style.display = 'flex';
}

// Fungsi untuk menutup preview gambar
function closePreview() {
  imagePreview.style.display = 'none';
}

// Event listener untuk tombol cari
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
  }
});

// Event listener untuk tombol random
randomButton.addEventListener('click', () => {
  const randomQueries = ['nature', 'city', 'abstract', 'anime'];
  const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];
  fetchImages(randomQuery);
});

// Event listener untuk tombol tutup preview
closePreviewButton.addEventListener('click', closePreview);