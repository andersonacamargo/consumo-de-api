
function ThemeButton({ dark, onToggle }) {

  return (
    <button
      className="theme-button"
      onClick={onToggle}
    >
      {dark ? 'Tema claro' : 'Tema escuro'}
    </button>
  )
}

export default ThemeButton