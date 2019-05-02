const pubSub =  {
  subscribe(fn, type = "any") {
		if (typeof this.subscribers[type] === "undefined") {
      this.subscribers[type] = [];
    }

    this.subscribers[type].push(fn);
	},

  unsubscribe(fn, type) {
		const currentSubscribers = this.subscribers[type];

    const updatedSubscribers = currentSubscribers.filter(
      subscriber => subscriber !== fn
    );

    this.subscribers[type] = updatedSubscribers;
	},

  publish(publication, type = "any") {
			const subscribers = this.subscribers[type];
			if (!subscribers) {
        return;
      }

      subscribers.forEach(subscriber => subscriber(publication));
	}
};

export default pubSub;
