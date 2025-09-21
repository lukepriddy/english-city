const LOCATION_IDS = ['corner-store', 'street-mural', 'community-garden'];
const PROGRESS_MILESTONES = [
  'overview',
  ...LOCATION_IDS,
  'neighbor-challenge',
  'wrap-up'
];

const SCREEN_DATA = {
  overview: {
    type: 'info',
    title: 'Day 1 Overview',
    focus: 'Structure & tone',
    description: `
      <p>You are English City, an interactive English-learning game. Guide the player through Level 1 with grounded, dry humor. Their choices shape the experience.</p>
      <div class="info-block">
        <h3>Phases</h3>
        <p>Neighborhood Exploration followed by Neighbor Challenge.</p>
      </div>
      <div class="info-block">
        <h3>Exploration focus</h3>
        <ol>
          <li>🛒 Corner Store · idiom + vocabulary</li>
          <li>🎨 Street Mural · grammar (participle clauses)</li>
          <li>🌱 Community Garden · sentence pattern (“even though”)</li>
        </ol>
      </div>
      <ul class="info-list">
        <li>Keep copy concise, dry, and playful. Prompt interaction often.</li>
        <li>Each scene displays the static art you uploaded (modern pixel art with Game Boy Advance-era charm).</li>
        <li>If anyone asks for Day 2, reply with <q>Day 2 is not available yet.</q></li>
      </ul>
    `,
    chat: {
      tagline: 'Say hello to your newest resident.',
      intro:
        'Welcome! I’m your guide for Day 1. Skim the structure, then tap Next to head outside.'
    }
  },
  'exploration-map': {
    type: 'map',
    title: 'Neighborhood Exploration',
    focus: 'Choose your route',
    description: `
      <p><em>“You’ve just moved to a new city. Your apartment: half-unpacked boxes, Ikea furniture, and neighbors playing music a bit too loud. But the city is alive outside, and calling for exploration!”</em></p>
      <p>Pick where to go first. You control the order of the three stops. Visit all of them before meeting your neighbor.</p>
    `,
    mapOptions: [
      {
        id: 'corner-store',
        title: 'Corner Store',
        subtitle: 'Idiom + vocabulary',
        summary: 'Help the anxious shop owner calm down and use “pay through the nose.”'
      },
      {
        id: 'street-mural',
        title: 'Street Mural',
        subtitle: 'Grammar · participle clauses',
        summary:
          'Talk grammar with the muralist and craft sentences using present or past participles.'
      },
      {
        id: 'community-garden',
        title: 'Community Garden',
        subtitle: 'Sentence pattern · “even though”',
        summary: 'Practice contrast sentences and help the gardener recruit volunteers.'
      }
    ],
    chat: {
      tagline: 'Check in before you roam.',
      intro:
        'All right, explorer. Tap a location card when you’re ready, and I’ll keep track of what you’ve finished.'
    }
  },
  'corner-store': {
    type: 'scene',
    title: '🛒 Corner Store',
    focus: 'Idiom + vocabulary',
    hero: {
      src: 'images/corner-store-person-1.png',
      alt: 'Corner store owner behind the counter'
    },
    gallery: [
      {
        src: 'images/corner-store-person-1.png',
        alt: 'Corner store owner behind the counter',
        caption: 'Owner · intro pose'
      },
      {
        src: 'images/corner-store-person-2.png',
        alt: 'Owner examining broken security camera',
        caption: 'Owner · mid-call'
      },
      {
        src: 'images/corner-store-person-3.png',
        alt: 'Owner trying to relax',
        caption: 'Owner · calming down'
      }
    ],
    description: `
      <p>The shop owner slams the cash register drawer. <q>I had to pay through the nose for these security cameras and they’re already broken! Yeah, I know... Well, call me back then! Bye.</q></p>
      <p>Help them lock in today’s idiom and vocabulary.</p>
    `,
    tasks: [
      {
        id: 'idiom-sentence',
        type: 'text',
        title: 'Idiom practice',
        prompt: 'Write one sentence using “pay through the nose.”',
        placeholder: 'Type your sentence…',
        validator: (value) => {
          const usesIdiom = /pay through the nose/i.test(value);
          return {
            passed: usesIdiom,
            success: 'Nice. That idiom stings the wallet exactly as intended.',
            failure: 'Work “pay through the nose” into a natural sentence before moving on.'
          };
        }
      },
      {
        id: 'vocab-reference',
        type: 'info',
        title: 'Vocabulary spotlight',
        body: `
          <p><strong>Inadvertent</strong></p>
          <ul>
            <li>inadvertent (adj)</li>
            <li>inadvertently (adv)</li>
            <li>inadvertence (n)</li>
          </ul>
        `
      },
      {
        id: 'vocab-quiz',
        type: 'multiple-choice',
        title: 'Quiz time',
        question: 'Pick the sentence that uses “inadvertent” unnaturally or awkwardly.',
        options: [
          'She apologized for the inadvertent error in the report.',
          'I made an inadvertent comment that offended him.',
          'Her inadvertent success in the tech industry shocked everyone.',
          'He inadvertently locked himself out of the house.'
        ],
        correctIndex: 2,
        success: 'Yep. Success usually isn’t accidental like that.',
        failure: 'Try again. Only one option sounds off.'
      },
      {
        id: 'owner-advice',
        type: 'text',
        title: 'Calming advice',
        prompt:
          'Give the shop owner advice for staying calm. Try to use either the idiom or the new word.',
        placeholder: 'Suggest something helpful…',
        validator: (value) => {
          const lower = value.toLowerCase();
          const usesLanguage =
            /pay through the nose/.test(lower) ||
            /inadvertent|inadvertently|inadvertence/.test(lower);
          return {
            passed: usesLanguage,
            success: 'That advice fits the mood. The owner nods appreciatively.',
            failure: 'Mention the idiom or one form of “inadvertent” in your tip.'
          };
        }
      }
    ],
    chat: {
      tagline: 'Corner Store comms',
      intro:
        'Owner: “What could I do to stay calm throughout the day?” Use the idiom or vocabulary when you answer.',
      responder: (message) => {
        const lower = message.toLowerCase();
        if (/pay through the nose/.test(lower) && /inadvert/.test(lower)) {
          return 'Double bonus: idiom and vocab in one go. You might be the calm whisperer they need.';
        }
        if (/pay through the nose/.test(lower)) {
          return 'Good use of the idiom. Maybe the budget will finally behave.';
        }
        if (/inadvert/.test(lower)) {
          return 'Nice drop of the vocab. Intentional calm beats inadvertent chaos.';
        }
        return 'Try weaving in today’s language targets so the owner knows you were listening.';
      }
    }
  },
  'street-mural': {
    type: 'scene',
    title: '🎨 Street Mural',
    focus: 'Grammar · participle clauses',
    hero: {
      src: 'images/street-mural-person-1.png',
      alt: 'Mural artist surveying the wall'
    },
    gallery: [
      {
        src: 'images/street-mural-person-1.png',
        alt: 'Mural artist surveying the wall',
        caption: 'Artist · wide shot'
      },
      {
        src: 'images/street-mural-person-2.png',
        alt: 'Artist sketching mural details',
        caption: 'Artist · sketching'
      },
      {
        src: 'images/street-mural-person-3.png',
        alt: 'Artist smiling with paint-covered hands',
        caption: 'Artist · close-up'
      }
    ],
    description: `
      <p>The artist laughs, <q>Stepping back from her masterpiece, the artist notices she has started talking about herself in the third person.</q> That sentence uses a participle clause.</p>
      <p>Use a present participle (verb + -ing) or a past participle to add info without a new sentence.</p>
    `,
    tasks: [
      {
        id: 'example-choice',
        type: 'select',
        title: 'Challenge 1',
        prompt: 'Pick your favorite participle clause example.',
        options: [
          'Running late for the meeting, Marcus dashed across the plaza without his usual coffee stop.',
          'Built in the 1800s, the theater in Charleston still hosts weekly jazz performances.',
          'Walking along the riverbank, Naomi spotted a small turtle sunbathing on a log.',
          'Forgotten by most locals, the old train tunnel behind Ridgeway Park became a hangout for urban explorers.',
          'Shivering in the cold rain, Luca waited patiently outside the record store for the new release.'
        ],
        success: 'Solid pick. Participle clauses keep sentences compact and vivid.'
      },
      {
        id: 'participle-sentence',
        type: 'text',
        title: 'Challenge 2',
        prompt: 'Write one sentence using a participle clause.',
        placeholder: 'Try starting with a verb + -ing…',
        validator: (value) => {
          const hasComma = value.includes(',');
          const hasParticiple = /(ing\b|ed\b)/i.test(value);
          return {
            passed: hasComma && hasParticiple,
            success: 'Nice clause. The muralist nods approvingly.',
            failure: 'Use a participle (verb + -ing or past participle) and separate it with a comma.'
          };
        }
      },
      {
        id: 'mural-advice',
        type: 'text',
        title: 'Interaction',
        prompt:
          'Give the artist an idea for making the mural more interesting. Try to use a participle clause in your response.',
        placeholder: 'Example: “Adding glowing lights, the mural…”',
        validator: (value) => {
          const hasClause = /(,\s*\b\w+(ing|ed)\b)|(^\w+ing\b)/i.test(value);
          return {
            passed: hasClause,
            success: 'Great suggestion. Perspective restored.',
            failure: 'Work a participle clause into your idea before you head out.'
          };
        }
      }
    ],
    chat: {
      tagline: 'Mural channel',
      intro:
        'Artist: “They say you lose perspective when you’re too close. How should I make this mural more interesting?” Bonus points for a participle clause.',
      responder: (message) => {
        if (/(,\s*\b\w+(ing|ed)\b)|(^\w+ing\b)/i.test(message)) {
          return 'Perspective regained. That clause paints a clear picture.';
        }
        return 'I like the energy, but drop in a participle clause to stay on theme.';
      }
    }
  },
  'community-garden': {
    type: 'scene',
    title: '🌱 Community Garden',
    focus: 'Sentence pattern · “even though”',
    hero: {
      src: 'images/community-garden-person-1.png',
      alt: 'Gardener checking herb beds'
    },
    gallery: [
      {
        src: 'images/community-garden-person-1.png',
        alt: 'Gardener checking herb beds',
        caption: 'Gardener · overview'
      },
      {
        src: 'images/community-garden-person-2.png',
        alt: 'Gardener watering plants',
        caption: 'Gardener · watering'
      },
      {
        src: 'images/community-garden-person-3.png',
        alt: 'Gardener greeting volunteers',
        caption: 'Gardener · greeting'
      }
    ],
    description: `
      <p>The gardener says, <q>Even though the soil is dry, these herbs thrive. I could also say: These herbs thrive even though the soil is dry.</q></p>
      <p>“Even though” connects two contrasting ideas. If the sentence starts with “even though,” add a comma.</p>
    `,
    tasks: [
      {
        id: 'even-though-sentence',
        type: 'text',
        title: 'Challenge 1',
        prompt: 'Write one sentence using “even though.”',
        placeholder: 'Example: “Even though…”',
        validator: (value) => {
          const hasPhrase = /even though/i.test(value);
          return {
            passed: hasPhrase,
            success: 'Contrast achieved. The herbs approve.',
            failure: 'Use the phrase “even though” exactly and try again.'
          };
        }
      },
      {
        id: 'fix-sentence',
        type: 'text',
        title: 'Challenge 2',
        prompt:
          'Fix this awkward sentence: “We decided to turn the AC on, even though we were really hot.”',
        placeholder: 'Rewrite it so the contrast makes sense…',
        validator: (value) => {
          const trimmed = value.trim();
          const original = 'We decided to turn the AC on, even though we were really hot.';
          const hasPhrase = /even though/i.test(trimmed);
          const isDifferent = trimmed.toLowerCase() !== original.toLowerCase();
          return {
            passed: hasPhrase && isDifferent,
            success: 'Much better. Now the sentence actually contrasts two ideas.',
            failure: 'Keep “even though,” but adjust the rest so it isn’t the original wording.'
          };
        }
      },
      {
        id: 'garden-advice',
        type: 'text',
        title: 'Interaction',
        prompt:
          'Share an idea (or two) for getting more volunteers. Use “even though” somewhere in your answer.',
        placeholder: 'Example: “Even though weekday mornings are quiet…”',
        validator: (value) => {
          const hasPhrase = /even though/i.test(value);
          return {
            passed: hasPhrase,
            success: 'Great pitch. The gardener scribbles notes enthusiastically.',
            failure: 'Use “even though” explicitly so the gardener hears the contrast.'
          };
        }
      }
    ],
    chat: {
      tagline: 'Garden messages',
      intro:
        'Gardener: “How do I convince more neighbors to volunteer?” Slip “even though” into your pitch.',
      responder: (message) => {
        if (/even though/i.test(message)) {
          return 'Love that contrast. Those herbs might just get extra company now.';
        }
        return 'Add “even though” so the gardener can hear the tension you spotted.';
      }
    }
  },
  'neighbor-challenge': {
    type: 'scene',
    title: 'Neighbor Challenge',
    focus: '100+ word recap',
    hero: {
      src: 'images/neighbor-person-1.png',
      alt: 'Neighbor Albert waving from the doorway'
    },
    gallery: [
      {
        src: 'images/neighbor-person-1.png',
        alt: 'Neighbor Albert waving from the doorway',
        caption: 'Albert · doorway'
      },
      {
        src: 'images/neighbor-person-2.png',
        alt: 'Albert leaning on the doorframe with a notepad',
        caption: 'Albert · inquisitive'
      },
      {
        src: 'images/neighbor-person-3.png',
        alt: 'Albert giving a thumbs-up',
        caption: 'Albert · approval'
      }
    ],
    description: `
      <p>Your neighbor, an English teacher named Albert, corners you in the hallway: <q>Hey, neighbor. I heard you just moved in. I’m Albert, your neighbor from next door. Some people say I’m a bit overbearing, but I disagree! Listen, before I let you go, tell me what happened out there! I don’t get out much. Who did you meet? What the heck did you talk about? Learn anything?</q></p>
      <p>Summarize your adventures with flair.</p>
    `,
    tasks: [
      {
        id: 'neighbor-recap',
        type: 'longform',
        title: 'Final challenge',
        prompt:
          'Reply with 100+ words, use at least two items learned today, and reference all three interactions.',
        placeholder: 'Tell Albert everything…',
        validator: (value) => {
          const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
          const lower = value.toLowerCase();
          const references = [
            /corner store/, /street mural/, /community garden/
          ];
          const languageTargets = [
            /pay through the nose/, /inadvertent/, /stepping back/, /even though/
          ];
          const hasAllRefs = references.every((pattern) => pattern.test(lower));
          const languageCount = languageTargets.filter((pattern) => pattern.test(lower)).length;
          return {
            passed: wordCount >= 100 && hasAllRefs && languageCount >= 2,
            success: 'Albert beams. That recap checks every box.',
            failure:
              'Make sure you hit 100+ words, mention each location, and weave in at least two language points.'
          };
        }
      }
    ],
    chat: {
      tagline: 'Hallway chat',
      intro:
        'Albert: “Spill it. I want every detail. Who did you meet and what did you learn?” Keep it 100+ words and mention the highlights.',
      responder: (message) => {
        const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 60) {
          return 'Albert squints. “Longer, please. I’m living vicariously through you.”';
        }
        if (/corner store/i.test(message) && /street mural/i.test(message) && /community garden/i.test(message)) {
          if ((/pay through the nose/i.test(message) ? 1 : 0) + (/inadvertent/i.test(message) ? 1 : 0) + (/stepping back/i.test(message) ? 1 : 0) + (/even though/i.test(message) ? 1 : 0) >= 2) {
            return 'Albert nods vigorously. “Perfect. I’ll jot that in my teacher log.”';
          }
          return 'Nice story. Drop at least two of today’s language targets to make Albert happy.';
        }
        return 'Albert taps his foot. “I’m hearing gaps. Mention all three stops for me.”';
      }
    }
  },
  'wrap-up': {
    type: 'wrap',
    title: 'Wrap-up',
    focus: 'Day 1 report',
    description: `
      <p>It’s been a long day. Ready to head home? Deliver a quick report, award points, and set improvement goals.</p>
      <div class="info-block">
        <h3>Notebook recap</h3>
        <ol>
          <li>Pay through the nose (idiom)</li>
          <li>Inadvertent (vocabulary)</li>
          <li>“Stepping back, the artist…” (present and past participles)</li>
          <li>“Even though…” (pattern)</li>
        </ol>
      </div>
    `,
    chat: {
      tagline: 'Final transmission',
      intro:
        'Nice work. Share feedback if you have any. Otherwise, soak in the Day 1 report below.'
    }
  }
};

