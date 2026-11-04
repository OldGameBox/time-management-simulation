// Paste your Firebase web app config here. Leave these empty until you create the project.
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCSgNVwxSAEdkJezAf_VGhBrlmIneXdNNw",
  authDomain: "solya-time-management-sim.firebaseapp.com",
  databaseURL: "https://solya-time-management-sim-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "solya-time-management-sim",
  storageBucket: "solya-time-management-sim.firebasestorage.app",
  messagingSenderId: "547211371655",
  appId: "1:547211371655:web:0aa40d2f556d2651658422",
  measurementId: "G-1QW1WBXPYT"
};

// Edit the briefs here. Shape: company → department → round.
// Observer has no department, so round1 and round2 sit directly on observer.
const INSTRUCTIONS = {
  clock: {
    hacker1: {
      round1: "Style: Structured, sequential, and deadline-focused. \"One task at a time. Every step has its place.\"\n\nRules: Focus completely on your individual task. Finish your current step before starting another. Avoid speaking to other players. Avoid distractions at all costs.\n\nTiming: Round 1 lasts 5 minutes, but you have a strict 4-minute deadline to submit your fragments to Integration. Finishing quickly is your top priority.",
      round2: "The deadline just tightened. Finish the seed slice and stop. Do not open a second task. Deliver one precise handoff and nothing else."
    },
    hacker2: {
      round1: "Style: Structured, sequential, and deadline-focused. \"One task at a time. Every step has its place.\"\n\nRules: Focus completely on your individual task. Finish your current step before starting another. Avoid speaking to other players. Avoid distractions at all costs.\n\nTiming: Round 1 lasts 5 minutes, but you have a strict 4-minute deadline to submit your fragments to Integration. Finishing quickly is your top priority.",
      round2: "The clock moved up. Close the ledger as your only job. One finished sequence, then a precise handoff. Leave no hop for later."
    },
    hacker3: {
      round1: "Style: Structured, sequential, and deadline-focused. \"One task at a time. Every step has its place.\"\n\nRules: Focus completely on your individual task. Finish your current step before starting another. Avoid speaking to other players. Avoid distractions at all costs.\n\nTiming: Round 1 lasts 5 minutes, but you have a strict 4-minute deadline to submit your fragments to Integration. Finishing quickly is your top priority.",
      round2: "The deadline tightened. Finish the firmware before you touch anything else. One finished artifact, handed off with no loose ends."
    },
    integration: {
      round1: "Style: Structured, sequential, and deadline-focused. \"One task at a time. Every step has its place.\"\n\nRules: Focus completely on your individual task. Avoid speaking to other players. Avoid distractions at all costs.\n\nTiming: Round 1 lasts 5 minutes. You must compile the final key. You cannot accept any codes from the Hackers after the 4-minute mark.",
      round2: "Merge the three wallet pieces into one handoff. Complete one merge step before the next. The deadline is binding. Deliver a single exact package."
    }
  },
  flow: {
    hacker1: {
      round1: "Style: Flexible, responsive, and adaptive. \"Stay flexible. Adapt as things happen.\"\n\nRules: Your role is to help your team succeed. Communicate openly and discuss topics freely. You are flexible with priorities\u2014if an urgent request comes up, drop what you are doing to help.\n\nTiming: Round 1 lasts 5 minutes. There is no rush. You may ask the Timekeeper once for an extra 30 seconds.",
      round2: "A new parallel lead is live: a second seed echo on another chain. Keep both streams moving. Help the moment someone is stuck. The deadline can flex."
    },
    hacker2: {
      round1: "Style: Flexible, responsive, and adaptive. \"Stay flexible. Adapt as things happen.\"\n\nRules: Your role is to help your team succeed. Communicate openly and discuss topics freely. You are flexible with priorities\u2014if an urgent request comes up, drop what you are doing to help.\n\nTiming: Round 1 lasts 5 minutes. There is no rush. You may ask the Timekeeper once for an extra 30 seconds.",
      round2: "A new parallel lead just opened: a shadow route beside the ledger. Run both. Drop everything when a teammate asks, then keep the streams moving."
    },
    hacker3: {
      round1: "Style: Flexible, responsive, and adaptive. \"Stay flexible. Adapt as things happen.\"\n\nRules: Your role is to help your team succeed. Communicate openly and discuss topics freely. You are flexible with priorities\u2014if an urgent request comes up, drop what you are doing to help.\n\nTiming: Round 1 lasts 5 minutes. There is no rush. You may ask the Timekeeper once for an extra 30 seconds.",
      round2: "A second firmware lead just landed. Run it in parallel with the lock. If a hacker is blocked, help immediately. The deadline is a flexible target."
    },
    integration: {
      round1: "Style: Flexible, responsive, and adaptive. \"Stay flexible. Adapt as things happen.\"\n\nRules: Your role is to help your team succeed. Communicate openly and discuss topics freely. You are flexible with priorities\u2014if an urgent request comes up, drop what you are doing to help.\n\nTiming: Round 1 lasts 5 minutes. There is no rush. You may ask the Timekeeper once for an extra 30 seconds.",
      round2: "Merge the wallet pieces into one handoff while the room is still moving. If a piece is blocked, help immediately, then pull the streams together. The deadline can flex. Leave one shared handoff."
    }
  },
  observer: {
    round1: "You are observing only. You have no heist assignment. Watch how the room works and keep notes for the debrief.",
    round2: "You are still observing only. You have no merge task. Watch what changes under pressure and keep notes for the debrief."
  }
};

