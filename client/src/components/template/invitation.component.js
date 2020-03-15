import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import InviteStyle from "../../css/inviteTest.module.css";
import axios from "axios";

const Invitation = props => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const validateMessages = {
    required: "This field is required!",
    types: {
      email: "Not a validate email!",
      number: "Not a validate number!"
    },
    number: {
      range: "Must be between ${min} and ${max}"
    }
  };

  const [mail, setMail] = useState("Testing! Attetntion please!\n HELLO?!");

  useEffect(() => {
    axios
      .get(`${props.location.pathname}`)
      .then(res => {
        setMail(`Dear employee,\nWe would like to invite you to partake in our trainig

            Title: ${res.data[0].title}
            Instructor: ${res.data[0].instructor}
            Date: ${res.data[0].date}
            Duration: ${res.data[0].duration} hours
            Agenda: ${res.data[0].agenda}
            Description: ${res.data[0].description}
            What you will learn: ${res.data[0].willLearn}
            What you must already know: ${res.data[0].mustKnow}
            Materials: ${res.data[0].materials}\n\nYour Employer XYZ`);
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <div className={InviteStyle.mainForm}>
      <Form
        {...layout}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "email"]}
          label="Recipents"
          rules={[{ type: "email" }, { required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["subject"]}
          label="Subject"
          rules={[{ type: "text" }, { required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={"Mail"}>
          <Input.TextArea autoSize="true" value={mail} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <div className={InviteStyle.buttons}>
            <Button className="inviteButton" type="default" danger="true">
              Reset
            </Button>

            <Button
              className={InviteStyle.sendButton}
              type="primary"
              htmlType="submit"
            >
              Send
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Invitation;
