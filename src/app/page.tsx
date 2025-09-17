import Image from "next/image";
import Header from "./components/Header";
import Main from "./Main";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.app}>
      <Header />
      <Main />
    </div>
  );
}
