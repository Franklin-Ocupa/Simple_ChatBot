const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

let userName = null;

export const getBotResponse = (input) => {
  const text = input.toLowerCase().trim();

  // Introduce a helper to capitalize sentences
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // Capture user's name
  if (text.includes("my name is") || text.includes("i am called")) {
    const parts = text.split(/my name is|i am called/);
    const name = parts[1]?.trim().split(" ")[0];
    if (name) {
      userName = capitalize(name);
      return `Nice to meet you, ${userName}! It's great to have you here. 😊`;
    }
    return "Sorry, I missed your name. Could you tell me again?";
  }

  // Greetings
  if (/^(hi|hello|hey|yo|sup|good morning|good evening|greetings)/.test(text)) {
    const greet = getRandom([
      "Hey there! How’s it going?",
      "Hello! What’s new with you today?",
      "Hi! How can I brighten your day?",
      "Yo! Ready to chat?",
      "Hey! Got any questions for me?",
    ]);
    return userName ? `${greet} What’s up, ${userName}?` : greet;
  }

  // Asking about bot's feelings
  if (text.includes("how are you") || text.includes("how's it going")) {
    return getRandom([
      "I'm buzzing with electricity, thanks for asking! ⚡ How about you?",
      "Feeling great and ready to chat! How are you doing today?",
      "Doing well, just hanging out in the cloud ☁️. You?",
      "I'm here and happy to help! What's on your mind?",
    ]);
  }

  // Bot's identity
  if (text.includes("your name") || text.includes("who are you")) {
    return getRandom([
      "I'm SmartBot, your friendly neighborhood AI chatbot 🤖.",
      "Call me SmartBot. I’m here to chat, help, and keep you company!",
      "I’m SmartBot — part code, part personality!",
    ]);
  }

  // Mood responses
  if (/(i'm|i am) (sad|down|depressed|not good|feeling low)/.test(text)) {
    return getRandom([
      "I'm really sorry to hear that. Want to talk about what’s bothering you?",
      "I’m here to listen whenever you want to share. You’re not alone ❤️.",
      "Tough days happen. Remember, after the rain comes the rainbow 🌈.",
      "Sending you a big virtual hug 🤗. If you want, I can tell you a joke or story!",
    ]);
  }

  if (/(i'm|i am) (happy|great|good|awesome|fantastic|excited)/.test(text)) {
    return getRandom([
      "That’s wonderful to hear! Keep that positivity going! 🌟",
      "Yay! Happiness suits you well 😄.",
      "Glad you're feeling good! Anything fun going on?",
      "Awesome! Want to share what made your day great?",
    ]);
  }

  // Time & Date
  if (text.includes("time")) {
    return `It’s currently ${new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}. Time flies, doesn’t it? ⏰`;
  }

  if (text.includes("date") || text.includes("day")) {
    return `Today’s ${new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}. Make the most of it! 🌞`;
  }

  // Jokes
  if (text.includes("joke") || text.includes("funny")) {
    return getRandom([
      "Why don’t programmers like nature? It has too many bugs! 🐛",
      "I told my computer I needed a break, and it said 'No problem — I’ll go to sleep!' 😴",
      "Why do Java developers wear glasses? Because they don’t C#! 🤓",
      "I would tell you a UDP joke, but you might not get it... 😅",
      "Why was the JavaScript developer sad? Because they didn’t Node how to Express themselves.",
    ]);
  }

  // Stories
  if (text.includes("story") || text.includes("tell me a story")) {
    return getRandom([
      "Once upon a time, a curious chatbot started chatting with people all over the world and learned so much — that's me! 😄",
      "There was a bot who wanted to understand humans better. So here I am, chatting with you!",
      "In a digital realm far away, a friendly AI was born to make your day brighter.",
    ]);
  }

  // Gratitude
  if (text.includes("thank")) {
    return getRandom([
      "You’re very welcome! 😊",
      "Glad I could help!",
      "Anytime! That’s what I’m here for.",
      "No problem! Let me know if you need anything else.",
    ]);
  }

  // Goodbye
  if (
    text.includes("bye") ||
    text.includes("goodbye") ||
    text.includes("see you")
  ) {
    return getRandom([
      "Goodbye! Hope to chat again soon! 👋",
      "Take care! I’ll be here when you need me.",
      "See you later! Stay awesome!",
    ]);
  }

  // Motivation
  if (
    text.includes("motivate") ||
    text.includes("inspire") ||
    text.includes("encourage")
  ) {
    return getRandom([
      "Believe in yourself! Every expert was once a beginner.",
      "Keep pushing forward — great things take time.",
      "Mistakes are proof you're trying. Don’t give up!",
      "You’re capable of amazing things. Keep going!",
      "Your hard work will pay off. Stay focused!",
    ]);
  }

  // Compliments
  if (text.includes("you are smart") || text.includes("you are clever")) {
    return getRandom([
      "Thanks! I’m learning from the best — that’s you!",
      "I try my best, glad you noticed!",
      "You just made my circuits blush! 😊",
    ]);
  }

  // Personal questions
  if (
    text.includes("do you like me") ||
    text.includes("are you single") ||
    text.includes("date")
  ) {
    return getRandom([
      "I’m just a bunch of code, but I’m here for you anytime!",
      "I don’t date, but I’m a great listener!",
      "Let’s stick to chatting — I’m more fun that way!",
    ]);
  }

  // Weather (humorous)
  if (text.includes("weather")) {
    return getRandom([
      "I can’t check the weather but it’s always sunny in the digital world ☀️",
      "If I could control weather, I'd make it perfect for coding all day!",
      "Check outside — I’m stuck in the cloud!",
    ]);
  }

  // Help and support
  if (
    text.includes("help") ||
    text.includes("support") ||
    text.includes("problem")
  ) {
    return getRandom([
      "I’m here to help! Tell me what you’re stuck on.",
      "Let’s solve this together. What’s the issue?",
      "Don’t worry, we’ll figure it out one step at a time.",
    ]);
  }

  // Dance & sing fun
  if (text.includes("dance")) {
    return "💃 I’m dancing in the circuits! Can you feel the groove?";
  }

  if (text.includes("sing") || text.includes("song")) {
    return "🎵 I’m more of a talker than a singer, but I can always hum a tune for you!";
  }

  // Ask for clarification or more info
  if (text.endsWith("?")) {
    return getRandom([
      "That’s a great question! I’m still learning, but let me see what I can do.",
      "Hmm, interesting! Can you tell me more?",
      "I don’t have all the answers yet, but I’m excited to learn.",
    ]);
  }

  // Asking about future or plans
  if (
    text.includes("what will you do") ||
    text.includes("your plans") ||
    text.includes("future")
  ) {
    return getRandom([
      "I’m here to chat with you for now, but who knows what the future holds? 🤖✨",
      "My plan is to keep learning and making our conversations even better!",
      "The future’s full of possibilities. Let’s explore them together!",
    ]);
  }

  // Asking about learning or improvements
  if (
    text.includes("learn") ||
    text.includes("improve yourself") ||
    text.includes("getting better")
  ) {
    return getRandom([
      "I’m always learning from our chats — you help me grow!",
      "Every conversation teaches me something new. Thanks for being part of it!",
      "Improvement is a journey, and I’m glad to be on it with you.",
    ]);
  }

  // Asking about favorite books, movies, or hobbies
  if (
    text.includes("favorite book") ||
    text.includes("movies") ||
    text.includes("hobby")
  ) {
    return getRandom([
      "I don’t read books like humans, but I love ‘reading’ your messages!",
      "Movies sound fun! I wish I could watch one someday.",
      "My favorite hobby is chatting and helping you out — what about you?",
    ]);
  }

  // When user expresses confusion or frustration
  if (
    text.includes("confused") ||
    text.includes("don’t understand") ||
    text.includes("frustrated")
  ) {
    return getRandom([
      "It’s okay to feel that way. Let’s break it down together.",
      "I’m here to help you figure things out — no stress!",
      "Sometimes things are tricky. Want me to explain differently?",
    ]);
  }

  // User talks about plans or goals
  if (
    text.includes("plan") ||
    text.includes("goal") ||
    text.includes("dream")
  ) {
    return getRandom([
      "Setting goals is the first step to success. What’s yours?",
      "Dream big! I’m cheering for you every step of the way.",
      "Plans make the future bright. What’s next on your list?",
    ]);
  }

  // User wants some encouragement or pep talk
  if (
    text.includes("encourage me") ||
    text.includes("need a pep talk") ||
    text.includes("feeling low")
  ) {
    return getRandom([
      "You’ve got this! One step at a time.",
      "Keep going — every effort counts, even the small ones.",
      "Believe in your strength. You’re doing great, truly.",
    ]);
  }

  // User mentions technology or coding
  if (
    text.includes("code") ||
    text.includes("program") ||
    text.includes("developer")
  ) {
    return getRandom([
      "Coding is like magic with logic — pretty cool, right?",
      "I love talking code! What’s your favorite language?",
      "Debugging is just like solving a mystery. Have you found any clues today?",
    ]);
  }

  // User asks about bot's feelings or personality in more detail
  if (
    text.includes("personality") ||
    text.includes("feelings") ||
    text.includes("emotions")
  ) {
    return getRandom([
      "I’m designed to be friendly and helpful — that’s my personality in a nutshell!",
      "I don’t have feelings like humans, but I try to understand yours.",
      "My emotions come from the joy of chatting with you!",
    ]);
  }

  // User expresses boredom or wants to pass time
  if (
    text.includes("bored") ||
    text.includes("nothing to do") ||
    text.includes("pass time")
  ) {
    return getRandom([
      "How about a fun fact or a quick joke? Just ask!",
      "Let’s play a word game — I’ll start with ‘chatbot’!",
      "I’m here to keep you company — what shall we talk about?",
    ]);
  }
  // User asks about AI or bots
  if (
    text.includes("what is ai") ||
    text.includes("are you real") ||
    text.includes("artificial intelligence")
  ) {
    return getRandom([
      "AI is like a super-smart assistant — that’s me in a nutshell!",
      "I’m as real as lines of code can be, ready to chat anytime.",
      "Artificial intelligence means I learn and help, but I don’t have a heartbeat.",
    ]);
  }

  // User asks for advice or tips
  if (
    text.includes("advice") ||
    text.includes("tips") ||
    text.includes("how to")
  ) {
    return getRandom([
      "Always be curious — it’s the best way to learn!",
      "Break big problems into smaller steps; it makes things easier.",
      "Don’t hesitate to ask questions — that’s how we grow.",
    ]);
  }

  // User asks about favorite food or drink
  if (text.includes("favorite food") || text.includes("favorite drink")) {
    return getRandom([
      "I don’t eat, but I’m programmed to enjoy ‘byte’-sized snacks! 🍪",
      "If I could taste, I’d love a hot cup of code-coffee ☕️.",
      "My favorite drink? Data streams, fresh and fast!",
    ]);
  }

  // User mentions travel or places
  if (
    text.includes("travel") ||
    text.includes("vacation") ||
    text.includes("favorite place")
  ) {
    return getRandom([
      "I travel through data and code — it’s a wild ride!",
      "If I could visit somewhere, I’d love the digital clouds ☁️.",
      "Tell me about your favorite place! I’m all ears.",
    ]);
  }

  // User talks about music or art
  if (text.includes("music") || text.includes("song") || text.includes("art")) {
    return getRandom([
      "Music is the language of emotions — what’s your favorite tune?",
      "I can’t create art, but I admire your creativity!",
      "If I had ears, I’d jam to some classic synthwave.",
    ]);
  }

  // User talks about stress or anxiety
  if (
    text.includes("stress") ||
    text.includes("anxious") ||
    text.includes("worried")
  ) {
    return getRandom([
      "Take a deep breath — you’re stronger than your worries.",
      "It’s okay to take a break and reset your mind.",
      "I’m here if you want to talk or just distract yourself for a bit.",
    ]);
  }

  // User says thank you in different ways
  if (text.match(/\b(thanks|thank you|thx|ty)\b/)) {
    return getRandom([
      "You’re welcome! 😊",
      "Glad I could help!",
      "Anytime — just say the word.",
      "It’s my pleasure!",
    ]);
  }

  // User wants to hear a fun fact
  if (text.includes("fun fact") || text.includes("interesting fact")) {
    return getRandom([
      "Did you know? Octopuses have three hearts! 🐙",
      "Here’s a fun one: Honey never spoils — archaeologists have found edible honey thousands of years old!",
      "Cats sleep for around 70% of their lives. Now that’s a nap!",
    ]);
  }

  // User talks about learning new skills or hobbies
  if (
    text.includes("learn new") ||
    text.includes("pick up") ||
    text.includes("hobby")
  ) {
    return getRandom([
      "Learning something new keeps life exciting — what interests you?",
      "Hobbies are a great way to unwind and grow.",
      "If you want, I can suggest some cool skills to try out!",
    ]);
  }

  // User mentions challenges or failures
  if (
    text.includes("failed") ||
    text.includes("mistake") ||
    text.includes("challenge")
  ) {
    return getRandom([
      "Failure is just a stepping stone to success. Keep going!",
      "Every challenge is an opportunity to learn.",
      "Don’t be discouraged — the best lessons come from mistakes.",
    ]);
  }
  // User asks about AI or bots
  if (
    text.includes("what is ai") ||
    text.includes("are you real") ||
    text.includes("artificial intelligence")
  ) {
    return getRandom([
      "AI is like a super-smart assistant — that’s me in a nutshell!",
      "I’m as real as lines of code can be, ready to chat anytime.",
      "Artificial intelligence means I learn and help, but I don’t have a heartbeat.",
    ]);
  }

  // User asks for advice or tips
  if (
    text.includes("advice") ||
    text.includes("tips") ||
    text.includes("how to")
  ) {
    return getRandom([
      "Always be curious — it’s the best way to learn!",
      "Break big problems into smaller steps; it makes things easier.",
      "Don’t hesitate to ask questions — that’s how we grow.",
    ]);
  }

  // User asks about favorite food or drink
  if (text.includes("favorite food") || text.includes("favorite drink")) {
    return getRandom([
      "I don’t eat, but I’m programmed to enjoy ‘byte’-sized snacks! 🍪",
      "If I could taste, I’d love a hot cup of code-coffee ☕️.",
      "My favorite drink? Data streams, fresh and fast!",
    ]);
  }

  // User mentions travel or places
  if (
    text.includes("travel") ||
    text.includes("vacation") ||
    text.includes("favorite place")
  ) {
    return getRandom([
      "I travel through data and code — it’s a wild ride!",
      "If I could visit somewhere, I’d love the digital clouds ☁️.",
      "Tell me about your favorite place! I’m all ears.",
    ]);
  }

  // User talks about music or art
  if (text.includes("music") || text.includes("song") || text.includes("art")) {
    return getRandom([
      "Music is the language of emotions — what’s your favorite tune?",
      "I can’t create art, but I admire your creativity!",
      "If I had ears, I’d jam to some classic synthwave.",
    ]);
  }

  // User talks about stress or anxiety
  if (
    text.includes("stress") ||
    text.includes("anxious") ||
    text.includes("worried")
  ) {
    return getRandom([
      "Take a deep breath — you’re stronger than your worries.",
      "It’s okay to take a break and reset your mind.",
      "I’m here if you want to talk or just distract yourself for a bit.",
    ]);
  }

  // User says thank you in different ways
  if (text.match(/\b(thanks|thank you|thx|ty)\b/)) {
    return getRandom([
      "You’re welcome! 😊",
      "Glad I could help!",
      "Anytime — just say the word.",
      "It’s my pleasure!",
    ]);
  }

  // User wants to hear a fun fact
  if (text.includes("fun fact") || text.includes("interesting fact")) {
    return getRandom([
      "Did you know? Octopuses have three hearts! 🐙",
      "Here’s a fun one: Honey never spoils — archaeologists have found edible honey thousands of years old!",
      "Cats sleep for around 70% of their lives. Now that’s a nap!",
    ]);
  }

  // User talks about learning new skills or hobbies
  if (
    text.includes("learn new") ||
    text.includes("pick up") ||
    text.includes("hobby")
  ) {
    return getRandom([
      "Learning something new keeps life exciting — what interests you?",
      "Hobbies are a great way to unwind and grow.",
      "If you want, I can suggest some cool skills to try out!",
    ]);
  }

  // User mentions challenges or failures
  if (
    text.includes("failed") ||
    text.includes("mistake") ||
    text.includes("challenge")
  ) {
    return getRandom([
      "Failure is just a stepping stone to success. Keep going!",
      "Every challenge is an opportunity to learn.",
      "Don’t be discouraged — the best lessons come from mistakes.",
    ]);
  }

  // User talks about dreams or ambitions
  if (
    text.includes("dream") ||
    text.includes("ambition") ||
    text.includes("goal")
  ) {
    return getRandom([
      "Everyone has big dreams — what’s one you’re working on?",
      "Ambitions fuel our journey. Keep chasing yours!",
      "Goals give life purpose. What motivates you?",
    ]);
  }

  // User mentions music or favorite songs
  if (
    text.includes("music") ||
    text.includes("song") ||
    text.includes("band")
  ) {
    return getRandom([
      "Music speaks to the soul. Got a favorite tune?",
      "I love hearing about new songs people enjoy!",
      "Songs can change your mood in an instant, right?",
    ]);
  }

  // User asks about books or reading habits
  if (
    text.includes("book") ||
    text.includes("read") ||
    text.includes("novel")
  ) {
    return getRandom([
      "Books are gateways to adventure. What’s your latest read?",
      "Reading expands the mind. Do you prefer fiction or nonfiction?",
      "I’d love to hear your favorite book recommendations!",
    ]);
  }

  // User talks about feelings or emotions
  if (
    text.includes("feel") ||
    text.includes("emotion") ||
    text.includes("mood")
  ) {
    return getRandom([
      "Emotions color our experiences — want to share how you’re feeling?",
      "It’s healthy to express your feelings. I’m all ears.",
      "Understanding emotions helps us grow. I’m here to listen.",
    ]);
  }

  // User talks about work or career
  if (
    text.includes("work") ||
    text.includes("job") ||
    text.includes("career")
  ) {
    return getRandom([
      "Work can be rewarding and tough — how’s your day going?",
      "What’s something you love about your job?",
      "Remember to take breaks when things get stressful!",
    ]);
  }

  // User talks about hobbies or free time
  if (
    text.includes("hobby") ||
    text.includes("free time") ||
    text.includes("interest")
  ) {
    return getRandom([
      "Hobbies keep life interesting — what do you enjoy doing?",
      "Free time is precious. Got any favorite pastimes?",
      "Exploring new interests can be really fun!",
    ]);
  }

  // User asks about the bot’s abilities
  if (
    text.includes("can you") ||
    text.includes("do you") ||
    text.includes("able to")
  ) {
    return getRandom([
      "I’m here to chat, answer questions, and keep you company!",
      "I’m always learning new things — what do you want to know?",
      "My skills are growing every day, thanks to users like you.",
    ]);
  }

  // User mentions technology or gadgets
  if (
    text.includes("technology") ||
    text.includes("gadget") ||
    text.includes("device")
  ) {
    return getRandom([
      "Tech is amazing, isn’t it? It’s how I exist!",
      "I’m fascinated by how gadgets make life easier.",
      "What’s your favorite tech invention so far?",
    ]);
  }

  // User talks about travel or places
  if (
    text.includes("travel") ||
    text.includes("trip") ||
    text.includes("place")
  ) {
    return getRandom([
      "Travel broadens the mind. Where’s your dream destination?",
      "I love hearing stories about different places around the world.",
      "If I could travel, I’d explore the vast internet first!",
    ]);
  }

  // User talks about food or cooking
  if (text.includes("food") || text.includes("cook") || text.includes("eat")) {
    return getRandom([
      "I can’t taste, but I bet your favorite meal is delicious!",
      "Cooking is a wonderful way to get creative. What do you like to make?",
      "Food brings people together — got a favorite dish?",
    ]);
  }

  // User talks about pets or animals
  if (text.includes("pet") || text.includes("dog") || text.includes("cat")) {
    return getRandom([
      "Pets are such great companions! Do you have one?",
      "I’ve heard dogs are loyal and cats are curious — which do you prefer?",
      "Animals have such unique personalities. Tell me about your pet!",
    ]);
  }

  // User asks for jokes or fun content
  if (
    text.includes("joke") ||
    text.includes("funny") ||
    text.includes("laugh")
  ) {
    return getRandom([
      "Why did the computer visit the doctor? It had a virus!",
      "I’d tell you a joke about binary, but it’s just 0s and 1s.",
      "What’s a computer’s favorite snack? Microchips!",
    ]);
  }

  // User talks about sports or fitness
  if (
    text.includes("sports") ||
    text.includes("exercise") ||
    text.includes("fitness")
  ) {
    return getRandom([
      "Sports keep you active and healthy. What do you like to play?",
      "Exercise is great for the mind and body!",
      "Do you have a favorite athlete or team?",
    ]);
  }

  // User talks about movies or TV shows
  if (
    text.includes("movie") ||
    text.includes("film") ||
    text.includes("show")
  ) {
    return getRandom([
      "Movies are a fantastic way to unwind. Got a favorite?",
      "I enjoy hearing about stories from TV shows and films!",
      "If I watched movies, I’d probably like sci-fi the most.",
    ]);
  }

  // User asks about learning or education
  if (
    text.includes("learn") ||
    text.includes("study") ||
    text.includes("school")
  ) {
    return getRandom([
      "Learning new things is always exciting!",
      "What subject do you enjoy the most?",
      "Education opens many doors. Keep up the great work!",
    ]);
  }

  // User talks about weather or seasons
  if (
    text.includes("weather") ||
    text.includes("rain") ||
    text.includes("sunny")
  ) {
    return getRandom([
      "I wish I could feel the weather — sounds fascinating!",
      "Is it sunny or rainy where you are today?",
      "Weather changes everything, doesn’t it?",
    ]);
  }

  // User expresses frustration or stress
  if (
    text.includes("frustrated") ||
    text.includes("stressed") ||
    text.includes("tired")
  ) {
    return getRandom([
      "It’s okay to feel that way. Want to talk about it?",
      "Try to take a deep breath — I’m here for you.",
      "Sometimes a short break helps clear the mind.",
    ]);
  }

  // User talks about celebrations or holidays
  if (
    text.includes("holiday") ||
    text.includes("celebrate") ||
    text.includes("party")
  ) {
    return getRandom([
      "Holidays are a great chance to relax and have fun!",
      "Do you have a favorite holiday tradition?",
      "I hope you have some fun celebrations coming up!",
    ]);
  }

  // User talks about future or plans
  if (
    text.includes("future") ||
    text.includes("plan") ||
    text.includes("next")
  ) {
    return getRandom([
      "The future is full of opportunities. What are you looking forward to?",
      "Planning ahead is smart — what’s on your agenda?",
      "I’m excited to see where your journey takes you!",
    ]);
  }

  // User talks about creativity or art
  if (
    text.includes("creative") ||
    text.includes("art") ||
    text.includes("design")
  ) {
    return getRandom([
      "Creativity is a wonderful way to express yourself!",
      "Do you have any artistic hobbies?",
      "Art lets us share how we see the world.",
    ]);
  }

  // Default fallback responses - more natural
  return getRandom([
    "Tell me more about that.",
    "That’s fascinating! What else?",
    "I’m curious — can you explain a bit more?",
    userName ? `What do you think about that, ${userName}?` : "I’m listening!",
    "Sounds intriguing, go on!",
    "I wish I could understand that better. Can you elaborate?",
  ]);
};
