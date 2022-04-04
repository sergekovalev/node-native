export const includes = (list) =>
  list.map(include => `#include "${include}";`).join('\n');