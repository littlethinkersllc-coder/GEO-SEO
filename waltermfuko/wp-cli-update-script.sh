#!/bin/bash
# =================================================================
# waltermfuko.com - WordPress Update Script
# Run this via SSH on your WordPress server, or locally with WP-CLI
# configured to connect to your site.
#
# USAGE:
#   ssh user@your-server
#   cd /path/to/wordpress
#   bash wp-cli-update-script.sh
#
# PREREQUISITES:
#   - WP-CLI installed (wp --version to check)
#   - Running from WordPress root directory
#   - Backup your database first: wp db export backup-before-changes.sql
# =================================================================

set -e

echo "=== waltermfuko.com Update Script ==="
echo "Starting updates..."
echo ""

# -----------------------------------------------------------------
# STEP 0: BACKUP
# -----------------------------------------------------------------
echo "[STEP 0] Creating database backup..."
wp db export backup-$(date +%Y%m%d-%H%M%S).sql
echo "Backup created successfully."
echo ""

# -----------------------------------------------------------------
# STEP 1: List all pages and posts to identify IDs
# -----------------------------------------------------------------
echo "[STEP 1] Listing all pages..."
wp post list --post_type=page --fields=ID,post_title,post_name,post_status --format=table
echo ""
echo "Listing all portfolio items (custom post type)..."
wp post list --post_type=portfolio --fields=ID,post_title,post_name,post_status --format=table 2>/dev/null || echo "No 'portfolio' post type found. Checking other post types..."
wp post list --post_type=project --fields=ID,post_title,post_name,post_status --format=table 2>/dev/null || echo "No 'project' post type found."
echo ""

# -----------------------------------------------------------------
# STEP 2: Global find-and-replace across ALL posts/pages
# Remove em dashes, George Mason University, availability text
# -----------------------------------------------------------------
echo "[STEP 2] Running global content replacements..."

# Get all post IDs (pages + posts + custom types)
ALL_IDS=$(wp post list --post_type=any --post_status=any --fields=ID --format=csv | tail -n +2)

for POST_ID in $ALL_IDS; do
  CONTENT=$(wp post get $POST_ID --field=post_content 2>/dev/null)

  if [ -n "$CONTENT" ]; then
    UPDATED="$CONTENT"

    # Remove em dashes (replace with comma-space or just remove)
    UPDATED=$(echo "$UPDATED" | sed 's/ — /, /g')
    UPDATED=$(echo "$UPDATED" | sed 's/—/, /g')
    UPDATED=$(echo "$UPDATED" | sed 's/ – /, /g')
    UPDATED=$(echo "$UPDATED" | sed 's/–/, /g')

    # Remove George Mason University references
    UPDATED=$(echo "$UPDATED" | sed 's/George Mason University/a large public university/g')
    UPDATED=$(echo "$UPDATED" | sed 's/George Mason/a large public university/g')
    UPDATED=$(echo "$UPDATED" | sed 's/GMU/a large public university/g')

    # Remove availability text
    UPDATED=$(echo "$UPDATED" | sed 's/Available for Contract & Full-Time Roles · DC Metro Area//g')
    UPDATED=$(echo "$UPDATED" | sed 's/Available for Contract.*DC Metro Area//g')
    UPDATED=$(echo "$UPDATED" | sed 's/Currently Available For.*//g')
    UPDATED=$(echo "$UPDATED" | sed 's/Currently available for.*//g')
    UPDATED=$(echo "$UPDATED" | sed 's/Available for hire//gi')
    UPDATED=$(echo "$UPDATED" | sed 's/Open to new projects//gi')
    UPDATED=$(echo "$UPDATED" | sed 's/Open to opportunities//gi')
    UPDATED=$(echo "$UPDATED" | sed 's/DC Metro Area//g')

    # Update email
    UPDATED=$(echo "$UPDATED" | sed 's/[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]*$/wmfuko@gmail.com/g')

    # Remove location references
    UPDATED=$(echo "$UPDATED" | sed 's/Currently based in.*//gi')
    UPDATED=$(echo "$UPDATED" | sed 's/Located in.*//gi')
    UPDATED=$(echo "$UPDATED" | sed 's/Washington, D\.C\.//g')
    UPDATED=$(echo "$UPDATED" | sed 's/Washington, DC//g')
    UPDATED=$(echo "$UPDATED" | sed 's/Virginia//g')

    # Only update if content changed
    if [ "$UPDATED" != "$CONTENT" ]; then
      echo "  Updating post ID $POST_ID..."
      echo "$UPDATED" | wp post update $POST_ID --post_content="$(cat -)" 2>/dev/null
    fi
  fi
done

echo "Global replacements complete."
echo ""

# -----------------------------------------------------------------
# STEP 3: Update "Hire Me" page title to "Contact"
# -----------------------------------------------------------------
echo "[STEP 3] Updating 'Hire Me' page title to 'Contact'..."
HIRE_ME_ID=$(wp post list --post_type=page --name=hire-me --fields=ID --format=csv | tail -n +2)

