# Modern Portfolio with Admin Dashboard

A sophisticated, modern portfolio website built with React, TypeScript, and Tailwind CSS, featuring a comprehensive admin dashboard for dynamic content management.

## 🚀 Features

### Portfolio Website
- **Matte Black Theme**: Professional dark theme with cyan-blue accents
- **Responsive Design**: Fully responsive across all devices
- **Modern Animations**: 15+ custom animations including fade-ins, glow effects, and floating elements
- **Glass Morphism**: Modern UI design with glass effects and backdrop blur
- **Performance Optimized**: Optimized animations with proper will-change properties
- **Accessibility**: Reduced motion support and proper focus states

### Admin Dashboard
- **Analytics Dashboard**: User analytics with charts and metrics
- **Portfolio Management**: Dynamic content management for projects, skills, and about section
- **Contact Management**: Handle contact form submissions with status tracking
- **User Management**: Admin user management with role-based permissions
- **Modern UI**: Consistent design language matching SCALIXITY brand
- **Real-time Updates**: Live data management and updates

## 🎨 Design System

### Color Palette
- **Primary Colors**: Cyan variations (#22d3ee, #06b6d4, #0891b2)
- **Surface Colors**: Professional dark grays for backgrounds
- **Text Colors**: Structured hierarchy with defined opacity levels
- **Accent Colors**: Blue, purple, emerald, amber for various UI elements

### Typography
- **Primary Font**: Inter (system font with excellent readability)
- **Monospace Font**: Fira Code (for code snippets and technical content)

### Animations
- Fade-in variants (up, down, left, right)
- Glow and pulse effects
- Float and rotation animations
- Gradient shifts and shine effects
- Matrix rain particle effects

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Development**: ESLint, PostCSS

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/           # Portfolio components
│   │   ├── About.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── admin/               # Admin dashboard
│   │   ├── components/      # Reusable admin components
│   │   │   └── StatsCard.tsx
│   │   ├── layout/          # Admin layout components
│   │   │   └── AdminLayout.tsx
│   │   ├── pages/           # Admin pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AdminUsers.tsx
│   │   │   ├── UserAnalytics.tsx
│   │   │   ├── PortfolioManagement.tsx
│   │   │   └── ContactManagement.tsx
│   │   └── index.tsx        # Admin exports
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── index.html               # HTML entry point
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Accessing the Applications

- **Portfolio**: http://localhost:5173/
- **Admin Dashboard**: http://localhost:5173/admin

## 🎯 Admin Dashboard Features

### Navigation & Routing
- **Integrated Routing**: Admin dashboard accessible at `/admin` route
- **React Router**: Seamless navigation between portfolio and admin sections
- **Admin Sub-routes**: 
  - `/admin` - Dashboard overview
  - `/admin/users` - User management
  - `/admin/analytics` - Analytics dashboard
  - `/admin/portfolio` - Portfolio content management
  - `/admin/contact` - Contact form submissions

### Dashboard Overview
- Service inquiries tracking
- Real-time statistics
- Recent activity monitoring
- Quick action buttons

### Portfolio Management
- **Projects**: Add, edit, delete projects with technology tags
- **Skills**: Manage skills by category with proficiency levels
- **About**: Edit personal information and bio
- **Certifications**: Manage professional certifications

### Contact Management
- View all contact form submissions
- Filter by status (new, read, replied, archived)
- Priority management (high, medium, low)
- Reply functionality
- Star important inquiries

### User Analytics
- Total users and growth metrics
- New vs returning users analysis
- Active users (DAU, WAU, MAU)
- Session duration and engagement metrics
- Custom dashboard components

### Admin User Management
- User role management (Super Admin, Admin, Editor)
- Email notification preferences
- Last login tracking
- User status management

## 🎨 Customization

### Colors
Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  accent: {
    primary: '#22d3ee',    // Cyan
    secondary: '#06b6d4',  // Darker cyan
    tertiary: '#0891b2',   // Deep cyan
  },
  // ... other colors
}
```

### Animations
Add custom animations in the `keyframes` section:

```javascript
keyframes: {
  customAnimation: {
    '0%': { /* initial state */ },
    '100%': { /* final state */ }
  }
}
```

### Components
- Portfolio components are in `src/components/`
- Admin components are in `src/admin/`
- Shared styles are in `src/index.css`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Tailwind Configuration
- Custom color palette
- Extended animations and keyframes
- Custom utilities for glass effects
- Responsive typography scale

### Vite Configuration
- Multiple entry points (portfolio + admin)
- Path aliases for clean imports
- Build optimization

## 🚀 Deployment

### Build the project
```bash
npm run build
```

### Deploy to static hosting
The `dist` folder contains the built application:
- `index.html` - Main application with both portfolio and admin
- All routes handled by React Router

### Environment Variables
Create `.env` file for configuration:
```
VITE_API_URL=your-api-url
VITE_ADMIN_SECRET=your-admin-secret
```

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real chart implementations
- [ ] File upload functionality
- [ ] Email integration for contact forms
- [ ] SEO optimization
- [ ] PWA support
- [ ] Dark/light theme toggle
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or support:
- Email: 2224ashutosh@gmail.com
- LinkedIn: [Ashutosh Singh](https://www.linkedin.com/in/ashutosh-singh-4b9a93230/)
- GitHub: [ASHUTOSH2224](https://github.com/ASHUTOSH2224)

---

Built with ❤️ by Ashutosh - Head of Software Architecture at Scalixity 