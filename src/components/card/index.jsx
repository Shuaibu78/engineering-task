import React from "react";
import "./card.css";

const LaunchesPastCard = ({ data, launchedYear }) => {
  return (
    <div className="cardWrapper">
      {data
        .filter((launch) => launch.launch_year === launchedYear)
        .map(
          ({
            id,
            mission_name,
            links: { flickr_images },
            launch_site: { site_name },
            launch_date_local,
            launch_success,
          }) => (
            <div key={id} className="card">
              <img
                alt="location-reference"
                src={
                  `${flickr_images}` ||
                  "https://live.staticflickr.com/65535/50630802488_8cc373728e_o.jpg"
                }
              />
              <div className="cardDetails">
                <div className="title">
                  <b>Mission Name:</b>
                  <p>&ensp;{mission_name}</p>
                </div>
                <div className="title">
                  <b>Launch Site Name:</b>
                  <p>&ensp;{site_name}</p>
                </div>
                <div className="title">
                  <b>Date:</b>
                  <p>&ensp;{launch_date_local.split("T")[0]}</p>
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default LaunchesPastCard;
