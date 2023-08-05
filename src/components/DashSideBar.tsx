import { CSSTransition } from "react-transition-group";
import { useAppSelector } from "../hooks/store.hook";
import animate from "../styles/animate.module.css";
import MainAside from "../components/MainAside";
import Aside from "../components/Aside";
import { useRef } from "react";

const DashSideBar = () => {
  const showSideBar = useAppSelector(state => state.general.showSideBar); 
  const nodeRef = useRef(null);

  return (
    <>
      {/* SHOW FOR LARGE SCREEN */}
      <MainAside />

      {/* SHOW FOR SMALL AND MEDIUM SCREEN */}
      <CSSTransition
        in={showSideBar}
        key={"enter"}
        nodeRef={nodeRef}
        timeout={400}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: animate.slideEnterActive,
          exitActive: animate.slideExitActive,
        }}
      >
        <Aside ref={nodeRef} show={showSideBar} />
      </CSSTransition>
    </>
  );
};

export default DashSideBar;
