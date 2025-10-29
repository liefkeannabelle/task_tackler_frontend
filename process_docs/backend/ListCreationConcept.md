Here is how ListCreation is implemented on the backend:

```
import { Collection, Db } from "npm:mongodb";
import { Empty, ID } from "@utils/types.ts"; // Assuming @utils/types.ts provides ID and Empty
import { freshID } from "@utils/database.ts"; // Assuming @utils/database.ts provides freshID
import { usernameToUserId } from "@utils/users.ts";

// Declare collection prefix, use concept name
const PREFIX = "ListCreation" + ".";

// Generic types of this concept
type List = ID; // The ID of a List document created by this concept
type User = ID; // The ID of a User, e.g., from a UserAuthentication concept, external to ListCreation
type Task = ID; // The ID of a Task, e.g., from a TaskManagement concept, external to ListCreation

/**
 * @interface ListItem
 * A member of a list, representing a task within that list.
 *
 * @state a set of ListItems with
 *   a task of type Task
 *   an orderNumber of type Number
 *   a taskStatus of type String ("incomplete" or "complete")
 */
interface ListItem {
  name: string;
  task: Task;
  orderNumber: number;
  taskStatus: "incomplete" | "complete"; // Defaulted to "incomplete" on addition
}

/**
 * @interface ListDocument
 * Represents a user-created list, which groups tasks.
 *
 * @state a set of Lists with
 *   an owner of type User
 *   a title of type String
 *   a set of ListItems (embedded within the list)
 *   an itemCount of type Number
 */
interface ListDocument {
  _id: List;
  owner: User;
  title: string;
  listItems: ListItem[];
  itemCount: number;
}

export default class ListCreationConcept {
  private lists: Collection<ListDocument>;

  /**
   * @concept ListCreation
   * @purpose allow for grouping of tasks into lists, subsets of the task bank
   */
  constructor(private readonly db: Db) {
    this.lists = this.db.collection(PREFIX + "lists");
  }

  /**
   * @action newList
   * @principle users can create a to-do list, select tasks from their task bank to add to it,
   *            and set a default ordering of the tasks according to their dependencies.
   *
   * Creates a new list with the specified name and owner.
   *
   * @param {object} params - The action arguments.
   * @param {string} params.listName - The title of the new list.
   * @param {User} params.listOwner - The ID of the user who owns this list.
   * @returns {{list: List} | {error: string}} - An object containing the ID of the new list on success, or an error message.
   *
   * @requires no List with listName exists in set of Lists with owner = listOwner
   * @effects new List with title = listName, owner = listOwner, itemCount = 0, and an empty set of ListItems is returned and added to set of Lists
   */
  async newList(
    { listName, listOwner }: { listName: string; listOwner: User },
  ): Promise<{ list: List } | { error: string }> {
    // Requires: no List with listName exists in set of Lists with owner = listOwner
    const existingList = await this.lists.findOne({
      title: listName,
      owner: listOwner,
    });
    if (existingList) {
      return {
        error:
          `List with name '${listName}' already exists for user '${listOwner}'.`,
      };
    }

    const newListId = freshID();
    const newList: ListDocument = {
      _id: newListId,
      owner: listOwner,
      title: listName,
      listItems: [], // Initialize with an empty array of list items
      itemCount: 0, // Initialize item count to 0
    };

    // Effects: new List is added to the database
    await this.lists.insertOne(newList);

    return { list: newListId };
  }

  /**
   * @action addTask
   *
   * Adds a task to a specified list. The task is initially marked as 'incomplete'
   * and assigned an order number that places it at the end of the current list.
   *
   * @param {object} params - The action arguments.
   * @param {List} params.list - The ID of the list to add the task to.
   * @param {Task} params.task - The ID of the task to add.
   * @param {User} params.adder - The ID of the user attempting to add the task (must be the owner).
   * @returns {{listItem: ListItem} | {error: string}} - An object containing the newly created ListItem on success, or an error message.
   *
   * @requires listItem containing task is not already in list and adder = owner of list
   * @effects a new listItem is created with task = task, taskStatus = incomplete, and orderNumber = itemCount+1.
   *          itemCount is incremented. The new listItem is returned and added to list's set of listItems.
   */
  async addTask(
    { list: listId, name, task, adder }: {
      list: List;
      name: string;
      task: Task;
      adder: User;
    },
  ): Promise<{ listItem: ListItem } | { error: string }> {
    const targetList = await this.lists.findOne({ _id: listId });

    if (!targetList) {
      return { error: `List with ID '${listId}' not found.` };
    }

    // Requires: adder = owner of list
    if (targetList.owner !== adder) {
      return { error: `User '${adder}' is not the owner of list '${listId}'.` };
    }

    // Requires: listItem containing task is not already in list
    const existingListItem = targetList.listItems.find((item) =>
      item.task === task
    );
    if (existingListItem) {
      return { error: `Task '${task}' is already in list '${listId}'.` };
    }

    // Effects: new listItem is created and added, itemCount is incremented
    const newOrderNumber = targetList.itemCount + 1; // Assign order number to be last
    const newListItem: ListItem = {
      name: name,
      task: task,
      orderNumber: newOrderNumber,
      taskStatus: "incomplete", // Default status as per effects
    };

    await this.lists.updateOne(
      { _id: listId },
      {
        $push: { listItems: newListItem }, // Add the new item to the embedded array
        $inc: { itemCount: 1 }, // Increment the count of items in the list
      },
    );

    return { listItem: newListItem };
  }

  /**
   * @action deleteTask
   *
   * Removes a task from a specified list. The order numbers of subsequent tasks
   * are adjusted to maintain a contiguous sequence.
   *
   * @param {object} params - The action arguments.
   * @param {List} params.list - The ID of the list to delete the task from.
   * @param {Task} params.task - The ID of the task to delete.
   * @param {User} params.deleter - The ID of the user attempting to delete the task (must be the owner).
   * @returns {Empty | {error: string}} - An empty object on success, or an error message.
   *
   * @requires a listItem containing task is in list's set of listItems and deleter = owner of list
   * @effects the listItem containing task is removed from list's set of listItems.
   *          orderNumbers of subsequent items are decremented. itemCount is decremented.
   */
  async deleteTask(
    { list: listId, task, deleter }: { list: List; task: Task; deleter: User },
  ): Promise<Empty | { error: string }> {
    const targetList = await this.lists.findOne({ _id: listId });

    if (!targetList) {
      return { error: `List with ID '${listId}' not found.` };
    }

    // Requires: deleter = owner of list
    if (targetList.owner !== deleter) {
      return {
        error: `User '${deleter}' is not the owner of list '${listId}'.`,
      };
    }

    // Requires: a listItem containing task is in list's set of listItems
    const listItemIndex = targetList.listItems.findIndex((item) =>
      item.task === task
    );
    if (listItemIndex === -1) {
      return { error: `Task '${task}' not found in list '${listId}'.` };
    }

    const removedOrderNumber = targetList.listItems[listItemIndex].orderNumber;

    // Effects: listItem is removed, orderNumbers adjusted, itemCount decremented
    const updatedListItems = targetList.listItems
      .filter((_, index) => index !== listItemIndex) // Remove the target item
      .map((item) => {
        // Shift order numbers of items that were after the removed item
        if (item.orderNumber > removedOrderNumber) {
          return { ...item, orderNumber: item.orderNumber - 1 };
        }
        return item;
      });

    await this.lists.updateOne(
      { _id: listId },
      {
        $set: { listItems: updatedListItems }, // Update the entire array
        $inc: { itemCount: -1 }, // Decrement the count of items
      },
    );

    return {};
  }

  /**
   * @action assignOrder
   *
   * Reassigns the order number of a specific task within a list.
   * Other tasks' order numbers are adjusted to maintain a contiguous sequence.
   *
   * @param {object} params - The action arguments.
   * @param {List} params.list - The ID of the list containing the task.
   * @param {Task} params.task - The ID of the task whose order is to be assigned.
   * @param {number} params.newOrder - The new order number for the task (1-indexed).
   * @param {User} params.assigner - The ID of the user attempting to assign the order (must be the owner).
   * @returns {Empty | {error: string}} - An empty object on success, or an error message.
   *
   * @requires task belongs to a ListItem in list and assigner = owner of list
   * @requires newOrder is valid (1 to itemCount)
   * @effects task's ListItem gets orderNumber set to newOrder and the ListItems with
   *          orderNumbers between the old value and new value are offset by one accordingly.
   */
  async assignOrder(
    { list: listId, task, newOrder, assigner }: {
      list: List;
      task: Task;
      newOrder: number;
      assigner: User;
    },
  ): Promise<Empty | { error: string }> {
    const targetList = await this.lists.findOne({ _id: listId });

    if (!targetList) {
      return { error: `List with ID '${listId}' not found.` };
    }

    // Requires: assigner = owner of list
    if (targetList.owner !== assigner) {
      return {
        error: `User '${assigner}' is not the owner of list '${listId}'.`,
      };
    }

    const listItemIndex = targetList.listItems.findIndex((item) =>
      item.task === task
    );
    if (listItemIndex === -1) {
      return { error: `Task '${task}' not found in list '${listId}'.` };
    }

    const oldOrder = targetList.listItems[listItemIndex].orderNumber;

    // Validate newOrder against the current itemCount
    if (newOrder < 1 || newOrder > targetList.itemCount) {
      return {
        error:
          `New order '${newOrder}' is out of bounds (1 to ${targetList.itemCount}).`,
      };
    }

    if (newOrder === oldOrder) {
      return {}; // No change needed if the order is the same
    }

    // Effects: re-order list items by adjusting other items' orderNumbers
    const updatedListItems = targetList.listItems.map((item) => {
      if (item.task === task) {
        // This is the item being moved
        return { ...item, orderNumber: newOrder };
      }

      if (newOrder < oldOrder) {
        // Item is moving UP (to a smaller order number)
        // Items between newOrder (inclusive) and oldOrder (exclusive) should shift DOWN (+1)
        if (item.orderNumber >= newOrder && item.orderNumber < oldOrder) {
          return { ...item, orderNumber: item.orderNumber + 1 };
        }
      } else { // newOrder > oldOrder
        // Item is moving DOWN (to a larger order number)
        // Items between oldOrder (exclusive) and newOrder (inclusive) should shift UP (-1)
        if (item.orderNumber > oldOrder && item.orderNumber <= newOrder) {
          return { ...item, orderNumber: item.orderNumber - 1 };
        }
      }
      return item;
    });

    // Sort the list items by their orderNumber to ensure consistent array ordering in the database.
    // This is good practice but not strictly required by the effects if queries always sort.
    updatedListItems.sort((a, b) => a.orderNumber - b.orderNumber);

    await this.lists.updateOne(
      { _id: listId },
      {
        $set: { listItems: updatedListItems }, // Update the entire array with adjusted order numbers
      },
    );

    return {};
  }

  // --- Concept Queries ---

  /**
   * @query _getLists
   * Returns all lists stored by this concept.
   *
   * @returns {Promise<ListDocument[]>} - An array of all ListDocuments.
   */
  async _getLists(): Promise<ListDocument[]> {
    return await this.lists.find({}).toArray();
  }

  /**
   * @query _getListById
   * Returns a specific list document by its ID.
   *
   * @param {object} params - The query arguments.
   * @param {List} params.listId - The ID of the list to retrieve.
   * @returns {Promise<ListDocument | null>} - The ListDocument if found, otherwise null.
   */
  async _getListById(
    { listId }: { listId: List },
  ): Promise<ListDocument | null> {
    return await this.lists.findOne({ _id: listId });
  }

  // /**
  //  * @query _getListsByOwner
  //  * Returns all lists owned by a specific user.
  //  *
  //  * @param {object} params - The query arguments.
  //  * @param {User} params.ownerId - The ID of the user whose lists to retrieve.
  //  * @returns {Promise<ListDocument[]>} - An array of ListDocuments owned by the user.
  //  */
  // async _getListsByOwner(
  //   { ownerId }: { ownerId: User },
  // ): Promise<ListDocument[]> {
  //   return await this.lists.find({ owner: ownerId }).toArray();
  // }

  /**
   * @query getListsByOwner
   * Returns all lists owned by the provided user id. This mirrors `_getListsByOwner`
   * but uses the `owner` param name which is convenient for frontend calls.
   *
   * @param {object} params - The query arguments.
   * @param {User} params.owner - The ID of the user whose lists to retrieve.
   * @returns {{ lists: ListDocument[] } | { error: string }}
   */
  async getListsByOwner(
    { owner, username }: { owner?: User; username?: string },
  ): Promise<{ lists: ListDocument[] } | { error: string }> {
    try {
      // Allow the frontend to pass either the user ID (`owner`) or a `username`.
      let resolvedOwner: User | undefined = owner;
      if (!resolvedOwner && username) {
        const uid = await usernameToUserId(this.db, username);
        if (!uid) {
          return { error: `No user found with username '${username}'.` };
        }
        resolvedOwner = uid;
      }
      if (!resolvedOwner) {
        return { error: "Missing required parameter: owner or username" };
      }

      const lists = await this.lists.find({ owner: resolvedOwner }).toArray();
      return { lists };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("Error getting lists by owner:", e);
      return { error: `Failed to get lists: ${msg}` };
    }
  }

  /**
   * @query _getTasksInList
   * Returns all list items (tasks) for a given list, sorted by their orderNumber.
   *
   * @param {object} params - The query arguments.
   * @param {List} params.listId - The ID of the list to retrieve tasks from.
   * @returns {Promise<ListItem[] | null>} - An array of ListItems sorted by order, or null if the list is not found.
   */
  async _getTasksInList(
    { listId }: { listId: List },
  ): Promise<ListItem[] | null> {
    const list = await this.lists.findOne({ _id: listId });
    if (!list) return null;
    // Return a shallow copy sorted by orderNumber so we don't mutate the DB object
    return [...list.listItems].sort((a, b) => a.orderNumber - b.orderNumber);
  }
  async deleteList(
    { listId, listName, deleter, username }: {
      listId?: List;
      listName?: string;
      deleter?: User;
      username?: string;
    },
  ): Promise<Empty | { error: string }> {
    // Resolve deleter (owner) from deleter id or username if provided
    let resolvedDeleter: User | undefined = deleter;
    if (!resolvedDeleter && username) {
      const uid = await usernameToUserId(this.db, username);
      if (!uid) return { error: `No user found with username '${username}'.` };
      resolvedDeleter = uid;
    }

    // If listId not provided, try to resolve from listName
    let resolvedListId: List | undefined = listId;
    if (!resolvedListId && listName) {
      if (resolvedDeleter) {
        // Prefer scoped lookup by owner to avoid ambiguity
        const list = await this.lists.findOne({
          title: listName,
          owner: resolvedDeleter,
        });
        if (!list) {
          return { error: `List with name '${listName}' not found for user.` };
        }
        resolvedListId = list._id;
      } else {
        // No owner provided — try to find lists by title. If multiple, ask to disambiguate.
        const candidates = await this.lists.find({ title: listName }).toArray();
        if (candidates.length === 0) {
          return { error: `List with name '${listName}' not found.` };
        }
        if (candidates.length > 1) {
          return {
            error:
              `Multiple lists found with name '${listName}'. Please provide owner (deleter or username) to disambiguate.`,
          };
        }
        // Exactly one candidate — use it, but log a warning since no deleter was supplied for auth.
        const only = candidates[0];
        console.warn(
          `deleteList called without deleter; deleting unique list '${listName}' (id=${only._id})`,
        );
        resolvedListId = only._id;
        // Also set resolvedDeleter to the list owner so downstream checks behave normally.
        resolvedDeleter = only.owner;
      }
    }

    if (!resolvedListId) {
      return { error: "Missing required parameter: listId or listName" };
    }

    const targetList = await this.lists.findOne({ _id: resolvedListId });
    if (!targetList) {
      return { error: `List with ID '${resolvedListId}' not found.` };
    }

    // If we still don't have a resolvedDeleter, require it for authorization
    if (!resolvedDeleter) {
      return {
        error:
          "Missing required parameter: deleter or username (required to authorize deletion)",
      };
    }

    // Requires: deleter = owner of list
    if (targetList.owner !== resolvedDeleter) {
      return {
        error:
          `User '${resolvedDeleter}' is not the owner of list '${resolvedListId}'.`,
      };
    }

    // Effects: remove the entire list document
    await this.lists.deleteOne({ _id: resolvedListId });
    return {};
  }
}
```