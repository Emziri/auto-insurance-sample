const express = require("express");
const PORT = process.env.PORT || 8080; // TODO README: port locations

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// TODO -- comment out routes not used after complete, mention they're for testing
app.use('/api/people', require('./people/person.controller'));
app.use('/api/vehicles', require('./vehicles/vehicle.controller'));
app.use('/api/addresses', require('./addresses/address.controller'));
app.use('/api/applications', require('./applications/application.controller'));

app.listen(PORT, () => {
  console.log(`Server istening on port: ${PORT}`);
});