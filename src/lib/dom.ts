export function focusTerminal(): void {
  const focusNow = () => {
    const input = document.getElementById("terminal-input");
    if (input instanceof HTMLInputElement) {
      input.focus();
      return true;
    }
    return false;
  };

  if (focusNow()) return;
  window.setTimeout(() => {
    focusNow();
  }, 280);
}