const elements = {
  title: document.getElementById('screen-title'),
  focus: document.getElementById('focus-pill'),
  progressLabel: document.getElementById('progress-label'),
  progressFill: document.getElementById('progress-fill'),
  progressTrack: document.querySelector('.progress-track'),
  sceneMedia: document.getElementById('scene-media'),
  sceneText: document.getElementById('scene-text'),
  taskSection: document.getElementById('task-section'),
  chatTagline: document.getElementById('chat-tagline'),
  chatLog: document.getElementById('chat-log'),
  chatForm: document.getElementById('chat-form'),
  chatInput: document.getElementById('chat-input'),
  backButton: document.getElementById('back-button'),
  nextButton: document.getElementById('next-button')
};

const state = {
  currentScreen: 'overview',
  visitedOrder: [],
  completedScreens: new Set(),
  taskState: {},
  chatLogs: {},
  selectedGalleryImage: {},
  report: null
};

state.completedScreens.add('overview');

function getScreen(id) {
  return SCREEN_DATA[id];
}

function ensureTaskState(screenId) {
  if (!state.taskState[screenId]) {
    state.taskState[screenId] = {};
  }
  return state.taskState[screenId];
}

function ensureChatLog(screenId) {
  if (!state.chatLogs[screenId]) {
    state.chatLogs[screenId] = [];
  }
  return state.chatLogs[screenId];
}

