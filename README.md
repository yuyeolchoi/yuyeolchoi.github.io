# Academic Portfolio Website

This repository is a publication-focused academic portfolio built for GitHub Pages with Jekyll. It is intentionally data-driven: update the YAML files and configuration rather than editing repeated publication or CV markup.

> Values marked `TODO(owner)` in `_config.yml` and `_data/` still need to be filled in by the site owner.

## 1. Add your information

Edit `_config.yml`:

- Check `author` (name, initials, role, institution, location, and public research email).
- Rewrite `author.bio` in this order: research question, methods, established contribution.
- Replace `research_interests` with topics demonstrated by published work.
- Under `social`, add only profiles you actively use. `scholar`, `researchgate`, `github`, and `linkedin` take full URLs; `orcid` takes the bare ORCID iD (for example `0000-0001-8903-3551`) and the templates build the `https://orcid.org/...` link. Leave unused values as empty strings and they are not rendered.
- Replace `url` with `https://<username>.github.io`.

`author.profile_image` is empty, so the home hero shows the name, the bio and the facts list. To show a portrait, add for example `assets/images/profile.jpg` (4:5 ratio, about 800x1000px) and set `author.profile_image: "/assets/images/profile.jpg"`; the portrait then appears above the facts list beside the hero text.

## 2. Add publications

Edit `_data/publications.yml`. Keep entries newest first and preserve this structure:

```yaml
- title: "Article title"
  authors:
    - "First Author"
    - "Your Name"
  venue: "Journal Name"
  year: 2026
  volume: "10"
  issue: "2"
  pages: "100-110"
  doi: "10.xxxx/example"
  paper_url: "https://doi.org/10.xxxx/example"
  pdf_url: ""
  featured: true
  contribution: "Demonstrated one specific contribution supported by this paper."
  id: "2026-short-slug"
```

The name in `authors` must exactly match `author.name` in `_config.yml` for bold highlighting. Use empty strings for unavailable DOI, PDF, issue, or page values. Set `featured: true` for three to five papers shown on the home page. Give every entry a unique `id`; the research page uses these ids to link publications to themes.

Every page that lists publications (Home, Publications, CV) renders from this one file through the shared `_includes/publication.html` include, so adding an entry here updates all three pages. The Publications page also emits Google Scholar `citation_*` meta tags from the same data.

## 2b. Update research themes

Edit `_data/research_themes.yml`. Each theme has a `title`, a one- or two-sentence `description`, and a `publication_ids` list referencing `id` values from `_data/publications.yml`. Keep descriptions within what the published work supports.

## 2c. Update projects

Edit `_data/projects.yml`. Each entry has an `id`, `title`, `type`, `stack`, `status`, `source` (a public repository URL or `""`), a one-sentence `summary`, `body` paragraphs, and an optional photograph (`image`, `image_alt`, `caption`). Only state what exists and is in use; leave `image` empty until a real photograph is available, and the page shows no empty frame. The Projects page renders every entry; the CV's "Software, data, and protocols" section in `_data/cv.yml` is the place for the one-line record of the same tools.

## 3. Update CV sections

- Edit `_data/cv.yml` for education, completed research experience, funding, awards, presentations, teaching, service, skills, software or data resources, and memberships.
- Edit `about.html` to update the narrative profile text.
- To offer a PDF CV, add the file under `assets/cv/` and set `author.cv_pdf` in `_config.yml`, for example `/assets/cv/yuyeol-choi-cv.pdf`. The download button is hidden while `author.cv_pdf` is empty.
- Do not publish a phone number, birth date, home address, confidential work, or ongoing project details.

The public navigation (`_data/navigation.yml`) is:

- `Home`: summarized profile, featured publications, core expertise, and selected funding and experience.
- `Publications`: full publication list grouped by year.
- `Research`: research themes with linked publications.
- `CV`: printable full CV-style page.
- `About`: research background and profile links.

`funding.html`, `awards.html`, and `experience.html` are kept as short pages that point to the matching CV section; they are not in the navigation.

## 4. Preview locally

Install a current Ruby version, then run:

```powershell
gem install bundler
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. The generated `_site` directory is ignored by Git.

## 5. Publish as a GitHub user site

1. On GitHub, create a public repository named `<username>.github.io`.
2. In this folder, initialize and connect Git:

```powershell
git init -b main
git add .
git commit -m "Create academic portfolio site"
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main
```

3. In GitHub, open **Settings > Pages** and select **Deploy from a branch**, `main`, and `/ (root)`.
4. Visit `https://<username>.github.io` after GitHub finishes the deployment.

## 6. Work from another computer

Clone once:

```powershell
git clone https://github.com/<username>/<username>.github.io.git
cd <username>.github.io
bundle install
```

For each update:

```powershell
git pull --rebase
bundle exec jekyll serve
git add .
git commit -m "Update publications and CV"
git push
```

Always pull before editing when switching computers. Commit source files only; do not commit `_site`, caches, or installed dependencies.

## CV PDF

`.github/workflows/pages.yml` builds the site on every push to `main`, renders `/cv/` to `assets/cv/yuyeol-choi-cv.pdf` with `scripts/render-cv-pdf.mjs` (Playwright, A4, the print stylesheet, a dated footer), and deploys the result to GitHub Pages. `author.cv_pdf` in `_config.yml` points at that file, which puts the "Download PDF CV" button on the CV page. The workflow only deploys when the repository's Pages source is set to **GitHub Actions** (Settings, Pages, Build and deployment). To render the PDF locally: build the site, `npm install playwright`, `npx playwright install chromium`, then `node scripts/render-cv-pdf.mjs _site out.pdf`.

## Design system

The look was rebuilt with [Hallmark](https://github.com/nutlope/hallmark) (theme: Almanac, in a green colourway). Every colour, font, size and spacing value is a token at the top of `assets/css/style.css`; the first comment lines there are the Hallmark stamp recording the shape, hero posture, waivers and copy changes. Fonts (Hanken Grotesk, Newsreader, IBM Plex Mono) load from Google Fonts in `_layouts/default.html`. Keep new styles on the tokens (`--color-*`, `--space-*`, `--text-*`) rather than literal values, and avoid small tracked-caps labels above headings.

Before and after screenshots of the redesign are in `docs/design-preview/` (excluded from the built site).
