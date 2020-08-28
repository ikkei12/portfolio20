import React, { useEffect, useState, useRef } from 'react';
import '../../styles/productPage.scss';
import { withRouter, RouteComponentProps } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import CrossIcon from '../../components/CrossIcon';
const VisibilitySensor = require('react-visibility-sensor').default;
interface Product {
  id: number;
  title: string;
  span: string;
  background_color: string;
  images: string;
  descriptions: string;
  skill_ids: string;
  skills: Skill[];
}
interface Skill {
  skill_name: string;
  image_url: string;
}
interface Props extends RouteComponentProps<{}> {}

const ProductPage: React.FC<Props> = (props) => {
  const state: any = props.location.state;
  const product: Product = state!.product;
  const images = product.images.split(',');
  const descriptions = product.descriptions.split(',');

  const [isLoaded, setIsloaded] = useState(false);
  const isFirstLoad = useRef(true);
  useEffect(() => {
    setIsloaded(true);
    setTimeout(() => {
      isFirstLoad.current = false;
    }, 1000);
  }, [props]);
  return (
    <div className="product-page">
      <CSSTransition
        in={isLoaded}
        classNames="product-page__curtain"
        timeout={0}
      >
        <div className="product-page__curtain"> </div>
      </CSSTransition>
      <div className="product-page__content">
        <div className="title__wrapper">
          <CSSTransition in={isLoaded} classNames="title__inner" timeout={1500}>
            <div className="title__inner">
              <p className="title">{product.title}</p>
              <p className="span">{product.span}</p>
              <button
                className="close-button"
                onClick={() => {
                  props.history.push({
                    pathname: '/product',
                  });
                }}
              >
                <span className="close-button__inner">
                  <CrossIcon></CrossIcon>
                </span>
                {/* <p className="close-button__text">C</p> */}
              </button>
            </div>
          </CSSTransition>
          <CSSTransition in={isLoaded} classNames="title__cover" timeout={1500}>
            <div className="title__cover"></div>
          </CSSTransition>
        </div>

        {images.map((image, i) => {
          return (
            <VisibilitySensor partialVisibility>
              {({ isVisible }: any) => (
                <div
                  className={
                    'section' +
                    ' ' +
                    'section' +
                    i +
                    ' ' +
                    (isVisible ? 'section-enter-done' : '') +
                    ' ' +
                    (isFirstLoad.current ? '--first-load' : '')
                  }
                >
                  <img src={image}></img>
                  <div>
                    <p className="description">{descriptions[i]}</p>
                  </div>
                </div>
              )}
            </VisibilitySensor>
          );
        })}
        <div className="skill-section">
          <div className="skill-section__inner">
            <VisibilitySensor partialVisibility>
              {({ isVisible }: any) =>
                product.skills.map((skill, i) => {
                  return (
                    <div
                      className={
                        'skill-card' +
                        ' ' +
                        'skill-card' +
                        i +
                        ' ' +
                        (isVisible ? 'skill-card-enter-done' : '') +
                        ' ' +
                        (isFirstLoad.current ? '--first-load' : '')
                      }
                    >
                      <img
                        src={skill.image_url}
                        className="skill-card__image"
                      ></img>
                      <p className="skill-card__title">{skill.skill_name}</p>
                    </div>
                  );
                })
              }
            </VisibilitySensor>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductPage);
