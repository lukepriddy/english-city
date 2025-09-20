const state = {
  progress: {
    corner: { idiom: false, quiz: false, advice: false },
    mural: { favorite: false, clause: false, suggestion: false },
    garden: { sentence: false, fix: false, idea: false },
    neighbor: { report: false }
  },
  visited: new Set(),
  responses: {
    cornerIdiom: '',
    cornerAdvice: '',
    muralFavorite: '',
    muralClause: '',
    muralSuggestion: '',
    gardenSentence: '',
    gardenFix: '',
    gardenIdea: '',
    neighborFinal: ''
  },
  promptErrors: {},
  errorLog: []
};

const sceneImages = {
  corner: {
    caption: 'Corner Store · late-night register glow',
    svg: `
      <svg width="320" height="200" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="100" fill="#142238" />
        <rect x="8" y="50" width="144" height="42" fill="#25395b" />
        <rect x="12" y="54" width="136" height="34" fill="#314b74" />
        <rect x="18" y="58" width="38" height="30" fill="#1f2f4a" />
        <rect x="24" y="62" width="26" height="14" fill="#3fc0f0" />
        <rect x="70" y="58" width="34" height="30" fill="#1f2f4a" />
        <rect x="78" y="62" width="18" height="18" fill="#f7c948" />
        <rect x="112" y="58" width="30" height="30" fill="#1f2f4a" />
        <rect x="118" y="62" width="18" height="12" fill="#f77d8c" />
        <rect x="32" y="46" width="96" height="6" fill="#f77d8c" />
        <rect x="20" y="46" width="8" height="6" fill="#3fc0f0" />
        <rect x="128" y="46" width="12" height="6" fill="#3fc0f0" />
        <rect x="54" y="34" width="52" height="12" fill="#0f1828" />
        <rect x="58" y="36" width="12" height="8" fill="#f7c948" />
        <rect x="86" y="36" width="12" height="8" fill="#f77d8c" />
        <rect x="70" y="74" width="20" height="6" fill="#f7f4e9" opacity="0.7" />
      </svg>
    `
  },
  mural: {
    caption: 'Street Mural · dusk colors on brick',
    svg: `
      <svg width="320" height="200" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="100" fill="#111c33" />
        <rect x="12" y="30" width="136" height="62" fill="#2a3456" />
        <rect x="16" y="34" width="128" height="54" fill="#352f56" />
        <rect x="20" y="38" width="120" height="46" fill="#3f2f5c" />
        <rect x="24" y="42" width="112" height="38" fill="#452f5a" />
        <path d="M32 74 Q64 28 96 72 T144 50" fill="none" stroke="#f8b84b" stroke-width="6" stroke-linecap="round" />
        <path d="M26 78 Q58 40 90 76 T142 56" fill="none" stroke="#5bd3f7" stroke-width="6" stroke-linecap="round" />
        <path d="M30 70 Q64 52 110 78" fill="none" stroke="#f56fa5" stroke-width="6" stroke-linecap="round" />
        <rect x="40" y="22" width="16" height="8" fill="#f8b84b" />
        <rect x="60" y="18" width="12" height="12" fill="#5bd3f7" />
        <rect x="82" y="20" width="14" height="10" fill="#f56fa5" />
      </svg>
    `
  },
  garden: {
    caption: 'Community Garden · night lights and herbs',
    svg: `
      <svg width="320" height="200" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="100" fill="#10211c" />
        <rect x="0" y="68" width="160" height="32" fill="#1a3b2f" />
        <rect x="6" y="60" width="148" height="10" fill="#264d3d" />
        <rect x="12" y="50" width="136" height="10" fill="#2f5f45" />
        <rect x="14" y="46" width="132" height="4" fill="#a3d977" />
        <rect x="20" y="40" width="6" height="12" fill="#3d9b6b" />
        <rect x="18" y="34" width="10" height="8" fill="#59c086" />
        <rect x="34" y="42" width="6" height="12" fill="#3d9b6b" />
        <rect x="32" y="36" width="10" height="8" fill="#59c086" />
        <rect x="46" y="44" width="6" height="12" fill="#3d9b6b" />
        <rect x="44" y="38" width="10" height="8" fill="#59c086" />
        <rect x="108" y="40" width="10" height="18" fill="#3d9b6b" />
        <rect x="104" y="32" width="18" height="10" fill="#59c086" />
        <rect x="130" y="42" width="6" height="14" fill="#3d9b6b" />
        <rect x="126" y="34" width="14" height="10" fill="#59c086" />
        <rect x="70" y="30" width="24" height="10" fill="#f8f0c9" />
        <rect x="74" y="26" width="16" height="6" fill="#f7c948" />
        <rect x="76" y="22" width="12" height="4" fill="#f77d8c" />
        <rect x="6" y="64" width="148" height="4" fill="#0c1a15" opacity="0.6" />
      </svg>
    `
  },
  neighbor: {
    caption: 'Apartment Hallway · Albert waits by the door',
    svg: `
      <svg width="320" height="200" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="100" fill="#1b1f33" />
        <rect x="20" y="18" width="120" height="72" fill="#2b3150" />
        <rect x="28" y="24" width="40" height="60" fill="#3c456c" />
        <rect x="32" y="28" width="32" height="52" fill="#20263d" />
        <rect x="90" y="24" width="50" height="60" fill="#3c456c" />
        <rect x="96" y="28" width="38" height="52" fill="#20263d" />
        <rect x="64" y="40" width="12" height="38" fill="#f7c948" />
        <rect x="68" y="44" width="4" height="4" fill="#0f1828" />
        <rect x="110" y="68" width="12" height="4" fill="#f77d8c" />
        <rect x="18" y="86" width="124" height="4" fill="#111628" />
      </svg>
    `
  }
};

