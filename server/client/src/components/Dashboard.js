import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SurveyList />
      <div className="add-survey-button">
        <Link to="/surveys/new" className="btn-floating btn-large">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