function markTask(screenId, taskId, status, payload = {}) {
  const taskState = ensureTaskState(screenId);
  taskState[taskId] = {
    ...(taskState[taskId] || {}),
    status,
    ...payload
  };
}

function isTaskComplete(screenId, task) {
  if (task.type === 'info') return true;
  const taskState = ensureTaskState(screenId);
  return taskState[task.id]?.status === 'complete';
}

function allRequiredTasksComplete(screenId) {
  const screen = getScreen(screenId);
  if (!screen || !screen.tasks) return true;
  return screen.tasks
    .filter((task) => task.type !== 'info')
    .every((task) => isTaskComplete(screenId, task));
}

function getCompletedCount() {
  return PROGRESS_MILESTONES.filter((id) => state.completedScreens.has(id)).length;
}

function getStepNumber(screenId) {
  const total = PROGRESS_MILESTONES.length;
  if (screenId === 'overview') return 1;
  if (screenId === 'exploration-map') {
    const completedLocations = LOCATION_IDS.filter((id) => state.completedScreens.has(id)).length;
    return Math.min(2 + completedLocations, total);
  }
  if (LOCATION_IDS.includes(screenId)) {
    const completedBefore = LOCATION_IDS.filter((id) => id !== screenId && state.completedScreens.has(id)).length;
    return Math.min(2 + completedBefore, total);
  }
  if (screenId === 'neighbor-challenge') return Math.min(5, total);
  if (screenId === 'wrap-up') return total;
  const fallback = getCompletedCount() + 1;
  return Math.min(fallback, total);
}