const sceneContainer = document.getElementById('scene-container');
const neighborSection = document.getElementById('neighbor-challenge');
const neighborContent = document.getElementById('neighbor-content');
const wrapSection = document.getElementById('wrap-up');
const wrapSummary = document.getElementById('wrap-summary');
const reportArea = document.getElementById('report');

const choiceButtons = {};
document.querySelectorAll('.choice').forEach((button) => {
  const sceneId = button.dataset.scene;
  button.dataset.label = button.textContent.trim();
  choiceButtons[sceneId] = button;
  button.addEventListener('click', () => loadScene(sceneId));
});

const sceneBuilders = {
  corner: buildCornerStore,
  mural: buildStreetMural,
  garden: buildCommunityGarden
};

function loadScene(sceneId) {
  const builder = sceneBuilders[sceneId];
  if (!builder) return;
  sceneContainer.innerHTML = '';
  sceneContainer.appendChild(builder());
}

function makeChecklist(sceneId, items) {
  const section = document.createElement('section');
  section.innerHTML = '<h4>Progress check</h4>';
  const list = document.createElement('div');
  list.className = 'checklist';

  items.forEach((item) => {
    const row = document.createElement('span');
    row.dataset.key = item.id;
    const status = document.createElement('span');
    status.className = 'status bad';
    status.textContent = '✗';
    row.append(status, item.label);
    list.append(row);
  });

  section.append(list);

  const update = () => {
    const progress = state.progress[sceneId];
    list.querySelectorAll('span[data-key]').forEach((row) => {
      const key = row.dataset.key;
      const status = row.querySelector('.status');
      const done = Boolean(progress?.[key]);
      status.textContent = done ? '✔' : '✗';
      status.className = `status ${done ? 'good' : 'bad'}`;
    });
  };

  update();
  return { section, update };
}

function markTask(sceneId, taskId, onUpdate) {
  if (!state.progress[sceneId][taskId]) {
    state.progress[sceneId][taskId] = true;
    onUpdate?.();
    checkSceneCompletion(sceneId);
  } else {
    onUpdate?.();
  }
}

function checkSceneCompletion(sceneId) {
  const tasks = state.progress[sceneId];
  if (!tasks) return;
  const complete = Object.values(tasks).every(Boolean);
  if (complete) {
    state.visited.add(sceneId);
    const button = choiceButtons[sceneId];
    if (button) {
      const base = button.dataset.label || button.textContent.replace('· Completed', '').trim();
      button.textContent = `${base} · Completed`;
      button.classList.add('completed');
    }
    if (state.visited.size === 3) {
      neighborSection.classList.remove('hidden');
      renderNeighborChallenge();
    }
  }
}

