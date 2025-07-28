# 7-GUIs

Seven GUI Tasks - A Vue 3 implementation of the 7GUIs challenge.

## About 7GUIs

7 GUIs is a popular list of seven user interface development tasks. These tasks try to cover many challenges faced in UI development. Quoting the author of tasks list:

> There are countless GUI toolkits in different languages and with diverse approaches to GUI development. Yet, diligent comparisons between them are rare. Whereas in a traditional benchmark competing implementations are compared in terms of their resource consumption, here implementations are compared in terms of their notation. To that end, 7GUIs defines seven tasks that represent typical challenges in GUI programming.

## The Seven Tasks

1. **Counter** - A simple state management challenge
2. **Temperature Converter** - A bidirectional data flow challenge
3. **Flight Booker** - A form validation challenge
4. **Timer** - A reactive programming challenge
5. **CRUD** - A data management challenge
6. **Circle Drawer** - A mouse interaction challenge
7. **Cells** - A spreadsheet challenge

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Package Manager**: Bun

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Setup

```sh
bun install
```

### Development

```sh
# Start development server
bun dev

# Type check
bun run type-check

# Build for production
bun run build

# Preview production build
bun run preview
```

### Testing

```sh
# Run unit tests with Vitest
bun test:unit

# Run end-to-end tests with Playwright
bun test:e2e

# Run e2e tests on specific browser
bun test:e2e --project=chromium

# Run e2e tests in debug mode
bun test:e2e --debug
```

### Code Quality

```sh
# Lint and fix
bun lint

# Format code
bun run format
```

## Project Structure

```
src/
├── app/                 # Main application setup
│   ├── App.vue         # Root component
│   ├── router/         # Vue Router configuration
│   └── tailwind/       # Tailwind CSS setup
├── views/              # Page components
│   └── home/           # Home page
├── shared/             # Shared utilities and config
│   └── lib/            # Utility functions
└── main.ts             # Application entry point
```

## Contributing

This project implements the 7GUIs challenges using Vue 3. Each task will be implemented as a separate view/component demonstrating different aspects of Vue development.

## License

MIT
