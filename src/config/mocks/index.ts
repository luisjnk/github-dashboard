import faker from 'faker';

import { UserCardInterfae } from "../../components/Cards/UserCard";
import { IStarestRepository, IStarestRepositoriesResponse } from "../../interfaces/Repository";
import { IUsers, IUser, IUserDetails } from "../../interfaces/Users";

const USER_URL = faker.internet.url();
const REPOS_URL = faker.internet.url();

export const GITHUB_USER_MOCK: UserCardInterfae = {
  name: faker.name.findName(),
  avatarUrl: faker.internet.avatar(),
  email: faker.internet.email(),
  numberOfFollowers: faker.random.number(),
  repositoryUrl: faker.internet.url(),
  url: faker.internet.url()
}

export const STAREST_REPOSITORY_MOCK: Array<IStarestRepository> = [{
  description: faker.random.alphaNumeric(),
  name: faker.name.findName(),
  stargazers_count: faker.random.number(),
  url: faker.internet.url()
}]

export const STAREST_REPOSITORIES_RESPONSE: IStarestRepositoriesResponse = {
  items: STAREST_REPOSITORY_MOCK,
  total_count: faker.random.number()
}

export const GITHUB_USER: IUser = {
  avatar_url: faker.internet.url(),
  repos_url: REPOS_URL,
  followers_url: faker.internet.url(),
  url: USER_URL,
  html_url: faker.internet.url()
}

export const GITHUB_USERS: IUsers = {
  total_count: faker.random.number(),
  incomplete_results: faker.random.number(),
  items: [GITHUB_USER]
}

export const GITHUBER_USER_DETAILS: IUserDetails = {
  login: faker.name.findName(),
  id: faker.random.number(),
  url: USER_URL,
  repos_url: REPOS_URL,
  followers: faker.random.number(),
  avatar_url: faker.internet.url(),
  followers_url: faker.internet.url(),
  name: faker.name.findName(),
  html_url: faker.internet.url()
}