if [ -n "$HIRE_ME_ID" ]; then
  wp post update $HIRE_ME_ID --post_title="Contact"
  echo "  Updated page ID $HIRE_ME_ID: 'Hire Me' -> 'Contact'"
  echo "  (Slug /hire-me/ kept as-is)"
else
  echo "  WARNING: Could not find 'Hire Me' page by slug. Check manually."
fi
echo ""

# -----------------------------------------------------------------
# STEP 4: Update degree display on homepage
# -----------------------------------------------------------------
echo "[STEP 4] Updating degree display on homepage..."
echo ""
echo "  >>> MANUAL STEP REQUIRED <<<"
echo "  Find the credentials section on the homepage and update:"
echo ""
echo "  OLD: Ed.D. — Doctor of Education | South College"
echo "  NEW: Ed.D. Doctor of Education, Instructional Design Concentration | South College"
echo ""
echo "  OLD: B.A. — Bachelor of Arts | Elms College"
echo "  NEW: B.A. Sociology & Business Management | Elms College"
echo ""
echo "  OLD: MBA — Master of Business Administration | Virginia Wesleyan University"
echo "  NEW: MBA, Master of Business Administration | Virginia Wesleyan University"
echo ""

# -----------------------------------------------------------------
# STEP 5: Update Corporate L&D labels to Consulting Project
# -----------------------------------------------------------------
echo "[STEP 5] Reframing Corporate L&D items as Consulting Projects..."
for POST_ID in $ALL_IDS; do
  CONTENT=$(wp post get $POST_ID --field=post_content 2>/dev/null)
  if echo "$CONTENT" | grep -qi "Corporate L&D\|Corporate L&amp;D"; then
    UPDATED=$(echo "$CONTENT" | sed 's/Corporate L&D/Consulting Project/g')
    UPDATED=$(echo "$UPDATED" | sed 's/Corporate L&amp;D/Consulting Project/g')
    UPDATED=$(echo "$UPDATED" | sed 's/Corporate Training/Consulting Project/g')
    echo "$UPDATED" | wp post update $POST_ID --post_content="$(cat -)" 2>/dev/null
    echo "  Updated post ID $POST_ID: Corporate -> Consulting Project"
  fi
done
echo ""

# -----------------------------------------------------------------
# STEP 6: Update K-12 label
# -----------------------------------------------------------------
echo "[STEP 6] Updating K-12 label..."
for POST_ID in $ALL_IDS; do
  CONTENT=$(wp post get $POST_ID --field=post_content 2>/dev/null)
  if echo "$CONTENT" | grep -qi "9th grade\|K-12"; then
    UPDATED=$(echo "$CONTENT" | sed 's/9th [Gg]rade/K12 (7-12), Large Private Boarding School/g')
    UPDATED=$(echo "$UPDATED" | sed 's/K-12/K12 (7-12)/g')
    echo "$UPDATED" | wp post update $POST_ID --post_content="$(cat -)" 2>/dev/null
    echo "  Updated post ID $POST_ID: K-12 -> K12 (7-12), Large Private Boarding School"
  fi
done
echo ""

# -----------------------------------------------------------------
# STEP 7: Update nav menu - "Hire Me" to "Contact"
# -----------------------------------------------------------------
echo "[STEP 7] Updating navigation menu item..."
echo ""
echo "  >>> MANUAL STEP REQUIRED <<<"
echo "  Go to WordPress Admin > Appearance > Menus"
echo "  Find 'Hire Me' menu item and change its label to 'Contact'"
echo "  Keep the URL as /hire-me/"
echo "  Save the menu."
echo ""

# -----------------------------------------------------------------
# STEP 8: Check internal links
# -----------------------------------------------------------------
echo "[STEP 8] Checking internal links..."
echo "  Valid internal links should be:"
echo "    Home:      /"
echo "    About:     /about/"
echo "    Portfolio:  /portfolio/"
echo "    Contact:   /hire-me/"
echo ""

# Check for any broken internal links
for POST_ID in $ALL_IDS; do
  CONTENT=$(wp post get $POST_ID --field=post_content 2>/dev/null)
  TITLE=$(wp post get $POST_ID --field=post_title 2>/dev/null)
  if echo "$CONTENT" | grep -oP 'href="[^"]*"' | grep -v 'http' | grep -v 'mailto' | grep -v '#' > /dev/null 2>&1; then
    echo "  Page: $TITLE (ID: $POST_ID) has internal links:"
    echo "$CONTENT" | grep -oP 'href="[^"]*"' | grep -v 'http' | grep -v 'mailto' | grep -v '#' | sort -u | sed 's/^/    /'
  fi
done
echo ""

echo "=== Script Complete ==="
echo ""
echo "REMAINING MANUAL STEPS:"
echo "1. Update degree text in homepage HTML block (Step 4)"
echo "2. Update nav menu label in WP Admin (Step 7)"
echo "3. Add mobile nav CSS/HTML to any pages missing it (see mobile-nav-fix.html)"
echo "4. Review University Prof Dev page for scrolling issues"
echo "5. Clear any caching plugins after all changes"
echo "6. Test all pages on mobile"
