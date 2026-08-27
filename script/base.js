 const errors = {};

  name = name.trim();
  score = score.trim();

  if (name === "") {
    errors.name = "Please enter a student name.";
  }

  if (score === "") {
    errors.score = "Please enter a score.";
  } else if (isNaN(score)) {
    errors.score = "Score must be a number.";
  } else if (Number(score) < 0 || Number(score) > 100) {
    errors.score = "Score must be between 0 and 100.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: errors
  };



    score = Number(score);

  const student = {
    id: Date.now().toString(),
    name: name.trim(),
    score: score,
    grade: getGrade(score)
  };

  students.push(student);

  renderStudents();
  renderStats();



    if (students.length === 0) {
    return {
      average: "-",
      highest: "-",
      lowest: "-",
      count: 0
    };
  }

  let total = 0;
  let highest = students[0].score;
  let lowest = students[0].score;

  students.forEach(function(student) {

    total = total + student.score;

    if (student.score > highest) {
      highest = student.score;
    }

    if (student.score < lowest) {
      lowest = student.score;
    }
  });
   const average = total / students.length;

  return {
    average: average.toFixed(1),
    highest: highest,
    lowest: lowest,
    count: students.length
  };





   els.list.replaceChildren();

  students.forEach(function(student) {

    const item = document.createElement("li");
    item.className = "list__item";

    const details = document.createElement("div");
    details.className = "list__details";

    const name = document.createElement("span");
    name.className = "list__title";
    name.textContent = student.name;

    const score = document.createElement("span");
    score.className = "list__meta";
    score.textContent = "Score: " + student.score;

    const grade = document.createElement("span");
    grade.className = "list__meta";
    grade.textContent = "Grade: " + student.grade;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn--danger";
    button.textContent = "Delete";
    button.dataset.studentId = student.id;

    details.append(name, score, grade);
    item.append(details, button);

    els.list.append(item);
  });







  