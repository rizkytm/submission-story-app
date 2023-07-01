import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class FooterApp extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    // return html`
    //   <locale-picker class="d-block mb-3"></locale-picker>
    //   <p class="text-center text-white mb-0">
    //     ${msg(`Dibuat dengan ❤ oleh Dicoding Indonesia`)}
    //   </p>
    // `;

    return html`
      <div class="container">
        <footer
          class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
        >
          <div class="col-md-4 d-flex align-items-center">
            <a
              href="/"
              class="me-2 text-body-secondary text-decoration-none lh-1"
            >
              <i class="bi bi-book" style="font-size: 24px;"></i> 
            </a>
            <span class="text-body-secondary"
              >&copy; 2023 Story, Inc</span
            >
          </div>

          <div class="col-md-4 justify-content-end d-flex">
            <locale-picker class="d-block"></locale-picker>
          </div>
        </footer>
      </div>
    `;
  }
}

customElements.define('footer-app', FooterApp);
