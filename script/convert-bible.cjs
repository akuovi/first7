const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'raw-bible');
const outputDir = path.join(__dirname, '../src/content/bible');

// 🧹 Clear old files
if (fs.existsSync(outputDir)) {
  fs.readdirSync(outputDir).forEach((file) => {
    if (file.endsWith('.mdx')) {
      fs.unlinkSync(path.join(outputDir, file));
    }
  });
} else {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert book name → slug
const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, ' ').trim();

const files = fs.readdirSync(inputDir);

files.forEach((file) => {
  if (!file.endsWith('.md')) return;

  const raw = fs.readFileSync(path.join(inputDir, file), 'utf-8');

  const bookName = file.replace('.md', '');
  const bookSlug = slugify(bookName);

  // Split by chapters
  const chapters = raw.split(/## CHAPTER \d+/i);

  // Extract chapter numbers
  const chapterNumbers = [...raw.matchAll(/## CHAPTER (\d+)/gi)].map(
    (m) => parseInt(m[1])
  );

  chapters.shift(); // remove intro

  chapters.forEach((chapterText, index) => {
    const chapterNumber = chapterNumbers[index];
    if (!chapterNumber) return;

    const lines = chapterText.split('\n');

    const verses = [];
    let verseCount = 1;

    lines.forEach((line) => {
      const cleaned = line
        .replace(/^\*\*\d+\*\*\s*/, '') // **1**
        .replace(/^\d+\s+/, '')         // 1 text
        .trim();

      // Skip junk
      if (!cleaned) return;
      if (cleaned.toLowerCase().startsWith('chapter')) return;
      if (cleaned.startsWith('#')) return;

      verses.push(
        `<p id="v${verseCount}" class="bible-verse"><span class="verse-number">${verseCount}</span> ${cleaned}</p>`
      );

      verseCount++;
    });

    const versesHtml = verses.join('\n\n');

    const content = `---
book: "${bookSlug}"
chapter: ${chapterNumber}
---

## ${bookName} ${chapterNumber}

${versesHtml}
`;

    const fileName = `${bookSlug}-${chapterNumber}.mdx`;
    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(filePath, content);
  });

  console.log(`Converted ${bookName}`);
});

console.log('All books converted successfully.');