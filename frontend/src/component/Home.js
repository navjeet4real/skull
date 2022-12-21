import React, { Fragment } from "react";
import Header from "./Header";
import MemeDashboard from "./MemeDashboard";
import MemeGenerator from "./MemeGenerator";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <MemeGenerator />
      <MemeDashboard />
    </Fragment>
  );
};

export default Home;
