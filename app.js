const curriculum = window.CURRICULUM || [];
const tracks = window.LEARNING_TRACKS || [];
const repositoryUrl = "https://github.com/DhruviTurakhia/Pattern-World";

const trackMap = Object.fromEntries(tracks.map((track) => [track.id, track]));
const trackNames = {
  dsa: "Algorithms",
  lld: "Code design",
  system: "System design",
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

// Navigation and page progress
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const progressBar = document.querySelector("[data-reading-progress]");

const closeNavigation = () => {
  nav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation");
};

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeNavigation();
});

const updatePageChrome = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${clamp(progress, 0, 100)}%`;
};

window.addEventListener("scroll", updatePageChrome, { passive: true });
updatePageChrome();

// Concept atlas
const conceptGrid = document.querySelector("[data-concept-grid]");
const conceptCount = document.querySelector("[data-concept-count]");
const conceptSearch = document.querySelector("[data-concept-search]");
const levelFilter = document.querySelector("[data-level-filter]");
const trackFilterButtons = [...document.querySelectorAll("[data-track-filter]")];
const conceptLoadMore = document.querySelector("[data-concept-load-more]");
const roadmapTrackButtons = [...document.querySelectorAll("[data-roadmap-track]")];

const conceptDialog = document.querySelector("[data-concept-dialog]");
const closeConceptButton = document.querySelector("[data-close-concept]");
const detailTrack = document.querySelector("[data-detail-track]");
const detailNumber = document.querySelector("[data-detail-number]");
const detailLevel = document.querySelector("[data-detail-level]");
const detailEyebrow = document.querySelector("[data-detail-eyebrow]");
const detailTitle = document.querySelector("[data-detail-title]");
const detailSummary = document.querySelector("[data-detail-summary]");
const detailIntuition = document.querySelector("[data-detail-intuition]");
const detailPoints = document.querySelector("[data-detail-points]");
const detailComplexity = document.querySelector("[data-detail-complexity]");
const detailCode = document.querySelector("[data-detail-code]");
const relatedConcepts = document.querySelector("[data-related-concepts]");
const codeTabs = [...document.querySelectorAll("[data-code-tab]")];
const copyConceptButton = document.querySelector("[data-copy-concept]");

const CONCEPT_PAGE_SIZE = 12;
let activeTrack = "all";
let visibleConcepts = CONCEPT_PAGE_SIZE;
let selectedConcept = null;
let selectedCodeType = "pseudo";

const sortedCurriculum = [...curriculum].sort((a, b) => {
  const trackOrder = ["dsa", "lld", "system"];
  const trackDifference = trackOrder.indexOf(a.track) - trackOrder.indexOf(b.track);
  return trackDifference || a.order - b.order;
});

const filteredConcepts = () => {
  const query = conceptSearch?.value.trim().toLowerCase() || "";
  const level = levelFilter?.value || "all";

  return sortedCurriculum.filter((concept) => {
    const matchesTrack = activeTrack === "all" || concept.track === activeTrack;
    const matchesLevel = level === "all" || concept.level === level;
    const searchable = [
      concept.title,
      concept.summary,
      concept.eyebrow,
      concept.level,
      trackNames[concept.track],
      ...concept.points,
    ]
      .join(" ")
      .toLowerCase();
    return matchesTrack && matchesLevel && (!query || searchable.includes(query));
  });
};

const conceptCardTemplate = (concept) => {
  const track = trackMap[concept.track] || {};
  const number = String(concept.order).padStart(2, "0");
  const labChip = concept.lab
    ? `<span class="concept-lab-chip"><i></i> Visual lab</span>`
    : "";

  return `
    <button class="concept-card concept-${escapeHtml(track.accent || "violet")}" type="button"
      data-concept-id="${escapeHtml(concept.id)}">
      <span class="concept-card-top">
        <span class="concept-number">${number}</span>
        <span class="level-pill"><i></i>${escapeHtml(concept.level)}</span>
      </span>
      <span class="concept-track">${escapeHtml(track.label || "")}</span>
      <strong>${escapeHtml(concept.title)}</strong>
      <span class="concept-summary">${escapeHtml(concept.summary)}</span>
      <span class="concept-card-bottom">
        ${labChip}
        <span class="concept-open">Open guide <b aria-hidden="true">↗</b></span>
      </span>
    </button>
  `;
};

const renderConcepts = () => {
  if (!conceptGrid) return;
  const matches = filteredConcepts();
  const visible = matches.slice(0, visibleConcepts);
  if (conceptCount) conceptCount.textContent = String(matches.length);

  if (!visible.length) {
    conceptGrid.innerHTML = `
      <div class="empty-card">
        <strong>No concept matches that search.</strong>
        <span>Try a broader term, another level, or a different track.</span>
      </div>
    `;
  } else {
    conceptGrid.innerHTML = visible.map(conceptCardTemplate).join("");
  }

  if (conceptLoadMore) conceptLoadMore.hidden = visible.length >= matches.length;
};

const setTrackFilter = (track) => {
  activeTrack = track;
  visibleConcepts = CONCEPT_PAGE_SIZE;
  trackFilterButtons.forEach((button) => {
    const isActive = button.dataset.trackFilter === track;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  renderConcepts();
};

trackFilterButtons.forEach((button) => {
  button.addEventListener("click", () => setTrackFilter(button.dataset.trackFilter));
});

conceptSearch?.addEventListener("input", () => {
  visibleConcepts = CONCEPT_PAGE_SIZE;
  renderConcepts();
});

levelFilter?.addEventListener("change", () => {
  visibleConcepts = CONCEPT_PAGE_SIZE;
  renderConcepts();
});

conceptLoadMore?.addEventListener("click", () => {
  visibleConcepts += CONCEPT_PAGE_SIZE;
  renderConcepts();
});

roadmapTrackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTrackFilter(button.dataset.roadmapTrack);
    document.querySelector("#learn")?.scrollIntoView({ behavior: "smooth" });
  });
});

const setCodeType = (type) => {
  selectedCodeType = type;
  codeTabs.forEach((tab) => {
    const isActive = tab.dataset.codeTab === type;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  if (selectedConcept && detailCode) {
    detailCode.textContent = type === "python"
      ? selectedConcept.python
      : selectedConcept.pseudocode;
  }
  if (copyConceptButton) copyConceptButton.textContent = "Copy";
};

const openConcept = (conceptId) => {
  selectedConcept = curriculum.find((concept) => concept.id === conceptId);
  if (!selectedConcept || !conceptDialog) return;

  const track = trackMap[selectedConcept.track] || {};
  detailTrack.textContent = (track.label || selectedConcept.track).toUpperCase();
  detailNumber.textContent = String(selectedConcept.order).padStart(2, "0");
  detailLevel.textContent = selectedConcept.level;
  detailEyebrow.textContent = selectedConcept.eyebrow.toUpperCase();
  detailTitle.textContent = selectedConcept.title;
  detailSummary.textContent = selectedConcept.summary;
  detailIntuition.textContent = selectedConcept.intuition;
  detailPoints.innerHTML = selectedConcept.points
    .map((point) => `<li><span>→</span>${escapeHtml(point)}</li>`)
    .join("");
  detailComplexity.textContent = selectedConcept.complexity;
  relatedConcepts.innerHTML = selectedConcept.related
    .map((relatedId) => {
      const related = curriculum.find((concept) => concept.id === relatedId);
      if (!related) return "";
      return `<button type="button" data-related-id="${escapeHtml(related.id)}">
        ${escapeHtml(related.title)} <span aria-hidden="true">→</span>
      </button>`;
    })
    .join("");

  conceptDialog.className = `detail-dialog dialog-${track.accent || "violet"}`;
  setCodeType("pseudo");
  conceptDialog.showModal();
};

conceptGrid?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-concept-id]");
  if (card) openConcept(card.dataset.conceptId);
});

relatedConcepts?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-related-id]");
  if (button) {
    openConcept(button.dataset.relatedId);
    document.querySelector(".detail-content")?.scrollTo({ top: 0, behavior: "smooth" });
  }
});

closeConceptButton?.addEventListener("click", () => conceptDialog.close());
conceptDialog?.addEventListener("click", (event) => {
  if (event.target === conceptDialog) conceptDialog.close();
});

codeTabs.forEach((tab) => {
  tab.addEventListener("click", () => setCodeType(tab.dataset.codeTab));
});

copyConceptButton?.addEventListener("click", async () => {
  if (!selectedConcept) return;
  const value = selectedCodeType === "python"
    ? selectedConcept.python
    : selectedConcept.pseudocode;
  try {
    await navigator.clipboard.writeText(value);
    copyConceptButton.textContent = "Copied";
  } catch {
    copyConceptButton.textContent = "Select the code";
  }
});

renderConcepts();

// Interactive visual lab
const visualStage = document.querySelector("[data-visual-stage]");
const labTabs = [...document.querySelectorAll("[data-lab]")];
const labKicker = document.querySelector("[data-lab-kicker]");
const labTitle = document.querySelector("[data-lab-title]");
const labStep = document.querySelector("[data-lab-step]");
const labTotal = document.querySelector("[data-lab-total]");
const stepBadge = document.querySelector("[data-step-badge]");
const stepTitle = document.querySelector("[data-step-title]");
const stepDetail = document.querySelector("[data-step-detail]");
const labCode = document.querySelector("[data-lab-code]");
const labConceptLink = document.querySelector("[data-lab-concept]");
const labReset = document.querySelector("[data-lab-reset]");
const labPrevious = document.querySelector("[data-lab-previous]");
const labNext = document.querySelector("[data-lab-next]");
const labPlay = document.querySelector("[data-lab-play]");
const labSpeed = document.querySelector("[data-lab-speed]");

const createSortSteps = () => {
  const values = [7, 3, 9, 2, 6, 4];
  const steps = [{
    values: [...values],
    active: [],
    sorted: [],
    codeLine: 0,
    title: "Start with the full unsorted list.",
    detail: "We will compare neighboring values from left to right.",
  }];

  for (let end = values.length - 1; end > 0; end -= 1) {
    let swapped = false;
    for (let index = 0; index < end; index += 1) {
      steps.push({
        values: [...values],
        active: [index, index + 1],
        sorted: Array.from({ length: values.length - end - 1 }, (_, offset) => values.length - 1 - offset),
        codeLine: 2,
        title: `Compare ${values[index]} and ${values[index + 1]}.`,
        detail: values[index] > values[index + 1]
          ? "The left value is larger, so this pair is out of order."
          : "This pair is already in the correct order.",
      });
      if (values[index] > values[index + 1]) {
        [values[index], values[index + 1]] = [values[index + 1], values[index]];
        swapped = true;
        steps.push({
          values: [...values],
          active: [index, index + 1],
          sorted: Array.from({ length: values.length - end - 1 }, (_, offset) => values.length - 1 - offset),
          codeLine: 3,
          title: "Swap the neighboring values.",
          detail: `${values[index + 1]} moves right; the larger values gradually “bubble” to the end.`,
        });
      }
    }
    steps.push({
      values: [...values],
      active: [],
      sorted: Array.from({ length: values.length - end }, (_, offset) => values.length - 1 - offset),
      codeLine: 4,
      title: `${values[end]} is now in its final position.`,
      detail: "The next pass can ignore the sorted end of the list.",
    });
    if (!swapped) break;
  }

  steps.push({
    values: [...values],
    active: [],
    sorted: values.map((_, index) => index),
    codeLine: 5,
    title: "The list is sorted.",
    detail: "Every value is now less than or equal to the value on its right.",
  });
  return steps;
};

const createSearchSteps = () => {
  const values = [2, 5, 8, 12, 16, 23, 38];
  const target = 23;
  const steps = [{
    values,
    low: 0,
    high: values.length - 1,
    mid: null,
    discarded: [],
    codeLine: 0,
    title: `Search for ${target} in an ordered list.`,
    detail: "Low and high begin at the two ends of the possible range.",
  }];
  let low = 0;
  let high = values.length - 1;
  const discarded = new Set();

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      values,
      low,
      high,
      mid,
      discarded: [...discarded],
      codeLine: 2,
      title: `Check the middle value: ${values[mid]}.`,
      detail: `${values[mid]} is ${values[mid] < target ? "smaller than" : values[mid] > target ? "larger than" : "equal to"} ${target}.`,
    });
    if (values[mid] === target) {
      steps.push({
        values,
        low,
        high,
        mid,
        found: mid,
        discarded: [...discarded],
        codeLine: 3,
        title: `Target found at index ${mid}.`,
        detail: "The search ends as soon as the middle value matches.",
      });
      break;
    }
    if (values[mid] < target) {
      for (let index = low; index <= mid; index += 1) discarded.add(index);
      low = mid + 1;
      steps.push({
        values,
        low,
        high,
        mid: null,
        discarded: [...discarded],
        codeLine: 4,
        title: "Discard the left half.",
        detail: `Everything through ${values[mid]} is too small, so low moves right.`,
      });
    } else {
      for (let index = mid; index <= high; index += 1) discarded.add(index);
      high = mid - 1;
      steps.push({
        values,
        low,
        high,
        mid: null,
        discarded: [...discarded],
        codeLine: 5,
        title: "Discard the right half.",
        detail: `Everything from ${values[mid]} onward is too large, so high moves left.`,
      });
    }
  }
  return steps;
};

const graphNodes = [
  { id: "A", x: 50, y: 10 },
  { id: "B", x: 22, y: 38 },
  { id: "C", x: 76, y: 38 },
  { id: "D", x: 9, y: 76 },
  { id: "E", x: 36, y: 76 },
  { id: "F", x: 64, y: 76 },
  { id: "G", x: 91, y: 76 },
];
const graphEdges = [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"], ["C", "G"], ["E", "F"]];
const graphAdjacency = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F", "G"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
  G: ["C"],
};

const createGraphSteps = () => {
  const queue = ["A"];
  const seen = new Set(["A"]);
  const complete = [];
  const steps = [{
    queue: [...queue],
    seen: [...seen],
    active: "A",
    complete: [],
    codeLine: 0,
    title: "Start at node A.",
    detail: "Mark A as seen and place it in the queue.",
  }];

  while (queue.length) {
    const node = queue.shift();
    steps.push({
      queue: [...queue],
      seen: [...seen],
      active: node,
      complete: [...complete],
      codeLine: 2,
      title: `Remove ${node} from the front of the queue.`,
      detail: "Breadth-first search always processes the oldest waiting node.",
    });
    graphAdjacency[node].forEach((neighbor) => {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        queue.push(neighbor);
        steps.push({
          queue: [...queue],
          seen: [...seen],
          active: neighbor,
          complete: [...complete, node],
          codeLine: 4,
          title: `Discover ${neighbor} from ${node}.`,
          detail: `Mark ${neighbor} immediately and add it to the back of the queue.`,
        });
      }
    });
    complete.push(node);
  }
  steps.push({
    queue: [],
    seen: [...seen],
    active: null,
    complete: [...complete],
    codeLine: 5,
    title: "Every reachable node has been visited.",
    detail: `Traversal order: ${complete.join(" → ")}.`,
  });
  return steps;
};

const createDpSteps = () => {
  const cells = [1, 1, null, null, null, null, null];
  const steps = [{
    cells: [...cells],
    active: [0, 1],
    codeLine: 0,
    title: "Write the two base cases.",
    detail: "There is one way to stay at step 0 and one way to reach step 1.",
  }];
  for (let index = 2; index <= 6; index += 1) {
    steps.push({
      cells: [...cells],
      active: [index - 2, index - 1],
      target: index,
      codeLine: 2,
      title: `Build the answer for step ${index}.`,
      detail: `You can arrive from step ${index - 1} or step ${index - 2}. Reuse both answers.`,
    });
    cells[index] = cells[index - 1] + cells[index - 2];
    steps.push({
      cells: [...cells],
      active: [index],
      target: index,
      complete: Array.from({ length: index + 1 }, (_, cell) => cell),
      codeLine: 3,
      title: `dp[${index}] = ${cells[index - 1]} + ${cells[index - 2]} = ${cells[index]}.`,
      detail: "This state is solved once and becomes available to later states.",
    });
  }
  steps.push({
    cells: [...cells],
    active: [6],
    complete: cells.map((_, index) => index),
    codeLine: 4,
    title: "The final state contains the answer.",
    detail: "There are 13 distinct ways to climb 6 steps using moves of 1 or 2.",
  });
  return steps;
};

const labDefinitions = {
  sort: {
    kicker: "ALGORITHM · SORTING",
    title: "Bubble sort",
    concept: "sorting",
    steps: createSortSteps(),
    code: [
      "FOR each pass through the list",
      "    assume no swap is needed",
      "    compare each neighboring pair",
      "    swap when left > right",
      "    lock the largest remaining value",
      "RETURN the ordered list",
    ],
  },
  search: {
    kicker: "ALGORITHM · SEARCH",
    title: "Binary search",
    concept: "binary-search",
    steps: createSearchSteps(),
    code: [
      "low = first index; high = last index",
      "WHILE low <= high",
      "    mid = middle of low and high",
      "    IF values[mid] is target: RETURN mid",
      "    IF too small: low = mid + 1",
      "    ELSE: high = mid - 1",
    ],
  },
  graph: {
    kicker: "ALGORITHM · GRAPH TRAVERSAL",
    title: "Breadth-first search",
    concept: "graphs",
    steps: createGraphSteps(),
    code: [
      "queue = [start]; mark start seen",
      "WHILE queue is not empty",
      "    node = remove front",
      "    FOR each neighbor of node",
      "        IF unseen: mark and enqueue",
      "RETURN traversal order",
    ],
  },
  dp: {
    kicker: "ALGORITHM · DYNAMIC PROGRAMMING",
    title: "Climbing stairs",
    concept: "dynamic-programming",
    steps: createDpSteps(),
    code: [
      "dp[0] = 1; dp[1] = 1",
      "FOR step from 2 through n",
      "    reuse the two earlier answers",
      "    dp[step] = dp[step-1] + dp[step-2]",
      "RETURN dp[n]",
    ],
  },
};

let activeLab = "sort";
let labStepIndex = 0;
let playTimer = null;

const renderBars = (step) => {
  const maximum = Math.max(...step.values);
  return `
    <div class="bar-visual" aria-label="Values ${step.values.join(", ")}">
      ${step.values.map((value, index) => {
        const classes = [
          "bar-item",
          step.active?.includes(index) ? "is-active" : "",
          step.sorted?.includes(index) ? "is-complete" : "",
        ].filter(Boolean).join(" ");
        return `<div class="${classes}" style="--bar-height:${(value / maximum) * 100}%">
          <span>${value}</span><i></i><small>${index}</small>
        </div>`;
      }).join("")}
    </div>
  `;
};

const renderSearch = (step) => `
  <div class="search-visual">
    <div class="search-target">TARGET <strong>23</strong></div>
    <div class="search-array">
      ${step.values.map((value, index) => {
        const classes = [
          "search-cell",
          step.mid === index ? "is-active" : "",
          step.found === index ? "is-found" : "",
          step.discarded?.includes(index) ? "is-discarded" : "",
          index >= step.low && index <= step.high ? "is-range" : "",
        ].filter(Boolean).join(" ");
        const pointers = [
          step.low === index ? "LOW" : "",
          step.mid === index ? "MID" : "",
          step.high === index ? "HIGH" : "",
        ].filter(Boolean).join(" · ");
        return `<div class="${classes}">
          <span class="pointer-label">${pointers}</span>
          <strong>${value}</strong>
          <small>${index}</small>
        </div>`;
      }).join("")}
    </div>
  </div>
