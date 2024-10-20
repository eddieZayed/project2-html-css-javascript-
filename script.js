"use-strict";

const getExercises = async () => {
  try {
    const { data } = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
      headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': '486c85a2d1msh9b4f6d7d4d54e4ep115846jsn83196761accf', 
      }
    });
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
};

//display all exercises
const displayAllExercises = async () => {
  try {
    const exercises = await getExercises(); // Fetch exercises from API

    // Map over the exercises and create HTML for each exercise card
    const result = exercises.map((exercise) => `
      <div class="col-6">
        <div class="exercise-card card mb-4 text-center d-flex flex-row align-items-center">
          <img src="${exercise.gifUrl}" class="img-fluid card-img-top w-50" alt="${exercise.name} Image"/>
          <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <h3 class="card-title">${exercise.name}</h3>
            <p class="card-text"><strong>Target Muscle:</strong> ${exercise.target}</p>
            <p class="card-text"><strong>Body Part:</strong> ${exercise.bodyPart}</p>
            <p class="card-text"><strong>Equipment:</strong> ${exercise.equipment}</p>
          </div>
        </div>
      </div>
    `).join(''); 

    document.querySelector(".tab-content .row").innerHTML = result;

  } catch (error) {
    
    const result = `
      <h2>Error</h2>
      <p>${error.message}</p>
    `;
    document.querySelector(".tab-content .row").innerHTML = result;
  }
};


//display UpperBody Exercises
const displayUpperBodyExercises = async () => {
  try {
    const exercises = await getExercises(); 

    // Filter for upper body muscles
    const upperBodyExercises = exercises.filter(exercise =>
      ['biceps', 'triceps', 'delts', 'pecs', 'lats', 'abs'].includes(exercise.target.toLowerCase())
    );

    const result = upperBodyExercises.map((exercise) => `
      <div class="col-6">
        <div class="exercise-card card mb-4 text-center d-flex flex-row align-items-center">
          <img src="${exercise.gifUrl}" class="img-fluid card-img-top w-50" alt="${exercise.name} Image"/>
          <div class="card-body">
            <h3 class="card-title">${exercise.name}</h3>
            <p class="card-text"><strong>Target Muscle:</strong> ${exercise.target}</p>
            <p class="card-text"><strong>Equipment:</strong> ${exercise.equipment}</p>
          </div>
        </div>
      </div>
    `).join('');

    
    document.querySelector("#pills-upper .row").innerHTML = result;

  } catch (error) {
    console.error('Error fetching upper body exercises:', error);
    const errorMessage = `<h2>Error</h2><p>${error.message}</p>`;
    document.querySelector("#pills-upper .row").innerHTML = errorMessage;
  }
};

//display LowerBody Exercises
const displayLowerBodyExercises = async () => {
  try {
    const exercises = await getExercises(); 

    // Filter for lower body muscles
    const lowerBodyExercises = exercises.filter(exercise =>
      ['quads', 'hamstrings', 'glutes', 'calves', 'adductors', 'abductors'].includes(exercise.target.toLowerCase())
    );

    const result = lowerBodyExercises.map((exercise) => `
      <div class="col-6">
        <div class="exercise-card card mb-4 text-center d-flex flex-row align-items-center">
          <img src="${exercise.gifUrl}" class="img-fluid card-img-top w-50" alt="${exercise.name} Image"/>
          <div class="card-body">
            <h3 class="card-title">${exercise.name}</h3>
            <p class="card-text"><strong>Target Muscle:</strong> ${exercise.target}</p>
            <p class="card-text"><strong>Equipment:</strong> ${exercise.equipment}</p>
          </div>
        </div>
      </div>
    `).join('');

  
    document.querySelector("#pills-lower .row").innerHTML = result;

  } catch (error) {
    console.error('Error fetching lower body exercises:', error);
    const errorMessage = `<h2>Error</h2><p>${error.message}</p>`;
    document.querySelector("#pills-lower .row").innerHTML = errorMessage;
  }
};

displayAllExercises();
displayUpperBodyExercises();
displayLowerBodyExercises();


// BMI Calculation
document.querySelector('#bmiModal button.btn-primary').addEventListener('click', function() {
    const weight = document.querySelector('#bmiWeight').value;
    const height = document.querySelector('#bmiHeight').value / 100; // Convert cm to meters
  
    if (weight && height) {
      const bmi = (weight / (height * height)).toFixed(2);
      document.querySelector('#bmiResult').textContent = `Your BMI is ${bmi}`;
    } else {
      document.querySelector('#bmiResult').textContent = 'Please enter valid values.';
    }
  });



  // Calorie Calculation
document.querySelector('#calorieModal button.btn-primary').addEventListener('click', function() {
    const weight = document.querySelector('#calorieWeight').value;
    const height = document.querySelector('#calorieHeight').value;
    const age = document.querySelector('#calorieAge').value;
    const activityLevel = document.querySelector('#activityLevel').value;
  
    if (weight && height && age && activityLevel) {
      const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Mifflin-St Jeor Equation for men
      const calories = (bmr * activityLevel).toFixed(2);
      document.querySelector('#calorieResult').textContent = `You need ${calories} calories per day.`;
    } else {
      document.querySelector('#calorieResult').textContent = 'Please enter valid values.';
    }
  });
  

  // Macro Calculation
document.querySelector('#macroModal button.btn-primary').addEventListener('click', function() {
    const weight = document.querySelector('#macroWeight').value;
    const goal = document.querySelector('#macroGoal').value;
  
    if (weight && goal) {
      let protein, fat, carbs;
      
      // Basic macro calculation based on the selected goal
      if (goal === 'maintenance') {
        protein = weight * 1.2;
        fat = weight * 0.5;
        carbs = weight * 1.5;
      } else if (goal === 'muscle-gain') {
        protein = weight * 1.5;
        fat = weight * 0.5;
        carbs = weight * 2;
      } else { // fat-loss
        protein = weight * 1.2;
        fat = weight * 0.4;
        carbs = weight * 1;
      }
  
      document.querySelector('#macroResult').textContent = 
        `Protein: ${protein.toFixed(2)}g, Fat: ${fat.toFixed(2)}g, Carbs: ${carbs.toFixed(2)}g per day.`;
    } else {
      document.querySelector('#macroResult').textContent = 'Please enter valid values.';
    }
  });






