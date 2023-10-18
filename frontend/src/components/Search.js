// Fetch the freelancer talent data from the server
function fetchFreelancers() {
    // Make an API request to retrieve the freelancer data
    // Replace the URL with the appropriate endpoint or data source
    return fetch('your-api-endpoint')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching freelancers: ' + response.status);
        }
      })
      .then(data => data.freelancers)
      .catch(error => {
        console.error('Error fetching freelancers:', error);
        return [];
      });
  }
  
  // Display the search results
  function showSearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    
    // Clear previous search results
    searchResultsContainer.innerHTML = '';
    
    if (results.length === 0) {
      searchResultsContainer.textContent = 'No results found.';
      return;
    }
  
    // Iterate over the search results and create HTML elements to display them
    results.forEach(result => {
      const freelancerCard = document.createElement('div');
      freelancerCard.classList.add('freelancer-card');
      
      // Customize the freelancer card as per your design requirements
      freelancerCard.innerHTML = `
        <h3>${result.name}</h3>
        <p>${result.skills.join(', ')}</p>
      `;
      
      searchResultsContainer.appendChild(freelancerCard);
    });
  }
  
  // Perform the search based on the user's input
  function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // Fetch the freelancer talent data
    fetchFreelancers()
      .then(freelancers => {
        // Filter the freelancers based on the search term
        const searchResults = freelancers.filter(freelancer => {
          // Customize the search criteria based on your data structure
          return freelancer.name.toLowerCase().includes(searchTerm) ||
            freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        });
        
        // Display the search results
        showSearchResults(searchResults);
      });
  }
  
  // Listen for user input in the search input field
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', performSearch);

// Implement the Advanced search options feature
function showAdvancedSearchOptions() {
    const advancedSearchContainer = document.getElementById('advancedSearchContainer');
    advancedSearchContainer.classList.toggle('hidden');
  }

  const advancedSearchButton = document.getElementById('advancedSearchButton');
  advancedSearchButton.addEventListener('click', showAdvancedSearchOptions);

  // Handle advanced search form submission
  const advancedSearchForm = document.getElementById('advancedSearchForm');
  advancedSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Extract the search criteria from the form
    const formData = new FormData(advancedSearchForm);
    const searchCriteria = {
      name: formData.get('name'),
      skills: formData.getAll('skills'),
      location: formData.get('location'),
      availability: formData.get('availability'),
      rate: formData.get('rate'),
    };

    // Perform the search based on the advanced search criteria
    fetchFreelancers()
      .then(freelancers => {
        // Filter the freelancers based on the search criteria
        const searchResults = freelancers.filter(freelancer => {
          // Customize the search criteria based on your data structure
          let matchesCriteria = true;

          if (searchCriteria.name && !freelancer.name.toLowerCase().includes(searchCriteria.name.toLowerCase())) {
            matchesCriteria = false;
          }

          if (searchCriteria.skills.length > 0 && !searchCriteria.skills.some(skill => freelancer.skills.includes(skill))) {
            matchesCriteria = false;
          }

          if (searchCriteria.location && freelancer.location !== searchCriteria.location) {
            matchesCriteria = false;
          }

          if (searchCriteria.availability && freelancer.availability !== searchCriteria.availability) {
            matchesCriteria = false;
          }

          if (searchCriteria.rate && freelancer.rate !== searchCriteria.rate) {
            matchesCriteria = false;
          }

          return matchesCriteria;
        });

        // Display the search results
        showSearchResults(searchResults);
      });
  });

// Implement the Autocomplete suggestions feature
const searchInputAuto = document.getElementById('searchInput');

// Create an array to store the search suggestions
let searchSuggestions = [];

