import React, { useState } from "react";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 }
};

export default function CreateInviteTemplate() {
  let [date, setDate] = useState(null);
  const [duration, setDuration] = useState(2);
  const [instructor, setInstructor] = useState("");
  const [title, setTitle] = useState("pies");
  const [agenda, setAgenda] = useState("");
  const [description, setDescription] = useState("");
  const [willLearn, setWillLearn] = useState("");
  const [mustKnow, setMustKnow] = useState("");
  const [materials, setMaterials] = useState("");

  function onSubmit(event) {
    // event.preventDefault();
    date = date.toJSON();
    const template = {
      date,
      duration,
      instructor,
      title,
      agenda,
      description,
      willLearn,
      mustKnow,
      materials
    };

    console.log(template);

    axios
      .post("/inviteTemplate/save", template)
      .then(res => console.log(res.data));
  }

  return (
    <Form {...layout} onFinish={onSubmit} name="nest-messages">
      <Form.Item name={["date"]} label="Date" rules={[{ required: true }]}>
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          value={date}
          onChange={setDate}
        />
      </Form.Item>

      <Form.Item
        name={["duration"]}
        label="Duration:"
        rules={[{ type: "number", min: 1, max: 24, required: true }]}
      >
        <InputNumber value={duration} onChange={setDuration} />
      </Form.Item>

      <Form.Item
        name={["instructor"]}
        label="Instructor"
        rules={[{ required: true }]}
      >
        <Input
          value={instructor}
          onChange={event => setInstructor(event.target.value)}
        />
      </Form.Item>

      <Form.Item name={["title"]} label="Title:" rules={[{ required: true }]}>
        <Input value={title} onChange={event => setTitle(event.target.value)} />
      </Form.Item>

      <Form.Item name={["agenda"]} label="Agenda:" rules={[{ required: true }]}>
        <Input.TextArea
          value={agenda}
          onChange={event => setAgenda(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={["description"]}
        label="Description:"
        rules={[{ required: true }]}
      >
        <Input.TextArea
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={["willLearn"]}
        label="What you will learn:"
        rules={[{ required: true }]}
      >
        <Input.TextArea
          value={willLearn}
          onChange={event => setWillLearn(event.target.value)}
        />
      </Form.Item>

      <Form.Item name={["mustKnow"]} label="What you must already know:">
        <Input.TextArea
          value={mustKnow}
          onChange={event => setMustKnow(event.target.value)}
        />
      </Form.Item>

      <Form.Item name={["materials"]} label="Materials:">
        <Input.TextArea
          value={materials}
          onChange={event => setMaterials(event.target.value)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
