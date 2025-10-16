const form = document.getElementById('itemForm');
const donateTable = document.getElementById('donateTable').querySelector('tbody');
const requestTable = document.getElementById('requestTable').querySelector('tbody');

// Load saved items from localStorage
window.onload = function() {
  loadItems();
};

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('itemName').value.trim();
  const category = document.getElementById('itemCategory').value.trim();
  const type = document.getElementById('itemType').value;

  if (name && category) {
    const item = { name, category, type };
    addItemToTable(item);
    saveItem(item);
    form.reset();
  }
});

// Function to add a row to the correct table
function addItemToTable(item) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${item.name}</td>
    <td>${item.category}</td>
    <td><button class="delete-btn" onclick="deleteRow(this, '${item.type}')">Delete</button></td>
  `;

  if (item.type === 'donate') {
    donateTable.appendChild(row);
  } else {
    requestTable.appendChild(row);
  }
}

// Function to delete a row (and update localStorage)
function deleteRow(button, type) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].innerText;
  const category = row.cells[1].innerText;
  row.remove();

  // Remove from localStorage
  const items = JSON.parse(localStorage.getItem('items')) || [];
  const updatedItems = items.filter(
    item => !(item.name === name && item.category === category && item.type === type)
  );
  localStorage.setItem('items', JSON.stringify(updatedItems));
}

// Function to save a new item in localStorage
function saveItem(item) {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

// Function to load items from localStorage when page loads
function loadItems() {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  items.forEach(item => addItemToTable(item));
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
