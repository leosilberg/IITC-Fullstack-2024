import logo from "./images/logo.svg";
import menu from "./images/icon-hamburger.svg";
import close from "./images/icon-close.svg";
import facebook from "./images/icon-facebook.svg";
import twitter from "./images/icon-twitter.svg";
import pinterest from "./images/icon-pinterest.svg";
import instagram from "./images/icon-instagram.svg";
import iconSnappy from "./images/icon-snappy-process.svg";
import iconPrices from "./images/icon-affordable-prices.svg";
import iconPeople from "./images/icon-people-first.svg";
import mobileNav from "./images/bg-pattern-mobile-nav.svg";
import introPatternRightMobile from "./images/bg-pattern-intro-right-mobile.svg";
import introPatternLeftMobile from "./images/bg-pattern-intro-left-mobile.svg";
import introImageMobile from "./images/image-intro-mobile.jpg";
import workPatternMobile from "./images/bg-pattern-how-we-work-mobile.svg";
import footerPatterMobile from "./images/bg-pattern-footer-mobile.svg";

import introPatternRightDesktop from "./images/bg-pattern-intro-right-desktop.svg";
import introPatternLeftDesktop from "./images/bg-pattern-intro-left-desktop.svg";
import introImageDesktop from "./images/image-intro-desktop.jpg";
import workPatternDesktop from "./images/bg-pattern-how-we-work-desktop.svg";
import footerPatterDesktop from "./images/bg-pattern-footer-desktop.svg";
import Button from "./components/Button.jsx";
import { useState } from "react";
import { useWindowSize } from "./hooks/WindowSizeHook.js";
export default function App() {
  const [menuOpen, setmenuOpen] = useState();
  const { width, height } = useWindowSize();
  return (
    <div className={`bg-white font-karla`}>
      <div
        className={`sticky top-0 z-20 flex flex-col bg-white lg:sticky lg:flex-row lg:justify-between lg:px-40`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <img src={logo} alt="" />
          <img
            src={menuOpen ? close : menu}
            alt=""
            className="block lg:hidden"
            onClick={() => setmenuOpen((prev) => !prev)}
          />
        </div>
        <div
          className={`relative ${menuOpen ? "flex" : "hidden lg:flex"} h-screen flex-col items-center gap-8 bg-primary-700 py-8 font-bold uppercase text-accent-100 *:cursor-pointer lg:h-fit lg:flex-row lg:bg-white lg:py-4 lg:text-accent-400`}
        >
          <a className="hover:text-accent-900">How we work</a>
          <a className="hover:text-accent-900"> Blog</a>
          <a className="hover:text-accent-900">Account</a>
          <Button primary={width < 1024} accent={width >= 1024}>
            View plans
          </Button>
          <img
            src={mobileNav}
            alt=""
            className="absolute bottom-0 right-0 z-0 w-full object-cover lg:hidden"
          />
        </div>
      </div>

      <img
        src={introImageMobile}
        alt=""
        className="block w-screen object-contain lg:hidden"
      />

      <div className="relative bg-primary-700 from-primary-700 from-75% to-white to-75% px-6 py-24 text-accent-100 lg:bg-gradient-to-b lg:px-40">
        <img
          src={introPatternLeftMobile}
          alt=""
          className="absolute left-0 top-0 z-0 block lg:hidden"
        />
        <img
          src={introPatternRightMobile}
          alt=""
          className="absolute bottom-0 right-0 z-0 block translate-y-1/2 lg:hidden"
        />

        <img
          src={introPatternLeftDesktop}
          alt=""
          className="absolute bottom-0 left-0 z-0 hidden translate-y-[15%] lg:block"
        />
        <img
          src={introPatternRightDesktop}
          alt=""
          className="absolute right-0 top-0 z-0 hidden -translate-y-[15%] lg:block"
        />

        <div className="flex gap-8">
          <div className="relative z-10 flex flex-1 flex-col items-center gap-8 text-center lg:items-start lg:text-start">
            <hr className="hidden w-32 border-t-[1px] border-t-accent-100 lg:block" />
            <h1 className="font-DM-Serif text-5xl lg:text-7xl">
              Humanizing your insurance.
            </h1>

            <p>
              Get your life insurance coverage easier and faster. We blend our
              expertise and technology to help you find the plan that’s right
              for you. Ensure you and your loved ones are protected.
            </p>

            <Button primary>View plans</Button>
          </div>
          <img
            src={introImageDesktop}
            alt=""
            className="hidden min-w-0 flex-1 object-contain lg:block"
          />
        </div>
      </div>
      <div className="flex flex-col gap-28 px-6 py-28 lg:px-40">
        <div className="flex flex-col items-center gap-8 text-center text-accent-400 lg:items-start lg:text-start">
          <div className="flex flex-col items-center lg:items-start">
            <hr className="w-32 border-t-[1px] border-t-primary-300" />
            <h2 className="py-8 font-DM-Serif text-5xl text-accent-900 lg:py-16 lg:text-7xl">
              We’re different
            </h2>
          </div>

          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <img src={iconSnappy} alt="" />
              <h3 className="font-DM-Serif text-2xl text-accent-900">
                Snappy Process
              </h3>

              <p>
                Our application process can be completed in minutes, not hours.
                Don’t get stuck filling in tedious forms.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 lg:items-start">
              <img src={iconPrices} alt="" />
              <h3 className="font-DM-Serif text-2xl text-accent-900">
                Affordable Prices
              </h3>

              <p>
                We don’t want you worrying about high monthly costs. Our prices
                may be low, but we still offer the best coverage possible.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 lg:items-start">
              <img src={iconPeople} alt="" />
              <h3 className="font-DM-Serif text-2xl text-accent-900">
                People First
              </h3>

              <p>
                Our plans aren’t full of conditions and clauses to prevent
                payouts. We make sure you’re covered when you need it.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-8 bg-primary-700 px-6 py-[4.5rem] text-center text-accent-100 lg:flex-row lg:items-center lg:justify-between lg:px-20 lg:text-start">
          <img
            src={workPatternMobile}
            alt=""
            className="absolute right-0 top-0 z-0 block h-full object-contain lg:hidden"
          />
          <img
            src={workPatternDesktop}
            alt=""
            className="absolute right-0 top-0 z-0 hidden h-full object-contain lg:block"
          />
          <h2 className="relative z-10 font-DM-Serif text-4xl lg:w-[55%] lg:text-6xl">
            Find out more about how we work
          </h2>

          <Button primary>How we work</Button>
        </div>
      </div>
      <div className="relative bg-accent-100 px-6 py-12 text-accent-900 lg:px-40">
        <div className="relative z-10 flex flex-col items-center gap-8 border-b-2 border-b-neutral-200 py-10 lg:flex-row lg:justify-between">
          <img src={logo} alt="" />
          <div className="flex gap-4">
            <img src={facebook} alt="" />
            <img src={twitter} alt="" />
            <img src={pinterest} alt="" />
            <img src={instagram} alt="" />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8 py-8 text-center lg:text-start">
          <div className="flex flex-col gap-6 font-bold uppercase">
            <h4 className="text-accent-400"> Our company</h4>

            <ul className="flex flex-col gap-2">
              <li> How we work</li>
              <li> Why Insure?</li>
              <li>View plans</li>
              <li>Reviews</li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 font-bold uppercase">
            <h4 className="text-accent-400"> Help me</h4>

            <ul className="flex flex-col gap-2">
              <li> FAQ</li>
              <li>Terms of use</li>
              <li>Privacy policy</li>
              <li> Cookies</li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 font-bold uppercase">
            <h4 className="text-accent-400">Contact</h4>

            <ul className="flex flex-col gap-2">
              <li>Sales</li>
              <li>Support</li>
              <li> Live chat</li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 font-bold uppercase">
            <h4 className="text-accent-400">Others</h4>

            <ul className="flex flex-col gap-2">
              <li>Careers</li>
              <li>Press</li>
              <li> Licenses</li>
            </ul>
          </div>
        </div>
        <img
          src={footerPatterMobile}
          alt=""
          className="absolute left-0 top-0 z-0 block lg:hidden"
        />
        <img
          src={footerPatterDesktop}
          alt=""
          className="absolute left-0 top-0 z-0 hidden lg:block"
        />
      </div>
    </div>
  );
}
