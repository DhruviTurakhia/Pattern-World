const grid = document.querySelector("[data-pattern-grid]");
const searchInput = document.querySelector("[data-search]");
const difficultySelect = document.querySelector("[data-difficulty]");
const categoryButtons = [...document.querySelectorAll("[data-category]")];
const resultCount = document.querySelector("[data-result-count]");
const loadMoreButton = document.querySelector("[data-load-more]");
const dialog = document.querySelector("[data-dialog]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogCategory = document.querySelector("[data-dialog-category]");
const dialogCode = document.querySelector("[data-dialog-code]");
const dialogOutput = document.querySelector("[data-dialog-output]");
const sourceLink = document.querySelector("[data-source-link]");
const copyCodeButton = document.querySelector("[data-copy-code]");
const closeDialogButton = document.querySelector("[data-close-dialog]");
const dialogTabs = [...document.querySelectorAll("[data-tab]")];
const dialogPanels = [...document.querySelectorAll("[data-panel]")];

const PAGE_SIZE = 12;
const REPOSITORY_URL = "https://github.com/DhruviTurakhia/Pattern-World";

let patterns = [];
let activeCategory = "all";
let visibleCount = PAGE_SIZE;
let selectedPattern = null;

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const filteredPatterns = () => {
  const search = searchInput.value.trim().toLowerCase();
  const difficulty = difficultySelect.value;

  return patterns.filter((pattern) => {
    const matchesCategory =
      activeCategory === "all" || pattern.category === activeCategory;
    const matchesDifficulty =
      difficulty === "all" || pattern.difficulty === difficulty;
    const searchableText =
      `${pattern.title} ${pattern.category} ${pattern.difficulty} ${pattern.number}`.toLowerCase();
    const matchesSearch = !search || searchableText.includes(search);

    return matchesCategory && matchesDifficulty && matchesSearch;
  });
};

const cardTemplate = (pattern) => {
  const output = escapeHtml(pattern.output || "Run the Python file to see its output.");
  return `
    <article class="pattern-card">
      <div class="card-header">
        <span class="card-category">${pattern.category} collection</span>
        <span class="card-difficulty">${pattern.difficulty}</span>
      </div>
      <h3>${pattern.title}</h3>
      <pre class="output-preview" aria-label="${pattern.title} output">${output}</pre>
      <div class="card-actions">
        <button class="view-code" type="button" data-pattern-id="${pattern.id}">
          View Python code →
        </button>
        <span class="verified">${pattern.verified ? "Output verified" : "Source available"}</span>
      </div>
    </article>
  `;
};

const renderPatterns = () => {
  const matches = filteredPatterns();
  const visiblePatterns = matches.slice(0, visibleCount);

  resultCount.textContent = String(matches.length);

  if (!visiblePatterns.length) {
    grid.innerHTML = `
      <div class="empty-card">
        No patterns match those filters. Try a different search or collection.
      </div>
    `;
  } else {
    grid.innerHTML = visiblePatterns.map(cardTemplate).join("");
  }

  loadMoreButton.hidden = visiblePatterns.length >= matches.length;
};

const resetAndRender = () => {
  visibleCount = PAGE_SIZE;
  renderPatterns();
};

const setDialogTab = (tabName) => {
  dialogTabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  dialogPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === tabName);
  });
};

const openPattern = (patternId) => {
  selectedPattern = patterns.find((pattern) => pattern.id === patternId);
  if (!selectedPattern) return;

  dialogTitle.textContent = selectedPattern.title;
  dialogCategory.textContent =
    `${selectedPattern.category} collection · ${selectedPattern.difficulty}`;
  dialogCode.textContent = selectedPattern.code;
  dialogOutput.textContent = selectedPattern.output;
  sourceLink.href = `${REPOSITORY_URL}/blob/master/${selectedPattern.path}`;
  copyCodeButton.textContent = "Copy Python code";
  setDialogTab("code");
  dialog.showModal();
};

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach((item) =>
      item.classList.toggle("is-active", item === button),
    );
    resetAndRender();
  });
});

searchInput.addEventListener("input", resetAndRender);
difficultySelect.addEventListener("change", resetAndRender);

loadMoreButton.addEventListener("click", () => {
  visibleCount += PAGE_SIZE;
  renderPatterns();
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-pattern-id]");
  if (!button) return;
  openPattern(button.dataset.patternId);
});

closeDialogButton.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

dialogTabs.forEach((tab) => {
  tab.addEventListener("click", () => setDialogTab(tab.dataset.tab));
});

copyCodeButton.addEventListener("click", async () => {
  if (!selectedPattern) return;

  try {
    await navigator.clipboard.writeText(selectedPattern.code);
    copyCodeButton.textContent = "Code copied";
  } catch {
    copyCodeButton.textContent = "Select code above";
  }
});

const loadPatterns = async () => {
  try {
    const response = await fetch("./pattern-data.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    patterns = await response.json();
    renderPatterns();
  } catch (error) {
    grid.innerHTML = `
      <div class="empty-card">
        The pattern library could not be loaded. Serve this folder through a local web server or
        open the deployed GitHub Pages site.
      </div>
    `;
    resultCount.textContent = "0";
    console.error("Pattern catalog failed to load:", error);
  }
};

loadPatterns();
