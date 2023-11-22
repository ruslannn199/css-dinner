import hljs from 'highlight.js';
hljs.configure({ ignoreUnescapedHTML: true });

export const highlight = (): void => {
  const highlightElems: NodeListOf<HTMLElement> = document.querySelectorAll('pre code');
  highlightElems.forEach((el) => hljs.highlightElement(el));
};
