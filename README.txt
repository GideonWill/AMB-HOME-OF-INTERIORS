AMB HOME OF INTERIORS - website project

index.html     the site (all pages live here: Home, About, Projects, Archive, Services, Contact, project pages)
css/style.css  all styling, colours and image links
js/main.js     all motion and behaviour (menu, page transitions, scrolling gallery, project data)
images/        your 12 photos + logo.png (your logo, used in the header, loader, menu and footer)

HOW TO VIEW: double-click index.html (works offline).
HOW TO PUBLISH: upload the whole folder to any host (Netlify, Vercel, GitHub Pages, cPanel). Keep the folder structure.

HOW TO EDIT
- Phone / WhatsApp numbers and address: search index.html for "0599600001" style links (tel: and wa.me/233...) and "Weija Topbase". The contact form sends its message to WhatsApp (js/main.js, search "wa.me").
- Project names, places, descriptions, which photos each project uses: js/main.js, the "const P" block. On each project page, select the cover or any gallery photo to open the interactive viewer; use the arrows, thumbnails, or keyboard arrow keys to browse.
- Add a photo: put it in images/, then add a line to css/style.css like  .im13{--img:url("../images/your-photo.jpg")}
  and use class "im13" on any element with class "ph".
- Colours: top of css/style.css (--bg, --fg, --acc).
Page links use #/ addresses (e.g. index.html#/about).
