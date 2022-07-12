import React from "react";
import "./card.css";

const LaunchesPastCard = ({ launchedYear, handleSearch }) => {
  const filteredData = handleSearch()?.filter((launch) => launch.launch_year === launchedYear)
  return (
    <div className="cardWrapper">
      {filteredData?.length > 0
        ? filteredData?.map(
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
          )
        : (
          <h3>No data available</h3>
        )}
    </div>
  );
};

export default LaunchesPastCard;
