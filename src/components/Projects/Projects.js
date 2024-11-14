import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import ProjectCard from "./ProjectCards";
import Salus from '../../Assets/Projects/Salus.png';
import Ivyestate from '../../Assets/Projects/Ivyestate.png';
import finance from '../../Assets/Projects/finance.jpg';
import attritrack from '../../Assets/Projects/attritrack.jpeg';



import "./project.css";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="Fluorescent-Blue">Works </strong>
        </h1>
        <p>Here are a few projects I've worked on recently.</p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={Ivyestate}
              title="IvyEstate"
              description="IvyEstate is a fully functional real estate marketplace built using the MERN stack, with advanced features like JWT authentication, Google OAuth, Redux Toolkit, and image upload capabilities. This project is designed to provide a seamless experience for users to browse, create, and manage property listings, with advanced search functionality to enhance usability."
              ghLink="https://github.com/bharath0616/IvyEstate"
              demoLink="https://ivyestate-zo0s.onrender.com/"
            />
          </Col>

          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={finance}
              title="Finance Fix"
              description="FinanceFix is a comprehensive web application designed to help users manage their personal finances efficiently. It provides an intuitive platform where users can track income, expenses, investments, and receive personalized financial advice. The application also includes real-time stock and mutual fund recommendations tailored to the user’s financial profile, leveraging data from external APIs. An AI-powered chatbot offers interactive, dialogue-based assistance, making financial management more intuitive."
              ghLink="https://github.com/bharath0616/PFA"
            />
          </Col>
          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={attritrack}
              title="AttriTrack"
              description="AttriTrack is a predictive analytics tool designed to predict customer churn using machine learning. The tool leverages logistic regression to analyze customer data and predict whether a customer is likely to churn. It includes a Flask backend for model serving and a React frontend for user interaction."
              ghLink="https://github.com/bharath0616/AttriTrack"
            />
          </Col>

          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={Salus}
              title="Salus"
              description="Salus is an intelligent video analytics project aimed at enhancing safety and security through the use of MERN Stack for UI and intergration and machine learning technologies."
              ghLink="https://github.com/bharath0616/Salus"
            />
          </Col>
        </Row>
      </Container>
      <ScrollToTop />
    </Container>
  );
}

export default Projects;
