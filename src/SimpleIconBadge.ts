import { BadgeStyle } from "./BadgeStyle.js";
import { LifecycleCallbacks } from "./LifecycleCallbacks.js";
import { SimpleIcons, icons, SimpleIcon } from './simple-icons.g.js'

function isLight(r: number, g: number, b: number): boolean {
    [r, g, b] = [r, g, b].map(c => {
        c = c / 255.0;
        if (c <= 0.03928) {
            return c / 12.92;
        }
        return Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) > Math.sqrt(1.05 * 0.05) - 0.05;
}

/**
 * Visualize a simple icon.
 *
 * @example
 *
 * ```html
 * <simpleicon-badge logo="GitHub"></simpleicon-badge>
 * ```
 */
export class SimpleIconBadge extends HTMLElement implements LifecycleCallbacks {
    private readonly img: HTMLImageElement;

    /**
     * Create a new instance of the {@linkcode SimpleIconBadge} class.
     */
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.img = document.createElement("img");
        this.shadowRoot?.appendChild(this.img);

        this.setSrc();
    }

    /**
     * Set the Shield.io source.
     */
    private setSrc(): void {
        let icon: SimpleIcon | null = null;
        if (this.logo && (icon = icons[this.logo])) {
            const srcPath: string[] = [];
            srcPath.push(
                "label=",
                "message=" + encodeURIComponent(icon.title),
                "logo=" + encodeURIComponent(this.logo)
            );
            if (this.badgeStyle !== BadgeStyle.Social) {
                srcPath.push(
                    "color=" + encodeURIComponent(icon.hex),
                    "logoColor=" + (isLight(
                        parseInt(icon.hex.substr(0, 2), 16),
                        parseInt(icon.hex.substr(2, 2), 16),
                        parseInt(icon.hex.substr(4, 2), 16)
                    ) ? "000000" : "FFFFFF")
                );
            }
            if (this.badgeStyle) {
                srcPath.push("style=" + encodeURIComponent(this.badgeStyle));
            }
            this.img.src = "https://img.shields.io/static/v1?" + srcPath.join("&");
            this.img.alt = icon.title;
        } else {
            this.img.src = "";
            this.img.alt = "";
        }
    }

    /** @inheritdoc */
    public attributeChangedCallback(_: string, __: string, ___: string) {
        this.setSrc();
    }

    /**
     * Gets the observable attributes common to all Shield IO badges.
     */
    public static get observedAttributes(): string[] {
        return ["logo", "badgestyle"];
    }

    /**
     * Gets the logo to use.
     *
     */
     public get logo() : SimpleIcons | null {
        return this.getAttribute("logo") as SimpleIcons;
    }
    /**
     * Sets the logo to use.
     *
     */
    public set logo(v : SimpleIcons | null) {
        if (v) {
            this.setAttribute("logo", v);
        } else {
            this.removeAttribute("logo");
        }
    }

    /**
     * Gets the style of the badge.
     *
     * @default {@linkcode BadgeStyle.Flat}
     */
     public get badgeStyle() : BadgeStyle {
        return this.getAttribute("badgestyle") as BadgeStyle || BadgeStyle.Flat;
    }
    /**
     * Sets the style of the badge.
     *
     * @default {@linkcode BadgeStyle.Flat}
     */
    public set badgeStyle(v : BadgeStyle) {
        if (v !== BadgeStyle.Flat) {
            this.setAttribute("badgestyle", v);
        } else {
            this.removeAttribute("badgestyle");
        }
    }

    public get tagName() : string {
        return SimpleIconBadge.tagName;
    }

    public static get tagName(): string {
        return "SIMPLEICON-BADGE";
    }
}

customElements.define(SimpleIconBadge.tagName.toLowerCase(), SimpleIconBadge);

declare global {
    interface HTMLElementTagNameMap {
        "simpleicon-badge": SimpleIconBadge;
    }
}
