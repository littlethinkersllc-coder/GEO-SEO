# GEO Audit Report: Prompts for Parents

**Audit Date:** 2026-03-24
**URL:** https://promptsforparents.org
**Business Type:** Publisher / Educational Resource (AI Prompts for Parents)
**Pages Analyzed:** 0 (site completely inaccessible — HTTP 403 on all paths)

---

## Executive Summary

**Overall GEO Score: 2/100 (Critical)**

Promptsforparents.org does not function as a website. The domain returns HTTP 403 Forbidden errors on every request — homepage, robots.txt, sitemap.xml, llms.txt, and all subpaths across all variants (www, non-www, HTTP, HTTPS). No content is accessible to any human visitor, search engine crawler, or AI system.

The site has zero Google-indexed pages, zero brand mentions anywhere on the internet, no social media presence on any platform, and no cached versions exist in Google Cache or the Wayback Machine. AI models have zero entity data for this brand.

**Competitive Context:** The "AI prompts for parents" niche is already contested by established competitors including [parentintel.com](https://parentintel.com/) (90+ prompts), [futuresmartparent.com](https://www.futuresmartparent.com/) (55 prompts), [amybabys.com](https://amybabys.com/) (10 categories), [momsknowbest.substack.com](https://momsknowbest.substack.com/), and [thebump.com](https://www.thebump.com/) — all indexed and already cited by AI systems.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 0/100 | 25% | 0.0 |
| Brand Authority | 0/100 | 20% | 0.0 |
| Content E-E-A-T | 4/100 | 20% | 0.8 |
| Technical GEO | 5/100 | 15% | 0.75 |
| Schema & Structured Data | 0/100 | 10% | 0.0 |
| Platform Optimization | 0/100 | 10% | 0.0 |
| **Overall GEO Score** | | | **2/100** |

---

## Critical Issues (Fix Immediately)

### 1. HTTP 403 Forbidden on All Pages
**Severity:** CRITICAL — Nothing else matters until this is fixed
**URLs Affected:** Every URL on the domain
**Details:** The server returns 403 Forbidden on every request. Verified across 5 endpoints:

| Endpoint | Status |
|---|---|
| `https://promptsforparents.org` | 403 Forbidden |
| `https://www.promptsforparents.org` | 403 Forbidden |
| `http://promptsforparents.org` | 403 Forbidden |
| `https://promptsforparents.org/robots.txt` | 403 Forbidden |
| `https://promptsforparents.org/sitemap.xml` | 403 Forbidden |

**Likely Causes:**
- Web Application Firewall (WAF) misconfiguration (Cloudflare "Under Attack" mode, Sucuri, or hosting-level WAF)
- Hosting account suspension (unpaid bills, policy violation)
- Server misconfiguration (.htaccess rules, nginx.conf, file permissions)
- No application deployed (cloud hosting with no content)

**Fix:** Contact hosting provider, check WAF/CDN settings, verify file permissions, ensure a web application is deployed and serving content.

### 2. Zero Search Engine Indexation
**Severity:** CRITICAL
**Details:** Google `site:promptsforparents.org` returns zero results. Bing returns zero results. No search engine has ever indexed this domain.

### 3. Complete Absence of Structured Data
**Severity:** CRITICAL
**Details:** No schema.org markup of any kind exists because no HTML is served. Zero JSON-LD, Microdata, or RDFa detected.

### 4. Zero Brand Entity Recognition
**Severity:** CRITICAL
**Details:** No AI model (ChatGPT, Claude, Gemini, Perplexity) would recognize "Prompts for Parents" as a distinct entity. The phrase is interpreted purely as a generic keyword, returning content from competitors.

---

## High Priority Issues

### 5. No robots.txt File
**Severity:** HIGH
**Details:** robots.txt returns 403. When the site launches, a permissive robots.txt must be created allowing all AI crawlers.

### 6. No XML Sitemap
**Severity:** HIGH
**Details:** No sitemap.xml accessible. Must be created and submitted to Google Search Console upon launch.

### 7. No llms.txt File
**Severity:** HIGH
**Details:** No llms.txt file exists. This emerging standard helps AI systems understand site structure and should be implemented from day one.

### 8. No Social Media Presence on Any Platform
**Severity:** HIGH
**Details:** Exhaustive search across 12+ platforms found zero accounts:

| Platform | Status |
|---|---|
| LinkedIn | No company page |
| Twitter/X | No account |
| YouTube | No channel |
| Facebook | No page |
| Pinterest | No account |
| Reddit | No mentions |
| Wikipedia | No article |
| Trustpilot | No listing |
| G2 | No listing |
| Capterra | No listing |
| Crunchbase | No profile |
| Web Archive | No snapshots |

### 9. No Author Identity or Credentials
**Severity:** HIGH
**Details:** Zero E-E-A-T signals. No author bios, no credentials, no about page, no team page. For a parenting-focused site, trust is paramount.

---

## Medium Priority Issues

### 10. Generic Brand Name Collision
**Severity:** MEDIUM
**Details:** "Prompts for Parents" is an extremely common generic search query. Dozens of competing sites already rank for this exact phrase. Every search for the brand will return competitor content. Consider whether a more distinctive brand name would improve discoverability.

### 11. No Security Headers
**Severity:** MEDIUM
**Details:** The 403 response includes no security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).

