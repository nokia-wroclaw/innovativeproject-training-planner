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
      <Form.Item name={["date"]} label="Date" rules={[{ required: true }]}>
        <DatePicker /> <TimePicker format="HH:mm" />
      </Form.Item>

      <Form.Item
        name={["duration"]}
        label="Duration:"
        rules={[{ type: "number", min: 1, max: 24, required: true }]}
      >
        <InputNumber /> hours
      </Form.Item>

      <Form.Item
        name={["instructor"]}
        label="Instructor"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={["title"]} label="Title:" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name={["agenda"]} label="Agenda:" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name={["description"]}
        label="Description:"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name={["willLearn"]}
        label="What you will learn:"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item name={["mustKnow"]} label="What you must already know:">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name={["materials"]} label="Materials:">
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
