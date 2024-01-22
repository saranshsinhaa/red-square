import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Image } from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import "./aboutcss.css";
const About = () => {
  const Line = useRef(null);
  const text = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      Line.current.classList.add("lineon");
      text.current.classList.add("titleon");
    }, 5);

    return () => {};
  }, []);
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>

      <div className="headingA">
        <div className="line" ref={Line}></div>
        <h1 className="title" ref={text}>
          About Us
        </h1>
      </div>
      <div className="Content1">
        <div className="text">
          <h1>About Red Square</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
            excepturi numquam doloremque ipsum facere debitis! Temporibus
            consequatur nobis porro ad? Laboriosam consectetur incidunt quidem
            earum fugiat autem explicabo odit molestias. Harum aliquid explicabo
            cum commodi iste, vitae odio officia vero cumque exercitationem rem
            ut. Eius vero sequi reprehenderit beatae qui minima itaque illum
            illo, iure tempore non odio. Maxime, laudantium!
          </p>
        </div>

        <div className="imagecontainer">
          <div className="Imageabt">
            <Image
              className="mImage"
              boxSize="400px"
              objectFit="cover"
              src="https://images.unsplash.com/photo-1614771637369-ed94441a651a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
              alt="Segun Adebayo"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
