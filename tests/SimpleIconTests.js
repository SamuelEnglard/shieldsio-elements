import { icons } from '../dist/index.js'

for (const iconName of Object.keys(icons)) {
    const simpleIconBadge = document.createElement("simpleicon-badge");
    simpleIconBadge.logo = iconName;
    document.body.appendChild(simpleIconBadge);
}