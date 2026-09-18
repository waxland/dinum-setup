#!/usr/bin/env node

import { execSync } from "child_process";

console.log("\n======================================================================================================");
console.log("  🌐 STATUT DETAILLE DES DEPLOIEMENTS VERCEL (DINUM)");
console.log("======================================================================================================\n");

const projects = [
  { id: "dinum-docs", name: "📚 Documentation Zudoku (SSR)", prodUrl: "https://dinum-docs-waxlands-projects.vercel.app" },
  { id: "dinum-demo", name: "⚡ Demo Web BlockNote (Vite)", prodUrl: "https://dinum-demo-waxlands-projects.vercel.app" },
  { id: "dinum-storybook", name: "🎨 Storybook Composants", prodUrl: "https://dinum-storybook-waxlands-projects.vercel.app" },
];

for (const p of projects) {
  console.log(`📦 \x1b[1;34m${p.name}\x1b[0m (${p.id})`);
  console.log(`   🔗 URL Prod   : \x1b[4;36m${p.prodUrl}\x1b[0m`);
  try {
    const raw = execSync(`npx vercel ls ${p.id} --non-interactive 2>&1`, { encoding: "utf-8" });
    const cleanLines = raw.split("\n")
      .map(l => l.replace(/\x1B\[[0-9;]*[mGKH]/g, "").trim())
      .filter(l => l.includes("https://") && (l.includes("waxlands-projects") || l.includes("Production")));
    
    if (cleanLines.length > 0) {
      const match = cleanLines[0].match(/^([^\s]+)\s+([^\s]+)\s+(https:\/\/[^\s]+)\s+([^\s]+(?:\s+[^\s]+)?)\s+(Production|Preview)\s+([^\s]+)\s+([^\s]+)/);
      if (match) {
        const [, age, project, deployUrl, status, env, duration, user] = match;
        let badge = status;
        if (status.includes("Ready")) badge = "\x1b[32m● READY (En ligne / Succès)\x1b[0m";
        else if (status.includes("Building")) badge = "\x1b[33m● BUILDING (En cours de compilation)\x1b[0m";
        else if (status.includes("Queued")) badge = "\x1b[35m● QUEUED (En file d'attente)\x1b[0m";
        else if (status.includes("Error")) badge = "\x1b[31m● ERROR (Échec du build)\x1b[0m";
        else if (status.includes("Canceled")) badge = "\x1b[90m● CANCELED (Annulé)\x1b[0m";

        console.log(`   ⏱️  Date/Âge   : Il y a ${age} (durée build: ${duration})`);
        console.log(`   🚦 Statut     : ${badge}`);
        console.log(`   🚀 Dernier DP : ${deployUrl}`);
      } else {
        console.log(`   ℹ️  Détail     : ${cleanLines[0]}`);
      }
    } else {
      console.log("   ⚪ Aucun déploiement trouvé.");
    }
  } catch (err) {
    console.log(`   ⚠️ Erreur récupération : ${err.message.split("\n")[0]}`);
  }
  console.log("");
}
console.log("======================================================================================================\n");
