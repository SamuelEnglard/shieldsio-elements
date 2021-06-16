import { ShieldIOBadge } from './ShieldIOBadge.js'

/**
 * Shield IO Static Badge
 *
 * @example
 *
 * ```html
 * <shieldio-badge label="Label" message="message" color="green"></shieldio-badge>
 * ```
 *
 * @see {@link https://shields.io/}
 */
 export class ShieldIOStaticBadge extends ShieldIOBadge {
    /**
     * Create a new instance of the {@linkcode ShieldIOStaticBadge} class.
     */
    constructor() {
        super();
    }

    /** @inheritdoc */
    protected setSrc(): void {
        const srcPath: string[] = [...this.srcParameters];
        if (this.message) {
            srcPath.push("message=" + encodeURIComponent(this.message));
        }
        this.imgSrc = "https://img.shields.io/static/v1?" + srcPath.join("&");
    }

    /**
     * Gets the attributes that should trigger a call to {@linkcode attributeChangedCallback}
     */
    public static get observedAttributes(): string[] {
        return ["message", ...ShieldIOBadge.baseObservedAttributes];
    }

    /**
     * Gets the right-hand-side text.
     */
    public get message() : string | null {
        return this.getAttribute("message");
    }
    /**
     * Sets the right-hand-side text.
     */
    public set message(v : string | null) {
        if (v) {
            this.setAttribute("message", v);
        } else {
            this.removeAttribute("message");
        }
    }

    public get tagName() : string {
        return ShieldIOStaticBadge.tagName;
    }

    public static get tagName(): string {
        return "SHIELDIO-BADGE";
    }
}

customElements.define(ShieldIOStaticBadge.tagName.toLowerCase(), ShieldIOStaticBadge);

declare global {
    interface HTMLElementTagNameMap {
        "shieldio-badge": ShieldIOStaticBadge;
    }
}
