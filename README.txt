HANNAH MAE B. PACIO — PURPLE CYBER PORTFOLIO

PREVIEW
1. Extract the ZIP.
2. Open index.html in a browser.
3. The homepage shows the portrait reveal, decoded name, and loading bar.
4. Click ENTER to move into the portfolio.

HOMEPAGE
- Portrait left; name decoding right.
- Uses the two Wix-hosted portrait image URLs supplied by the user.
- Charcoal/purple/lavender/cyan theme.
- No “Computer Science Student” header text and no extra homepage copy.
- Loading bar runs with the name reveal.

PERSONAL INFORMATION
- Includes contact details, a short biography, and hobbies/interests.

ACHIEVEMENTS
- Two horizontal timelines: Academic Achievements and Extra Curricular Achievements.
- Click a stop to view its achievement details and large photo preview. Once a stop has at least one photo, use the visible previous/next arrows in the preview to browse its photos.
- To edit achievement details or add photos, update the ACHIEVEMENTS data in index.html. Add as many image paths as needed to that stop's photos array (for example: photos: ["elem.png", "assets/award.jpg"]).
- There are no public photo-upload controls; website visitors can only view the photos.
- Add image files to the website and update the matching photos array for changes to appear for all visitors.

FAMILY
- Prepared layout with editable text and photo upload/drag-drop preview.
- To permanently publish your photo, place it in assets and update the HTML image source.

DEPLOY TO CLOUDFLARE PAGES
1. Upload index.html, style.css, script.js, and assets to a GitHub repository.
2. Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git.
3. Select the repository.
4. For this plain static website, use build command: exit 0.
5. Set build output directory to / (repository root, if accepted by the setup UI).
6. Deploy to receive a *.pages.dev address.

NOTES
- The pages use horizontal transitions; small screens may allow vertical scrolling within content pages to keep text accessible.
- Google Fonts are loaded online; the page still has fallback fonts.
- Achievement edits are made in index.html and appear after the updated page is published.
