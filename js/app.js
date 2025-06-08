// Toggle de tema oscuro/claro
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Aplicar tema guardado
  document.body.setAttribute('data-bs-theme', currentTheme);
  
  // Actualizar icono del botón
  updateThemeIcon(currentTheme);
  
  // Escuchar clic en el botón de tema
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  // Actualizar icono según el tema
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  }
  
  // Instalación de PWA

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.getElementById('installBtn');
    installBtn.style.display = 'inline-block';

    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('Usuario aceptó la instalación');
        } else {
          console.log('Usuario canceló la instalación');
        }
        deferredPrompt = null;
      }
    });
  });


  
  // Formulario de newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      // Simular envío a API (en un proyecto real usarías fetch)
      console.log('Email enviado:', email);
      
      // Mostrar feedback al usuario
      alert('¡Gracias por suscribirte! Pronto recibirás nuestros consejos por email.');
      this.reset();
    });
  }
  
  // Registrar Service Worker para PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/js/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful');
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
});