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
    color: "#5B7065",
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
    color: "#A8763E",
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
    color: "#B4654A",
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
    color: "#6B7FA3",
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
    color: "#8A6BA3",
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
    color: "#B38B4A",
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
    color: "#4A8A87",
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

/* Band copy per domain */
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
   STORAGE
--------------------------------------------------------- */
const STORE_KEY = "unmasking-tracker-v1";

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { assessments: [], logs: [] };
    const parsed = JSON.parse(raw);
    return {
      assessments: Array.isArray(parsed.assessments) ? parsed.assessments : [],
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
    };
  } catch (e) {
    return { assessments: [], logs: [] };
  }
}

function saveStore() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch (e) {
    /* storage unavailable — app still works in-memory for this session */
  }
}

let store = loadStore();

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatDateShort(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/* ---------------------------------------------------------
   STATE
--------------------------------------------------------- */
let screen = store.assessments.length || store.logs.length ? "home" : "intro";
let domainIndex = 0;
let answers = {}; // in-progress assessment answers, key: `${domainId}-${itemIndex}` -> 0-4
let viewingAssessmentId = null; // when viewing a past assessment from history
let quickLogDraft = { overall: null, domains: [], note: "" };
let trendHidden = new Set(); // domain ids hidden from trend chart

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

function computeScoresFromAnswers(ans) {
  return DOMAINS.map((d) => {
    const vals = d.items.map((_, i) => ans[`${d.id}-${i}`] ?? 0);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return {
      id: d.id,
      label: d.label,
      short: d.short,
      color: d.color,
      score: Math.round(avg * 25), // 0-4 -> 0-100
    };
  });
}

/* ---------------------------------------------------------
   NAVIGATION
--------------------------------------------------------- */
function goScreen(next) {
  screen = next;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function goNext() {
  if (domainIndex < DOMAINS.length - 1) {
    domainIndex += 1;
    screen = "quiz";
  } else {
    finishAssessment();
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
    screen = store.assessments.length || store.logs.length ? "home" : "intro";
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function beginAssessment() {
  answers = {};
  domainIndex = 0;
  viewingAssessmentId = null;
  goScreen("quiz");
}

function finishAssessment() {
  const scores = computeScoresFromAnswers(answers);
  const entry = {
    id: uid(),
    date: new Date().toISOString(),
    scores: scores.reduce((acc, s) => { acc[s.id] = s.score; return acc; }, {}),
    answers: { ...answers },
  };
  store.assessments.push(entry);
  saveStore();
  viewingAssessmentId = entry.id;
}

function restart() {
  answers = {};
  domainIndex = 0;
  goScreen(store.assessments.length || store.logs.length ? "home" : "intro");
}

/* ---------------------------------------------------------
   QUICK LOG
--------------------------------------------------------- */
function toggleLogDomain(id) {
  const i = quickLogDraft.domains.indexOf(id);
  if (i === -1) quickLogDraft.domains.push(id);
  else quickLogDraft.domains.splice(i, 1);
  render();
}

function setLogOverall(v) {
  quickLogDraft.overall = v;
  render();
}

function saveQuickLog() {
  if (quickLogDraft.overall === null) return;
  const entry = {
    id: uid(),
    date: new Date().toISOString(),
    overall: quickLogDraft.overall,
    domains: [...quickLogDraft.domains],
    note: quickLogDraft.note.trim(),
  };
  store.logs.push(entry);
  saveStore();
  quickLogDraft = { overall: null, domains: [], note: "" };
  goScreen("home");
}

function currentStreak() {
  if (!store.logs.length) return 0;
  const days = new Set(store.logs.map((l) => todayKey(new Date(l.date))));
  let streak = 0;
  let cursor = new Date();
  // if no log today yet, streak still counts up to yesterday
  if (!days.has(todayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/* ---------------------------------------------------------
   SETTINGS: export / import / reset
--------------------------------------------------------- */
function exportData() {
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `unmasking-map-export-${todayKey()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed.assessments) || !Array.isArray(parsed.logs)) throw new Error("bad shape");
      store = { assessments: parsed.assessments, logs: parsed.logs };
      saveStore();
      goScreen("home");
    } catch (e) {
      alert("That file doesn't look like a valid export.");
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  if (!confirm("Delete all assessments and logs from this device? This can't be undone.")) return;
  store = { assessments: [], logs: [] };
  saveStore();
  goScreen("intro");
}

/* ---------------------------------------------------------
   RADAR CHART (hand-drawn SVG, no dependencies)
--------------------------------------------------------- */
function renderRadarChart(scores, svgEl, compareScores) {
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

  for (let ring = 1; ring <= rings; ring++) {
    const r = (maxR * ring) / rings;
    const pts = scores.map((_, i) => {
      const a = angleFor(i);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    svgParts.push(`<polygon points="${pts.join(" ")}" fill="none" stroke="var(--line)" stroke-width="1"/>`);
  }

  scores.forEach((_, i) => {
    const [x, y] = pointFor(i, 100);
    svgParts.push(`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--line)" stroke-width="1"/>`);
  });

  if (compareScores) {
    const cPts = compareScores.map((s, i) => pointFor(i, s.score).join(","));
    svgParts.push(`<polygon points="${cPts.join(" ")}" fill="none" stroke="#9BA398" stroke-width="1.5" stroke-dasharray="4 3"/>`);
  }

  const dataPts = scores.map((s, i) => pointFor(i, s.score).join(","));
  svgParts.push(`<polygon points="${dataPts.join(" ")}" fill="#5B7065" fill-opacity="0.35" stroke="#5B7065" stroke-width="2"/>`);

  scores.forEach((s, i) => {
    const [x, y] = pointFor(i, s.score);
    svgParts.push(`<circle cx="${x}" cy="${y}" r="3" fill="#5B7065"/>`);
  });

  scores.forEach((s, i) => {
    const a = angleFor(i);
    const labelR = maxR + 28;
    let x = cx + labelR * Math.cos(a);
    let y = cy + labelR * Math.sin(a);
    let anchor = "middle";
    if (Math.cos(a) > 0.3) anchor = "start";
    else if (Math.cos(a) < -0.3) anchor = "end";
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

  svgEl.innerHTML = svgParts.join("\n");
}

function renderMiniRadar(scores, svgEl) {
  const W = 140, H = 140;
  const cx = W / 2, cy = H / 2;
  const maxR = 55;
  const n = scores.length;
  const angleFor = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pointFor = (i, v) => {
    const r = (v / 100) * maxR;
    const a = angleFor(i);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  let parts = [];
  for (let ring = 1; ring <= 3; ring++) {
    const r = (maxR * ring) / 3;
    const pts = scores.map((_, i) => { const a = angleFor(i); return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; });
    parts.push(`<polygon points="${pts.join(" ")}" fill="none" stroke="var(--line)" stroke-width="1"/>`);
  }
  const dataPts = scores.map((s, i) => pointFor(i, s.score).join(","));
  parts.push(`<polygon points="${dataPts.join(" ")}" fill="#5B7065" fill-opacity="0.4" stroke="#5B7065" stroke-width="1.5"/>`);
  svgEl.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svgEl.innerHTML = parts.join("\n");
}

/* ---------------------------------------------------------
   TREND CHART (multi-line, over assessment history)
--------------------------------------------------------- */
function renderTrendChart(svgEl) {
  const list = store.assessments.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const W = 400, H = 260;
  const padL = 28, padR = 12, padT = 16, padB = 34;
  const plotW = W - padL - padR, plotH = H - padT - padB;

  if (list.length < 2) {
    svgEl.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svgEl.innerHTML = `<text x="${W / 2}" y="${H / 2}" text-anchor="middle" font-family="IBM Plex Sans" font-size="12" fill="#5C6156">Take the full assessment twice to see a trend line.</text>`;
    return;
  }

  const xFor = (i) => padL + (i / (list.length - 1)) * plotW;
  const yFor = (v) => padT + plotH - (v / 100) * plotH;

  let parts = [];
  // gridlines
  [0, 25, 50, 75, 100].forEach((v) => {
    const y = yFor(v);
    parts.push(`<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="var(--line)" stroke-width="1"/>`);
    parts.push(`<text x="${padL - 6}" y="${y + 3}" text-anchor="end" font-family="IBM Plex Mono" font-size="9" fill="#5C6156">${v}</text>`);
  });
  // x labels (first, middle, last)
  [0, Math.floor((list.length - 1) / 2), list.length - 1].forEach((i) => {
    parts.push(`<text x="${xFor(i)}" y="${H - padB + 16}" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#5C6156">${escapeXml(formatDateShort(list[i].date))}</text>`);
  });

  DOMAINS.forEach((d) => {
    if (trendHidden.has(d.id)) return;
    const pts = list.map((entry, i) => `${xFor(i)},${yFor(entry.scores[d.id] ?? 0)}`);
    parts.push(`<polyline points="${pts.join(" ")}" fill="none" stroke="${d.color}" stroke-width="2"/>`);
    list.forEach((entry, i) => {
      parts.push(`<circle cx="${xFor(i)}" cy="${yFor(entry.scores[d.id] ?? 0)}" r="2.5" fill="${d.color}"/>`);
    });
  });

  svgEl.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svgEl.innerHTML = parts.join("\n");
}

function renderLogBarChart(svgEl) {
  const list = store.logs.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-14);
  const W = 400, H = 160;
  const padL = 20, padR = 8, padT = 10, padB = 26;
  const plotW = W - padL - padR, plotH = H - padT - padB;

  if (!list.length) {
    svgEl.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svgEl.innerHTML = `<text x="${W / 2}" y="${H / 2}" text-anchor="middle" font-family="IBM Plex Sans" font-size="12" fill="#5C6156">No quick logs yet.</text>`;
    return;
  }

  const barW = plotW / list.length;
  let parts = [];
  list.forEach((entry, i) => {
    const h = (entry.overall / 4) * plotH;
    const x = padL + i * barW + barW * 0.15;
    const y = padT + plotH - h;
    const w = barW * 0.7;
    const color = entry.overall >= 3 ? "#B4654A" : entry.overall >= 2 ? "#A8763E" : "#5B7065";
    parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${Math.max(h, 2)}" rx="2" fill="${color}"/>`);
    if (i === 0 || i === list.length - 1 || i === Math.floor(list.length / 2)) {
      parts.push(`<text x="${x + w / 2}" y="${H - padB + 14}" text-anchor="middle" font-family="IBM Plex Mono" font-size="8" fill="#5C6156">${escapeXml(formatDateShort(entry.date))}</text>`);
    }
  });
  svgEl.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svgEl.innerHTML = parts.join("\n");
}

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ---------------------------------------------------------
   RENDER: SHELL
--------------------------------------------------------- */
const SCREEN_IDS = ["intro", "home", "quicklog", "quiz", "results", "trends", "history", "settings"];

function render() {
  SCREEN_IDS.forEach((id) => {
    const el = document.getElementById(`screen-${id}`);
    if (el) el.classList.toggle("active", screen === id);
  });

  const nav = document.getElementById("bottom-nav");
  const showNav = screen !== "intro" && screen !== "quiz";
  nav.classList.toggle("show", showNav);
  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.nav === screen || (b.dataset.nav === "results" && screen === "results"));
  });

  if (screen === "home") renderHome();
  if (screen === "quicklog") renderQuickLog();
  if (screen === "quiz") renderQuiz();
  if (screen === "results") renderResults();
  if (screen === "trends") renderTrends();
  if (screen === "history") renderHistory();
}

/* ---------------------------------------------------------
   RENDER: HOME / DASHBOARD
--------------------------------------------------------- */
function renderHome() {
  const streak = currentStreak();
  document.getElementById("streak-count").textContent = streak;
  document.getElementById("streak-word").textContent = streak === 1 ? "day streak" : "day streak";

  const latest = store.assessments[store.assessments.length - 1];
  const latestWrap = document.getElementById("home-latest-wrap");
  const emptyWrap = document.getElementById("home-empty-wrap");

  if (latest) {
    latestWrap.style.display = "";
    emptyWrap.style.display = "none";
    const scores = DOMAINS.map((d) => ({ ...d, score: latest.scores[d.id] ?? 0 }));
    renderMiniRadar(scores, document.getElementById("home-mini-radar"));
    document.getElementById("home-latest-date").textContent = `Last full map: ${formatDate(latest.date)}`;

    const sorted = scores.slice().sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, 2);
    document.getElementById("home-top-domains").innerHTML = top
      .map((s) => `<span class="chip" style="border-color:${s.color}22;color:${s.color}">${escapeXml(s.label)} \u00b7 ${s.score}</span>`)
      .join("");

    const daysSince = Math.floor((Date.now() - new Date(latest.date).getTime()) / 86400000);
    document.getElementById("home-recheck-hint").textContent =
      daysSince >= 21
        ? `It's been ${daysSince} days \u2014 worth retaking the full map to see what's shifted.`
        : `Next full map recommended around ${formatDate(new Date(new Date(latest.date).getTime() + 28 * 86400000).toISOString())}.`;
  } else {
    latestWrap.style.display = "none";
    emptyWrap.style.display = "";
  }

  const recentLogs = store.logs.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  const recentWrap = document.getElementById("home-recent-logs");
  if (recentLogs.length) {
    recentWrap.innerHTML = recentLogs.map((l) => logRowHtml(l)).join("");
  } else {
    recentWrap.innerHTML = `<p class="footnote" style="margin:0;">No quick logs yet \u2014 a daily check-in takes about ten seconds.</p>`;
  }
}

function logRowHtml(l) {
  const tagLabels = l.domains.map((id) => DOMAINS.find((d) => d.id === id)?.label).filter(Boolean);
  return `<div class="log-row">
    <div class="log-row-dot" style="background:${l.overall >= 3 ? "#B4654A" : l.overall >= 2 ? "#A8763E" : "#5B7065"}"></div>
    <div class="log-row-body">
      <div class="log-row-head"><span>${escapeXml(formatDate(l.date))}</span><span class="mono">${l.overall}/4</span></div>
      ${tagLabels.length ? `<p class="log-row-tags">${escapeXml(tagLabels.join(", "))}</p>` : ""}
      ${l.note ? `<p class="log-row-note">${escapeXml(l.note)}</p>` : ""}
    </div>
  </div>`;
}

/* ---------------------------------------------------------
   RENDER: QUICK LOG
--------------------------------------------------------- */
function renderQuickLog() {
  const scaleWrap = document.getElementById("quicklog-scale");
  scaleWrap.innerHTML = SCALE.map(
    (opt) => `<button class="scale-btn${quickLogDraft.overall === opt.value ? " active" : ""}" data-val="${opt.value}">${escapeXml(opt.label)}</button>`
  ).join("");
  scaleWrap.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => setLogOverall(Number(b.dataset.val)));
  });

  const chipWrap = document.getElementById("quicklog-domains");
  chipWrap.innerHTML = DOMAINS.map(
    (d) => `<button class="tag-chip${quickLogDraft.domains.includes(d.id) ? " active" : ""}" data-id="${d.id}" style="${quickLogDraft.domains.includes(d.id) ? `background:${d.color};border-color:${d.color};color:#F5F6F0;` : ""}">${escapeXml(d.label)}</button>`
  ).join("");
  chipWrap.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => toggleLogDomain(b.dataset.id));
  });

  const noteEl = document.getElementById("quicklog-note");
  noteEl.value = quickLogDraft.note;

  document.getElementById("quicklog-save").disabled = quickLogDraft.overall === null;
}

