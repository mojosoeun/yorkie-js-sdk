/*
 * Copyright 2020 The Yorkie Authors. All rights reserved.
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

import { TimeTicket } from '../time/ticket';

/**
 * JSONElement represents JSON element including logical clock.
 */
export abstract class JSONElement {
  private createdAt: TimeTicket;
  private updatedAt: TimeTicket;
  private removedAt: TimeTicket;

  constructor(createdAt: TimeTicket) {
    this.createdAt = createdAt;
  }

  public getCreatedAt(): TimeTicket {
    return this.createdAt;
  }

  public getID(): TimeTicket {
    return this.createdAt;
  }

  public getUpdatedAt(): TimeTicket {
    return this.updatedAt;
  }

  public getRemovedAt(): TimeTicket {
    return this.removedAt;
  }

  public setUpdatedAt(updatedAt: TimeTicket): boolean {
    if (!this.updatedAt || updatedAt && updatedAt.after(this.updatedAt)) {
      this.updatedAt = updatedAt;
      return true;
    }

    return false;
  }

  public remove(removedAt: TimeTicket): boolean {
    if (!this.removedAt || removedAt && removedAt.after(this.removedAt)) {
      this.removedAt = removedAt;
      return true;
    }

    return false;
  }

  public isRemoved(): boolean {
    return !!this.removedAt;
  }

  abstract toJSON(): string;
  abstract toSortedJSON(): string;
  abstract deepcopy(): JSONElement;
}

export abstract class JSONContainer extends JSONElement {
  constructor(createdAt: TimeTicket) {
    super(createdAt);
  }

  abstract getDescendants(): IterableIterator<JSONElement>;
}
