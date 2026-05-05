## How to run

### Part 1 - Express server

```bash
cd parte1-express
npm install
npm start
```

Open `http://localhost:3000`. Available routes:
- `GET /` - server alive check
- `GET /info` - course info (JSON)
- `GET /saludo` - welcome message
- `GET /api/status` - server status (JSON)
- `GET /api/student` - student data read from `datos.json`

### Part 2 - React calculator

```bash
cd parte2-calculadora
npm install
npm run dev
```

Open the link Vite shows in the terminal (usually `http://localhost:5173`).

## Calculator changes from the original tutorial

- Full Custom design (dark blue to cyan gradient, soft glass effect on the calculator shell).
- Buttons grouped by function with pastel colors: pink for utility (AC, +/-, DEL), blue for operators, mint green for equals, translucent white for numbers.
- History line on the display showing the previous operand and pending operator.
- Improved logic: handles division by zero as "Error", prevents multiple decimal points, supports DEL (delete last digit) and +/- (sign toggle).
- Window-style header with three colored dots.

## Demo video

Both parts demoed in a single video: https://youtu.be/GVgrmqduRhI
