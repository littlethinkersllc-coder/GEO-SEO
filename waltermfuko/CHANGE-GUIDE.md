# waltermfuko.com - Complete Change Guide

## Overview
This guide covers all requested updates to waltermfuko.com (WordPress/Astra theme with core/html blocks).

## Files in This Directory

| File | Purpose |
|------|---------|
| `CHANGE-GUIDE.md` | This file - step-by-step instructions |
| `wp-cli-update-script.sh` | Automated WP-CLI script for bulk changes |
| `mobile-nav-fix.html` | Mobile hamburger menu CSS + HTML to apply to pages missing it |
| `css/mobile-fixes.css` | Additional CSS for mobile responsive issues |
| `content/homepage.md` | Updated homepage content with full degrees |
| `content/contact.md` | Updated Let's Connect page |
| `content/portfolio.md` | Updated portfolio page with reframed items |
| `content/portfolio-pieces/` | Individual portfolio piece updates |

---

## Summary of ALL Changes

### 1. Remove "Hire Me" / "Available" Language (ALL PAGES)
- Remove "Available for Contract & Full-Time Roles, DC Metro Area" from all pages
- Remove any "Currently Available For" sections
- Remove "Hire Me" buttons/CTAs
- Change nav link text from "HIRE ME" to "CONTACT" (keep /hire-me/ slug)
- Change the "Hire Me" page title to "Contact"

### 2. Contact / Let's Connect Page
- Remove physical location (DC Metro Area, Washington DC, Virginia)
- Update email to: **wmfuko@gmail.com**
- Remove availability status

### 3. Remove Em Dashes (ALL PAGES)
- Replace all instances of " -- " (em dash) with ", " (comma space)
- Replace all instances of " - " (en dash) with ", " (comma space)
- This includes degree cards, portfolio descriptions, everywhere

### 4. Degree Display on Homepage
Update the credentials section:

| OLD | NEW |
|-----|-----|
| Ed.D. -- Doctor of Education / South College | **Ed.D. Doctor of Education, Instructional Design Concentration** / South College |
| MBA -- Master of Business Administration / Virginia Wesleyan University | **MBA, Master of Business Administration** / Virginia Wesleyan University |
| B.A. -- Bachelor of Arts / Elms College | **B.A. Sociology & Business Management** / Elms College |

### 5. Portfolio - Reframe Corporate Items
- First two portfolio items labeled "Corporate L&D" change to **"Consulting Project"**
- Position these as consulting engagements, not corporate employment

### 6. Remove George Mason University (ALL PAGES)
- Remove all references to George Mason University
- Replace with generic: "a large public university" if context requires it
- No specific institution names in portfolio pieces

### 7. K-12 Portfolio Piece
- Change from "9th grade" to **"K12 (7-12), Large Private Boarding School"**

### 8. University Professional Development Page
- Fix broken content layout and scrolling
- Remove em dashes
- Remove George Mason University references
- Fix internal links at bottom to point to:
  - Home: `/`
  - About: `/about/`
  - Portfolio: `/portfolio/`
  - Contact: `/hire-me/`

### 9. Mobile Navigation Fix
Pages that already have the fix: Home, About, Portfolio
Pages that NEED the fix: Contact/Hire Me + ALL portfolio piece pages

See `mobile-nav-fix.html` for the exact CSS and HTML to add.

### 10. Internal Links Audit
Verify all internal links across all pages point to:
- Home: `/`
- About: `/about/`
- Portfolio: `/portfolio/`
- Contact: `/hire-me/`

---

## How to Apply These Changes

### Option A: Use WP-CLI Script (Fastest)
1. SSH into your WordPress server
2. Navigate to your WordPress root directory
3. Run: `bash wp-cli-update-script.sh`
4. Complete the manual steps listed at the end of the script

### Option B: Manual WordPress Admin Edits
1. Log into WordPress Admin
2. Go to Pages > All Pages
3. Edit each page one at a time
4. Switch to Code Editor (three dots menu > Code Editor)
5. Find and replace the text changes listed above
6. For mobile nav fix, add the CSS and HTML from `mobile-nav-fix.html`
7. Update > Publish each page

### Option C: Use Claude Code Locally
1. Install Claude Code: `npm install -g @anthropic-ai/claude-code`
2. Open terminal, run `claude`
3. Paste the comprehensive prompt from the WP-CLI script
4. Claude Code can handle it via WP-CLI or direct file edits if you have SSH access

---

## Post-Update Checklist

- [ ] All pages: No em dashes remain
- [ ] All pages: No "hire me" / "available" language
- [ ] All pages: No George Mason University references
- [ ] Homepage: Full degree names displayed correctly
- [ ] Portfolio: First two items show "Consulting Project" not "Corporate L&D"
- [ ] Portfolio: K-12 shows "K12 (7-12), Large Private Boarding School"
- [ ] Contact: Email is wmfuko@gmail.com
- [ ] Contact: No location shown
- [ ] Prof Dev page: Content scrolls properly, no layout issues
- [ ] All pages: Mobile nav hamburger menu works
- [ ] All pages: Internal links point to correct pages
- [ ] Cache cleared (if using caching plugin)
- [ ] Tested on mobile device