---

## Category Deep Dives

### AI Citability (0/100)

**Status:** Complete failure — zero content exists to be cited.

Every citability dimension scores 0/100:

| Dimension | Weight | Score | Rationale |
|---|---|---|---|
| Answer Block Quality | 25% | 0/100 | No answer blocks exist |
| Self-Containment | 20% | 0/100 | No standalone passages exist |
| Structural Readability | 20% | 0/100 | No headings, lists, tables, or scannable structures |
| Statistical Density | 20% | 0/100 | No numbers, dates, or measurable claims |
| Uniqueness | 15% | 0/100 | No original data or proprietary insights |

**Top citation-ready passages:** None. Zero content blocks were retrievable.

**Recommendations for launch:**
- Structure content in direct question-and-answer format (one clear question, 1-3 sentence answer)
- Write self-contained paragraphs that define their own terms
- Include specific numbers, statistics, and data points
- Use lists and tables for scannable information
- Bold key terms and concepts

---

### Brand Authority (0/100)

**Status:** The brand does not exist in any discoverable form online.

| Component | Max Points | Score | Rationale |
|---|---|---|---|
| Wikipedia Presence | 30 | 0 | No article, no mentions |
| Reddit Discussion | 20 | 0 | Zero brand/domain mentions |
| YouTube Presence | 15 | 0 | No channel, no videos |
| LinkedIn Presence | 10 | 0 | No company page |
| Industry/Niche Sources | 25 | 0 | Not listed anywhere |

**Key finding:** A direct search for the exact domain `"promptsforparents.org"` returned zero results across all search engines. No third-party source has ever referenced this domain.

**Recommendations:**
- Establish foundational social media accounts (LinkedIn, Twitter/X, YouTube, Facebook) before or at launch
- Build third-party citations through directory listings and parenting resource sites
- Create content that earns backlinks from established parenting sites
- Target Wikipedia eligibility long-term through media coverage

---

### Content E-E-A-T (4/100)

**Status:** No content exists. Score reflects only domain name relevance.

| Dimension | Score | Key Evidence |
|---|---|---|
| Experience | 0/25 | Zero first-hand accounts, case studies, or experiential signals |
| Expertise | 0/25 | No author bylines, credentials, or technical content |
| Authoritativeness | 2/25 | Domain name suggests parenting niche; .org TLD has marginal trust perception |
| Trustworthiness | 2/25 | HTTPS active (403 served over TLS); no privacy policy, contact info, or about page |

**Content Metrics:**

