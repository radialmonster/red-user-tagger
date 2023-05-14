// Function to update the display of usernames and their tags.
function displayUsernames() {
  chrome.storage.local.get('usernames', function(data) {
    const list = document.getElementById('list');
    list.innerHTML = '';

    if (data && data.usernames) {
      const fragment = document.createDocumentFragment();

      for (let user in data.usernames) {
        const item = document.createElement('p');
        item.textContent = `${user}: ${data.usernames[user]}`;
        fragment.appendChild(item);
      }

      list.appendChild(fragment);
    }
  });
}

// Add a list of usernames and their tags when the Add button is clicked.
document.getElementById('add').addEventListener('click', function() {
  const userlist = document.getElementById('userlist').value;
  const lines = userlist.split('\n');

  chrome.storage.local.get('usernames', function(data) {
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

// Export usernames and their tags to a CSV file when the Export button is clicked.
document.getElementById('export').addEventListener('click', function() {
  chrome.storage.local.get('usernames', function(data) {
    let csvContent = 'username,tag\n';

    for (let user in data.usernames) {
      csvContent += `${user},${data.usernames[user]}\n`;
    }

    let blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    let url = URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'usernames.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// Import usernames and their tags from a CSV file when the Import buttons are clicked.
document.getElementById('import-replace').addEventListener('click', function() {
  importCSV(true);
});

document.getElementById('import-add').addEventListener('click', function() {
  importCSV(false);
});

function importCSV(replace) {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a CSV file first.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const contents = e.target.result;
    const lines = contents.split('\n');

    chrome.storage.local.get('usernames', function(data) {
      let usernames = replace ? {} : data.usernames || {};
      let importCount = 0;

      lines.forEach(function(line) {
        const [username, tag] = line.split(',');

        if (username && tag) {
          usernames[username.trim()] = tag.trim();
          importCount++;
        }
      });

      chrome.storage.local.set({usernames: usernames}, function() {
        displayUsernames();
        alert(importCount > 0 ? 'Imported successfully.' : 'No valid data to import.');
      });
    });
  };

  reader.onerror = function() {
    alert('Failed to read file');
    reader.abort();
  };

  reader.readAsText(file);
}

// Display the list of usernames and their tags when the popup is opened.
displayUsernames();
