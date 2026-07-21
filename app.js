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

/* ---------------------------------------------------------
   COMMUNICATION SCRIPTS (editable templates, not prescriptive)
--------------------------------------------------------- */
const SCRIPTS = [
  {
    id: "accommodation",
    title: "Asking for a sensory accommodation",
    body: "Would it be okay if [specific change] for [situation]? It helps me focus, and it takes very little to arrange.",
  },
  {
    id: "explain-shutdown",
    title: "Explaining a shutdown, after the fact",
    body: "Earlier I went quiet, or I stepped away. That wasn't about you, it was my system hitting capacity. I just need some recovery time, then I'm okay to talk.",
  },
  {
    id: "decline-invite",
    title: "Declining an overwhelming invite",
    body: "I want to be there for this, but if I come I might need to leave early or step outside sometimes. Is that alright, or would you rather I sit this one out?",
  },
  {
    id: "ask-direct",
    title: "Asking someone to be more direct",
    body: "I do better with plain, direct language. If something's wrong or you need something specific, just tell me straight. I won't take it badly.",
  },
  {
    id: "introduce-needs",
    title: "Introducing your needs to someone new",
    body: "I process things a little differently. I might need things spelled out clearly, and I might need a break if a space gets too loud or bright. Letting me know that's fine helps a lot.",
  },
];

/* Body / interoception check-ins for the quick log */
const BODY_CHECKS = [
  { id: "hungry", label: "Hungry" },
  { id: "thirsty", label: "Thirsty" },
  { id: "bathroom", label: "Need bathroom" },
  { id: "pain", label: "Pain / discomfort" },
  { id: "temp", label: "Too hot / cold" },
];

/* ---------------------------------------------------------
   SCAFFOLDING PLANS
   Existing, published, named frameworks only \u2014 nothing invented here.
   Each plan's steps are drawn directly from how its originator
   describes the method, with attribution. Not a substitute for
   working with the clinician or program that developed it.
--------------------------------------------------------- */
const PLANS = [
  {
    id: "energy-accounting",
    title: "Energy Accounting",
    source: "Dr. Tony Attwood & Maja Toudal, clinical psychologist / autism practice",
    note: "A published stress-management method built specifically for autistic burnout and energy management (Attwood & Toudal, \u201cEnergy Accounting,\u201d Jessica Kingsley Publishers).",
    steps: [
      "List your \u201Cwithdrawals\u201D \u2014 everything that drains your energy: people, places, tasks, sensory input.",
      "List your \u201Cdeposits\u201D \u2014 everything that replenishes it, however small.",
      "Give each one a rough number (say 10 for a little, 100 for a lot) to weight it.",
      "Track a day or a week and total up withdrawals against deposits.",
      "When withdrawals are running high, schedule a deposit before the account goes negative, not after.",
    ],
  },
  {
    id: "zones-of-regulation",
    title: "Zones of Regulation",
    source: "Leah Kuypers, MA Ed., OTR/L, occupational therapist",
    note: "A widely used, research-informed self-regulation framework built on occupational therapy, CBT, and sensory integration research.",
    steps: [
      "Learn the four zones: Blue (low energy, down), Green (calm, regulated), Yellow (heightened, some control), Red (extreme, out of control).",
      "Check in through the day: which zone am I in right now?",
      "Build your own list of tools that help you shift zones or stay regulated in each one.",
      "Practice naming your zone in a calm moment, so it's familiar language before you're in crisis.",
      "Let the zone \u2014 not just the trigger \u2014 decide what kind of support you reach for.",
    ],
  },
  {
    id: "low-arousal",
    title: "Low Arousal Approach",
    source: "Dr. Andrew McDonnell, clinical psychologist, Studio3",
    note: "An evidence-informed approach for de-escalating crisis states, built on research into physiological arousal in autism.",
    steps: [
      "Identify what escalates you: demands, requests, direct eye contact, crowding, being touched without warning.",
      "In a tense moment, reduce demands first \u2014 fewer requests, not more explanation or reasoning.",
      "Reduce triggering stimuli where you can: less noise, less crowding, fewer people watching.",
      "Reflect afterward, once calm, on what fed the escalation \u2014 including your own reactions, without blame.",
      "Keep debriefing separate from the moment itself: talk it through only once things are calm.",
    ],
  },
  {
    id: "teacch",
    title: "TEACCH Structured Teaching",
    source: "Division TEACCH, University of North Carolina (founded by Eric Schopler)",
    note: "A long-established, widely studied structured-teaching approach built around visual schedules and physical organization.",
    steps: [
      "Make time visible: a written or visual schedule for the day, not just a plan held in your head.",
      "Make tasks visible: break a task into a clear physical sequence of steps instead of one abstract instruction.",
      "Organize your space so each activity has a consistent place \u2014 this removes small decisions before they cost you energy.",
      "Build in a clear, visible signal for \u201Cfinished,\u201D so transitions between tasks aren't ambiguous.",
    ],
  },
  {
    id: "social-stories",
    title: "Social Stories",
    source: "Carol Gray, autism educator and researcher",
    note: "A well-established method for preparing for social or unfamiliar situations through short, factual narratives.",
    steps: [
      "Pick one specific situation you find hard to predict or prepare for.",
      "Write a short, factual, first-person account of what usually happens, in order.",
      "Describe plainly how people involved might feel or react \u2014 described, not assumed.",
      "Include one or two concrete things you can do in that moment.",
      "Read it before the situation, as many times as you need to.",
    ],
  },
  {
    id: "burnout-recovery",
    title: "Autistic Burnout Recovery Steps",
    source: "Jennifer Kemp, psychologist, drawing on Raymaker et al. (2020) autistic burnout research",
    note: "A stepped recovery approach specifically for autistic burnout, distinct from standard depression treatment.",
    steps: [
      "Understand your actual challenges, needs, and values \u2014 separate from what you feel you \u201Cshould\u201D be able to do.",
      "Identify what's actually depleting you day to day, not just the obvious stressors.",
      "Reduce demands where you can, even temporarily \u2014 pushing to \u201Cget back to normal\u201D can backfire in autistic burnout specifically.",
      "Rebuild slowly, toward your own values, rather than back to the exact routine that led to burnout.",
      "Expect this to take longer than you'd like, and treat that as normal, not failure.",
    ],
  },
];

