<script>
  document.addEventListener('DOMContentLoaded', function () {
    // Create parent <li> for "Security Forums"
    const securityMenu = document.createElement('li');
    securityMenu.className = 'header-navigation_list-item main-menu';

    securityMenu.innerHTML = `
      <div class="dropdown-container">
        <button id="security-forums-menu" aria-haspopup="true" type="button" style="background: none; border: none; font-weight: inherit; display: inline-block; padding: 0px; margin: 0px; cursor: pointer;">
          <span class="main-menu-trigger" style="display: flex; align-items: center;">
            <span>Security Forums</span>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="currentColor"></path>
            </svg>
          </span>
        </button>
        <ul aria-labelledby="security-forums-menu" class="dropdown dropdown--forums-overview is-hidden" role="menu">
          <li class="main-menu-list--overflow-scroll">
            <ul class="main-menu-list">
              <li class="main-menu-list__item"><a class="main-menu-link link--text" href="/gc/SecOps-SIEM/bd-p/chronicle-siem">SecOps SIEM</a></li>
              <li class="main-menu-list__item"><a class="main-menu-link link--text" href="/gc/SecOps-SOAR/bd-p/chronicle-soar">SecOps SOAR</a></li>
              <li class="main-menu-list__item"><a class="main-menu-link link--text" href="/gc/Google-Threat-Intelligence/bd-p/threat-intelligence-forum">Google Threat Intelligence</a></li>
              <li class="main-menu-list__item"><a class="main-menu-link link--text" href="/gc/Security-Command-Center/bd-p/command-ctr-forum">Security Command Center</a></li>
              <li class="main-menu-list__item"><a class="main-menu-link link--text" href="/gc/Attack-Surface-Management/bd-p/mandiant-attack-surface-mgmt">Attack Surface Management</a></li>
              <li class="main-menu-list__item"><a class="main-menu-link link--text" href="/gc/Mandiant-Threat-Defense/bd-p/mandiant-managed-defense">Mandiant Threat Defense</a></li>
              <li class="main-menu-list__item"><a class="main-menu-link link--text" href="/gc/Security-Validation/bd-p/mandiant-security-validation">Security Validation</a></li>
              <li class="main-menu-list__item"><a class="main-menu-link link--text" href="/gc/reCAPTCHA/bd-p/recaptcha-forum">reCAPTCHA</a></li>
              <li class="main-menu-list__item"><a class="main-menu-link link--text" href="/gc/Security-Foundation/bd-p/security-foundation">Security Foundation</a></li>
            </ul>
          </li>
        </ul>
      </div>
    `;

    // Insert at the beginning of the nav menu
    const navMenu = document.querySelector('.header-navigation-items_menu');
    if (navMenu) {
      navMenu.insertBefore(securityMenu, navMenu.firstChild);
    }

    // Toggle dropdown behavior
    const toggleBtn = securityMenu.querySelector('#security-forums-menu');
    const dropdown = securityMenu.querySelector('.dropdown');

    toggleBtn.addEventListener('click', function () {
      const isHidden = dropdown.classList.contains('is-hidden');
      document.querySelectorAll('.dropdown').forEach(d => d.classList.add('is-hidden')); // close others
      if (isHidden) {
        dropdown.classList.remove('is-hidden');
      } else {
        dropdown.classList.add('is-hidden');
      }
    });

    // Optional: close on outside click
    document.addEventListener('click', function (e) {
      if (!securityMenu.contains(e.target)) {
        dropdown.classList.add('is-hidden');
      }
    });
  });
</script>
