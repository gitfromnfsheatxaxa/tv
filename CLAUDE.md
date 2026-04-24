# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (localhost:3000)
npm start

# Production build
npm run build

# Run tests
npm test

# Run a single test file
npm test -- --testPathPattern=ComponentName
```

All commands run from `tv-movie-app/`.

## Architecture

**Stack:** React 19 (Create React App), no TypeScript, plain CSS with CSS Variables, `@noriginmedia/norigin-spatial-navigation` v3 for TV remote control.

**Target platform:** Smart TVs (Samsung Tizen, LG WebOS) — all interactions are remote-control driven, not mouse/touch.

### Routing

There is no React Router. `App.js` maintains a `currentPage` string in local state and a `renderPage()` switch that mounts one of the page components from `src/pages/`. Navigation is triggered by the `SideMenu` component calling `setCurrentPage`.

### Spatial Navigation (Norigin)

Every interactive element must be wrapped with `useFocusable` from `@noriginmedia/norigin-spatial-navigation`. The pattern:

```js
const { ref, focused, onEnterPress } = useFocusable({
  focusKey: 'unique-key',
  onFocus: (layout) => { /* optionally scroll to keep in view */ },
  onEnterPress: () => { /* handle selection */ },
});
return <div ref={ref} className={focused ? 'focused' : ''}>...</div>;
```

Group related focusables with `FocusContext` (also from Norigin). `MovieRow` wraps its cards in a `FocusContext`; `App.js` wraps the side menu items similarly.

Norigin is initialized once in `src/index.js` with `SpatialNavigation.init(...)` before `ReactDOM.render`.

### Data Layer

`src/services/mockDataService.js` is the sole data source. It exports:
- `getFeaturedContent()` — single featured item
- `getCategories()` — 6 rows (Trending, Action, Sci-Fi, Drama, Top Shows, New)
- `getAllMovies()`, `getAllTVShows()`
- `getMoviesByGenre(genre)`, `getTVShowsByGenre(genre)`
- `searchContent(query)`, `getContentById(id)`

Each item carries gradient color arrays and an accent color used directly in component inline styles for card backgrounds.

### Styling

- `src/styles/variables.css` — all CSS custom properties (colors, spacing, typography, focus states, breakpoints). Import this before component CSS.
- `src/styles/global.css` — resets and TV-specific optimizations (`user-select: none`, `cursor: none`, smooth scroll).
- Each component has a co-located `.css` file.

**Focus state convention:** focused cards get a 6px red (`var(--focus-ring-color)`) box-shadow and `scale(1.15)` transform. Use `var(--transition-normal)` (0.2s ease) for all transitions.

**TV layout:** Cards are `200×280px`. Rows auto-scroll horizontally to keep the focused card in view using `scrollIntoView` or manual `scrollLeft` adjustment in the `onFocus` callback.

### What Is Not Yet Implemented

Per `ARCHITECTURE.md` and `TASK_LIST.md`: search modal, video player, detail modal, Context API state management, error boundaries. The hooks/ and context/ directories exist but are empty.