function buildCornerStore() {
  const scene = document.createElement('div');
  scene.className = 'scene';

  const intro = document.createElement('section');
  intro.innerHTML = `
    <h3>🛒 Corner Store</h3>
    <p>The bell on the door squeaks. The shop owner is wrestling with a cash register and a customer service hold line.</p>
    <p>Idiom spotlight: <strong>pay through the nose</strong> — paying far more than something is worth.</p>
    <p>The shop owner sighs into the phone: “I had to pay through the nose for these security cameras and they’re already broken! Yeah, I know... Well, call me back then! Bye.”</p>
  `;

  const idiomSection = document.createElement('section');
  idiomSection.innerHTML = `
    <h4>Idiom practice</h4>
    <div class="prompt">
      <label for="corner-idiom">Write one sentence using this idiom.</label>
      <textarea id="corner-idiom" placeholder="Example: I had to pay through the nose for rush shipping."></textarea>
      <button class="action" type="button">Check sentence</button>
      <div class="feedback-slot" aria-live="polite"></div>
    </div>
  `;

  const idiomTextarea = idiomSection.querySelector('textarea');
  idiomTextarea.value = state.responses.cornerIdiom;
  const idiomButton = idiomSection.querySelector('button');
  const idiomFeedback = idiomSection.querySelector('.feedback-slot');
  const idiomImageSlot = document.createElement('div');
  idiomImageSlot.className = 'image-slot';
  idiomSection.querySelector('.prompt').insertBefore(idiomImageSlot, idiomFeedback);

  idiomButton.addEventListener('click', () => {
    const text = idiomTextarea.value.trim();
    if (!text) {
      showFeedback(idiomFeedback, 'Take a breath and type a sentence before we celebrate.', 'hint');
      return;
    }
    if (/^image\b/i.test(text)) {
      showSceneImage('corner', idiomImageSlot);
      showFeedback(idiomFeedback, 'Visual acquired. Now craft the sentence.', 'hint');
      return;
    }
    if (!text.toLowerCase().includes('pay through the nose')) {
      showFeedback(idiomFeedback, 'The idiom is shy. Invite “pay through the nose” into the sentence.', 'bad');
      recordError('cornerIdiom', text, 'I had to pay through the nose for the last-minute plumber visit.');
      return;
    }
    state.responses.cornerIdiom = text;
    showFeedback(idiomFeedback, 'Receipt accepted. That idiom is doing its job.', 'good');
    idiomTextarea.disabled = true;
    idiomButton.disabled = true;
    markTask('corner', 'idiom', updateChecklist);
  });

  const vocabSection = document.createElement('section');
  vocabSection.innerHTML = `
    <h4>Vocabulary · inadvertent</h4>
    <p>Word forms: inadvertent (adj) · inadvertently (adv) · inadvertence (n)</p>
    <p>Quiz: Pick the sentence that uses the vocabulary word unnaturally or awkwardly.</p>
    <div class="quiz-options">
      <label><input type="radio" name="corner-quiz" value="a" /> a. She apologized for the inadvertent error in the report.</label>
      <label><input type="radio" name="corner-quiz" value="b" /> b. I made an inadvertent comment that offended him.</label>
      <label><input type="radio" name="corner-quiz" value="c" /> c. Her inadvertent success in the tech industry shocked everyone.</label>
      <label><input type="radio" name="corner-quiz" value="d" /> d. He inadvertently locked himself out of the house.</label>
    </div>
    <button class="action" type="button">Check quiz</button>
    <div class="feedback-slot" aria-live="polite"></div>
  `;

  const quizButton = vocabSection.querySelector('button');
  const quizFeedback = vocabSection.querySelector('.feedback-slot');
  const quizInputs = Array.from(vocabSection.querySelectorAll('input[name="corner-quiz"]'));

  quizButton.addEventListener('click', () => {
    const selected = quizInputs.find((input) => input.checked)?.value;
    if (!selected) {
      showFeedback(quizFeedback, 'Pick an option before the shop owner loses patience.', 'hint');
      return;
    }
    if (selected !== 'c') {
      showFeedback(quizFeedback, 'Close, but the awkward sentence still lurks. Try again.', 'bad');
      recordError('cornerQuiz', selected, 'Sentence c is the one that sounds off.');
      return;
    }
    showFeedback(quizFeedback, 'Correct. Success rarely happens “inadvertently” like that.', 'good');
    quizButton.disabled = true;
    quizInputs.forEach((input) => (input.disabled = true));
    markTask('corner', 'quiz', updateChecklist);
  });

  const adviceSection = document.createElement('section');
  adviceSection.innerHTML = `
    <h4>Shop owner check-in</h4>
    <p>The owner bangs the register drawer shut and mutters, “Hey...I just get so worked up. What could I do to stay calm throughout the day?”</p>
    <div class="prompt">
      <label for="corner-advice">Give the shop owner a bit of advice. Use either the idiom, the vocabulary word, or both.</label>
      <textarea id="corner-advice" placeholder="Maybe remind him to take inadvertent stress breaks?"></textarea>
      <button class="action" type="button">Share advice</button>
      <div class="feedback-slot" aria-live="polite"></div>
    </div>
  `;

  const adviceTextarea = adviceSection.querySelector('textarea');
  adviceTextarea.value = state.responses.cornerAdvice;
  const adviceButton = adviceSection.querySelector('button');
  const adviceFeedback = adviceSection.querySelector('.feedback-slot');
  const adviceImageSlot = document.createElement('div');
  adviceImageSlot.className = 'image-slot';
  adviceSection.querySelector('.prompt').insertBefore(adviceImageSlot, adviceFeedback);

  adviceButton.addEventListener('click', () => {
    const text = adviceTextarea.value.trim();
    if (!text) {
      showFeedback(adviceFeedback, 'He is tapping his foot. Offer something.', 'hint');
      return;
    }
    if (/^image\b/i.test(text)) {
      showSceneImage('corner', adviceImageSlot);
      showFeedback(adviceFeedback, 'Neon reference delivered. Now answer him.', 'hint');
      return;
    }
    if (!/(pay through the nose|inadvertent|inadvertently|inadvertence)/i.test(text)) {
      showFeedback(adviceFeedback, 'Sneak the idiom or the new word into your advice.', 'bad');
      recordError('cornerAdvice', text, 'Try: Take breaks so stress doesn’t make you pay through the nose for mistakes.');
      return;
    }
    state.responses.cornerAdvice = text;
    showFeedback(adviceFeedback, 'He nods, slightly calmer already.', 'good');
    adviceTextarea.disabled = true;
    adviceButton.disabled = true;
    markTask('corner', 'advice', updateChecklist);
  });

  const { section: checklistSection, update: updateChecklist } = makeChecklist('corner', [
    { id: 'idiom', label: 'Idiom sentence submitted' },
    { id: 'quiz', label: 'Vocabulary quiz solved' },
    { id: 'advice', label: 'Advice delivered with new language' }
  ]);

  // reflect existing state
  if (state.progress.corner.idiom) {
    idiomTextarea.disabled = true;
    idiomButton.disabled = true;
    showFeedback(idiomFeedback, 'Receipt already stamped.', 'good');
  }
  if (state.progress.corner.quiz) {
    quizButton.disabled = true;
    quizInputs.forEach((input) => {
      if (input.value === 'c') input.checked = true;
      input.disabled = true;
    });
    showFeedback(quizFeedback, 'Quiz already conquered.', 'good');
  }
  if (state.progress.corner.advice) {
    adviceTextarea.disabled = true;
    adviceButton.disabled = true;
    showFeedback(adviceFeedback, 'Advice already logged.', 'good');
  }

  scene.append(intro, idiomSection, vocabSection, adviceSection, checklistSection);
  return scene;
}

