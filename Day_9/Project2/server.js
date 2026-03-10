const express = require('express');
const loggerMiddleware = require('./middleware/logger');
const testRoutes = require('./routes/testRoutes');

const app = express();
const PORT = 5000;

// Use middleware
app.use(loggerMiddleware);

// Routes
app.use('/api', testRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
