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
  
  // Generate a base score centered around 70 (60-80 range)
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
    
    // Use Box-Muller transform to generate normally distributed value
    // centered around 70 with standard deviation of 5
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    
    // Scale to our desired range (centered at 70 with most values between 60-80)
    return Math.round(70 + 5 * z0);
  }
  
  // Apply more balanced modifiers based on name characteristics
  function applyNameModifiers(baseScore, name1, name2, totalLetters) {
    let modifier = 0;
    
    // More balanced length modifier - less harsh penalties
    const idealLength = 12; // Ideal combined length
    const lengthDiff = Math.abs(totalLetters - idealLength);
    
    // Small penalty/bonus based on how far from ideal length (max ±4)
    modifier -= Math.min(lengthDiff / 3, 4);
    
    // Common letter analysis - more rewarding
    let commonLetters = 0;
    let str1Letters = name1.replace(/[^a-z]/g, '');
    let str2Letters = name2.replace(/[^a-z]/g, '');
    
    for (let char of str1Letters) {
      if (str2Letters.includes(char)) {
        commonLetters++;
        // Remove letter after counting to avoid double counting
        str2Letters = str2Letters.replace(char, '');
      }
    }
    
    // More generous common letter bonus (max +8)
    modifier += Math.min(commonLetters * 1.5, 8);
    
    // Love-related letters bonus (l,o,v,e)
    let loveLetters = (name1 + name2).match(/[love]/gi)?.length || 0;
    modifier += Math.min(loveLetters * 0.8, 6);
    
    // First letter matching bonus
    if (name1.charAt(0) === name2.charAt(0)) {
      modifier += 4;
    }
    
    // Vowel harmony bonus
    const vowelCount1 = (name1.match(/[aeiou]/gi) || []).length;
    const vowelCount2 = (name2.match(/[aeiou]/gi) || []).length;
    const vowelRatio = Math.min(vowelCount1, vowelCount2) / Math.max(vowelCount1, vowelCount2) || 0;
    
    // Bonus for similar vowel ratios (max +4)
    modifier += Math.round(vowelRatio * 4);
    
    return baseScore + modifier;
  }
  
  // Add controlled randomness that follows a normal distribution
  function addNormalRandomness(score) {
    // Box-Muller transform for normal distribution
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    
    // Small random adjustment with standard deviation of 2
    let randomAdjustment = Math.round(2 * z0);
    
    return score + randomAdjustment;
  }
  
  // Calculate base score
  let score = getBaseScore(name1, name2);
  
  // Apply name-based modifiers
  score = applyNameModifiers(score, name1, name2, totalLetters);
  
  // Add normally distributed randomness
  score = addNormalRandomness(score);
  
  // Use a modified sigmoid function to ensure clustering around 60-80
  function modifiedSigmoid(x) {
    // Center the sigmoid at 70, with most values falling between 60-80
    return 30 + 55 / (1 + Math.exp(-(x - 70) / 10));
  }
  
  let finalScore = Math.round(modifiedSigmoid(score));
  
  // Ensure minimum score isn't too low
  finalScore = Math.max(40, finalScore);
  
  // Display the result with a short delay to simulate "calculation"
  setTimeout(() => {
    document.getElementById('loveScore').textContent = finalScore;
    
    // Add a message based on the score - more positive messaging
    let message = '';
    if (finalScore >= 85) {
      message = 'Perfect match! Your connection is truly extraordinary!';
    } else if (finalScore >= 75) {
      message = 'Amazing chemistry! You two have wonderful potential together.';
    } else if (finalScore >= 65) {
      message = 'Great compatibility! Your relationship has a solid foundation.';
    } else if (finalScore >= 55) {
      message = 'Good match! With some effort, your connection could flourish.';
    } else if (finalScore >= 45) {
      message = 'Decent potential here. You might surprise each other in positive ways.';
    } else {
      message = 'Every great love story has challenges. Yours might just be beginning!';
    }
    
    document.getElementById('loveMessage').textContent = message;
  }, 1000);
}