function buildStreetMural() {
  const scene = document.createElement('div');
  scene.className = 'scene';

  const intro = document.createElement('section');
  intro.innerHTML = `
    <h3>🎨 Street Mural</h3>
    <p>The artist wipes paint from her hands. “Stepping back from her masterpiece, the artist notices that she has started talking about herself in the third person.”</p>
    <p>That opening is a participle clause. Use a present participle (verb + -ing) or a past participle to add info without a new sentence.</p>
  `;

  const challengeOne = document.createElement('section');
  challengeOne.innerHTML = `
    <h4>Challenge 1 · Favorite clause</h4>
    <p>Pick your favorite example:</p>
    <div class="quiz-options">
      <label><input type="radio" name="mural-favorite" value="1" /> 1 - Running late for the meeting, Marcus dashed across the plaza without his usual coffee stop.</label>
      <label><input type="radio" name="mural-favorite" value="2" /> 2 - Built in the 1800s, the theater in Charleston still hosts weekly jazz performances.</label>
      <label><input type="radio" name="mural-favorite" value="3" /> 3 - Walking along the riverbank, Naomi spotted a small turtle sunbathing on a log.</label>
      <label><input type="radio" name="mural-favorite" value="4" /> 4 - Forgotten by most locals, the old train tunnel behind Ridgeway Park became a hangout for urban explorers.</label>
      <label><input type="radio" name="mural-favorite" value="5" /> 5 - Shivering in the cold rain, Luca waited patiently outside the record store for the new release.</label>
    </div>
    <button class="action" type="button">Lock choice</button>
    <div class="feedback-slot" aria-live="polite"></div>
  `;

  const favoriteInputs = Array.from(challengeOne.querySelectorAll('input[name="mural-favorite"]'));
  const favoriteButton = challengeOne.querySelector('button');
  const favoriteFeedback = challengeOne.querySelector('.feedback-slot');

  favoriteButton.addEventListener('click', () => {
    const selected = favoriteInputs.find((input) => input.checked)?.value;
    if (!selected) {
      showFeedback(favoriteFeedback, 'Pick something before the paint dries.', 'hint');
      return;
    }
    state.responses.muralFavorite = selected;
    showFeedback(favoriteFeedback, 'Choice locked. The artist pretends not to judge.', 'good');
    favoriteInputs.forEach((input) => (input.disabled = true));
    favoriteButton.disabled = true;
    markTask('mural', 'favorite', updateChecklist);
  });

  const challengeTwo = document.createElement('section');
  challengeTwo.innerHTML = `
    <h4>Challenge 2 · Your turn</h4>
    <div class="prompt">
      <label for="mural-clause">Write one sentence using a participle clause.</label>
      <textarea id="mural-clause" placeholder="Example: Balancing on the ladder, she added the final splash of teal."></textarea>
      <button class="action" type="button">Check sentence</button>
      <div class="feedback-slot" aria-live="polite"></div>
    </div>
  `;

  const clauseTextarea = challengeTwo.querySelector('textarea');
  clauseTextarea.value = state.responses.muralClause;
  const clauseButton = challengeTwo.querySelector('button');
  const clauseFeedback = challengeTwo.querySelector('.feedback-slot');
  const clauseImageSlot = document.createElement('div');
  clauseImageSlot.className = 'image-slot';
  challengeTwo.querySelector('.prompt').insertBefore(clauseImageSlot, clauseFeedback);

  clauseButton.addEventListener('click', () => {
    const text = clauseTextarea.value.trim();
    if (!text) {
      showFeedback(clauseFeedback, 'Paint words onto the canvas first.', 'hint');
      return;
    }
    if (/^image\b/i.test(text)) {
      showSceneImage('mural', clauseImageSlot);
      showFeedback(clauseFeedback, 'Reference image delivered. Now write your clause.', 'hint');
      return;
    }
    if (!isValidParticipleClause(text)) {
      showFeedback(clauseFeedback, 'Add a participle clause with a comma, like “Running late, ...”', 'bad');
      recordError('muralClause', text, 'Balancing her sketchbook, she mapped out the next mural panel.');
      return;
    }
    state.responses.muralClause = text;
    showFeedback(clauseFeedback, 'Looks good. The clause flows like fresh paint.', 'good');
    clauseTextarea.disabled = true;
    clauseButton.disabled = true;
    markTask('mural', 'clause', updateChecklist);
  });

  const muralInteraction = document.createElement('section');
  muralInteraction.innerHTML = `
    <h4>Artist request</h4>
    <p>The artist squints at the wall: “They say you lose perspective when you’re too close to something. Could you give me an idea for how I could make this mural more interesting?”</p>
    <div class="prompt">
      <label for="mural-idea">Offer a suggestion using the new grammar.</label>
      <textarea id="mural-idea" placeholder="Example: Stepping back from the wall, you could add a subtle skyline silhouette."></textarea>
      <button class="action" type="button">Share idea</button>
      <div class="feedback-slot" aria-live="polite"></div>
    </div>
  `;

  const ideaTextarea = muralInteraction.querySelector('textarea');
  ideaTextarea.value = state.responses.muralSuggestion;
  const ideaButton = muralInteraction.querySelector('button');
  const ideaFeedback = muralInteraction.querySelector('.feedback-slot');
  const ideaImageSlot = document.createElement('div');
  ideaImageSlot.className = 'image-slot';
  muralInteraction.querySelector('.prompt').insertBefore(ideaImageSlot, ideaFeedback);

  ideaButton.addEventListener('click', () => {
    const text = ideaTextarea.value.trim();
    if (!text) {
      showFeedback(ideaFeedback, 'The wall is silent. Say something.', 'hint');
      return;
    }
    if (/^image\b/i.test(text)) {
      showSceneImage('mural', ideaImageSlot);
      showFeedback(ideaFeedback, 'Snapshot delivered. Now give the artist advice.', 'hint');
      return;
    }
    if (!isValidParticipleClause(text)) {
      showFeedback(ideaFeedback, 'Work a participle clause into your advice.', 'bad');
      recordError('muralIdea', text, 'Layering glowing outlines, you could make the mural pop at night.');
      return;
    }
    state.responses.muralSuggestion = text;
    showFeedback(ideaFeedback, 'The artist grins and keeps painting.', 'good');
    ideaTextarea.disabled = true;
    ideaButton.disabled = true;
    markTask('mural', 'suggestion', updateChecklist);
  });

  const { section: checklistSection, update: updateChecklist } = makeChecklist('mural', [
    { id: 'favorite', label: 'Favorite example picked' },
    { id: 'clause', label: 'Participle clause written' },
    { id: 'suggestion', label: 'Advice shared with participle clause' }
  ]);

  if (state.progress.mural.favorite) {
    favoriteInputs.forEach((input) => {
      if (input.value === state.responses.muralFavorite) {
        input.checked = true;
      }
      input.disabled = true;
    });
    favoriteButton.disabled = true;
    showFeedback(favoriteFeedback, 'Choice already locked.', 'good');
  }

  if (state.progress.mural.clause) {
    clauseTextarea.disabled = true;
    clauseButton.disabled = true;
    showFeedback(clauseFeedback, 'Sentence already stamped.', 'good');
  }

  if (state.progress.mural.suggestion) {
    ideaTextarea.disabled = true;
    ideaButton.disabled = true;
    showFeedback(ideaFeedback, 'Idea already on the wall.', 'good');
  }

  scene.append(intro, challengeOne, challengeTwo, muralInteraction, checklistSection);
  return scene;
}

