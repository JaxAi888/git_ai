// 自定义 Mermaid 配色：贴合博客蓝青主题色，节点更醒目、连线更清晰。
// 覆盖 themes/blowfish/assets/js/mermaid.js（Hugo 项目 assets 优先于主题）。
function css(name) {
  return "rgb(" + getComputedStyle(document.documentElement).getPropertyValue(name) + ")";
}

const fontFamily =
  "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,PingFang SC,Microsoft YaHei,sans-serif";

function initMermaidLight() {
  mermaid.initialize({
    theme: "base",
    themeVariables: {
      background: css("--color-neutral"),
      // 主节点：主题主色（蓝）填充 + 深色边框，白字
      primaryColor: css("--color-primary-500"),
      primaryBorderColor: css("--color-primary-700"),
      primaryTextColor: css("--color-neutral-50"),
      // 次节点：主题辅色（青）
      secondaryColor: css("--color-secondary-500"),
      secondaryBorderColor: css("--color-secondary-700"),
      secondaryTextColor: css("--color-neutral-50"),
      tertiaryColor: css("--color-neutral-100"),
      tertiaryBorderColor: css("--color-neutral-400"),
      tertiaryTextColor: css("--color-neutral-800"),
      // 连线与标签：用主色系，比默认灰色更贴主题
      lineColor: css("--color-primary-500"),
      textColor: css("--color-neutral-800"),
      fontFamily: fontFamily,
      fontSize: "16px",
    },
  });
}

function initMermaidDark() {
  mermaid.initialize({
    theme: "base",
    themeVariables: {
      background: css("--color-neutral"),
      primaryColor: css("--color-primary-600"),
      primaryBorderColor: css("--color-primary-400"),
      primaryTextColor: css("--color-neutral-50"),
      secondaryColor: css("--color-secondary-600"),
      secondaryBorderColor: css("--color-secondary-400"),
      secondaryTextColor: css("--color-neutral-50"),
      tertiaryColor: css("--color-neutral-200"),
      tertiaryBorderColor: css("--color-neutral-500"),
      tertiaryTextColor: css("--color-neutral-800"),
      lineColor: css("--color-primary-400"),
      textColor: css("--color-neutral-800"),
      fontFamily: fontFamily,
      fontSize: "16px",
    },
  });
}
