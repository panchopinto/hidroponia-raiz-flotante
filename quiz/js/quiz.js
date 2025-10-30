const preguntas = [
  {
    q: "¿Por qué se oxigena el agua en sistemas de raíz flotante?",
    a: ["Para enfriar la solución", "Para evitar asfixia radicular y mejorar absorción", "Para aumentar el pH"],
    correct: 1
  },
  {
    q: "Un rango adecuado de pH para lechugas hidropónicas es:",
    a: ["4.0 – 4.5", "5.8 – 6.2", "7.5 – 8.0"],
    correct: 1
  },
  {
    q: "La CE recomendada para lechuga suele ser:",
    a: ["0.2 – 0.4 mS/cm", "1.2 – 1.4 mS/cm", "2.5 – 3.0 mS/cm"],
    correct: 1
  },
  {
    q: "¿Qué ocurre si la CE es muy alta?",
    a: ["Mayor absorción de agua sin problemas", "Estrés osmótico y posible deshidratación", "Nada importante"],
    correct: 1
  },
  {
    q: "¿Qué componente aporta el fertilizante Hidro A+B?",
    a: ["Nutrientes esenciales separados en dos partes", "Solo agua", "Solo vitaminas"],
    correct: 0
  }
];

const ul = document.getElementById('quizList');
preguntas.forEach((p, idx) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <h3>${idx+1}. ${p.q}</h3>
    ${p.a.map((opt,i)=>`
      <label class="option">
        <input type="radio" name="q${idx}" value="${i}"> ${opt}
      </label>
    `).join('')}
  `;
  ul.appendChild(li);
});

document.getElementById('checkBtn').addEventListener('click', () => {
  let score = 0;
  preguntas.forEach((p, idx) => {
    const checked = document.querySelector(`input[name="q${idx}"]:checked`);
    if (checked && parseInt(checked.value,10) === p.correct) score++;
  });
  const res = document.getElementById('quizResult');
  res.textContent = `Puntaje: ${score} / ${preguntas.length}`;
});

document.getElementById('resetBtn').addEventListener('click', () => {
  document.querySelectorAll('input[type="radio"]').forEach(i => i.checked = false);
  document.getElementById('quizResult').textContent = "";
});
