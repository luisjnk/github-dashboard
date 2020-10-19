import React from "react";
import UserCard from "../Cards/UserCard";
import { IUsers, IUser, IUserDetails } from "../../interfaces/Users";
import "../../static/css/dashboard.scss";
import DashboardContext from "../../context/dashboard-context";
import Loader from "../Common/Loader";
import faker from 'faker';
import Error from "../Common/Error";

const { useEffect, useState, useContext } = React;
const INITIAL_STATE: Array<IUserDetails> = [];

const TrendingUsers: React.FC = () => {
  const { userservice, getUserDetails } = useContext(
    DashboardContext
  );

  const [TrendingUsers, setTrendingUsers] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [haveError, setHaveError] = useState(false);

  const { findTrendingUsers } = userservice();

  const handleUserDetails = async (items: Array<IUser>) => {
    const usersDetails = await getUserDetails(items);
    setTrendingUsers(usersDetails);
  }

  useEffect(() => {
    findTrendingUsers()
      .then((usersResults: IUsers) => {
        setIsLoading(false)
        handleUserDetails(usersResults.items);
      })
      .catch(err => {
        setIsLoading(false);
        setHaveError(true);
      });
  }, []);

  return (
    <div className={"row--container"}>
      <div className="title">
        <h1>
          Trending Users
        </h1>
      </div>
      <div className={"row"}>
        {isLoading && <Loader />}
        {haveError && <Error />}
        {TrendingUsers.length > 0 && TrendingUsers.map(item => {
          return <UserCard
            key={item.id}
            name={item.name || faker.name.findName()}
            avatarUrl={item.avatar_url}
            email={item.email || faker.internet.email()}
            numberOfFollowers={item.followers}
            repositoryUrl={item.repos_url}
            url={item.html_url}
          />
        })}
      </div>
    </div>
  )
}

export default TrendingUsers;
