import React from 'react';

import { IStarestRepository } from '../../interfaces/Repository';
import Repository from './RepositoryCard';
import { REPOSITORY_CARD_TEST_ID } from '../../utils/contants';
import DashboardContext from '../../context/dashboard-context';
import FollowerIcon from './FollowerIcon/FollowerIcon';

export interface UserCardInterfae {
  name: string
  email: string
  numberOfFollowers: number
  avatarUrl: string
  repositoryUrl: string
  url: string
}

const INITIAL_STATE: IStarestRepository = {
  description: "",
  name: "",
  stargazers_count: 0,
  url: ""
}
const { useEffect, useState, useContext } = React;

const UserCard = ({ name, email, numberOfFollowers, avatarUrl, repositoryUrl, url }: UserCardInterfae) => {
  const { userservice } = useContext(
    DashboardContext
  );

  const { getMostStarRatedRepository } = userservice();
  const [starestRepository, setStarestRepository] = useState(INITIAL_STATE as IStarestRepository);
  const [isMouseEnter, setisMouseEnter] = useState(false)

  useEffect(() => {
    getMostStarRatedRepository(repositoryUrl)
      .then((repository: Array<IStarestRepository>) => {
        if (repository.length > 0) {
          setStarestRepository(repository[0]);
        }
      })
      .catch(err => {
        setStarestRepository(INITIAL_STATE);
      });
  }, []);

  const handleOnMouse = () => {
    setisMouseEnter(!isMouseEnter);
  }

  const handleOpenProfile = () => {
    window.open(url, '_blank');
  }

  return (
    <div
      onMouseEnter={handleOnMouse}
      onMouseLeave={handleOnMouse}
      className="card">

      <div className="card-header">
      </div>
      <img className="image--header" src={avatarUrl} alt="Avatar" />
      <div className="card-body">
        <img className="image--avatar" src={avatarUrl} alt="Avatar" />
        <span>{name}</span>
        <span>{email}</span>
        <div className="card-followers">
          <FollowerIcon numberOfFollowers={numberOfFollowers} />
        </div>
        <div className={"vertice-card-body"}></div>
        {starestRepository.name !== "" && isMouseEnter === false &&
          <Repository
            data-testid={REPOSITORY_CARD_TEST_ID}
            key={starestRepository.name}
            name={starestRepository.name}
            description={starestRepository.description}
            count_stars={starestRepository.stargazers_count}
            isTopRepositories={false}
          />
        }
        {isMouseEnter &&
          <button className="btn success" onClick={handleOpenProfile}> Open Profile </button>
        }
      </div>
    </div>
  )
}

export default UserCard;