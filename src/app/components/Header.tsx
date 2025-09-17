import { AirplaneInFlightIcon } from "@phosphor-icons/react/ssr";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="header--wrapper max-app">
        <div className="lhs">
          <AirplaneInFlightIcon
            weight="duotone"
            stroke="currentColor"
            size={32}
            aria-hidden="true"
          />
          <span className="app-name">Autopilot</span>
        </div>
      </div>
    </header>
  );
}
