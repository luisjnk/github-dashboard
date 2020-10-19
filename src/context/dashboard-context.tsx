import * as React from "react";

import { IUserservice, userservice } from "../services/users-service";
import { RepositoryServiceInterface, repositoryService } from "../services/repository-service";

import { IUser, IUserDetails } from "../interfaces/Users";

interface DashboardContextInterface {
  userservice(): IUserservice
  repositoryService(): RepositoryServiceInterface,
  getUserDetails(items: Array<IUser>): Promise<Array<IUserDetails>>
}

const { createContext } = React;
const DashboardContext = createContext({} as DashboardContextInterface);

export const DashboardContextProvider: React.FC = ({ children }) => {

  const getUserDetails = async (items: Array<IUser>) : Promise<Array<IUserDetails>> => {
    const getUserDetailsPromises: Array<Promise<IUserDetails>> = [];

    items.forEach(item => {
      getUserDetailsPromises.push(userservice().getUserDetails(item.url));
    });
    const usersDetails = await Promise.all(getUserDetailsPromises);
    return usersDetails
  }
  
  return (
    <DashboardContext.Provider
      value={{ userservice, repositoryService, getUserDetails }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
