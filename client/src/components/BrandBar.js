import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Card, Row } from 'react-bootstrap';

const BrandBar = observer(() => {
  const {device} = useContext(Context)

  return (
    <Row className="d-flex" style={{flexDirection: 'row'}}>
      {device.brands.map(brand => 
        <Card
          key={brand.id}
          className="p-2"
          style={{width: 'fit-content', marginRight: '5px', cursor: 'pointer'}}
          onClick={() => brand.id !== device.selectedBrand.id ? device.setSelectedBrand(brand) : device.setSelectedBrand({})}
          border={brand.id === device.selectedBrand.id ? 'primary' : 'dark'}
        >
          {brand.name}
        </Card>
      )}
    </Row>
  );
});

export default BrandBar;
