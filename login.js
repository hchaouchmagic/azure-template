/**
 * Waits for a DOM element matching `selector` to exist, then calls `callback` with it.
 * Resolves immediately if the element is already present, otherwise uses a MutationObserver.
 * @param {string} selector - CSS selector to watch for
 * @param {(el: Element) => void} callback
 * @param {number} [timeout=10000] - ms before giving up (default 10 s)
 */
function waitForElement(selector, callback, timeout = 10000) {
  const el = document.querySelector(selector);
  if (el) {
    callback(el);
    return;
  }

  let timer;
  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect();
      clearTimeout(timer);
      callback(el);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Safety-net: stop observing after `timeout` ms to avoid memory leaks
  timer = setTimeout(() => {
    observer.disconnect();
    console.warn("[B2C] waitForElement timed out for selector:", selector);
  }, timeout);
}

// ---------------------------------------------------------------------------
// All B2C DOM mutations are gated on "div#api form" being injected first.
// Every customisation runs inside this single observer callback so they all
// share the same injection moment and execute in the correct order.
// ---------------------------------------------------------------------------
waitForElement("div#api form", () => {

  // 1. Hide ".heading"
  const heading = document.querySelector("div#api .heading");
  if (heading) {
    heading.style.display = "none";
  }

  // 2. Replace content of ".intro"
  const intro = document.querySelector("div#api form .intro");
  if (intro) {
    intro.innerHTML = `
      <h2 aria-level="1" class="text-celeste-primary fw-semibold fs-2 mb-3">
        Connexion
      </h2>
    `;
  }

  // 3. Misc class additions
  document.querySelector("div#api form .error p")?.classList.add("mb-0");
  document.querySelector("div#api form .entry .entry-item")?.classList.add("pt-0");
  document.querySelector("#localAccountForm")?.classList.add("mw-75", "mx-auto");

  // 4. Build "forgot password" link
  const forgotPasswordLink = document.getElementById("forgotPassword");
  if (forgotPasswordLink) {
    const queryParams = new URLSearchParams(window.location.search);
    const redirectLink = queryParams.get("redirect_uri") ?? "";
    const redirectUri = redirectLink.replace("/callback", "");
    forgotPasswordLink.href =
      "https://clientsceleste.b2clogin.com/b33cf7f3-86b8-4845-be04-036de31663c8/oauth2/v2.0/authorize" +
      "?p=B2C_1_Planet_icow_reset_password" +
      "&client_id=c174dd34-b863-4a7c-a308-1eb08471e6a0" +
      "&nonce=defaultNonce" +
      "&redirect_uri=" + encodeURIComponent(redirectUri) +
      "&scope=openid" +
      "&response_type=id_token" +
      "&prompt=login";
  }

  // 5. Move password input to the top of its parent so tab order is correct
  //    (must happen BEFORE the focus / tab order is established by the browser)
  const passwordInput = document.querySelector("#password");
  if (passwordInput) {
    const parentEntryItem = passwordInput.closest(".entry-item");
    if (parentEntryItem) {
      parentEntryItem.prepend(passwordInput);
    }
  }

  // 6. Inject "access links" section + "retrieve ID" link
  const entryContainer = document.querySelector(".entry");
  if (entryContainer) {
    const entryItems = entryContainer.querySelectorAll(".entry-item");
    if (entryItems.length > 0) {
      const lastEntryItem = entryItems[entryItems.length - 1];

      const accessLinksDiv = document.createElement("div");
      accessLinksDiv.classList.add("access-links");

      const retrieveIdSection = document.getElementById("retrieve-id-section");

      const newLink = document.createElement("a");
      newLink.href = "#";
      newLink.innerText = "Vous n'avez pas d'identifiant ?";
      newLink.style.marginTop = "8px";
      newLink.addEventListener("click", (event) => {
        event.preventDefault();
        if (retrieveIdSection) retrieveIdSection.style.display = "block";
      });

      accessLinksDiv.appendChild(newLink);
      lastEntryItem.insertAdjacentElement("afterend", accessLinksDiv);
    }
  }

  // 7. Set brand name display
  const queryParams = new URLSearchParams(window.location.search);
  const brandParam = queryParams.get("brand");
  const brandSpan = document.getElementById("brandName");
  if (brandSpan) {
    brandSpan.innerHTML = brandParam
      ? brandParam.replace(/\b\w/g, (char) => char.toUpperCase())
      : "Nuxit";
  }

});
