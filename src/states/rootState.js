import {documentLocalState} from './documentLocalState';
import {userLocalState} from './userLocalState';

export const rootState = () => ({
  document: documentLocalState,
  user: userLocalState,
});
