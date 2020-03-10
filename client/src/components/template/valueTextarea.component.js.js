import React, { useState } from "react";
import { Form, Input } from "antd";
import InviteStyle from "../../css/inviteTest.module.css";
import DefaultEmailPattern from "./defaultMailPattern.component";

const CustomizedForm = ({ onChange, fields }) => (
  <Form
    name="global_state"
    fields={fields}
    onFieldsChange={(changedFields, allFields) => {
      onChange(allFields);
    }}
  >
    <Form.Item
      name="username"
      rules={[
        {
          message: "Username is required!"
        }
      ]}
    >
      <Input.TextArea rows={15} />
    </Form.Item>
  </Form>
);

const Demo = () => {
  const [fields, setFields] = useState([
    {
      name: ["username"],
      //   value: "Ant Design"
      value: `${DefaultEmailPattern()}`
    }
  ]);
  return (
    <div>
      <CustomizedForm
        fields={fields}
        onChange={newFields => {
          setFields(newFields);
        }}
      />
      {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
    </div>
  );
};
export default Demo;