| Metric | Value |
|---|---|
| Word Count | 0 |
| Readability (Flesch) | N/A |
| Heading Count | 0 |
| Internal Links | 0 |
| External Links/Citations | 0 |
| Images | 0 |

**Recommendations for launch:**
- Create foundational trust pages first: About, Contact, Privacy Policy, Terms of Service
- Every article needs a named author with detailed bio, credentials, and external profile links
- Publish experience-rich content: actual results from using prompts with real children, screenshots, before/after comparisons
- Build topical authority through hub-and-spoke content architecture (pillar page + cluster pages)

---

### Technical GEO (5/100)

**Status:** Domain resolves but serves no content.

| Category | Score | Status |
|---|---|---|
| Server-Side Rendering | 0/100 | CRITICAL — no HTML returned |
| Meta Tags & Indexability | 0/100 | CRITICAL — cannot be read |
| Crawlability | 0/100 | CRITICAL — all crawlers blocked by 403 |
| Security Headers | 10/100 | CRITICAL — minimal headers |
| Core Web Vitals | 0/100 | UNMEASURABLE |
| Mobile Optimization | 0/100 | UNMEASURABLE |
| URL Structure | 60/100 | Fair — domain name is descriptive |
| Response & Status | 5/100 | CRITICAL — universal 403 |

**AI Crawler Access Map:**

| Crawler | Status |
|---|---|
| GPTBot (OpenAI) | Blocked (403) |
| OAI-SearchBot (OpenAI) | Blocked (403) |
| ChatGPT-User (OpenAI) | Blocked (403) |
| ClaudeBot (Anthropic) | Blocked (403) |
| PerplexityBot | Blocked (403) |
| Google-Extended | Blocked (403) |
| Amazonbot | Blocked (403) |
| Bytespider (TikTok) | Blocked (403) |
| CCBot (Common Crawl) | Blocked (403) |
| Applebot-Extended | Blocked (403) |
| FacebookBot | Blocked (403) |
| Cohere-ai | Blocked (403) |

