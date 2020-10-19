import { IUsers, IUserDetails } from "../interfaces/Users";
import { IStarestRepository } from "../interfaces/Repository";
import { 
  USER_REPOSITORY_QUERY,
  GITHUB_TRENDING_URL_PREFIX,
  GITHUB_TRENDING_URL_SUFIX, 
  GITHUB_MOSTACTIVE_URL_PREFIX, 
  GITHUB_MOSTACTIVE_URL_SUFIX, 
} from "../utils/contants";

import moment from "moment";

export interface IUserservice {
  findTrendingUsers(): Promise<IUsers>
  getUserDetails(url?: string): Promise<IUserDetails>
  getMostStarRatedRepository(url?: string): Promise<Array<IStarestRepository>>
  findMostActiveUsers():  Promise<IUsers>
}

export const userservice = (): IUserservice => {

  const constructTrendingUsersUrl = (url: string = "") => {
    const now = moment().subtract(1, 'month');
    const last_month = now.format("YYYY-MM-DD");

    if (url === "") {
      return `${GITHUB_TRENDING_URL_PREFIX}${last_month}${GITHUB_TRENDING_URL_SUFIX}`;
    }
    return `${url}${USER_REPOSITORY_QUERY}`;
  }

  const constructMostActiveUrl = (url: string = "") => {
    const now = moment().subtract(1, 'month');
    const last_month = now.format("YYYY-MM-DD");
  
    if (url === "") {
      return `${GITHUB_MOSTACTIVE_URL_PREFIX}${last_month}${GITHUB_MOSTACTIVE_URL_SUFIX}`;
    }
    return `${url}${USER_REPOSITORY_QUERY}`;
  }

  const constructConfig = () => ({
    headers: { Accept: "application/json" },
    method: "GET"
  })

  const getMostStarRatedRepository = async (url: string): Promise<Array<IStarestRepository>> => {
    const newUrl = constructTrendingUsersUrl(url);
    const config = constructConfig();

    const res = await fetch(newUrl, config);

    if (res.status >= 400) {
      throw new Error("Error when try getMostStarRatedRepository");
    }

    return res.json();
  }

  const getUserDetails = async (url: string): Promise<IUserDetails> => {
    const config = constructConfig();

    const res = await fetch(url, config);

    if (res.status >= 400) {
      throw new Error("Error when try getUserDetails");
    }

    return res.json();
  }

  const findTrendingUsers = async (): Promise<IUsers> => {
    const url = constructTrendingUsersUrl();
    const config = constructConfig();
    const res = await fetch(url, config);

    if (res.status >= 400) {
      throw new Error("Error when try findTrendingUsers");
    }

    return res.json();
  }

  const findMostActiveUsers = async (): Promise<IUsers> => {
    const url = constructMostActiveUrl();
    const config = constructConfig();

    const res = await fetch(url, config);

    if (res.status >= 400) {
      throw new Error("Error when try findMostActiveUsers");
    }

    return res.json();
  }

  return {
    findTrendingUsers,
    getUserDetails,
    getMostStarRatedRepository,
    findMostActiveUsers
  }
}