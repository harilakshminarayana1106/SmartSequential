import "./Header.css";

export default function Header({ toggleSidebar }) {
  return (
    <header className="header">

      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <h1>Easy Profit - Post Sales Service CRM</h1>

      <div className="header-right">
        <input placeholder="Search Customer..." />
        🔔 ➕ 😊 Sandeep
      </div>

    </header>
  );
}
