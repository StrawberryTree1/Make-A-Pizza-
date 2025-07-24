// Define the sequence of pizza-building stages
const stages = ['sauce', 'cheese', 'topping', 'finish'];
let currentStage = 0; // Start from the first stage

// Define available ingredients for each stage
const ingredients = {
  sauce: ['sauce'], // Only one option for sauce
  cheese: ['mozzarella', 'melted-cheddar', 'vegan-cheese'], // Cheese options
  topping: [ // Toppings to be shown in two columns
    'pepperoni',
    'bacon',
    'mushrooms',
    'olives',
    'spinach',
    'pineapple',
    'greenpepper',
    'anchovies',
  ],
  finish: ['parsley', 'chiliflakes', 'honey-drizzle'] // Final finishing touches
};

// Render the current set of ingredient buttons based on stage
function renderOptions(stage) {
  const area = document.getElementById('options-area');
  area.innerHTML = ''; // Clear previous buttons

  // Add a two-column layout only for toppings stage
  if (stage === 'topping') {
    area.classList.add('two-column');
  } else {
    area.classList.remove('two-column');
  }

  // Create a button for each ingredient
  ingredients[stage].forEach((item) => {
    const btn = document.createElement('button');
    btn.innerText = item.replace(/[-_]/g, ' '); // Format label text
    btn.onclick = () => toggleTopping(item); // Attach event to toggle ingredient
    area.appendChild(btn); // Add button to the page
  });
}

// Function to toggle a topping image on the pizza
function toggleTopping(imgName) {
  const existing = document.getElementById(imgName);
  if (existing) {
    existing.remove(); // If topping already added, remove it
  } else {
    const img = document.createElement('img');
    img.src = `images/${imgName}.png`; // Load topping image from folder
    img.id = imgName;
    document.getElementById('toppings-layer').appendChild(img); // Add to pizza
  }
}

// Audio element setup
const audio = document.getElementById('audio');
let audioStarted = false; // To prevent autoplay restrictions
let isPlaying = false;    // Track audio state for toggle button

// Handle the "NEXT" button click
document.getElementById('next-btn').addEventListener('click', () => {
  // Start background music only once, on first interaction
  if (!audioStarted) {
    audio.play();
    audioStarted = true;
    isPlaying = true;
  }

  currentStage++; // Move to the next pizza stage

  if (currentStage < stages.length) {
    renderOptions(stages[currentStage]); // Show next stage's options
  } else {
    // All stages complete
    document.getElementById('options-area').innerHTML = "<h2>Pizza Complete! 🍕</h2>";
    document.getElementById('next-btn').style.display = 'none'; // Hide "NEXT" button
  }
});

// Toggle music on/off using top-left speaker button
document.getElementById('toggle-audio').addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    document.getElementById('toggle-audio').innerText = '🔇'; // Update icon
  } else {
    audio.play();
    isPlaying = true;
    document.getElementById('toggle-audio').innerText = '🔊'; // Update icon
  }
});

// Render the first stage (sauce) on page load
renderOptions(stages[currentStage]);