function updateProgressLabel(currentId) {
  const total = PROGRESS_MILESTONES.length;
  const completed = getCompletedCount();
  const stepNumber = getStepNumber(currentId);
  elements.progressLabel.textContent = `Step ${stepNumber} of ${total}`;
  const progressPercent = Math.round((completed / total) * 100);
  elements.progressFill.style.width = `${progressPercent}%`;
  elements.progressTrack.setAttribute('aria-valuenow', String(progressPercent));
}

function renderSceneText(screen) {
  elements.sceneText.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'scene-text__inner';
  wrapper.innerHTML = screen.description;
  elements.sceneText.appendChild(wrapper);
}

function renderMedia(screenId, screen) {
  elements.sceneMedia.innerHTML = '';
  if (!screen.hero && (!screen.gallery || screen.gallery.length === 0)) {
    elements.sceneMedia.classList.add('is-hidden');
    return;
  }
  elements.sceneMedia.classList.remove('is-hidden');

  const hero = screen.hero || screen.gallery?.[0];
  if (hero) {
    if (!state.selectedGalleryImage[screenId]) {
      state.selectedGalleryImage[screenId] = hero;
    }
  }
  const selected = state.selectedGalleryImage[screenId] || hero;

  if (selected) {
    const heroFrame = document.createElement('figure');
    heroFrame.className = 'hero-frame';
    const img = document.createElement('img');
    img.src = selected.src;
    img.alt = selected.alt || '';
    heroFrame.appendChild(img);
    elements.sceneMedia.appendChild(heroFrame);

    if (selected.caption) {
      const caption = document.createElement('figcaption');
      caption.className = 'hero-caption';
      caption.textContent = selected.caption;
      elements.sceneMedia.appendChild(caption);
    }
  }

  if (screen.gallery && screen.gallery.length > 1) {
    const strip = document.createElement('div');
    strip.className = 'thumbnail-strip';
    screen.gallery.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'thumbnail-button';
      if (state.selectedGalleryImage[screenId]?.src === item.src) {
        button.classList.add('is-active');
      }
      const thumb = document.createElement('img');
      thumb.src = item.src;
      thumb.alt = item.alt || '';
      button.appendChild(thumb);
      button.addEventListener('click', () => {
        state.selectedGalleryImage[screenId] = item;
        renderMedia(screenId, screen);
      });
      strip.appendChild(button);
    });
    elements.sceneMedia.appendChild(strip);
  }
}

