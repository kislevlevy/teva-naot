import React, { Component, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DesktopNotification from './desktopNotifications';

// Function to show a toast notification
const showToast = (message) => {
  toast.info(message?.title + ' / ' + message?.body || message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'text-base font-normal', // Adjust to make it smaller if needed
  });
};

// Function to check if user is active or not and show the appropriate notification
export default function notifyUser(message) {
  if (document.hidden) {
    {
      // User is not on the page, show desktop notification
      const DesktopNotifier = new DesktopNotification();
      DesktopNotifier.showNotification(message);
    }
  } else {
    // User is on the page, show toast notification
    showToast(message);
  }
}
/**USE NOTIFICATIONS:
 * 
 *    import notifyUser from 'path/to/frontend/src/components/notificationHandler/NotificationComp'
 * 
 * send notification by this function, send either string to pop, or object whith title, body, and icon:
 * 
      notifyUser({title: "going back", body: "im going way back", icon: FaArrowAltCircleLeft}
 */
