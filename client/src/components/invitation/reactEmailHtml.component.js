import React from 'react';
import {Email, Item, Span, Box} from 'react-html-email';

const ReactEmailHTML = (template) => {
  const defaultText = {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'gray',
  };

  const templateText = {
    fontSize: 15,
  };

  return (
    <Email title="Invitation">
      <Box width="600px">
        <Item align="left">
          <Span fontSize={30}>{template.title}</Span>
        </Item>
        <Item align="left">
          <Span {...defaultText}>INSTRUCTOR: </Span>
          <br />
          <Span {...templateText}>{template.instructor}</Span>
        </Item>
        <Item align="left">
          <Span {...defaultText}>DATE: </Span>
          <br />
          <Span {...templateText}>{template.date}</Span>
          <br />
          <Span {...templateText}>
            {template.startTime + ' - ' + template.endTime}
          </Span>
        </Item>
        <Item align="left">
          <Span {...defaultText}>DESCRIPTION: </Span>
          <br />
          <Span {...templateText}>{template.description}</Span>
        </Item>
        <Item align="left">
          <Span {...defaultText}>AGENDA: </Span>
          <br />
          <Span {...templateText}>{template.agenda}</Span>
        </Item>
        <Item align="left">
          <Span {...defaultText}>WHAT YOU WILL LEARN: </Span>
          <br />
          <Span {...templateText}>{template.willLearn}</Span>
        </Item>
        <Item align="left">
          <Span {...defaultText}>WHAT YOU MUST ALREADY KNOW: </Span>
          <br />
          <Span {...templateText}>{template.mustKnow}</Span>
        </Item>
        <Item align="left">
          <Span {...defaultText}>MATERIALS: </Span>
          <br />
          <Span {...templateText}>{template.materials}</Span>
        </Item>
      </Box>
    </Email>
  );
};

export default ReactEmailHTML;