/* ---------------------------------------------------------
   SOURCES (shown in the disclaimer modal for credit)
--------------------------------------------------------- */
const SOURCES = [
  {
    name: "Camouflaging/masking research (CAT-Q framework)",
    attr: "The 28-item map's structure (compensation, masking, assimilation) is inspired by published camouflaging research, reworked into plain reflective language. It is not the CAT-Q instrument itself and isn't a validated or diagnostic scale.",
  },
  ...PLANS.map((p) => ({ name: p.title, attr: p.source })),
];


const OVERLOAD_TYPES = [
  { value: "none", label: "Neither" },
  { value: "shutdown", label: "Shutdown" },
  { value: "meltdown", label: "Meltdown" },
  { value: "both", label: "Both" },
];

const bandMeta = {
  low: { label: "Low", color: "#5B7065" },
  moderate: { label: "Moderate", color: "#A8763E" },
  high: { label: "High", color: "#B4654A" },
};

/* ---------------------------------------------------------
   STORAGE
--------------------------------------------------------- */
const STORE_KEY = "unmasking-tracker-v1";

const DEFAULT_STORE = () => ({
  assessments: [],
  logs: [],
  scripts: {},
  settings: { fontScale: "normal", reduceMotion: false, highContrast: false },
  nextStep: { text: "", done: false },
  planProgress: {},
  routines: [],
  routineLogs: {},
  disclaimerAcknowledged: false,
});

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return DEFAULT_STORE();
    const parsed = JSON.parse(raw);
    return {
      assessments: Array.isArray(parsed.assessments) ? parsed.assessments : [],
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
      scripts: parsed.scripts && typeof parsed.scripts === "object" ? parsed.scripts : {},
      settings: parsed.settings && typeof parsed.settings === "object"
        ? { fontScale: "normal", reduceMotion: false, highContrast: false, ...parsed.settings }
        : { fontScale: "normal", reduceMotion: false, highContrast: false },
      nextStep: parsed.nextStep && typeof parsed.nextStep === "object" ? parsed.nextStep : { text: "", done: false },
      planProgress: parsed.planProgress && typeof parsed.planProgress === "object" ? parsed.planProgress : {},
      routines: Array.isArray(parsed.routines) ? parsed.routines : [],
      routineLogs: parsed.routineLogs && typeof parsed.routineLogs === "object" ? parsed.routineLogs : {},
      disclaimerAcknowledged: !!parsed.disclaimerAcknowledged,
    };
  } catch (e) {
    return DEFAULT_STORE();
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
let quickLogDraft = { overall: null, domains: [], note: "", bodyChecks: [], overloadType: "none" };
let trendHidden = new Set(); // domain ids hidden from trend chart
let toolkitTab = "scripts"; // "scripts" | "plans" | "routines"
let reportRange = "30"; // "7" | "30" | "90" | "all"
let showRoutineForm = false;

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

function toggleBodyCheck(id) {
  const i = quickLogDraft.bodyChecks.indexOf(id);
  if (i === -1) quickLogDraft.bodyChecks.push(id);
  else quickLogDraft.bodyChecks.splice(i, 1);
  render();
}

function setOverloadType(v) {
  quickLogDraft.overloadType = v;
  render();
}

/* ---------------------------------------------------------
   ONE NEXT STEP (lightweight, single-task widget for low-capacity days)
--------------------------------------------------------- */
function saveNextStep() {
  const val = document.getElementById("next-step-input").value.trim();
  if (!val) return;
  store.nextStep = { text: val, done: false };
  saveStore();
  render();
}

function completeNextStep() {
  store.nextStep = { text: "", done: false };
  saveStore();
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
    bodyChecks: [...quickLogDraft.bodyChecks],
    overloadType: quickLogDraft.overloadType,
  };
  store.logs.push(entry);
  saveStore();
  quickLogDraft = { overall: null, domains: [], note: "", bodyChecks: [], overloadType: "none" };
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
      store = {
        assessments: parsed.assessments,
        logs: parsed.logs,
        scripts: parsed.scripts && typeof parsed.scripts === "object" ? parsed.scripts : {},
        settings: parsed.settings && typeof parsed.settings === "object"
          ? { fontScale: "normal", reduceMotion: false, highContrast: false, ...parsed.settings }
          : { fontScale: "normal", reduceMotion: false, highContrast: false },
        nextStep: parsed.nextStep && typeof parsed.nextStep === "object" ? parsed.nextStep : { text: "", done: false },
        planProgress: parsed.planProgress && typeof parsed.planProgress === "object" ? parsed.planProgress : {},
        routines: Array.isArray(parsed.routines) ? parsed.routines : [],
        routineLogs: parsed.routineLogs && typeof parsed.routineLogs === "object" ? parsed.routineLogs : {},
        disclaimerAcknowledged: !!parsed.disclaimerAcknowledged,
      };
      saveStore();
      applyAccessibilitySettings();
      goScreen("home");
    } catch (e) {
      alert("That file doesn't look like a valid export.");
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  if (!confirm("Delete all assessments and logs from this device? This can't be undone.")) return;
  store = { assessments: [], logs: [], scripts: {}, settings: store.settings, nextStep: { text: "", done: false }, planProgress: {}, routines: [], routineLogs: {}, disclaimerAcknowledged: store.disclaimerAcknowledged };
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
const SCREEN_IDS = ["intro", "home", "quicklog", "quiz", "results", "trends", "history", "scripts", "settings", "report"];

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
  if (screen === "scripts") renderToolkit();
  if (screen === "settings") renderSettings();
  if (screen === "report") renderReport();
}

