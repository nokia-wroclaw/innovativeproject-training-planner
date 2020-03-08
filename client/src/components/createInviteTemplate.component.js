import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  TimePicker,
  DatePicker,
  message
} from "antd";

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

export default function CreateInviteTemplate() {
  const [date, setDate] = useState(Date.now());
  const [duration, setDuration] = useState(2);
  const [instructor, setInstructor] = useState(null);
  const [title, setTitle] = useState(null);
  const [agneda, setAgenda] = useState(null);
  const [description, setDesciption] = useState(null);
  const [willLearn, setWillLearn] = useState(null);
  const [mustKnow, setMustKnow] = useState(null);
  const [materials, setMaterials] = useState(null);

  // for now copied from:
  // https://ant.design/components/form/
  // will create custom form ASAP
  return (
    <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
      <Form.Item
        name={["user", "name"]}
        label="Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[{ type: "email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "age"]}
        label="Age"
        rules={[{ type: "number", min: 0, max: 99 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={["user", "website"]} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={["user", "introduction"]} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
