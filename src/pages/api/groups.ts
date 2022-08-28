import { nc } from '@utils/nc';

export default nc().get((req, res) => {
  res.send([
    {
      id: 'a',
      name: 'Housing',
    },
    {
      id: 'b',
      name: 'Transportation',
    },
  ]);
});
