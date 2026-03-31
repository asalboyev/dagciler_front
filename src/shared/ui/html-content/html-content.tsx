import { resolveHtmlImageUrls } from "@/shared/lib/api-image-url";
import styles from "./html-content.module.scss";

interface HtmlContentProps {
  html: string;
  className?: string;
  style?: object
}

export function HtmlContent({ html, className = "", style }: HtmlContentProps) {
  const processedHtml = resolveHtmlImageUrls(html);

  return (
    <div
      className={`${styles.content} ${className}`}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
      style={style}
    />
  );
}
