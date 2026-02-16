function applyBranding() {
    const brandData = localStorage.getItem("brand");
    if(brandData){
        const brandConfig = JSON.parse(brandData);
        // page title
        document.title = brandConfig.title;
        // logo + alt
        const imgEl = document.getElementById("brandImage");
        if (imgEl) {
            imgEl.src = brandConfig.img;
            imgEl.alt = brandConfig.alt;
            return brandConfig;
        }
    }
    //no brand default nuxit
    return false;
}

const brandConfig = applyBranding();