// Function to fetch search suggestions from the server
function fetchSearchSuggestions(searchTerm) {
  // Make an API request to retrieve the search suggestions
  // Replace the URL with the appropriate endpoint or data source
  return fetch(`your-api-endpoint?q=${searchTerm}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error fetching search suggestions: ' + response.status);
      }
    })
    .then(data => data.suggestions)
    .catch(error => {
      console.error('Error fetching search suggestions:', error);
      return [];
    });
}

// Function to show the search suggestions
function showSearchSuggestions(suggestions) {
  // Clear previous search suggestions
  const searchSuggestionsContainer = document.getElementById('searchSuggestions');
  searchSuggestionsContainer.innerHTML = '';

  if (suggestions.length === 0) {
    searchSuggestionsContainer.textContent = 'No suggestions found.';
    return;
  }

  // Create HTML elements to display the search suggestions
  suggestions.forEach(suggestion => {
    const suggestionElement = document.createElement('li');
    suggestionElement.classList.add('search-suggestion');
    suggestionElement.textContent = suggestion;

    // Handle click event on the search suggestion
    suggestionElement.addEventListener('click', () => {
      // Set the search input value to the selected suggestion
      searchInputAuto.value = suggestion;

      // Perform the search
      performSearch();
    });

    searchSuggestionsContainer.appendChild(suggestionElement);
  });
}

// Listen for user input in the search input field
searchInputAuto.addEventListener('input', () => {
  const searchTerm = searchInputAuto.value.trim().toLowerCase();

  // Fetch search suggestions from the server
  fetchSearchSuggestions(searchTerm)
    .then(suggestions => {
      // Update the search suggestions
      searchSuggestions = suggestions;

      // Show the search suggestions
      showSearchSuggestions(searchSuggestions);
    }
    );
});

// Create an array to store the saved searches
let savedSearches = [];

// Function to save the current search
function saveSearch() {
// Get the search criteria from the search input and advanced search form
const searchInput = document.getElementById('searchInput');
const searchTerm = searchInput.value.trim().toLowerCase();

const advancedSearchForm = document.getElementById('advancedSearchForm');
const formData = new FormData(advancedSearchForm);
const searchCriteria = {
name: formData.get('name'),
skills: formData.getAll('skills'),
location: formData.get('location'),
availability: formData.get('availability'),
rate: formData.get('rate'),
};

// Create a new saved search object
const savedSearch = {
name: searchTerm,
criteria: searchCriteria,
};

// Add the saved search to the array
savedSearches.push(savedSearch);

// Save the saved searches to local storage
localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
}

// Function to load the saved searches
function loadSavedSearches() {
// Get the saved searches from local storage
const savedSearchesJSON = localStorage.getItem('savedSearches');
if (savedSearchesJSON) {
savedSearches = JSON.parse(savedSearchesJSON);
}
}

// Function to display the saved searches
function showSavedSearches() {
// Clear previous saved searches
const savedSearchesContainer = document.getElementById('savedSearches');
savedSearchesContainer.innerHTML = '';

if (savedSearches.length === 0) {
savedSearchesContainer.textContent = 'No saved searches.';
return;
}

// Iterate over the saved searches and create HTML elements to display them
savedSearches.forEach(savedSearch => {
const savedSearchElement = document.createElement('li');
savedSearchElement.classList.add('saved-search');

// Customize the saved search element as per your design requirements
savedSearchElement.innerHTML = `
  <span class="saved-search-name">${savedSearch.name}</span>
  <button class="saved-search-delete-button">X</button>
`;

// Handle click event on the saved search delete button
const deleteButton = savedSearchElement.querySelector('.saved-search-delete-button');
deleteButton.addEventListener('click', () => {
  // Remove the saved search from the array
  const index = savedSearches.indexOf(savedSearch);
  savedSearches.splice(index, 1);

  // Save the updated saved searches to local storage
  localStorage.setItem('savedSearches', JSON.stringify(savedSearches));

  // Reload the saved searches
  loadSavedSearches();
  showSavedSearches();
});

savedSearchesContainer.appendChild(savedSearchElement);


});
}

// Load the saved searches on page load
loadSavedSearches();

// Show the saved searches
showSavedSearches();

// Handle click event on the save search button
const saveSearchButton = document.getElementById('saveSearchButton');
saveSearchButton.addEventListener('click', () => {
// Save the current search
saveSearch();

// Reload the saved searches
loadSavedSearches();
showSavedSearches();
});

// Implement the Search history feature

// Create an array to store the search history
let searchHistory = [];

// Function to add a search term to the search history
function addToSearchHistory(searchTerm) {
// Check if the search term is already in the search history
if (searchHistory.includes(searchTerm)) {
return;
}

// Add the search term to the search history
searchHistory.push(searchTerm);

// Save the search history to local storage
localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Function to show the search history
function showSearchHistory() {
// Clear previous search history
const searchHistoryContainer = document.getElementById('searchHistory');
searchHistoryContainer.innerHTML = '';

if (searchHistory.length === 0) {
searchHistoryContainer.textContent = 'No search history found.';
return;
}

// Iterate over the search history and create HTML elements to display them
searchHistory.forEach(searchTerm => {
const searchHistoryItem = document.createElement('li');
searchHistoryItem.classList.add('search-history-item');
searchHistoryItem.textContent = searchTerm;

// Handle click event on the search history item
searchHistoryItem.addEventListener('click', () => {
  // Set the search input value to the selected search history item
  const searchInput = document.getElementById('searchInput');
  searchInput.value = searchTerm;

  // Perform the search
  performSearch();
});

searchHistoryContainer.appendChild(searchHistoryItem);


});
}

// Load the search history from local storage
const searchHistoryJSON = localStorage.getItem('searchHistory');
if (searchHistoryJSON) {
searchHistory = JSON.parse(searchHistoryJSON);
}

// Show the search history
showSearchHistory();

// Handle search input submission
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', (event) => {
event.preventDefault();

// Get the search term from the search input
const searchInput = document.getElementById('searchInput');
const searchTerm = searchInput.value.trim().toLowerCase();

// Add the search term to the search history
addToSearchHistory(searchTerm);

// Perform the search
performSearch();
});