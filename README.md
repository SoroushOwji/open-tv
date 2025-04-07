# Open TV

Open TV is a modern web application built with Vue 3, TypeScript, and Vite. It allows users to browse TV shows, search for specific shows or genres, and view detailed information about each show. The application leverages Pinia for state management, Vue Router for navigation, and Tailwind CSS for styling.

## Demo

![Demo](demo.gif)

## Features

- **Dark Mode**: Toggle between light and dark themes.
- **Search Functionality**: Search for TV shows by name or genre.
- **Show Details**: View detailed information about a specific show, including its schedule, genres, rating, and summary.
- **Responsive Design**: Fully responsive and optimized for various screen sizes.
- **Dynamic Routing**: Navigate seamlessly between pages using Vue Router.

## Tech Stack

- **Vue 3**: Frontend framework.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **Vite**: Fast build tool for modern web projects.
- **Pinia**: State management library.
- **Tailwind CSS**: Utility-first CSS framework.
- **Vitest**: Testing framework for unit tests.

## Consideration

As you know the project is using a third-party API and a suggested design that do not completely match. This brings forward issues in few areas and requires compromise. To me development is all about compromise and here I will talk a bit more about the "why" behind some decisions.

### Data Structure

1. **Genre:** The Api returns an array of shows with some details _(like an array of genre for each show)_, to categorize them based on genres that is also unknown I decided to create my own list of them.

2. **Categorize and Sort:** After having the genres it is possible to categorize shows, but first since we want a sorted result _(based on rating)_ I sort the whole list. This is better than sorting each category, since that will have overlaps _(each show has more than one genre)_ and would have an order of M\*N.

3. **Load More:** This implementation does not allow a load more behavior, we cannot request more videos based on category so requesting a second page doesn't guarantee extra movies in the specific category _(when scrolling horizontally)_ and wen you get to the vertical end of the page, requesting more would not result to a guarantee of extra genres. Also, just calling it at the end of each category and praying that it would give us more of that category wouldn't really work since we got to get the new data and sort it and then what should user see if there are more things with higher score coming in?

### Data fetching

Both pages of this app subscribe to one `useShowStore` that is for a good reason. The API returns all of the details in the calling of the list, and we can use the list data to avoid calling an extra API there are two basic user flows:

1. User starts from home page and then presses a show:
   1. Show list is fetched in home page
   2. Detail is available in store (cache hit)
2. User starts form a show detail page
   1. Detail is not available in store (cache miss)
   2. Show is fetched by `id`
   3. Show list is fetched and store is updated for when user goes to home page (prefetch)

This way the app only makes at most 2 api calls and the rest is done locally. We could just call the whole list and find what we need in the list, but this way we get to load the detail page faster (faster response on smaller data).

Lastly the app handles the ids that are non-existent in the list and will fetch their data separately.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js version `>=23.0.0` installed. You can use the `.nvmrc` file to set the correct version:
  ```bash
  nvm use
  ```

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:SoroushOwji/open-tv.git
   cd open-tv
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Build

To build the application for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

### Testing

Run the unit tests:

```bash
npm run test
```

## Project Structure

```
open-tv/
├── src/
│   ├── components/       # Reusable Vue components
│   ├── pages/            # Page-level components
│   ├── stores/           # Pinia stores for state management
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.vue           # Root component
│   ├── main.ts           # Application entry point
│   └── router/           # Vue Router configuration
├── public/               # Static assets
├── tests/                # Test files
├── .vscode/              # VSCode settings
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## API Integration

The application fetches TV show data from the [TVmaze API](https://www.tvmaze.com/api). Ensure you have a stable internet connection to retrieve data.

## Centralized State Management with Pinia

Open TV uses **Pinia** as a centralized state management solution to handle application-wide data efficiently. The `useShowStore` is a key part of the application, responsible for:

- **Fetching Data**: Retrieves TV show data and show details from the [TVmaze API](https://www.tvmaze.com/api).
- **Search Optimization**: Implements debounced search functionality to reduce unnecessary renders (in a real life scenario this would also be in charge of optimizing API calls) and improve performance.
- **Data Organization**: Categorizes shows by genres and provides filtered results based on user input.
- **Dynamic Routing Integration**: Synchronizes search parameters with the URL for a seamless user experience.

### Benefits of the Centralized Store

- **Reusability**: The store's state and actions can be accessed across multiple components, reducing code duplication.
- **Performance Optimization**: Debounced search and caching of fetched data minimize redundant API calls.
- **Maintainability**: Centralized logic makes it easier to debug and extend the application.
- **Scalability**: The store structure supports adding more features without significant refactoring.

### Key Features of `useShowStore`

- **State**: Manages the application's state, including the list of shows, genres, search input, and loading/error states.
- **Actions**: Provides methods to fetch data, update search input, and retrieve show details.
- **Getters**: Offers computed properties like `filteredShows` and `filteredGenres` for efficient data access.

By leveraging Pinia, Open TV ensures a clean, maintainable, and optimized architecture for managing application state.

## Acknowledgments

- [Vue.js](https://vuejs.org/)
- [TVmaze API](https://www.tvmaze.com/api)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
