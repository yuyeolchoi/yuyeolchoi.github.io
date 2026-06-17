# Academic Portfolio Website

This repository is a publication-focused academic portfolio built for GitHub Pages with Jekyll. It is intentionally data-driven: update the YAML files and configuration rather than editing repeated publication or CV markup.

> The included name, biography, CV, and publications are examples. Replace every placeholder before publishing.

## 1. Add your information

Edit `_config.yml`:

- Replace `Your Name`, initials, role, institution, location, and public research email.
- Rewrite `author.bio` in this order: research question, methods, established contribution.
- Replace `research_interests` with topics demonstrated by published work.
- Add only profile URLs that you actively use. Leave unused values as empty strings.
- Replace `url` with `https://<username>.github.io`.

Replace `assets/images/profile-placeholder.svg` with a professional image such as `assets/images/profile.jpg`, then update `author.profile_image`.

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
```

The name in `authors` must exactly match `author.name` in `_config.yml` for bold highlighting. Use empty strings for unavailable DOI, PDF, issue, or page values. Set `featured: true` for three to five papers shown on the home page.

## 3. Update CV sections

- Edit `_data/cv.yml` for education, completed research experience, funding, awards, presentations, teaching, service, skills, software or data resources, and memberships.
- Edit `about.html` and replace every bracketed prompt.
- To offer a PDF CV, add the file under `assets/files/` and set `author.cv_pdf` in `_config.yml`, for example `/assets/files/your-name-cv.pdf`.
- Do not publish a phone number, birth date, home address, confidential work, or ongoing project details.

The public navigation is:

- `Home`: summarized profile, featured publications, funding, awards, and experience.
- `Publications`: full publication list.
- `Funding`: grants, fellowships, scholarships, and travel grants.
- `Honors & Awards`: awards and recognitions.
- `Experience`: research experience, education, teaching, and service.
- `CV`: printable full CV-style page.

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