`;

const edgeStyle = (fromId, toId) => {
  const from = graphNodes.find((node) => node.id === fromId);
  const to = graphNodes.find((node) => node.id === toId);
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  const width = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  return `--x:${from.x}%;--y:${from.y}%;--width:${width}%;--angle:${angle}deg`;
};

const renderGraph = (step) => `
  <div class="graph-visual">
    <div class="graph-canvas">
      ${graphEdges.map(([from, to]) =>
        `<i class="graph-edge" style="${edgeStyle(from, to)}"></i>`).join("")}
      ${graphNodes.map((node) => {
        const classes = [
          "graph-node",
          step.active === node.id ? "is-active" : "",
          step.complete?.includes(node.id) ? "is-complete" : "",
          step.seen?.includes(node.id) ? "is-seen" : "",
        ].filter(Boolean).join(" ");
        return `<span class="${classes}" style="--x:${node.x}%;--y:${node.y}%">${node.id}</span>`;
      }).join("")}
    </div>
    <div class="queue-view">
      <span>QUEUE</span>
      <div>${step.queue.length
        ? step.queue.map((node) => `<i>${node}</i>`).join("")
        : "<small>empty</small>"}</div>
      <b>front →</b>
    </div>
  </div>
`;

const renderDp = (step) => `
  <div class="dp-visual">
    <div class="staircase" aria-hidden="true">
      ${step.cells.map((_, index) => `<i style="--step:${index}"><span>${index}</span></i>`).join("")}
    </div>
    <div class="dp-table">
      <p>NUMBER OF WAYS TO REACH EACH STEP</p>
      <div>
        ${step.cells.map((value, index) => {
          const classes = [
            "dp-cell",
            step.active?.includes(index) ? "is-active" : "",
            step.complete?.includes(index) ? "is-complete" : "",
            step.target === index ? "is-target" : "",
          ].filter(Boolean).join(" ");
          return `<span class="${classes}">
            <small>dp[${index}]</small>
            <strong>${value ?? "?"}</strong>
          </span>`;
        }).join("")}
      </div>
    </div>
  </div>
