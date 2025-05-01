let eventList = ""
let eventData;

async function loadEventData() {
  try {
    const response = await fetch('eventList');
    if (!response.ok) {
      throw new Error(`Request error status: ${response.status}`);
    }
    eventData = await response.json();
    console.log('Saved event data:', eventData);

  } catch (error) {
    console.error('Failed to load event data:', error);
  }
}

async function loadEvent(event) {
    try {
        const response = await fetch(`static/events/${event}`);
        if (!response.ok) {
          throw new Error(`Request error status: ${response.status}`);
        }

    }
}

loadEventData();