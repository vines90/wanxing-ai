---
name: wanxing-ai-website
status: backlog
created: 2025-09-07T10:55:49Z
progress: 0%
prd: .claude/prds/wanxing-ai-website.md
github: https://github.com//issues/2
---

# Epic: WanXing AI Website

## Overview

A Vue3-based marketing website targeting local AI training customers in Foshan Shunde. The implementation leverages modern frontend practices with static site generation for optimal SEO and performance. Key focus is conversion optimization through clear course presentation, local trust signals, and frictionless consultation flows.

## Architecture Decisions

**Technology Stack:**
- **Vue3 + Composition API**: For reactive components and better TypeScript support
- **Vite**: For fast development and optimized production builds
- **Vue Router**: Client-side routing for SPA experience
- **Pinia**: Lightweight state management for form data and UI state
- **TailwindCSS**: Utility-first CSS with custom theme (black bg + #E31937 red)
- **Vite-SSG**: Static site generation for SEO without server complexity

**Design Patterns:**
- **Component-first**: Reusable UI components (CourseCard, TestimonialCarousel, ContactForm)
- **Mobile-first responsive**: Primary target is mobile users (>70% traffic expected)
- **Progressive enhancement**: Core content works without JS, enhancements layer on top
- **Conversion-focused**: Every page designed with clear CTA paths

## Technical Approach

### Frontend Components

**Core Layout Components:**
- `AppHeader`: Navigation with mobile hamburger menu, contact info
- `AppFooter`: Contact details, course links, WeChat QR code
- `PageHero`: Reusable hero sections with customizable CTAs

**Course Display Components:**
- `CourseGrid`: 4-course overview with hover effects and quick access
- `CourseDetail`: Full course page with collapsible syllabus, instructor info
- `CourseComparison`: Help users choose the right course level

**Conversion Components:**
- `ContactForm`: Multi-step form (course interest → personal info → consultation booking)
- `WhatsAppIntegration`: Direct chat widget with pre-filled messages
- `TestimonialCarousel`: Social proof with local success stories
- `TrustSignals`: Instructor credentials, venue photos, student count

### Backend Services

**Static Content Management:**
- Markdown-based content system for easy updates
- JSON configuration for course data, pricing, schedules
- Image optimization pipeline with WebP conversion
- Video embedding with lazy loading

**Form Handling:**
- Netlify Forms or Formspree integration for contact submissions
- Email notifications to sales team
- Auto-responder with course information PDF

**Analytics Integration:**
- Baidu Analytics for Chinese market insights  
- Google Analytics for international tracking
- Custom conversion events (form submissions, phone clicks, WeChat scans)

### Infrastructure

**Hosting & Deployment:**
- Netlify or Vercel for static hosting with CDN
- Custom domain with ICP filing for China accessibility
- SSL certificate included in hosting
- Branch preview deployments for content review

**Performance Optimization:**
- Image optimization and responsive images
- Code splitting by route
- Critical CSS inlining
- Service worker for offline course previews

## Implementation Strategy

**Phase 1: Foundation (Week 1)**
- Project setup with Vue3 + Vite + TailwindCSS
- Basic routing and layout components
- Design system implementation (colors, typography, spacing)
- Mobile-responsive navigation

**Phase 2: Content Pages (Week 2-3)**
- Homepage with course overview and trust signals
- 4 individual course detail pages with dynamic content
- About page with team and facility showcase
- Success stories page with case studies

**Phase 3: Conversion Optimization (Week 3-4)**
- Contact forms with multi-step UX
- WhatsApp/WeChat integration
- Performance optimization and SEO implementation
- Analytics setup and conversion tracking

**Phase 4: Polish & Launch (Week 4)**
- Cross-browser testing and accessibility audit
- Content review and copy optimization
- Technical SEO audit
- Soft launch with feedback collection

## Task Breakdown Preview

High-level task categories that will be created:
- [ ] **Project Setup**: Vue3 + Vite configuration, TailwindCSS theming, basic routing
- [ ] **Design System**: Component library, color scheme, typography, responsive grid
- [ ] **Homepage Development**: Hero section, course overview, testimonials, contact CTAs  
- [ ] **Course Pages**: Dynamic course detail pages with reusable components
- [ ] **About & Case Studies**: Team showcase, facility photos, success story layouts
- [ ] **Contact System**: Multi-step forms, WhatsApp integration, auto-responses
- [ ] **Performance & SEO**: Image optimization, meta tags, structured data, analytics
- [ ] **Content Integration**: Course data setup, copy writing, image preparation
- [ ] **Testing & QA**: Cross-browser testing, mobile UX, conversion funnel testing
- [ ] **Deployment**: Domain setup, hosting configuration, analytics integration

## Dependencies

**Content Dependencies:**
- Course syllabus and pricing information
- Instructor photos and biographical content  
- Student testimonials and success case studies
- High-quality photos of training facilities

**Design Dependencies:**
- Logo design or brand mark creation
- Professional photography of courses in action
- Video testimonials or promotional content
- Brand voice and messaging guidelines

**Technical Dependencies:**
- Domain name registration and ICP filing
- WeChat Business account for integration
- Form handling service setup (Netlify/Formspree)
- Analytics account configuration

## Success Criteria (Technical)

**Performance Benchmarks:**
- Lighthouse Performance Score > 90
- First Contentful Paint < 2s
- Largest Contentful Paint < 3s
- Cumulative Layout Shift < 0.1

**SEO Metrics:**
- Core Web Vitals in "Good" range
- Mobile-friendly test passing
- Structured data validation
- Meta tags and schema markup complete

**Conversion Tracking:**
- Form submission events properly tracked
- Phone click events measured
- WeChat QR code interaction tracking
- Page depth and engagement metrics

## Estimated Effort

**Timeline: 4 weeks total**
- **Week 1**: Project foundation and design system (25% complete)
- **Week 2**: Core pages and content structure (50% complete) 
- **Week 3**: Advanced features and optimization (75% complete)
- **Week 4**: Testing, polish, and deployment (100% complete)

**Resource Requirements:**
- 1 Frontend Developer (Vue3 specialist)
- 1 UI/UX Designer (part-time for reviews)
- 1 Content Creator (for copy and image preparation)
- 1 QA Tester (final week for cross-platform testing)

**Critical Path Items:**
- Course content and pricing finalization (blocks course pages)
- Brand identity and color scheme approval (blocks design system)
- Domain registration and hosting setup (blocks deployment)
- Professional photography completion (blocks visual polish)

## Tasks Created
- [ ] #10 - Project Setup & Configuration (parallel: true)
- [ ] #11 - Design System & Components (parallel: true)  
- [ ] #12 - Layout & Navigation Components (parallel: true)
- [ ] #3 - Homepage Development (parallel: true)
- [ ] #4 - Course Detail Pages (parallel: true)
- [ ] #6 - About & Success Stories Pages (parallel: true)
- [ ] #7 - Contact & Conversion System (parallel: true)
- [ ] #5 - Performance & SEO Optimization (parallel: true)
- [ ] #8 - Analytics & Tracking Integration (parallel: true)
- [ ] #9 - Testing, QA & Deployment (parallel: false)

Total tasks: 10
Parallel tasks: 9
Sequential tasks: 1
EOF < /dev/null