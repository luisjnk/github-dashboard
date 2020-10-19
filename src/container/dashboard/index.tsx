import React from 'react';

import TrendingUsers from '../../components/TrendingUsers/TrendingUsers';
import UsersMostActive from '../../components/UsersMostActive/UsersMostActive';
import TopRepositories from '../../components/TopRepositories/TopRepositories';

import { DashboardContextProvider } from '../../context/dashboard-context';

const Dashboard: React.FC = () => {
  return (
    <DashboardContextProvider>
      <div >
        <header className={"header"}>
        </header>
        <div className={"container"}>
          <TrendingUsers />
          <UsersMostActive />
          <TopRepositories />
        </div>
      </div>
    </DashboardContextProvider>
  )
}

export default Dashboard;
