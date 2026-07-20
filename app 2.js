/* ---------------------------------------------------------
   DOMAINS + ITEMS
   Reworked from open camouflaging/masking literature
   (CAT-Q style: Compensation / Masking / Assimilation) into
   plain reflective statements. Not a diagnostic instrument.
--------------------------------------------------------- */
const DOMAINS = [
  {
    id: "scripting",
    label: "Social Scripting",
    short: "How much you pre-write yourself",
    items: [
      "I prepare or rehearse things to say before social interactions, even casual ones.",
      "I keep a mental list of \u201csafe\u201d topics or responses to reach for in conversation.",
      "It feels like I'm performing a character rather than being myself when I talk to people.",
      "After socializing, I replay what I said to check whether it was \u201cright.\u201d",
    ],
  },
  {
    id: "sensory",
    label: "Sensory Suppression",
    short: "What you tolerate without saying so",
    items: [
      "I push through sensory discomfort \u2014 noise, light, texture, smell \u2014 without letting it show.",
      "I've trained myself to tolerate environments that actually overwhelm me.",
      "I downplay sensory pain or discomfort when someone asks if I'm okay.",
      "I plan ahead to avoid sensory triggers, but I don't explain why.",
    ],
  },
  {
    id: "stimming",
    label: "Stimming Suppression",
    short: "What your body isn't allowed to do",
    items: [
      "I stop myself from stimming \u2014 rocking, hand movements, fidgeting \u2014 in front of others.",
      "I've swapped natural stims for more \u201csocially acceptable\u201d ones (e.g. pen-clicking instead of flapping).",
      "I feel physical tension from holding still or suppressing movement in public.",
      "I only let myself stim freely when I'm completely alone.",
    ],
  },
  {
    id: "eyecontact",
    label: "Eye Contact & Expression",
    short: "The face and gaze you perform",
    items: [
      "I force eye contact even when it's uncomfortable or distracting.",
      "I consciously monitor and adjust my facial expressions to seem \u201cnormal.\u201d",
      "I've studied or practiced other people's body language to copy it.",
      "I feel drained after maintaining \u201cappropriate\u201d body language through a long conversation.",
    ],
  },
  {
    id: "interests",
    label: "Interest Concealment",
    short: "The version of your passion you show",
    items: [
      "I downplay how much I know or care about something so I don't seem \u201ctoo much.\u201d",
      "I've stopped bringing up certain topics because people reacted badly before.",
      "I hide how much time I actually spend on my interests.",
      "There's a \u201cpublic\u201d version of my interest I share, and a deeper version I keep private.",
    ],
  },
  {
    id: "affect",
    label: "Emotional Labor",
    short: "The feelings you show vs. feel",
    items: [
      "I mirror other people's emotional tone even when I don't feel it myself.",
      "I suppress my genuine reactions \u2014 excitement, distress \u2014 to match the room.",
      "I laugh or react because it's expected, not because I actually find it funny.",
      "I feel like I have to perform \u201cfine\u201d even when I'm struggling.",
    ],
  },
  {
    id: "executive",
    label: "Executive Fatigue Masking",
    short: "The effort you hide",
    items: [
      "I hide how much effort it takes me to do everyday tasks.",
      "I push through exhaustion or burnout without telling anyone.",
      "I overprepare for things to hide difficulty planning or organizing in the moment.",
      "I've learned to hide it when I'm overwhelmed or heading toward shutdown.",
    ],
  },
];

const SCALE = [
  { value: 0, label: "Never true" },
  { value: 1, label: "Rarely true" },
  { value: 2, label: "Sometimes true" },
  { value: 3, label: "Often true" },
  { value: 4, label: "Almost always true" },
];

