import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();
  const [apiContent, setApiContent] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    // Function to make the AJAX call to the Numbers API
    const fetchData = async () => {
      try {
        const response = await fetch("http://numbersapi.com/1/30/date?json");
        const data = await response.json();
        setApiContent(data.text);

        // Additional information
        const info =
          "Number: " +
          data.number +
          "\n" +
          "Year: " +
          data.year +
          "\n" +
          "Text Length: " +
          data.text.length;
        setAdditionalInfo(info);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    // Call the function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <div className="homepage">
      <Header />
      <Container className="home d-flex flex-column align-items-center justify-content-center flex-wrap text-center">
        <h1 className="home-title">Your Daily Workout Partner</h1>
        {loggedIn ? (
          <div>
            <button className="home-btn" onClick={() => navigate("/exercise")}>
              Add Exercise
            </button>
            <p className="api-content">{apiContent}</p>
            <div className="additional-info">
              <h2>Additional Information</h2>
              <p>{additionalInfo}</p>
            </div>
          </div>
        ) : (
          <button className="home-btn" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        )}
      </Container>
    </div>
  );
}
