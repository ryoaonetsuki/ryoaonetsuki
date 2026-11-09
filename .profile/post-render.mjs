import { readFileSync, writeFileSync } from "node:fs";

const file = "README.md";
let readme = readFileSync(file, "utf8");
readme = readme.replace(/\n?<!-- premium-custom:[a-z-]+:start -->[\s\S]*?<!-- premium-custom:[a-z-]+:end -->\n?/g, "\n");

const picture = (name, alt, width = "100%") => `<picture><source media="(prefers-color-scheme: dark)" srcset="assets/${name}-dark.svg"><img src="assets/${name}-light.svg" width="${width}" alt="${alt}"></picture>`;
const quote = `<!-- premium-custom:quote:start -->\n${picture("quote", "Random developer quote")}\n<!-- premium-custom:quote:end -->`;
const bring = `<!-- premium-custom:bring:start -->\n${picture("bring", "What I bring")}\n<!-- premium-custom:bring:end -->`;
const focus = `<!-- premium-custom:focus:start -->\n${picture("focus", "Professional focus")}\n<!-- premium-custom:focus:end -->`;
const connect = `<!-- premium-custom:connect:start -->\n${picture("connect", "Connect with me")}\n<!-- premium-custom:connect:end -->`;
const opportunities = `<!-- premium-custom:opportunities:start -->\n${picture("opportunities", "Open to opportunities")}\n<!-- premium-custom:opportunities:end -->`;
const footer = `<!-- premium-custom:footer:start -->\n${picture("profile-views", "Profile views")}\n\n<div align="center">\n<picture><source media="(prefers-color-scheme: dark)" srcset="assets/portfolio-dark.svg"><img src="assets/portfolio-light.svg" width="260" alt="Portfolio — add your link here later"></picture>\n</div>\n<!-- premium-custom:footer:end -->`;

const lines = readme.split("\n");
const socialLine = lines.find(line => line.includes("assets/social-l-dark.svg")) || "";
const repoButton = lines.find(line => line.includes("tab=repositories") && line.includes("assets/button-")) || "";
const out = [];
for (const line of lines) {
  if (line === socialLine || line === repoButton) continue;
  out.push(line);
  if (line.includes("assets/about-dark.svg")) out.push("", quote);
  if (line.includes("assets/stack-dark.svg")) out.push("", bring, "", focus, "", connect, "", socialLine, "", opportunities);
}
readme = out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd();
readme += "\n\n" + (repoButton ? repoButton + "\n\n" : "") + footer + "\n";
writeFileSync(file, readme);
