import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';

const StatsCharts = ({feedback}) => {
  const [generalRating] = useState([0, 0, 0, 0]);
  const [clarityOfExpression] = useState([0, 0, 0, 0]);
  const [teachingMaterials] = useState([0, 0, 0, 0]);
  const [contentQuality] = useState([0, 0, 0, 0]);
  const [contactWithGroup] = useState([0, 0, 0, 0]);
  const statsLabel = ['2.0', '3.0', '4.0', '5.0'];
  const statsBackgroundColor = ['#746c72', '#FFCE56', '#36A2EB', '#FF6384'];
  const statsHoverBackgroundColor = [
    '#746c72',
    '#FFCE56',
    '#36A2EB',
    '#FF6384',
  ];

  const setDataSetsForCharts = (feedback, typeOfRate, updatedValue) => {
    if (feedback[typeOfRate] === '2') {
      updatedValue[0]++;
    }
    if (feedback[typeOfRate] === '3') {
      updatedValue[1]++;
    }
    if (feedback[typeOfRate] === '4') {
      updatedValue[2]++;
    }
    if (feedback[typeOfRate] === '5') {
      updatedValue[3]++;
    }
  };

  const genereteDataToChart = (statsData) => {
    const data = {
      labels: statsLabel,
      datasets: [
        {
          data: statsData,
          backgroundColor: statsBackgroundColor,
          hoverBackgroundColor: statsHoverBackgroundColor,
        },
      ],
    };
    return data;
  };

  useEffect(() => {
    if (feedback) {
      if (feedback.length !== 0) {
        for (const opinion of feedback) {
          setDataSetsForCharts(opinion, 'generalRating', generalRating);
          setDataSetsForCharts(
              opinion,
              'clarityOfExpression',
              clarityOfExpression,
          );
          setDataSetsForCharts(opinion, 'teachingMaterials', teachingMaterials);
          setDataSetsForCharts(opinion, 'contentQuality', contentQuality);
          setDataSetsForCharts(opinion, 'contactWithGroup', contactWithGroup);
        }
      }
    }
  }, [
    feedback,
    generalRating,
    clarityOfExpression,
    teachingMaterials,
    contentQuality,
    contactWithGroup,
  ]);

  const RenderCharts = () => {
    if (feedback.length !== 0) {
      return (
        <div style={{marginTop: 50}}>
          <h3>This is how other users rated this training.</h3>
          <br />
          <br />
          <div className="z-depth-3 form">
            <h4>General rating</h4>
            <Doughnut data={genereteDataToChart(generalRating)} />
            <br />
            <br />
            <div className="row">
              <div className="col s12 l6">
                <h6>Clarity and precision of expression</h6>
                <Doughnut data={genereteDataToChart(clarityOfExpression)} />
              </div>
              <div className="col s12 l6">
                <h6>Teaching materials</h6>
                <Doughnut data={genereteDataToChart(teachingMaterials)} />
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col s12 l6">
                <h6>Content quality chart</h6>
                <Doughnut data={genereteDataToChart(contentQuality)} />
              </div>
              <div className="col s12 l6">
                <h6>Contact with the group</h6>
                <Doughnut data={genereteDataToChart(contactWithGroup)} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <h4>No one has rated this training yet.</h4>;
    }
  };

  return (
    <div>
      <div className="container center">
        <RenderCharts />
      </div>
    </div>
  );
};

export default StatsCharts;
