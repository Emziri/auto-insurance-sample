const express = require("express");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// may need cors??


// routes
app.use('/api/people', require('./people/person.controller'));
app.use('/api/vehicles', require('./vehicles/vehicle.controller'));
app.use('/api/addresses', require('./addresses/address.controller'));
app.use('/api/applications', require('./applications/application.controller'));

// TODO remove this at end
app.get('/api', (req, res) => {
  res.json({ ans: "hellow world" });
})

app.listen(PORT, () => {
  console.log(`Server istening on port: ${PORT}`);
});