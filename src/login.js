const conf = new (require('conf'))()

const login = ({ key }) => {
  try {
    conf.set(`API_KEY`, key);
  } catch (e) {
    console.error(e.message);
  } finally {
    console.log(`API key updated succcessfully.`)
  }
};

module.exports = {
  login,
};