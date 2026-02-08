# Portfolio Website - Salek Masud Parvez

A modern, responsive portfolio website built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Featuring smooth animations, interactive components, and a comprehensive showcase of projects and skills.

---

## 🎯 About Me

**Salek Masud Parvez** - Full Stack Developer & Product Designer

- 🌐 Website: [parvez.dev](https://parvez.dev)
- 📧 Email: [salekmasudparvez@gmail.com](mailto:salekmasudparvez@gmail.com)
- 💼 GitHub: [github.com/salekmasudparvez](https://github.com/salekmasudparvez)

I'm passionate about building user-centric digital products that combine beautiful design with robust functionality. With expertise in modern web technologies and a focus on performance and accessibility, I create experiences that matter.

---

## ✨ Features

### 📱 Responsive Design
- Mobile-first approach
- Seamless experience across all devices
- Optimized for desktop, tablet, and mobile screens

### 🎨 Modern UI/UX
- Gradient accents and modern typography
- Smooth page transitions with Framer Motion
- Glass-morphism effects with Tailwind CSS
- Dark theme with purple and orange accents

### 🚀 Performance
- Built with Vite for lightning-fast development
- Lazy loading for sections and images
- Optimized bundle size

### 🎭 Interactive Components
- Swiper carousel for project showcase
- Smooth animations and micro-interactions
- Modal loaders and page transitions
- Responsive navigation

### 📊 Comprehensive Sections

1. **Hero Section** - Eye-catching introduction with call-to-action
2. **About Me** - Personal story and mission statement
3. **Skills** - Technical expertise organized by category (Frontend, Backend, Tools)
4. **Experience** - Professional work history and achievements
5. **Projects** - Interactive carousel of featured projects
6. **Contact** - Multiple ways to get in touch
7. **Footer** - Social links and quick navigation

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite 7** - Next-gen build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Swiper** - Touch carousel

### Build & Development
- **Vite** - Fast build and dev server
- **ESLint** - Code quality
- **TypeScript** - Strict type checking


## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-one
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

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
portfolio-one/
├── src/
│   ├── components/
│   │   ├── about/              # About section components
│   │   ├── contact/            # Contact section
│   │   ├── experience/         # Experience/work history
│   │   ├── footer/             # Footer component
│   │   ├── hero/               # Hero/landing section
│   │   ├── loader/             # Loading screen
│   │   ├── logo/               # Logo component
│   │   ├── navbar/             # Navigation bar
│   │   ├── page/               # Page wrapper with animations
│   │   ├── project/            # Projects section with swiper
│   │   ├── skill/              # Skills showcase
│   │   └── testimonial/        # Testimonials (optional)
│   ├── data/
│   │   └── portfolioData.tsx   # Centralized portfolio content
│   ├── assets/                 # Images and static files
│   ├── providers/              # Context providers
│   ├── types/                  # TypeScript type definitions
│   ├── Portfolio.tsx           # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                     # Static assets
├── package.json               # Dependencies
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
└── README.md                  # This file
```

---

## 🎨 Customization

### Update Portfolio Content

All portfolio content is centralized in `src/data/portfolioData.tsx`. Edit this single file to update:
- Hero section messaging
- About me content
- Skills and expertise
- Work experience
- Project details
- Contact information
- Social media links

```typescript
// Example: Update hero section
export const portfolioData: PortfolioData = {
  hero: {
    badgeText: "hi! I am",
    nameHighlight: "Your Name",
    headlinePrimary: "Let's create",
    headlineHighlight: "Products",
    // ... more config
  }
}
```

### Modify Styling

- **Colors**: Update Tailwind color classes in components
- **Typography**: Adjust font sizes and weights
- **Spacing**: Modify padding and margins
- **Animations**: Customize Framer Motion variants

---

## 🎯 Key Features Explained

### Centralized Data Management
All portfolio content is managed through a single typed data object, making it easy to:
- Update content across the site
- Maintain consistency
- Add/remove projects dynamically

### Swiper Integration
The projects section uses Swiper.js for:
- Touch-friendly carousel
- Responsive breakpoints (2-3 slides based on screen size)
- Custom navigation buttons
- Smooth animations

### Performance Optimizations
- **Lazy Loading**: Components load only when needed
- **Image Optimization**: Lazy loading for images
- **Code Splitting**: Separate chunks for each route
- **CSS Purging**: Unused styles removed in production

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns for projects)

---

## 🔗 External Links & Social

- **Personal Website**: [parvez.dev](https://parvez.dev)
- **LinkedIn**: [linkedin.com/in/danielkoya](https://linkedin.com/in/danielkoya)
- **Dribbble**: [dribbble.com/danielkoya_](https://dribbble.com/danielkoya_)
- **Behance**: [behance.net/danielkoya_](https://behance.net/danielkoya_)
- **Instagram**: [@danielkoya_](https://instagram.com/danielkoya_)
- **Twitter**: [@danielkoya_](https://twitter.com/danielkoya_)

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview production build |

---

## 🐛 Troubleshooting

### Swiper not showing
- Ensure `swiper/css` and `swiper/css/navigation` are imported
- Check that `modules={[Navigation]}` is passed to Swiper
- Verify projects array has data

### Styles not applying
- Clear `node_modules` folder
- Run `npm install` again
- Restart dev server

### Images not loading
- Check image paths in `src/assets/`
- Verify images exist at specified paths
- Use `loading="lazy"` for performance

---

## 📄 License

This project is open source and available for personal and commercial use.

---

## 💡 Future Enhancements

- [ ] Blog section with markdown support
- [ ] Case studies with detailed project breakdowns
- [ ] Testimonials carousel
- [ ] Newsletter subscription
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] CMS integration

---

## 📞 Contact & Support

For inquiries, collaborations, or just to say hello:

- **Email**: [salekmasudparvez@gmail.com](mailto:salekmasudparvez@gmail.com)
- **Website**: [parvez.dev](https://parvez.dev)
- **Social**: Find me on LinkedIn, Twitter, or Instagram

---

**Built with ❤️ by Salek Masud Parvez** | © 2026. All rights reserved.
