import React, { Children } from "react";
import styles from "./SectionCard.module.css";

export default function SectionCard({ className, children }) {
  return <div className={`${styles.SectionCard} ${className}`}>{children}</div>;
}
