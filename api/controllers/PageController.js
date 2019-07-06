import path from 'path';

const index = (req, res) => {
  res.sendFile(path.resolve('dist/client/index.html'));
};

export default {
  index
};
