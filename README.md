# Real estate manager - Client-Side Frontend

This repository houses the client-side code for the real estate manager application, providing a user-friendly interface for users seeking for property.

Technologies Used:

    React: React + Vite  The foundation for building a dynamic and interactive user interface.

    Typescript: For handling user interactions and data manipulation.

    Tailwind: For styling and visual presentation.

    CSS: For styling and visual presentation.

    HTML: The underlying structure for the web pages.

## Installation and Setup:

    Clone the repository from the `main` branch:

git clone https://github.com/tchkoidze/Real-Estate-Manager.git

## Navigate to the project directory:

cd "project directory"

## Install dependencies:

npm install

## Start the development server:

npm run dev

This will typically launch the application at http://localhost:5173/.

## Development Workflow:

    Component-Based Architecture: Break down the UI into reusable components for better organization and maintainability.

    Routing: Implement navigation between pages using React Router Dom (or a similar library).

    Data Fetching: Fetch data from the backend API using  Axios for displaying dynamic content.

    Form validation: React Hook form + zod.

## Arcitecture

- src:
  - components:
    -- AddAgent.tsx
    -- Scroll.tsx
    -- Tooltip.tsx
  - data
  - hooks
  - icons
  - layouts:
    --Header
  - pages:
    -- Addlisting.tsx
    -- Listing.tsx
    -- PropertPage.tsx
  - schemas:
    --addAgentSchema
    --AddListingSchema
    --filtersSchema
  - App.tsx
  - main.tsx
  - types.tsx
