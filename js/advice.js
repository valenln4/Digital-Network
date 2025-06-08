document.addEventListener('DOMContentLoaded', function() {
    // 1. Frase motivadora del día (API)
    const quoteContainer = document.getElementById('quoteContainer');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    
    // API de frases motivadoras (podemos cambiar a otra API si lo deseas)
    const QUOTE_API = 'https://type.fit/api/quotes';
    
    async function fetchQuote() {
        try {
            const response = await fetch(QUOTE_API);
            const quotes = await response.json();
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            
            quoteContainer.innerHTML = `
                <blockquote class="blockquote">
                    <p class="mb-3">"${randomQuote.text}"</p>
                    <footer class="blockquote-footer">${randomQuote.author || 'Anónimo'}</footer>
                </blockquote>
            `;
        } catch (error) {
            quoteContainer.innerHTML = `
                <div class="alert alert-warning">
                    No pudimos cargar la frase del día. Intenta recargar la página.
                </div>
            `;
            console.error("Error fetching quote:", error);
        }
    }
    
    newQuoteBtn.addEventListener('click', fetchQuote);
    fetchQuote(); // Cargar primera frase al entrar

    // 2. Consejos prácticos
    const adviceContainer = document.getElementById('adviceContainer');
    const adviceList = [
        {
            icon: 'fas fa-bell-slash',
            title: 'Desactiva notificaciones',
            content: 'Configura tus apps para que no te interrumpan constantemente. Revisa tus redes en momentos específicos.'
        },
        {
            icon: 'fas fa-hourglass-half',
            title: 'Establece límites de tiempo',
            content: 'Usa la función "Tiempo de uso" de tu teléfono o apps como Digital Wellbeing para monitorear y limitar tu tiempo.'
        },
        {
            icon: 'fas fa-bed',
            title: 'Nada de pantallas antes de dormir',
            content: 'Evita las redes sociales al menos 1 hora antes de acostarte para mejorar tu calidad de sueño.'
        },
        {
            icon: 'fas fa-check-circle',
            title: 'Desintoxicación digital',
            content: 'Haz pausas regulares. Prueba con un día a la semana sin redes sociales.'
        },
        {
            icon: 'fas fa-search',
            title: 'Diversifica tus fuentes',
            content: 'No dependas solo de redes para informarte. Consulta medios tradicionales y variados.'
        },
        {
            icon: 'fas fa-users',
            title: 'Interacciones reales',
            content: 'Prioriza encuentros en persona. Las redes no sustituyen la comunicación cara a cara.'
        }
    ];

    adviceList.forEach(advice => {
        adviceContainer.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card advice-card h-100">
                    <div class="card-body text-center p-4">
                        <div class="advice-icon">
                            <i class="${advice.icon}"></i>
                        </div>
                        <h3 class="h5 fw-bold">${advice.title}</h3>
                        <p class="mb-0">${advice.content}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // 3. Test de adicción a redes sociales
    const testForm = document.getElementById('addictionTestForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const testResult = document.getElementById('testResult');
    const resultProgress = document.getElementById('resultProgress');
    const resultText = document.getElementById('resultText');
    const retakeTestBtn = document.getElementById('retakeTestBtn');

    const testQuestions = [
        "¿Cuántas horas al día pasas en redes sociales?",
        "¿Es lo primero que revisas al despertar y lo último antes de dormir?",
        "¿Sientes ansiedad si no revisas tus redes por algunas horas?",
        "¿Has intentado reducir tu tiempo en redes sin éxito?",
        "¿Descuidas responsabilidades por pasar tiempo en redes?",
        "¿Prefieres interactuar en redes antes que en persona?"
    ];

    // Generar preguntas del test
    testQuestions.forEach((question, index) => {
        questionsContainer.innerHTML += `
            <div class="test-question">
                <p class="fw-bold">${index + 1}. ${question}</p>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="q${index}" id="q${index}a" value="3" required>
                    <label class="form-check-label" for="q${index}a">Siempre</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="q${index}" id="q${index}b" value="2">
                    <label class="form-check-label" for="q${index}b">Frecuentemente</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="q${index}" id="q${index}c" value="1">
                    <label class="form-check-label" for="q${index}c">A veces</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="q${index}" id="q${index}d" value="0">
                    <label class="form-check-label" for="q${index}d">Nunca</label>
                </div>
            </div>
        `;
    });

    // Calcular resultado
    testForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let totalScore = 0;
        const maxScore = testQuestions.length * 3; // Máximo posible
        
        // Sumar puntajes
        testQuestions.forEach((_, index) => {
            const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
            totalScore += parseInt(selectedOption.value);
        });
        
        // Calcular porcentaje
        const percentage = Math.round((totalScore / maxScore) * 100);
        
        // Mostrar resultado
        resultProgress.style.width = `${percentage}%`;
        resultProgress.textContent = `${percentage}%`;
        
        // Mensaje según resultado
        let message;
        if (percentage >= 75) {
            message = "¡Cuidado! Tu uso de redes sociales parece ser muy alto. Considera hacer cambios significativos en tus hábitos digitales.";
            resultProgress.classList.add('bg-danger');
        } else if (percentage >= 50) {
            message = "Tienes un uso moderado-alto de redes. Sería bueno que establezcas algunos límites saludables.";
            resultProgress.classList.add('bg-warning');
        } else if (percentage >= 25) {
            message = "Buen trabajo. Mantienes un uso relativamente equilibrado de las redes sociales.";
            resultProgress.classList.add('bg-info');
        } else {
            message = "¡Excelente! Tienes una relación muy saludable con las redes sociales.";
            resultProgress.classList.add('bg-success');
        }
        
        resultText.textContent = message;
        testResult.classList.remove('d-none');
        testForm.classList.add('d-none');
    });

    // Volver a hacer el test
    retakeTestBtn.addEventListener('click', function() {
        testForm.reset();
        testResult.classList.add('d-none');
        testForm.classList.remove('d-none');
        resultProgress.classList.remove('bg-danger', 'bg-warning', 'bg-info', 'bg-success');
    });
});