const ADMIN_PASSCODE = "merger2026";
const STORAGE_KEY = "cryptoWalletHeistParticipant";
const COMPANY_CAP = 12;
const DEPARTMENTS = ["hacker1", "hacker2", "hacker3", "integration"];

const QUESTIONS = [
  {
    prompt: "When a manager sets a Friday deadline, do you view it as: A) A binding promise, or B) A flexible target?",
    A: "A binding promise",
    B: "A flexible target"
  },
  {
    prompt: "When deeply focused and a colleague asks for help, do you: A) Finish your thought first, or B) Drop everything to help?",
    A: "Finish your thought first",
    B: "Drop everything to help"
  },
  {
    prompt: "Do you prefer: A) Finishing one task before the next, or B) Keeping several moving at once?",
    A: "Finishing one task before the next",
    B: "Keeping several moving at once"
  }
];

const COMPANY_LABELS = {
  clock: "Clock",
  flow: "Flow",
  observer: "Observer"
};

const DEPARTMENT_LABELS = {
  hacker1: "Hacker 1",
  hacker2: "Hacker 2",
  hacker3: "Hacker 3",
  integration: "Integration"
};

const PHASE_LABELS = {
  lobby: "Lobby",
  sorted: "Teams sorted",
  round1: "Round 1",
  round2: "Round 2"
};

const state = {
  mode: "landing",
  adminAuthed: false,
  db: null,
  firebaseReady: false,
  session: { phase: "lobby" },
  me: null,
  connectedCount: null,
  participantsReady: false,
  quizLocked: false,
  sortBusy: false
};

function $(id) {
  return document.getElementById(id);
}

function hasDatabaseUrl() {
  return Boolean(FIREBASE_CONFIG && typeof FIREBASE_CONFIG.databaseURL === "string" && FIREBASE_CONFIG.databaseURL.trim());
}

function computeProfile(answers) {
  const list = asAnswers(answers);
  const aCount = list.filter((answer) => answer === "A").length;
  const bCount = list.filter((answer) => answer === "B").length;
  if (aCount === 3) return "clock";
  if (bCount === 3) return "flow";
  return "adaptable";
}

function asAnswers(value) {
  if (Array.isArray(value)) {
    return value.filter((answer) => answer === "A" || answer === "B").slice(0, 3);
  }
  if (value && typeof value === "object") {
    return [0, 1, 2].map((index) => value[index]).filter((answer) => answer === "A" || answer === "B");
  }
  return [];
}

function departmentSizes(n) {
  if (n <= 0) return [0, 0, 0, 0];
  if (n >= 12) {
    const sizes = [3, 3, 3, 3];
    for (let extra = n - 12, i = 0; extra > 0; extra -= 1, i += 1) {
      sizes[i % 4] += 1;
    }
    return sizes;
  }
  if (n < 6) {
    const sizes = [0, 0, 0, 0];
    for (let i = 0; i < n; i += 1) sizes[i % 3] += 1;
    return sizes;
  }
  const sizes = [3, 3, 3, 3];
  let remove = 12 - n;
  while (remove > 0 && sizes[3] > 0) {
    sizes[3] -= 1;
    remove -= 1;
  }
  let turn = 0;
  while (remove > 0) {
    const idx = turn % 3;
    turn += 1;
    if (sizes[idx] > 2) {
      sizes[idx] -= 1;
      remove -= 1;
    }
    if (turn > 12) break;
  }
  return sizes;
}

