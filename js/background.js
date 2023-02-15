var header_msg = "";

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var tab_id = tabs[0].id;
    chrome.action.setBadgeText({text: "Done", tabId: tab_id});
    chrome.action.setPopup({tabId: tab_id, popup: "html/popup.html"});
  });
  sendResponse({chrome_response:"Done"}); 
});

// Capture browser headers 
chrome.webRequest.onHeadersReceived.addListener(function (header) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var current_url = tabs[0].url;
    var tab_id = tabs[0].id;
    var x_frame_options = "";
    var hsts = "";
    var x_xss_protection = "";
    var csp = "";
    var x_content_type_options = "";
    var referrer_policy = "";
    var header_obj = {};
    if (header["url"] === current_url) {
      header["responseHeaders"].forEach(function (item) {
        header_obj[item["name"].toLowerCase()] = item["value"].toLowerCase()
      });
      if (header_obj.hasOwnProperty("x-frame-options")) {
        x_frame_options = "Enforced";
      } else {
        x_frame_options = "Missing";
      }
      if (header_obj.hasOwnProperty('strict-transport-security')) {
        hsts = "Enforced";
      } else {
        hsts = "Missing";
      }
      if (header_obj.hasOwnProperty('x-xss-protection')) {
        x_xss_protection = "Enforced";
      } else {
        x_xss_protection = "Missing";
      }
      if (header_obj.hasOwnProperty('content-security-policy')) {
        csp = "Enforced";
      } else {
        csp = "Missing";
      }
      if (header_obj.hasOwnProperty('x-content-type-options')) {
        x_content_type_options = "Enforced";
      } else {
        x_content_type_options = "Missing";
      }
      if (header_obj.hasOwnProperty('referrer-policy')) {
        referrer_policy = "Enforced";
      } else {
        referrer_policy = "Missing";
      }




      chrome.storage.local.get('cache', function (data) {
        if (!data.cache) data.cache = {};
        data.cache['tab' + tab_id] = {
          "current_url": current_url,
          "x_frame_options": x_frame_options,
          "hsts": hsts,
          "x_xss_protection": x_xss_protection,
          "csp": csp,
          "x_content_type_options": x_content_type_options,
          "referrer_policy": referrer_policy
        };
        chrome.storage.local.set(data);
      });
    }
  });
},
  { urls: ["*://*/*"] },
  ["responseHeaders"]
);

chrome.tabs.onRemoved.addListener(function (tabId) {
  chrome.storage.local.get('cache', function (data) {
    if (data.cache) delete data.cache['tab' + tabId];
      chrome.storage.local.set(data);
  });
});
