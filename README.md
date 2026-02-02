# Form Builder

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

A modern, feature-rich form builder built with React and Tailwind CSS. Create beautiful, customizable forms with drag-and-drop functionality, live preview, validation, and JSON export.

![Form Builder Preview](https://via.placeholder.com/800x400?text=Form+Builder+Preview)

##  Features

### Core Functionality
- **Drag & Drop Fields** - Reorder form fields easily with intuitive drag-and-drop
- **Multiple Field Types** - Text, Email, Dropdown, and Checkbox fields
- **Live Preview** - See your form as users will see it
- **Form Validation** - Built-in validation rules with real-time feedback
- **JSON Export/Import** - Save and share your form schemas

### Field Types
| Field Type | Description |
|------------|-------------|
|  Text | Single-line text input |
|  Email | Email address with format validation |
|  Dropdown | Select from predefined options |
|  Checkbox | Boolean selection |

### Key Capabilities
- **Tab-based Editor** - Organize field settings (Basic, Validation, Options)
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works seamlessly on all devices
- **Real-time Validation** - Instant feedback on form submissions
- **Form Metadata** - Set custom titles and descriptions

##  Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd form-builder

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app will be available at `http://localhost:3000`

##  Deploying to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click "Add New..." → "Project"

3. Import your Git repository

4. Vercel will automatically detect the configuration:
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

5. Click "Deploy" and wait for the build to complete

6. Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy the project
vercel

# For production deployment
vercel --prod
```

### Custom Domain (Optional)

To add a custom domain:
1. Go to your project settings in Vercel Dashboard
2. Navigate to "Domains"
3. Add your domain and follow the DNS configuration instructions

### Environment Variables

If your app uses environment variables:
1. Go to Project Settings → Environment Variables
2. Add your variables (e.g., `REACT_APP_API_URL`)
3. Redeploy to apply changes

## 🔧 Vercel Configuration

This project includes a `vercel.json` configuration file optimized for:
- **SPA routing** - All routes redirect to `index.html`
- **Static asset caching** - CSS/JS files cached for 1 year
- **Build optimization** - Properly configured build command

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
form-builder/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FieldEditor.js    # Field configuration panel
│   │   ├── FieldPreview.js   # Field display in builder
│   │   ├── FormPreview.js    # Live form preview
│   │   └── JSONExport.js     # Export functionality
│   ├── App.js                # Main application
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Adding New Field Types

1. Add the field type to `FIELD_TYPES` in `App.js`:
```javascript
const FIELD_TYPES = [
  { type: 'text', icon: Type, label: 'Text Field', description: '...' },
  // Add new field type here
];
```

2. Add the field renderer in `FormPreview.js`:
```javascript
case 'newType':
  return <input type="text" className={fieldClassName} ... />;
```

3. Update field icons in `FieldPreview.js`:
```javascript
const fieldIcons = {
  newType: YourIcon,
  ...
};
```

### Theming

Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
        // ...
      }
    }
  }
}
```

### Styling

Global styles are in `src/index.css`. Key classes:
- `.btn-primary` - Primary action buttons
- `.card` - Card containers
- `.input` - Form inputs
- `.badge-*` - Badge variants

## 📝 Usage Guide

### Creating a Form

1. **Add Fields** - Click "Add New Field" and select a field type
2. **Configure Fields** - Click a field to edit its properties:
   - Label: Display name for the field
   - Name: Variable name for form data
   - Placeholder: Hint text for users
   - Help Text: Additional instructions
   - Required: Make field mandatory
   - Validation: Set min/max length
3. **Reorder Fields** - Drag fields to change their order
4. **Preview** - Switch to Preview mode to test the form
5. **Export** - Save your form as JSON

### Importing Forms

1. Click "Import" in the sidebar
2. Select a JSON file with form schema
3. The form will be loaded with all fields

### JSON Schema Format

```json
{
  "title": "Form Title",
  "description": "Form description",
  "fields": [
    {
      "type": "text",
      "label": "Full Name",
      "name": "fullName",
      "placeholder": "Enter your name",
      "required": true
    }
  ]
}
```

##  Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **@hello-pangea/dnd** - Drag and drop
- **lucide-react** - Icons
- **uuid** - Unique IDs

##  License

MIT License - feel free to use this project for personal or commercial purposes.

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  Support

If you have any questions or need help, please open an issue on GitHub.

---

## Animation Consistency Project

### Standard Animation Durations:
- **Micro-interactions** (buttons, toggles): `duration-200` (200ms)
- **Standard transitions** (hover, focus): `duration-200` (200ms)
- **Theme/color changes**: `duration-300` (300ms)
- **Complex animations** (modals, slide-downs): `duration-300` with consistent keyframes

### Changes Made:
1. **tailwind.config.js**: Added `fade-in` (0.2s) and `slide-in` animations with consistent keyframes
2. **src/index.css**: Standardized all transitions to `duration-200` for interactive elements
3. **src/App.js**: Consistent transitions on view switcher buttons + fade animations between views
4. **src/components/FieldEditor.js**: Consistent transitions on tabs and interactive elements
5. **src/components/FieldPreview.js**: Added `duration-200` to drag handle hover transitions
6. **src/components/FormPreview.js**: Verified consistent field transition durations

### View Transitions:
- Builder/Preview/JSON views now use `animate-fade-in` for smooth transitions
- JSON code block uses proper dark mode classes (`bg-secondary-800` light / `bg-dark-600` dark)

---

Made with ❤️ using React and Tailwind CSS