/* ---------------------------------------------------------
   RENDER: HOME / DASHBOARD
--------------------------------------------------------- */
function renderHome() {
  const streak = currentStreak();
  document.getElementById("streak-count").textContent = streak;
  document.getElementById("streak-word").textContent = streak === 1 ? "day streak" : "day streak";

  const nsInput = document.getElementById("next-step-input");
  const nsDone = document.getElementById("next-step-done");
  const nsDisplay = document.getElementById("next-step-display");
  const nsSetWrap = document.getElementById("next-step-set-wrap");
  if (store.nextStep.text && !store.nextStep.done) {
    nsSetWrap.style.display = "none";
    nsDisplay.style.display = "";
    nsDisplay.querySelector(".next-step-text").textContent = store.nextStep.text;
  } else {
    nsSetWrap.style.display = "";
    nsDisplay.style.display = "none";
    nsInput.value = store.nextStep.text || "";
  }

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
  const bodyLabels = (l.bodyChecks || []).map((id) => BODY_CHECKS.find((b) => b.id === id)?.label).filter(Boolean);
  const overloadLabel = l.overloadType && l.overloadType !== "none" ? OVERLOAD_TYPES.find((o) => o.value === l.overloadType)?.label : null;
  return `<div class="log-row">
    <div class="log-row-dot" style="background:${l.overall >= 3 ? "#B4654A" : l.overall >= 2 ? "#A8763E" : "#5B7065"}"></div>
    <div class="log-row-body">
      <div class="log-row-head"><span>${escapeXml(formatDate(l.date))}</span><span class="mono">${l.overall}/4</span></div>
      ${overloadLabel ? `<p class="log-row-tags" style="color:var(--rust);">${escapeXml(overloadLabel)}</p>` : ""}
      ${tagLabels.length ? `<p class="log-row-tags">${escapeXml(tagLabels.join(", "))}</p>` : ""}
      ${bodyLabels.length ? `<p class="log-row-tags">${escapeXml(bodyLabels.join(", "))}</p>` : ""}
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

  const overloadWrap = document.getElementById("quicklog-overload");
  overloadWrap.innerHTML = OVERLOAD_TYPES.map(
    (opt) => `<button class="tag-chip${quickLogDraft.overloadType === opt.value ? " active" : ""}" data-val="${opt.value}" style="${quickLogDraft.overloadType === opt.value && opt.value !== "none" ? "background:var(--rust);border-color:var(--rust);color:#F5F6F0;" : quickLogDraft.overloadType === opt.value ? "background:var(--moss);border-color:var(--moss);color:#F5F6F0;" : ""}">${escapeXml(opt.label)}</button>`
  ).join("");
  overloadWrap.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => setOverloadType(b.dataset.val));
  });

  const bodyWrap = document.getElementById("quicklog-body");
  bodyWrap.innerHTML = BODY_CHECKS.map(
    (b) => `<button class="tag-chip${quickLogDraft.bodyChecks.includes(b.id) ? " active" : ""}" data-id="${b.id}" style="${quickLogDraft.bodyChecks.includes(b.id) ? "background:var(--ochre);border-color:var(--ochre);color:#F5F6F0;" : ""}">${escapeXml(b.label)}</button>`
  ).join("");
  bodyWrap.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => toggleBodyCheck(b.dataset.id));
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
   RENDER: TOOLKIT (communication scripts + scaffolding plans)
--------------------------------------------------------- */
function setToolkitTab(tab) {
  toolkitTab = tab;
  renderToolkit();
}

