import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/jokes")
      .then((res) => {
        console.log(res);
        setJokes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      {jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.joke}</h3>
        </div>
      ))}
    </div>
  );
};

export default Jokes;
