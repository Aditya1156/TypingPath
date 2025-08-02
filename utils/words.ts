
// A list of common English words for generating typing tests.
const WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over",
  "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these",
  "give", "day", "most", "us", "code", "function", "variable", "constant", "array", "object", "class", "interface", "module", "import", "export",
  "return", "await", "async", "promise", "component", "state", "props", "hook", "effect", "render", "style", "build", "server", "client", "api",
  "request", "response", "json", "error", "debug", "test", "deploy", "git", "commit", "branch", "merge", "pull", "push", "remote", "origin",
  "keyboard", "mouse", "monitor", "developer", "engineer", "design", "product", "manager", "team", "agile", "scrum", "sprint", "meeting"
];

export const generateWords = (count: number) => {
  let text = "";
  for (let i = 0; i < count; i++) {
    text += WORDS[Math.floor(Math.random() * WORDS.length)] + " ";
  }
  return text.trim();
};
