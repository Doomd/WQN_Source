import React from "react";
import Slider from "react-slick";
//import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const SliderContainer = styled.div`
  background: linear-gradient(210deg,#943cff 0%,#dd45d3 40.13%,#fc9a57 90%);
  color: white;
  padding: 3rem 0;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
`

export default () => {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 300,
        autoplaySpeed: 4000
    };

    return (
        <SliderContainer>
            <Slider {...settings}>
                <div>
                    <div className="text-center">
                        <h1 className="h1-slider">Personal Service</h1>
                        <p className="p-slider">One on One Consultation with Insurance Pros</p>
                    </div>
                </div>
                <div>
                    <div className="text-center">
                        <h1 className="h1-slider">Compare the Best</h1>
                        <p className="p-slider">We'll Find you the Best AND Cheapest Options</p>
                    </div>
                </div>
                <div>
                    <div className="text-center">
                        <h1 className="h1-slider">Insurance We Love</h1>
                        <p className="p-slider">We Only Sell Insurance we Believe In</p>
                    </div>
                </div>
            </Slider>
        </SliderContainer>
    )
}
