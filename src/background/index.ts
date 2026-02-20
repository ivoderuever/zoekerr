chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-search') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0]?.id;
      if (activeTabId) {
        chrome.tabs.sendMessage(activeTabId, { action: 'toggle-search' });
      }
    });
  }
});