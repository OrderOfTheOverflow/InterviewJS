export function createStory(payload) {
  return {
    type: "CREATE_STORY",
    payload,
  };
}

export function storePolls(payload) {
  return {
    type: "STORE_POLL",
    payload,
  };
}

export function updatePoll(payload) {
  return {
    type: "UPDATE_POLL",
    payload,
  };
}