function buildCommunityGarden() {
  const scene = document.createElement('div');
  scene.className = 'scene';

  const intro = document.createElement('section');
  intro.innerHTML = `
    <h3>🌱 Community Garden</h3>
    <p>A gardener waves. “Even though the soil is dry, these herbs thrive. I could also say: These herbs thrive even though the soil is dry.”</p>
    <p>Use “even though” to connect contrasting ideas. If the sentence starts with “even though,” add a comma.</p>
  `;

  const challengeOne = document.createElement('section');
  challengeOne.innerHTML = `
    <h4>Challenge 1 · Your sentence</h4>
    <div class="prompt">
      <label for="garden-sentence">Write one sentence using “even though.”</label>
      <textarea id="garden-sentence" placeholder="Example: Even though the sun was harsh, the volunteers kept watering the seedlings."></textarea>
      <button class="action" type="button">Check sentence</button>
      <div class="feedback-slot" aria-live="polite"></div>
    </div>
  `;

  const sentenceTextarea = challengeOne.querySelector('textarea');
  sentenceTextarea.value = state.responses.gardenSentence;
  const sentenceButton = challengeOne.querySelector('button');
  const sentenceFeedback = challengeOne.querySelector('.feedback-slot');
  const sentenceImageSlot = document.createElement('div');
  sentenceImageSlot.className = 'image-slot';
  challengeOne.querySelector('.prompt').insertBefore(sentenceImageSlot, sentenceFeedback);

  sentenceButton.addEventListener('click', () => {
    const text = sentenceTextarea.value.trim();
    if (!text) {
      showFeedback(sentenceFeedback, 'The basil waits for your sentence.', 'hint');
      return;
    }
    if (/^image\b/i.test(text)) {
      showSceneImage('garden', sentenceImageSlot);
      showFeedback(sentenceFeedback, 'Garden view supplied. Now write your sentence.', 'hint');
      return;
    }
    if (!/even though/i.test(text)) {
      showFeedback(sentenceFeedback, 'Slip “even though” into the sentence.', 'bad');
      recordError('gardenSentence', text, 'Even though the benches were damp, everyone stayed for the workshop.');
      return;
    }
    if (/^even though/i.test(text.toLowerCase()) && !/,/.test(text.split(/even though/i)[1] || '')) {
      showFeedback(sentenceFeedback, 'Add a comma after the clause that starts with “even though.”', 'bad');
      recordError('gardenSentenceComma', text, 'Even though the benches were damp, everyone stayed for the workshop.');
      return;
    }
    state.responses.gardenSentence = text;
    showFeedback(sentenceFeedback, 'Nice contrast. The herbs approve.', 'good');
    sentenceTextarea.disabled = true;
    sentenceButton.disabled = true;
    markTask('garden', 'sentence', updateChecklist);
  });

  const challengeTwo = document.createElement('section');
  challengeTwo.innerHTML = `
    <h4>Challenge 2 · Fix it</h4>
    <p>Fix this sentence so it makes sense: “We decided to turn the AC on, even though we were really hot.”</p>
    <div class="prompt">
      <label for="garden-fix">Rewrite the sentence.</label>
      <textarea id="garden-fix" placeholder="Maybe change the contrast so it fits."></textarea>
      <button class="action" type="button">Check fix</button>
      <div class="feedback-slot" aria-live="polite"></div>
    </div>
  `;

  const fixTextarea = challengeTwo.querySelector('textarea');
  fixTextarea.value = state.responses.gardenFix;
  const fixButton = challengeTwo.querySelector('button');
  const fixFeedback = challengeTwo.querySelector('.feedback-slot');
  const fixImageSlot = document.createElement('div');
  fixImageSlot.className = 'image-slot';
  challengeTwo.querySelector('.prompt').insertBefore(fixImageSlot, fixFeedback);
  const incorrectSentence = 'we decided to turn the ac on, even though we were really hot.';

  fixButton.addEventListener('click', () => {
    const text = fixTextarea.value.trim();
    if (!text) {
      showFeedback(fixFeedback, 'Try a revision before we call it done.', 'hint');
      return;
    }
    if (/^image\b/i.test(text)) {
      showSceneImage('garden', fixImageSlot);
      showFeedback(fixFeedback, 'Garden ref delivered. Now tackle the sentence.', 'hint');
      return;
    }
    if (text.toLowerCase().replace(/\s+/g, ' ') === incorrectSentence) {
      showFeedback(fixFeedback, 'Adjust the contrast so the sentence actually contrasts.', 'bad');
      recordError('gardenFix', text, 'We decided to turn the AC on, even though the night air was already cool.');
      return;
    }
    if (!/even though/i.test(text)) {
      showFeedback(fixFeedback, 'Keep “even though” in the improved sentence.', 'bad');
      recordError('gardenFixPhrase', text, 'We left the AC off, even though the afternoon was muggy.');
      return;
    }
    state.responses.gardenFix = text;
    showFeedback(fixFeedback, 'Contrast repaired. The gardener approves.', 'good');
    fixTextarea.disabled = true;
    fixButton.disabled = true;
    markTask('garden', 'fix', updateChecklist);
  });

  const gardenInteraction = document.createElement('section');
  gardenInteraction.innerHTML = `
    <h4>Volunteer boost</h4>
    <p>The gardener asks, “Any ideas to get more people to help out here?”</p>
    <div class="prompt">
      <label for="garden-idea">Recommend a practical tip. Try to use “even though” somewhere in your answer.</label>
      <textarea id="garden-idea" placeholder="Example: Even though weekends are busy, offer short volunteer shifts with iced tea."></textarea>
      <button class="action" type="button">Share tip</button>
      <div class="feedback-slot" aria-live="polite"></div>
    </div>
  `;

  const ideaTextarea = gardenInteraction.querySelector('textarea');
  ideaTextarea.value = state.responses.gardenIdea;
  const ideaButton = gardenInteraction.querySelector('button');
  const ideaFeedback = gardenInteraction.querySelector('.feedback-slot');
  const gardenIdeaImageSlot = document.createElement('div');
  gardenIdeaImageSlot.className = 'image-slot';
  gardenInteraction.querySelector('.prompt').insertBefore(gardenIdeaImageSlot, ideaFeedback);

  ideaButton.addEventListener('click', () => {
    const text = ideaTextarea.value.trim();
    if (!text) {
      showFeedback(ideaFeedback, 'The gardener tilts their head. Say something helpful.', 'hint');
      return;
    }
    if (/^image\b/i.test(text)) {
      showSceneImage('garden', gardenIdeaImageSlot);
      showFeedback(ideaFeedback, 'Garden scene ready. Now give your tip.', 'hint');
      return;
    }
    if (!/even though/i.test(text)) {
      showFeedback(ideaFeedback, 'Work “even though” into your advice.', 'bad');
      recordError('gardenIdea', text, 'Even though people are busy, offer evening mini-workshops with snacks.');
      return;
    }
    state.responses.gardenIdea = text;
    showFeedback(ideaFeedback, 'Solid plan. Expect more green thumbs soon.', 'good');
    ideaTextarea.disabled = true;
    ideaButton.disabled = true;
    markTask('garden', 'idea', updateChecklist);
  });

  const { section: checklistSection, update: updateChecklist } = makeChecklist('garden', [
    { id: 'sentence', label: '“Even though” sentence written' },
    { id: 'fix', label: 'Contrast sentence fixed' },
    { id: 'idea', label: 'Volunteer tip shared with pattern' }
  ]);

  if (state.progress.garden.sentence) {
    sentenceTextarea.disabled = true;
    sentenceButton.disabled = true;
    showFeedback(sentenceFeedback, 'Sentence already planted.', 'good');
  }
  if (state.progress.garden.fix) {
    fixTextarea.disabled = true;
    fixButton.disabled = true;
    showFeedback(fixFeedback, 'Fix already flourishing.', 'good');
  }
  if (state.progress.garden.idea) {
    ideaTextarea.disabled = true;
    ideaButton.disabled = true;
    showFeedback(ideaFeedback, 'Tip already spreading.', 'good');
  }

  scene.append(intro, challengeOne, challengeTwo, gardenInteraction, checklistSection);
  return scene;
}