function renderToolkit() {
  document.querySelectorAll(".toolkit-tab-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === toolkitTab);
  });
  document.getElementById("scripts-panel").style.display = toolkitTab === "scripts" ? "" : "none";
  document.getElementById("plans-panel").style.display = toolkitTab === "plans" ? "" : "none";
  document.getElementById("routines-panel").style.display = toolkitTab === "routines" ? "" : "none";
  if (toolkitTab === "scripts") renderScriptsList();
  else if (toolkitTab === "plans") renderPlansList();
  else renderRoutinesList();
}

function renderScriptsList() {
  const wrap = document.getElementById("scripts-list");
  wrap.innerHTML = SCRIPTS.map((s) => {
    const val = store.scripts[s.id] !== undefined ? store.scripts[s.id] : s.body;
    return `<div class="home-card script-card">
      <h3 class="section-heading" style="margin-bottom:0.5rem;">${escapeXml(s.title)}</h3>
      <textarea class="note-field script-field" data-id="${s.id}" style="min-height:5rem;margin-bottom:0.75rem;">${escapeXml(val)}</textarea>
      <div class="action-row">
        <button class="btn-secondary script-copy-btn" data-id="${s.id}">Copy</button>
        <button class="btn-ghost script-reset-btn" data-id="${s.id}">Reset to default</button>
      </div>
    </div>`;
  }).join("");

  wrap.querySelectorAll(".script-field").forEach((el) => {
    el.addEventListener("blur", () => {
      store.scripts[el.dataset.id] = el.value;
      saveStore();
    });
  });
  wrap.querySelectorAll(".script-copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const field = wrap.querySelector(`.script-field[data-id="${btn.dataset.id}"]`);
      navigator.clipboard.writeText(field.value);
      const original = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => { btn.textContent = original; }, 1500);
    });
  });
  wrap.querySelectorAll(".script-reset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      delete store.scripts[btn.dataset.id];
      saveStore();
      renderScriptsList();
    });
  });
}

function togglePlanStep(planId, idx) {
  const plan = PLANS.find((p) => p.id === planId);
  const current = store.planProgress[planId] || new Array(plan.steps.length).fill(false);
  current[idx] = !current[idx];
  store.planProgress[planId] = current;
  saveStore();
  renderPlansList();
}

function renderPlansList() {
  const wrap = document.getElementById("plans-list");
  wrap.innerHTML = PLANS.map((p) => {
    const progress = store.planProgress[p.id] || new Array(p.steps.length).fill(false);
    const doneCount = progress.filter(Boolean).length;
    const stepsHtml = p.steps.map((step, i) => `
      <label class="plan-step">
        <input type="checkbox" class="plan-step-check" data-plan="${p.id}" data-idx="${i}" ${progress[i] ? "checked" : ""} />
        <span class="${progress[i] ? "plan-step-done" : ""}">${escapeXml(step)}</span>
      </label>
    `).join("");
    return `<div class="home-card plan-card">
      <div class="score-head" style="margin-bottom:0.2rem;">
        <h3 class="section-heading" style="margin:0;">${escapeXml(p.title)}</h3>
        <span class="band-pill mono" style="color:var(--moss);border:1px solid var(--moss);">${doneCount}/${p.steps.length}</span>
      </div>
      <p class="footnote" style="margin:0 0 0.25rem 0; font-style:italic;">${escapeXml(p.source)}</p>
      <p class="footnote" style="margin-bottom:0.75rem;">${escapeXml(p.note)}</p>
      ${stepsHtml}
    </div>`;
  }).join("");

  wrap.querySelectorAll(".plan-step-check").forEach((el) => {
    el.addEventListener("change", () => togglePlanStep(el.dataset.plan, Number(el.dataset.idx)));
  });
}

/* ---------------------------------------------------------
   RENDER: ROUTINES (autistic integration / coping tracker)
   Personal, user-defined routines with daily adherence
   tracking and simple progression trends. Not sourced from
   any external framework — purely user data.
--------------------------------------------------------- */
function addRoutine(title, stepsText) {
  const steps = stepsText.split("\n").map((s) => s.trim()).filter(Boolean);
  if (!title.trim() || !steps.length) return;
  store.routines.push({
    id: uid(),
    title: title.trim(),
    steps,
    createdAt: todayKey(),
  });
  saveStore();
}

function deleteRoutine(id) {
  if (!confirm("Delete this routine and all of its tracked history?")) return;
  store.routines = store.routines.filter((r) => r.id !== id);
  delete store.routineLogs[id];
  saveStore();
  renderRoutinesList();
}

function toggleRoutineStep(routineId, dayKey, stepIdx) {
  const routine = store.routines.find((r) => r.id === routineId);
  if (!routine) return;
  if (!store.routineLogs[routineId]) store.routineLogs[routineId] = {};
  const current = store.routineLogs[routineId][dayKey] || new Array(routine.steps.length).fill(false);
  current[stepIdx] = !current[stepIdx];
  store.routineLogs[routineId][dayKey] = current;
  saveStore();
  renderRoutinesList();
}

function routineDayCompletion(routine, dayKey) {
  const log = (store.routineLogs[routine.id] || {})[dayKey];
  if (!log) return { done: 0, total: routine.steps.length, allDone: false, logged: false };
  const done = log.filter(Boolean).length;
  return { done, total: routine.steps.length, allDone: done === routine.steps.length, logged: true };
}

