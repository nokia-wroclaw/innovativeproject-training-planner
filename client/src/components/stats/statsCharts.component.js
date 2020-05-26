import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';

const StatsCharts = (props) => {
  const [feedback, setFeedback] = useState([]);
  const [generalRating, setGeneralRating] = useState([0, 0, 0, 0]);
  const [clarityOfExpression, setClarityOfExpression] = useState([0, 0, 0, 0]);
  const [teachingMaterials, setTeachingMaterials] = useState([0, 0, 0, 0]);
  const [contentQuality, setContentQuality] = useState([0, 0, 0, 0]);
  const [contactWithGroup, setContactWithGroup] = useState([0, 0, 0, 0]);

  const ratingTypes = [
    'generalRating',
    'clarityOfExpression',
    'teachingMaterials',
    'contentQuality',
    'contactWithGroup',
  ];
  const statsLabel = ['2.0', '3.0', '4.0', '5.0'];
  const statsBackgroundColor = ['#746c72', '#FFCE56', '#36A2EB', '#FF6384'];
  const statsHoverBackgroundColor = [
    '#746c72',
    '#FFCE56',
    '#36A2EB',
    '#FF6384',
  ];
  useEffect(() => {
    if (props) {
      setFeedback(props);
    }
  }, [props]);

  useEffect(() => {
    const setDataSetsForCharts = (feedback, ratingType) => {
      let valueToUpdate;

      switch (ratingType) {
        case 'generalRating':
          valueToUpdate = generalRating;
          break;
        case 'clarityOfExpression':
          valueToUpdate = clarityOfExpression;
          break;
        case 'teachingMaterials':
          valueToUpdate = teachingMaterials;
          break;
        case 'contentQuality':
          valueToUpdate = contentQuality;
          break;
        case 'contactWithGroup':
          valueToUpdate = contactWithGroup;
          break;
        default:
          break;
      }

      if (feedback[ratingType] === '2') {
        valueToUpdate[0]++;
      }
      if (feedback[ratingType] === '3') {
        valueToUpdate[1]++;
      }
      if (feedback[ratingType] === '4') {
        valueToUpdate[2]++;
      }
      if (feedback[ratingType] === '5') {
        valueToUpdate[3]++;
      }

      switch (ratingType) {
        case 'generalRating':
          setGeneralRating(valueToUpdate);
          break;
        case 'clarityOfExpression':
          setClarityOfExpression(valueToUpdate);
          break;
        case 'teachingMaterials':
          setTeachingMaterials(valueToUpdate);
          break;
        case 'contentQuality':
          setContentQuality(valueToUpdate);
          break;
        case 'contactWithGroup':
          setContactWithGroup(valueToUpdate);
          break;
        default:
          break;
      }
    };

    for (const opinion of feedback) {
      for (const type of ratingTypes) {
        setDataSetsForCharts(opinion, type);
      }
    }
  }, [
    feedback,
    ratingTypes,
    generalRating,
    clarityOfExpression,
    contactWithGroup,
    contentQuality,
    teachingMaterials,
  ]);

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

  const renderCharts = () => {
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
      <div className="container center">{renderCharts()}</div>
    </div>
  );
};

export default StatsCharts;
