import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer--wrapper max-app">
        <p>
          Built by{" "}
          <a
            href="https://bhaveshrawat.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bhavesh Rawat
          </a>{" "}
          for{" "}
          <a
            href="https://chroniclehq.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ChronicleHQ
          </a>
        </p>
      </div>
    </footer>
  );
}
