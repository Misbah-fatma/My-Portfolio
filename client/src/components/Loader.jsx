export default function Loader({ done }) {
  return (
    <div className={`loader ${done ? "done" : ""}`} aria-hidden={done}>
      <div className="boot">
        <p>
          <span className="cm">$</span> npm run portfolio
        </p>
        <p className="boot-line">installing modules</p>
        <p className="boot-line delay-1">compiling src/</p>
        <p className="boot-line delay-2 ok">ready · misbah-fatma</p>
        <div className="loader-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