function routineStreak(routine) {
  let streak = 0;
  const d = new Date();
  // count consecutive fully-completed days ending today (a partially completed "today" doesn't break the streak yet)
  for (let i = 0; i < 3650; i++) {
    const key = todayKey(d);
    const { allDone, logged } = routineDayCompletion(routine, key);
    if (allDone) {
      streak++;
    } else if (i === 0 && !logged) {
      // today not logged yet — skip without breaking streak, keep checking yesterday
    } else {
      break;
    }
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function routineConsistency(routine, days) {
  const created = new Date(routine.createdAt);
  const d = new Date();
  let eligible = 0;
  let completed = 0;
  for (let i = 0; i < days; i++) {
    if (d < created) break;
    eligible++;
    if (routineDayCompletion(routine, todayKey(d)).allDone) completed++;
    d.setDate(d.getDate() - 1);
  }
  return eligible ? Math.round((completed / eligible) * 100) : null;
}

function renderRoutineTrendBars(routine) {
  const days = 14;
  const d = new Date();
  d.setDate(d.getDate() - (days - 1));
  let bars = "";
  for (let i = 0; i < days; i++) {
    const key = todayKey(d);
    const created = new Date(routine.createdAt);
    let color = "var(--line)";
    let heightPct = 8;
    if (d >= created || key === todayKey()) {
      const { done, total, logged } = routineDayCompletion(routine, key);
      if (logged) {
        const pct = total ? done / total : 0;
        heightPct = Math.max(pct * 100, 10);
        color = pct >= 1 ? "#5B7065" : pct >= 0.5 ? "#A8763E" : "#B4654A";
      }
    }
    bars += `<div class="routine-trend-bar" style="height:${heightPct}%;background:${color};" title="${escapeXml(formatDateShort(key))}"></div>`;
    d.setDate(d.getDate() + 1);
  }
  return bars;
}

function toggleRoutineForm() {
  showRoutineForm = !showRoutineForm;
  document.getElementById("routine-add-form").style.display = showRoutineForm ? "" : "none";
  if (showRoutineForm) document.getElementById("routine-title-input").focus();
}

function saveRoutineFromForm() {
  const title = document.getElementById("routine-title-input").value;
  const steps = document.getElementById("routine-steps-input").value;
  addRoutine(title, steps);
  document.getElementById("routine-title-input").value = "";
  document.getElementById("routine-steps-input").value = "";
  showRoutineForm = false;
  document.getElementById("routine-add-form").style.display = "none";
  renderRoutinesList();
}

function renderRoutinesList() {
  const wrap = document.getElementById("routines-list");
  const today = todayKey();

  if (!store.routines.length) {
    wrap.innerHTML = `<p class="footnote">No routines yet. Add one for a transition you find hard, a recovery ritual, or a sequence that makes a part of your day predictable.</p>`;
    return;
  }

  wrap.innerHTML = store.routines.map((r) => {
    const todayLog = (store.routineLogs[r.id] || {})[today] || new Array(r.steps.length).fill(false);
    const doneToday = todayLog.filter(Boolean).length;
    const streak = routineStreak(r);
    const consistency = routineConsistency(r, 14);
    const stepsHtml = r.steps.map((step, i) => `
      <label class="routine-step-row">
        <input type="checkbox" class="routine-step-check" data-routine="${r.id}" data-idx="${i}" ${todayLog[i] ? "checked" : ""} />
        <span class="${todayLog[i] ? "routine-step-done" : ""}">${escapeXml(step)}</span>
      </label>
    `).join("");
    return `<div class="home-card routine-card">
      <div class="score-head" style="margin-bottom:0.1rem;">
        <h3 class="section-heading" style="margin:0;">${escapeXml(r.title)}</h3>
        <button class="btn-ghost routine-delete-btn" data-id="${r.id}" style="padding:0.25rem 0.4rem;">Delete</button>
      </div>
      <div class="routine-stat-row">
        <div class="routine-stat"><b>${doneToday}/${r.steps.length}</b>today</div>
        <div class="routine-stat"><b>${streak}</b>day streak</div>
        <div class="routine-stat"><b>${consistency === null ? "\u2013" : consistency + "%"}</b>last 14 days</div>
      </div>
      <div class="routine-trend-row">${renderRoutineTrendBars(r)}</div>
      ${stepsHtml}
    </div>`;
  }).join("");

  wrap.querySelectorAll(".routine-step-check").forEach((el) => {
    el.addEventListener("change", () => toggleRoutineStep(el.dataset.routine, today, Number(el.dataset.idx)));
  });
  wrap.querySelectorAll(".routine-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => deleteRoutine(btn.dataset.id));
  });
}


/* ---------------------------------------------------------
   DISCLAIMER MODAL
--------------------------------------------------------- */
function renderDisclaimerSources() {
  const wrap = document.getElementById("disclaimer-sources");
  wrap.innerHTML = SOURCES.map((s) => `
    <div class="source-row">
      <div class="source-name">${escapeXml(s.name)}</div>
      <div class="source-attr">${escapeXml(s.attr)}</div>
    </div>
  `).join("");
}

function showDisclaimer() {
  renderDisclaimerSources();
  document.getElementById("disclaimer-overlay").classList.add("show");
}

function hideDisclaimer() {
  document.getElementById("disclaimer-overlay").classList.remove("show");
}

function acknowledgeDisclaimer() {
  store.disclaimerAcknowledged = true;
  saveStore();
  hideDisclaimer();
}

/* ---------------------------------------------------------
   RENDER: SETTINGS (accessibility + data)
--------------------------------------------------------- */
function applyAccessibilitySettings() {
  document.documentElement.classList.toggle("font-large", store.settings.fontScale === "large");
  document.documentElement.classList.toggle("reduce-motion", !!store.settings.reduceMotion);
  document.documentElement.classList.toggle("high-contrast", !!store.settings.highContrast);
}

function toggleSetting(key) {
  if (key === "fontScale") {
    store.settings.fontScale = store.settings.fontScale === "large" ? "normal" : "large";
  } else {
    store.settings[key] = !store.settings[key];
  }
  saveStore();
  applyAccessibilitySettings();
  renderSettings();
}

function renderSettings() {
  const rows = [
    { key: "fontScale", label: "Larger text", desc: "Increase text size throughout the app.", on: store.settings.fontScale === "large" },
    { key: "reduceMotion", label: "Reduce motion", desc: "Turn off transitions and smooth scrolling.", on: store.settings.reduceMotion },
    { key: "highContrast", label: "High contrast", desc: "Stronger borders and darker text for readability.", on: store.settings.highContrast },
  ];
  const wrap = document.getElementById("accessibility-rows");
  wrap.innerHTML = rows.map((r) => `
    <div class="settings-row">
      <div class="settings-row-text">
        <h3>${escapeXml(r.label)}</h3>
        <p>${escapeXml(r.desc)}</p>
      </div>
      <button class="toggle-switch${r.on ? " on" : ""}" data-key="${r.key}" aria-pressed="${r.on}"><span class="toggle-knob"></span></button>
    </div>
  `).join("");
  wrap.querySelectorAll(".toggle-switch").forEach((btn) => {
    btn.addEventListener("click", () => toggleSetting(btn.dataset.key));
  });
}

/* ---------------------------------------------------------
   RENDER: SHAREABLE REPORT
--------------------------------------------------------- */
function setReportRange(v) {
  reportRange = v;
  renderReport();
}

function getRangeCutoff(range) {
  if (range === "all") return null;
  const d = new Date();
  d.setDate(d.getDate() - Number(range));
  return d;
}

function reportRangeLabel(range) {
  return range === "all" ? "All logged time" : `Last ${range} days`;
}

function buildReportData(range) {
  const cutoff = getRangeCutoff(range);
  const logs = store.logs
    .filter((l) => !cutoff || new Date(l.date) >= cutoff)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const sortedAssessments = [...store.assessments].sort((a, b) => new Date(a.date) - new Date(b.date));
  const latest = sortedAssessments[sortedAssessments.length - 1] || null;
  const first = sortedAssessments[0] || null;

  const avgOverall = logs.length ? logs.reduce((a, l) => a + l.overall, 0) / logs.length : null;

  const overloadCounts = { shutdown: 0, meltdown: 0, both: 0, none: 0 };
  logs.forEach((l) => {
    const k = l.overloadType || "none";
    overloadCounts[k] = (overloadCounts[k] || 0) + 1;
  });

  const domainTagCounts = {};
  logs.forEach((l) => (l.domains || []).forEach((id) => { domainTagCounts[id] = (domainTagCounts[id] || 0) + 1; }));

  const bodyCheckCounts = {};
  logs.forEach((l) => (l.bodyChecks || []).forEach((id) => { bodyCheckCounts[id] = (bodyCheckCounts[id] || 0) + 1; }));

  const notes = logs.filter((l) => l.note).slice(-8).reverse();

  const planSummary = PLANS.map((p) => {
    const progress = store.planProgress[p.id] || [];
    const done = progress.filter(Boolean).length;
    return { title: p.title, done, total: p.steps.length };
  }).filter((p) => p.done > 0);

  const routineSummary = store.routines.map((r) => ({
    title: r.title,
    streak: routineStreak(r),
    consistency: routineConsistency(r, 14),
  }));

  return { logs, first, latest, avgOverall, overloadCounts, domainTagCounts, bodyCheckCounts, notes, planSummary, routineSummary };
}

function renderReport() {
  document.querySelectorAll(".report-range-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.range === reportRange);
  });

  const data = buildReportData(reportRange);
  const wrap = document.getElementById("report-content");
  const generated = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

  let html = `
    <div style="margin-bottom:1.5rem;">
      <p class="eyebrow">Generated ${escapeXml(generated)}</p>
      <h1 class="title" style="margin-bottom:0.35rem;">Self-Report Summary</h1>
      <p class="footnote">${escapeXml(reportRangeLabel(reportRange))} of daily check-ins. Based on self-reported data \u2014 not a clinical or diagnostic assessment.</p>
    </div>
  `;

  if (data.latest) {
    const scoresArr = DOMAINS.map((d) => ({ label: d.label, score: data.latest.scores[d.id] ?? 0 })).sort((a, b) => b.score - a.score);
    html += `<h2 class="section-heading">Masking profile \u2014 taken ${escapeXml(formatDate(data.latest.date))}</h2>`;
    html += `<div class="home-card">${scoresArr.map((s) => `
      <div class="report-row"><span>${escapeXml(s.label)}</span><span class="mono">${s.score} \u00b7 ${bandFor(s.score)}</span></div>
    `).join("")}</div>`;
  } else {
    html += `<p class="footnote">No profile assessment taken yet.</p>`;
  }

  if (data.first && data.latest && data.first.id !== data.latest.id) {
    html += `<h2 class="section-heading">Change since first assessment (${escapeXml(formatDate(data.first.date))})</h2>`;
    html += `<div class="home-card">${DOMAINS.map((d) => {
      const delta = (data.latest.scores[d.id] ?? 0) - (data.first.scores[d.id] ?? 0);
      return `<div class="report-row"><span>${escapeXml(d.label)}</span><span class="mono">${delta > 0 ? "+" + delta : delta}</span></div>`;
    }).join("")}</div>`;
  }

  html += `<h2 class="section-heading">Daily check-ins (${escapeXml(reportRangeLabel(reportRange))})</h2>`;
  if (data.logs.length) {
    const avgLabel = SCALE[Math.round(data.avgOverall)]?.label || "\u2014";
    html += `<div class="home-card">
      <div class="report-row"><span>Check-ins logged</span><span class="mono">${data.logs.length}</span></div>
      <div class="report-row"><span>Average masking level</span><span class="mono">${data.avgOverall.toFixed(1)}/4 \u00b7 ${escapeXml(avgLabel)}</span></div>
      <div class="report-row"><span>Shutdown episodes</span><span class="mono">${data.overloadCounts.shutdown || 0}</span></div>
      <div class="report-row"><span>Meltdown episodes</span><span class="mono">${data.overloadCounts.meltdown || 0}</span></div>
      <div class="report-row"><span>Both at once</span><span class="mono">${data.overloadCounts.both || 0}</span></div>
    </div>`;

    const topDomainTags = Object.entries(data.domainTagCounts).sort((a, b) => b[1] - a[1]);
    if (topDomainTags.length) {
      html += `<div class="home-card"><p class="footnote" style="margin-bottom:0.5rem;">Most frequently tagged areas</p>${topDomainTags.map(([id, count]) => {
        const d = DOMAINS.find((x) => x.id === id);
        return `<div class="report-row"><span>${escapeXml(d ? d.label : id)}</span><span class="mono">${count}\u00d7</span></div>`;
      }).join("")}</div>`;
    }

    const topBody = Object.entries(data.bodyCheckCounts).sort((a, b) => b[1] - a[1]);
    if (topBody.length) {
      html += `<div class="home-card"><p class="footnote" style="margin-bottom:0.5rem;">Body check-ins logged</p>${topBody.map(([id, count]) => {
        const b = BODY_CHECKS.find((x) => x.id === id);
        return `<div class="report-row"><span>${escapeXml(b ? b.label : id)}</span><span class="mono">${count}\u00d7</span></div>`;
      }).join("")}</div>`;
    }

    if (data.notes.length) {
      html += `<h3 class="section-heading" style="font-size:0.95rem;">Recent notes, in your own words</h3>`;
      html += `<div class="home-card">${data.notes.map((l) => `
        <p class="mono" style="font-size:0.75rem;color:var(--ink-soft);margin:0 0 0.25rem 0;">${escapeXml(formatDate(l.date))}</p>
        <p style="margin:0 0 0.9rem 0;">${escapeXml(l.note)}</p>
      `).join("")}</div>`;
    }
  } else {
    html += `<p class="footnote">No check-ins logged in this range.</p>`;
  }

  if (data.planSummary.length) {
    html += `<h2 class="section-heading">Scaffolding plan progress</h2>`;
    html += `<div class="home-card">${data.planSummary.map((p) => `
      <div class="report-row"><span>${escapeXml(p.title)}</span><span class="mono">${p.done}/${p.total}</span></div>
    `).join("")}</div>`;
  }

  if (data.routineSummary.length) {
    html += `<h2 class="section-heading">Routine tracking</h2>`;
    html += `<div class="home-card">${data.routineSummary.map((r) => `
      <div class="report-row"><span>${escapeXml(r.title)}</span><span class="mono">${r.streak}d streak &middot; ${r.consistency === null ? "\u2013" : r.consistency + "%"} / 14d</span></div>
    `).join("")}</div>`;
  }

  html += `<p class="footnote" style="margin-top:2rem;">This report reflects self-reported patterns from a personal tracking app, not a clinical evaluation. It's meant to support a conversation with a partner, therapist, or care provider, not replace a professional assessment.</p>`;

  wrap.innerHTML = html;
}

