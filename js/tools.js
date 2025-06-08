document.addEventListener('DOMContentLoaded', function() {
    const hoursRange = document.getElementById('hoursRange');
    const hoursValue = document.getElementById('hoursValue');
    
    hoursRange.addEventListener('input', function() {
        hoursValue.textContent = this.value + ' horas';
    });

    const assessmentForm = document.getElementById('digitalAssessmentForm');
    const assessmentResult = document.getElementById('assessmentResult');
    const retakeButton = document.getElementById('retakeAssessment');
    
    assessmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        calculateAssessment();
        
        assessmentForm.classList.add('d-none');
        assessmentResult.classList.remove('d-none');
        
        assessmentResult.scrollIntoView({ behavior: 'smooth' });
    });
    
    retakeButton.addEventListener('click', function() {
        assessmentForm.classList.remove('d-none');
        assessmentResult.classList.add('d-none');
        assessmentForm.reset();
        hoursValue.textContent = '5.5 horas';
        hoursRange.value = 5.5;
    });

    function calculateAssessment() {
        const hours = parseFloat(hoursRange.value);
        let score = 0;
        
        if (hours <= 2) score = 85;
        else if (hours <= 4) score = 65;
        else if (hours <= 6) score = 45;
        else score = 25;
        
        const progressBar = assessmentResult.querySelector('.progress-bar');
        progressBar.style.width = score + '%';
        progressBar.textContent = score + '% Consciente';
        
        let description = '';
        if (score >= 75) description = 'muy consciente';
        else if (score >= 50) description = 'moderadamente consciente';
        else description = 'poco consciente';
        
        assessmentResult.querySelector('p').innerHTML = `
            Basado en tus respuestas, tienes un uso <strong>${description}</strong> de las redes sociales.
        `;
    }
});
