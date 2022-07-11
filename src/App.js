import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import LaunchesPastCard from "./components/card";
import "./App.css";

const GET_LAUNCHES_PAST = gql`
  query launchesPast($limit: Int) {
    launchesPast(limit: $limit) {
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
  const [launchYear, setLaunchYear] = useState([]);
  const [siteName, setSiteName] = useState("");
  const { loading, error, data } = useQuery(GET_LAUNCHES_PAST, {
    variables: { limit: 40, find: { site_name: `${siteName}` } },
  });

  useEffect(() => {
    setLaunchYear(data?.launchesPast);
  }, []);

  if (loading) return <p>Loading...</p>;
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

  console.log(launchYear);
  return (
    <div className="container">
      <div>
        <input type="text" />
      </div>
      <div>
        <select onChange={(e) => setSiteName(e.target.value)}>
          {
            siteNamesList.map((site) => (
              <option value={site}>{site}</option>
            ))
          }
        </select>
      </div>
      <div className="cardContainer">
        {pastLaunchesYear.map((year) => (
          <div key={year} className="launchCard">
            <div className="title">
              <h2>Launch Year:</h2>
              <h2>&ensp;{year}</h2>
            </div>
            <LaunchesPastCard data={launchYear} launchedYear={year} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
