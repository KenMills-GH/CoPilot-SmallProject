# Bucks2Bar - Income & Expense Tracker

## Project Overview

Simple client-side web app for tracking monthly income/expenses with chart visualization. No build process - open `index.html` directly in a browser.

## Architecture

- **Single-page application** with two tabs (Data/Chart) using Bootstrap 5 tabs
- **No backend or persistence** - data exists only in DOM input fields
- **Monthly granularity** - hardcoded 12 months (Jan-Dec) with fixed month labels
- **Chart.js** for visualization - bar chart comparing income vs expenses

## Key Components

- [index.html](index.html): Bootstrap 5 UI with 12 pairs of income/expense inputs (ids: `income-{month}`, `expense-{month}`)
- [script.js](script.js): Chart initialization, data sync, and image export

## Data Flow

1. Input values stored directly in HTML `<input>` elements with specific IDs
2. Chart updates when switching to Chart tab (Bootstrap `shown.bs.tab` event)
3. `updateChart()` reads all 24 input values via `getElementById()` and syncs to Chart.js datasets

## Naming Conventions

- **Month IDs**: lowercase 3-letter abbreviation (`jan`, `feb`, ..., `dec`)
- **CSS classes**: Bootstrap utility classes + semantic names (`income-input`, `expense-input`)
- **Global variables**: `months` array (display names), `budgetChart` (Chart.js instance)

## Development Workflow

- No build/compile - edit HTML/JS and refresh browser
- Test locally: open [index.html](index.html) in browser (no server required)
- Bootstrap/Chart.js loaded via CDN - no package manager

## Critical Patterns

- **Input ID pattern**: `income-{month}` and `expense-{month}` where month is lowercase 3-char
- **Chart update trigger**: Manual via `shown.bs.tab` event, not automatic on input change
- **Default values**: Hardcoded in HTML value attributes (e.g., `value="450"`)
- **Data extraction**: `parseFloat(element.value) || 0` pattern for safe number parsing

## Adding Features

- To add input change listeners: attach to `.income-input` and `.expense-input` classes
- To modify chart appearance: update `budgetChart.options` in [script.js](script.js#L15-L54)
- To change months: must update both `months` array (line 1) and `monthAbbrev` array (line 86)
- New tab: add to [index.html](index.html#L20-L42) nav + content section, follow Bootstrap tab pattern

## Dependencies

External (CDN-only):

- Bootstrap 5.3.2 (UI framework + tab component)
- Chart.js 4.4.1 (bar chart rendering)

## Known Limitations

- No data persistence (refreshing page loses changes)
- Chart doesn't auto-update on input change (must switch tabs)
- Fixed 12-month structure (not dynamic/configurable)
