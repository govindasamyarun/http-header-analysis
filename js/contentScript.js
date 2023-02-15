// Capture performanceTiming metrics 
// No use of performance metrics 
// To print the message on the extension icon

window.addEventListener("load", perftiming, false);
function perftiming (evt) {
	    chrome.runtime.sendMessage({chrome_message: "msg", count: "0"}, function(response) {
	});
}