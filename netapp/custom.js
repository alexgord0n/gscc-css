<script>
(() => {
  // ----------------------------
  // 1) Scheduled maintenance banner close
  // ----------------------------
  document.addEventListener("click", (e) => {
    const btn = e.target?.closest?.(".close-btn");
    if (!btn) return;
    const parent = btn.parentElement;
    if (parent) parent.style.display = "none";
  });

  // ----------------------------
  // 2) Carousel
  // ----------------------------
  (function initCarouselWhenReady() {
    const loadCarousel = () => {
      if (window.carouselInitialized) return;
      const wrapper = document.querySelector("#carouselWrapper");
      if (!wrapper) return;

      window.carouselInitialized = true;

      const track = document.createElement("div");
      track.className = "carousel-track";
      wrapper.appendChild(track);

      const slides = [
        {
          title: "Healius Story",
          description: "Discover how Healius leverages NetApp to transform healthcare data.",
          img: "https://www.netapp.com/media/hp_healius_tcm19-124535.jpg",
          url: "#"
        },
        {
          title: "T-Systems Success",
          description: "Learn how T-Systems accelerates IT transformation with NetApp solutions.",
          img: "https://www.netapp.com/media/hp_tsystems_tcm19-124536.jpg",
          url: "#"
        },
        {
          title: "AGL Innovation",
          description: "Explore AGL's journey in energy innovation powered by NetApp.",
          img: "https://www.netapp.com/media/hp_agl_tcm19-124534.jpg",
          url: "#"
        }
      ];

      slides.forEach((slide) => {
        const div = document.createElement("div");
        div.className = "carousel-slide";
        div.innerHTML = `
          <a href="${slide.url}">
            <img src="${slide.img}" alt="${slide.title}">
            <div class="carousel-caption">
              <h1>${slide.title}</h1>
              <p>${slide.description}</p>
            </div>
          </a>`;
        track.appendChild(div);
      });

      const nav = document.createElement("div");
      nav.className = "carousel-nav";
      nav.innerHTML = `
        <button id="prevBtn" aria-label="Previous" type="button">&#10094;</button>
        <button id="nextBtn" aria-label="Next" type="button">&#10095;</button>
      `;
      wrapper.appendChild(nav);

      let currentIndex = 0;
      const updateSlide = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      };

      document.getElementById("prevBtn")?.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
      });

      document.getElementById("nextBtn")?.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
      });

      updateSlide();
    };

    const waitForWrapper = () => {
      const wrapper = document.querySelector("#carouselWrapper");
      if (wrapper) loadCarousel();
      else requestAnimationFrame(waitForWrapper);
    };

    waitForWrapper();
  })();

  // ----------------------------
  // 3) Host-page dropdown styling
  // ----------------------------
  function styleDropdownHost() {
    const dropdown = document.querySelector(".c-dropdown__content");
    if (!dropdown) return;

    dropdown.style.setProperty(
      "background-color",
      "var(--config-body-background-color, #000)",
      "important"
    );
    dropdown.style.setProperty("border-color", "var(--config-card-border-color, #333)", "important");
  }

  // ----------------------------
  // 3.5) CKEditor dialog border/outline fix (HOST document)
  // ----------------------------
  function upsertStyle(doc, id, cssText) {
    if (!doc?.head) return;
    let style = doc.getElementById(id);
    if (!style) {
      style = doc.createElement("style");
      style.id = id;
      doc.head.appendChild(style);
    }
    if (style.textContent !== cssText) style.textContent = cssText;
  }

  function styleCkDialogHost() {
    const css = `
      /* Remove the "mystery line" inside CKEditor dialogs */
      .cke_dialog_title {
        border-bottom: 0 !important;
        box-shadow: none !important;
      }

      .cke_dialog_contents {
        border-top: 0 !important;
      }

      /* This is often the actual culprit: looks like a border but it's an outline */
      .cke_dialog_footer {
        outline: 0 !important;
        border-top: 0 !important;
        box-shadow: none !important;
      }

      /* Optional: if you want the OUTER dialog border gone too, uncomment */
      /*
      .cke_dialog_body {
        border: 0 !important;
        box-shadow: none !important;
      }
      */
    `;

    upsertStyle(document, "gs-cke-dialog-border-fix", css);
  }

  // ----------------------------
  // 4) CKEditor iframe styling
  // ----------------------------
  function styleEditorIframe(iframe) {
    const doc = iframe?.contentDocument;
    if (!doc) return;

    const css = `
      .post__content.post__content--new-editor.cke_editable {
        background-color: var(--config-body-background-color, #000) !important;
        color: var(--config--main-color-night, #fff) !important;
      }

      html, body {
        background-color: var(--config-body-background-color, #000) !important;
        color: var(--config--main-color-night, #fff) !important;
      }

      a { color: var(--config-anchor-base-color, #aad8ff) !important; }
    `;

    upsertStyle(doc, "gs-editor-darkmode", css);
  }

  function stylePanelIframe(iframe) {
    const doc = iframe?.contentDocument;
    if (!doc) return;

    const css = `
      :root, html {
        color-scheme: light !important;
        background: #fff !important;
      }

      html, body {
        background: #fff !important;
        color: #111 !important;
      }

      .cke_panel,
      .cke_panel_container,
      .cke_panel_frame {
        background: #fff !important;
        color: #111 !important;
      }

      .cke_panel_list,
      .cke_panel_listItem {
        background: transparent !important;
      }

      .cke_panel_listItem a,
      .cke_panel_listItem a * {
        background: transparent !important;
        color: #111 !important;
      }

      .cke_panel_listItem a:hover,
      .cke_panel_listItem a:focus {
        background: #eee !important;
      }
    `;

    upsertStyle(doc, "gs-editor-panel-lightmode", css);
  }

  function tryStyleIframe(iframe, retryCount = 0) {
    if (retryCount > 80) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc || !doc.head || !doc.body) {
        setTimeout(() => tryStyleIframe(iframe, retryCount + 1), 100);
        return;
      }

      if (iframe.classList.contains("cke_wysiwyg_frame")) {
        styleEditorIframe(iframe);
      } else if (iframe.classList.contains("cke_panel_frame")) {
        stylePanelIframe(iframe);
      }
    } catch (e) {
      setTimeout(() => tryStyleIframe(iframe, retryCount + 1), 100);
    }
  }

  function scan() {
    styleDropdownHost();
    styleCkDialogHost(); // ✅ new

    document.querySelectorAll("iframe.cke_wysiwyg_frame, iframe.cke_panel_frame").forEach((iframe) => {
      iframe.addEventListener("load", () => tryStyleIframe(iframe), { once: true });
      tryStyleIframe(iframe);
    });
  }

  const obs = new MutationObserver(scan);
  document.addEventListener("DOMContentLoaded", () => {
    scan();
    obs.observe(document.body, { childList: true, subtree: true });

    if (window.CKEDITOR?.on) {
      CKEDITOR.on("instanceReady", () => scan());
      CKEDITOR.on("dialogShow", () => scan()); // helpful for dialogs specifically
    }
  });
})();
</script>