function seatCompanies(people) {
  const ordered = people.slice().sort((a, b) => {
    if (a.joinedAt !== b.joinedAt) return a.joinedAt - b.joinedAt;
    return String(a.id).localeCompare(String(b.id));
  });
  const clocks = [];
  const flows = [];
  const adaptables = [];
  ordered.forEach((person) => {
    if (person.profile === "clock") clocks.push(person);
    else if (person.profile === "flow") flows.push(person);
    else adaptables.push(person);
  });

  const seated = { clock: [], flow: [], observer: [] };
  clocks.forEach((person) => {
    if (seated.clock.length < COMPANY_CAP) seated.clock.push(person);
    else seated.observer.push(person);
  });
  flows.forEach((person) => {
    if (seated.flow.length < COMPANY_CAP) seated.flow.push(person);
    else seated.observer.push(person);
  });
  adaptables.forEach((person) => {
    const clockRoom = seated.clock.length < COMPANY_CAP;
    const flowRoom = seated.flow.length < COMPANY_CAP;
    if (!clockRoom && !flowRoom) {
      seated.observer.push(person);
      return;
    }
    if (clockRoom && (!flowRoom || seated.clock.length <= seated.flow.length)) {
      seated.clock.push(person);
    } else {
      seated.flow.push(person);
    }
  });
  return seated;
}

function shuffled(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = copy[i];
    copy[i] = copy[j];
    copy[j] = swap;
  }
  return copy;
}

function sliceDepartments(members, sizes) {
  const assigned = [];
  let cursor = 0;
  DEPARTMENTS.forEach((department, index) => {
    const group = members.slice(cursor, cursor + sizes[index]);
    cursor += sizes[index];
    group.forEach((person) => {
      assigned.push({
        id: person.id,
        profile: person.profile,
        company: person.company,
        department: department
      });
    });
  });
  return assigned;
}

function assignmentsFromPeople(people, shuffleFn) {
  const mix = shuffleFn || shuffled;
  const seated = seatCompanies(people);
  const assignments = {};
  ["clock", "flow"].forEach((company) => {
    const members = mix(seated[company]).map((person) => ({
      id: person.id,
      profile: person.profile,
      company: company
    }));
    sliceDepartments(members, departmentSizes(members.length)).forEach((row) => {
      assignments[row.id] = {
        profile: row.profile,
        company: row.company,
        department: row.department
      };
    });
  });
  seated.observer.forEach((person) => {
    assignments[person.id] = {
      profile: person.profile,
      company: "observer",
      department: null
    };
  });
  return assignments;
}

function finishedPeople(participants) {
  const people = [];
  Object.keys(participants || {}).forEach((id) => {
    const raw = participants[id];
    if (!raw || typeof raw !== "object") return;
    const answers = asAnswers(raw.answers);
    if (answers.length !== 3) return;
    people.push({
      id: id,
      profile: computeProfile(answers),
      joinedAt: typeof raw.joinedAt === "number" ? raw.joinedAt : 0
    });
  });
  return people;
}

function phaseAfterSort(current) {
  if (current === "round1" || current === "round2") return current;
  return "sorted";
}

function roundsUnlocked(session) {
  const phase = session && session.phase;
  return phase === "sorted" || phase === "round1" || phase === "round2";
}

function createId() {
  if (globalThis.crypto && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "p-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12);
}

function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.id !== "string" || !parsed.id) return null;
    return {
      id: parsed.id,
      name: typeof parsed.name === "string" ? parsed.name : "",
      answers: asAnswers(parsed.answers),
      profile: parsed.profile || null,
      company: parsed.company || null,
      department: parsed.department || null,
      joinedAt: typeof parsed.joinedAt === "number" ? parsed.joinedAt : Date.now()
    };
  } catch (err) {
    return null;
  }
}

function writeLocal(me) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      id: me.id,
      name: me.name,
      answers: me.answers,
      profile: me.profile,
      company: me.company,
      department: me.department,
      joinedAt: me.joinedAt
    }));
  } catch (err) {
    // Private browsing can block storage. The quiz still runs in memory.
  }
}

function normalizeRemote(id, value) {
  const answers = asAnswers(value && value.answers);
  return {
    id: id,
    name: value && typeof value.name === "string" ? value.name : "",
    answers: answers,
    profile: value && value.profile ? value.profile : (answers.length === 3 ? computeProfile(answers) : null),
    company: value && value.company ? value.company : null,
    department: value && value.department ? value.department : null,
    joinedAt: value && typeof value.joinedAt === "number" ? value.joinedAt : Date.now()
  };
}

