import Accordion from "./Accordion.jsx";
import { useState } from "react";
import IconStar from "./assets/images/icon-star.svg";

const data = [
  {
    title: "What is Frontend Mentor, and how will it help me?",
    content:
      "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.",
  },

  {
    title: "Is Frontend Mentor free?",
    content:
      "Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.",
  },

  {
    title: "Can I use Frontend Mentor projects in my portfolio?",
    content:
      "Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!",
  },

  {
    title: "How can I get help if I'm stuck on a Frontend Mentor challenge?",
    content:
      "The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members.",
  },
];
export default function App() {
  const [items, setItems] = useState(data);

  return (
    <>
      <div className="banner"></div>
      <div className="wrapper">
        <div></div>
        <div className="card">
          <div className="card__header">
            <img src={IconStar} alt="" width={"30px"} height={"30px"} />
            <h1 className="card__title">FAQs</h1>
          </div>
          <Accordion items={items} />
        </div>
        <div></div>
      </div>
    </>
  );
}
