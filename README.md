# Pattern World

**A visual Python interview atlas—from the first nested loop to scalable system design.**

[Explore the live website](https://dhruviturakhia.github.io/Pattern-World/)

Pattern World began as a university collection of star and number programs. It now uses that
collection as chapter zero in a larger, concept-first learning path for Python interviews.

The site does not run submitted code and does not reproduce interview question banks. Instead, it
helps learners build the mental models behind those questions with:

- short, plain-language explanations;
- practical recognition cues and tradeoffs;
- pseudocode before implementation;
- simple Python examples;
- step-by-step algorithm visualizations; and
- a connected roadmap from algorithms to code design to system design.

## What is included

### Algorithms

16 guides move from visible loops and complexity through arrays, hashing, sorting, search, common
problem-solving patterns, trees, graphs, greedy algorithms, dynamic programming, and specialized
data structures.

### Python and low-level design

12 guides cover classes, abstraction, polymorphism, composition, SOLID, UML, reusable design
patterns, concurrency, and a repeatable interview workflow.

### System design

15 guides follow a request through networking, load balancing, APIs, data stores, indexes, caches,
queues, replication, sharding, consistency, resilience, observability, and security.

### Visual lab

Four interactive, dependency-free visualizations connect changing state to highlighted pseudocode:

- Bubble sort
- Binary search
- Breadth-first search
- Dynamic programming with climbing stairs

### Original pattern library

The original learning collection remains fully available:

- 48 number-pattern programs
- 35 star-pattern programs
- generated output previews for input `5`
- verified Python output for every example

## Project structure

```text
Pattern-World/
├── patterns/
│   ├── number/              # 48 Python number patterns
│   └── star/                # 35 Python star patterns
├── tools/
│   ├── build_catalog.py     # Rebuild and verify pattern output
│   └── verify_site.mjs      # Validate curriculum and site assets
├── curriculum-data.js       # 43 concept guides
├── pattern-data.json        # Generated pattern catalog
├── index.html
├── styles.css
├── app.js
└── ROADMAP.md
```

## Run locally

The site is static, but it loads `pattern-data.json`, so serve the folder through a local web
server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Verify the project

Rebuild the original pattern catalog and execute every Python pattern:

```bash
python tools/build_catalog.py
```

Validate curriculum counts, relationships, source files, required assets, and page hooks:

```bash
node tools/verify_site.mjs
```

## Content approach

The topic map was informed by established interview-preparation roadmaps, including Ashish Pratap
Singh's open collections for
[data structures and algorithms](https://github.com/ashishps1/awesome-leetcode-resources),
[low-level design](https://github.com/ashishps1/awesome-low-level-design), and
[system design](https://github.com/ashishps1/awesome-system-design-resources).

Pattern World's explanations, pseudocode, Python examples, information architecture, and
visualizations are original to this project. The site teaches concepts rather than copying problem
statements or solutions.

## Expansion plan

The current release establishes the full learning architecture and a complete foundation across all
three tracks. See [ROADMAP.md](./ROADMAP.md) for the next visual labs, detailed case studies, and
system walkthroughs planned for future releases.

## Technologies

Python · HTML · CSS · JavaScript · GitHub Pages

## Author

[Dhruvi Turakhia](https://github.com/DhruviTurakhia)
