const EmailTemplate = (template) => {
  return `
    <div style="font-size: 25px;"> ${template.title} </div>
    <hr style="color: gray; margin-top: 10px; margin-bottom: 10px;">
    <div style="color: gray; font-size:15px; margin-bottom: 5px;">
    Instructor: </div>
    <div> ${template.instructor} </div>
    <hr style="color: gray; margin-top: 10px; margin-bottom: 10px;">
    <div style="color: gray; font-size:15px; margin-bottom: 5px;">
    Date: </div>
    <div> ${template.date} </div>
    <div> ${`${template.startTime} - ${template.endTime}`} </div>
    <hr style="color: gray; margin-top: 10px;
    margin-bottom: 10px;">
    <div style="color: gray; font-size:15px; margin-bottom: 5px;"> 
    Description: </div>
    <div> ${template.description} </div>
    <hr style="color: gray; margin-top: 10px; margin-bottom: 10px;">
    <div style="color: gray; font-size:15px; margin-bottom: 5px;">
    Agenda: </div>
    <div> ${template.agenda} </div>
    <hr style="color: gray; margin-top: 10px; margin-bottom: 10px;">
    <div style="color: gray; font-size:15px;
    margin-bottom: 5px;">
    What you will learn: </div>
    <div> ${template.willLearn} </div>
    <hr style="color: gray; margin-top: 10px; margin-bottom: 10px;">
    <div style="color: gray; font-size:15px; margin-bottom: 5px;">
    What you must know already: </div>
    <div> ${template.mustKnow} </div>
    <hr style="color: gray; margin-top: 10px; margin-bottom: 10px;">
    <div style="color: gray; font-size:15px; margin-bottom: 5px;">
    Materials: </div>
    <div> ${template.materials} </div>
    <hr style="color: gray; margin-top: 10px; margin-bottom: 10px;">
    `;
};
export default EmailTemplate;
