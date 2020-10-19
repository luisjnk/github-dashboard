import * as React from "react";
import fetchmock from "fetch-mock-jest";
import moment from "moment";
import {
  render,
  cleanup,
  act,
} from "@testing-library/react";

import TrendingUsers from "../TrendingUsers";

import { GITHUB_TRENDING_URL_PREFIX, GITHUB_TRENDING_URL_SUFIX, USER_REPOSITORY_QUERY, ERROR_TEST_ID } from "../../../utils/contants";
import { DashboardContextProvider } from "../../../context/dashboard-context";
import { GITHUB_USERS, GITHUBER_USER_DETAILS, STAREST_REPOSITORY_MOCK } from "../../../config/mocks";

describe("TrendingUsers Component", () => {
  beforeEach(cleanup);

  afterEach(() => {
    fetchmock.reset();
    fetchmock.restore();
    cleanup();
    jest.clearAllMocks();
  });

  it("Should render TrendingUsers components with correct values", async () => {
    const now = moment().subtract(1, 'month');
    const last_month = now.format("YYYY-MM-DD");

    const URL = `${GITHUB_TRENDING_URL_PREFIX}${last_month}${GITHUB_TRENDING_URL_SUFIX}`;
    const REPO_URL = `${GITHUB_USERS.items[0].repos_url}${USER_REPOSITORY_QUERY}`;

    fetchmock.get(URL, GITHUB_USERS);
    fetchmock.get(GITHUB_USERS.items[0].url, GITHUBER_USER_DETAILS);
    fetchmock.get(REPO_URL, STAREST_REPOSITORY_MOCK);
   
    const { findByText } = render(
        <DashboardContextProvider>
          <TrendingUsers />
        </DashboardContextProvider>
      );

    await act(async () => {

      await findByText(GITHUBER_USER_DETAILS.name);
      expect(findByText(GITHUBER_USER_DETAILS.name)).toBeTruthy();
      expect(findByText(GITHUBER_USER_DETAILS.followers)).toBeTruthy();
    });
  });

  it("Should render error component because some error happened", async () => {
    const now = moment().subtract(1, 'month');
    const last_month = now.format("YYYY-MM-DD");

    const URL = `${GITHUB_TRENDING_URL_PREFIX}${last_month}${GITHUB_TRENDING_URL_SUFIX}`;
    const REPO_URL = `${GITHUB_USERS.items[0].repos_url}${USER_REPOSITORY_QUERY}`;

    fetchmock.get(URL, { status: 500});
    fetchmock.get(GITHUB_USERS.items[0].url, GITHUBER_USER_DETAILS);
    fetchmock.get(REPO_URL, STAREST_REPOSITORY_MOCK);
   
    const { findByTestId } = render(
        <DashboardContextProvider>
          <TrendingUsers />
        </DashboardContextProvider>
      );

    await act(async () => {

      await findByTestId(ERROR_TEST_ID);
      expect(findByTestId(ERROR_TEST_ID)).toBeTruthy();
    });
  });
});