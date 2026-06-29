# Running the Documentation Locally

This documentation site is built with [Jekyll](https://jekyllrb.com/) and the [Just the Docs](https://just-the-docs.github.io/just-the-docs/) theme.

## Prerequisites

- Ruby 3.3 or higher
- Bundler (for managing Ruby dependencies)

## Installation

1. Navigate to the project root directory:

   ```bash
   cd /path/to/lispm
   ```

2. Install the required Ruby gems:

   ```bash
   bundle install
   ```

   This will install Jekyll, the theme, and other dependencies into `vendor/bundle` locally.

## Running the Development Server

To preview the documentation locally:

```bash
bundle exec jekyll serve
```

This will:

- Build the site
- Start a local development server (typically at `http://localhost:4000`)
- Watch for file changes and automatically rebuild the site

Visit `http://localhost:4000` in your browser to view the documentation.

## Building the Site

To build the static site without running the server:

```bash
bundle exec jekyll build
```

The generated site will be in the `_site/` directory.

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch. No manual deployment steps are needed.

## Troubleshooting

If you encounter permission errors during installation, the gems are configured to install locally in `vendor/bundle/`. If you need to reset the bundle, delete the `vendor/bundle` directory and run `bundle install` again.
