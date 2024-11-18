import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup } from 'react-bootstrap';

const EditableField = ({ cellData, onItemizedItemEdit }) => (
  <InputGroup className="my-1 flex-nowrap">
    {cellData.leading != null && (
      <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
        <span className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small" style={{ width: '20px', height: '20px' }}>
          {cellData.leading}
        </span>
      </InputGroup.Text>
    )}
    <Form.Control
      className={cellData.textAlign}
      {...cellData}
      aria-label={cellData.name}
      onChange={onItemizedItemEdit}
      required
    />
  </InputGroup>
);

export default EditableField;
