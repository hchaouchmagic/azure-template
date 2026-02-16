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

        const forgotPasswordLink = document.getElementById("forgotPassword");
        if (forgotPasswordLink) {
            //redirect URL after password reset (mostly login page)
            //now redirects to localhost but needs to be set dynamically via branding or domain based
            const redirectUri = "http://localhost:8080/auth/b2c";
            forgotPasswordLink.href = "https://clientsceleste.b2clogin.com/b33cf7f3-86b8-4845-be04-036de31663c8/oauth2/v2.0/authorize?p=B2C_1_Planet_icow_reset_password&client_id=c174dd34-b863-4a7c-a308-1eb08471e6a0&nonce=defaultNonce&redirect_uri="+redirectUri+"&prompt=login";
        }
    }
    //no brand default nuxit
    return false;
}

const brandConfig = applyBranding();