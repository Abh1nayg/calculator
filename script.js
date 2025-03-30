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
    
    // Convert names to lowercase for consistency
    name1 = name1.toLowerCase();
    name2 = name2.toLowerCase();
    
    // Filter to count only letters
    function countLetters(str) {
      return str.replace(/[^a-z]/g, '').length;
    }
    
    let letterCount1 = countLetters(name1);
    let letterCount2 = countLetters(name2);
    let totalLetters = letterCount1 + letterCount2;
    
    // Initial base calculation
    function getBaseScore(str1, str2) {
      let combined = str1 + str2;
      let hash = 0;
      
      // Create a hash from the combined names
      for (let i = 0; i < combined.length; i++) {
        let char = combined.charCodeAt(i);
        if ((char >= 97 && char <= 122) || (char >= 65 && char <= 90)) {
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
      }
      
      // Generate a value between 30-70 as the base
      return Math.abs(hash % 41) + 30; // Range: 30-70
    }
    
    // Apply buffs and nerfs based on name length
    function applyLengthModifiers(baseScore, letterCount) {
      // Define what constitutes short and long names
      const shortNameThreshold = 6;  // 3 letters per name on average
      const longNameThreshold = 12;  // 6 letters per name on average
      
      let modifier = 0;
      
      // Short name buff (chance-based)
      if (letterCount <= shortNameThreshold && Math.random() < 0.7) { // 70% chance
        let buffAmount = Math.floor(Math.random() * 15) + 5; // +5 to +20 points
        modifier += buffAmount;
        console.log("Short name buff: +" + buffAmount);
      }
      
      // Long name nerf (chance-based)
      if (letterCount >= longNameThreshold && Math.random() < 0.7) { // 70% chance
        let nerfAmount = Math.floor(Math.random() * 15) + 5; // -5 to -20 points
        modifier -= nerfAmount;
        console.log("Long name nerf: -" + nerfAmount);
      }
      
      return baseScore + modifier;
    }
    
    // Additional score factors to make it interesting
    function applyLetterFactors(score, str1, str2) {
      let modifier = 0;
      
      // Common letter bonus
      let commonLetters = 0;
      let str1Letters = str1.replace(/[^a-z]/g, '');
      let str2Letters = str2.replace(/[^a-z]/g, '');
      
      for (let char of str1Letters) {
        if (str2Letters.includes(char)) {
          commonLetters++;
          // Remove letter after counting to avoid double counting
          str2Letters = str2Letters.replace(char, '');
        }
      }
      
      // Add bonus for common letters (max +15)
      modifier += Math.min(commonLetters * 3, 15);
      
      // Love-related letters bonus (l,o,v,e)
      let loveLetters = (str1 + str2).match(/[love]/gi)?.length || 0;
      modifier += Math.min(loveLetters, 10);
      
      return score + modifier;
    }
    
    // Calculate base score
    let score = getBaseScore(name1, name2);
    
    // Apply length-based modifiers (buffs/nerfs)
    score = applyLengthModifiers(score, totalLetters);
    
    // Apply additional letter-based factors
    score = applyLetterFactors(score, name1, name2);
    
    // Add randomness (±5)
    score += Math.floor(Math.random() * 11) - 5;
    
    // Ensure score is within 5-95 range
    let finalScore = Math.max(5, Math.min(95, Math.round(score)));
    
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