function showView(name) {
  document.querySelectorAll(".view").forEach((view) => {
    view.hidden = view.id !== "view-" + name;
  });
  state.mode = name;
}

function showSyncWarning(message) {
  const el = $("sync-warning");
  if (!message) {
    el.hidden = true;
    el.textContent = "";
    return;
  }
  el.hidden = false;
  el.textContent = message;
}

function initFirebase() {
  if (!hasDatabaseUrl()) return false;
  if (typeof firebase === "undefined" || !firebase.initializeApp) {
    showSyncWarning("The Firebase scripts did not load, so the live room is offline.");
    return false;
  }
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    state.db = firebase.database();
    state.firebaseReady = true;
    $("config-notice").hidden = true;
    return true;
  } catch (err) {
    console.error(err);
    state.db = null;
    state.firebaseReady = false;
    showSyncWarning("Firebase could not start. Check FIREBASE_CONFIG in app.js.");
    return false;
  }
}

function listenToSession() {
  if (!state.db) return;
  state.db.ref("session").on("value", (snap) => {
    state.session = snap.val() || { phase: "lobby" };
    renderAdmin();
    if (isParticipantMode()) renderParticipant();
  }, (err) => {
    console.error(err);
    showSyncWarning("Could not read the session. Check the database rules.");
  });
}

function listenToParticipants() {
  if (!state.db || state.participantsReady) return;
  state.participantsReady = true;
  state.db.ref("participants").on("value", (snap) => {
    const all = snap.val() || {};
    state.connectedCount = Object.keys(all).filter((id) => all[id] && all[id].connected === true).length;
    renderAdmin();
  }, (err) => {
    console.error(err);
    showSyncWarning("Could not read participants. Check the database rules.");
  });
}

function participantRef(id) {
  return state.db.ref("participants/" + id);
}

function setupPresence(id) {
  if (!state.db || state.presenceId === id) return;
  state.presenceId = id;
  const ref = participantRef(id);
  const connectedRef = state.db.ref(".info/connected");
  connectedRef.on("value", (snap) => {
    if (snap.val() !== true) return;
    ref.onDisconnect().update({ connected: false }).then(() => {
      return ref.update({ connected: true });
    }).catch((err) => {
      console.error(err);
      showSyncWarning("Presence could not be saved. Check the database rules.");
    });
  });
}

function pushParticipant(me) {
  if (!state.db) return Promise.resolve();
  const payload = {
    name: me.name,
    answers: me.answers.slice(),
    profile: me.profile,
    connected: true,
    joinedAt: me.joinedAt
  };
  state.saveChain = (state.saveChain || Promise.resolve()).catch(() => {}).then(() => {
    return participantRef(me.id).update(payload);
  });
  return state.saveChain.catch((err) => {
    console.error(err);
    showSyncWarning("Could not save to Firebase. Your quiz answers are still on this device.");
  });
}

function watchOwnRecord(id) {
  if (!state.db || state.watchingId === id) return;
  state.watchingId = id;
  participantRef(id).on("value", (snap) => {
    if (!snap.exists()) return;
    const remote = normalizeRemote(id, snap.val());
    const localAnswers = state.me && state.me.id === id ? state.me.answers : [];
    if (localAnswers.length > remote.answers.length) remote.answers = localAnswers;
    if (remote.answers.length === 3 && !remote.profile) remote.profile = computeProfile(remote.answers);
    state.me = remote;
    writeLocal(remote);
    if (isParticipantMode()) renderParticipant();
  });
}

function isParticipantMode() {
  return state.mode === "join" || state.mode === "quiz" || state.mode === "waiting" || state.mode === "reveal" || state.mode === "brief";
}

function participantDestination() {
  const me = state.me;
  if (!me || !me.name) return "join";
  if (!me.answers || me.answers.length < 3) return "quiz";
  if (!me.company) return "waiting";
  const phase = (state.session && state.session.phase) || "lobby";
  if (phase === "round1" || phase === "round2") return "brief";
  return "reveal";
}

function renderParticipant() {
  const dest = participantDestination();
  if (dest === "quiz") renderQuiz();
  if (dest === "waiting") $("participant-name-waiting").textContent = state.me.name;
  if (dest === "reveal") renderReveal();
  if (dest === "brief") renderBrief();
  showView(dest);
}

