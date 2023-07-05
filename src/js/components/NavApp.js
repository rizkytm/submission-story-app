import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavApp extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandName')) {
      throw new Error(
        `Atribut "brandName" harus diterapkan pada elemen ${this.localName}`
      );
    }
  }

  render() {
    // return html`
    //   <nav class="navbar navbar-expand-md navbar-dark bg-primary">
    //     <div class="container">
    //       <span class="navbar-brand">${this.brandName}</span>
    //       <button
    //         class="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarSupportedContent"
    //       >
    //         <span class="navbar-toggler-icon"></span>
    //       </button>
    //       <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //         <nav-links class="ms-auto mb-2 mb-md-0">
    //       </div>
    //     </div>
    //   </nav>
    // `;

    return html`
      <div class="container">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
          <a
            href="/"
            class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
          >
            <span
              ><i class="bi bi-book" style="font-size: 24px;"></i> Story
              App</span
            >
          </a>

          <ul
            class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
          >
            <li class="d-none">
              <a href="#" class="nav-link px-2 link-secondary">Add Story</a>
            </li>
            <li class="d-none">
              <a href="#" class="nav-link px-2 link-body-emphasis">Add Story</a>
            </li>
          </ul>

          <div class="dropdown text-end">
            <a
              href="#"
              class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                class="rounded-circle"
              />
            </a>
            <ul class="dropdown-menu text-small">
              <li><a class="dropdown-item" href="#"><b>Faisal Sulaiman</b></a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="/stories/add.html">Add Story</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('nav-app', NavApp);
