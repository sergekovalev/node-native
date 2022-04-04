export default function tokenizer(text, tokens) {
  let newText = text;

  for (const [key, value] of Object.entries(tokens)) {
    newText = text.replace(new RegExp(`{{ ?${key} ?}}`, 'g'), value);
  }

  return newText.trim();
}