function renderQuiz() {
  const index = state.me.answers.length;
  const question = QUESTIONS[index] || QUESTIONS[2];
  $("participant-name-quiz").textContent = state.me.name;
  $("quiz-number").textContent = String(Math.min(index + 1, 3));
  $("quiz-prompt").textContent = question.prompt;
  $("choice-a-label").textContent = question.A;
  $("choice-b-label").textContent = question.B;
}

function renderReveal() {
  const me = state.me;
  $("participant-name-reveal").textContent = me.name;
  const observer = me.company === "observer";
  $("reveal-observer").hidden = !observer;
  $("reveal-assigned").hidden = observer;
  if (!observer) {
    $("reveal-company").textContent = COMPANY_LABELS[me.company] || me.company;
    $("reveal-department").textContent = DEPARTMENT_LABELS[me.department] || "Unassigned";
  }
}

function briefText(company, department, phase) {
  if (company === "observer") {
    return (INSTRUCTIONS.observer && INSTRUCTIONS.observer[phase]) || "";
  }
  const companyBlock = INSTRUCTIONS[company];
  const deptBlock = companyBlock && companyBlock[department];
  return (deptBlock && deptBlock[phase]) || "";
}

function renderBrief() {
  const me = state.me;
  const phase = state.session.phase;
  const companyLabel = COMPANY_LABELS[me.company] || "Unassigned";
  const deptLabel = me.company === "observer" ? "" : (DEPARTMENT_LABELS[me.department] || "");
  $("brief-identity").textContent = deptLabel ? companyLabel + " · " + deptLabel : companyLabel;
  $("brief-round").textContent = PHASE_LABELS[phase] || "Round";
  const text = briefText(me.company, me.department, phase);
  $("brief-body").textContent = text || "No brief is available for this seat yet.";
}

function renderAdmin() {
  if (state.mode !== "admin") return;
  const phase = (state.session && state.session.phase) || "lobby";
  $("phase-label").textContent = PHASE_LABELS[phase] || phase;
  if (!state.firebaseReady) {
    $("connected-count").textContent = "—";
  } else if (state.connectedCount === null) {
    $("connected-count").textContent = "…";
  } else {
    $("connected-count").textContent = String(state.connectedCount);
  }
  const unlocked = roundsUnlocked(state.session);
  $("start-round-1").disabled = !unlocked;
  $("start-round-2").disabled = !unlocked;
}

function openAdmin() {
  if (state.adminAuthed) {
    showView("admin");
    listenToParticipants();
    renderAdmin();
    return;
  }
  $("passcode-error").hidden = true;
  $("passcode").value = "";
  showView("admin-auth");
  $("passcode").focus();
}

function openHacker() {
  if (!state.me) state.me = readLocal();
  if (state.me && state.me.name) {
    if (state.firebaseReady) {
      setupPresence(state.me.id);
      watchOwnRecord(state.me.id);
      pushParticipant(state.me);
    }
    renderParticipant();
    return;
  }
  $("name-error").hidden = true;
  showView("join");
  $("display-name").focus();
}

function onJoinSubmit(event) {
  event.preventDefault();
  const name = $("display-name").value.trim();
  if (!name) {
    $("name-error").hidden = false;
    return;
  }
  $("name-error").hidden = true;
  const existing = state.me || readLocal();
  const samePerson = Boolean(existing && existing.id);
  const id = samePerson ? existing.id : createId();
  state.me = {
    id: id,
    name: name,
    answers: samePerson ? asAnswers(existing.answers) : [],
    profile: samePerson && existing.answers && asAnswers(existing.answers).length === 3 ? computeProfile(existing.answers) : null,
    company: samePerson ? existing.company : null,
    department: samePerson ? existing.department : null,
    joinedAt: samePerson && existing.joinedAt ? existing.joinedAt : Date.now()
  };
  if (state.me.answers.length === 3) state.me.profile = computeProfile(state.me.answers);
  writeLocal(state.me);
  if (state.firebaseReady) {
    setupPresence(state.me.id);
    watchOwnRecord(state.me.id);
    pushParticipant(state.me);
  }
  renderParticipant();
}

function onChoose(letter) {
  if (state.quizLocked || !state.me) return;
  if (state.chooseReadyAt && Date.now() < state.chooseReadyAt) return;
  if (state.me.answers.length >= 3) return;
  state.quizLocked = true;
  state.chooseReadyAt = Date.now() + 350;
  state.me.answers = state.me.answers.concat([letter]);
  if (state.me.answers.length === 3) state.me.profile = computeProfile(state.me.answers);
  writeLocal(state.me);
  const save = state.firebaseReady ? pushParticipant(state.me) : Promise.resolve();
  Promise.resolve(save).then(() => {
    state.quizLocked = false;
    renderParticipant();
  });
}

