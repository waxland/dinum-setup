const fs = require('fs');

const content = fs.readFileSync('documentation/src/components/DSFRPreviews.tsx', 'utf8');

// Insert a reusable CopyCodeButton component at the top of the file
const copyButtonCode = `
function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button 
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
      title="Copier le code"
    >
      {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
    </button>
  );
}

function PreviewWrapper({ children, code }: { children: React.ReactNode, code?: string }) {
  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm my-6 not-prose">
      {code && <CopyCodeButton code={code} />}
      <div className="p-6 md:p-8 overflow-x-auto flex justify-center">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </div>
    </div>
  );
}
`;

let newContent = content.replace('export function ColorPalettePreview() {', copyButtonCode + '\nexport function ColorPalettePreview() {');

// Wrap some previews with PreviewWrapper
newContent = newContent.replace(
  /export function AlertPreview\(\) \{\n  return \(\n    <div className="not-prose my-6">\n      <div className="fr-alert fr-alert--info">/,
  `export function AlertPreview() {
  const codeSnippet = \`<div class="fr-alert fr-alert--info">
  <h3 class="fr-alert__title">Mise à jour système</h3>
  <p>Une maintenance est prévue ce soir de 20h à 22h.</p>
</div>\`;

  return (
    <PreviewWrapper code={codeSnippet}>
      <div className="fr-alert fr-alert--info">`
).replace(
  /    <\/div>\n  \);\n}/,
  `    </PreviewWrapper>\n  );\n}` // Close PreviewWrapper (we'll manually fix this if there are multiple)
);

fs.writeFileSync('documentation/src/components/DSFRPreviews.tsx', newContent);
