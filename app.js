// ================= CONFIG =================
const API_KEY = "581144cc";
const BASE_URL = "https://www.omdbapi.com/";

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

    // ---------- DOM ELEMENTS ----------
    const qInput = document.getElementById("query");
    const typeSelect = document.getElementById("type");
    const yearInput = document.getElementById("year");
    const searchBtn = document.getElementById("searchBtn");
    const resultsEl = document.getElementById("results");
    const statusEl = document.getElementById("status");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pageInfo = document.getElementById("pageInfo");

    // ---------- STATE ----------
    let currentPage = 1;
    let totalPages = 0;
    let lastQuery = "";

    // ---------- BUILD URL ----------
    function buildUrl(params = {}) {
        const url = new URL(BASE_URL);
        url.searchParams.set("apikey", API_KEY);

        Object.keys(params).forEach(key => {
            if (params[key]) {
                url.searchParams.set(key, params[key]);
            }
        });

        return url.toString();
    }

    // ---------- DEBOUNCE ----------
    function debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    // ---------- LOADING ----------
    function setLoading(isLoading) {
        if (isLoading) {
            statusEl.innerHTML = `<span class="loading">Searching...</span>`;
        } else {
            statusEl.textContent = "";
        }
    }

    // ---------- MESSAGE ----------
    function showMessage(msg, isError = false) {
        resultsEl.innerHTML = `<div class="${isError ? "err" : "muted"}">${msg}</div>`;
        pageInfo.textContent = "Page 0 of 0";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    }

    // ---------- RENDER RESULTS ----------
    function renderResults(list) {
        resultsEl.innerHTML = "";

        list.forEach(item => {
            const card = document.createElement("article");
            card.className = "card-item";

            const img = document.createElement("img");
            img.className = "poster";
            img.src =
                item.Poster && item.Poster !== "N/A"
                    ? item.Poster
                    : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%230a0a0a'/><text x='50%' y='50%' fill='%239aa4b2' font-size='18' text-anchor='middle'>No Poster</text></svg>";

            const title = document.createElement("div");
            title.className = "title";
            title.textContent = item.Title;

            const sub = document.createElement("div");
            sub.className = "subtitle";
            sub.textContent = `${item.Year} • ${item.Type}`;

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(sub);

            if (item.imdbID) {
                card.style.cursor = "pointer";
                card.addEventListener("click", () => {
                    window.open(`https://www.imdb.com/title/${item.imdbID}/`, "_blank");
                });
            }

            resultsEl.appendChild(card);
        });
    }

    // ---------- SEARCH ----------
    async function searchMovies(query, options = {}) {
        if (!query.trim()) {
            showMessage("Please enter a movie name");
            return;
        }

        setLoading(true);

        try {
            const url = buildUrl({
                s: query,
                page: options.page || 1,
                type: options.type,
                y: options.year
            });

            const res = await fetch(url);
            const data = await res.json();

            if (data.Response === "False") {
                showMessage(data.Error);
                setLoading(false);
                return;
            }

            renderResults(data.Search);

            const totalResults = parseInt(data.totalResults, 10);
            totalPages = Math.ceil(totalResults / 10);

            currentPage = options.page || 1;
            lastQuery = query;

            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;

            setLoading(false);
        } catch (err) {
            console.error(err);
            showMessage("Request failed. Check console.", true);
            setLoading(false);
        }
    }

    // ---------- EVENTS ----------
    const doSearch = debounce(() => {
        currentPage = 1;
        searchMovies(qInput.value, {
            page: 1,
            type: typeSelect.value,
            year: yearInput.value
        });
    }, 400);

    qInput.addEventListener("input", doSearch);
    typeSelect.addEventListener("change", doSearch);
    yearInput.addEventListener("input", doSearch);

    searchBtn.addEventListener("click", e => {
        e.preventDefault();
        doSearch();
    });

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            searchMovies(lastQuery, {
                page: currentPage - 1,
                type: typeSelect.value,
                year: yearInput.value
            });
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            searchMovies(lastQuery, {
                page: currentPage + 1,
                type: typeSelect.value,
                year: yearInput.value
            });
        }
    });

    // ---------- INITIAL ----------
    showMessage("Enter a movie name to search");

});
