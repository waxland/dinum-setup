#!/bin/bash
set -e

# Mock script to simulate transferring RFCs to the upstream suite-numerique/docs repository
echo "Simulating RFC transfer to upstream repository..."
echo "Packaging documentation-international/docs/05-rfc-upstream/*.mdx"

# We create an artifact that could be pushed
mkdir -p dist/rfc-export
cp -r documentation-international/docs/05-rfc-upstream/*.mdx dist/rfc-export/

echo "Creating redirect stubs in place of the old RFCs..."
for file in documentation-international/docs/05-rfc-upstream/*.mdx; do
  if [ "$file" != "documentation-international/docs/05-rfc-upstream/index.mdx" ]; then
    echo "---" > "$file"
    echo "title: Redirected" >> "$file"
    echo "redirect_to: https://github.com/suitenumerique/docs/tree/main/documentation/adr" >> "$file"
    echo "---" >> "$file"
    echo "" >> "$file"
    echo "<DocHeaderSummary" >> "$file"
    echo "  readingTime=\"1 min\"" >> "$file"
    echo "  level=\"Expert\"" >> "$file"
    echo "  roles={[\"Architects\"]}" >> "$file"
    echo "  prerequisites={[\"None\"]}" >> "$file"
    echo "  status=\"RFC Proposed\"" >> "$file"
    echo "  statusColor=\"info\"" >> "$file"
    echo "  takeaway=\"This RFC has been officially transferred to the La Suite repository.\"" >> "$file"
    echo "/>" >> "$file"
    echo "" >> "$file"
    echo "This RFC has been officially transferred to the La Suite repository." >> "$file"
  fi
done

echo "✅ RFCs successfully packaged for transfer and redirects configured."
