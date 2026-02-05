const service = require("./service");

async function listChallenges(req, res, next) {
  try {
    const challenges = await service.getChallenges();
    res.json(challenges);
  } catch (e) {
    next(e);
  }
}

async function submitFlag(req, res, next) {
  try {
    const { challengeId, flag } = req.body;
    const userId = req.user.id;

    const result = await service.submitFlag(
      userId,
      challengeId,
      flag
    );

    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function getProgress(req, res, next) {
  try {
    const userId = req.user.id;
    const solvedLabs = await service.getUserProgress(userId);
    res.json(solvedLabs);
  } catch (e) {
    next(e);
  }
}


async function scoreboard(req, res, next) {
  try {
    const board = await service.getScoreboard();
    res.json(board);
  } catch (e) {
    next(e);
  }
}

module.exports = { listChallenges, submitFlag, scoreboard, getProgress };