**Recommendations:**
- Ensure SSR/SSG when launching (AI crawlers don't execute JavaScript)
- Create permissive robots.txt allowing all AI crawlers
- Create XML sitemap and submit to Google Search Console
- Implement llms.txt file
- Configure all security headers
- Ensure consistent URL canonicalization (www vs non-www, HTTPS enforcement)

---

### Schema & Structured Data (0/100)

**Status:** Zero structured data — no HTML is served.

| Schema Type | Status | GEO Impact |
|---|---|---|
| Organization + sameAs | Missing | Critical — AI models cannot build entity graph |
| Person (author) | Missing | High — no E-E-A-T author signals |
| Article / BlogPosting | Missing | High — no content schema |
| speakable | Missing | Medium — not marked for voice/AI consumption |
| BreadcrumbList | Missing | Low — no navigation context |
| WebSite + SearchAction | Missing | Low — no sitelinks eligibility |
| FAQPage | Missing | Low — still useful for AI semantic understanding |

**sameAs Entity Links Found:** 0

**Recommendations:** When launching, implement these JSON-LD schemas (in priority order):
1. **Organization** with comprehensive sameAs links to all social profiles
2. **Article** with Person-typed author on all content pages (not plain string)
3. **Person** schema on dedicated author bio pages with credentials
4. **WebSite** + SearchAction on homepage
5. **BreadcrumbList** on all interior pages
6. **FAQPage** on pages with Q&A content
7. **speakable** property on Article schemas targeting headline and key takeaway sections

---

### Platform Optimization (0/100)

**Status:** Zero presence on any platform AI models cite.

| Platform | Presence | Impact on AI Visibility |
|---|---|---|
| Google Search | Not indexed | Cannot appear in AI Overviews |
| ChatGPT/OpenAI | Not crawlable | Cannot be cited by ChatGPT |
| Perplexity | Not crawlable | Cannot be cited by Perplexity |
| Claude/Anthropic | Not crawlable | Cannot be cited by Claude |
| Gemini/Google | Not crawlable | Cannot be cited by Gemini |
| YouTube | No channel | Missing from video knowledge graph |
| Reddit | No mentions | Missing from community knowledge |
| Wikipedia | No article | Missing from entity knowledge base |
| LinkedIn | No page | Missing from professional knowledge |

---

## Quick Wins (Implement This Week)

1. **Fix the 403 error** — Contact hosting provider, check WAF/CDN, verify server config. Expected impact: Unlocks everything.
2. **Deploy a holding page** — Even a simple page with site name, description, email signup, and legal pages would begin building trust signals.
3. **Create social media accounts** — Register LinkedIn, Twitter/X, YouTube, Facebook before someone else claims the brand name.
4. **Set up Google Search Console** — Verify ownership and submit for indexing as soon as the site is accessible.
5. **Register on Bing Webmaster Tools** — Bing powers multiple AI systems including Copilot.

---

## 30-Day Action Plan

### Week 1: Make the Site Accessible
- [ ] Resolve HTTP 403 Forbidden error
- [ ] Deploy minimum viable homepage with site name, mission, and email signup
- [ ] Create About, Contact, Privacy Policy, and Terms of Service pages
- [ ] Create robots.txt allowing all crawlers
- [ ] Create XML sitemap
- [ ] Set up Google Search Console and Bing Webmaster Tools

### Week 2: Build Entity Foundation
- [ ] Create LinkedIn company page with complete profile
- [ ] Create Twitter/X account and post initial content
- [ ] Create YouTube channel (even if no videos yet)
- [ ] Implement Organization schema with sameAs links to all profiles
- [ ] Implement WebSite schema on homepage
- [ ] Create llms.txt file

### Week 3: Launch Content
- [ ] Publish pillar page: "The Complete Guide to AI Prompts for Parents"
- [ ] Publish 3-5 cluster articles on specific prompt categories
- [ ] Implement Article schema with Person-typed author on all posts
- [ ] Create dedicated author bio pages with Person schema
- [ ] Add BreadcrumbList schema to all interior pages
- [ ] Set up content freshness tracking (publication + last-updated dates)

### Week 4: Build Authority
- [ ] Seek 3-5 backlinks from parenting resource sites or directories
- [ ] Submit guest post or expert contribution to established parenting site
- [ ] Engage on Reddit in relevant parenting and AI subreddits
- [ ] List on relevant directories and review platforms
- [ ] Audit all content for citability score and optimize weak passages
- [ ] Configure all security headers (HSTS, CSP, X-Frame-Options, etc.)

---

## Appendix: Pages Analyzed

| URL | Title | Status | GEO Issues |
|---|---|---|---|
| https://promptsforparents.org | Unknown | 403 Forbidden | All — site inaccessible |
| https://www.promptsforparents.org | Unknown | 403 Forbidden | All — site inaccessible |
| https://promptsforparents.org/robots.txt | N/A | 403 Forbidden | Crawler directives unavailable |
| https://promptsforparents.org/sitemap.xml | N/A | 403 Forbidden | Sitemap unavailable |
| https://promptsforparents.org/llms.txt | N/A | 403 Forbidden | llms.txt unavailable |

---

## Appendix: Competitive Landscape

The "AI prompts for parents" niche has active competition from established sites:

| Competitor | Content Volume | Key Strength |
|---|---|---|
| parentintel.com | 90+ prompts | Comprehensive, well-structured |
| futuresmartparent.com | 55 prompts | Parent-child AI exploration angle |
| amybabys.com | 10 categories | Category-organized, practical |
| momsknowbest.substack.com | Newsletter format | Community-driven, regular updates |
| thebump.com | Viral prompt coverage | Massive existing audience |
| mymagicprompt.com | Educational focus | Prompt engineering depth |
| saprea.org | Sensitive topics | Authority-backed, trust signals |

To compete, promptsforparents.org must differentiate through first-hand experience content, original research, and depth that generic listicle sites cannot match.
