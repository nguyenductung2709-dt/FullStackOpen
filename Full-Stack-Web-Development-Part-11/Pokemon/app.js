const express = require("express");
const app = express();
app.use(express.static('dist'))


// get the port from env variable
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.send('ok')
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
