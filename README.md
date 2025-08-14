# SmartBot 💬

A minimalist, responsive React chatbot UI with dark/light mode, smooth animations, and a friendly AI assistant experience.

---

## Features

- Responsive chat interface with message bubbles
- Dark and light mode toggle with animated icons
- Background gradient changes with theme
- Smooth scrolling to the latest message
- Plays a ding sound on sending message
- Persistent chat history saved in localStorage (optional)
- Footer with GitHub icon and link
- Uses [React Icons](https://react-icons.github.io/react-icons/) for icons
- Custom font: Syne Mono from Google Fonts

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SRCarlo/react-SmartBot.git
cd SmartBot
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

---

## Usage

- Type your message in the input box and press Send or hit Enter.
- Use the sun/moon icon on the top right to toggle between light and dark themes.
- Scroll through the chat messages. The latest message will scroll into view automatically.
- Footer contains a link to the GitHub repository.

---

## - Project Structure

- src/components/ChatWindow.jsx
  — Displays the chat messages and handles scroll behavior.
- src/components/MessageBubble.jsx
  — Renders individual chat bubbles with styles.
- src/components/Footer.jsx
  — Footer with GitHub icon and copyright.
- src/botLogic.js
  — Simple bot logic responding to user input.
- src/App.jsx
  — Main app component managing state and UI.
- public/ding.mp3
  — Sound played on sending a message.

---

## Customization

- Modify bot responses in botLogic.js.
- Adjust colors and fonts via Tailwind classes.
- Replace the sound file in public/ding.mp3 to customize the send sound.

---

## Dependencies

- React
- React Icons
- Tailwind CSS
- Google Fonts (Syne Mono)

---

## License

MIT License © 2025 SRCarlo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Contact

If you have any questions, suggestions, or just want to say hi, reach out to me at:

📧 asphaltshubhuu@gmail.com

---
## Author

**SRCarlo**

🔗 [GitHub Profile](https://github.com/SRCarlo)

---

