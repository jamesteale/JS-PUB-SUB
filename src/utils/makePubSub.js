import pubSub from './../composition/pubSub'

const makePubSub = subject => {

	const pubSubKeys = Object.keys(pubSub);

	pubSubKeys.forEach(key => {
		subject[key] = pubSub[key];
	});

	//I am manually adding the subscribers property to make sure I am not overriding an existing object;
	if (!subject.subscribers) {
    subject.subscribers = {
      any: []
    };
  }

	return subject; // so we can 'wrap' the subject
};

export default makePubSub;