`;

const renderVisual = (lab, step) => {
  if (!visualStage) return;
  if (lab === "sort") visualStage.innerHTML = renderBars(step);
  if (lab === "search") visualStage.innerHTML = renderSearch(step);
  if (lab === "graph") visualStage.innerHTML = renderGraph(step);
  if (lab === "dp") visualStage.innerHTML = renderDp(step);
};

const stopPlayback = () => {
  if (playTimer) window.clearInterval(playTimer);
  playTimer = null;
  if (labPlay) labPlay.innerHTML = '<span aria-hidden="true">▶</span> Play';
};

const renderLab = () => {
  const definition = labDefinitions[activeLab];
  const step = definition.steps[labStepIndex];
  labKicker.textContent = definition.kicker;
  labTitle.textContent = definition.title;
  labStep.textContent = String(labStepIndex + 1);
  labTotal.textContent = String(definition.steps.length);
  stepBadge.textContent = String(labStepIndex + 1).padStart(2, "0");
  stepTitle.textContent = step.title;
  stepDetail.textContent = step.detail;
  labCode.innerHTML = definition.code.map((line, index) =>
    `<li class="${step.codeLine === index ? "is-active" : ""}"><code>${escapeHtml(line)}</code></li>`,
  ).join("");
  labConceptLink.href = `#concept-${definition.concept}`;
  labConceptLink.dataset.conceptTarget = definition.concept;
  labPrevious.disabled = labStepIndex === 0;
  labNext.disabled = labStepIndex === definition.steps.length - 1;
  renderVisual(activeLab, step);
};

