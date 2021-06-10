import { BadgeStyle } from "./BadgeStyle.js";
import { LifecycleCallbacks } from "./LifecycleCallbacks.js";
import { SimpleIcons, icons } from './simple-icons.g.js'

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

    private setSrc(): void {
        if (this.logo) {
            const srcPath: string[] = [];
            const icon = icons[this.logo];
            srcPath.push(
                "label=" + encodeURIComponent(icon.title),
                "logo=" + encodeURIComponent(this.logo)
            );
            let logoAndLabelColor: "FFFFFF" | "000000" = "FFFFFF";
            {
                const iconColor = [
                    parseInt(icon.hex.substr(0, 2), 16),
                    parseInt(icon.hex.substr(2, 2), 16),
                    parseInt(icon.hex.substr(4, 2), 16)
                ].map(c => {
                    c = c / 255.0;
                    if (c <= 0.03928) {
                        return c / 12.92;
                    } else {
                        return Math.pow((c + 0.055) / 1.055, 2.4);
                    }
                });
                const L = 0.2126 * iconColor[0] + 0.7152 * iconColor[1] + 0.0722 * iconColor[2];
                if (L > Math.sqrt(1.05 * 0.05) - 0.05) {
                    logoAndLabelColor = "000000";
                }
            }
            if (this.badgeStyle !== BadgeStyle.Social) {
                srcPath.push(
                    "color=" + encodeURIComponent(icon.hex),
                    "logoColor=" + logoAndLabelColor,
                    "labelColor="  + logoAndLabelColor
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
    public static get baseObservedAttributes(): string[] {
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
