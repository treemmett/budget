export interface Options {
  event: React.KeyboardEvent<HTMLInputElement>;
  enter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  escape?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function submitInput({ event, enter, escape }: Options): void {
  if (event?.key?.toLowerCase() === 'enter' && enter) {
    enter(event);
  }

  if (event?.key?.toLowerCase() === 'escape' && escape) {
    escape(event);
  }
}