const chooseLab = (lab) => {
  stopPlayback();
  activeLab = lab;
  labStepIndex = 0;
  labTabs.forEach((tab) => {
    const isActive = tab.dataset.lab === lab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  renderLab();
};

const moveLab = (direction) => {
  const lastIndex = labDefinitions[activeLab].steps.length - 1;
  labStepIndex = clamp(labStepIndex + direction, 0, lastIndex);
  renderLab();
  if (labStepIndex === lastIndex) stopPlayback();
};

labTabs.forEach((tab) => tab.addEventListener("click", () => chooseLab(tab.dataset.lab)));
labReset?.addEventListener("click", () => {
  stopPlayback();
  labStepIndex = 0;
  renderLab();
});
labPrevious?.addEventListener("click", () => {
  stopPlayback();
  moveLab(-1);
});
labNext?.addEventListener("click", () => {
  stopPlayback();
  moveLab(1);
});
labPlay?.addEventListener("click", () => {
  if (playTimer) {
    stopPlayback();
    return;
  }
  const lastIndex = labDefinitions[activeLab].steps.length - 1;
  if (labStepIndex === lastIndex) labStepIndex = 0;
  labPlay.innerHTML = '<span aria-hidden="true">Ⅱ</span> Pause';
  playTimer = window.setInterval(() => moveLab(1), Number(labSpeed.value));
  renderLab();
});
labSpeed?.addEventListener("change", () => {
  if (playTimer) {
    stopPlayback();
    labPlay.click();
  }
});
labConceptLink?.addEventListener("click", (event) => {
  event.preventDefault();
  openConcept(labConceptLink.dataset.conceptTarget);
});
renderLab();

// Original pattern library
const patternGrid = document.querySelector("[data-pattern-grid]");
const patternSearch = document.querySelector("[data-pattern-search]");
const patternDifficulty = document.querySelector("[data-pattern-difficulty]");
const patternCategoryButtons = [...document.querySelectorAll("[data-pattern-category]")];
const patternCount = document.querySelector("[data-pattern-count]");
const patternLoadMore = document.querySelector("[data-pattern-load-more]");
const patternDialog = document.querySelector("[data-pattern-dialog]");
const closePatternButton = document.querySelector("[data-close-pattern]");
const patternDialogMeta = document.querySelector("[data-pattern-dialog-meta]");
const patternDialogTitle = document.querySelector("[data-pattern-dialog-title]");
const patternDialogCode = document.querySelector("[data-pattern-dialog-code]");
const patternDialogOutput = document.querySelector("[data-pattern-dialog-output]");
const patternSource = document.querySelector("[data-pattern-source]");
const copyPatternButton = document.querySelector("[data-copy-pattern]");

const PATTERN_PAGE_SIZE = 8;
let patterns = [];
let activePatternCategory = "all";
let visiblePatterns = PATTERN_PAGE_SIZE;
let selectedPattern = null;

const filteredPatterns = () => {
  const query = patternSearch?.value.trim().toLowerCase() || "";
  const difficulty = patternDifficulty?.value || "all";
  return patterns.filter((pattern) => {
    const matchesCategory =
      activePatternCategory === "all" || pattern.category === activePatternCategory;
    const matchesDifficulty = difficulty === "all" || pattern.difficulty === difficulty;
    const searchable = `${pattern.title} ${pattern.category} ${pattern.difficulty} ${pattern.number}`.toLowerCase();
    return matchesCategory && matchesDifficulty && (!query || searchable.includes(query));
  });
};

const patternCardTemplate = (pattern) => `
  <button class="pattern-card" type="button" data-pattern-id="${escapeHtml(pattern.id)}">
    <span class="pattern-card-top">
      <span>${escapeHtml(pattern.category)} pattern ${String(pattern.number).padStart(2, "0")}</span>
      <i>${escapeHtml(pattern.difficulty)}</i>
    </span>
    <pre aria-label="${escapeHtml(pattern.title)} output">${escapeHtml(pattern.output)}</pre>
    <span class="pattern-card-bottom">
      <strong>${escapeHtml(pattern.title)}</strong>
      <span>View Python <b aria-hidden="true">→</b></span>
    </span>
  </button>
`;

const renderPatterns = () => {
  if (!patternGrid) return;
  const matches = filteredPatterns();
  const visible = matches.slice(0, visiblePatterns);
  patternCount.textContent = String(matches.length);
  patternGrid.innerHTML = visible.length
    ? visible.map(patternCardTemplate).join("")
    : `<div class="empty-card"><strong>No pattern matches those filters.</strong><span>Try another collection or level.</span></div>`;
  patternLoadMore.hidden = visible.length >= matches.length;
};

const resetPatterns = () => {
  visiblePatterns = PATTERN_PAGE_SIZE;
  renderPatterns();
};

patternCategoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activePatternCategory = button.dataset.patternCategory;
    patternCategoryButtons.forEach((item) =>
      item.classList.toggle("is-active", item === button));
    resetPatterns();
  });
});
patternSearch?.addEventListener("input", resetPatterns);
patternDifficulty?.addEventListener("change", resetPatterns);
patternLoadMore?.addEventListener("click", () => {
  visiblePatterns += PATTERN_PAGE_SIZE;
  renderPatterns();
});

