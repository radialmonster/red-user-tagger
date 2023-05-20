let taggedUsers = [];
let alertedUsers = [];

function addTags(usernames) {
    let authors = document.querySelectorAll('p > a');
    let tagButtonExists = document.getElementById('tagButton'); // Check if the button exists

    authors.forEach(function(author) {
      let username = author.textContent.startsWith('/u/') ? author.textContent.slice(3) : author.textContent.startsWith('u/') ? author.textContent.slice(2) : author.textContent;

      if (username in usernames) {
        if (!author.nextSibling || author.nextSibling.className !== 'reddit-user-tag') {
          let tag = document.createElement('span');
          tag.textContent = `[${usernames[username]}]`;
          tag.className = 'reddit-user-tag';
          tag.style.backgroundColor = 'red';
          tag.style.color = 'white';
          tag.style.padding = '2px';
          author.parentNode.insertBefore(tag, author.nextSibling);
          if (!taggedUsers.includes(username)) {
            taggedUsers.push(username);
          }
        }
      }
    });

    let newTaggedUsers = taggedUsers.filter(username => !alertedUsers.includes(username));

    if (newTaggedUsers.length > 0) {
      alert(`These tagged users were found on this page: ${newTaggedUsers.join(', ')}`);
      alertedUsers = [...taggedUsers];
      if (!tagButtonExists) {
        createTagButton();  // Create button if not already existing
      }
    }
}

function createTagButton() {
  let button = document.createElement('button');
  button.id = 'tagButton';
  button.innerHTML = 'Copy tagged users';
  button.onclick = copyToClipboard;
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.padding = '10px';
  button.style.zIndex = '1000'; // Ensure the button appears on top of other elements
  document.body.appendChild(button);
}


function copyToClipboard() {
  let textToCopy = taggedUsers.map(username => `/u/${username}`).join('\n\n');
  navigator.clipboard.writeText(textToCopy).then(function() {
    console.log('Tagged usernames copied to clipboard');
  }, function(err) {
    console.error('Could not copy tagged usernames: ', err);
  });
}


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
observer.observe(document.body, config);

chrome.runtime.sendMessage({message: 'getUsernames'}, function(response) {
  addTags(response.data);
});