/* Band copy per domain \u2014 informs which worksheet module gets recommended later */
const BAND_COPY = {
  scripting: {
    low: "Scripting shows up occasionally, but you're mostly working from real-time responses. Modules here would focus on maintenance, not overhaul.",
    moderate: "You lean on prepared language more than you'd probably like. A good starting module: identifying which scripts are load-bearing vs. habitual.",
    high: "Scripting is likely a primary coping tool. Unmasking here should start in the lowest-stakes conversations you have, not the hardest ones.",
  },
  sensory: {
    low: "You're generally not absorbing much sensory cost in silence.",
    moderate: "There's a meaningful gap between what you feel and what you disclose. Worth mapping which environments cost the most.",
    high: "You're likely carrying significant unspoken sensory load. This is a strong candidate for the first module \u2014 the cost compounds daily.",
  },
  stimming: {
    low: "Stimming suppression isn't a major pattern for you right now.",
    moderate: "You're substituting or holding back some natural movement. A module on identifying safe stimming windows could help.",
    high: "Suppression here is heavy. This is often one of the most physically taxing forms of masking \u2014 a strong early-priority module.",
  },
  eyecontact: {
    low: "Eye contact and expression aren't taking much conscious effort.",
    moderate: "You're doing some real-time performance work with gaze and expression. Worth tracking which contexts demand the most of it.",
    high: "This is a high-effort, high-frequency mask. Small deliberate reductions in low-stakes settings tend to work better than stopping cold.",
  },
  interests: {
    low: "You're sharing your interests fairly close to how you actually experience them.",
    moderate: "There's a public-facing edit of your interests running most of the time. A module on finding safe audiences for the unedited version could help.",
    high: "You're keeping a significant part of yourself out of view here. This domain often has the highest payoff for unmasking \u2014 and the highest perceived risk.",
  },
  affect: {
    low: "Your outward emotional expression tracks fairly closely with what you actually feel.",
    moderate: "You're doing some real-time emotional editing. Worth noticing which relationships already tolerate the unedited version.",
    high: "Significant emotional labor is happening under the surface. This is often invisible to others and exhausting to sustain \u2014 a priority domain.",
  },
  executive: {
    low: "You're not hiding much executive effort right now.",
    moderate: "You're covering for some struggle with planning, task effort, or fatigue. Worth identifying one low-stakes place to let that show.",
    high: "You're likely masking significant fatigue or executive load. This tends to be a root cause of burnout \u2014 a high-priority module.",
  },
};

function bandFor(score) {
  if (score < 34) return "low";
  if (score < 67) return "moderate";
  return "high";
}

const bandMeta = {
  low: { label: "Low", color: "#5B7065" },
  moderate: { label: "Moderate", color: "#A8763E" },
  high: { label: "High", color: "#B4654A" },
};

/* ---------------------------------------------------------
   STATE
--------------------------------------------------------- */
let screen = "intro"; // intro | quiz | results
let domainIndex = 0;
let answers = {}; // key: `${domainId}-${itemIndex}` -> value 0-4

const totalItems = DOMAINS.reduce((n, d) => n + d.items.length, 0);

function answeredCount() {
  return Object.keys(answers).length;
}

function domainComplete(d) {
  return d.items.every((_, i) => answers[`${d.id}-${i}`] !== undefined);
}

function setAnswer(domainId, itemIndex, value) {
  answers[`${domainId}-${itemIndex}`] = value;
  render();
}

function computeScores() {
  return DOMAINS.map((d) => {
    const vals = d.items.map((_, i) => answers[`${d.id}-${i}`] ?? 0);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return {
      id: d.id,
      label: d.label,
      short: d.short,
      score: Math.round(avg * 25), // 0-4 -> 0-100
    };
  });
}

