import React, { useEffect, useState, useRef } from 'react';
import '../../styles/productPage.scss';
import { withRouter, RouteComponentProps } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import CrossIcon from '../../components/CrossIcon';
import axios from 'axios';
import PrevAndNextProducts from '../../components/PrevAndNextProducts';
const VisibilitySensor = require('react-visibility-sensor').default;
interface Product {
  id: number;
  title: string;
  span: string;
  background_color: string;
  web_url: { String: string };
  images: string;
  descriptions: string;
  description_titles: string;
  skill_ids: string;
  start_date: string;
  skills: Skill[];
}
interface Skill {
  skill_name: string;
  image_url: string;
}

interface ProductContent {
  id: { Int64: number; Valid: boolean };
  image_url: { String: string; Valid: boolean };
}
interface Props extends RouteComponentProps<{}> {}

const ProductPage: React.FC<Props> = (props) => {
  const defaultProduct = {
    id: 0,
    title: '',
    span: '',
    background_color: '',
    web_url: { String: '' },
    images: '',
    descriptions: '',
    description_titles: '',
    skill_ids: '',
    start_date: '',
    skills: [],
  };
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [nextProduct, setNextProduct] = useState<ProductContent>();
  const [prevProduct, setPrevProduct] = useState<ProductContent>();

  let images: string[] = [];
  let descriptions: string[] = [];
  let description_titles: string[] = [];
  let skills: Skill[] = [];
  if (product) {
    images = product.images.split(',');
    descriptions = product.descriptions.split(',');
    description_titles = product.description_titles.split(',');
    skills = product.skills;
  }
  const [isLoaded, setIsloaded] = useState(false);
  const isFirstLoad = useRef(true);
  const fetchProduct = async () => {
    const id = props.location.pathname.replace('/product/', '');
    const PRODUCTS_URL = `${process.env.REACT_APP_API_URL}/api/products/${id}`;

    await axios.get(PRODUCTS_URL).then((res) => {
      console.log(res.data);
      setProduct(res.data.product);
      setNextProduct(res.data.next_product);
      setPrevProduct(res.data.prev_product);
    });
  };
  useEffect(() => {
    setIsloaded(true);
    fetchProduct();
    setTimeout(() => {
      isFirstLoad.current = false;
    }, 1000);
  }, []);
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
        <div className="title-section">
          <div className="title-section__inner">
            <CSSTransition
              in={isLoaded}
              classNames="title__inner"
              timeout={1000}
            >
              <div className="title__inner">
                <p className="title">{product!.title}</p>
                <div className="title__cover"></div>
              </div>
            </CSSTransition>
            <CSSTransition
              in={isLoaded}
              classNames="span__inner"
              timeout={1000}
            >
              <div className="span__inner">
                <span className="start-date__wrapper">
                  <p className="start-date">{product!.start_date}</p>
                </span>
                <p className="span">制作期間:{product!.span}</p>
                <div className="span__cover"></div>
              </div>
            </CSSTransition>
            <a className="url__link" href={product!.web_url.String}>
              <p className="url">{product!.web_url.String}</p>
            </a>

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
            </button>
          </div>
        </div>

        {images!.map((image, i) => {
          return (
            <VisibilitySensor partialVisibility>
              {({ isVisible }: { isVisible: boolean }) => (
                <div
                  key={'section' + i}
                  className={
                    'section' +
                    ' ' +
                    'section' +
                    i +
                    ' ' +
                    (isVisible ? '-enter-done' : '') +
                    ' ' +
                    (isFirstLoad.current ? '--first-load' : '')
                  }
                >
                  <img className="section__image" src={image}></img>
                  <div className="description__wrapper">
                    {descriptions![i].split('///').map((description) => {
                      return (
                        <div className="description__inner">
                          <h3
                            className={
                              'description__title' +
                              ' ' +
                              (isVisible ? '--active' : '')
                            }
                          >
                            {description_titles[i]}
                          </h3>
                          <div className="description">
                            <p
                              className={
                                'description__text' +
                                ' ' +
                                (isVisible ? '--active' : '') +
                                ' ' +
                                (isFirstLoad.current ? '--first-load' : '')
                              }
                            >
                              {description}
                            </p>
                            <span className="description__cover"></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </VisibilitySensor>
          );
        })}
        <div className="skill-section">
          <VisibilitySensor partialVisibility>
            {({ isVisible }: { isVisible: boolean }) => {
              return (
                <div className="skill-section__inner">
                  <h3
                    className={
                      'skill-section__title' +
                      ' ' +
                      (isVisible ? '-enter-done' : '') +
                      ' ' +
                      (isFirstLoad.current ? '--first-load' : '')
                    }
                  >
                    CreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWithCreatedWith
                  </h3>
                  <div className="skill-cards">
                    {skills.map((skill, i) => {
                      return (
                        <div
                          className={
                            'skill-card' +
                            ' ' +
                            'skill-card' +
                            i +
                            ' ' +
                            (isVisible ? '-enter-done' : '') +
                            ' ' +
                            (isFirstLoad.current ? '--first-load' : '')
                          }
                        >
                          <div className="skill-card__image-wrapper">
                            <img
                              src={skill.image_url}
                              className="skill-card__image"
                            ></img>
                          </div>
                          <p className="skill-card__title">
                            {skill.skill_name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }}
          </VisibilitySensor>
        </div>
        <div className="other-products__wrapper">
          <PrevAndNextProducts
            next_product={nextProduct}
            prev_product={prevProduct}
          ></PrevAndNextProducts>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductPage);