function buildReportText() {
  const data = buildReportData(reportRange);
  const lines = [];
  lines.push("SELF-REPORT SUMMARY");
  lines.push(`Generated ${new Date().toLocaleDateString()}`);
  lines.push(`${reportRangeLabel(reportRange)} of daily check-ins. Self-reported data, not a clinical assessment.`);
  lines.push("");

  if (data.latest) {
    lines.push(`MASKING PROFILE (taken ${formatDate(data.latest.date)})`);
    DOMAINS.map((d) => ({ label: d.label, score: data.latest.scores[d.id] ?? 0 }))
      .sort((a, b) => b.score - a.score)
      .forEach((s) => lines.push(`- ${s.label}: ${s.score} (${bandFor(s.score)})`));
    lines.push("");
  }

  if (data.first && data.latest && data.first.id !== data.latest.id) {
    lines.push(`CHANGE SINCE FIRST ASSESSMENT (${formatDate(data.first.date)})`);
    DOMAINS.forEach((d) => {
      const delta = (data.latest.scores[d.id] ?? 0) - (data.first.scores[d.id] ?? 0);
      lines.push(`- ${d.label}: ${delta > 0 ? "+" + delta : delta}`);
    });
    lines.push("");
  }

  lines.push(`DAILY CHECK-INS (${reportRangeLabel(reportRange)})`);
  if (data.logs.length) {
    lines.push(`- Check-ins logged: ${data.logs.length}`);
    lines.push(`- Average masking level: ${data.avgOverall.toFixed(1)}/4 (${SCALE[Math.round(data.avgOverall)]?.label || ""})`);
    lines.push(`- Shutdown episodes: ${data.overloadCounts.shutdown || 0}`);
    lines.push(`- Meltdown episodes: ${data.overloadCounts.meltdown || 0}`);
    lines.push(`- Both at once: ${data.overloadCounts.both || 0}`);
    lines.push("");

    const topDomainTags = Object.entries(data.domainTagCounts).sort((a, b) => b[1] - a[1]);
    if (topDomainTags.length) {
      lines.push("Most frequently tagged areas:");
      topDomainTags.forEach(([id, count]) => {
        const d = DOMAINS.find((x) => x.id === id);
        lines.push(`- ${d ? d.label : id}: ${count}x`);
      });
      lines.push("");
    }

    const topBody = Object.entries(data.bodyCheckCounts).sort((a, b) => b[1] - a[1]);
    if (topBody.length) {
      lines.push("Body check-ins logged:");
      topBody.forEach(([id, count]) => {
        const b = BODY_CHECKS.find((x) => x.id === id);
        lines.push(`- ${b ? b.label : id}: ${count}x`);
      });
      lines.push("");
    }

    if (data.notes.length) {
      lines.push("Recent notes, in your own words:");
      data.notes.forEach((l) => lines.push(`[${formatDate(l.date)}] ${l.note}`));
      lines.push("");
    }
  } else {
    lines.push("No check-ins logged in this range.");
    lines.push("");
  }

  if (data.planSummary.length) {
    lines.push("SCAFFOLDING PLAN PROGRESS");
    data.planSummary.forEach((p) => lines.push(`- ${p.title}: ${p.done}/${p.total} steps`));
    lines.push("");
  }

  if (data.routineSummary.length) {
    lines.push("ROUTINE TRACKING");
    data.routineSummary.forEach((r) => lines.push(`- ${r.title}: ${r.streak}-day streak, ${r.consistency === null ? "no data" : r.consistency + "%"} over last 14 days`));
    lines.push("");
  }

  lines.push("This report reflects self-reported patterns from a personal tracking app, not a clinical evaluation.");
  return lines.join("\n");
}

