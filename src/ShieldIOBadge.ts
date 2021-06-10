import { BadgeStyle } from "./BadgeStyle.js";
import { LifecycleCallbacks } from "./LifecycleCallbacks.js";
import { SimpleIcons } from './simple-icons.g.js'

/**
 * Base class for Shield IO Badges.
 *
 * @see {@link https://shields.io/}
 */
export abstract class ShieldIOBadge extends HTMLElement implements LifecycleCallbacks {
    private readonly img: HTMLImageElement;

    /**
     * Create a new instance of the {@linkcode ShieldIOBadge} class.
     */
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.img = document.createElement("img");
        this.shadowRoot?.appendChild(this.img);

        this.setSrc();
    }

    /**
     * Called to set {@linkcode imgSrc}.
     */
    protected abstract setSrc(): void;

    /** @inheritdoc */
    public attributeChangedCallback(_: string, __: string, ___: string) {
        this.setSrc();
    }

    /**
     * Gets the observable attributes common to all Shield IO badges.
     */
    public static get baseObservedAttributes(): string[] {
        return ["label", "logo", "color", "logocolor", "labelcolor", "logowidth", "badgestyle"];
    }

    /**
     * Gets the parameters common to all Shield IO badge URLs.
     */
    protected get srcParameters(): string[] {
        const srcPath: string[] = [];
        if(this.label) {
            srcPath.push("label=" + encodeURIComponent(this.label));
        } else {
            srcPath.push("label=");
        }
        if (this.logo) {
            srcPath.push("logo=" + encodeURIComponent(this.logo));
        }
        if (this.color) {
            srcPath.push("color=" + encodeURIComponent(this.color));
        }
        if (this.logoColor) {
            srcPath.push("logoColor=" + encodeURIComponent(this.logoColor));
        }
        if (this.labelColor) {
            srcPath.push("labelColor=" + encodeURIComponent(this.labelColor));
        }
        if (this.logoWidth) {
            srcPath.push("logoWidth=" + encodeURIComponent(this.logoWidth));
        }
        if (this.badgeStyle) {
            srcPath.push("style=" + encodeURIComponent(this.badgeStyle));
        }
        return srcPath;
    }

    /**
     * Gets the source of the inner {@link HTMLImageElement}.
     */
    protected get imgSrc() : string {
        return this.img.src;
    }
    /**
     * Sets the source of the inner {@link HTMLImageElement}.
     */
    protected set imgSrc(v: string) {
        this.img.src = v;
    }

    /**
     * Gets the left-hand-side text if overwriten; otherwise null.
     */
     public get label() : string | null {
        return this.getAttribute("label");
    }
    /**
     * Sets the left-hand-side text. To use default set to null.
     */
    public set label(v : string | null) {
        this.img.alt = v || "";
        if (v) {
            this.setAttribute("label", v);
        } else {
            this.removeAttribute("label");
        }
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
     * Gets the color of the right-hand-side background.
     */
    public get color() : string | null {
        return this.getAttribute("color");
    }
    /**
     * Sets the color of the right-hand-side background.
     */
    public set color(v : string | null) {
        if (v) {
            this.setAttribute("color", v);
        } else {
            this.removeAttribute("color");
        }
    }

    /**
     * Gets the color of the logo.
     */
    public get logoColor() : string | null {
        return this.getAttribute("logocolor");
    }
    /**
     * Sets the color of the logo.
     */
    public set logoColor(v : string | null) {
        if (v) {
            this.setAttribute("logocolor", v);
        } else {
            this.removeAttribute("logocolor");
        }
    }

    /**
     * Gets the color of the left-hand-side background.
     */
    public get labelColor() : string | null {
        return this.getAttribute("labelcolor");
    }
    /**
     * Sets the color of the left-hand-side background.
     */
    public set labelColor(v : string | null) {
        if (v) {
            this.setAttribute("labelcolor", v);
        } else {
            this.removeAttribute("labelcolor");
        }
    }

    /**
     * Gets the horizontal space for the logo.
     */
    public get logoWidth() : number | null {
        var lw = this.getAttribute("logowidth");
        if (lw) {
            return parseInt(lw, 10);
        }
        return null;
    }
    /**
     * Sets the horizontal space for the logo.
     */
    public set logoWidth(v : number | null) {
        if (v) {
            this.setAttribute("logowidth", v.toString());
        } else {
            this.removeAttribute("logowidth");
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
}