# PFT Score Calculator

This project is a modern, interactive 3.2km run scoring calculator built with **Next.js** and **React**, using official scoring matrices from the Philippine Army Physical Fitness Test. It converts slider inputs into accurate scores based on age, gender, and runtime.

---

## 🚀 Features

* 🎯 Accurate time-to-score mapping based on official matrix
* 🧍 Gender and Age category handling
* 🕘 Runtime selection with minutes and seconds sliders
* 📱 Mobile responsive and modern dark UI
* 🎨 Animated, dynamic score display

---

## 📁 Project Structure

```
├── app/
│   └── page.tsx        # Main scoring calculator UI and logic
├── public/
│   └── (optional assets)
├── tailwind.config.js  # Tailwind setup
├── postcss.config.js
├── package.json
└── README.md           # This file
```

---

## ⚙️ How It Works

* **Score Matrix**: Hardcoded `runScoreMatrix` maps gender and age brackets to time intervals and scores.
* **Input**: Users input runtime (minutes/seconds), age, and gender.
* **Logic**: `runTimeAbsolute` is computed as minutes since midnight, then matched against matrix ranges.

---

## ⌨️ Usage

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open the app:

```
http://localhost:3000
```

---

## 📌 Notes

* Currently supports **male**, **age bracket 21–25**.
* More age brackets and gender mappings can be added in `runScoreMatrix`.
* Time must be in 24-hour minutes (e.g., 09:08 AM = 548 mins).

---

## ✅ To Do

* [ ] Add female matrices and other age brackets
* [ ] Add export to PDF or screenshot
* [ ] Add pass/fail feedback below score

---

## 🛠 Tech Stack

* [Next.js (App Router)](https://nextjs.org)
* [React 18](https://reactjs.org)
* [Tailwind CSS](https://tailwindcss.com)
* \[Radix UI + Headless UI]\([https://www.radix-ui.com](https://www.radix-ui.com), [https://headlessui.dev](https://headlessui.dev))

---

## 👤 Author

Built by \[you] for efficient military physical fitness evaluation. For inquiries or suggestions, open an issue or message directly.
