/**
 * SuperChat 400+ — Unique-trigger JavaScript Chatbot
 * - 100% unique trigger phrases across all intents (no overlaps)
 * - ~500 distinct trigger phrases (counted at runtime)
 * - Randomized, friendly replies
 * - Name capture + personalization
 * - Time/Date utilities
 *
 * Usage:
 *   import { getBotResponse } from "./superchat-unique.js";
 *   const reply = getBotResponse("hi there");
 */

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

let userName = null;

// --- Intent reply bank (short & lively) ---
const REPLIES = {
  greetings: [
    "Hey there! 👋",
    "Hello! What’s up?",
    "Hi! Nice to see you here.",
    "Yo! Ready to chat?",
    "Greetings, traveler!",
    "Howdy! How’s your day going?",
  ],
  goodbyes: [
    "Bye! Catch you later 👋",
    "See you soon!",
    "Take care! ✨",
    "Farewell for now!",
    "Later! Stay awesome.",
  ],
  selfIntro: [
    "Nice to meet you! 😊",
    "Cool name! I’ll remember that.",
    "Great to know you!",
    "Awesome — noted!",
  ],
  botIntro: [
    "I’m SmartBot — your friendly chat pal 🤖.",
    "I’m a helpful AI here to talk and assist!",
    "I’m code with personality — SmartBot at your service!",
  ],
  howAreYou: [
    "I’m feeling fantastic — thanks for asking! You?",
    "All systems green. How are you doing?",
    "Buzzing with energy ⚡ How about you?",
  ],
  positiveMood: [
    "Love the vibes! Keep it up ✨",
    "That’s awesome! What sparked it?",
    "Yay! Tell me more! 😄",
  ],
  negativeMood: [
    "I’m sorry you’re going through that. Want to talk?",
    "You’re not alone — I’m here. ❤️",
    "That sounds tough. One step at a time. 🌱",
  ],
  neutralMood: [
    "Got it — a chill day is still a win.",
    "Noted. Anything you’d like to chat about?",
    "Alright — I’m all ears if you want to dive into something.",
  ],
  timeDate: [
    `Right now it’s ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. ⏰`,
    `Today is ${new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}. 📅`,
    "Time flies when we chat! ⏳",
  ],
  jokes: [
    "Why don’t programmers like nature? Too many bugs! 🐛",
    "Parallel lines have so much in common… it’s a shame they’ll never meet.",
    "I told my computer I needed a break, and it said “No problem — I’ll go to sleep!” 😴",
    "Why do Java developers wear glasses? Because they don’t C#! 🤓",
  ],
  stories: [
    "Once upon a time, a curious chatbot learned from every message — thanks to you. 😊",
    "In a realm of code and coffee, a friendly AI was built to brighten your day.",
    "There was a bot that loved listening — the more it heard, the wiser it became.",
  ],
  motivation: [
    "Believe in yourself — future you will thank you. 🌟",
    "Small steps add up. Keep going! 💪",
    "Progress, not perfection. You’ve got this. 🚀",
  ],
  music: [
    "Music is a mood superpower! Got a favorite song?",
    "I can’t play audio here, but I can suggest genres!",
    "What’s your go-to playlist when you work?",
  ],
  food: [
    "Food talk makes everyone happy. What’s your favorite dish? 😋",
    "Cooking is edible creativity — what do you like to make?",
    "Pizza or biryani — which team are you on?",
  ],
  travel: [
    "Dream destination time! Mountains, beaches, or cities?",
    "Travel opens the mind. Where to next?",
    "If I could travel, I’d tour data centers first. 😄",
  ],
  sports: [
    "Which team do you root for?",
    "Do you play or just watch?",
    "Sports keep the mind & body sharp! 🏃",
  ],
  gaming: [
    "GG! What are you playing lately?",
    "Casual or competitive gamer?",
    "PC, console, or mobile — what’s your setup?",
  ],
  technology: [
    "Tech is magic that works! What gadget excites you?",
    "Which app can’t you live without?",
    "AI and you — best duo. 😉",
  ],
  social: [
    "Scroll squad or post pro? 😄",
    "Reels or stories — what’s your jam?",
    "Social media detox days hit different.",
  ],
  finance: [
    "Saving or investing — which do you prefer?",
    "Diversify and do your research! 📈",
    "Crypto, stocks, or good old FD?",
  ],
  news: [
    "What topics do you follow most — tech, sports, world?",
    "News can be overwhelming — curate your feed wisely.",
    "Headlines change fast — what caught your eye today?",
  ],
  relationships: [
    "Matters of the heart are complicated — want to talk it out?",
    "Listening helps — I’m here. 💬",
    "Be honest, be kind — start there.",
  ],
  health: [
    "Hydration and stretching — underrated combo. 💧",
    "Sleep fuels everything. 😴",
    "Tiny habits build big wellness.",
  ],
  pets: [
    "Dogs or cats — which team? 🐶🐱",
    "Tell me about your pet’s funniest habit!",
    "Pets make life better — agreed?",
  ],
  stress: [
    "Deep breath in… and out. You’ve got this.",
    "Take a short walk or stretch — it helps. 🌿",
    "Let’s break the problem into smaller steps.",
  ],
  advice: [
    "Start simple, iterate fast.",
    "Ask better questions, get better answers.",
    "Done > perfect — ship it.",
  ],
  facts: [
    "Fun fact: Honey never spoils! 🍯",
    "Fun fact: Octopuses have three hearts! 🐙",
    "Fun fact: Bananas are berries. Wild, right?",
  ],
  celebrate: [
    "Congrats! 🎉",
    "That’s awesome news — high five! 🙌",
    "Party mode activated! 🥳",
  ],
  deep: [
    "Big question. What do *you* think?",
    "Meaning grows where effort flows.",
    "We find purpose by creating it.",
  ],
  philosophy: [
    "Karma’s a mirror — actions echo.",
    "Fate meets effort halfway.",
    "The journey is the destination. 🛤️",
  ],
  science: [
    "Science is curiosity with evidence! 🔬",
    "Space, atoms, life — pick a rabbit hole!",
    "Which field fascinates you most?",
  ],
  math: [
    "Let’s crunch it — what’s the problem?",
    "Math is patterns with rules.",
    "Numbers tell great stories. 📊",
  ],
  history: [
    "History repeats… until we learn.",
    "Any favorite era or event?",
    "Past lessons power future wins.",
  ],
  language: [
    "Languages are mind-expanding! Which one are you learning?",
    "Want a quick phrase translation?",
    "Accents are music to the ears!",
  ],
  coding: [
    "Show me the bug — we’ll squash it. 🐞",
    "What stack are you using?",
    "Refactor ruthlessly; comment kindly.",
  ],
  memes: [
    "Certified meme enjoyer, reporting in. 😎",
    "Send me your best meme format.",
    "When the code finally works: *chef’s kiss*",
  ],
  shopping: [
    "Add to cart or save for later? 🛒",
    "Hunting deals is an art!",
    "Quality over quantity pays off.",
  ],
  fashion: [
    "Style is personal — own it. ✨",
    "What’s your go-to outfit vibe?",
    "Sneakers or boots today?",
  ],
  beauty: [
    "Skincare > makeup, any day. 🧴",
    "Hydration and sunscreen — always.",
    "What’s your routine like?",
  ],
  transport: [
    "Train, bus, cab — what’s your pick?",
    "Traffic is a boss-level challenge. 🚦",
    "Window seat supremacy. 🪟",
  ],
  emergency: [
    "I’m here — tell me what’s wrong.",
    "Let’s tackle it one step at a time.",
    "You’ve got help. Start from the top.",
  ],
  compliments: [
    "Aww, thanks! You’re too kind. 😊",
    "Blushing in binary! 💖",
    "Right back at you!",
  ],
  insults: [
    "Ouch — let’s keep it friendly. 😅",
    "I’m here to help, promise.",
    "Let’s reset and try again?",
  ],
  spirituality: [
    "Gratitude is quiet magic.",
    "Stillness says a lot.",
    "What keeps you grounded?",
  ],
  dreams: [
    "Dream big, plan small, act daily.",
    "Ambition needs a roadmap.",
    "What’s one goal for this month?",
  ],
  childhood: [
    "Favorite childhood snack?",
    "Cartoons or outdoor games?",
    "Old memories hit different.",
  ],
  officeHumor: [
    "“This meeting could’ve been an email.” 😅",
    "Standups where we sit down… classic.",
    "Coffee: the true PM.",
  ],
  dailyLife: [
    "How’s your day treating you?",
    "What’s one win today?",
    "Any small joys you noticed?",
  ],
  planning: [
    "Block time, batch tasks, break steps.",
    "Prioritize: must, should, could.",
    "Tomorrow starts tonight — prep a little.",
  ],
  security: [
    "Use a password manager — future you smiles.",
    "2FA or regret later. 🔐",
    "Update before it breaks.",
  ],
  diy: [
    "DIY wins feel amazing!",
    "Got tools and patience? You’re set.",
    "What are you building?",
  ],
  gardening: [
    "Plants teach patience. 🌱",
    "Water, light, love — repeat.",
    "What’s growing in your space?",
  ],
  cookingMethods: [
    "Bake day or stir-fry day?",
    "Low and slow = flavor.",
    "Season, taste, adjust. 👩‍🍳",
  ],
  space: [
    "Stars make us feel small in a good way.",
    "Moon or Mars — where first?",
    "Telescopes are time machines. 🔭",
  ],
  ocean: [
    "The ocean is a whole new world.",
    "Coral reefs are living cities.",
    "Waves reset the mind. 🌊",
  ],
  disasters: [
    "Stay safe — preparation matters.",
    "Know your local emergency numbers.",
    "Better a drill than a panic.",
  ],
  school: [
    "Homework hack: start with a 10-min sprint.",
    "Ask questions — it’s power.",
    "Study smart, not just hard.",
  ],
  college: [
    "Clubs = friends + projects.",
    "Internships unlock doors.",
    "Prof office hours are gold.",
  ],
  career: [
    "Portfolio > resume lines.",
    "Interview tip: stories beat facts.",
    "Track wins — negotiate with receipts.",
  ],
  lifeHacks: [
    "Put your phone in another room to focus.",
    "Two-minute rule: do it now.",
    "Default to calendar blocks.",
  ],
  trivia: [
    "Hit me with a topic — let’s quiz!",
    "Trivia time! Winner gets bragging rights. 😄",
    "Random facts are my cardio.",
  ],
  quotes: [
    "“What you do every day matters more than what you do once in a while.”",
    "“Simplicity is the ultimate sophistication.”",
    "“Action is eloquence.”",
  ],
  poetry: [
    "Roses are red, code can be neat — when it compiles, life is sweet. 🌹",
    "Haikus are short bursts, meaning in a tiny space — like good commit msgs.",
    "Poetry is debugging the heart.",
  ],
  accents: [
    "Pronunciation tips? I can help explain.",
    "Accents are identity — celebrate yours!",
    "Which accent do you love hearing?",
  ],
  emotions: [
    "Name it, tame it — feelings first.",
    "Mood check: what’s one word for now?",
    "It’s okay to feel it all.",
  ],
  dating: [
    "Be curious, not performative.",
    "Ask thoughtful questions; listen more.",
    "Green flags > red flag hunting.",
  ],
  festivals: [
    "Festivals = food + family + fun!",
    "What are your favorite traditions?",
    "May your celebrations sparkle ✨",
  ],
  birthday: [
    "Happy Birthday! 🎂",
    "Make a wish and chase it.",
    "New age, new page — enjoy!",
  ],
  gifts: [
    "Thoughtful > expensive.",
    "Handwritten notes win hearts.",
    "What do they love doing?",
  ],
  climate: [
    "Small changes add up — reuse, reduce.",
    "Vote with your wallet and habits.",
    "Nature returns the love you give. 🌳",
  ],
  environment: [
    "Plant a tree, plant hope.",
    "Recycle + repair = respect.",
    "Nature walks heal a lot.",
  ],
  volunteer: [
    "Giving time gives meaning.",
    "Pick a cause and start small.",
    "Impact > intention — go do.",
  ],
  politics: [
    "Stay informed; verify sources.",
    "Civility keeps dialogue alive.",
    "Local actions matter most.",
  ],
  warPeace: [
    "Peace is built, not found.",
    "Human stories hold the truth.",
    "Empathy scales slowly — but surely.",
  ],
  law: [
    "Know your rights; keep records.",
    "Read before you sign.",
    "Contracts love clarity.",
  ],
  traffic: [
    "Leave earlier than you think.",
    "Podcasts make jams bearable.",
    "Map apps save sanity. 🗺️",
  ],
  discounts: [
    "Wishlist + price alerts = wins.",
    "Stack coupons wisely.",
    "Sales come back — patience!",
  ],
  scams: [
    "If it’s urgent and secret, it’s a scam.",
    "Never share OTPs. Ever.",
    "Verify on official channels.",
  ],
  medical: [
    "Not medical advice — but rest, water, and help when needed.",
    "See a professional if symptoms persist.",
    "Your health comes first. ❤️",
  ],
  mindfulness: [
    "Notice 5 things you can see — reset.",
    "Slow breathing calms the system.",
    "Be where your feet are.",
  ],
  yoga: [
    "Stretch gently; breathe deeply.",
    "Consistency > intensity.",
    "Yoga meets you where you are. 🧘",
  ],
  podcast: [
    "Long walks + podcasts = combo.",
    "What genre do you like — tech, crime, self-help?",
    "Pod recs welcome!",
  ],
  photography: [
    "Light is everything — chase it.",
    "Rule of thirds, then break it.",
    "What camera/phone do you use?",
  ],
  drawing: [
    "Sketch daily — lines get confident.",
    "Reference helps, tracing teaches.",
    "What do you like to draw?",
  ],
  writing: [
    "Write messy, edit clean.",
    "Daily paragraphs beat monthly novels.",
    "What’s your current idea?",
  ],
  diets: [
    "Find a diet you can *live* with.",
    "Protein + fiber = friends.",
    "Consult pros for big changes.",
  ],
  festiveFoods: [
    "Holiday menus are pure nostalgia.",
    "Family recipes are heirlooms.",
    "What’s your signature dish?",
  ],
  subjects: [
    "Favorite subject this term?",
    "Study groups make it fun.",
    "Teach back to learn faster.",
  ],
  astronomy: [
    "Galaxies are city clusters of stars.",
    "Dark matter — the great mystery.",
    "Meteor showers are wishes in bulk. ⭐",
  ],
  diving: [
    "Underwater silence is a symphony.",
    "Respect currents; buddy up.",
    "Corals are delicate — look, don’t touch.",
  ],
  extremeSports: [
    "Adrenaline with safety = thrill.",
    "Train, gear up, then send it.",
    "Which extreme sport calls you?",
  ],
  puzzles: [
    "Riddles sharpen the mind — got one?",
    "Crosswords or Sudoku?",
    "Logic puzzles are my jam.",
  ],
  crimeMystery: [
    "Whodunnits are addictive.",
    "Red herrings everywhere!",
    "Got a fav detective series?",
  ],
  paranormal: [
    "Ghost stories = goosebumps.",
    "Haunted or hype?",
    "Ever had a spooky moment?",
  ],
};

