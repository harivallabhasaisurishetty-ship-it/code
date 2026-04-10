# **App Name**: Digital Ally

## Core Features:

- User Authentication & Session Management: Secure user registration and login functionality using Firebase Authentication, managing active user sessions and redirects to the dashboard upon successful login.
- Adaptive Theme & UI Customization: A global state management system (Zustand) for dynamic 'light' and 'dark' mode toggling, persistently saved to localStorage. Includes user-customizable accent colors for branding elements.
- AI-Powered Website Generation & Visual Editor: Generate full website layouts based on user-provided business details (name, description, style). The AI will create HTML/Tailwind CSS which is then rendered in an interactive preview where users can directly edit text using a visual editor tool.
- Interactive AI Design Assistant Chatbot: A persistent, floating chatbot interface on the website preview page that acts as an assistant. Users can chat with it to refine website elements (e.g., 'Make the header blue'), which simulates sending regeneration requests to the AI tool.
- AI Marketing Content Creator: A dedicated section allowing users to generate professional newsletters and ad copy by providing short prompts, leveraging AI capabilities.
- Business Analytics & Project Dashboard: An intelligent dashboard layout displaying key mock analytics such as page views and user clicks. Features a 'Sentiment Analysis' section with visual progress bars or charts, and a list of 'Saved Projects' pulled from Firestore.

## Style Guidelines:

- The palette aims for a sophisticated, tech-forward, and reliable aesthetic, with a primary dark color scheme chosen for its modern enterprise feel and extensive dark mode support. Primary blue: `#4D77F2` (RGB: 77, 119, 242) selected for its association with digital innovation and trust. Background: `#202227` (RGB: 32, 34, 39) for a deep, desaturated foundation that visually ties to the primary hue. Accent turquoise: `#26CCCC` (RGB: 38, 204, 204) to provide a vibrant contrast and highlight interactive elements.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, techy, and professional appearance suited for titles and calls to action. Body font: 'Inter' (sans-serif) for its neutral, objective, and highly legible characteristics, ensuring excellent readability for longer content blocks and data displays.
- Use clean, modern, and vector-based icons that complement a professional SaaS environment. Icons for navigation, settings, data visualization, AI functionalities, and the theme toggle (sun/moon) should maintain a consistent, crisp line-art style.
- The layout emphasizes a modular and fully responsive design using Tailwind CSS. Key elements include a persistent header with navigation and a theme toggle. Dashboards will feature a clear grid system for analytics display, and generative tools will follow intuitive step-by-step forms. A floating chat panel ensures accessible AI assistance on relevant pages.
- Implement subtle, swift transition animations for UI elements such as modal openings, routing changes, and theme toggling. Provide visual feedback animations for button clicks and data loading states to enhance the interactive experience without being distracting.