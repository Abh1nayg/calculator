// Function to calculate and display the love score
function calculateLove() {
    // Display loading message
    alert('Calculating love compatibility...');
    
    // Getting the input values
    let name1 = document.getElementById('name1').value.trim();
    let name2 = document.getElementById('name2').value.trim();
    
    // Validate inputs
    if (name1 === '' || name2 === '') {
      alert('Please enter both names');
      return;
    }
    
    // Generate a score for each name based on the characters
    function calculateNameScore(name) {
      let score = 0;
      
      // Convert name to lowercase to ensure consistency
      name = name.toLowerCase();
      
      for (let i = 0; i < name.length; i++) {
        // Get the character code and use it to generate a value
        let charCode = name.charCodeAt(i);
        // Only count letters (a-z)
        if (charCode >= 97 && charCode <= 122) {
          // Generate a score between 1-10 for each character
          // This uses the character's position in the alphabet plus some randomness
          score += (charCode - 96) * 0.3 + (Math.random() * 5);
        }
      }
      
      return score;
    }
    
    // Calculate scores for both names
    let score1 = calculateNameScore(name1);
    let score2 = calculateNameScore(name2);
    
    // Combine scores and normalize to a 0-100 scale
    // Formula creates some randomness but also makes the names influence the result
    let combinedScore = (score1 + score2) * 2;
    // Add some randomness to make it interesting
    combinedScore += Math.random() * 20;
    // Ensure the score is between 0-100
    let finalScore = Math.min(Math.round(combinedScore), 100);
    
    // Display the result with a short delay to simulate "calculation"
    setTimeout(() => {
      document.getElementById('loveScore').textContent = finalScore;
      
      // Add a message based on the score
      let message = '';
        if (finalScore >= 95) {
        message = 'You\'re Locked in now';
        } else if (finalScore >= 80) {
        message = 'Perfect match! You two are meant to be together!';
        } else if (finalScore >= 60) {
        message = 'Great chemistry! Your love has strong potential.';
        } else if (finalScore >= 40) {
        message = 'There\'s definitely something there. Worth exploring!';
        } else if (finalScore >= 20) {
        message = 'You might need to work on your connection a bit more.';
        } else {
        message = 'Perhaps you\'re better as friends for now.';
        }
      
      document.getElementById('loveMessage').textContent = message;
    }, 1000);
  }