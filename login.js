// hide "heading"
const heading = document.querySelector("div#api .heading");
if(heading){
	heading.style.display = "none";
}

// new content in ".intro" 
const intro = document.querySelector("div#api form .intro");
if(intro){
	intro.innerHTML = `
  <h2 aria-level="1" class="text-celeste-primary fw-semibold fs-2 mb-3">
    Connexion
  </h2>
`;
}

document.querySelector("div#api form .error p")?.classList.add("mb-0");
document.querySelector("div#api form .entry .entry-item")?.classList.add("pt-0");
document.querySelector("#localAccountForm")?.classList.add("mw-75", "mx-auto");

// set link "forgotPassword"
const forgotPasswordLink = document.getElementById("forgotPassword");
if (forgotPasswordLink) {
    forgotPasswordLink.href = "https://clientsceleste.b2clogin.com/b33cf7f3-86b8-4845-be04-036de31663c8/oauth2/v2.0/authorize?p=B2C_1_reset_password&client_id=882fa9fa-115e-4d29-a14a-faff9e7edcc8&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fespace-clients.celeste.fr&scope=openid&response_type=id_token&prompt=login";
}
// Replace the input "password" to place it first in its parent (for tabulation)
const passwordInput = document.querySelector("#password");
if (passwordInput) {
  const parentEntryItem = passwordInput.closest(".entry-item");
  if (parentEntryItem) {
    parentEntryItem.prepend(passwordInput);
  }
}

// add retrieve id link
const entryContainer = document.querySelector(".entry");
const entryItems = entryContainer.querySelectorAll(".entry-item");
if (entryItems.length > 0) {
  const lastEntryItem = entryItems[entryItems.length - 1]; // last ".entry-item"
  const accessLinksDiv = document.createElement("div");
  accessLinksDiv.classList.add("access-links");
  
  const retrieveIdSection = document.getElementById("retrieve-id-section");

  // Link 1
  const newLink = document.createElement("a");
  newLink.id = "";
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