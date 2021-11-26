import { onUnmounted } from "vue";
function transformCss(css, cssSelector) {
  return css.replace(/& ([^{}])+{/g, (match) => {
    return match.split(",").map((cssSplit) => {
      cssSplit = cssSplit.trim();
      if (cssSplit.indexOf("&") === -1)
        return cssSplit.replace("{", "").trim();
      const regexResult = /[^&](.+)[^{]+/g.exec(cssSplit);
      if (regexResult === null) {
        throw new Error("CSS selector is missing.");
      } else {
        cssSplit = regexResult[0].trim();
      }
      let builtIn = false;
      if (!/^([.#]\w+)/.test(cssSplit)) {
        builtIn = true;
      }
      return !builtIn ? `${cssSelector} ${cssSplit}, ${cssSelector}${cssSplit}` : `${cssSelector} ${cssSplit}, ${cssSplit}${cssSelector}`;
    }).join(", ") + " {";
  });
}
function getCssSope() {
  if (!window.__VUE_USE_CSS_NAMESPACE_COUNT__) {
    window.__VUE_USE_CSS_NAMESPACE_COUNT__ = 1;
  } else {
    window.__VUE_USE_CSS_NAMESPACE_COUNT__ += 1;
  }
  const attrName = "data-css-scope";
  const attrValue = window.__VUE_USE_CSS_NAMESPACE_COUNT__;
  return { attrName, attrValue };
}
function useCss(css) {
  const { attrName, attrValue } = getCssSope();
  const transformedCss = transformCss(css, `[${attrName}='${attrValue}']`);
  const styleElement = document.createElement("style");
  styleElement.textContent = transformedCss;
  styleElement.setAttribute("data-css-for", `[${attrName}='${attrValue}']`);
  document.head.appendChild(styleElement);
  onUnmounted(() => {
    styleElement.remove();
  });
  return {
    [attrName]: attrValue
  };
}
export { useCss as default };
