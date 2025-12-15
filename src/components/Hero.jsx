import React, { useEffect } from 'react';


function Hero() {
  
  useEffect(() => {
    const loader = document.getElementById("profile");
    window.addEventListener("load", () => {
      loader.classList.add('active')
    })
  },[]);


  return (
    <section className="hero">
      <div className="container">
        <div className="wrapper">
          <span className="name">Deep Mujpara</span>
          <span className="profile" id='profile'>
            <img src="./profile.jpg" alt="" />
          </span>

          <span className="portfolio">Portfolio</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
