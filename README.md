# House Maintenance Tracker

A modern, responsive Next.js application for tracking home maintenance tasks with automatic scheduling and reminders.

## Features

- **Task Management**: Add, edit, and delete maintenance tasks
- **Smart Scheduling**: Automatically calculates next due dates based on frequency
- **Status Tracking**: Visual indicators for overdue, due soon, and upcoming tasks
- **Filtering**: Filter tasks by status (Overdue, Due Soon) or frequency (Monthly, Quarterly, etc.)
- **Category Organization**: Organize tasks by categories (HVAC, Plumbing, Safety, etc.)
- **Mark as Done**: Quickly mark tasks complete and automatically schedule the next occurrence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Built-in dark mode support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: JSON file-based storage (easy to upgrade to a database)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd house-maintenance
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy from the project directory:
   ```bash
   vercel
   ```

3. Follow the prompts to link to your Vercel account and deploy

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your repository

5. Vercel will auto-detect Next.js and configure the build settings

6. Click "Deploy"

### Option 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/house-maintenance)

## Project Structure

```
house-maintenance/
├── app/
│   ├── api/
│   │   └── tasks/              # API routes for task management
│   │       ├── route.ts        # GET all tasks, POST new task
│   │       └── [id]/
│   │           ├── route.ts    # PUT update, DELETE task
│   │           └── mark-done/
│   │               └── route.ts # POST mark task as done
│   ├── page.tsx                # Main page component
│   └── layout.tsx              # Root layout
├── components/
│   ├── TaskCard.tsx            # Individual task card component
│   ├── FilterBar.tsx           # Filter buttons component
│   └── AddTaskModal.tsx        # Modal for adding new tasks
├── lib/
│   └── utils.ts                # Utility functions for date handling
├── types/
│   └── maintenance.ts          # TypeScript type definitions
├── data/
│   └── tasks.json              # Task data storage
└── public/                     # Static assets
```

## Data Persistence

Currently, the app uses a JSON file (`data/tasks.json`) for data storage. This is perfect for personal use and simple deployments.

### Important Note for Production

If deploying to Vercel or similar platforms:
- The JSON file storage works for development but resets on each deployment
- For production, consider upgrading to a database solution:
  - **Vercel Postgres**: Easy integration with Vercel
  - **Supabase**: Free PostgreSQL database
  - **MongoDB Atlas**: Free tier available
  - **PlanetScale**: MySQL-compatible serverless database

## Customization

### Adding New Categories

Edit `components/AddTaskModal.tsx` to add category suggestions or a dropdown.

### Adding New Frequencies

1. Update `types/maintenance.ts` to add new frequency types
2. Update `lib/utils.ts` `calculateNextDue()` function
3. Update `components/FilterBar.tsx` to add filter options

### Changing the Theme

Modify the Tailwind classes in components or update `tailwind.config.ts` for global theme changes.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

The app is structured to make it easy to extend:

1. **Add new task properties**: Update `types/maintenance.ts` and the UI components
2. **Add notifications**: Integrate with browser notifications or email services
3. **Add recurring reminders**: Integrate with calendar APIs
4. **Add data export**: Add CSV/PDF export functionality

## Contributing

Feel free to fork this project and customize it for your needs!

## License

MIT License - feel free to use this for personal or commercial projects.
