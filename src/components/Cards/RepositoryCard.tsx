import React from 'react';

interface RepositoryCard {
  name: string
  description: string
  count_stars: number
  isTopRepositories?: boolean
}

const RepositoryCard = ({ name, description, count_stars, isTopRepositories }: RepositoryCard) => {
  const REPOSITORY_CONTAINER = isTopRepositories ? "repository--topRepositories" : "repository";
  const REPOSITORY_CONTENT = "content";
  const REPOSITORY_CAPTION = "caption";
  const REPOSITORY_VERTICE = "repository--border";

  const handleRandomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return isTopRepositories ? {borderTop: `6px solid #${randomColor}`} : {};
  }

  return (
    <div className={REPOSITORY_CONTAINER}>
      <div className={REPOSITORY_VERTICE} style={handleRandomColor()}></div>
      <div className={REPOSITORY_CONTENT}>
        <div className={REPOSITORY_CAPTION}>
          <h1>{name}</h1>
          <div className="repository-star">
            <img src="https://www.flaticon.com/premium-icon/icons/svg/2956/2956879.svg" />
            <span>{count_stars}</span>
          </div>
        </div>
        <br /> 
        <div className="repository--description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default RepositoryCard;