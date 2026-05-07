// ===== MOBILE MENU TOGGLE =====
    // Function: toggleMobileMenu()
    // Purpose: Show or hide the mobile navigation links on smaller screens
    // Triggers: Click on the Menu button in the sticky navbar
    function toggleMobileMenu() {
      var menu = document.getElementById('mobile-menu');
      var toggle = document.getElementById('nav-menu-toggle');
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? 'Fechar' : 'Menu';
    }

    // ===== CLOSE MOBILE MENU AFTER LINK CLICK =====
    // Function: closeMobileMenuAfterNavigation()
    // Purpose: Collapse mobile menu when a user selects an anchor link
    // Triggers: Click on any link inside the mobile navigation container
    function closeMobileMenuAfterNavigation() {
      var menu = document.getElementById('mobile-menu');
      var toggle = document.getElementById('nav-menu-toggle');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }

    // ===== TIRE SIZE DECODER =====
    // Function: decodeTireSize()
    // Purpose: Parse tire size input and calculate approximate sidewall height
    // Triggers: Submit event on the tire decoder form
    function decodeTireSize(event) {
      event.preventDefault();

      var input = document.getElementById('tire-size-input');
      var result = document.getElementById('decoder-result');
      var value = input.value.trim().toUpperCase();
      var pattern = /^(\d{3})\s*\/\s*(\d{2})\s*R\s*(\d{2})$/;
      var match = value.match(pattern);

      if (!match) {
        result.classList.remove('result-pop');
        void result.offsetWidth;
        result.classList.add('result-pop');
        result.innerHTML =
          '<p class="text-sm font-bold" style="color: var(--danger);">Formato não reconhecido</p>' +
          '<p class="mt-2 text-sm" style="color: var(--sub);">Digite no formato 205/55 R16, com largura, perfil e aro.</p>';
        return;
      }

      var width = parseInt(match[1], 10);
      var profile = parseInt(match[2], 10);
      var rim = parseInt(match[3], 10);
      var sidewall = width * (profile / 100);
      var diameterMm = (rim * 25.4) + (sidewall * 2);

      result.classList.remove('result-pop');
      void result.offsetWidth;
      result.classList.add('result-pop');
      result.innerHTML =
        '<p class="text-sm font-bold">Resultado para ' + width + '/' + profile + ' R' + rim + '</p>' +
        '<div class="mt-3 grid gap-3 sm:grid-cols-2">' +
          '<div><p class="text-xs uppercase tracking-wide" style="color: var(--muted);">Largura</p><p class="font-bold">' + width + ' mm</p></div>' +
          '<div><p class="text-xs uppercase tracking-wide" style="color: var(--muted);">Perfil</p><p class="font-bold">' + profile + '%</p></div>' +
          '<div><p class="text-xs uppercase tracking-wide" style="color: var(--muted);">Aro</p><p class="font-bold">' + rim + ' polegadas</p></div>' +
          '<div><p class="text-xs uppercase tracking-wide" style="color: var(--muted);">Altura lateral</p><p class="font-bold">' + sidewall.toFixed(1).replace('.', ',') + ' mm</p></div>' +
          '<div><p class="text-xs uppercase tracking-wide" style="color: var(--muted);">Diâmetro total aprox.</p><p class="font-bold">' + diameterMm.toFixed(1).replace('.', ',') + ' mm</p></div>' +
          '<div><p class="text-xs uppercase tracking-wide" style="color: var(--muted);">Construção</p><p class="font-bold">Radial</p></div>' +
        '</div>' +
        '<p class="mt-4 text-xs" style="color: var(--muted);">Cálculo aproximado. Confirme equivalência, carga e velocidade antes de trocar medidas.</p>';
    }

    // ===== FAQ ACCORDION TOGGLE =====
    // Function: toggleFaqAnswer()
    // Purpose: Expand or collapse FAQ answers while updating accessibility state
    // Triggers: Click on any FAQ question button
    function toggleFaqAnswer(button) {
      var answer = button.nextElementSibling;
      var symbol = button.querySelector('span');
      var isOpen = answer.classList.toggle('open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      symbol.textContent = isOpen ? '−' : '+';
    }

    // ===== PRINT GUIDE ACTION =====
    // Function: printGuide()
    // Purpose: Opens the browser print dialog so users can save or print the guide
    // Triggers: Click on the "Imprimir guia" button
    function printGuide() {
      window.print();
    }

    // ===== EVENT LISTENER INITIALIZATION =====
    // Function: initializePageInteractions()
    // Purpose: Attach all interactive handlers after the DOM is fully available
    // Triggers: DOMContentLoaded browser event
    function initializePageInteractions() {
      var navToggle = document.getElementById('nav-menu-toggle');
      var mobileLinks = document.querySelectorAll('#mobile-menu a');
      var decoderForm = document.getElementById('tire-decoder-form');
      var faqButtons = document.querySelectorAll('.faq-toggle');
      var printButton = document.getElementById('print-guide-button');

      navToggle.addEventListener('click', toggleMobileMenu);

      mobileLinks.forEach(function(link) {
        link.addEventListener('click', closeMobileMenuAfterNavigation);
      });

      decoderForm.addEventListener('submit', decodeTireSize);

      faqButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          toggleFaqAnswer(button);
        });
      });

      printButton.addEventListener('click', printGuide);
    }

    // ===== DOM READY BINDING =====
    // Purpose: Ensures scripts only run after page elements have been parsed
    document.addEventListener('DOMContentLoaded', initializePageInteractions);