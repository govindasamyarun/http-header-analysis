var isChrome = typeof browser === "undefined";

function getSelectedTab(callback) {
  chrome.tabs.query({active: true}).then(function(tabs) {
    callback(tabs[0]);
  });
}