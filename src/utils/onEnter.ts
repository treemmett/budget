const onEnter = (
  func: (e: React.KeyboardEvent<HTMLInputElement>) => void
): ((e: React.KeyboardEvent<HTMLInputElement>) => void) => e => {
  if (e.key === 'Enter') {
    func(e);
  }
};

export default onEnter;
