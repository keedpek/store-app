import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup>
      {device.types.map(type => 
        <ListGroup.Item 
          style={{cursor: 'pointer'}}
          onClick={() => type.id !== device.selectedType.id ? device.setSelectedType(type) : device.setSelectedType({})} 
          key={type.id}
          active={type.id === device.selectedType.id}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
});

export default TypeBar;

