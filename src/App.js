import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import LaunchesPastCard from "./components/card";
import { GET_LAUNCHES_PAST } from "./graphql/queries";
import "./App.css";

function App() {
  const [launchData, setLaunchData] = useState([]);
  const [launchSiteName, setLaunchSiteName] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParam] = useState(["mission_name", "launch_site"]);

  const { loading, error, data } = useQuery(GET_LAUNCHES_PAST, {
    variables: { limit: 40 },
  });

  useEffect(() => {
    setLaunchData(data?.launchesPast);
  }, [data]);

  if (loading) return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
      <h4>Loading Launch Past Data</h4>
    </div>
  );
  if (error) return <p>Error</p>;

  const launchYears = [];
  const siteNames = [];
  const pastLaunchesYear = [];
  const siteNamesList = [];

  if (data.launchesPast) {
    data.launchesPast.forEach(({ launch_year, launch_site: { site_name } }) => {
      launchYears.push(launch_year);
      siteNames.push(site_name);
    });
  }

  const specificLaunchYears = new Set(launchYears);
  const specificSiteNames = new Set(siteNames);
  specificLaunchYears.forEach((year) =>
    pastLaunchesYear.push(year)
  );
  specificSiteNames.forEach((site) =>
    siteNamesList.push(site)
  );

  const searchQueryData = () => {
    return launchData?.filter((data) => {
      if (data?.launch_site?.site_name === launchSiteName) {
        return searchParam.some((param) => (
          data[param]
            .toString()
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) > -1
        ))
      } else if (launchSiteName === "All") {
        return searchParam.some((param) => (
          data[param]
            .toString()
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) > -1
        ))
      }
    });
  }

  return (
    <div className="container">
      <div className="searchContainer">
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className="selectContainer">
        <label htmlFor="sortRockets">Filter By Site Name:</label>
        <div className="select">
          <select id="sortRockets" value={launchSiteName} onChange={(e) => setLaunchSiteName(e.target.value)}>
            <option value="All">All site</option>
            <option value="CCAFS SLC 40">CCAFS SLC 40</option>
            <option value="VAFB SLC 4E">VAFB SLC 4E</option>
            <option value="KSC LC 39A">KSC LC 39A</option>
          </select>
          <span className="focus"></span>
        </div>
      </div>
      <div className="cardContainer">
        {pastLaunchesYear.map((year) => (
          <div key={year} className="launchCard">
            <div className="title">
              <h2>Launch Year:</h2>
              <h2>&ensp;{year}</h2>
            </div>
            <LaunchesPastCard launchedYear={year} searchQueryData={searchQueryData} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
