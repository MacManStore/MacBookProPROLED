// class AutoHeightEmbed extends HTMLElement {

//     connectedCallback() {

//         const url = "https://macmanstore.github.io/MacBookProPROLED/";

//         this.style.display = "block";
//         this.style.width = "100%";
//         this.style.height = "300px";

//         this.innerHTML = `
//             <iframe
//                 src="${url}"
//                 style="width:100%; height:300px; border:0; display:block;"
//                 scrolling="no">
//             </iframe>
//         `;

//         this.frame = this.querySelector("iframe");
//         this.expectedOrigin = new URL(url).origin;

//         this.handleMessage = (event) => {

//             if (event.origin !== this.expectedOrigin) return;
//             if (event.source !== this.frame.contentWindow) return;
//             if (event.data?.type !== "resize") return;

//             const height = Number(event.data.height);

//             if (!Number.isFinite(height) || height < 1) return;

//             this.style.height = `${height}px`;
//             this.frame.style.height = `${height}px`;
//         };

//         window.addEventListener("message", this.handleMessage);
//     }

//     disconnectedCallback() {
//         window.removeEventListener("message", this.handleMessage);
//     }
// }



class AutoHeightEmbed extends HTMLElement {

    connectedCallback() {

        const url = "https://macmanstore.github.io/MacBookProPROLED/";

        this.style.cssText = `
            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            height: 300px;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        `;

        this.innerHTML = `
            <iframe
                src="${url}"
                style="
                    display: block;
                    width: 100%;
                    min-width: 0;
                    max-width: 100%;
                    height: 300px;
                    border: 0;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                "
                scrolling="no">
            </iframe>
        `;

        this.frame = this.querySelector("iframe");
        this.expectedOrigin = new URL(url).origin;

        this.handleMessage = (event) => {

            if (event.origin !== this.expectedOrigin) return;
            if (event.source !== this.frame.contentWindow) return;
            if (event.data?.type !== "resize") return;

            const height = Number(event.data.height);

            if (!Number.isFinite(height) || height < 1) return;

            this.style.height = `${height}px`;
            this.frame.style.height = `${height}px`;

            console.log("Embedded page dimensions:", {
                elementWidth: this.clientWidth,
                iframeWidth: this.frame.clientWidth,
                contentWidth: event.data.viewportWidth,
                documentWidth: event.data.documentWidth
            });
        };

        window.addEventListener("message", this.handleMessage);
    }

    disconnectedCallback() {
        window.removeEventListener("message", this.handleMessage);
    }
}

customElements.define("auto-height-embed", AutoHeightEmbed);


// customElements.define("auto-height-embed", AutoHeightEmbed);
