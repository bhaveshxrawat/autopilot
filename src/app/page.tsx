import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./Main";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.app}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