function renderNeighborChallenge() {
  neighborContent.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'scene';

  const intro = document.createElement('section');
  intro.innerHTML = `
    <h3>Neighbor Challenge · Albert Awaits</h3>
    <p>“Hey, neighbor. I heard you just moved in. I'm Albert, your neighbor form next door. Some people say I am a bit overbearing, but I disagree! Listen, before I let you go, tell me what happened out there! I don't get out much. Who did you meet? What the heck did you talk about? Learn anything?”</p>
  `;

  const requirements = document.createElement('section');
  requirements.innerHTML = `
    <h4>Final challenge requirements</h4>
    <ul>
      <li>Reply with <strong>100+ words</strong>.</li>
      <li>Use at least two learned items (idiom, vocab, participle clause, even though).</li>
      <li>Reference <strong>all three</strong> interactions: shop owner, artist, gardener.</li>
    </ul>
    <p class="mono">Need a refresher? Type <code>image</code> in your response if you want a pixel snapshot of the current scene.</p>
  `;

  const prompt = document.createElement('section');
  prompt.innerHTML = `
    <h4>Your turn</h4>
    <div class="prompt">
      <label for="neighbor-response">Share everything with Albert.</label>
      <textarea id="neighbor-response" placeholder="Summarize your day with the new language loot."></textarea>
      <button class="action" type="button">Submit report</button>
      <div class="feedback-slot" aria-live="polite"></div>
    </div>
    <small class="note">Need help? Submit an empty response to get a hint.</small>
  `;

  const textarea = prompt.querySelector('textarea');
  textarea.value = state.responses.neighborFinal;
  const button = prompt.querySelector('button');
  const feedback = prompt.querySelector('.feedback-slot');
  const neighborImageSlot = document.createElement('div');
  neighborImageSlot.className = 'image-slot';
  prompt.querySelector('.prompt').insertBefore(neighborImageSlot, feedback);

  button.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) {
      showFeedback(
        feedback,
        'Albert taps his foot. Mention the people you met, toss in the new language, and shoot for 100+ words.',
        'hint'
      );
      return;
    }
    if (/^image\b/i.test(text)) {
      showSceneImage('neighbor', neighborImageSlot);
      showFeedback(feedback, 'Hallway view delivered. Now give Albert the scoop.', 'hint');
      return;
    }
    const result = evaluateNeighborResponse(text);
    if (!result.ok) {
      showFeedback(feedback, result.message, result.type);
      if (result.logKey) {
        recordError(result.logKey, text, result.suggestion);
      }
      return;
    }
    state.responses.neighborFinal = text;
    showFeedback(feedback, 'Albert smiles. Challenge complete.', 'good');
    textarea.disabled = true;
    button.disabled = true;
    state.progress.neighbor.report = true;
    renderWrapUp();
  });

  wrapper.append(intro, requirements, prompt);
  neighborContent.append(wrapper);
}

