const { findBestMatches } = require('./scoringAlgorithm');
const { cleanData } = require('./dataPreparation');

app.post('/runMatching', (req, res) => {
  // Assume you get an array of freelancers and one client from the request body
  const { client, freelancers } = req.body;

  // Clean the data first
  const cleanedClient = cleanData(client);
  const cleanedFreelancers = freelancers.map(cleanData);

  // Run the algorithm
  const scores = findBestMatches(cleanedClient, cleanedFreelancers);

  // Store these scores in the database (implement this part)
  // ...

  // Send back the best matches as a response
  res.json(scores);
});
