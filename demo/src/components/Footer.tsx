import React from "react";
import type { DemoTranslations } from "../i18n/types";

interface FooterProps {
  t: DemoTranslations["footer"];
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="sober-footer" role="contentinfo">
      <div>{t.entity}</div>
      <div>{t.compliance}</div>
    </footer>
  );
};
