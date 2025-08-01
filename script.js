document.addEventListener('DOMContentLoaded', function () {
  // Define the ordered list of pages for pagination
  const pages = [
    'index.html',    // Home
    'home.html',     // Dashboard
    'profile.html',
    'attendance.html',
    'results.html',
    'courses.html',
    'fees.html',
    'timetable.html',
    'notices.html',
    'contact.html',
    'about.html'
  ];

  // Get current page filename from URL
  const currentPage = window.location.pathname.split('/').pop();

  // Find index of current page in pages array
  const currentIndex = pages.indexOf(currentPage);

  // Create pagination container
  const paginationContainer = document.createElement('div');
  paginationContainer.style.display = 'flex';
  paginationContainer.style.justifyContent = 'center';
  paginationContainer.style.margin = '20px 0';
  paginationContainer.style.gap = '8px';
  paginationContainer.style.flexWrap = 'wrap';

  // Helper function to create a page button
  function createPageButton(text, href, isActive = false, isDisabled = false) {
    const btn = document.createElement('a');
    btn.textContent = text;
    btn.href = href || '#';
    btn.style.padding = '8px 12px';
    btn.style.backgroundColor = isActive ? '#005f99' : '#0077b5';
    btn.style.color = 'white';
    btn.style.textDecoration = 'none';
    btn.style.borderRadius = '5px';
    btn.style.userSelect = 'none';
    btn.style.pointerEvents = isDisabled ? 'none' : 'auto';
    btn.style.opacity = isDisabled ? '0.5' : '1';
    return btn;
  }

  // Previous button
  // Disable Previous button on 'index.html' and 'home.html' (first two pages)
  const prevButton = createPageButton(
    'Previous',
    currentIndex > 1 ? pages[currentIndex - 1] : null,
    false,
    currentIndex <= 1
  );
  paginationContainer.appendChild(prevButton);

  // Numbered page buttons (excluding index.html)
  pages.forEach((page, index) => {
    if (page === 'index.html') return; // Skip index.html button
    const isActive = index === currentIndex;
    const pageNumber = index; // Adjust page number to start from 1 for home.html
    const pageButton = createPageButton(pageNumber, page, isActive, false);
    paginationContainer.appendChild(pageButton);
  });

  // Next button
  const nextButton = createPageButton('Next', currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null, false, currentIndex === pages.length - 1);
  paginationContainer.appendChild(nextButton);

  // Append pagination container to the page
  // Try to append to <main> if exists, else to body
  const mainElement = document.querySelector('main');
  if (mainElement) {
    mainElement.appendChild(paginationContainer);
  } else {
    document.body.appendChild(paginationContainer);
  }
});
