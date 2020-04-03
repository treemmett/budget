import { ApolloError } from 'apollo-client';
import { ToastContext } from '../components/Toast/Toast';
import { useContext } from 'react';

type GQLErrorToToast = (error: ApolloError | Error, title?: string) => void;

export default function useGraphQLError(
  defaultTitle?: string
): GQLErrorToToast {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error(
      '`graphQLErrorToast` can only be called from a descendant of `Toaster`'
    );
  }

  function gqlErrorToToast(error: ApolloError | Error, title?: string): void {
    if (error instanceof ApolloError) {
      return error.graphQLErrors
        .filter(err => err.message.toString())
        .forEach(err =>
          ctx.addToast({
            message: err.message.toString(),
            status: 'error',
            title: typeof title === 'string' ? title : defaultTitle,
          })
        );
    }

    ctx.addToast({
      message: error.message || 'An unknown error occurred',
      status: 'error',
      title: typeof title === 'string' ? title : defaultTitle,
    });
  }

  return gqlErrorToToast;
}
