import React, { useEffect, useState, useRef } from "react";
import "../../styles/githubSlide.scss";
import Graph from "./Graph";
import GithubTitle from "../../components/GithubTitle";
import { CSSTransition } from "react-transition-group";

interface Props {
  contributions: any;
  isLoad: boolean;
}

const GithubSlide: React.FC<Props> = (props) => {
  useEffect(() => {
    console.log(props.contributions);
  }, []);

  const [status, setStatus] = useState(false);
  const isFirstRender = useRef(false);
  useEffect(() => {
    //
    if (isFirstRender.current) {
      if (status) {
        setStatus(false);
      } else {
        setStatus(true);
      }
    }
    isFirstRender.current = true;
  }, [props.isLoad]);
  return (
    <div className="slide github__slide">
      <div className="slide__inner">
        <CSSTransition in={props.isLoad} classNames="wrap" timeout={30}>
          <div className="wrap">
            <Graph contributionsPromise={props.contributions}></Graph>
          </div>
        </CSSTransition>
        <CSSTransition in={props.isLoad} classNames="wrap" timeout={800}>
          <div className="wrap">
            <GithubTitle />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default GithubSlide;
