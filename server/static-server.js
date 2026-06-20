const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const publicDir = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Anim web aktif',
    port: PORT
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Anim web online di http://0.0.0.0:${PORT}`);
});
