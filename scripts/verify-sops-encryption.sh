#!/bin/bash
set -e

# Target files that should be SOPS-encrypted
FILES_TO_CHECK=()

# Find any .sops.yaml, .sops.env, or .env.production files
while IFS=  read -r -d $'\0'; do
    FILES_TO_CHECK+=("$REPLY")
done < <(find . -type f \( -name "*.sops.yaml" -o -name "*.sops.env" -o -name "*.env.production" \) -print0)

has_error=0

echo "🔍 Checking SOPS encryption hygiene..."

if [ ${#FILES_TO_CHECK[@]} -eq 0 ]; then
    echo "✅ No sensitive target files found (.sops.yaml, .env.production). Skipping check."
    exit 0
fi

for file in "${FILES_TO_CHECK[@]}"; do
    # Skip template or example files
    if [[ "$file" == *".example"* || "$file" == *".tpl"* ]]; then
        continue
    fi
    # removed
    
    # Check for SOPS MAC signature
    if grep -q "sops:" "$file" && grep -q "mac:" "$file"; then
        echo "✅ OK: $file is properly encrypted with SOPS."
    else
        echo "❌ ERROR: $file is NOT encrypted with SOPS. It risks leaking secrets!"
        has_error=1
    fi
done

if [ $has_error -eq 1 ]; then
    echo ""
    echo "⚠️ SOPS hygiene check failed! Please encrypt sensitive files using 'sops -e' before committing."
    exit 1
else
    echo ""
    echo "✅ All sensitive target files are encrypted."
    exit 0
fi
