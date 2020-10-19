import React from 'react';

import { IStarestRepositoriesResponse, IStarestRepository } from '../../interfaces/Repository';
import Repository from '../Cards/RepositoryCard';
import DashboardContext from '../../context/dashboard-context';
import Loader from '../Common/Loader';
import Error from "../Common/Error";

const INITIAL_STATE: IStarestRepositoriesResponse = {
  total_count: 0,
  items: []
};

const { useEffect, useState, useContext } = React;

const TopRepositories = () => {
  const { repositoryService } = useContext(
    DashboardContext
  );

  const [isLoading, setIsLoading] = useState(true);
  const { getMostStarRatedRepository } = repositoryService();
  const [starestRepositories, setStarestRepositories] = useState(INITIAL_STATE as IStarestRepositoriesResponse);
  const [ haveError, setHaveError ] = useState(false);

  useEffect(() => {
    getMostStarRatedRepository()
      .then((starestRepository: IStarestRepositoriesResponse) => {
        setIsLoading(false);
        setStarestRepositories(starestRepository);
      })
      .catch(err => {
        setHaveError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={"row--container"}>
      <div className="title">
        <h1>
          Top Repositories
        </h1>
      </div>
      <div className="row">
        {isLoading && <Loader />}
        {haveError && <Error /> }
        {starestRepositories.items.length > 0 && starestRepositories.items.map((starestRepository: IStarestRepository) => {
          return <Repository
            key={starestRepository.name}
            name={starestRepository.name}
            description={starestRepository.description}
            count_stars={starestRepository.stargazers_count}
            isTopRepositories={true}
          />
        })}
      </div>
    </div>
  )
}

export default TopRepositories;