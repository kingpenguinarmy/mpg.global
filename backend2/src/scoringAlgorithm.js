const { calculateMatchScore } = require('./matchingcriteria');

module.exports.findBestMatches = function(client, freelancers) {
  const scores = freelancers.map(freelancer => {
    return {
      freelancerId: freelancer.id,
      score: calculateMatchScore(client, freelancer),
    };
  });

  // Sort freelancers by score in descending order
  return scores.sort((a, b) => b.score - a.score);
};
