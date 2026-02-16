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