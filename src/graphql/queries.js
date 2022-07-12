import { gql } from "@apollo/client";

export const GET_LAUNCHES_PAST = gql`
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
