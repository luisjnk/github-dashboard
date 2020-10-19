export const USER_REPOSITORY_QUERY = "?q=page=1&per_page=1&sort=stargazers_count&order=desc";

export const GITHUB_REPOSITORY_URL_PREFIX = "https://api.github.com/search/repositories?q=created:>";
export const GITHUB_REPOSITORY_URL_SUFIX = "&page=1&per_page=4&sort=stargazers_count&order=desc";

export const GITHUB_TRENDING_URL_PREFIX = "https://api.github.com/search/users?q=created:>";
export const GITHUB_TRENDING_URL_SUFIX = "&page=1&per_page=3&sort=followers&order=desc";

export const GITHUB_MOSTACTIVE_URL_PREFIX = "https://api.github.com/search/users?q=created:>";
export const GITHUB_MOSTACTIVE_URL_SUFIX = "&page=1&per_page=3&sort=contributions&order=desc";

export const REPOSITORY_CARD_TEST_ID = "RepositoryCard";
export const ERROR_TEST_ID = "Error";