function copyReportText() {
  navigator.clipboard.writeText(buildReportText());
  const btn = document.getElementById("report-copy-btn");
  const original = btn.textContent;
  btn.textContent = "Copied";
  setTimeout(() => { btn.textContent = original; }, 1500);
}

function downloadReportText() {
  const blob = new Blob([buildReportText()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `self-report-${todayKey()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function printReport() {
  window.print();
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

document.getElementById("next-step-save").addEventListener("click", saveNextStep);
document.getElementById("next-step-done").addEventListener("click", completeNextStep);
document.getElementById("next-step-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveNextStep();
});

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => goScreen(btn.dataset.nav));
});

document.querySelectorAll(".toolkit-tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => setToolkitTab(btn.dataset.tab));
});

document.querySelectorAll(".report-range-btn").forEach((btn) => {
  btn.addEventListener("click", () => setReportRange(btn.dataset.range));
});
document.getElementById("report-print-btn").addEventListener("click", printReport);
document.getElementById("report-copy-btn").addEventListener("click", copyReportText);
document.getElementById("report-download-btn").addEventListener("click", downloadReportText);
document.getElementById("open-report-btn").addEventListener("click", () => goScreen("report"));
document.getElementById("report-back-btn").addEventListener("click", () => goScreen("settings"));

document.getElementById("disclaimer-ack-btn").addEventListener("click", acknowledgeDisclaimer);
document.getElementById("open-disclaimer-btn").addEventListener("click", showDisclaimer);

document.getElementById("routine-add-toggle").addEventListener("click", toggleRoutineForm);
document.getElementById("routine-save-btn").addEventListener("click", saveRoutineFromForm);
document.getElementById("routine-cancel-btn").addEventListener("click", () => {
  showRoutineForm = false;
  document.getElementById("routine-add-form").style.display = "none";
});

applyAccessibilitySettings();
render();
if (!store.disclaimerAcknowledged) showDisclaimer();

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
