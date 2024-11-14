import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import resume from '../../Assets/Resume.pdf'
import "./resume.css";
import { pdfjs, Document, Page } from "react-pdf";
import resumee from '../../Assets/resume.png'

function Resume() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <Container fluid className="resume-section">
      <Container>
        <h1 className="resume-heading">
          Download My <strong className="highlighted-text">Resume</strong>
        </h1>
        <Row className="download-row" style={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button
            variant="primary"
            href={resume}
            target="_blank"
            className="download-button"
          >
            <AiOutlineDownload /> &nbsp;Download CV
          </Button>
        </Row>
        <Row className="resume">
          <img src={resumee}/>
        </Row>
        <Row className="download-row" style={{ justifyContent: "center", paddingTop: "20px" }}>
          <Button
            variant="primary"
            href={resume}
            target="_blank"
            className="download-button"
          >
            <AiOutlineDownload /> &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </Container>
  );
}

export default Resume;
