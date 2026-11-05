class AutoHeightEmbed extends HTMLElement {

    connectedCallback() {

        const url = "YOUR_GITHUB_HTML_URL";

        this.style.display = "block";
        this.style.width = "100%";
        this.style.height = "300px";

        this.innerHTML = `
            <iframe
                src="${url}"
                style="width:100%; height:300px; border:0; display:block;"
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
        };

        window.addEventListener("message", this.handleMessage);
    }

    disconnectedCallback() {
        window.removeEventListener("message", this.handleMessage);
    }
}

customElements.define("auto-height-embed", AutoHeightEmbed);
