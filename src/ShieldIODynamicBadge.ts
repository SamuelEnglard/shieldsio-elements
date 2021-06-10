import { ShieldIOBadge } from './ShieldIOBadge.js'

/**
 * The types of data the {@linkcode ShieldIODynamicBadge} can use.
 */
export enum DynamicDataType {
    JSON = "json",
    XML = "xml",
    YAML = "yaml"
}

/**
 * Shield IO Dynamic Badge
 *
 * @see {@link https://shields.io/}
 */
export class ShieldIODynamicBadge extends ShieldIOBadge {
    /**
     * Create a new instance of the {@linkcode ShieldIODynamicBadge} class.
     */
     constructor() {
        super();
    }

    /** @inheritdoc */
    protected setSrc(): void {
        if (this.dataQuery && this.dataType && this.dataUrl) {
            const srcPath: string[] = [...this.srcParameters];
            if (this.suffix) {
                srcPath.push("suffic=" + encodeURIComponent(this.suffix));
            }
            if (this.prefix) {
                srcPath.push("prefix=" + encodeURIComponent(this.prefix));
            }
            srcPath.push("url=" + encodeURIComponent(this.dataUrl), "query=" + encodeURIComponent(this.dataQuery));
            this.imgSrc = "https://img.shields.io/badge/dynamic/" + this.dataType + "?" + srcPath.join("&");
        } else {
            this.imgSrc = "";
        }
    }

    /**
     * Gets the attributes that should trigger a call to {@linkcode attributeChangedCallback}
     */
    public static get observedAttributes(): string[] {
        return ["dataurl", "dataquery", "prefix", "suffix", "datatype", ...ShieldIOBadge.baseObservedAttributes];
    }

    /**
     * Gets the URL of the data to base the badge on.
     */
    public get dataUrl() : string | null {
        return this.getAttribute("dataurl");
    }
    /**
     * Sets the URL of the data to base the badge on.
     */
    public set dataUrl(v: string | null) {
        if (v) {
            this.setAttribute("dataurl", v);
        } else {
            this.removeAttribute("dataurl");
        }
    }

    /**
     * Gets the query for the dynamic content.
     */
    public get dataQuery() : string | null {
        return this.getAttribute("dataquery");
    }
    /**
     * Sets the query for the dynamic content.
     */
    public set dataQuery(v: string | null) {
        if (v) {
            this.setAttribute("dataquery", v);
        } else {
            this.removeAttribute("dataquery");
        }
    }

    /**
     * Gets the text to prefix the dynamic content.
     */
    public get prefix(): string | null {
        return this.getAttribute("prefix");
    }
    /**
     * Sets the text to prefix the dynamic content.
     */
    public set prefix(v: string | null) {
        if (v) {
            this.setAttribute("prefix", v);
        } else {
            this.removeAttribute("prefix");
        }
    }

    /**
     * Gets the text to suffix the dynamic content.
     */
    public get suffix(): string | null {
        return this.getAttribute("suffix");
    }
    /**
     * Sets the text to suffix the dynamic content.
     */
    public set suffix(v: string | null) {
        if (v) {
            this.setAttribute("suffix", v);
        } else {
            this.removeAttribute("suffix");
        }
    }

    /**
     * Gets the type of data to process.
     */
    public get dataType(): DynamicDataType | null {
        return this.getAttribute("datatype") as DynamicDataType;
    }
    /**
     * Sets the type of data to process.
     */
    public set dataType(v: DynamicDataType | null) {
        if (v) {
            this.setAttribute("datatype", v);
        } else {
            this.removeAttribute("datatype");
        }
    }

    public get tagName() : string {
        return ShieldIODynamicBadge.tagName;
    }

    public static get tagName(): string {
        return "SHIELDIO-BADGE-DYNAMIC";
    }
}

customElements.define(ShieldIODynamicBadge.tagName.toLowerCase(), ShieldIODynamicBadge);

declare global {
    interface HTMLElementTagNameMap {
        "shieldio-badge-dynamic": ShieldIODynamicBadge;
    }
}
