const express = require("express");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/applications', require('./applications/application.controller'));

// These commented out routes were useful during testing
// app.use('/api/people', require('./people/person.controller'));
// app.use('/api/vehicles', require('./vehicles/vehicle.controller'));
// app.use('/api/addresses', require('./addresses/address.controller'));

app.listen(PORT, () => {
  console.log(`Server istening on port: ${PORT}`);
});