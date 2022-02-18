function tokenizer(text, tokens) {
  for (const [key, value] of Object.entries(tokens)) {
    text = text.replace(new RegExp(`{{ ?${key} ?}}`, 'g'), value);
  }

  return text.trim();
}

module.exports = tokenizer;