function renderWrapUp() {
  wrapSection.classList.remove('hidden');

  wrapSummary.innerHTML = `
    <h3>You glance down at your notebook:</h3>
    <ul>
      <li>1 - Pay through the nose (idiom)</li>
      <li>2 - Inadvertent (vocab)</li>
      <li>3 - “Stepping back, the artist...” (present and past participles)</li>
      <li>4 - “Even though...” (pattern)</li>
    </ul>
    <p>It's been a long day. Ready to head home?</p>
  `;

  const scores = calculateScores();
  const strengths = buildStrengthsList();
  const tips = buildImprovementTips();
  const errorNotes = buildErrorNotes();

  reportArea.innerHTML = `
    <div class="report-section">
      <h3>Day 1 Report</h3>
      <p>Congratulations on wrapping up Day 1.</p>
      <p>Integration: ${scores.integration}/10 points · Creativity: ${scores.creativity}/10 points</p>
      <p class="mono">Verdict: ${scores.verdict}</p>
    </div>
    <div class="report-section">
      <h4>Strengths</h4>
      <ul>${strengths.map((item) => `<li>${item}</li>`).join('')}</ul>
    </div>
    <div class="report-section">
      <h4>Improvement tips</h4>
      <ul>${tips.map((item) => `<li>${item}</li>`).join('')}</ul>
    </div>
    <div class="report-section">
      <h4>Language notes</h4>
      ${errorNotes}
    </div>
  `;
}

