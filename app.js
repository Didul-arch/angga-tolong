document.getElementById('searchButton').addEventListener('click', function() {
  const query = document.getElementById('searchInput').value;
  if (query) {
      fetchBooks(query);
  }
});

function fetchBooks(query) {
  const apiKey = 'AIzaSyBv3b_VBSzdRXVslgz8OFw8XhiK3zPa4fY';  
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;
  
  fetch(url)
      .then(response => response.json())
      .then(data => displayBooks(data))
      .catch(error => console.error('Error fetching data:', error));
}

function displayBooks(data) {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  if (data.totalItems === 0) {
      bookList.innerHTML = '<p class="text-red-500">No books found.</p>';
      return;
  }

  data.items.forEach(item => {
      const book = document.createElement('div');
      book.className = 'bg-white p-4 rounded-md shadow-md';

      const bookInfo = document.createElement('div');
      bookInfo.className = 'flex items-center';

      const img = document.createElement('img');
      img.src = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '';
      img.alt = 'Book cover';
      img.className = 'w-20 h-auto mr-4';

      const bookDetails = document.createElement('div');

      const title = document.createElement('h3');
      title.textContent = item.volumeInfo.title;
      title.className = 'font-semibold text-lg';

      const author = document.createElement('p');
      author.textContent = `Author: ${item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'N/A'}`;
      author.className = 'text-sm text-gray-700';

      const viewMoreButton = document.createElement('button');
      viewMoreButton.textContent = 'View More';
      viewMoreButton.className = 'mt-2 text-blue-500 underline cursor-pointer';
      
      viewMoreButton.addEventListener('click', () => {
          showModal(item);
      });

      bookDetails.appendChild(title);
      bookDetails.appendChild(author);
      bookDetails.appendChild(viewMoreButton);
      bookInfo.appendChild(img);
      bookInfo.appendChild(bookDetails);
      book.appendChild(bookInfo);
      bookList.appendChild(book);
  });
}

function showModal(item) {
  document.getElementById('modalTitle').textContent = item.volumeInfo.title;
  document.getElementById('modalAuthor').textContent = `Author: ${item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'N/A'}`;
  document.getElementById('modalDescription').textContent = `Description: ${item.volumeInfo.description || 'No description available.'}`;
  document.getElementById('modalPages').textContent = `Pages: ${item.volumeInfo.pageCount ? item.volumeInfo.pageCount : 'N/A'}`;
  document.getElementById('modalPrice').textContent = `Price: ${item.saleInfo.listPrice ? item.saleInfo.listPrice.amount + ' ' + item.saleInfo.listPrice.currencyCode : 'N/A'}`;
  document.getElementById('bookModal').classList.remove('hidden');
}

document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('bookModal').classList.add('hidden');
});