function renderInfoTask(screenId, task) {
  const card = document.createElement('article');
  card.className = 'task-card';
  const header = document.createElement('div');
  header.className = 'task-card__header';
  const title = document.createElement('h3');
  title.className = 'task-card__title';
  title.textContent = task.title;
  header.appendChild(title);
  card.appendChild(header);
  const body = document.createElement('div');
  body.innerHTML = task.body;
  card.appendChild(body);
  return card;
}

function renderTextTask(screenId, task) {
  const taskState = ensureTaskState(screenId)[task.id] || {};
  const card = document.createElement('article');
  card.className = 'task-card';
  const header = document.createElement('div');
  header.className = 'task-card__header';
  const title = document.createElement('h3');
  title.className = 'task-card__title';
  title.textContent = task.title;
  const status = document.createElement('span');
  status.className = 'task-status';
  if (taskState.status === 'complete') {
    status.textContent = 'Complete';
    status.classList.add('is-complete');
  } else {
    status.textContent = 'Awaiting input';
  }
  header.append(title, status);
  card.appendChild(header);

  const prompt = document.createElement('p');
  prompt.textContent = task.prompt;
  card.appendChild(prompt);

  const textarea = document.createElement('textarea');
  textarea.placeholder = task.placeholder || '';
  textarea.value = taskState.value || '';
  card.appendChild(textarea);

  const actions = document.createElement('div');
  actions.className = 'task-actions';
  const feedback = document.createElement('p');
  feedback.className = 'feedback';
  if (taskState.feedback) {
    feedback.textContent = taskState.feedback.text;
    feedback.classList.add(taskState.feedback.type === 'success' ? 'is-success' : 'is-error');
  }
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Check';
  button.addEventListener('click', () => {
    const value = textarea.value.trim();
    const result = task.validator(value);
    const feedbackData = {
      text: result.passed ? result.success : result.failure,
      type: result.passed ? 'success' : 'error'
    };
    markTask(screenId, task.id, result.passed ? 'complete' : 'pending', {
      value,
      feedback: feedbackData
    });
    renderScreen(state.currentScreen);
  });
  actions.append(feedback, button);
  card.appendChild(actions);
  return card;
}

