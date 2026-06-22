(function() {
  'use strict';
  
  var API_BASE = '/api';
  var CACHE_KEY = '_cp_cache';
  var CACHE_TTL = 30000;
  
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
  var cacheTimestamps = {};
  var fetchPromises = {};
  
  try {
    var stored = sessionStorage.getItem(CACHE_KEY);
    if (stored) {
      var parsed = JSON.parse(stored);
      cache = parsed.data || {};
      cacheTimestamps = parsed.ts || {};
    }
  } catch(e) {}
  
  function saveCache() {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: cache, ts: cacheTimestamps })); } catch(e) {}
  }
  
  function isCacheValid(key) {
    return cache[key] && (Date.now() - (cacheTimestamps[key] || 0)) < CACHE_TTL;
  }
  
  function fetchFromAPI(apiKey) {
    if (fetchPromises[apiKey]) return fetchPromises[apiKey];
    fetchPromises[apiKey] = fetch(API_BASE + '/data/' + apiKey)
      .then(function(r) { return r.ok ? r.json() : null; })
      .then(function(data) {
        cache[apiKey] = data;
        cacheTimestamps[apiKey] = Date.now();
        saveCache();
        delete fetchPromises[apiKey];
        return data;
      })
      .catch(function() { delete fetchPromises[apiKey]; return null; });
    return fetchPromises[apiKey];
  }
  
  function fetchAll() {
    fetch(API_BASE + '/all')
      .then(function(r) { return r.ok ? r.json() : {}; })
      .then(function(data) {
        for (var apiKey in data) {
          cache[apiKey] = data[apiKey];
          cacheTimestamps[apiKey] = Date.now();
        }
        saveCache();
      })
      .catch(function() {});
  }
  
  fetchAll();
  
  function saveToAPI(apiKey, value) {
    var token = sessionStorage.getItem('cp_admin_token') || '';
    fetch(API_BASE + '/data/' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(value)
    })
    .then(function(r) {
      if (r.ok) {
        cache[apiKey] = value;
        cacheTimestamps[apiKey] = Date.now();
        saveCache();
      }
    })
    .catch(function() {});
  }
  
  var origGet = Storage.prototype.getItem;
  var origSet = Storage.prototype.setItem;
  var origRem = Storage.prototype.removeItem;
  
  Storage.prototype.getItem = function(key) {
    var apiKey = KEY_MAP[key];
    if (apiKey) {
      if (isCacheValid(apiKey)) return JSON.stringify(cache[apiKey]);
      fetchFromAPI(apiKey);
      if (cache[apiKey] !== undefined) return JSON.stringify(cache[apiKey]);
      return null;
    }
    return origGet.call(this, key);
  };
  
  Storage.prototype.setItem = function(key, value) {
    var apiKey = KEY_MAP[key];
    if (apiKey) {
      try { saveToAPI(apiKey, JSON.parse(value)); } catch(e) {}
      origSet.call(this, key, value);
      return;
    }
    if (key === 'cp_admin_auth') {
      try {
        var auth = JSON.parse(value);
        if (auth && auth.loggedIn) sessionStorage.setItem('cp_admin_token', 'madinah_admin_2026');
      } catch(e) {}
    }
    origSet.call(this, key, value);
  };
  
  Storage.prototype.removeItem = function(key) {
    if (KEY_MAP[key]) {
      delete cache[KEY_MAP[key]];
      delete cacheTimestamps[KEY_MAP[key]];
      saveCache();
    }
    origRem.call(this, key);
  };
  
  console.log('[Madinah DB] localStorage → MySQL adapter active (Express)');
})();
