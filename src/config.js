const conf = new (require('conf'))()

const config = (options) => {
  const {
    key,
    uri,
  } = options;

  // API Key section
  if (key) {
    try {
      conf.set(`API_KEY`, key);
    } catch (e) {
      console.error(`Failed to save API key: ${e.message}`);
    } finally {
      console.log(`API key updated succcessfully.`)
    }
  }

  // URI section
  if (uri) {
    try {
      conf.set(`URI`, uri);
    } catch (e) {
      console.error(`Failed to save the custom URI: ${e.message}`);
    } finally {
      console.log(`API URI updated succcessfully.`)
    }
  }
};

module.exports = {
  config,
};