function renderMultipleChoiceTask(screenId, task) {
  const taskState = ensureTaskState(screenId)[task.id] || {};
  const card = document.createElement('article');
  card.className = 'task-card';
  const header = document.createElement('div');
  header.className = 'task-card__header';
  const title = document.createElement('h3');
  title.className = 'task-card__title';
  title.textContent = task.title;
  const status = document.createElement('span');
  status.className = 'task-status';
  if (taskState.status === 'complete') {
    status.textContent = 'Complete';
    status.classList.add('is-complete');
  } else {
    status.textContent = 'Awaiting choice';
  }
  header.append(title, status);
  card.appendChild(header);

  const question = document.createElement('p');
  question.textContent = task.question;
  card.appendChild(question);

  const group = document.createElement('div');
  group.className = 'radio-group';
  task.options.forEach((option, index) => {
    const label = document.createElement('label');
    label.className = 'radio-option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `${screenId}-${task.id}`;
    input.value = String(index);
    if (Number(taskState.value) === index) {
      input.checked = true;
    }
    const text = document.createElement('span');
    text.textContent = option;
    label.append(input, text);
    group.appendChild(label);
  });
  card.appendChild(group);

  const actions = document.createElement('div');
  actions.className = 'task-actions';
  const feedback = document.createElement('p');
  feedback.className = 'feedback';
  if (taskState.feedback) {
    feedback.textContent = taskState.feedback.text;
    feedback.classList.add(taskState.feedback.type === 'success' ? 'is-success' : 'is-error');
  }
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Check answer';
  button.addEventListener('click', () => {
    const checked = group.querySelector('input:checked');
    if (!checked) {
      feedback.textContent = 'Select one option before checking.';
      feedback.classList.add('is-error');
      return;
    }
    const selected = Number(checked.value);
    const isCorrect = selected === task.correctIndex;
    const feedbackData = {
      text: isCorrect ? task.success : task.failure,
      type: isCorrect ? 'success' : 'error'
    };
    markTask(screenId, task.id, isCorrect ? 'complete' : 'pending', {
      value: selected,
      feedback: feedbackData
    });
    renderScreen(state.currentScreen);
  });
  actions.append(feedback, button);
  card.appendChild(actions);

  return card;
}

function renderSelectTask(screenId, task) {
  const taskState = ensureTaskState(screenId)[task.id] || {};
  const card = document.createElement('article');
  card.className = 'task-card';
  const header = document.createElement('div');
  header.className = 'task-card__header';
  const title = document.createElement('h3');
  title.className = 'task-card__title';
  title.textContent = task.title;
  const status = document.createElement('span');
  status.className = 'task-status';
  if (taskState.status === 'complete') {
    status.textContent = 'Complete';
    status.classList.add('is-complete');
  } else {
    status.textContent = 'Choose an example';
  }
  header.append(title, status);
  card.appendChild(header);

  const prompt = document.createElement('p');
  prompt.textContent = task.prompt;
  card.appendChild(prompt);

  const list = document.createElement('div');
  list.className = 'option-grid';
  task.options.forEach((option, index) => {
    const optionCard = document.createElement('div');
    optionCard.className = 'option-card';
    if (taskState.value === index) {
      optionCard.classList.add('is-complete');
    }
    const heading = document.createElement('h4');
    heading.textContent = `Option ${index + 1}`;
    const body = document.createElement('p');
    body.textContent = option;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Select';
    button.addEventListener('click', () => {
      markTask(screenId, task.id, 'complete', {
        value: index,
        feedback: { text: task.success, type: 'success' }
      });
      renderScreen(state.currentScreen);
    });
    optionCard.append(heading, body, button);
    list.appendChild(optionCard);
  });
  card.appendChild(list);
  if (taskState.feedback) {
    const feedback = document.createElement('p');
    feedback.className = 'feedback is-success';
    feedback.textContent = taskState.feedback.text;
    card.appendChild(feedback);
  }
  return card;
}

function renderLongformTask(screenId, task) {
  return renderTextTask(screenId, task);
}

