import { transformDate } from "../../toolset/baseFunctions";

export function generateTemplates(templateList, tempEvents) {
    for(let template of templateList)
    {
      let event = {
        title: template.title,
        start: transformDate(template.date,template.startTime),
        end: transformDate(template.date,template.endTime),
      }
      tempEvents.push(event);
    }
}