/* ---------------------------------------------------------
   RENDER: QUIZ (full assessment)
--------------------------------------------------------- */
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

/* ---------------------------------------------------------
   RENDER: RESULTS (fresh completion OR viewing history entry)
--------------------------------------------------------- */
function renderResults() {
  const entry = viewingAssessmentId
    ? store.assessments.find((a) => a.id === viewingAssessmentId)
    : store.assessments[store.assessments.length - 1];
  if (!entry) { goScreen("home"); return; }

  const idx = store.assessments.findIndex((a) => a.id === entry.id);
  const prev = idx > 0 ? store.assessments[idx - 1] : null;

  const scores = DOMAINS.map((d) => ({ ...d, score: entry.scores[d.id] ?? 0 }));
  const prevScores = prev ? DOMAINS.map((d) => ({ ...d, score: prev.scores[d.id] ?? 0 })) : null;

  document.getElementById("results-date").textContent = formatDate(entry.date);
  renderRadarChart(scores, document.getElementById("radar-chart"), prevScores);

  document.getElementById("results-compare-note").textContent = prev
    ? `Dashed line shows your previous map from ${formatDate(prev.date)}.`
    : "Take the assessment again later to compare against this map.";

  const container = document.getElementById("scores-container");
  container.innerHTML = "";

  scores
    .slice()
    .sort((a, b) => b.score - a.score)
    .forEach((s) => {
      const band = bandFor(s.score);
      const meta = bandMeta[band];
      const prevScore = prev ? (prev.scores[s.id] ?? 0) : null;
      const delta = prevScore === null ? null : s.score - prevScore;

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
      if (delta !== null && delta !== 0) {
        const deltaEl = document.createElement("span");
        deltaEl.className = "band-pill mono";
        deltaEl.style.color = delta < 0 ? "#5B7065" : "#B4654A";
        deltaEl.style.border = `1px solid ${delta < 0 ? "#5B7065" : "#B4654A"}`;
        deltaEl.textContent = `${delta > 0 ? "+" : ""}${delta}`;
        head.appendChild(deltaEl);
      }
      body.appendChild(head);

      const copy = document.createElement("p");
      copy.className = "score-copy";
      copy.textContent = BAND_COPY[s.id][band];
      body.appendChild(copy);

      row.appendChild(body);
      container.appendChild(row);
    });

  document.getElementById("results-retake-row").style.display = viewingAssessmentId && viewingAssessmentId !== store.assessments[store.assessments.length - 1]?.id ? "none" : "flex";
}

