import React from 'react';

import { Modal, Button } from 'flowbite-react';
import { mdiAlert } from '@mdi/js';
import Icon from '@mdi/react';

export default function ConfirmationModal({
  isConfirmOpen,
  setIsConfirmOpen,
  message,
  setIsConfirmed,
}) {
  return (
    <Modal
      show={isConfirmOpen}
      onClose={() => setIsConfirmOpen(false)}
      size="md"
      popup={true}
    >
      <Modal.Header className="bg-white border-b border-gray-200">
        <Icon path={mdiAlert} size={1.2} className="text-red-600" />
      </Modal.Header>
      <Modal.Body className="bg-white mt-5">
        <p className="text-base text-gray-700 rtl">{message}</p>
      </Modal.Body>
      <Modal.Footer className="bg-white border-t border-gray-200">
        <Button onClick={() => setIsConfirmed(true)} color="failure">
          אשר
        </Button>
        <Button onClick={() => setIsConfirmOpen(false)} color="gray">
          בטל
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
