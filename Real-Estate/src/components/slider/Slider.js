// import React,{useEffect, useState} from 'react'
// import { useSelector } from 'react-redux'
import "./Slider.css"
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

// export default function Slider({propertyImages}) {
//   const [current, setCurrent] = useState(0);
//     const length = propertyImages.length;

//     const nextSlide = (e) => {
//       e.preventDefault();
//       setCurrent(current === length - 1 ? 0 : current + 1);
//     };
//     const prevSlide = (e) => {
//       e.preventDefault();
//       setCurrent(current === 0 ? length - 1 : current - 1);
//     };

//     if (!Array.isArray(propertyImages) || propertyImages.length <= 0) {
//       return null;
//     }
  
//   return (
//     <>
//      <section className='slider'>
//       <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
//       <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
//       {propertyImages && propertyImages.map((slide, index) => {
//         return (
//           <div
//             className={index === current ? 'slide active' : 'slide'}
//             key={index}>
//             {index === current && (
//               // 
//               <img src={`http://localhost:8000/public/images/${slide}`} alt='travel image' className='image' />
//             )}
//           </div>
//         );
//       })}
//     </section>

//     </>
//   )
// }



// {/* {property &&

// <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
//   <div key={property.id} className="carousel-inner">
//   <div className="carousel-item active">
//   <img src={`http://localhost:3001/public/images/${property[0].propertyId.propertyImages[0]}`} className="d-block w-100" alt="..." />
//   </div>
//   </div>
// </div>  
// } */}


import React, { useState } from "react";

const Slider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Carousel Image ${index + 1}`}
            className={activeIndex === index ? "active" : ""}
          />
        ))}
      </div>
      <div className="carousel-button-container">
        {images.map((image, index) => (
          <button
            key={index}
            className={activeIndex === index ? "active" : ""}
            onClick={() => handleClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
