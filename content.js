let taggedUsers = [];
let alertedUsers = [];

function addTags(usernames) {
    let authors = document.querySelectorAll('p > a');

    authors.forEach(function(author) {
      let username = author.textContent.startsWith('/u/') ? author.textContent.slice(3) : author.textContent.startsWith('u/') ? author.textContent.slice(2) : author.textContent;

      if (username in usernames) {
        // Check if the user has already been tagged to avoid multiple tags
        if (!author.nextSibling || author.nextSibling.className !== 'reddit-user-tag') {
          let tag = document.createElement('span');
          tag.textContent = `[${usernames[username]}]`;
          tag.className = 'reddit-user-tag';
          tag.style.backgroundColor = 'red';
          tag.style.color = 'white'; // set tag text color to white for better visibility
          tag.style.padding = '2px'; // add some padding
          author.parentNode.insertBefore(tag, author.nextSibling);
          if (!taggedUsers.includes(username)) {
            taggedUsers.push(username); // Add tagged username to the list
          }
        }
      }
    });

    // Get any new users that have been tagged since the last alert
    let newTaggedUsers = taggedUsers.filter(username => !alertedUsers.includes(username));

    if (newTaggedUsers.length > 0) {
      alert(`These tagged users were found on this page: ${newTaggedUsers.join(', ')}`);
      alertedUsers = [...taggedUsers]; // Update the list of users that we have already alerted about
    }
}

// Create a MutationObserver to monitor the page for changes.
let observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length) {
      chrome.runtime.sendMessage({message: 'getUsernames'}, function(response) {
        addTags(response.data);
      });
    }
  });
});

let config = { childList: true, subtree: true };

// Start observing the page with configured parameters.
observer.observe(document.body, config);

// Also run addTags when the page initially loads.
chrome.runtime.sendMessage({message: 'getUsernames'}, function(response) {
  addTags(response.data);
});
