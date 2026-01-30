# Movie Search App (OMDb API)

A lightweight and responsive Movie Search application built using **HTML, CSS, and JavaScript**.  
The app allows users to search for movies, series, or episodes using the **OMDb API**, apply filters, and navigate results with pagination.

This project demonstrates API integration using `fetch` with `async/await`, dynamic DOM manipulation, and basic user experience handling.

---

## Project Overview

The Movie Search App enables users to:
- Search content by title
- Filter results by type (movie, series, episode)
- Optionally filter by release year
- View search results with posters and basic metadata
- Navigate results using pagination

The application uses the OMDb `s=` search endpoint and handles loading, error, and empty states gracefully.

---

## Key Features

- Search by title (debounced input) using OMDb s= search endpoint.
- Filter by type (type=movie|series|episode) and year (y=).
- Display poster, title, year, and type; fallback image for missing posters.
- Pagination support (OMDb returns max 10 results per page; uses page=).
- Loading indicator, friendly error / empty-state messages.
- Clear instructions to insert your OMDb API key.

---

## Technologies Used

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- OMDb API  
- Fetch API  
- Async / Await  

---

## OMDb API Key Setup

This project requires an OMDb API key.

### Step 1: Generate an API Key
Visit the official OMDb website and generate a free API key:
https://www.omdbapi.com/

### Step 2: Add API Key
Open the JavaScript file and replace the placeholder:

