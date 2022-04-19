import React, { useEffect, useState } from "react";
import { MassjoinerSlideOne } from ".";
import MassjoinerSlideTwo from "./MassjoinerSlideTwo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MassInviteJoiner({
  handleToggler,
  onChange,
  pageState,
  handleCloseModal,
  handleSubmit,
  handleIsEmoji,
  handleUpdateObject,
}) {
  const slider = React.useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {}, [pageState.isReact, pageState.isAcceptRule]);

  const ButtonNext = () => {
    return (
      <div
        className="modal-cancel-btn submit btn modal-control-btns custom-btn-right"
        onClick={() => {
          if (pageState.isReact || pageState.isAcceptRule) {
            slider?.current?.slickNext();
            if (currentSlide === 1) handleSubmit();
          } else {
            if (currentSlide === 0) handleSubmit();
          }
        }}
      >
        <span>
          {(pageState.isReact || pageState.isAcceptRule) && currentSlide === 0
            ? "Next"
            : "Create"}
        </span>
      </div>
    );
  };

  const ButtonBack = () => {
    return (
      <div
        className="modal-cancel-btn btn modal-control-btns custom-btn-left"
        onClick={() => {
          slider?.current?.slickPrev();
          if (currentSlide === 0) handleCloseModal();
        }}
      >
        <span> {currentSlide === 0 ? "Cancel" : "back"}</span>
      </div>
    );
  };
  let settings = {
    infinite: false,
    slidesToScroll: 1,
    nextArrow: <ButtonNext to="prev" />,
    prevArrow: <ButtonBack to="next" />,
    afterChange: (current) => setCurrentSlide(current),
  };
  return (
    <Slider ref={slider} {...settings}>
      <MassjoinerSlideOne {...{ onChange, handleToggler, pageState }} />
      <MassjoinerSlideTwo
        {...{
          onChange,
          handleToggler,
          pageState,
          handleIsEmoji,
          handleUpdateObject,
        }}
      />
    </Slider>
  );
}

export default MassInviteJoiner;