function calculateScores() {
  const integration = 8 + (state.errorLog.length === 0 ? 1 : 0);
  const creativity = 7 + (state.responses.neighborFinal.length > 320 ? 2 : 0);
  const verdict = integration + creativity > 17 ? 'Smooth first day. Keep exploring.' : 'Solid start. Polish the new moves tomorrow.';
  return { integration, creativity, verdict };
}

function buildStrengthsList() {
  const list = [];
  list.push('You completed every interaction and kept Albert in the loop.');
  if (/pay through the nose/i.test(state.responses.neighborFinal)) {
    list.push('The idiom “pay through the nose” showed up naturally in your recap.');
  }
  if (/even though/i.test(state.responses.neighborFinal)) {
    list.push('You contrasted ideas with “even though” without flinching.');
  }
  if (isValidParticipleClause(state.responses.neighborFinal)) {
    list.push('You slipped participle clauses into longer stretches of writing.');
  } else {
    list.push('You kept sentences focused even while juggling new grammar.');
  }
  return list;
}

function buildImprovementTips() {
  const tips = [
    'Keep reviewing the nuance of “inadvertent” so it stays precise in different contexts.',
    'Experiment with more participle clause openings to vary your sentence rhythm.',
    'When you lead with “Even though...”, double-check the comma placement to keep the contrast tidy.'
  ];
  if (state.responses.neighborFinal.split(/\s+/).length < 140) {
    tips.push('Stretch your recaps to add richer detail about each interaction.');
  } else {
    tips.push('Consider trimming filler so the most vivid moments stay in focus.');
  }
  return tips;
}

function buildErrorNotes() {
  if (state.errorLog.length === 0) {
    return '<p>No awkward phrasing flagged this round. Keep experimenting.</p>';
  }
  const items = state.errorLog
    .map((entry) => `<li>You said “${sanitize(entry.original)}”. Instead, you could say, “${sanitize(entry.suggestion)}”.</li>`)
    .join('');
  return `<ul>${items}</ul>`;
}

function showSceneImage(sceneId, slot) {
  const info = sceneImages[sceneId];
  if (!info) return;
  slot.innerHTML = `
    <figure class="pixel-art">
      ${info.svg}
      <figcaption>${info.caption}</figcaption>
    </figure>
  `;
}

function showFeedback(slot, message, type) {
  slot.innerHTML = '';
  const div = document.createElement('div');
  div.className = `feedback ${type}`;
  div.textContent = message;
  slot.append(div);
}

function recordError(key, original, suggestion) {
  if (!original || state.promptErrors[key]) return;
  state.promptErrors[key] = true;
  state.errorLog.push({ original, suggestion });
}

function isValidParticipleClause(text) {
  const lower = text.toLowerCase();
  if (!lower.includes(',')) return false;
  const presentPattern = /([a-z]+ing)\s*,/i;
  const pastPattern = /([a-z]+ed)\s*,/i;
  const beingPattern = /(being|having been)\s+[a-z]+/i;
  return presentPattern.test(text) || pastPattern.test(text) || beingPattern.test(text);
}

function evaluateNeighborResponse(text) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 100) {
    return {
      ok: false,
      message: `You’re at ${words.length} words. Albert demands at least 100.`,
      type: 'bad',
      logKey: 'neighborLength',
      suggestion: 'Expand on each interaction so your recap crosses the 100-word mark.'
    };
  }

  const learnedItems = [
    /pay through the nose/i,
    /inadvertent/i,
    /inadvertently/i,
    /inadvertence/i,
    /even though/i,
    /stepping back/i
  ];
  let count = 0;
  learnedItems.forEach((pattern) => {
    if (pattern.test(text)) count += 1;
  });
  if (count < 2) {
    return {
      ok: false,
      message: 'Work at least two of the new language items into your report.',
      type: 'bad',
      logKey: 'neighborItems',
      suggestion: 'Mention the idiom, the vocabulary word, or “even though” explicitly in your recap.'
    };
  }

  const scenesCovered = [
    /(shop|store|owner)/i,
    /(mural|artist)/i,
    /(garden|gardener)/i
  ];
  const missing = scenesCovered.filter((pattern) => !pattern.test(text));
  if (missing.length > 0) {
    return {
      ok: false,
      message: 'Reference the shop owner, the artist, and the gardener in some way.',
      type: 'bad',
      logKey: 'neighborScenes',
      suggestion: 'Name-drop each person you met so Albert gets the full story.'
    };
  }

  return { ok: true };
}

function sanitize(value) {
  return value.replace(/[“”]/g, '"').replace(/[<>]/g, '');
}

// Default view: show introduction text without loading a scene.

