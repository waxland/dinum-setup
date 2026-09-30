const fs = require('fs');
const content = fs.readFileSync('documentation/src/components/DSFRPreviews.tsx', 'utf8');
const lines = content.split('\n');

const newLines = [];
let importsAdded = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('import ') && !importsAdded) {
    if (!content.includes('import { Copy } from "lucide-react"')) {
      newLines.push('import { Copy, Check } from "lucide-react";');
    }
    importsAdded = true;
  }
  
  newLines.push(line);
}

fs.writeFileSync('documentation/src/components/DSFRPreviews.tsx', newLines.join('\n'));
