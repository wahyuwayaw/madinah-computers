(function() {
  'use strict';
  
  var API_BASE = '/madinah/api';
  
  var KEY_MAP = {
    'cp_data_hero': 'hero',
    'cp_data_about': 'about',
    'cp_data_services_v2': 'services',
    'cp_data_software': 'software',
    'cp_data_bidang': 'bidang',
    'cp_data_core_services': 'core_services',
    'cp_data_footer': 'footer'
  };
  
  var cache = {};
  
  // SYNCHRONOUS preload using XMLHttpRequest
  function syncFetch(url) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false); // false = synchronous
      xhr.send(null);
      if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
      }
    } catch(e) {}
    return null;
  }
  
  // Preload ALL data synchronously before React starts
  var allData = syncFetch(API_BASE + '/all');
  if (allData) {
    for (var key in allData) {
      cache[key] = allData[key];
    }
  } else {
    // Fallback: fetch individually
    for (var mapKey in KEY_MAP) {
      var apiKey = KEY_MAP[mapKey];
      var data = syncFetch(API_BASE + '/data/' + apiKey);
      if (data) cache[apiKey] = data;
    }
  }
  
  var origGet = Storage.prototype.getItem;
  var origSet = Storage.prototype.setItem;
  var origRem = Storage.prototype.removeItem;
  
  Storage.prototype.getItem = function(key) {
    var apiKey = KEY_MAP[key];
    if (apiKey) {
      if (cache[apiKey] !== undefined) return JSON.stringify(cache[apiKey]);
      return null;
    }
    return origGet.call(this, key);
  };
  
  Storage.prototype.setItem = function(key, value) {
    var apiKey = KEY_MAP[key];
    if (apiKey) {
      var parsed;
      try { parsed = JSON.parse(value); } catch(e) { return; }
      // Save to API
      var xhr = new XMLHttpRequest();
      xhr.open('POST', API_BASE + '/data/' + apiKey, false);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(parsed));
      cache[apiKey] = parsed;
      return;
    }
    if (key === 'cp_admin_auth') {
      try {
        var auth = JSON.parse(value);
        if (auth && auth.loggedIn) origSet.call(this, 'cp_admin_token', 'madinah_admin_2026');
      } catch(e) {}
    }
    origSet.call(this, key, value);
  };
  
  Storage.prototype.removeItem = function(key) {
    if (KEY_MAP[key]) {
      delete cache[KEY_MAP[key]];
      return;
    }
    origRem.call(this, key);
  };
  
  console.log('[Madinah DB] localStorage → MySQL adapter active (sync preload)');
})();
