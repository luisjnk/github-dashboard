import * as React from "react";
import fetchmock from "fetch-mock-jest";
import {
  render,
  cleanup,
  act,
} from "@testing-library/react";

import UserCard from "../UserCard";
import { GITHUB_USER_MOCK, STAREST_REPOSITORY_MOCK } from "../../../config/mocks";
import { USER_REPOSITORY_QUERY, REPOSITORY_CARD_TEST_ID } from "../../../utils/contants";
import { DashboardContextProvider } from "../../../context/dashboard-context";

describe("UserCard Component", () => {
  beforeEach(cleanup);

  afterEach(() => {
    fetchmock.reset();
    fetchmock.restore();
    cleanup();
    jest.clearAllMocks();
  });

  it("Should render User card", async () => {
    const URL = `${GITHUB_USER_MOCK.repositoryUrl}${USER_REPOSITORY_QUERY}`;
    fetchmock.get(URL, STAREST_REPOSITORY_MOCK);

    await act(async () => {

      const { findByText } = render(
        <DashboardContextProvider>
          <UserCard
            avatarUrl={GITHUB_USER_MOCK.avatarUrl}
            email={GITHUB_USER_MOCK.email}
            name={GITHUB_USER_MOCK.name}
            numberOfFollowers={GITHUB_USER_MOCK.numberOfFollowers}
            repositoryUrl={GITHUB_USER_MOCK.repositoryUrl}
            url={GITHUB_USER_MOCK.url}
          />
        </DashboardContextProvider>
      );


      await findByText(GITHUB_USER_MOCK.name);
      expect(findByText(GITHUB_USER_MOCK.email)).toBeTruthy();
      expect(findByText(GITHUB_USER_MOCK.avatarUrl)).toBeTruthy();
      expect(findByText(STAREST_REPOSITORY_MOCK[0].description)).toBeTruthy();
      expect(findByText(STAREST_REPOSITORY_MOCK[0].name)).toBeTruthy();
      expect(findByText(STAREST_REPOSITORY_MOCK[0].stargazers_count)).toBeTruthy();
    });
  });

  it("Should render User card but not repository card", async () => {
    const URL = `${GITHUB_USER_MOCK.repositoryUrl}${USER_REPOSITORY_QUERY}`;
    fetchmock.get(URL, []);

    await act(async () => {

      const { findByText, queryByTestId } = render(
        <DashboardContextProvider>
          <UserCard
            avatarUrl={GITHUB_USER_MOCK.avatarUrl}
            email={GITHUB_USER_MOCK.email}
            name={GITHUB_USER_MOCK.name}
            numberOfFollowers={GITHUB_USER_MOCK.numberOfFollowers}
            repositoryUrl={GITHUB_USER_MOCK.repositoryUrl}
            url={GITHUB_USER_MOCK.url}
          />
        </DashboardContextProvider>
      );


      await findByText(GITHUB_USER_MOCK.name);
      expect(findByText(GITHUB_USER_MOCK.email)).toBeTruthy();
      expect(queryByTestId(REPOSITORY_CARD_TEST_ID)).not.toBeInTheDocument();
    });
  });
});