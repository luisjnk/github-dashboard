import { IStarestRepositoriesResponse } from "../interfaces/Repository";
import {
  GITHUB_REPOSITORY_URL_PREFIX,
  GITHUB_REPOSITORY_URL_SUFIX
} from "../utils/contants";

import moment from "moment";

export interface RepositoryServiceInterface {
  getMostStarRatedRepository(): Promise<IStarestRepositoriesResponse>
}

export const repositoryService = (): RepositoryServiceInterface => {
  const now = moment().subtract(1, 'month');
  const last_month = now.format("YYYY-MM-DD");

  const constructUrl = () => (
    `${GITHUB_REPOSITORY_URL_PREFIX}${last_month}${GITHUB_REPOSITORY_URL_SUFIX}`
  )

  const constructConfig = () => ({
    headers: { Accept: "application/json" },
    method: "GET"
  })

  const getMostStarRatedRepository = async (): Promise<IStarestRepositoriesResponse> => {
    const newUrl = constructUrl();
    const config = constructConfig();

    const res = await fetch(newUrl, config);
    if (res.status >= 400) {
      throw new Error("Error when findTrendingUsers");
    }

    return res.json();
  }

  return {
    getMostStarRatedRepository
  }
}