const openPattern = (patternId) => {
  selectedPattern = patterns.find((pattern) => pattern.id === patternId);
  if (!selectedPattern || !patternDialog) return;
  patternDialogMeta.textContent =
    `${selectedPattern.category.toUpperCase()} COLLECTION · ${selectedPattern.difficulty.toUpperCase()}`;
  patternDialogTitle.textContent = selectedPattern.title;
  patternDialogCode.textContent = selectedPattern.code;
  patternDialogOutput.textContent = selectedPattern.output;
  patternSource.href = `${repositoryUrl}/blob/master/${selectedPattern.path}`;
  copyPatternButton.textContent = "Copy code";
  patternDialog.showModal();
};

patternGrid?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-pattern-id]");
  if (card) openPattern(card.dataset.patternId);
});
closePatternButton?.addEventListener("click", () => patternDialog.close());
patternDialog?.addEventListener("click", (event) => {
  if (event.target === patternDialog) patternDialog.close();
});
copyPatternButton?.addEventListener("click", async () => {
  if (!selectedPattern) return;
  try {
    await navigator.clipboard.writeText(selectedPattern.code);
    copyPatternButton.textContent = "Copied";
  } catch {
    copyPatternButton.textContent = "Select the code";
  }
});

const loadPatterns = async () => {
  try {
    const response = await fetch("./pattern-data.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    patterns = await response.json();
    renderPatterns();
  } catch (error) {
    patternGrid.innerHTML = `
      <div class="empty-card">
        <strong>The pattern library could not be loaded.</strong>
        <span>Open the deployed GitHub Pages site or serve this folder locally.</span>
      </div>
    `;
    patternCount.textContent = "0";
    console.error("Pattern catalog failed to load:", error);
  }
};

loadPatterns();
