import React from "react";
import { Email, Item, Span, Box } from "react-html-email";

const ReactEmailHTML = template => {
  const defaultText = {
    fontSize: 10,
    fontWeight: "bold",
    color: "gray"
  };

  const templateText = {
    fontSize: 15
  };

  return (
    <Email title="Invitation">
      <Box width={window.screen.width.toString()}>
        <Item align="left">
          <Span fontSize={30}>{template.title}</Span>
        </Item>
        <br />
        <Span {...defaultText}>INSTRUCTOR: </Span>
        <br />
        <Item align="left">
          <Span {...templateText}>{template.instructor}</Span>
        </Item>
        <br />
        <Span {...defaultText}>DATE: </Span>
        <Item align="left">
          <Span {...templateText}>{template.date}</Span>
          <br />
          <Span {...templateText}>
            {template.startTime + " - " + template.endTime}
          </Span>
        </Item>
        <br />
        <Span {...defaultText}>DESCRIPTION: </Span>
        <Item align="left">
          <Span {...templateText}>{template.description}</Span>
        </Item>
        <br />
        <Span {...defaultText}>AGENDA: </Span>
        <Item align="left">
          <Span {...templateText}>{template.agenda}</Span>
        </Item>
        <br />
        <Span {...defaultText}>WHAT YOU WILL LEARN: </Span>
        <Item align="left">
          <Span {...templateText}>{template.willLearn}</Span>
        </Item>
        <br />
        <Span {...defaultText}>WHAT YOU MUST ALREADY KNOW: </Span>
        <Item align="left">
          <Span {...templateText}>{template.mustKnow}</Span>
        </Item>
        <br />
        <Span {...defaultText}>MATERIALS: </Span>
        <Item align="left">
          <Span {...templateText}>{template.materials}</Span>
        </Item>
        <br />
      </Box>
    </Email>
  );
};
export default ReactEmailHTML;
