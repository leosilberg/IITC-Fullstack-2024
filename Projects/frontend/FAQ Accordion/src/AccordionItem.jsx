import IconPlus from "./assets/images/icon-plus.svg";
import IconMinus from "./assets/images/icon-minus.svg";
export default function AccordionItem({ item, expanded, onToggleExpand }) {
  return (
    <>
      <li className="accordion-item">
        <div className="accordion-item__header">
          <h3 className="accordion-item__title" onClick={onToggleExpand}>
            {item.title}
          </h3>
          {expanded ? (
            <img
              src={IconMinus}
              alt=""
              onClick={onToggleExpand}
              className="accordion-item__button"
            />
          ) : (
            <img
              src={IconPlus}
              alt=""
              onClick={onToggleExpand}
              className="accordion-item__button"
            />
          )}
        </div>

        <div
          className={
            expanded
              ? "accordion-item__content-show"
              : "accordion-item__content-hide"
          }
        >
          <p className={"accordion-item__content"}>{item.content}</p>
        </div>
      </li>
    </>
  );
}
