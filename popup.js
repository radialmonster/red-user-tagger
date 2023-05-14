// Function to update the display of usernames and their tags.
function displayUsernames() {
  chrome.storage.local.get('usernames', function(data) {
    const list = document.getElementById('list');
    list.innerHTML = '';

    for (let user in data.usernames) {
      const item = document.createElement('p');
      item.textContent = `${user}: ${data.usernames[user]}`;
      list.appendChild(item);
    }
  });
}

// Add a list of usernames and their tags when the Add button is clicked.
document.getElementById('add').addEventListener('click', function() {
  const userlist = document.getElementById('userlist').value;
  const lines = userlist.split('\n');

  chrome.storage.local.get('usernames', function(data) {
    // Create a new object and assign data.usernames to it if it exists, or assign an empty object if it doesn't
    let usernames = data.usernames || {};

    lines.forEach(function(line) {
      const [username, tag] = line.split(',');

      if (username && tag) {
        usernames[username.trim()] = tag.trim();
      }
    });

    chrome.storage.local.set({usernames: usernames}, function() {
      displayUsernames();
    });
  });
});


// Clear all usernames and their tags when the Clear button is clicked.
document.getElementById('clear').addEventListener('click', function() {
  chrome.storage.local.set({usernames: {}}, function() {
    displayUsernames();
  });
});

// Display the list of usernames and their tags when the popup is opened.
displayUsernames();
