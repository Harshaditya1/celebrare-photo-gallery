# Celebrare Photo Gallery

A responsive photo gallery built with React, Vite, and Tailwind CSS as part of the Celebrare Frontend Intern Pre-Screening Assignment.

## Features

- Fetches 30 photos from the Picsum Photos API.
- Displays photos in a responsive grid.
- Searches photos by author name in real time.
- Adds and removes favourites using React `useReducer`.
- Persists favourites across page refreshes using `localStorage`.
- Handles loading and API error states.
- Uses a custom `useFetchPhotos` hook.
- Uses `useCallback` and `useMemo` for the search functionality.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Picsum Photos API
- JavaScript

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Harshaditya1/celebrare-photo-gallery.git
```

Navigate to the project folder:

```bash
cd celebrare-photo-gallery
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal.

## API

`https://picsum.photos/v2/list?limit=30`

## Assignment

Celebrare — Frontend Intern Pre-Screening Assignment.
