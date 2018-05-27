/* eslint no-case-declarations: 0 */
/* eslint no-console: 0 */

function poll(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case "STORE_POLL":
      return payload.filter(item => !!item.id).map(item => ({
        id: item.id,
        answer1: 0,
        answer2: 0,
        counts: [0, 0]
      }));

    case "UPDATE_POLL":
      if (!Object.keys(payload).length) return state;
      return state.map(question => {
        const {
          id,
          answer1: defaultAnswer1,
          answer2: defaultAnswer2,
          counts: [firstAnswer, secondAnswer]
        } = question;
        const answer = payload[question.id];
        if (typeof answer !== "undefined") {
          const totalVotes = firstAnswer + secondAnswer + 1;
          const firstCount = firstAnswer + 1 - answer;
          const secondCount = secondAnswer + answer;
          const answer1 = Number.parseFloat(
            firstCount / totalVotes * 100
          ).toFixed(0);
          const answer2 = Number.parseFloat(
            secondCount / totalVotes * 100
          ).toFixed(0);
          return {
            id,
            answer1,
            answer2,
            counts: [firstCount, secondCount]
          };
        }
        return {
          id,
          answer1: defaultAnswer1,
          answer2: defaultAnswer2,
          counts: [firstAnswer, secondAnswer]
        };
      });

    default:
      return state;
  }
}

export default poll;
