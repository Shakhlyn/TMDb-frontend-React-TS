# Movie Catalogue Website

This project is a movie catalogue website built using ReactJS and TypeScript, leveraging The Movie Database (TMDb) API to fetch movie information. The goal of this project is to provide users with a platform where they can explore movies based on different genres, add movies to their watchlist, and view detailed information about each movie.

## Features

### Phase 1: Front Page

- **Genre-based Random Movies**: Five random movie names along with their poster images are displayed for each movie genre.
- **Listing of Movies**: Users can browse a list of movies released in the last 2 months, including the current month. The list dynamically populates as the user scrolls.

### Phase 2: Movie Detail Page

- **Movie Information**: Detailed information about each movie, including title, overview, poster image, IMDb link, rating, cast, crew, and related movies.
- **Linking**: All movies on the front page and genre pages are linked to their corresponding movie detail page.

### Phase 3: Watchlist Functionality

- **Add to Watchlist**: Users can add movies to their watchlist from the front page or movie detail page using an "add to watchlist" icon.
- **Watchlist Page**: Users can view a listing of all movies on their watchlist, sorted by the date they were added.

## Technologies Used

- **ReactJS**
- **TypeScript**
- **Redux Toolkit along with RTK Query**
- **Tailwind CSS**
- **TMDb API**: External API for fetching movie data.

## Key functionalities:

- Infinite Scrolling
- Updated movie list according to the range of two dates--start date and end date.

## What I have learned:

- TypeScript language
- Integration with React JS
- Using TypeScript with RTK and RTK query
- Implementation of **Infinite Scrolling** with React

## Setup Instructions

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Obtain a TMDb API key from [TMDb website](https://www.themoviedb.org/documentation/api) and add it to the project configuration.
4. Start the development server using `npm run dev`.

## Usage

- Browse through the list of movies on the front page.
- Explore movies based on different genres.
- View detailed information about each movie.
- Add movies to your watchlist for future reference.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.
