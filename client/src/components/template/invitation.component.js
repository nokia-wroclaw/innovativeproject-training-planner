import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import DefaultEmailPattern from "./defaultMailPattern.component";
import Demo from "./valueTextarea.component.js";
import InviteStyle from "../../css/inviteTest.module.css";

export default function Invitation() {
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
          <div>
            <Demo />
          </div>
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
}
