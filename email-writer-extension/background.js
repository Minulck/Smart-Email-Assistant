// background.js
// This is a minimal background service worker for debugging/inspection.
chrome.runtime.onInstalled.addListener(() => {
  console.log('Email Writer Assistant background worker installed.');
});
