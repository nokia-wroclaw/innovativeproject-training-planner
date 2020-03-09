import React, { useState } from "react";
import { Form, Input, Button} from "antd";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 }
};

export default function CreateUser() {
  const [username, setUsername] = useState("");

  function onSubmit(event) {
    //event.preventDefault();
    const user = {username};
    axios
      .post("/users/add", user)
      .then(res => console.log(res.data));
      setUsername("");
  }

  return (
    <Form {...layout} onFinish={onSubmit}>
      <Form.Item
        name={["username"]}
        label="Username"
        rules={[{ required: true }]}
      >
        <Input
          value={username}
          onChange={event => setUsername(event.target.value)}
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
