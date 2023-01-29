import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import useHomeTypeHook from '../../../../RentedSpace/HomeType/hooks/homeType.hook';

export default function AdminHomeType({ opened, setOpened, homeTypeItem }) {
  const { createHomeType } = useHomeTypeHook();
  const [name, setName] = useState('');

  const addHomeType = async () => {
    const newHomeType = {
      name
    };

    await createHomeType(newHomeType);
    setOpened(false);
  };

  const updateHomeType = async () => {
    setOpened(false);
  };

  const homeTypeDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setOpened(false)} />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={homeTypeItem ? updateHomeType : addHomeType}
      />
    </>
  );

  useEffect(() => {
    if (homeTypeItem) {
      setName(homeTypeItem.name);
    }
  }, [homeTypeItem]);

  return (
    <Dialog
      visible={opened}
      style={{ width: '450px' }}
      header={homeTypeItem ? 'Update home type' : 'Create home type'}
      modal
      className="p-fluid"
      footer={homeTypeDialogFooter}
      onHide={() => setOpened(false)}
    >
      <div className="col-6">
        <InputText
          placeholder="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>
    </Dialog>
  );
}

AdminHomeType.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  homeTypeItem: PropTypes.oneOfType([null, PropTypes.object]).isRequired
};
