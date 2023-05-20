# Reddit User Tag

Reddit User Tag is a Google Chrome extension designed to highlight specific users on Reddit.com with a customizable tag. When browsing Reddit, the extension identifies any tagged users in the comments and tags them with a red background tag for easy identification. Additionally, it provides a popup interface for adding, removing, and managing user tags.

## Installation

1. Download the Reddit User Tag Chrome extension.
2. Open the Google Chrome browser and navigate to `chrome://extensions`.
3. Enable the Developer mode in the top right corner of the Extensions page.
4. Click on "Load unpacked".
5. Select the folder that contains the Reddit User Tag extension and click "Open".
6. The extension should now appear in your list of installed Chrome extensions.

## Usage

### Managing User Tags

1. Click on the Reddit User Tag icon next to the address bar to open the popup interface.
2. In the text area provided, enter the Reddit usernames and their corresponding tags, one per line, in the format `username,tag`.
3. Click "Add" to add the usernames and tags to the list.
4. The list of tagged users appears in the popup interface. If you want to delete all saved usernames and their tags, click "Delete All Saved".
5. You can also export the list of tagged usernames to a CSV file by clicking "Export to CSV" or import from a CSV file using the "Import and Replace" or "Import and Add" buttons.

### Browsing Reddit

1. If a tagged user appears in the comments section of a Reddit page, a tag with a red background is appended next to their username.
2. If there are tagged users on a page, an alert will appear, listing all the tagged users on that page.
3. A button labeled "Copy tagged users" will appear on the bottom right corner of the page when tagged users are detected. Clicking this button will copy the list of tagged users to the clipboard in the format `/u/username` with a blank line between each username.
