export function RequestCta({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="btn-bar group" onClick={onClick}>
      <span className="mark-sq" aria-hidden="true" />
      Оставить заявку
    </button>
  );
}