/* ---------------------------------------------------------
   RENDER: TRENDS
--------------------------------------------------------- */
function renderTrends() {
  renderTrendChart(document.getElementById("trend-chart"));
  const legend = document.getElementById("trend-legend");
  legend.innerHTML = DOMAINS.map(
    (d) => `<button class="legend-chip${trendHidden.has(d.id) ? " off" : ""}" data-id="${d.id}"><span class="legend-dot" style="background:${d.color}"></span>${escapeXml(d.label)}</button>`
  ).join("");
  legend.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      const id = b.dataset.id;
      if (trendHidden.has(id)) trendHidden.delete(id); else trendHidden.add(id);
      renderTrends();
    });
  });

  renderLogBarChart(document.getElementById("log-bar-chart"));

  document.getElementById("trend-assessment-count").textContent =
    store.assessments.length === 0 ? "No full assessments yet." : `${store.assessments.length} full assessment${store.assessments.length === 1 ? "" : "s"} logged.`;
}

/* ---------------------------------------------------------
   RENDER: HISTORY
--------------------------------------------------------- */
function renderHistory() {
  const items = [
    ...store.assessments.map((a) => ({ type: "assessment", date: a.date, ref: a })),
    ...store.logs.map((l) => ({ type: "log", date: l.date, ref: l })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const wrap = document.getElementById("history-list");
  if (!items.length) {
    wrap.innerHTML = `<p class="footnote">Nothing logged yet. A quick log or a full map will show up here.</p>`;
    return;
  }

  wrap.innerHTML = items
    .map((it) => {
      if (it.type === "assessment") {
        return `<button class="history-row" data-type="assessment" data-id="${it.ref.id}">
          <div class="history-row-icon">\u25C8</div>
          <div class="log-row-body">
            <div class="log-row-head"><span>Full terrain map</span><span class="mono">${escapeXml(formatDate(it.date))}</span></div>
            <p class="log-row-tags">Tap to view this map</p>
          </div>
        </button>`;
      }
      return `<div class="history-row" data-type="log">${logRowHtml(it.ref)}</div>`;
    })
    .join("");

  wrap.querySelectorAll('.history-row[data-type="assessment"]').forEach((el) => {
    el.addEventListener("click", () => {
      viewingAssessmentId = el.dataset.id;
      goScreen("results");
    });
  });
}

/* ---------------------------------------------------------
   EVENTS
--------------------------------------------------------- */
document.getElementById("begin-btn").addEventListener("click", beginAssessment);
document.getElementById("back-btn").addEventListener("click", goBack);
document.getElementById("next-btn").addEventListener("click", goNext);
document.getElementById("restart-btn").addEventListener("click", beginAssessment);
document.getElementById("home-start-btn").addEventListener("click", beginAssessment);
document.getElementById("home-retake-btn").addEventListener("click", beginAssessment);
document.getElementById("home-quicklog-btn").addEventListener("click", () => goScreen("quicklog"));
document.getElementById("quicklog-cancel").addEventListener("click", () => goScreen("home"));
document.getElementById("quicklog-save").addEventListener("click", saveQuickLog);
document.getElementById("quicklog-note").addEventListener("input", (e) => { quickLogDraft.note = e.target.value; });

document.getElementById("export-btn").addEventListener("click", exportData);
document.getElementById("import-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) importData(file);
  e.target.value = "";
});
document.getElementById("reset-btn").addEventListener("click", resetAllData);

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => goScreen(btn.dataset.nav));
});

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