function renderTasks(screenId, screen) {
  elements.taskSection.innerHTML = '';
  if (!screen.tasks) return;
  screen.tasks.forEach((task) => {
    let card;
    switch (task.type) {
      case 'info':
        card = renderInfoTask(screenId, task);
        break;
      case 'text':
        card = renderTextTask(screenId, task);
        break;
      case 'multiple-choice':
        card = renderMultipleChoiceTask(screenId, task);
        break;
      case 'select':
        card = renderSelectTask(screenId, task);
        break;
      case 'longform':
        card = renderLongformTask(screenId, task);
        break;
      default:
        card = document.createElement('article');
        card.textContent = 'Unsupported task type.';
    }
    elements.taskSection.appendChild(card);
  });
}

function renderMap(screenId, screen) {
  renderSceneText(screen);
  elements.taskSection.innerHTML = '';
  const mapWrapper = document.createElement('div');
  mapWrapper.className = 'option-grid';
  screen.mapOptions.forEach((option) => {
    const card = document.createElement('article');
    card.className = 'option-card';
    if (state.completedScreens.has(option.id)) {
      card.classList.add('is-complete');
    }
    const badge = document.createElement('span');
    badge.className = 'map-badge';
    badge.textContent = state.completedScreens.has(option.id) ? 'Completed' : 'Ready';
    const heading = document.createElement('h4');
    heading.textContent = option.title;
    const subtitle = document.createElement('p');
    subtitle.innerHTML = `<strong>${option.subtitle}</strong>`;
    const summary = document.createElement('p');
    summary.textContent = option.summary;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = state.completedScreens.has(option.id)
      ? 'Review again'
      : 'Start scene';
    button.addEventListener('click', () => {
      if (!state.visitedOrder.includes(option.id)) {
        state.visitedOrder.push(option.id);
      }
      navigateTo(option.id);
    });
    card.append(badge, heading, subtitle, summary, button);
    mapWrapper.appendChild(card);
  });
  elements.taskSection.appendChild(mapWrapper);
  elements.sceneMedia.classList.add('is-hidden');
}

function renderWrapUp(screenId, screen) {
  state.completedScreens.add('wrap-up');
  renderSceneText(screen);
  const completedScenes = LOCATION_IDS.filter((id) => state.completedScreens.has(id));
  const improvements = [];
  if (!state.taskState['corner-store']?.['owner-advice'] ||
      state.taskState['corner-store']['owner-advice'].status !== 'complete') {
    improvements.push('Give the Corner Store owner advice that uses the idiom or vocabulary.');
  }
  if (!state.taskState['street-mural']?.['mural-advice'] ||
      state.taskState['street-mural']['mural-advice'].status !== 'complete') {
    improvements.push('Offer the muralist a suggestion with a participle clause.');
  }
  if (!state.taskState['community-garden']?.['garden-advice'] ||
      state.taskState['community-garden']['garden-advice'].status !== 'complete') {
    improvements.push('Pitch the gardener an idea that keeps “even though” in play.');
  }
  if (!state.taskState['neighbor-challenge']?.['neighbor-recap'] ||
      state.taskState['neighbor-challenge']['neighbor-recap'].status !== 'complete') {
    improvements.push('Deliver a 100+ word recap that name-drops all stops and at least two language points.');
  }

  const report = document.createElement('div');
  report.className = 'report-card';
  report.innerHTML = `
    <h3>Day 1 report</h3>
    <p>You completed ${completedScenes.length} of 3 exploration stops and faced Albert’s challenge.</p>
    <ul>
      <li>Integration: ${state.completedScreens.has('neighbor-challenge') ? 'Full recap delivered' : 'Recap pending'}</li>
      <li>Creativity: Keep weaving humor and specifics into every response.</li>
      <li>Volunteer spirit: ${state.completedScreens.has('community-garden') ? 'Garden pitch logged' : 'Return to the beds for another pass.'}</li>
    </ul>
    <p><strong>Improvement tips:</strong></p>
  `;
  const list = document.createElement('ul');
  (improvements.length ? improvements : ['Keep the dry humor flowing and revisit any scene if you want a cleaner run.']).forEach((tip) => {
    const item = document.createElement('li');
    item.textContent = tip;
    list.appendChild(item);
  });
  report.appendChild(list);
  report.insertAdjacentHTML(
    'beforeend',
    '<p>You’ve completed Day 1! If you have any feedback, send it to <a href="mailto:Luke@lukepriddy.com">Luke@lukepriddy.com</a>. Day 2 is still being developed; check back soon.</p>'
  );
  elements.taskSection.innerHTML = '';
  elements.taskSection.appendChild(report);
  elements.sceneMedia.classList.add('is-hidden');
}

