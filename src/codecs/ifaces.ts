/*!
 * This source file is part of the EdgeDB open source project.
 *
 * Copyright 2019-present MagicStack Inc. and the EdgeDB authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ReadBuffer, WriteBuffer} from "../buffer";

export type uuid = string;

export interface ICodec {
  readonly tid: uuid;
  readonly tidBuffer: Buffer;

  encode(buf: WriteBuffer, object: any): void;
  decode(buf: ReadBuffer): any;
}

export interface IArgsCodec {
  encodeArgs(args: any): Buffer;
}

export abstract class Codec {
  readonly tid: uuid;
  readonly tidBuffer: Buffer;

  constructor(tid: uuid) {
    this.tid = tid;
    this.tidBuffer = Buffer.from(tid, "hex");
  }
}

export abstract class ScalarCodec extends Codec {
  derive(tid: uuid): Codec {
    const self = this.constructor;
    return <Codec>new (<any>self)(tid);
  }
}
