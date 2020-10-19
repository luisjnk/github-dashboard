import React from "react";
import faker from 'faker';

import UserCard from "../Cards/UserCard";
import { IUserDetails, IUsers, IUser } from "../../interfaces/Users";
import DashboardContext from "../../context/dashboard-context";
import Loader from "../Common/Loader";
import Error from "../Common/Error";

const { useEffect, useState, useContext } = React;
const initialState: Array<IUserDetails> = [];

const UsersMostActive: React.FC = () => {
  const { userservice, getUserDetails } = useContext(
    DashboardContext
  );

  const [ TrendingUsers, setTrendingUsers ] = useState(initialState);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ haveError, setHaveError ] = useState(false);

  const { findMostActiveUsers } = userservice();

  const handleUserDetailCalls = async (items: Array<IUser>) => {
    const usersDetails = await getUserDetails(items);
    setTrendingUsers(usersDetails);
  }

  useEffect(() => {
    findMostActiveUsers()
      .then((usersResults: IUsers) => {
        setIsLoading(false);
        handleUserDetailCalls(usersResults.items);
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
          Most Active Users
      </h1>
      </div>
      <div className={"row"}>
        {isLoading && <Loader />}
        {haveError &&  <Error />}
        {TrendingUsers.length > 0 && TrendingUsers.map(item => {
          return <UserCard
            key={item.id} name={item.name || faker.name.findName()}
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

export default UsersMostActive;
