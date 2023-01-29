import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import useRoomTypeHook from '../../../../RentedSpace/RoomType/hooks/roomType.hook';

export default function AdminRoomType({ opened, setOpened, roomTypeItem }) {
  const { createRoomType } = useRoomTypeHook();
  const [name, setName] = useState('');

  const addRoomType = async () => {
    const newRoomType = {
      name
    };

    await createRoomType(newRoomType);
    setOpened(false);
  };

  const updateRoomType = async () => {
    setOpened(false);
  };

  const roomTypeDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setOpened(false)} />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={roomTypeItem ? updateRoomType : addRoomType}
      />
    </>
  );

  useEffect(() => {
    if (roomTypeItem) {
      setName(roomTypeItem.name);
    }
  }, [roomTypeItem]);

  return (
    <Dialog
      visible={opened}
      style={{ width: '450px' }}
      header={roomTypeItem ? 'Update room type' : 'Create room type'}
      modal
      className="p-fluid"
      footer={roomTypeDialogFooter}
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

AdminRoomType.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  roomTypeItem: PropTypes.oneOfType([null, PropTypes.object]).isRequired
};
