import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import LaunchesPastCard from "./components/card";
import "./App.css";

const GET_LAUNCHES_PAST = gql`
  query launchesPast($limit: Int, $find: LaunchFind) {
    launchesPast(limit: $limit, find: $find) {
      mission_name
      launch_date_local
      launch_site {
        site_name
      }
      links {
        flickr_images
        article_link
      }
      launch_year
      id
      launch_success
    }
  }
`;

function App() {
  const [launchData, setLaunchData] = useState([]);
  const [siteName, setSiteName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParam] = useState(["mission_name", "launch_site"]);
  const { loading, error, data } = useQuery(GET_LAUNCHES_PAST, {
    variables: { limit: 40, find: { site_name: siteName } },
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

  if (data.launchesPast) {
    data.launchesPast.forEach(({ launch_year, launch_site: { site_name } }) => {
      launchYears.push(launch_year);
      siteNames.push(site_name);
    });
  }

  const specificLaunchYears = new Set(launchYears);
  const specificSiteNames = new Set(siteNames);
  const pastLaunchesYear = [];
  const siteNamesList = [];
  const rocketLaunchedYear = specificLaunchYears.forEach((year) =>
    pastLaunchesYear.push(year)
  );
  const rocketSiteName = specificSiteNames.forEach((site) =>
    siteNamesList.push(site)
  );

  const handleSearch = () => {
    return launchData?.filter((data) => (searchParam.some((newItem) => (
      data[newItem]
        .toString()
        .toLowerCase()
        .indexOf(searchQuery.toLowerCase()) > -1
    ))
    ));
  }

  return (
    <div className="container">
      <div className="searchContainer">
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className="selectContainer">
        <label htmlFor="sortRockets">Filter By Site Name:</label>
        <div className="select">
          <select id="sortRockets" value={siteName} onChange={(e) => setSiteName(e.target.value)}>
            <option value="">All site</option>
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
            <LaunchesPastCard launchedYear={year} handleSearch={handleSearch} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
