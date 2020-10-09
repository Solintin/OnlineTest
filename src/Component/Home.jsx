import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { mdiBookOpenPageVariantOutline } from '@mdi/js';
import Icon from "@mdi/react";
import img2 from "../Asset/img2.jpg";
import img3 from "../Asset/img3.jpg";
import img1 from "../Asset/img1.jpg";
import img4 from "../Asset/img4.jpg";
import img5 from "../Asset/img5.jpg";
import img6 from "../Asset/img6.jpg";
import img7 from "../Asset/img7.jpg";
import img8 from "../Asset/img8.jpg";
import img9 from "../Asset/img9.jpg";

const Home = () => {
  const imagePicker = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const RN = Math.floor(Math.random() * imagePicker.length)
  return (
    <>
      <Helmet>
        {" "}
        <title>Quiz App - Home</title>{" "}
      </Helmet>
     
      <div id="home" style={{ backgroundImage : `url(${imagePicker[RN]})` }}>
        
        <section>
          <div style={{textAlign : 'center'}}>
            <Icon path={  mdiBookOpenPageVariantOutline} className="cube" />
          </div>
          <div><h1>Free Online Test Platform</h1></div>

          <div className="play-button-container">
            <ul>
              <li>
                <Link  className='play-button' to="/play/instructions"> <b style={{fontSize : 20}}>Start Test Here</b> </Link>{" "}
              </li>
            </ul>
          </div>
          
        </section>
      </div>
    </>
  );
};

export default Home;
