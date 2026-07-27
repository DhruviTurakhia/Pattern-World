# Pattern World

**An interactive collection of 83 Python pattern programs, created as a university curriculum
project and rebuilt as a modern learning resource.**

[Explore the live website](https://dhruviturakhia.github.io/Pattern-World/)

## About the project

Pattern World combines two early repositories into one organized project:

- A responsive website for searching, filtering, and reading pattern examples
- 48 number-pattern programs
- 35 star-pattern programs
- Generated output previews for an input value of `5`
- Direct links from every example to its Python source file

The project is useful for learning nested loops, conditions, numeric sequences, spacing, and output
formatting. The original exercises are preserved as curriculum work, while the web interface and
repository structure have been rebuilt for clarity and accessibility.

## Project structure

```text
Pattern-World/
├── patterns/
│   ├── number/       # 48 Python number patterns
│   └── star/         # 35 Python star patterns
├── tools/
│   └── build_catalog.py
├── pattern-data.json
├── index.html
├── styles.css
└── app.js
```

## Run locally

Because the website loads `pattern-data.json`, serve the repository through a local web server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Rebuild the catalog

The catalog is generated from the Python files and verifies every example by running it with sample
input:

```bash
python tools/build_catalog.py
```

## Technologies

Python · HTML · CSS · JavaScript · GitHub Pages

## Author

[Dhruvi Turakhia](https://github.com/DhruviTurakhia)
