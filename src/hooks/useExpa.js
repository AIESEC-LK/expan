import { gql, useQuery } from "@apollo/client";
import _ from "lodash";
//import dayJs from "dayjs";

export const GET_APPLICATIONS = gql`
  query ApplicationIndexQuery(
    $applied_at: Boolean!
    $applicant_name: Boolean!
    $lc_alignment: Boolean!
    $date_marked_approved: Boolean!
    $date_marked_realized: Boolean!
    $page: Int
    $perPage: Int
    $filters: ApplicationFilter
    $sort: String
    $q: String
    $home_mc: Boolean!
    $home_lc: Boolean!
  ) {
    allOpportunityApplication(
      page: $page
      per_page: $perPage
      q: $q
      filters: $filters
      sort: $sort
    ) {
      ...ApplicationList
    }
  }

  fragment ApplicationList on OpportunityApplicationList {
    data {
      id
      status
      date_realized @include(if: $date_marked_realized)
      date_approved @include(if: $date_marked_approved)
      opportunity {
        id
        programme {
          short_name_display
        }
        home_lc @include(if: $home_lc) {
          name
        }
        home_mc @include(if: $home_mc) {
          name
        }
      }
      person {
        id
        full_name @include(if: $applicant_name)
        lc_alignment @include(if: $lc_alignment) {
          id
        }
      }
      created_at @include(if: $applied_at)
    }
    paging {
      total_pages
      current_page
      total_items
    }
  }
`;

//APL, APD, RE
export const useExpa = (
  isLoopFinished,
  personCommitteeValues,
  currentIndex,
  requestedStatus,
  currentAplPage,
  fromDate,
  toDate
) => {
  const initialVariables = {
    page: currentAplPage,
    count: 30,
    filters: {
      person_committee: personCommitteeValues[currentIndex],
    },
    q: "",
    id: true,
    applicant_name: true,
    backgrounds: true,
    email: true,
    ep_id: true,
    opportunity: true,
    opportunity_id: false,
    organization: false,
    status: true,
    applied_at: true,
    date_marked_realized: true,
    date_marked_approved: true,
    date_ep_accepted_offer: true,
    date_marked_accepted_by_host: true,
    gep_opportunities: false,
    slot: false,
    languages: false,
    sdg: false,
    sdg_target: false,
    campaign_id: false,
    experience_start_date: true,
    experience_end_date: true,
    host_mc: true,
    host_lc: true,
    home_mc: true,
    home_lc: true,
    lc_alignment: true,
    phone_number: false,
    tags: false,
    nps_score: false,
    nationality: false,
    product: false,
    sub_product: false,
    skills: false,
    shortlisted: false,
    "has_standards_survey?": false,
    duration_type: false,
    sort: "",
    pagination: {
      page: 1,
    },
  };

  // const formattedFromDate = dayJs(fromDate.$d).format("YYYY-MM-DD 00:00:00");
  // const formattedToDate = dayJs(toDate.$d).format("YYYY-MM-DD 23:59:59");

  let finalizedVariables = _.cloneDeep(initialVariables);

  if (requestedStatus == "APL") {
    finalizedVariables.filters.created_at = {
      from: fromDate,
      to: toDate,
    };
  }

  if (requestedStatus == "APD") {
    finalizedVariables.filters.date_approved = {
      from: fromDate,
      to: toDate,
    };
  }

  if (requestedStatus == "RE") {
    finalizedVariables.filters.date_realized = {
      from: fromDate,
      to: toDate,
    };
  }

  const { error, data, loading } = useQuery(GET_APPLICATIONS, {
    variables: finalizedVariables,
    skip: isLoopFinished,
  });


  return {
    error,
    data,
    loading,
  };
};
