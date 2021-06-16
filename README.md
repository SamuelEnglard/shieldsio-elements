# shieldsio-elements

[![View this project on NPM](https://img.shields.io/npm/v/shieldsio-elements.svg)](https://www.npmjs.com/package/shieldsio-elements)
![NPM Version](https://img.shields.io/npm/dm/shieldsio-elements.svg)
![Issues Count](https://img.shields.io/github/issues/samuelenglard/shieldsio-elements)
![License](https://img.shields.io/github/license/samuelenglard/shieldsio-elements)
![Type Definitions](https://img.shields.io/npm/types/shieldsio-elements)

Custom HTML Elements and helpers for [Shields.io](https://shields.io/) Badges.

## Shield IO Badges

All Shield.io badges have the following attributes:

- `label`: the left-hand-side text if overwritten; otherwise null.
- `logo`: the logo to use.
- `color`: the color of the right-hand-side background.
- `logocolor`: the color of the logo.
- `labelcolor`: the color of the left-hand-side background.
- `logowidth`: the horizontal space for the logo.
- `badgestyle`: the style of the badge. Can be:
  - `plastic`
  - `flat`
  - `flat-square`
  - `for-the-badge`
  - `social`

### `shieldio-badge` element

Used to show a static badge.

In addition to the common attributes, the static also supports:

- `message` the right-hand-side text.

```html
<shieldio-badge label="Label" message="message" color="green"></shieldio-badge>
```

![Static Example](https://img.shields.io/badge/Label-Message-green)

### `shieldio-badge-dynamic` element

Used to show a dynamic badge.

In addition to the common attributes, the dynamic also supports:

- `dataurl`: the URL of the data to base the badge on.
- `dataquery`: the query for the dynamic content.
- `prefix`: the text to prefix the dynamic content.
- `suffix`: the text to suffix the dynamic content.
- `datatype`: the type of data to process. Can be:
  - `xml`
  - `json`
  - `yaml`

```html
<shieldio-badge-dynamic datatype="xml" dataurl="https://raw.githubusercontent.com/PH16-Productions/tv.ph16.paperplugin/main/pom.xml" label="Java Version" dataquery="//*[local-name() = 'java.version']"></shieldio-badge-dynamic>
```

![Dynamic Example](https://img.shields.io/badge/dynamic/xml?label=Java%20Version&query=%2F%2F%2A%5Blocal-name%28%29%20%3D%20%27java.version%27%5D&url=https%3A%2F%2Fraw.githubusercontent.com%2FPH16-Productions%2Ftv.ph16.paperplugin%2Fmain%2Fpom.xml)

## Other Badges

### `simpleicon-badge` element

Shows a badge for a simple icon.

Supports the following attributes:

- `logo`: the simple icon logo to display.
- `badgestyle`: the style of the badge. Can be:
  - `plastic`
  - `flat`
  - `flat-square`
  - `for-the-badge`
  - `social`

```html
<simpleicon-badge logo="GitHub"></simpleicon-badge>
```

![Simple Example](https://img.shields.io/static/v1?label=&message=GitHub&logo=GitHub&color=181717&logoColor=FFFFFF&style=flat)