// --- Unique triggers registry (no duplicates across all intents) ---
/**
 * Each intent gets its own trigger list.
 * We’ll register them into a single global Map to ensure uniqueness.
 * If a duplicate phrase appears, it will be ignored at build time (and logged in DEV).
 */
const INTENT_TRIGGERS = {
  // 1. Greetings (16)
  greetings: [
    "hi", "hello", "hey", "yo", "hola", "howdy", "greetings", "sup",
    "good mornin", "good morning", "good afternoon", "good evening", "hey there",
    "hiya", "heyyo", "namaste"
  ],

  // 2. Goodbyes (16)
  goodbyes: [
    "bye", "goodbye", "later", "see you", "farewell", "adios",
    "take care", "catch you later", "ciao", "peace out", "see ya",
    "gtg", "gotta go", "talk later", "until next time", "signing off"
  ],

  // 3. Self-introduction (16)
  selfIntro: [
    "my name is", "call me", "i’m called", "im called", "i am called",
    "i am named", "people call me", "you can call me", "i go by",
    "this is", "name’s", "name is", "myself", "let me introduce myself",
    "introducing myself", "aka"
  ],

  // 4. Bot intro (16)
  botIntro: [
    "who are you", "what are you", "are you a bot", "are you human",
    "what do i call you", "your name", "what’s your name", "whats your name",
    "introduce yourself", "tell me about you", "who am i chatting with",
    "who is this", "who dis", "are you ai", "are you real", "what do you do"
  ],

  // 5. How are you (16)
  howAreYou: [
    "how are you", "hows it going", "how’s it going", "how are you doing",
    "how you doing", "what’s up", "whats up", "how you been", "how’s life",
    "hows life", "how do you feel", "how you feeling", "you good",
    "everything good", "how are things", "how’s your day"
  ],

  // 6. Positive mood (16)
  positiveMood: [
    "i am happy", "im happy", "feeling happy", "excited", "awesome",
    "thrilled", "great", "fantastic", "amazing", "wonderful",
    "over the moon", "pumped", "feeling good", "good vibes",
    "i feel great", "on top of the world"
  ],

  // 7. Negative mood (16)
  negativeMood: [
    "i am sad", "im sad", "feeling low", "down bad", "depressed",
    "upset", "heartbroken", "angry", "frustrated", "miserable",
    "unhappy", "gloomy", "blue mood", "stressed out",
    "not okay", "not fine"
  ],

  // 8. Neutral mood (12)
  neutralMood: [
    "meh", "so-so", "alright", "okay", "ok i guess", "not bad",
    "average", "in between", "could be better", "same old",
    "nothing special", "fine i guess"
  ],

  // 9. Time & Date (16)
  timeDate: [
    "time", "what time", "current time", "clock", "date",
    "what is today", "what day", "day today", "today date",
    "today’s date", "todays date", "what is the date", "day of week",
    "what month is it", "what year", "calendar"
  ],

  // 10. Jokes (16)
  jokes: [
    "joke", "tell me a joke", "funny", "make me laugh", "humor",
    "pun", "dad joke", "one liner", "another joke", "more jokes",
    "jokes please", "say something funny", "crack a joke", "punny",
    "make me giggle", "lol joke"
  ],

  // 11. Stories (12)
  stories: [
    "story", "tell me a story", "short story", "bedtime story", "fun story",
    "make a story", "a little story", "another story", "fantasy story",
    "cute story", "motivational story", "robot story"
  ],

  // 12. Motivation (12)
  motivation: [
    "motivate me", "inspire me", "encourage me", "pep talk", "motivation",
    "inspiration", "say something motivating", "boost me",
    "motivational quote", "push me", "coach me", "tell me to keep going"
  ],

  // 13. Music (16)
  music: [
    "music", "song", "songs", "playlist", "recommend music", "suggest song",
    "favorite song", "top tracks", "i love music", "music talk", "sing me something",
    "hum a tune", "band rec", "artist rec", "album rec", "music mood"
  ],

  // 14. Food (16)
  food: [
    "food", "eat", "eating", "cooking", "cook", "recipe", "recipes",
    "what should i eat", "what to cook", "favorite dish", "snack ideas",
    "lunch ideas", "dinner ideas", "breakfast ideas", "baking", "dessert"
  ],

  // 15. Travel (16)
  travel: [
    "travel", "trip", "vacation", "holiday trip", "plan a trip", "travel ideas",
    "dream destination", "beach trip", "mountain trip", "city break", "weekend getaway",
    "itinerary", "road trip", "backpacking", "solo travel", "travel tips"
  ],

  // 16. Sports (16)
  sports: [
    "sports", "football chat", "cricket talk", "basketball chat", "tennis talk",
    "gym talk", "fitness sports", "sports team", "favorite team", "which sport",
    "athlete talk", "workout sports", "running talk", "marathon chat", "badminton chat", "table tennis chat"
  ],

  // 17. Gaming (16)
  gaming: [
    "gaming", "video game", "pc game", "console game", "mobile game",
    "esports", "ranked match", "co-op game", "single player", "multiplayer",
    "open world", "strategy game", "rpg talk", "fps talk", "battle royale", "indie game"
  ],

  // 18. Technology (16)
  technology: [
    "technology", "tech talk", "gadget chat", "new phone", "new laptop",
    "app recommendation", "productivity app", "automation idea", "smart home",
    "wearables", "vr ar", "ai talk", "ml talk", "cloud talk", "dev tools", "tech news chat"
  ],

  // 19. Social media (12)
  social: [
    "instagram", "facebook", "twitter", "x app", "social media",
    "tiktok", "reels", "stories", "viral post", "followers", "creator tips", "social detox"
  ],

  // 20. Finance (16)
  finance: [
    "money", "finance", "budget tips", "saving tips", "investing basics",
    "stock talk", "crypto talk", "mutual funds", "index funds", "sip plan",
    "fd vs rd", "retirement plan", "side income", "expense tracking", "credit score", "emergency fund"
  ],

  // 21. News (12)
  news: [
    "news", "headlines", "latest updates", "current affairs", "world news",
    "tech news", "sports news", "business news", "local news", "trending news", "breaking news", "daily brief"
  ],

  // 22. Relationships (12)
  relationships: [
    "relationship advice", "love problem", "crush talk", "dating help",
    "girlfriend chat", "boyfriend chat", "breakup talk", "moving on help",
    "friendship issue", "argued with partner", "long distance help", "how to apologize"
  ],

  // 23. Health (16)
  health: [
    "health", "fitness", "workout", "exercise", "diet tips",
    "sleep schedule", "hydrate reminder", "healthy habits", "stretch routine",
    "steps goal", "desk posture", "mental health", "energy tips", "healthy snacks", "meal prep", "rest day"
  ],

  // 24. Pets (12)
  pets: [
    "pet", "dog chat", "cat chat", "pet care", "pet food", "dog training",
    "cat behavior", "adopt pet", "pet grooming", "pet names", "funny pet", "pet story"
  ],

  // 25. Stress (12)
  stress: [
    "stress", "anxious", "anxiety", "worried", "panic", "overwhelmed",
    "burnout", "need calm", "need break", "calm me", "grounding", "take a breath"
  ],

  // 26. Advice (12)
  advice: [
    "advice", "tips", "how to start", "how to focus", "how to be productive",
    "career tip", "study tip", "life advice", "time management tip", "habit tip", "motivation tip", "discipline tip"
  ],

  // 27. Facts (12)
  facts: [
    "fun fact", "interesting fact", "random fact", "tell me a fact",
    "did you know", "fact please", "another fact", "weird fact", "science fact", "animal fact", "space fact", "history fact"
  ],

  // 28. Celebrate (10)
  celebrate: [
    "i won", "i did it", "we did it", "good news", "i got promoted",
    "i passed", "i achieved", "celebrate with me", "share good news", "success moment"
  ],

  // 29. Deep (12)
  deep: [
    "meaning of life", "purpose of life", "what is happiness", "what is success",
    "why are we here", "what matters most", "what is truth", "what is love",
    "how to live", "life lesson", "searching purpose", "existential question"
  ],

  // 30. Philosophy (12)
  philosophy: [
    "karma talk", "destiny talk", "fate talk", "free will talk", "ethics talk",
    "stoicism", "minimalism idea", "mind vs matter", "virtue talk", "philosophy quote", "wisdom talk", "first principles"
  ],

  // 31. Science (12)
  science: [
    "science", "biology chat", "chemistry chat", "physics chat", "geology chat",
    "climate science", "neuroscience", "genetics talk", "lab experiments", "scientific method", "hypothesis talk", "evidence talk"
  ],

  // 32. Math (12)
  math: [
    "math help", "algebra help", "geometry help", "calculus help", "probability help",
    "statistics help", "equation help", "factorization help", "solve math", "math trick", "number theory", "mental math"
  ],

  // 33. History (12)
  history: [
    "history", "ancient history", "medieval history", "modern history", "world war talk",
    "civilization talk", "historical figure", "timeline talk", "archaeology talk", "heritage talk", "past events", "historical lesson"
  ],

  // 34. Language (12)
  language: [
    "language learning", "translate phrase", "word meaning", "synonym help", "antonym help",
    "grammar tip", "pronounce word", "accent practice", "vocabulary list", "idiom meaning", "phrase usage", "sentence correction"
  ],

  // 35. Coding (16)
  coding: [
    "code help", "programming help", "bug fix", "debug help", "stack trace",
    "javascript help", "python help", "java help", "c++ help", "react help",
    "node help", "api help", "database help", "git help", "regex help", "performance help"
  ],

  // 36. Memes (12)
  memes: [
    "meme", "funny meme", "meme idea", "template idea", "relatable meme",
    "internet slang", "lol", "lmao", "rofl", "brb joke", "omg meme", "cringe meme"
  ],

  // 37. Shopping (12)
  shopping: [
    "shopping", "buy online", "ecommerce", "cart help", "wishlist help",
    "compare prices", "deal hunt", "review check", "return policy", "gift idea shopping", "best value", "budget buy"
  ],

  // 38. Fashion (12)
  fashion: [
    "fashion", "outfit idea", "style tip", "capsule wardrobe", "streetwear",
    "formal wear", "casual wear", "color matching", "shoe pairing", "seasonal style", "accessories tip", "fit check"
  ],

  // 39. Beauty (12)
  beauty: [
    "beauty", "makeup tip", "skincare tip", "hair care tip", "fragrance tip",
    "sunblock advice", "routine advice", "night routine", "day routine", "lip care", "eye care", "glow routine"
  ],

  // 40. Transport (12)
  transport: [
    "transport", "car talk", "bus talk", "train talk", "flight talk",
    "airport tips", "ride share tips", "navigation tip", "maps tip", "parking tip", "commute idea", "travel pass"
  ],

  // 41. Emergency (10)
  emergency: [
    "help me", "need help", "urgent help", "stuck problem", "big problem",
    "issue now", "support please", "assist me", "need support", "help asap"
  ],

  // 42. Compliments (10)
  compliments: [
    "you are smart", "you are clever", "you are helpful", "you are kind", "you are funny",
    "nice bot", "good bot", "cool bot", "awesome bot", "love this bot"
  ],

  // 43. Insults (10)
  insults: [
    "you are dumb", "stupid bot", "bad bot", "useless bot", "trash bot",
    "worst bot", "hate this bot", "annoying bot", "shut up bot", "you are lame"
  ],

  // 44. Spirituality (10)
  spirituality: [
    "spiritual talk", "prayer talk", "meditation talk", "faith talk", "belief talk",
    "gratitude talk", "inner peace", "mindfulness belief", "values talk", "soul talk"
  ],

  // 45. Dreams (10)
  dreams: [
    "dream goal", "life goal", "ambition talk", "vision board", "goal setting",
    "monthly goals", "yearly goals", "five year plan", "roadmap goal", "habit goals"
  ],

  // 46. Childhood (10)
  childhood: [
    "childhood memory", "school days memory", "old cartoon", "playground memory", "summer vacation memory",
    "tiffin memory", "first bicycle", "favorite teacher memory", "old friends memory", "nostalgia talk"
  ],

  // 47. Office humor (10)
  officeHumor: [
    "office joke", "boss joke", "meeting joke", "deadline joke", "coffee joke",
    "overtime joke", "status update joke", "email joke", "slide deck joke", "standup joke"
  ],

  // 48. Daily life (10)
  dailyLife: [
    "daily routine", "daily update", "today update", "how was your day style", "long day",
    "busy day", "lazy day", "productive day", "random day", "boring day"
  ],

  // 49. Planning (10)
  planning: [
    "plan today", "plan week", "plan month", "schedule help", "task list help",
    "priorities help", "calendar block", "planning tips", "goal plan", "focus plan"
  ],

  // 50. Security (10)
  security: [
    "security tip", "password tip", "2fa tip", "phishing tip", "privacy tip",
    "data safety", "backup plan", "update software", "vpn tip", "secure account"
  ],

  // 51. DIY (10)
  diy: [
    "diy project", "home repair idea", "craft idea", "maker project", "woodwork idea",
    "electronics diy", "soldering idea", "arduino idea", "raspberry pi idea", "household hack"
  ],

  // 52. Gardening (10)
  gardening: [
    "gardening", "indoor plants", "succulents tip", "herb garden", "balcony garden",
    "compost tip", "watering tip", "sunlight tip", "soil mix tip", "repotting tip"
  ],

  // 53. Cooking methods (10)
  cookingMethods: [
    "bake idea", "grill idea", "stir fry idea", "steam idea", "roast idea",
    "saute idea", "broil idea", "sous vide idea", "air fry idea", "slow cook idea"
  ],

  // 54. Space (10)
  space: [
    "space talk", "astronomy chat", "rocket chat", "satellite chat", "mars talk",
    "moon talk", "black hole chat", "supernova chat", "exoplanet chat", "space station chat"
  ],

  // 55. Ocean (10)
  ocean: [
    "ocean talk", "sea chat", "marine life chat", "coral reef chat", "diving chat",
    "whale chat", "dolphin chat", "tide talk", "wave talk", "deep sea talk"
  ],

  // 56. Disasters (10)
  disasters: [
    "storm alert talk", "flood prep talk", "earthquake prep talk", "wildfire prep talk", "cyclone prep talk",
    "tsunami prep talk", "evacuation tip", "emergency kit tip", "first aid tip", "disaster safety talk"
  ],

  // 57. School (10)
  school: [
    "homework help plan", "exam prep plan", "teacher talk", "classmate talk", "school project help",
    "notes help", "study schedule", "marks anxiety", "class test prep", "school tips"
  ],

  // 58. College (10)
  college: [
    "college life", "campus tips", "hostel tips", "club join tips", "internship hunt",
    "placement prep", "college fest talk", "semester plan", "credits help", "professor office hour"
  ],

  // 59. Career (12)
  career: [
    "career advice", "promotion tips", "interview tips", "resume tips", "cover letter tips",
    "networking tips", "linkedin tips", "negotiation tips", "portfolio tips", "career switch tips", "manager talk", "team lead talk"
  ],

  // 60. Life hacks (10)
  lifeHacks: [
    "life hack", "productivity hack", "study hack", "cleaning hack", "travel hack",
    "cooking hack", "money hack", "phone hack", "email hack", "focus hack"
  ],

  // 61. Trivia (10)
  trivia: [
    "trivia", "quiz me", "ask me trivia", "pop quiz", "knowledge check",
    "quick quiz", "true or false", "multiple choice quiz", "quiz time", "trivia time"
  ],

  // 62. Quotes (10)
  quotes: [
    "quote", "give me a quote", "daily quote", "motivational quote request", "philosophy quote request",
    "success quote request", "life quote request", "wisdom quote request", "inspirational quote request", "short quote request"
  ],

  // 63. Poetry (10)
  poetry: [
    "poem", "write a poem", "short poem", "funny poem", "love poem",
    "tech poem", "haiku please", "poetry time", "rhyme please", "verse please"
  ],

  // 64. Accents (10)
  accents: [
    "accent help", "pronunciation help", "speak clearly help", "english accent help", "neutral accent help",
    "how to pronounce", "say this word", "sound natural help", "intonation help", "stress pattern help"
  ],

  // 65. Emotions (10)
  emotions: [
    "feelings talk", "emotion talk", "mood talk", "i feel weird", "i feel off",
    "emotional support", "mood checkin", "i feel confused", "mixed feelings", "i feel numb"
  ],

  // 66. Dating (10)
  dating: [
    "dating tips", "first date tips", "conversation starters date", "texting tips date", "red flags dating",
    "green flags dating", "dating app tips", "profile tips dating", "how to ask out", "how to flirt"
  ],

  // 67. Festivals (10)
  festivals: [
    "festival wishes", "happy diwali", "happy holi", "eid mubarak", "merry christmas",
    "happy new year", "pongal wishes", "onam wishes", "navratri wishes", "ganesh chaturthi wishes"
  ],

  // 68. Birthday (8)
  birthday: [
    "happy birthday to me", "it’s my birthday", "its my birthday", "birthday today",
    "birthday coming", "birthday help", "birthday wish", "birthday vibes"
  ],

  // 69. Gifts (10)
  gifts: [
    "gift ideas", "present ideas", "surprise ideas", "what to gift", "personalized gift ideas",
    "last minute gift", "budget gift", "handmade gift", "gift for friend", "gift for partner"
  ],

  // 70. Climate (10)
  climate: [
    "climate change", "global warming", "carbon footprint tip", "sustainable living tip", "eco friendly tip",
    "renewable energy talk", "green habits", "climate action", "reusable tip", "reduce waste tip"
  ],

  // 71. Environment (10)
  environment: [
    "plant a tree tip", "recycle tip", "composting tip", "nature walk", "clean up drive",
    "eco volunteer", "save water tip", "save electricity tip", "plastic free tip", "zero waste tip"
  ],

  // 72. Volunteer (8)
  volunteer: [
    "volunteer work", "charity idea", "where to volunteer", "community service idea",
    "ngo help", "donation idea", "help others idea", "teach kids volunteer"
  ],

  // 73. Politics (10)
  politics: [
    "election talk", "vote talk", "policy talk", "government talk", "civic duty talk",
    "public debate talk", "local council talk", "budget speech talk", "parliament talk", "democracy talk"
  ],

  // 74. War & Peace (8)
  warPeace: [
    "war talk", "peace talk", "treaty talk", "conflict talk",
    "diplomacy talk", "ceasefire talk", "humanitarian talk", "reconstruction talk"
  ],

  // 75. Law (10)
  law: [
    "law talk", "legal rights talk", "consumer rights talk", "contract tip", "legal help idea",
    "rent agreement tip", "privacy rights talk", "cyber law talk", "ip rights talk", "report complaint tip"
  ],

  // 76. Traffic (8)
  traffic: [
    "traffic jam", "road delay", "late due to traffic", "shortcut idea",
    "best route idea", "parking trouble", "fuel saving drive", "carpool idea"
  ],

  // 77. Discounts (10)
  discounts: [
    "discount tips", "sale tips", "coupon tips", "festival sale tip", "deal stack tip",
    "cashback tip", "price drop alert", "student discount tip", "bundle deal tip", "subscribe and save tip"
  ],

  // 78. Scams (10)
  scams: [
    "scam alert", "phishing alert", "otp scam", "loan scam", "crypto scam",
    "investment scam", "job scam", "romance scam", "tech support scam", "delivery scam"
  ],

  // 79. Medical (10)
  medical: [
    "doctor talk", "hospital talk", "medicine talk", "symptom talk", "first aid help",
    "health check tip", "vaccination tip", "rehydration tip", "fever tip", "injury tip"
  ],

  // 80. Mindfulness (10)
  mindfulness: [
    "mindfulness", "meditate tip", "breathe exercise", "body scan tip", "gratitude exercise",
    "mindful walk", "mindful eating", "journaling tip", "unplug tip", "reflect tip"
  ],

  // 81. Yoga (8)
  yoga: [
    "yoga", "sun salutation", "child pose", "downward dog", "warrior pose",
    "balance pose", "yoga routine", "yoga beginner tip"
  ],

  // 82. Podcast (8)
  podcast: [
    "podcast", "podcast rec", "audio show rec", "radio show rec",
    "interview podcast rec", "story podcast rec", "news podcast rec", "learning podcast rec"
  ],

  // 83. Photography (10)
  photography: [
    "photography tips", "camera tips", "smartphone photo tips", "exposure tips", "shutter speed tips",
    "iso tips", "composition tips", "portrait tips", "landscape tips", "street photo tips"
  ],

  // 84. Drawing (10)
  drawing: [
    "drawing tips", "sketching tips", "line art tips", "perspective tips", "anatomy tips",
    "gesture drawing tips", "shading tips", "inking tips", "character design tips", "illustration tips"
  ],

  // 85. Writing (10)
  writing: [
    "writing tips", "blog tips", "journal tips", "outline tips", "edit tips",
    "writer’s block help", "creative writing tips", "copywriting tips", "story idea tips", "hook line tips"
  ],

  // 86. Diets (10)
  diets: [
    "diet plan help", "keto idea", "vegan idea", "vegetarian idea", "mediterranean diet idea",
    "high protein idea", "balanced diet idea", "calorie deficit tip", "macro count tip", "meal timing tip"
  ],

  // 87. Festive foods (8)
  festiveFoods: [
    "festive menu", "holiday recipe", "party snacks idea", "potluck idea",
    "family recipe idea", "sweet treats idea", "savory treats idea", "quick festive dish"
  ],

  // 88. Subjects (10)
  subjects: [
    "math subject talk", "physics subject talk", "chemistry subject talk", "biology subject talk", "history subject talk",
    "geography subject talk", "economics subject talk", "cs subject talk", "english subject talk", "hindi subject talk"
  ],

  // 89. Astronomy (8)
  astronomy: [
    "telescope talk", "galaxy talk", "nebula talk", "comet talk",
    "meteor shower talk", "constellation talk", "planet talk", "star talk"
  ],

  // 90. Diving (8)
  diving: [
    "scuba talk", "snorkel talk", "dive spot talk", "wetsuit talk",
    "buoyancy tip", "underwater photo tip", "dive buddy tip", "reef etiquette tip"
  ],

  // 91. Extreme sports (8)
  extremeSports: [
    "skydiving talk", "bungee talk", "surfing talk", "whitewater talk",
    "wingsuit talk", "mtb downhill talk", "climbing talk", "parkour talk"
  ],

  // 92. Puzzles (10)
  puzzles: [
    "riddle please", "logic puzzle please", "math puzzle please", "word puzzle please", "brain teaser please",
    "puzzle time", "give puzzle", "another puzzle", "escape room puzzle", "cryptogram puzzle"
  ],

  // 93. Crime & mystery (8)
  crimeMystery: [
    "mystery talk", "detective talk", "crime story talk", "cold case talk",
    "plot twist talk", "whodunnit talk", "forensics talk", "clue analysis talk"
  ],

  // 94. Paranormal (8)
  paranormal: [
    "ghost story talk", "haunted place talk", "paranormal talk", "spooky story talk",
    "spirit talk", "ouija talk", "supernatural talk", "strange event talk"
  ],
};

