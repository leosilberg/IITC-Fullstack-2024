import AccordionItem from "./AccordionItem.jsx";
import React, { useState } from "react";

export default function Accordion({ items }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  function onToggleExpand(index) {
    setExpandedIndex(expandedIndex == index ? -1 : index);
  }
  return (
    <>
      <ul className="accordion">
        {items.map((item, index) => {
          return (
            <AccordionItem
              item={item}
              expanded={index == expandedIndex}
              onToggleExpand={() => onToggleExpand(index)}
              key={index}
            />
          );
        })}
      </ul>
    </>
  );
}