function goNext() {
  if (domainIndex < DOMAINS.length - 1) {
    domainIndex += 1;
    screen = "quiz";
  } else {
    screen = "results";
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function goBack() {
  if (domainIndex > 0) {
    domainIndex -= 1;
    screen = "quiz";
  } else {
    screen = "intro";
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function restart() {
  answers = {};
  domainIndex = 0;
  screen = "intro";
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

/* ---------------------------------------------------------
   RADAR CHART (hand-drawn SVG, no dependencies)
--------------------------------------------------------- */
function renderRadarChart(scores) {
  const svg = document.getElementById("radar-chart");
  const W = 400, H = 340;
  const cx = W / 2, cy = H / 2 - 5;
  const maxR = 120;
  const n = scores.length;
  const rings = 4;

  const angleFor = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pointFor = (i, value100) => {
    const r = (value100 / 100) * maxR;
    const a = angleFor(i);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  let svgParts = [];

  // grid rings
  for (let ring = 1; ring <= rings; ring++) {
    const r = (maxR * ring) / rings;
    const pts = scores.map((_, i) => {
      const a = angleFor(i);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    svgParts.push(`<polygon points="${pts.join(" ")}" fill="none" stroke="var(--line)" stroke-width="1"/>`);
  }

  // spokes
  scores.forEach((_, i) => {
    const [x, y] = pointFor(i, 100);
    svgParts.push(`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--line)" stroke-width="1"/>`);
  });

  // data polygon
  const dataPts = scores.map((s, i) => pointFor(i, s.score).join(","));
  svgParts.push(`<polygon points="${dataPts.join(" ")}" fill="#5B7065" fill-opacity="0.35" stroke="#5B7065" stroke-width="2"/>`);

  // data dots
  scores.forEach((s, i) => {
    const [x, y] = pointFor(i, s.score);
    svgParts.push(`<circle cx="${x}" cy="${y}" r="3" fill="#5B7065"/>`);
  });

  // labels
  scores.forEach((s, i) => {
    const a = angleFor(i);
    const labelR = maxR + 28;
    let x = cx + labelR * Math.cos(a);
    let y = cy + labelR * Math.sin(a);
    let anchor = "middle";
    if (Math.cos(a) > 0.3) anchor = "start";
    else if (Math.cos(a) < -0.3) anchor = "end";
    // wrap long labels onto two lines by splitting on spaces
    const words = s.label.split(" ");
    let lines = [];
    if (words.length > 1 && s.label.length > 14) {
      const mid = Math.ceil(words.length / 2);
      lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
    } else {
      lines = [s.label];
    }
    lines.forEach((line, li) => {
      const dy = (li - (lines.length - 1) / 2) * 12;
      svgParts.push(`<text x="${x}" y="${y + dy}" text-anchor="${anchor}" font-family="IBM Plex Sans" font-size="11" fill="#2B2E28" dominant-baseline="middle">${escapeXml(line)}</text>`);
    });
  });

  svg.innerHTML = svgParts.join("\n");
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ---------------------------------------------------------
   RENDER
--------------------------------------------------------- */
function render() {
  document.getElementById("screen-intro").classList.toggle("active", screen === "intro");
  document.getElementById("screen-quiz").classList.toggle("active", screen === "quiz");
  document.getElementById("screen-results").classList.toggle("active", screen === "results");

  if (screen === "quiz") renderQuiz();
  if (screen === "results") renderResults();
}

function renderQuiz() {
  const d = DOMAINS[domainIndex];
  document.getElementById("domain-counter").textContent = `Domain ${domainIndex + 1} of ${DOMAINS.length}`;
  document.getElementById("answer-counter").textContent = `${answeredCount()} / ${totalItems} answered`;
  document.getElementById("progress-fill").style.width = `${(answeredCount() / totalItems) * 100}%`;
  document.getElementById("domain-label").textContent = d.label;
  document.getElementById("domain-short").textContent = d.short;

  const container = document.getElementById("items-container");
  container.innerHTML = "";
  d.items.forEach((item, i) => {
    const key = `${d.id}-${i}`;
    const val = answers[key];

    const block = document.createElement("div");
    block.className = "item-block";

    const p = document.createElement("p");
    p.className = "item-text";
    p.textContent = item;
    block.appendChild(p);

    const grid = document.createElement("div");
    grid.className = "scale-grid";
    SCALE.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "scale-btn" + (val === opt.value ? " active" : "");
      btn.textContent = opt.label;
      btn.addEventListener("click", () => setAnswer(d.id, i, opt.value));
      grid.appendChild(btn);
    });
    block.appendChild(grid);

    container.appendChild(block);
  });

  const nextBtn = document.getElementById("next-btn");
  nextBtn.disabled = !domainComplete(d);
  nextBtn.textContent = domainIndex < DOMAINS.length - 1 ? "Next domain \u2192" : "See my map \u2192";
}

function renderResults() {
  const scores = computeScores();
  renderRadarChart(scores);

  const container = document.getElementById("scores-container");
  container.innerHTML = "";

  scores
    .slice()
    .sort((a, b) => b.score - a.score)
    .forEach((s) => {
      const band = bandFor(s.score);
      const meta = bandMeta[band];

      const row = document.createElement("div");
      row.className = "score-row";

      const num = document.createElement("div");
      num.className = "score-num";
      num.style.color = meta.color;
      num.textContent = s.score;
      row.appendChild(num);

      const body = document.createElement("div");

      const head = document.createElement("div");
      head.className = "score-head";
      const h3 = document.createElement("h3");
      h3.textContent = s.label;
      head.appendChild(h3);
      const pill = document.createElement("span");
      pill.className = "band-pill";
      pill.style.color = meta.color;
      pill.style.border = `1px solid ${meta.color}`;
      pill.textContent = meta.label;
      head.appendChild(pill);
      body.appendChild(head);

      const copy = document.createElement("p");
      copy.className = "score-copy";
      copy.textContent = BAND_COPY[s.id][band];
      body.appendChild(copy);

      row.appendChild(body);
      container.appendChild(row);
    });
}

/* ---------------------------------------------------------
   EVENTS
--------------------------------------------------------- */
document.getElementById("begin-btn").addEventListener("click", () => {
  screen = "quiz";
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.getElementById("back-btn").addEventListener("click", goBack);
document.getElementById("next-btn").addEventListener("click", goNext);
document.getElementById("restart-btn").addEventListener("click", restart);

render();

/* ---------------------------------------------------------
   PWA: service worker registration + install prompt
--------------------------------------------------------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

let deferredPrompt = null;
const installBanner = document.getElementById("install-banner");
const installBtn = document.getElementById("install-btn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBanner.classList.add("show");
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBanner.classList.remove("show");
});

window.addEventListener("appinstalled", () => {
  installBanner.classList.remove("show");
});
