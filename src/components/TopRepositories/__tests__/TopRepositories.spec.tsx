import * as React from "react";
import fetchmock from "fetch-mock-jest";
import moment from "moment";
import {
  render,
  cleanup,
  act,
} from "@testing-library/react";

import TopRepositories from "../TopRepositories";
import {
  GITHUB_USER_MOCK,
  STAREST_REPOSITORY_MOCK,
  STAREST_REPOSITORIES_RESPONSE
} from "../../../config/mocks";

import {
  GITHUB_REPOSITORY_URL_PREFIX,
  GITHUB_REPOSITORY_URL_SUFIX,
  ERROR_TEST_ID
} from "../../../utils/contants";
import { DashboardContextProvider } from "../../../context/dashboard-context";

describe("TopRepositories Component", () => {
  beforeEach(cleanup);

  afterEach(() => {
    fetchmock.reset();
    fetchmock.restore();
    cleanup();
    jest.clearAllMocks();
  });

  it("Should render TopRepostories", async () => {
    const now = moment().subtract(1, 'month');
    const last_month = now.format("YYYY-MM-DD");

    const URL = `${GITHUB_REPOSITORY_URL_PREFIX}${last_month}${GITHUB_REPOSITORY_URL_SUFIX}`;
    fetchmock.get(URL, STAREST_REPOSITORIES_RESPONSE);

    await act(async () => {

      const { findByText } = render(
        <DashboardContextProvider>
          <TopRepositories />
        </DashboardContextProvider>
      );

      await findByText(STAREST_REPOSITORIES_RESPONSE.items[0].name);
      expect(findByText(GITHUB_USER_MOCK.email)).toBeTruthy();
      expect(findByText(GITHUB_USER_MOCK.avatarUrl)).toBeTruthy();
      expect(findByText(STAREST_REPOSITORY_MOCK[0].description)).toBeTruthy();
      expect(findByText(STAREST_REPOSITORY_MOCK[0].name)).toBeTruthy();
      expect(findByText(STAREST_REPOSITORY_MOCK[0].stargazers_count)).toBeTruthy();
    });
  });

  it("Should render error component because some error happened", async () => {
    const now = moment().subtract(1, 'month');
    const last_month = now.format("YYYY-MM-DD");

    const URL = `${GITHUB_REPOSITORY_URL_PREFIX}${last_month}${GITHUB_REPOSITORY_URL_SUFIX}`;
    fetchmock.get(URL, { status: 500});

    await act(async () => {

      const { findByTestId } = render(
        <DashboardContextProvider>
          <TopRepositories />
        </DashboardContextProvider>
      );

      await findByTestId(ERROR_TEST_ID);
      expect(findByTestId(ERROR_TEST_ID)).toBeTruthy();
    });
  });
});