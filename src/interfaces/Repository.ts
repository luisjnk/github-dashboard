export interface IStarestRepositoriesResponse {
  total_count: number;
  items: Array<IStarestRepository>
}

export interface IStarestRepository {
  name: string,
  description: string,
  url: string,
  stargazers_count: number
}