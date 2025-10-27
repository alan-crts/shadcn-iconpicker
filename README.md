# Shadcn Icon Picker

A sleek and customizable icon picker component for React, built with shadcn/ui and Lucide Icons.

<div align="center">
  <img src="https://raw.githubusercontent.com/alan-crts/shadcn-iconpicker/refs/heads/main/public/preview.gif" width="600" />
</div>

## Features

- 🎨 Modern and responsive UI
- 🔍 Real-time icon search
- ⚡️ Progressive icon loading
- 🎯 Full Lucide icons support
- 🌗 Dark mode compatible
- 🎛️ Highly customizable

## Installation

### Using npm
```shell
npx shadcn@latest add "https://icon-picker.alan-courtois.fr/r/icon-picker"
```

### Using pnpm
```shell
pnpm dlx shadcn@latest add "https://icon-picker.alan-courtois.fr/r/icon-picker"
```

### Using Yarn
```shell
npx shadcn@latest add "https://icon-picker.alan-courtois.fr/r/icon-picker"
```

### Using Bun
```shell
bunx shadcn@latest add "https://icon-picker.alan-courtois.fr/r/icon-picker"
```

## Usage

```tsx
import { IconPicker } from "@/components/ui/iconPicker";
  
export default function Home() {
  return <IconPicker />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `IconName` | - | The controlled value of the selected icon |
| `defaultValue` | `IconName` | - | The default value of the selected icon |
| `onValueChange` | `(value: IconName) => void` | - | Callback invoked when an icon is selected |
| `open` | `boolean` | - | Controlled open state of the picker |
| `defaultOpen` | `boolean` | `false` | Default open state of the picker |
| `onOpenChange` | `(open: boolean) => void` | - | Callback invoked when the open state changes |
| `children` | `ReactNode` | - | The trigger element to open the icon picker |
| `searchable` | `boolean` | `true` | Whether the icon picker is searchable |
| `searchPlaceholder` | `string` | "Search for an icon..." | The placeholder for the search input |
| `triggerPlaceholder` | `string` | "Select an icon" | The text displayed on the default trigger button when no icon is selected |
| `iconsList` | `IconList` | all lucide icons | The list of icons to display in the picker |
| `categorized` | `boolean` | `true` | Display icons in categories and add categories buttons to scroll to the desired category |
| `modal` | `boolean` | `false` | Whether the icon picker is being rendered in a modal |

## Development

### Clone the repository
```shell
git clone https://github.com/alan-crts/shadcn-iconpicker.git
```

### Install dependencies
```shell
npm install
```

### Start development server
```shell
npm run dev
```

### Updating Icons Data

The project includes an automated script to update the icons data from the latest Lucide Icons repository. This ensures that the icon picker always has access to the most recent icons and their metadata.

#### Manual Update

To manually update the icons data, run the generation script:

```shell
node script/generate.js
```

This script will:
1. Clone the latest Lucide Icons repository
2. Extract icon names, categories, and tags from the JSON metadata files
3. Generate a new `icons-data.ts` file with the updated information
4. Clean up temporary files

#### Automated Workflow

The icons data is automatically updated through GitHub Actions or similar CI/CD workflows. This ensures that:

- **The repository stays up-to-date** with the latest Lucide Icons
- **Installation commands always work** with the most recent icon set
- **Users get the latest icons** without manual intervention

The script is designed to be run in automated environments and will:

- Fetch the latest Lucide Icons repository
- Parse all icon metadata files
- Update the TypeScript data file
- Commit changes if run in a CI environment
- **Keep the registry files synchronized** with the latest icon data

#### What Gets Updated

The script updates the following data for each icon:
- **Name**: The icon identifier
- **Categories**: Icon categorization (e.g., "interface", "media", "communication")
- **Tags**: Searchable tags for better discoverability

This ensures that the icon picker's search functionality and categorization remain accurate and up-to-date with the Lucide Icons library.

## License

MIT © [Alan Courtois](https://github.com/alan-crts)

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the UI components
- [Lucide](https://lucide.dev) for the icons
- [Next.js](https://nextjs.org) for the framework
