# 🧱💧 Water-Brick Calendar

As I prepared for my final exams, I was inspired to create The **Water-Brick Calendar**, an innovative weekly planning app designed to revolutionize how you approach your daily tasks. This app leverages two powerful metaphors: bricks and water.

- 🧱**Bricks** symbolize your daily fixed commitments—essential activities like jogging, reading, and other crucial tasks that keep your routine grounded.
- 💧**Water**, on the other hand, signifies the flexible, fluid tasks that may extend over multiple days, allowing for adaptability and creativity in your planning.

By embracing this dynamic duality, The Water-Brick Calendar not only helps you establish a solid foundation for your daily activities but also empowers you to adjust and redistribute your efforts with ease, making it simple to carry over incomplete tasks without the stress of rigid deadlines. Experience the freedom of balanced planning and take control of your time like never before!

## 🌟 Features

- Each day is displayed as a square grid box
- Fixed tasks appear as "bricks" stacked at the bottom of a day box
- Continuous tasks appear as "water" that flows across multiple days with adjustable percentage allocation
    > Imagine you have a book with 10 chapters. You plan to read chapters 1 through 5 on Monday and finish the rest on Tuesday, which means each day would account for 50% of your reading (having 50% percent of water in "Monday" grid). However, if plans change and you discover you have a party to attend on Monday, you can easily adjust your schedule. Shift the Monday reading from 50% to 30% (changing the amount of water in "Monday" grid), which would mean focusing on chapters 1 to 3. This way, you still make progress without sacrificing your social commitments.
- Clicking a brick triggers an animation of a hammer smashing the brick
- Unfinished "water tasks" can be reallocated to following days via user input
- Each continuous task (water) has its own unique color
- Fluid UI with animations for falling bricks, water redistribution, and editing tasks

## A Feasible Final Solution

![](pic2.png "a feasible final solution")

## 📦 Folder Structure

```
water-brick-calendar/
├── public/
├── src/
│   ├── components/     # UI components (DayBox, Modal, WaterWave, etc.)
│   ├── data/           # Sample task data
│   └── App.jsx         # Main UI entry
├── main/               # Electron (future use)
├── package.json
└── README.md
```

## 🚀 Usage

1. Clone the repo
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

## 🛣️ Roadmap

- [x] Weekly calendar UI with bricks and water
- [x] Brick-smashing animation
- [ ] Basic water animation
- [x] Task editing and adding
- [ ] Monthly view
- [ ] Smart water redistribution
- [ ] Better Background and animation
- [ ] user login

## 👀 Current stage
![](pic1.png "")
