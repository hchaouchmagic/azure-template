function initBrand() {
  const BRANDING = {
    nuxit: {
        title: "Espace clients | NUXIT",
        img: "https://planet.nuxit.com/images/logos/Nuxit-fr-white.png",
        alt: "Espace clients Nuxit",
        redirect: "https://planet.nuxit.com"
    },
    magic: {
        title: "Espace clients | MAGIC",
        img: "https://planet.nuxit.com/images/logos/Magic-fr-white.png",
        alt: "Espace clients Magic",
        redirect: "https://planet.magic.fr"
    },
    icow: {
        title: "Espace clients | ICOW",
        img: "https://www.icow-systems.com/wp-content/uploads/2024/07/Icow-1-1.png",
        alt: "Espace clients | iCow",
        redirect: "https://planet.icow-systems.com/"
    },
  };
  const params = new URLSearchParams(window.location.search);
  const brand = params.get("brand");

  localStorage.removeItem("brand");
  //brand from param
    if (brand && BRANDING[brand.toLowerCase()]) {
        localStorage.setItem("brand", JSON.stringify(BRANDING[brand.toLowerCase()]));
    }
  //default = nuxit keep the page as it is
}

initBrand();