import React, { Component, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

class DesktopNotification extends Component {
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      // Request permission for desktop notifications
      Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
          console.log("Notification permission denied");
        }
      });
    }
  }

  showNotification(message) {
    if (Notification.permission === "granted") {
      console.log("granted");
      
      new Notification(message, {
        body: 'This is a desktop notification!',
        icon: 'https://via.placeholder.com/48', // You can add an icon if needed
      });
    } else {
      console.log("Notification permission not granted");
    }
  }

  render() {
    return (
      <div>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={this.showNotification}
        >
          Show notification
        </button>
      </div>
    );
  }
}

const NotificationComp = () => {

   // Function to show a toast notification
  const showToast = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'text-base font-normal', // Adjust to make it smaller if needed
    });
  };


  // Function to show desktop notification
  // const showDesktopNotification = (message) => {
  //   if (Notification.permission === 'granted') {
  //     new Notification(message);
  //   } else if (Notification.permission !== 'denied') {
  //     Notification.requestPermission().then(permission => {
  //       if (permission === 'granted') {
  //         new Notification(message);
  //       }
  //     });
  //   }
  // };

  // Function to check if user is active or not and show the appropriate notification
  const notifyUser = (message) => {
    if (document.hidden) {
      // User is not on the page, show desktop notification
      showNotification(message);
    } else {
      // User is on the page, show toast notification
      showToast(message);
    }
  };
  useEffect(() => {
    // Example of a notification being triggered every 10 seconds
    const notificationInterval = setInterval(() => {
    notifyUser("You have a new message!");
    }, 5000);

    return () => clearInterval(notificationInterval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="Toast">
      <h1>Notification Example</h1>
      <ToastContainer />
      <DesktopNotification/>
    </div>
  );
}

  export default NotificationComp



// export default DesktopNotification;
