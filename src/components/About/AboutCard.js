import React from "react";
import Card from "react-bootstrap/Card";
import { AiOutlineArrowRight } from "react-icons/ai";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0" data-aos="zoom-in">
          <p style={{ textAlign: "justify"}}>
            Hey I'm <span className="primary-header">Bharath Mudduluru</span> from Hyderabad, India. I am a B-Tech Final Year computer science student and a passionate programmer.
            <br />
            <br />
            In addition to coding, here are some other things I enjoy doing!
          </p>
          <ul>
            <li className="about-activity">
              <AiOutlineArrowRight /> Sports
            </li>
            <li className="about-activity">
              <AiOutlineArrowRight /> Travelling
            </li>
            <li className="about-activity">
              <AiOutlineArrowRight /> Cubing
            </li>
            <li className="about-activity">
              <AiOutlineArrowRight /> Playing e-sports
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
