import { SomeDocument } from "./documentPipelineFactory";
import { randomBytes } from 'crypto';

function generateRandomString(): string {
  return randomBytes(128).toString('hex').toLowerCase();
}

function generateRandomDocument(): SomeDocument {
  return {
    title: generateRandomString(),
    location: generateRandomString(),
    text: generateRandomString(),
    spaceKey: generateRandomString(),
    spaceName: generateRandomString(),
    lastModifiedBy: generateRandomString(),
    lastModifiedFriendly: generateRandomString(),
  };
}

export const documents: SomeDocument[] = [...Array(100).keys()].map(() => generateRandomDocument());
