const API_KEY = '581144cc';
const BASE_URL = 'https://www.omdbapi.com/';

const qInput = document.getElementById('query');
const typeSelect = document.getElementById('type');
const yearInput = document.getElementById('year');
const searchBtn = document.getElementById('search');
const resultE1 = document.getElementById('results');
const statusEl = document.getElementById('status');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1;
let totalPages = 0;
let lastQuery = '';

/* helper: build URL */
function buildUrl(params = {}) {
    const url = new URL(BASE_URL);
    url.searchParams.set('apikey', API_KEY);

    Object.keys(params).forEach(k => {
        if (params[k] !== '' && params[k] != null) url.searchParams.set(k, params[k]);
    });
    return url.toString();
}

/* debounce helper to avoid too many requests while typing 300ms ruk ke search ho */
function debounce(fn, wait = 300) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

/* show loading */

function setLoading(loading=true) {
    if (loading) {
        statusEl.innerHTML = `<span class="loading">Searching…</span>`;
    }else {
        statusEl.textContent = '';
    }
}

/* render empty / error */
function showMessage(msg, isError=false) {
    resultE1.innerHTML = `<div class="${isError ? 'err' : 'muted'}">${msg}</div>`;
    pageInfo.textContent = `page 0 of 0`;
    prevBtn.disabled = nextBtn.disabled = true;
}

/* render result cards */
function renderResults(list) {
    if (!Array.isArray(list) || list.length === 0) {
        showMessage("No result found.");
        return;
    }
}