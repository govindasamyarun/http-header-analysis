var total = 0;

function set(id, key, value) {
  document.getElementById('lbl_' + id).innerHTML = key;
  document.getElementById(id).innerHTML = value;
}

getSelectedTab(function(tab) {
  chrome.storage.local.get('cache', function(data) {
    var t = data.cache['tab' + tab.id];

    set('x_frame_options', 'X-Frame-Options', t.x_frame_options);
    set('hsts', 'Strict-Transport-Security', t.hsts);
    set('x_xss_protection', 'X-XSS-Protection', t.x_xss_protection);
    set('csp', 'Content-Security-Policy', t.csp);
    set('x_content_type_options', 'X-Content-Type-Options', t.x_content_type_options);
    set('referrer_policy', 'Referrer-Policy', t.referrer_policy);
  });
});