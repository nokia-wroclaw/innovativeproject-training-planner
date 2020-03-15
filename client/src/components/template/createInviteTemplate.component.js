import React, { useState, Redirect } from "react";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";
import axios from "axios";

const CreateInviteTemplate = props => {
  const [dateObj, setDate] = useState(null);
  const [duration, setDuration] = useState(2);
  const [instructor, setInstructor] = useState("");
  const [title, setTitle] = useState("");
  const [agenda, setAgenda] = useState("");
  const [description, setDescription] = useState("");
  const [willLearn, setWillLearn] = useState("");
  const [mustKnow, setMustKnow] = useState("");
  const [materials, setMaterials] = useState("");

  function onSubmit(e) {
    // e.preventDefault();
    const date = dateObj.toJSON();
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

    axios.post("/inviteTemplate/save", template).then(res => {
      console.log(res.data.message);
      props.history.push("/invitation/" + res.data._id);
    });
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 }
  };

  return (
    <Form {...layout} onFinish={onSubmit} name="nest-messages">
      <Form.Item name={["date"]} label="Date" rules={[{ required: true }]}>
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          value={dateObj}
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
          onChange={e => setInstructor(e.target.value)}
        />
      </Form.Item>

      <Form.Item name={["title"]} label="Title:" rules={[{ required: true }]}>
        <Input value={title} onChange={e => setTitle(e.target.value)} />
      </Form.Item>

      <Form.Item name={["agenda"]} label="Agenda:" rules={[{ required: true }]}>
        <Input.TextArea
          value={agenda}
          onChange={e => setAgenda(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={["description"]}
        label="Description:"
        rules={[{ required: true }]}
      >
        <Input.TextArea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={["willLearn"]}
        label="What you will learn:"
        rules={[{ required: true }]}
      >
        <Input.TextArea
          value={willLearn}
          onChange={e => setWillLearn(e.target.value)}
        />
      </Form.Item>

      <Form.Item name={["mustKnow"]} label="What you must already know:">
        <Input.TextArea
          value={mustKnow}
          onChange={e => setMustKnow(e.target.value)}
        />
      </Form.Item>

      <Form.Item name={["materials"]} label="Materials:">
        <Input.TextArea
          value={materials}
          onChange={e => setMaterials(e.target.value)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateInviteTemplate;