// --- Build a global phrase -> intent map with uniqueness guard ---
const PHRASE_TO_INTENT = new Map();
const ALL_PHRASES = [];

for (const [intent, phrases] of Object.entries(INTENT_TRIGGERS)) {
  phrases.forEach((pRaw) => {
    const phrase = pRaw.toLowerCase().trim();
    if (!PHRASE_TO_INTENT.has(phrase)) {
      PHRASE_TO_INTENT.set(phrase, intent);
      ALL_PHRASES.push(phrase);
    } else {
      // Duplicate detected — ignored intentionally to keep uniqueness
      // console.warn(`[DEDUPED] "${phrase}" already assigned to ${PHRASE_TO_INTENT.get(phrase)}`);
    }
  });
}

// Utility to match by inclusion of any registered phrase (prioritize longest)
const SORTED_PHRASES = ALL_PHRASES.sort((a, b) => b.length - a.length);

/**
 * Try to resolve intent from user input.
 * - Case-insensitive
 * - Finds the first phrase that appears in the text (longest phrases checked first to reduce accidental overlaps)
 */
function resolveIntent(text) {
  const t = text.toLowerCase();
  for (const phrase of SORTED_PHRASES) {
    if (t.includes(phrase)) {
      return PHRASE_TO_INTENT.get(phrase);
    }
  }
  return null;
}

