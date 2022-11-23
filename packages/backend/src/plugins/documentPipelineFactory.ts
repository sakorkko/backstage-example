/* eslint-disable guard-for-in */
import { getRootLogger } from '@backstage/backend-common';
import { Permission } from '@backstage/plugin-permission-common';
import { Readable } from 'stream';
import { Logger } from 'winston';
import { documents } from './document';
import {IndexableDocument, DocumentCollatorFactory} from '@backstage/plugin-search-common';

export interface SomeDocument extends IndexableDocument {
  spaceName: string;
  spaceKey: string;
  lastModifiedBy: string;
  lastModifiedFriendly: string;
}

export class SomeDocumentPipelineCollatorFactory
  implements DocumentCollatorFactory
{
  type: string;
  visibilityPermission?: Permission | undefined;

  private logger: Logger;

  private constructor() {
    this.logger = getRootLogger();
    this.type = 'somedocument';
  }

  static fromConfig() {
    return new SomeDocumentPipelineCollatorFactory();
  }

  async getCollator(): Promise<Readable> {
    return Readable.from(this.execute());
  }

  private async *execute(): AsyncGenerator<SomeDocument> {
    this.logger.info('Execute SomeDocument Search Collator');

    // What if documents are not available?
    const results = documents

    // Doesn't work, still generates extra shards
    // return;

    // This too doesn't work, still generates extra shards
    // throw new Error('SomeDocument Search Collator Error, no results found');

    for (const i in results) {
      // What if document is not available in the middle of streaming?

      // Still generates extra shards
      // if (i.toString() === '15') throw new Error('SomeDocument Search Collator Error, no results found');

      // Works correctly, no new shards, indexing stops at 15
      // if (i.toString() === '15') return;

      yield results[i];
    }
  }
}
