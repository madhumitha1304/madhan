# NexusCore 🔮

NexusCore is a modern, high-performance React application built with Vite, featuring a premium glassmorphism design system. It demonstrates a sleek dark-mode aesthetic with dynamic animations, modular component architecture, and terminal-grade performance.

## 🚀 Key Features

- **Glassmorphism UI**: A stunning visual interface using translucent panels, blurred backgrounds, and neon accents.
- **Dynamic Backgrounds**: An animated gradient mesh background that breathes and shifts.
- **Modular Components**:
  - **Navbar**: Smooth tab-based navigation.
  - **Hero Section**: High-impact introduction with floating 3D-visual elements.
  - **Interactive Counter**: A state-managed counter component with scoped styling.
  - **Smart Form**: A beginner-friendly contact form with local storage persistence.
- **Draft Persistence**: The form automatically saves your progress to `localStorage` as you type, so you never lose your draft.
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (Hooks, modular structure)
- **Build Tool**: [Vite](https://vitejs.dev/) (Fast HMR and optimized builds)
- **Styling**: Vanilla CSS with modern features (CSS Variables, Flexbox, CSS Grid)
- **Typography**: [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts

## 📦 Project Structure

```text
madhan/
├── src/
│   ├── assets/             # Images and visual assets
│   ├── components/         # Modular React components
│   │   ├── about/          # About section component
│   │   ├── counter/        # Counter component with scoped CSS
│   │   ├── form/           # Smart form with localStorage logic
│   │   ├── home/           # Landing page main layout
│   │   └── navbar/         # Glassmorphism navigation bar
│   ├── App.jsx             # Main application shell & routing
│   ├── index.css           # Global design system & variables
│   └── main.jsx            # Entry point
```

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/madhumitha1304/madhan.git
   ```

2. Navigate to the project folder:
   ```bash
   cd madhan
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the project locally:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📄 License

This project is open-source and available under the MIT License.
