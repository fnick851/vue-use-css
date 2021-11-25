import { onUnmounted } from "vue";

function transformCss(css: string, cssSelector: string): string {
  return css.replace(/& ([^{}])+{/g, (match) => {
    return (
      match
        .split(",") // multiple rules on the same line split by a comma
        .map((cssSplit) => {
          cssSplit = cssSplit.trim();

          // ignore css rules that don't begin with '&'
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
          // if it's not a built-in selector, prepend the data attribute. Otherwise, append
          return !builtIn
            ? `${cssSelector} ${cssSplit}, ${cssSelector}${cssSplit}`
            : `${cssSelector} ${cssSplit}, ${cssSplit}${cssSelector}`;
        })
        .join(", ") + " {"
    );
  });
}

declare global {
  interface Window {
    __VUE_USE_CSS_NAMESPACE_COUNT__: number;
  }
}

function getCssSope(): { attrName: string; attrValue: number } {
  if (!window.__VUE_USE_CSS_NAMESPACE_COUNT__) {
    window.__VUE_USE_CSS_NAMESPACE_COUNT__ = 1;
  } else {
    window.__VUE_USE_CSS_NAMESPACE_COUNT__ += 1;
  }
  const attrName = "data-css-scope";
  const attrValue = window.__VUE_USE_CSS_NAMESPACE_COUNT__;
  return { attrName, attrValue };
}

function useCss(css: string): { [key: string]: number } {
  const { attrName, attrValue } = getCssSope();

  const transformedCss = transformCss(css, `[${attrName}='${attrValue}']`);
  console.log(transformedCss);

  const styleElement = document.createElement("style");
  styleElement.textContent = transformedCss;
  styleElement.setAttribute("data-css-for", `[${attrName}='${attrValue}']`);
  document.head.appendChild(styleElement);
  onUnmounted(() => {
    styleElement.remove();
  });

  return {
    [attrName]: attrValue,
  };
}

export default useCss;