function onPasscodeSubmit(event) {
  event.preventDefault();
  const entered = $("passcode").value.trim();
  if (entered !== ADMIN_PASSCODE) {
    $("passcode-error").hidden = false;
    return;
  }
  state.adminAuthed = true;
  $("passcode-error").hidden = true;
  $("admin-message").textContent = "";
  showView("admin");
  listenToParticipants();
  renderAdmin();
}

function setAdminMessage(message) {
  $("admin-message").textContent = message;
}

function onSortTeams() {
  if (state.sortBusy) return;
  if (!state.firebaseReady || !state.db) {
    setAdminMessage("Firebase is not configured yet, so teams cannot be saved.");
    return;
  }
  state.sortBusy = true;
  $("sort-teams").disabled = true;
  setAdminMessage("Sorting…");
  const db = state.db;
  Promise.all([
    db.ref("participants").once("value"),
    db.ref("session").once("value")
  ]).then((snaps) => {
    const participants = snaps[0].val() || {};
    const session = snaps[1].val() || {};
    const assignments = assignmentsFromPeople(finishedPeople(participants));
    const updates = {};
    Object.keys(assignments).forEach((id) => {
      const row = assignments[id];
      updates["participants/" + id + "/profile"] = row.profile;
      updates["participants/" + id + "/company"] = row.company;
      updates["participants/" + id + "/department"] = row.department;
    });
    Object.keys(participants).forEach((id) => {
      if (assignments[id]) return;
      const current = participants[id] || {};
      if (current.company || current.department) {
        updates["participants/" + id + "/company"] = null;
        updates["participants/" + id + "/department"] = null;
      }
    });
    updates["session/phase"] = phaseAfterSort(session.phase);
    updates["session/sortedAt"] = Date.now();
    return db.ref().update(updates).then(() => {
      const seated = Object.keys(assignments).filter((id) => assignments[id].company !== "observer").length;
      const observers = Object.keys(assignments).length - seated;
      setAdminMessage("Sorted " + Object.keys(assignments).length + " finished participants. " + seated + " seated, " + observers + " observing.");
    });
  }).catch((err) => {
    console.error(err);
    setAdminMessage("Sort failed. Check the database rules and try again.");
    showSyncWarning("Could not write the sort to Firebase.");
  }).then(() => {
    state.sortBusy = false;
    $("sort-teams").disabled = false;
  });
}

function onStartRound(phase) {
  if (!roundsUnlocked(state.session)) return;
  if (!state.firebaseReady || !state.db) {
    setAdminMessage("Firebase is not configured yet, so the round cannot start.");
    return;
  }
  state.db.ref("session/phase").set(phase).then(() => {
    setAdminMessage(PHASE_LABELS[phase] + " is live. Assignments were left as they are.");
  }).catch((err) => {
    console.error(err);
    setAdminMessage("Could not start the round. Check the database rules.");
  });
}

function boot() {
  initFirebase();
  listenToSession();

  $("join-hacker").addEventListener("click", openHacker);
  $("admin-access").addEventListener("click", openAdmin);
  $("join-form").addEventListener("submit", onJoinSubmit);
  $("passcode-form").addEventListener("submit", onPasscodeSubmit);
  $("sort-teams").addEventListener("click", onSortTeams);
  $("start-round-1").addEventListener("click", () => onStartRound("round1"));
  $("start-round-2").addEventListener("click", () => onStartRound("round2"));
  document.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (event.detail > 1) return;
      onChoose(button.getAttribute("data-answer"));
    });
  });
  document.querySelectorAll("[data-goto]").forEach((button) => {
    button.addEventListener("click", () => showView(button.getAttribute("data-goto")));
  });

  const saved = readLocal();
  if (saved && saved.name) {
    state.me = saved;
    if (state.firebaseReady) {
      setupPresence(saved.id);
      watchOwnRecord(saved.id);
      pushParticipant(saved);
    }
    renderParticipant();
  } else {
    showView("landing");
  }
}

if (typeof document !== "undefined") {
  boot();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    computeProfile,
    departmentSizes,
    seatCompanies,
    sliceDepartments,
    assignmentsFromPeople,
    finishedPeople,
    phaseAfterSort,
    roundsUnlocked,
    asAnswers,
    briefText
  };
}
