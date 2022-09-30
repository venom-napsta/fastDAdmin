import { Button } from 'flowbite-react/lib/esm/components/Button';
import { Modal } from 'flowbite-react/lib/esm/components/Modal';
import React from 'react';

function InputModal({ onClose, showModal }) {
  return (
    <React.Fragment>
      <Button onClick={() => showModal}>Toggle modal</Button>
      <Modal.Body show={showModal} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <label htmlFor="email" value="Your email" />
              </div>
              <input
                type="text"
                id="email"
                placeholder="name@company.com"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="password" value="Your password" />
              </div>
              <input id="password" type="password" required={true} />
            </div>
            <div className="flex justify-between">
              <a
                href="/modal"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{' '}
              <a
                href="/modal"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal.Body>
    </React.Fragment>
  );
}

export default InputModal;
