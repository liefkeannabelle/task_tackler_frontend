## Planning Frontend

## Suggested folder structure
- src/views/
    - ListsView.vue
    - TaskBankView.vue
    - SessionView.vue
- src/components/
    - lists/
        - ListCard.vue
        - NewListForm.vue
        - ListItemRow.vue
    - taskbank/
        - TaskRow.vue
        - AddTaskForm.vue
        - DependencyEditor.vue
    - session/
        - SessionControls.vue
        - SessionList.vue
        - SessionListItem.vue
- src/stores/
    - lists.ts
    - taskbank.ts
    - session.ts
- client.ts (existing)

## Responsibilities
- Views: page-level composition, route entry, high-level actions.
- Components: small UI + emits for actions (add/delete/start/etc).
- Stores: state + actions that call api client and handle loading/errors.
- API client: unchanged; keep path base via VITE_API_BASE_URL.

Data flow = Component -> emit -> View -> Store action -> client.ts -> backend -> store mutation -> component reactivity.