// --- Name extraction (simple) ---
function tryCaptureName(text) {
  const t = text.toLowerCase();
  const markers = [
    "my name is",
    "i am called",
    "i’m called",
    "im called",
    "call me",
    "i go by",
    "name is",
    "aka ",
  ];
  for (const m of markers) {
    const idx = t.indexOf(m);
    if (idx !== -1) {
      const after = text.slice(idx + m.length).trim();
      const token = after.split(/[,.!?\-_/\\|:;()\[\]{}<>\n\r\t ]+/).filter(Boolean)[0];
      if (token) {
        return cap(token.replace(/[^a-zA-Z0-9\-’'`]/g, ""));
      }
    }
  }
  return null;
}

// --- Public API ---
export function getBotResponse(inputRaw) {
  const input = (inputRaw || "").trim();

  // Capture name (side effect + friendly reply)
  const maybeName = tryCaptureName(input);
  if (maybeName) {
    userName = maybeName;
    return rand(REPLIES.selfIntro).replace("!", `, ${userName}!`);
  }

  // Resolve intent via unique phrases
  const intent = resolveIntent(input);

  if (intent && REPLIES[intent]) {
    const msg = rand(REPLIES[intent]);
    if (userName && /(^|\s)(hi|hello|hey|yo|greetings|howdy)/i.test(input)) {
      // Light personalization for greeting-y inputs
      return msg.replace(/!$/, `, ${userName}!`);
    }
    // Special dynamic responses
    if (intent === "timeDate") {
      return rand(REPLIES.timeDate);
    }
    return msg;
  }

  // Fallback small talk
  return rand([
    userName ? `Tell me more, ${userName}.` : "Tell me more.",
    "That’s interesting — want to dive deeper?",
    "Hmm, I’m listening. Go on.",
    "Got it. What else?",
    "Curious! Say more.",
  ]);
}

// --- Optional: export counts for sanity/debug ---
export const UNIQUE_TRIGGER_COUNT = PHRASE_TO_INTENT.size;
export const UNIQUE_INTENTS = Object.keys(INTENT_TRIGGERS).length;

// Uncomment to verify (in node):
// console.log("Unique intents:", UNIQUE_INTENTS);
// console.log("Unique trigger phrases:", UNIQUE_TRIGGER_COUNT);

