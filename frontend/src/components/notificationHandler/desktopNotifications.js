import { Component } from 'react';

export default class DesktopNotification extends Component {
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification');
    } else {
      // Request permission for desktop notifications
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
          console.log('Notification permission denied');
        }
      });
    }
  }

  showNotification(message) {
    if (Notification.permission === 'granted') {
      new Notification(message?.title || message, {
        body: message?.body,
        icon: message?.icon, // You can add an icon if needed
      });
    } else {
      console.log('Notification permission not granted');
    }
  }

  // render() {
  //   return (
  //     <div>
  //       <button
  //         className="bg-blue-500 text-white p-2 rounded"
  //         onClick={this.showNotification}
  //       >
  //         Show notification
  //       </button>
  //     </div>
  //   );
  // }
}