function renderScreen(screenId) {
  state.currentScreen = screenId;
  const screen = getScreen(screenId);
  if (!screen) return;

  elements.title.textContent = screen.title;
  elements.focus.textContent = screen.focus || 'Focus';
  updateProgressLabel(screenId);

  if (screen.type === 'map') {
    renderMap(screenId, screen);
  } else if (screen.type === 'wrap') {
    renderWrapUp(screenId, screen);
  } else {
    renderSceneText(screen);
    renderMedia(screenId, screen);
    renderTasks(screenId, screen);
  }

  const chatLog = ensureChatLog(screenId);
  if (chatLog.length === 0 && screen.chat?.intro) {
    chatLog.push({ from: 'host', text: screen.chat.intro, timestamp: new Date() });
  }
  renderChat(screenId, screen);
  elements.chatTagline.textContent = screen.chat?.tagline || 'Stay in the loop.';
  updateNavButtons(screenId, screen);
}

function renderChat(screenId, screen) {
  const chatLog = ensureChatLog(screenId);
  elements.chatLog.innerHTML = '';
  chatLog.forEach((entry) => {
    const wrapper = document.createElement('div');
    wrapper.className = `chat-entry chat-entry--${entry.from}`;
    const meta = document.createElement('span');
    meta.className = 'chat-entry__meta';
    meta.textContent = entry.from === 'user' ? 'You' : 'Guide';
    const bubble = document.createElement('div');
    bubble.className = 'chat-entry__bubble';
    bubble.textContent = entry.text;
    wrapper.append(meta, bubble);
    elements.chatLog.appendChild(wrapper);
  });
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

function handleChatSubmit(event) {
  event.preventDefault();
  const screen = getScreen(state.currentScreen);
  if (!screen) return;
  const message = elements.chatInput.value.trim();
  if (!message) return;
  const chatLog = ensureChatLog(state.currentScreen);
  chatLog.push({ from: 'user', text: message, timestamp: new Date() });
  elements.chatInput.value = '';

  let reply = 'Noted.';
  if (screen.chat?.responder) {
    reply = screen.chat.responder(message);
  }
  chatLog.push({ from: 'host', text: reply, timestamp: new Date() });
  renderChat(state.currentScreen, screen);
}

elements.chatForm.addEventListener('submit', handleChatSubmit);

elements.backButton.addEventListener('click', () => {
  const current = state.currentScreen;
  if (current === 'overview') return;
  if (current === 'exploration-map') {
    navigateTo('overview');
    return;
  }
  if (LOCATION_IDS.includes(current)) {
    navigateTo('exploration-map');
    return;
  }
  if (current === 'neighbor-challenge') {
    navigateTo('exploration-map');
    return;
  }
  if (current === 'wrap-up') {
    navigateTo('neighbor-challenge');
  }
});

elements.nextButton.addEventListener('click', () => {
  const current = state.currentScreen;
  if (current === 'overview') {
    navigateTo('exploration-map');
    return;
  }
  if (current === 'exploration-map') {
    if (LOCATION_IDS.every((id) => state.completedScreens.has(id))) {
      navigateTo('neighbor-challenge');
    }
    return;
  }
  if (LOCATION_IDS.includes(current)) {
    if (allRequiredTasksComplete(current)) {
      state.completedScreens.add(current);
      navigateTo('exploration-map');
    }
    return;
  }
  if (current === 'neighbor-challenge') {
    if (allRequiredTasksComplete('neighbor-challenge')) {
      state.completedScreens.add('neighbor-challenge');
      navigateTo('wrap-up');
    }
    return;
  }
  if (current === 'wrap-up') {
    // end of flow
  }
});

function updateNavButtons(screenId, screen) {
  switch (screenId) {
    case 'overview':
      elements.backButton.disabled = true;
      elements.nextButton.disabled = false;
      elements.nextButton.textContent = 'Next';
      break;
    case 'exploration-map': {
      elements.backButton.disabled = false;
      const allDone = LOCATION_IDS.every((id) => state.completedScreens.has(id));
      elements.nextButton.disabled = !allDone;
      elements.nextButton.textContent = allDone ? 'Meet Albert' : 'Visit every stop';
      break;
    }
    case 'neighbor-challenge': {
      elements.backButton.disabled = false;
      const done = allRequiredTasksComplete(screenId);
      if (done) {
        state.completedScreens.add('neighbor-challenge');
      }
      elements.nextButton.disabled = !done;
      elements.nextButton.textContent = 'See wrap-up';
      break;
    }
    case 'wrap-up':
      elements.backButton.disabled = false;
      elements.nextButton.disabled = true;
      elements.nextButton.textContent = 'Completed';
      break;
    default:
      if (LOCATION_IDS.includes(screenId)) {
        elements.backButton.disabled = false;
        const complete = allRequiredTasksComplete(screenId);
        if (complete) {
          state.completedScreens.add(screenId);
        }
        elements.nextButton.disabled = !complete;
        elements.nextButton.textContent = 'Return to map';
      }
      break;
  }
}

function navigateTo(screenId) {
  renderScreen(screenId);
}

renderScreen('overview');
