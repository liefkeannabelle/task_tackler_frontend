Here is the console trace for the walkthrough video:
``` 
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: {} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks {} => { tasks: [] }

[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => { tasks: [] }

[Incoming] POST /api/TaskBank/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { adder: "demo", name: "grocery shop" }

Requesting.request { adder: 'demo', name: 'grocery shop', path: '/TaskBank/addTask' } => { request: '019a617a-3a11-7cb7-bd43-a6a3f495dae5' }

Added new task: grocery shop

TaskBank.addTask { adder: 'demo', name: 'grocery shop', description: undefined } => { task: '019a617a-3a3e-7bb6-92f6-bce7762ed155' }

[Broadcast] request.responded -> {
  request: "019a617a-3a11-7cb7-bd43-a6a3f495dae5",
  path: "/TaskBank/addTask"
}
[Broadcast] request.responded#21 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617a-3a11-7cb7-bd43-a6a3f495dae5","path":"/TaskBank/addTask","response":{"task":"019a617a-3a3e-7bb6-92f6-bce7762ed155"}},"ts":"2025-11-08T03:19:51…
[BroadcastWrite] client#0 (request.responded#21) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#21) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#21) - ready resolved
[BroadcastWrite] client#1 (request.responded#21) - ready resolved

Requesting.respond {
  request: '019a617a-3a11-7cb7-bd43-a6a3f495dae5',
  task: '019a617a-3a3e-7bb6-92f6-bce7762ed155'
} => { request: '019a617a-3a11-7cb7-bd43-a6a3f495dae5' }

[BroadcastWrite] client#0 (request.responded#21) - wrote event frame
[BroadcastWrite] client#1 (request.responded#21) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { adder: "demo", name: "meal prep" }

Requesting.request { adder: 'demo', name: 'meal prep', path: '/TaskBank/addTask' } => { request: '019a617a-485a-7d2a-b6ae-850f90753052' }

Added new task: meal prep

TaskBank.addTask { adder: 'demo', name: 'meal prep', description: undefined } => { task: '019a617a-4888-727a-9dcd-e616cc3ea3a7' }

[Broadcast] request.responded -> {
  request: "019a617a-485a-7d2a-b6ae-850f90753052",
  path: "/TaskBank/addTask"
}
[Broadcast] request.responded#22 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617a-485a-7d2a-b6ae-850f90753052","path":"/TaskBank/addTask","response":{"task":"019a617a-4888-727a-9dcd-e616cc3ea3a7"}},"ts":"2025-11-08T03:19:55…
[BroadcastWrite] client#0 (request.responded#22) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#22) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#22) - ready resolved
[BroadcastWrite] client#1 (request.responded#22) - ready resolved

Requesting.respond {
  request: '019a617a-485a-7d2a-b6ae-850f90753052',
  task: '019a617a-4888-727a-9dcd-e616cc3ea3a7'
} => { request: '019a617a-485a-7d2a-b6ae-850f90753052' }

[BroadcastWrite] client#0 (request.responded#22) - wrote event frame
[BroadcastWrite] client#1 (request.responded#22) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { adder: "demo", name: "wash bedding" }

Requesting.request { adder: 'demo', name: 'wash bedding', path: '/TaskBank/addTask' } => { request: '019a617a-740e-77b9-b1ab-c535b9980a8d' }

Added new task: wash bedding

TaskBank.addTask { adder: 'demo', name: 'wash bedding', description: undefined } => { task: '019a617a-743b-7d37-80a6-2a2015d13f90' }

[Broadcast] request.responded -> {
  request: "019a617a-740e-77b9-b1ab-c535b9980a8d",
  path: "/TaskBank/addTask"
}
[Broadcast] request.responded#23 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617a-740e-77b9-b1ab-c535b9980a8d","path":"/TaskBank/addTask","response":{"task":"019a617a-743b-7d37-80a6-2a2015d13f90"}},"ts":"2025-11-08T03:20:06…
[BroadcastWrite] client#0 (request.responded#23) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#23) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#23) - ready resolved
[BroadcastWrite] client#1 (request.responded#23) - ready resolved

Requesting.respond {
  request: '019a617a-740e-77b9-b1ab-c535b9980a8d',
  task: '019a617a-743b-7d37-80a6-2a2015d13f90'
} => { request: '019a617a-740e-77b9-b1ab-c535b9980a8d' }

[BroadcastWrite] client#0 (request.responded#23) - wrote event frame
[BroadcastWrite] client#1 (request.responded#23) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { adder: "demo", name: "make bed" }

Requesting.request { adder: 'demo', name: 'make bed', path: '/TaskBank/addTask' } => { request: '019a617a-813c-7c42-aac4-df47eedbf768' }

Added new task: make bed

TaskBank.addTask { adder: 'demo', name: 'make bed', description: undefined } => { task: '019a617a-8174-7145-a8c3-b74ce65ac20d' }

[Broadcast] request.responded -> {
  request: "019a617a-813c-7c42-aac4-df47eedbf768",
  path: "/TaskBank/addTask"
}
[Broadcast] request.responded#24 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617a-813c-7c42-aac4-df47eedbf768","path":"/TaskBank/addTask","response":{"task":"019a617a-8174-7145-a8c3-b74ce65ac20d"}},"ts":"2025-11-08T03:20:09…
[BroadcastWrite] client#0 (request.responded#24) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#24) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#24) - ready resolved
[BroadcastWrite] client#1 (request.responded#24) - ready resolved

Requesting.respond {
  request: '019a617a-813c-7c42-aac4-df47eedbf768',
  task: '019a617a-8174-7145-a8c3-b74ce65ac20d'
} => { request: '019a617a-813c-7c42-aac4-df47eedbf768' }

[BroadcastWrite] client#0 (request.responded#24) - wrote event frame
[BroadcastWrite] client#1 (request.responded#24) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { adder: "demo", name: "poli sci reading" }

Requesting.request { adder: 'demo', name: 'poli sci reading', path: '/TaskBank/addTask' } => { request: '019a617a-c18e-7d3e-8423-af9238e33858' }

Added new task: poli sci reading

TaskBank.addTask { adder: 'demo', name: 'poli sci reading', description: undefined } => { task: '019a617a-c1bd-7931-b060-27057bebff4b' }

[Broadcast] request.responded -> {
  request: "019a617a-c18e-7d3e-8423-af9238e33858",
  path: "/TaskBank/addTask"
}
[Broadcast] request.responded#25 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617a-c18e-7d3e-8423-af9238e33858","path":"/TaskBank/addTask","response":{"task":"019a617a-c1bd-7931-b060-27057bebff4b"}},"ts":"2025-11-08T03:20:26…
[BroadcastWrite] client#0 (request.responded#25) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#25) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#25) - ready resolved
[BroadcastWrite] client#1 (request.responded#25) - ready resolved

Requesting.respond {
  request: '019a617a-c18e-7d3e-8423-af9238e33858',
  task: '019a617a-c1bd-7931-b060-27057bebff4b'
} => { request: '019a617a-c18e-7d3e-8423-af9238e33858' }

[BroadcastWrite] client#0 (request.responded#25) - wrote event frame
[BroadcastWrite] client#1 (request.responded#25) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { adder: "demo", name: "poli sci discussion post" }

Requesting.request {
  adder: 'demo',
  name: 'poli sci discussion post',
  path: '/TaskBank/addTask'
} => { request: '019a617a-da00-7523-bdc6-010ca93d5e04' }

Added new task: poli sci discussion post

TaskBank.addTask {
  adder: 'demo',
  name: 'poli sci discussion post',
  description: undefined
} => { task: '019a617a-da2d-739a-a14a-41da36b3665c' }

[Broadcast] request.responded -> {
  request: "019a617a-da00-7523-bdc6-010ca93d5e04",
  path: "/TaskBank/addTask"
}
[Broadcast] request.responded#26 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617a-da00-7523-bdc6-010ca93d5e04","path":"/TaskBank/addTask","response":{"task":"019a617a-da2d-739a-a14a-41da36b3665c"}},"ts":"2025-11-08T03:20:32…
[BroadcastWrite] client#0 (request.responded#26) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#26) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#26) - ready resolved
[BroadcastWrite] client#1 (request.responded#26) - ready resolved

Requesting.respond {
  request: '019a617a-da00-7523-bdc6-010ca93d5e04',
  task: '019a617a-da2d-739a-a14a-41da36b3665c'
} => { request: '019a617a-da00-7523-bdc6-010ca93d5e04' }

[BroadcastWrite] client#0 (request.responded#26) - wrote event frame
[BroadcastWrite] client#1 (request.responded#26) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/lists"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/lists"
}
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => { lists: [] }


ListCreation.getListsByOwner { owner: 'demo' } => { lists: [] }


TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/ListCreation/newList {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /ListCreation/newList
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { listName: "weekend to-dos", listOwner: "demo" }

Requesting.request {
  listName: 'weekend to-dos',
  listOwner: 'demo',
  path: '/ListCreation/newList'
} => { request: '019a617b-1b3c-7356-9dac-acbe1aa6820c' }


ListCreation.newList { listName: 'weekend to-dos', listOwner: 'demo' } => { list: '019a617b-1b5e-752f-91e0-9b4142115052' }

[Broadcast] request.responded -> {
  request: "019a617b-1b3c-7356-9dac-acbe1aa6820c",
  path: "/ListCreation/newList"
}
[Broadcast] request.responded#27 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617b-1b3c-7356-9dac-acbe1aa6820c","path":"/ListCreation/newList","response":{"list":"019a617b-1b5e-752f-91e0-9b4142115052"}},"ts":"2025-11-08T03:2…
[BroadcastWrite] client#0 (request.responded#27) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#27) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#27) - ready resolved
[BroadcastWrite] client#1 (request.responded#27) - ready resolved

Requesting.respond {
  request: '019a617b-1b3c-7356-9dac-acbe1aa6820c',
  list: '019a617b-1b5e-752f-91e0-9b4142115052'
} => { request: '019a617b-1b3c-7356-9dac-acbe1aa6820c' }

[BroadcastWrite] client#0 (request.responded#27) - wrote event frame
[BroadcastWrite] client#1 (request.responded#27) - wrote event frame
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/ListCreation/newList {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /ListCreation/newList
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { listName: "weekly school work", listOwner: "demo" }

Requesting.request {
  listName: 'weekly school work',
  listOwner: 'demo',
  path: '/ListCreation/newList'
} => { request: '019a617b-2e79-7b44-b25f-0f9da0057b5a' }


ListCreation.newList { listName: 'weekly school work', listOwner: 'demo' } => { list: '019a617b-2e9b-7442-a701-a5727f81b6bc' }

[Broadcast] request.responded -> {
  request: "019a617b-2e79-7b44-b25f-0f9da0057b5a",
  path: "/ListCreation/newList"
}
[Broadcast] request.responded#28 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617b-2e79-7b44-b25f-0f9da0057b5a","path":"/ListCreation/newList","response":{"list":"019a617b-2e9b-7442-a701-a5727f81b6bc"}},"ts":"2025-11-08T03:2…
[BroadcastWrite] client#0 (request.responded#28) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#28) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#28) - ready resolved
[BroadcastWrite] client#1 (request.responded#28) - ready resolved

Requesting.respond {
  request: '019a617b-2e79-7b44-b25f-0f9da0057b5a',
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc'
} => { request: '019a617b-2e79-7b44-b25f-0f9da0057b5a' }

[BroadcastWrite] client#0 (request.responded#28) - wrote event frame
[BroadcastWrite] client#1 (request.responded#28) - wrote event frame
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/lists"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/lists"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/taskbank"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/taskbank"
}
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: []
    }
  ]
}


TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { adder: "demo", name: "math pset" }

Requesting.request { adder: 'demo', name: 'math pset', path: '/TaskBank/addTask' } => { request: '019a617b-7812-7f3b-8b92-281d6459fef7' }

Added new task: math pset

TaskBank.addTask { adder: 'demo', name: 'math pset', description: undefined } => { task: '019a617b-7841-7d6c-b00a-62b903b4c836' }

[Broadcast] request.responded -> {
  request: "019a617b-7812-7f3b-8b92-281d6459fef7",
  path: "/TaskBank/addTask"
}
[Broadcast] request.responded#29 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617b-7812-7f3b-8b92-281d6459fef7","path":"/TaskBank/addTask","response":{"task":"019a617b-7841-7d6c-b00a-62b903b4c836"}},"ts":"2025-11-08T03:21:13…
[BroadcastWrite] client#0 (request.responded#29) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#29) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#29) - ready resolved
[BroadcastWrite] client#1 (request.responded#29) - ready resolved

Requesting.respond {
  request: '019a617b-7812-7f3b-8b92-281d6459fef7',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836'
} => { request: '019a617b-7812-7f3b-8b92-281d6459fef7' }

[BroadcastWrite] client#0 (request.responded#29) - wrote event frame
[BroadcastWrite] client#1 (request.responded#29) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617b-7841-7d6c-b00a-62b903b4c836',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'math pset',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: {} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks {} => { tasks: [] }

[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617b-7841-7d6c-b00a-62b903b4c836',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'math pset',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { adder: "demo", name: "test", description: "test" }

Requesting.request {
  adder: 'demo',
  name: 'test',
  description: 'test',
  path: '/TaskBank/addTask'
} => { request: '019a617d-9e7e-7da6-ae45-f5768a1ce660' }

Added new task: test

TaskBank.addTask { adder: 'demo', name: 'test', description: undefined } => { task: '019a617d-9ec6-7e3b-a794-60974e3344ff' }

[Broadcast] request.responded -> {
  request: "019a617d-9e7e-7da6-ae45-f5768a1ce660",
  path: "/TaskBank/addTask"
}
[Broadcast] request.responded#30 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617d-9e7e-7da6-ae45-f5768a1ce660","path":"/TaskBank/addTask","response":{"task":"019a617d-9ec6-7e3b-a794-60974e3344ff"}},"ts":"2025-11-08T03:23:34…
[BroadcastWrite] client#0 (request.responded#30) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#30) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#30) - ready resolved
[BroadcastWrite] client#1 (request.responded#30) - ready resolved

Requesting.respond {
  request: '019a617d-9e7e-7da6-ae45-f5768a1ce660',
  task: '019a617d-9ec6-7e3b-a794-60974e3344ff'
} => { request: '019a617d-9e7e-7da6-ae45-f5768a1ce660' }

[BroadcastWrite] client#0 (request.responded#30) - wrote event frame
[BroadcastWrite] client#1 (request.responded#30) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617b-7841-7d6c-b00a-62b903b4c836',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'math pset',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617d-9ec6-7e3b-a794-60974e3344ff',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'test',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/deleteTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/deleteTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { deleter: "demo", task: "019a617d-9ec6-7e3b-a794-60974e3344ff" }

Requesting.request {
  deleter: 'demo',
  task: '019a617d-9ec6-7e3b-a794-60974e3344ff',
  path: '/TaskBank/deleteTask'
} => { request: '019a617d-a930-7c99-b634-7f0c8c6ed8ca' }


TaskBank.deleteTask { deleter: 'demo', task: '019a617d-9ec6-7e3b-a794-60974e3344ff' } => {}

[Broadcast] request.responded -> {
  request: "019a617d-a930-7c99-b634-7f0c8c6ed8ca",
  path: "/TaskBank/deleteTask"
}
[Broadcast] request.responded#31 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a617d-a930-7c99-b634-7f0c8c6ed8ca","path":"/TaskBank/deleteTask","response":{"success":{}}},"ts":"2025-11-08T03:23:36.752Z"}
[BroadcastWrite] client#0 (request.responded#31) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#31) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#31) - ready resolved
[BroadcastWrite] client#1 (request.responded#31) - ready resolved

Requesting.respond { request: '019a617d-a930-7c99-b634-7f0c8c6ed8ca', success: {} } => { request: '019a617d-a930-7c99-b634-7f0c8c6ed8ca' }

[BroadcastWrite] client#0 (request.responded#31) - wrote event frame
[BroadcastWrite] client#1 (request.responded#31) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617b-7841-7d6c-b00a-62b903b4c836',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'math pset',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: {} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks {} => { tasks: [] }

[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617b-7841-7d6c-b00a-62b903b4c836',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'math pset',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addDependency {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addDependency
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  adder: "demo",
  task1: "019a617a-da2d-739a-a14a-41da36b3665c",
  task2: "019a617a-c1bd-7931-b060-27057bebff4b",
  dependency: "precedes"
}

Requesting.request {
  adder: 'demo',
  task1: '019a617a-da2d-739a-a14a-41da36b3665c',
  task2: '019a617a-c1bd-7931-b060-27057bebff4b',
  dependency: 'precedes',
  path: '/TaskBank/addDependency'
} => { request: '019a6184-f832-7fbd-8896-3f4fced00068' }


TaskBank.addDependency {
  adder: 'demo',
  task1: '019a617a-da2d-739a-a14a-41da36b3665c',
  task2: '019a617a-c1bd-7931-b060-27057bebff4b',
  dependency: 'precedes'
} => {
  dependency: {
    depTask: '019a617a-c1bd-7931-b060-27057bebff4b',
    depRelation: 'PRECEDES'
  }
}

[Broadcast] request.responded -> {
  request: "019a6184-f832-7fbd-8896-3f4fced00068",
  path: "/TaskBank/addDependency"
}
[Broadcast] request.responded#32 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6184-f832-7fbd-8896-3f4fced00068","path":"/TaskBank/addDependency","response":{"dependency":{"depTask":"019a617a-c1bd-7931-b060-27057bebff4b","dep…
[BroadcastWrite] client#0 (request.responded#32) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#32) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#32) - ready resolved
[BroadcastWrite] client#1 (request.responded#32) - ready resolved

Requesting.respond {
  request: '019a6184-f832-7fbd-8896-3f4fced00068',
  dependency: {
    depTask: '019a617a-c1bd-7931-b060-27057bebff4b',
    depRelation: 'PRECEDES'
  }
} => { request: '019a6184-f832-7fbd-8896-3f4fced00068' }

[BroadcastWrite] client#0 (request.responded#32) - wrote event frame
[BroadcastWrite] client#1 (request.responded#32) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617b-7841-7d6c-b00a-62b903b4c836',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'math pset',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addDependency {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addDependency
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  adder: "demo",
  task1: "019a617a-743b-7d37-80a6-2a2015d13f90",
  task2: "019a617a-8174-7145-a8c3-b74ce65ac20d",
  dependency: "follows"
}

Requesting.request {
  adder: 'demo',
  task1: '019a617a-743b-7d37-80a6-2a2015d13f90',
  task2: '019a617a-8174-7145-a8c3-b74ce65ac20d',
  dependency: 'follows',
  path: '/TaskBank/addDependency'
} => { request: '019a6185-2af3-7a7f-af3e-c16559181a30' }


TaskBank.addDependency {
  adder: 'demo',
  task1: '019a617a-743b-7d37-80a6-2a2015d13f90',
  task2: '019a617a-8174-7145-a8c3-b74ce65ac20d',
  dependency: 'follows'
} => {
  dependency: {
    depTask: '019a617a-8174-7145-a8c3-b74ce65ac20d',
    depRelation: 'FOLLOWS'
  }
}

[Broadcast] request.responded -> {
  request: "019a6185-2af3-7a7f-af3e-c16559181a30",
  path: "/TaskBank/addDependency"
}
[Broadcast] request.responded#33 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6185-2af3-7a7f-af3e-c16559181a30","path":"/TaskBank/addDependency","response":{"dependency":{"depTask":"019a617a-8174-7145-a8c3-b74ce65ac20d","dep…
[BroadcastWrite] client#0 (request.responded#33) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#33) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#33) - ready resolved
[BroadcastWrite] client#1 (request.responded#33) - ready resolved

Requesting.respond {
  request: '019a6185-2af3-7a7f-af3e-c16559181a30',
  dependency: {
    depTask: '019a617a-8174-7145-a8c3-b74ce65ac20d',
    depRelation: 'FOLLOWS'
  }
} => { request: '019a6185-2af3-7a7f-af3e-c16559181a30' }

[BroadcastWrite] client#0 (request.responded#33) - wrote event frame
[BroadcastWrite] client#1 (request.responded#33) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617b-7841-7d6c-b00a-62b903b4c836',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'math pset',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/TaskBank/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /TaskBank/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { adder: "demo", name: "vacuum" }

Requesting.request { adder: 'demo', name: 'vacuum', path: '/TaskBank/addTask' } => { request: '019a6185-3f56-713e-89c9-ae1f9b4897bc' }

Added new task: vacuum

TaskBank.addTask { adder: 'demo', name: 'vacuum', description: undefined } => { task: '019a6185-3f87-7ddf-9a8f-f79dbe637e93' }

[Broadcast] request.responded -> {
  request: "019a6185-3f56-713e-89c9-ae1f9b4897bc",
  path: "/TaskBank/addTask"
}
[Broadcast] request.responded#34 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6185-3f56-713e-89c9-ae1f9b4897bc","path":"/TaskBank/addTask","response":{"task":"019a6185-3f87-7ddf-9a8f-f79dbe637e93"}},"ts":"2025-11-08T03:31:53…
[BroadcastWrite] client#0 (request.responded#34) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#34) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#34) - ready resolved
[BroadcastWrite] client#1 (request.responded#34) - ready resolved

Requesting.respond {
  request: '019a6185-3f56-713e-89c9-ae1f9b4897bc',
  task: '019a6185-3f87-7ddf-9a8f-f79dbe637e93'
} => { request: '019a6185-3f56-713e-89c9-ae1f9b4897bc' }

[BroadcastWrite] client#0 (request.responded#34) - wrote event frame
[BroadcastWrite] client#1 (request.responded#34) - wrote event frame
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617b-7841-7d6c-b00a-62b903b4c836',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'math pset',
      description: null,
      dependencies: []
    },
    {
      _id: '019a6185-3f87-7ddf-9a8f-f79dbe637e93',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'vacuum',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/lists"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/lists"
}
[Incoming] POST /api/TaskBank/listTasks {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/TaskBank/listTasks body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [],
      itemCount: 0
    }
  ]
}


TaskBank.listTasks { owner: 'demo' } => {
  tasks: [
    {
      _id: '019a617a-3a3e-7bb6-92f6-bce7762ed155',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'grocery shop',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-4888-727a-9dcd-e616cc3ea3a7',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'meal prep',
      description: null,
      dependencies: []
    },
    {
      _id: '019a617a-743b-7d37-80a6-2a2015d13f90',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'wash bedding',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-8174-7145-a8c3-b74ce65ac20d',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'make bed',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-c1bd-7931-b060-27057bebff4b',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci reading',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617a-da2d-739a-a14a-41da36b3665c',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'poli sci discussion post',
      description: null,
      dependencies: [Array]
    },
    {
      _id: '019a617b-7841-7d6c-b00a-62b903b4c836',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'math pset',
      description: null,
      dependencies: []
    },
    {
      _id: '019a6185-3f87-7ddf-9a8f-f79dbe637e93',
      bankId: '019a6179-fc37-7433-8da4-7da3d3bea984',
      taskName: 'vacuum',
      description: null,
      dependencies: []
    }
  ]
}

[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/ListCreation/newList {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /ListCreation/newList
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { listName: "household chores", listOwner: "demo" }

Requesting.request {
  listName: 'household chores',
  listOwner: 'demo',
  path: '/ListCreation/newList'
} => { request: '019a6185-62cd-72cb-9a1d-c0bd1731ec3e' }


ListCreation.newList { listName: 'household chores', listOwner: 'demo' } => { list: '019a6185-62ed-7865-bf1b-f39b6ab30fbf' }

[Broadcast] request.responded -> {
  request: "019a6185-62cd-72cb-9a1d-c0bd1731ec3e",
  path: "/ListCreation/newList"
}
[Broadcast] request.responded#35 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6185-62cd-72cb-9a1d-c0bd1731ec3e","path":"/ListCreation/newList","response":{"list":"019a6185-62ed-7865-bf1b-f39b6ab30fbf"}},"ts":"2025-11-08T03:3…
[BroadcastWrite] client#0 (request.responded#35) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#35) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#35) - ready resolved
[BroadcastWrite] client#1 (request.responded#35) - ready resolved

Requesting.respond {
  request: '019a6185-62cd-72cb-9a1d-c0bd1731ec3e',
  list: '019a6185-62ed-7865-bf1b-f39b6ab30fbf'
} => { request: '019a6185-62cd-72cb-9a1d-c0bd1731ec3e' }

[BroadcastWrite] client#0 (request.responded#35) - wrote event frame
[BroadcastWrite] client#1 (request.responded#35) - wrote event frame
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/ListCreation/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /ListCreation/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  list: "019a617b-2e9b-7442-a701-a5727f81b6bc",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  adder: "demo"
}

Requesting.request {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  task: '019a617a-da2d-739a-a14a-41da36b3665c',
  adder: 'demo',
  path: '/ListCreation/addTask'
} => { request: '019a6185-8e2b-77df-a181-7ef346f45331' }


ListCreation.addTask {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  task: '019a617a-da2d-739a-a14a-41da36b3665c',
  adder: 'demo'
} => {
  listItem: {
    name: undefined,
    task: '019a617a-da2d-739a-a14a-41da36b3665c',
    orderNumber: 1
  }
}

[Broadcast] request.responded -> {
  request: "019a6185-8e2b-77df-a181-7ef346f45331",
  path: "/ListCreation/addTask"
}
[Broadcast] request.responded#36 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6185-8e2b-77df-a181-7ef346f45331","path":"/ListCreation/addTask","response":{"listItem":{"task":"019a617a-da2d-739a-a14a-41da36b3665c","orderNumbe…
[BroadcastWrite] client#0 (request.responded#36) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#36) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#36) - ready resolved
[BroadcastWrite] client#1 (request.responded#36) - ready resolved

Requesting.respond {
  request: '019a6185-8e2b-77df-a181-7ef346f45331',
  listItem: {
    name: undefined,
    task: '019a617a-da2d-739a-a14a-41da36b3665c',
    orderNumber: 1
  }
} => { request: '019a6185-8e2b-77df-a181-7ef346f45331' }

[BroadcastWrite] client#0 (request.responded#36) - wrote event frame
[BroadcastWrite] client#1 (request.responded#36) - wrote event frame
[Incoming] POST /api/ListCreation/_getListById {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/_getListById body: { listId: "019a617b-2e9b-7442-a701-a5727f81b6bc" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [Array],
      itemCount: 1
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [Array],
      itemCount: 1
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/ListCreation/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /ListCreation/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  list: "019a617b-2e9b-7442-a701-a5727f81b6bc",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  adder: "demo"
}

Requesting.request {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  task: '019a617a-c1bd-7931-b060-27057bebff4b',
  adder: 'demo',
  path: '/ListCreation/addTask'
} => { request: '019a6185-9fe2-7e7a-9445-448dba5f5617' }


ListCreation.addTask {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  task: '019a617a-c1bd-7931-b060-27057bebff4b',
  adder: 'demo'
} => {
  listItem: {
    name: undefined,
    task: '019a617a-c1bd-7931-b060-27057bebff4b',
    orderNumber: 1
  }
}

[Broadcast] request.responded -> {
  request: "019a6185-9fe2-7e7a-9445-448dba5f5617",
  path: "/ListCreation/addTask"
}
[Broadcast] request.responded#37 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6185-9fe2-7e7a-9445-448dba5f5617","path":"/ListCreation/addTask","response":{"listItem":{"task":"019a617a-c1bd-7931-b060-27057bebff4b","orderNumbe…
[BroadcastWrite] client#0 (request.responded#37) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#37) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#37) - ready resolved
[BroadcastWrite] client#1 (request.responded#37) - ready resolved

Requesting.respond {
  request: '019a6185-9fe2-7e7a-9445-448dba5f5617',
  listItem: {
    name: undefined,
    task: '019a617a-c1bd-7931-b060-27057bebff4b',
    orderNumber: 1
  }
} => { request: '019a6185-9fe2-7e7a-9445-448dba5f5617' }

[BroadcastWrite] client#0 (request.responded#37) - wrote event frame
[BroadcastWrite] client#1 (request.responded#37) - wrote event frame
[Incoming] POST /api/ListCreation/_getListById {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/_getListById body: { listId: "019a617b-2e9b-7442-a701-a5727f81b6bc" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [Array],
      itemCount: 2
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [Array],
      itemCount: 2
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/ListCreation/addTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /ListCreation/addTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  list: "019a617b-2e9b-7442-a701-a5727f81b6bc",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836",
  adder: "demo"
}

Requesting.request {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836',
  adder: 'demo',
  path: '/ListCreation/addTask'
} => { request: '019a6185-b606-749f-978a-972d53263524' }


ListCreation.addTask {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836',
  adder: 'demo'
} => {
  listItem: {
    name: undefined,
    task: '019a617b-7841-7d6c-b00a-62b903b4c836',
    orderNumber: 1
  }
}

[Broadcast] request.responded -> {
  request: "019a6185-b606-749f-978a-972d53263524",
  path: "/ListCreation/addTask"
}
[Broadcast] request.responded#38 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6185-b606-749f-978a-972d53263524","path":"/ListCreation/addTask","response":{"listItem":{"task":"019a617b-7841-7d6c-b00a-62b903b4c836","orderNumbe…
[BroadcastWrite] client#0 (request.responded#38) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#38) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#38) - ready resolved
[BroadcastWrite] client#1 (request.responded#38) - ready resolved

Requesting.respond {
  request: '019a6185-b606-749f-978a-972d53263524',
  listItem: {
    name: undefined,
    task: '019a617b-7841-7d6c-b00a-62b903b4c836',
    orderNumber: 1
  }
} => { request: '019a6185-b606-749f-978a-972d53263524' }

[BroadcastWrite] client#0 (request.responded#38) - wrote event frame
[BroadcastWrite] client#1 (request.responded#38) - wrote event frame
[Incoming] POST /api/ListCreation/_getListById {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/_getListById body: { listId: "019a617b-2e9b-7442-a701-a5727f81b6bc" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [Array],
      itemCount: 3
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [Array],
      itemCount: 3
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [Array],
      itemCount: 3
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/Session/changeSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/changeSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  list: "019a617b-2e9b-7442-a701-a5727f81b6bc",
  sessionOwner: "demo",
  ownerId: "demo",
  ordering: "Random",
  format: "List"
}

Requesting.request {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  sessionOwner: 'demo',
  ownerId: 'demo',
  ordering: 'Random',
  format: 'List',
  path: '/Session/changeSession'
} => { request: '019a6185-f5ef-7823-a37a-7ccc8ac1cbf1' }

Session.changeSession: inserting new session {
  newSessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  owner: "demo",
  list: "019a617b-2e9b-7442-a701-a5727f81b6bc"
}
Session.changeSession: insertOne completed for session { newSessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }
Session.changeSession: inserting seed list items { sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59", count: 3 }
Session.changeSession: insertMany completed for seed items { sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59", count: 3 }
Session.changeSession: completed, returning session id { newSessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }

Session.changeSession {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  sessionOwner: 'demo',
  ordering: 'Random',
  format: 'List'
} => { session: '019a6185-f62c-73de-b8a8-5b32da9f8c59' }

[Broadcast] request.responded -> {
  request: "019a6185-f5ef-7823-a37a-7ccc8ac1cbf1",
  path: "/Session/changeSession"
}
[Broadcast] request.responded#39 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6185-f5ef-7823-a37a-7ccc8ac1cbf1","path":"/Session/changeSession","response":{"session":"019a6185-f62c-73de-b8a8-5b32da9f8c59"}},"ts":"2025-11-08T…
[BroadcastWrite] client#0 (request.responded#39) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#39) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#39) - ready resolved
[BroadcastWrite] client#1 (request.responded#39) - ready resolved

Requesting.respond {
  request: '019a6185-f5ef-7823-a37a-7ccc8ac1cbf1',
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59'
} => { request: '019a6185-f5ef-7823-a37a-7ccc8ac1cbf1' }

[BroadcastWrite] client#0 (request.responded#39) - wrote event frame
[BroadcastWrite] client#1 (request.responded#39) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/activateSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/activateSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59", activator: "demo" }

Requesting.request {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  activator: 'demo',
  path: '/Session/activateSession'
} => { request: '019a6185-fc05-7b36-87e3-4e624d08f19a' }

Session.activateSession: ordering is Random, calling randomizeOrder { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59", activator: "demo" }
Session.randomizeOrder: loaded session list items {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  count: 3,
  taskIds: [
    "019a617b-7841-7d6c-b00a-62b903b4c836",
    "019a617a-c1bd-7931-b060-27057bebff4b",
    "019a617a-da2d-739a-a14a-41da36b3665c"
  ]
}
Session.randomizeOrder: fetched taskDocs count { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59", taskDocsCount: 3 }
Session.randomizeOrder: raw deps for task {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  rawDeps: [
    {
      depTask: "019a617a-da2d-739a-a14a-41da36b3665c",
      depRelation: "FOLLOWS"
    }
  ]
}
Session.randomizeOrder: skipping dependency not in session {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  dep: {
    depTask: "019a617a-da2d-739a-a14a-41da36b3665c",
    depRelation: "FOLLOWS"
  }
}
Session.randomizeOrder: raw deps for task {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  rawDeps: [
    {
      depTask: "019a617a-c1bd-7931-b060-27057bebff4b",
      depRelation: "PRECEDES"
    }
  ]
}
Session.randomizeOrder: skipping dependency not in session {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  dep: {
    depTask: "019a617a-c1bd-7931-b060-27057bebff4b",
    depRelation: "PRECEDES"
  }
}
Session.randomizeOrder: raw deps for task {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836",
  rawDeps: []
}
Session.randomizeOrder: neighbors map after build [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", [] ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", [] ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", [] ]
]
Session.randomizeOrder: indegree map after build [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 0 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 0 ]
]
Session.randomizeOrder: initial indegree entries [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 0 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 0 ]
]
Session.randomizeOrder: initial zero-indegree nodes {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  zero: [
    "019a617b-7841-7d6c-b00a-62b903b4c836",
    "019a617a-c1bd-7931-b060-27057bebff4b",
    "019a617a-da2d-739a-a14a-41da36b3665c"
  ]
}
Session.randomizeOrder: selecting node {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  node: "019a617a-c1bd-7931-b060-27057bebff4b",
  remainingZero: 2
}
Session.randomizeOrder: selecting node {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  node: "019a617a-da2d-739a-a14a-41da36b3665c",
  remainingZero: 1
}
Session.randomizeOrder: selecting node {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  node: "019a617b-7841-7d6c-b00a-62b903b4c836",
  remainingZero: 0
}
Session.randomizeOrder: resultOrder length { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59", length: 3 }
Session.randomizeOrder: positionByTask mapping created [
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 1 ],
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 2 ]
]
Session.randomizeOrder: persisting randomOrder values for items { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59", itemCount: 3 }
Session.randomizeOrder: updating item randomOrder {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  listItemId: "019a6185-f63d-7200-beb0-7a6c44b8cad0",
  taskId: "019a617b-7841-7d6c-b00a-62b903b4c836",
  randomOrder: 2
}
Session.randomizeOrder: updating item randomOrder {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  listItemId: "019a6185-f63d-79f2-98f9-523e81d5e0e1",
  taskId: "019a617a-c1bd-7931-b060-27057bebff4b",
  randomOrder: 0
}
Session.randomizeOrder: updating item randomOrder {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  listItemId: "019a6185-f63d-738e-a34f-2825be79cf04",
  taskId: "019a617a-da2d-739a-a14a-41da36b3665c",
  randomOrder: 1
}
Session.randomizeOrder: completed { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59", count: 3 }
Session.activateSession: randomizeOrder returned { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59", result: {} }

Session.activateSession { session: '019a6185-f62c-73de-b8a8-5b32da9f8c59', activator: 'demo' } => {}

[Broadcast] request.responded -> {
  request: "019a6185-fc05-7b36-87e3-4e624d08f19a",
  path: "/Session/activateSession"
}
[Broadcast] request.responded#40 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6185-fc05-7b36-87e3-4e624d08f19a","path":"/Session/activateSession","response":{"result":{}}},"ts":"2025-11-08T03:32:42.269Z"}
[BroadcastWrite] client#0 (request.responded#40) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#40) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#40) - ready resolved
[BroadcastWrite] client#1 (request.responded#40) - ready resolved

Requesting.respond { request: '019a6185-fc05-7b36-87e3-4e624d08f19a', result: {} } => { request: '019a6185-fc05-7b36-87e3-4e624d08f19a' }

[BroadcastWrite] client#0 (request.responded#40) - wrote event frame
[BroadcastWrite] client#1 (request.responded#40) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/startTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/startTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
}

Requesting.request {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617a-c1bd-7931-b060-27057bebff4b',
  path: '/Session/startTask'
} => { request: '019a6186-0ddf-7ebe-94c1-2eedacffdb90' }

Session.startTask: updated item to In Progress {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  listItemId: "019a6185-f63d-79f2-98f9-523e81d5e0e1"
}

Session.startTask {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617a-c1bd-7931-b060-27057bebff4b',
  starter: undefined
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-0ddf-7ebe-94c1-2eedacffdb90",
  path: "/Session/startTask"
}
[Broadcast] request.responded#41 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-0ddf-7ebe-94c1-2eedacffdb90","path":"/Session/startTask","response":{"result":{}}},"ts":"2025-11-08T03:32:46.800Z"}
[BroadcastWrite] client#0 (request.responded#41) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#41) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#41) - ready resolved
[BroadcastWrite] client#1 (request.responded#41) - ready resolved
[Broadcast] session.task.started -> {
  sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  taskId: "019a617a-c1bd-7931-b060-27057bebff4b"
}
[Broadcast] session.task.started#42 -> clients=2 payload={"type":"session.task.started","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59","taskId":"019a617a-c1bd-7931-b060-27057bebff4b","response":{"result":{}}},"ts":"2025-11-08T03:32:46.801Z"}
[BroadcastWrite] client#0 (session.task.started#42) - attempting ready/write
[BroadcastWrite] client#1 (session.task.started#42) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }
[Broadcast] session.items.changed#43 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59"},"ts":"2025-11-08T03:32:46.802Z"}
[BroadcastWrite] client#0 (session.items.changed#43) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#43) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#41) - wrote event frame
[BroadcastWrite] client#0 (session.task.started#42) - ready resolved
[BroadcastWrite] client#1 (request.responded#41) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#42) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#43) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#43) - ready resolved

Requesting.respond { request: '019a6186-0ddf-7ebe-94c1-2eedacffdb90', result: {} } => { request: '019a6186-0ddf-7ebe-94c1-2eedacffdb90' }

[BroadcastWrite] client#0 (session.task.started#42) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#42) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#43) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#43) - wrote event frame
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/completeTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/completeTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
}

Requesting.request {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617a-c1bd-7931-b060-27057bebff4b',
  path: '/Session/completeTask'
} => { request: '019a6186-129f-7bf1-b5d8-7bc24f9013ef' }

Session.completeTask: updated item to Complete {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  listItemId: "019a6185-f63d-79f2-98f9-523e81d5e0e1"
}

Session.completeTask {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617a-c1bd-7931-b060-27057bebff4b'
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-129f-7bf1-b5d8-7bc24f9013ef",
  path: "/Session/completeTask"
}
[Broadcast] request.responded#44 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-129f-7bf1-b5d8-7bc24f9013ef","path":"/Session/completeTask","response":{"result":{}}},"ts":"2025-11-08T03:32:48.000Z"}
[BroadcastWrite] client#0 (request.responded#44) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#44) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#44) - ready resolved
[BroadcastWrite] client#1 (request.responded#44) - ready resolved
[Broadcast] session.task.completed -> {
  sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  taskId: "019a617a-c1bd-7931-b060-27057bebff4b"
}
[Broadcast] session.task.completed#45 -> clients=2 payload={"type":"session.task.completed","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59","taskId":"019a617a-c1bd-7931-b060-27057bebff4b","response":{"result":{}}},"ts":"2025-11-08T03:32:48.001Z"…
[BroadcastWrite] client#0 (session.task.completed#45) - attempting ready/write
[BroadcastWrite] client#1 (session.task.completed#45) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }
[Broadcast] session.items.changed#46 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59"},"ts":"2025-11-08T03:32:48.001Z"}
[BroadcastWrite] client#0 (session.items.changed#46) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#46) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#44) - wrote event frame
[BroadcastWrite] client#0 (session.task.completed#45) - ready resolved
[BroadcastWrite] client#1 (request.responded#44) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#45) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#46) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#46) - ready resolved

Requesting.respond { request: '019a6186-129f-7bf1-b5d8-7bc24f9013ef', result: {} } => { request: '019a6186-129f-7bf1-b5d8-7bc24f9013ef' }

[BroadcastWrite] client#0 (session.task.completed#45) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#45) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#46) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#46) - wrote event frame
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/startTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/startTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
}

Requesting.request {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617a-da2d-739a-a14a-41da36b3665c',
  path: '/Session/startTask'
} => { request: '019a6186-160c-7ac4-bfad-ffc902cee202' }

Session.startTask: updated item to In Progress {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  listItemId: "019a6185-f63d-738e-a34f-2825be79cf04"
}

Session.startTask {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617a-da2d-739a-a14a-41da36b3665c',
  starter: undefined
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-160c-7ac4-bfad-ffc902cee202",
  path: "/Session/startTask"
}
[Broadcast] request.responded#47 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-160c-7ac4-bfad-ffc902cee202","path":"/Session/startTask","response":{"result":{}}},"ts":"2025-11-08T03:32:48.899Z"}
[BroadcastWrite] client#0 (request.responded#47) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#47) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#47) - ready resolved
[BroadcastWrite] client#1 (request.responded#47) - ready resolved
[Broadcast] session.task.started -> {
  sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  taskId: "019a617a-da2d-739a-a14a-41da36b3665c"
}
[Broadcast] session.task.started#48 -> clients=2 payload={"type":"session.task.started","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59","taskId":"019a617a-da2d-739a-a14a-41da36b3665c","response":{"result":{}}},"ts":"2025-11-08T03:32:48.900Z"}
[BroadcastWrite] client#0 (session.task.started#48) - attempting ready/write
[BroadcastWrite] client#1 (session.task.started#48) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }
[Broadcast] session.items.changed#49 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59"},"ts":"2025-11-08T03:32:48.900Z"}
[BroadcastWrite] client#0 (session.items.changed#49) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#49) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#47) - wrote event frame
[BroadcastWrite] client#0 (session.task.started#48) - ready resolved
[BroadcastWrite] client#1 (request.responded#47) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#48) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#49) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#49) - ready resolved

Requesting.respond { request: '019a6186-160c-7ac4-bfad-ffc902cee202', result: {} } => { request: '019a6186-160c-7ac4-bfad-ffc902cee202' }

[BroadcastWrite] client#0 (session.task.started#48) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#48) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#49) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#49) - wrote event frame
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/completeTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/completeTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
}

Requesting.request {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617a-da2d-739a-a14a-41da36b3665c',
  path: '/Session/completeTask'
} => { request: '019a6186-18d2-7a0f-b486-1ceedc11dcd1' }

Session.completeTask: updated item to Complete {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  listItemId: "019a6185-f63d-738e-a34f-2825be79cf04"
}

Session.completeTask {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617a-da2d-739a-a14a-41da36b3665c'
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-18d2-7a0f-b486-1ceedc11dcd1",
  path: "/Session/completeTask"
}
[Broadcast] request.responded#50 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-18d2-7a0f-b486-1ceedc11dcd1","path":"/Session/completeTask","response":{"result":{}}},"ts":"2025-11-08T03:32:49.597Z"}
[BroadcastWrite] client#0 (request.responded#50) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#50) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#50) - ready resolved
[BroadcastWrite] client#1 (request.responded#50) - ready resolved
[Broadcast] session.task.completed -> {
  sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  taskId: "019a617a-da2d-739a-a14a-41da36b3665c"
}
[Broadcast] session.task.completed#51 -> clients=2 payload={"type":"session.task.completed","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59","taskId":"019a617a-da2d-739a-a14a-41da36b3665c","response":{"result":{}}},"ts":"2025-11-08T03:32:49.598Z"…
[BroadcastWrite] client#0 (session.task.completed#51) - attempting ready/write
[BroadcastWrite] client#1 (session.task.completed#51) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }
[Broadcast] session.items.changed#52 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59"},"ts":"2025-11-08T03:32:49.598Z"}
[BroadcastWrite] client#0 (session.items.changed#52) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#52) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#50) - wrote event frame
[BroadcastWrite] client#0 (session.task.completed#51) - ready resolved
[BroadcastWrite] client#1 (request.responded#50) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#51) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#52) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#52) - ready resolved

Requesting.respond { request: '019a6186-18d2-7a0f-b486-1ceedc11dcd1', result: {} } => { request: '019a6186-18d2-7a0f-b486-1ceedc11dcd1' }

[BroadcastWrite] client#0 (session.task.completed#51) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#51) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#52) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#52) - wrote event frame
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/startTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/startTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
}

Requesting.request {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836',
  path: '/Session/startTask'
} => { request: '019a6186-1c68-7b19-8b72-2f7e7be1111c' }

Session.startTask: updated item to In Progress {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836",
  listItemId: "019a6185-f63d-7200-beb0-7a6c44b8cad0"
}

Session.startTask {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836',
  starter: undefined
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-1c68-7b19-8b72-2f7e7be1111c",
  path: "/Session/startTask"
}
[Broadcast] request.responded#53 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-1c68-7b19-8b72-2f7e7be1111c","path":"/Session/startTask","response":{"result":{}}},"ts":"2025-11-08T03:32:50.533Z"}
[BroadcastWrite] client#0 (request.responded#53) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#53) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#53) - ready resolved
[BroadcastWrite] client#1 (request.responded#53) - ready resolved
[Broadcast] session.task.started -> {
  sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  taskId: "019a617b-7841-7d6c-b00a-62b903b4c836"
}
[Broadcast] session.task.started#54 -> clients=2 payload={"type":"session.task.started","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59","taskId":"019a617b-7841-7d6c-b00a-62b903b4c836","response":{"result":{}}},"ts":"2025-11-08T03:32:50.534Z"}
[BroadcastWrite] client#0 (session.task.started#54) - attempting ready/write
[BroadcastWrite] client#1 (session.task.started#54) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }
[Broadcast] session.items.changed#55 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59"},"ts":"2025-11-08T03:32:50.535Z"}
[BroadcastWrite] client#0 (session.items.changed#55) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#55) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#53) - wrote event frame
[BroadcastWrite] client#0 (session.task.started#54) - ready resolved
[BroadcastWrite] client#1 (request.responded#53) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#54) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#55) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#55) - ready resolved

Requesting.respond { request: '019a6186-1c68-7b19-8b72-2f7e7be1111c', result: {} } => { request: '019a6186-1c68-7b19-8b72-2f7e7be1111c' }

[BroadcastWrite] client#0 (session.task.started#54) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#54) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#55) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#55) - wrote event frame
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/completeTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/completeTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
}

Requesting.request {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836',
  path: '/Session/completeTask'
} => { request: '019a6186-1f65-736d-8aef-a589dd2370eb' }

Session.completeTask: updated item to Complete {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836",
  listItemId: "019a6185-f63d-7200-beb0-7a6c44b8cad0"
}

Session.completeTask {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836'
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-1f65-736d-8aef-a589dd2370eb",
  path: "/Session/completeTask"
}
[Broadcast] request.responded#56 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-1f65-736d-8aef-a589dd2370eb","path":"/Session/completeTask","response":{"result":{}}},"ts":"2025-11-08T03:32:51.271Z"}
[BroadcastWrite] client#0 (request.responded#56) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#56) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#56) - ready resolved
[BroadcastWrite] client#1 (request.responded#56) - ready resolved
[Broadcast] session.task.completed -> {
  sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  taskId: "019a617b-7841-7d6c-b00a-62b903b4c836"
}
[Broadcast] session.task.completed#57 -> clients=2 payload={"type":"session.task.completed","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59","taskId":"019a617b-7841-7d6c-b00a-62b903b4c836","response":{"result":{}}},"ts":"2025-11-08T03:32:51.272Z"…
[BroadcastWrite] client#0 (session.task.completed#57) - attempting ready/write
[BroadcastWrite] client#1 (session.task.completed#57) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }
[Broadcast] session.items.changed#58 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6185-f62c-73de-b8a8-5b32da9f8c59"},"ts":"2025-11-08T03:32:51.273Z"}
[BroadcastWrite] client#0 (session.items.changed#58) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#58) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#56) - wrote event frame
[BroadcastWrite] client#0 (session.task.completed#57) - ready resolved
[BroadcastWrite] client#1 (request.responded#56) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#57) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#58) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#58) - ready resolved

Requesting.respond { request: '019a6186-1f65-736d-8aef-a589dd2370eb', result: {} } => { request: '019a6186-1f65-736d-8aef-a589dd2370eb' }

[BroadcastWrite] client#0 (session.task.completed#57) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#57) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#58) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#58) - wrote event frame
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6185-f62c-73de-b8a8-5b32da9f8c59",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/endSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/endSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59", owner: "demo" }

Requesting.request {
  session: '019a6185-f62c-73de-b8a8-5b32da9f8c59',
  owner: 'demo',
  path: '/Session/endSession'
} => { request: '019a6186-24ef-787b-a24e-cff086bbf36c' }

Session.endSession: reset itemStatus to Incomplete for session { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }

Session.endSession { session: '019a6185-f62c-73de-b8a8-5b32da9f8c59' } => {}

[Broadcast] request.responded -> {
  request: "019a6186-24ef-787b-a24e-cff086bbf36c",
  path: "/Session/endSession"
}
[Broadcast] request.responded#59 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-24ef-787b-a24e-cff086bbf36c","path":"/Session/endSession","response":{"result":{}}},"ts":"2025-11-08T03:32:52.717Z"}
[BroadcastWrite] client#0 (request.responded#59) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#59) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#59) - ready resolved
[BroadcastWrite] client#1 (request.responded#59) - ready resolved

Requesting.respond { request: '019a6186-24ef-787b-a24e-cff086bbf36c', result: {} } => { request: '019a6186-24ef-787b-a24e-cff086bbf36c' }

[BroadcastWrite] client#0 (request.responded#59) - wrote event frame
[BroadcastWrite] client#1 (request.responded#59) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [Array],
      itemCount: 3
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/Session/changeSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/changeSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  list: "019a617b-2e9b-7442-a701-a5727f81b6bc",
  sessionOwner: "demo",
  ownerId: "demo",
  ordering: "Random",
  format: "task-by-task"
}

Requesting.request {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  sessionOwner: 'demo',
  ownerId: 'demo',
  ordering: 'Random',
  format: 'task-by-task',
  path: '/Session/changeSession'
} => { request: '019a6186-4e6f-70d1-9647-d1af30cb2c2b' }

Session.deleteSession: deleting listItems for session { session: "019a6185-f62c-73de-b8a8-5b32da9f8c59" }
Session.changeSession: inserting new session {
  newSessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  owner: "demo",
  list: "019a617b-2e9b-7442-a701-a5727f81b6bc"
}
Session.changeSession: insertOne completed for session { newSessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba" }
Session.changeSession: inserting seed list items { sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba", count: 3 }
Session.changeSession: insertMany completed for seed items { sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba", count: 3 }
Session.changeSession: completed, returning session id { newSessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba" }

Session.changeSession {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  sessionOwner: 'demo',
  ordering: 'Random',
  format: 'task-by-task'
} => { session: '019a6186-4ee3-7563-8d44-80eab327e2ba' }

[Broadcast] request.responded -> {
  request: "019a6186-4e6f-70d1-9647-d1af30cb2c2b",
  path: "/Session/changeSession"
}
[Broadcast] request.responded#60 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-4e6f-70d1-9647-d1af30cb2c2b","path":"/Session/changeSession","response":{"session":"019a6186-4ee3-7563-8d44-80eab327e2ba"}},"ts":"2025-11-08T…
[BroadcastWrite] client#0 (request.responded#60) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#60) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#60) - ready resolved
[BroadcastWrite] client#1 (request.responded#60) - ready resolved

Requesting.respond {
  request: '019a6186-4e6f-70d1-9647-d1af30cb2c2b',
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba'
} => { request: '019a6186-4e6f-70d1-9647-d1af30cb2c2b' }

[BroadcastWrite] client#0 (request.responded#60) - wrote event frame
[BroadcastWrite] client#1 (request.responded#60) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/activateSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/activateSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba", activator: "demo" }

Requesting.request {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  activator: 'demo',
  path: '/Session/activateSession'
} => { request: '019a6186-56c1-7819-9ecc-a41b30c56528' }

Session.activateSession: ordering is Random, calling randomizeOrder { session: "019a6186-4ee3-7563-8d44-80eab327e2ba", activator: "demo" }
Session.randomizeOrder: loaded session list items {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  count: 3,
  taskIds: [
    "019a617b-7841-7d6c-b00a-62b903b4c836",
    "019a617a-c1bd-7931-b060-27057bebff4b",
    "019a617a-da2d-739a-a14a-41da36b3665c"
  ]
}
Session.randomizeOrder: fetched taskDocs count { session: "019a6186-4ee3-7563-8d44-80eab327e2ba", taskDocsCount: 3 }
Session.randomizeOrder: raw deps for task {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  rawDeps: [
    {
      depTask: "019a617a-da2d-739a-a14a-41da36b3665c",
      depRelation: "FOLLOWS"
    }
  ]
}
Session.randomizeOrder: skipping dependency not in session {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  dep: {
    depTask: "019a617a-da2d-739a-a14a-41da36b3665c",
    depRelation: "FOLLOWS"
  }
}
Session.randomizeOrder: raw deps for task {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  rawDeps: [
    {
      depTask: "019a617a-c1bd-7931-b060-27057bebff4b",
      depRelation: "PRECEDES"
    }
  ]
}
Session.randomizeOrder: skipping dependency not in session {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  dep: {
    depTask: "019a617a-c1bd-7931-b060-27057bebff4b",
    depRelation: "PRECEDES"
  }
}
Session.randomizeOrder: raw deps for task {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836",
  rawDeps: []
}
Session.randomizeOrder: neighbors map after build [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", [] ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", [] ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", [] ]
]
Session.randomizeOrder: indegree map after build [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 0 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 0 ]
]
Session.randomizeOrder: initial indegree entries [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 0 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 0 ]
]
Session.randomizeOrder: initial zero-indegree nodes {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  zero: [
    "019a617b-7841-7d6c-b00a-62b903b4c836",
    "019a617a-c1bd-7931-b060-27057bebff4b",
    "019a617a-da2d-739a-a14a-41da36b3665c"
  ]
}
Session.randomizeOrder: selecting node {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  node: "019a617a-da2d-739a-a14a-41da36b3665c",
  remainingZero: 2
}
Session.randomizeOrder: selecting node {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  node: "019a617b-7841-7d6c-b00a-62b903b4c836",
  remainingZero: 1
}
Session.randomizeOrder: selecting node {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  node: "019a617a-c1bd-7931-b060-27057bebff4b",
  remainingZero: 0
}
Session.randomizeOrder: resultOrder length { session: "019a6186-4ee3-7563-8d44-80eab327e2ba", length: 3 }
Session.randomizeOrder: positionByTask mapping created [
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 0 ],
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 1 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 2 ]
]
Session.randomizeOrder: persisting randomOrder values for items { session: "019a6186-4ee3-7563-8d44-80eab327e2ba", itemCount: 3 }
Session.randomizeOrder: updating item randomOrder {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  listItemId: "019a6186-4ef4-7ba3-b159-35709d07f076",
  taskId: "019a617b-7841-7d6c-b00a-62b903b4c836",
  randomOrder: 1
}
Session.randomizeOrder: updating item randomOrder {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  listItemId: "019a6186-4ef4-7740-9b8e-da52b7dada92",
  taskId: "019a617a-c1bd-7931-b060-27057bebff4b",
  randomOrder: 2
}
Session.randomizeOrder: updating item randomOrder {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  listItemId: "019a6186-4ef4-7465-90ee-27b7a1f3bb42",
  taskId: "019a617a-da2d-739a-a14a-41da36b3665c",
  randomOrder: 0
}
Session.randomizeOrder: completed { session: "019a6186-4ee3-7563-8d44-80eab327e2ba", count: 3 }
Session.activateSession: randomizeOrder returned { session: "019a6186-4ee3-7563-8d44-80eab327e2ba", result: {} }

Session.activateSession { session: '019a6186-4ee3-7563-8d44-80eab327e2ba', activator: 'demo' } => {}

[Broadcast] request.responded -> {
  request: "019a6186-56c1-7819-9ecc-a41b30c56528",
  path: "/Session/activateSession"
}
[Broadcast] request.responded#61 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-56c1-7819-9ecc-a41b30c56528","path":"/Session/activateSession","response":{"result":{}}},"ts":"2025-11-08T03:33:05.489Z"}
[BroadcastWrite] client#0 (request.responded#61) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#61) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#61) - ready resolved
[BroadcastWrite] client#1 (request.responded#61) - ready resolved

Requesting.respond { request: '019a6186-56c1-7819-9ecc-a41b30c56528', result: {} } => { request: '019a6186-56c1-7819-9ecc-a41b30c56528' }

[BroadcastWrite] client#0 (request.responded#61) - wrote event frame
[BroadcastWrite] client#1 (request.responded#61) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/startTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/startTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
}

Requesting.request {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617a-da2d-739a-a14a-41da36b3665c',
  path: '/Session/startTask'
} => { request: '019a6186-7580-714c-be1a-bf25c4a40b70' }

Session.startTask: updated item to In Progress {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  listItemId: "019a6186-4ef4-7465-90ee-27b7a1f3bb42"
}

Session.startTask {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617a-da2d-739a-a14a-41da36b3665c',
  starter: undefined
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-7580-714c-be1a-bf25c4a40b70",
  path: "/Session/startTask"
}
[Broadcast] request.responded#62 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-7580-714c-be1a-bf25c4a40b70","path":"/Session/startTask","response":{"result":{}}},"ts":"2025-11-08T03:33:13.323Z"}
[BroadcastWrite] client#0 (request.responded#62) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#62) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#62) - ready resolved
[BroadcastWrite] client#1 (request.responded#62) - ready resolved
[Broadcast] session.task.started -> {
  sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  taskId: "019a617a-da2d-739a-a14a-41da36b3665c"
}
[Broadcast] session.task.started#63 -> clients=2 payload={"type":"session.task.started","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba","taskId":"019a617a-da2d-739a-a14a-41da36b3665c","response":{"result":{}}},"ts":"2025-11-08T03:33:13.324Z"}
[BroadcastWrite] client#0 (session.task.started#63) - attempting ready/write
[BroadcastWrite] client#1 (session.task.started#63) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba" }
[Broadcast] session.items.changed#64 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba"},"ts":"2025-11-08T03:33:13.324Z"}
[BroadcastWrite] client#0 (session.items.changed#64) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#64) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#62) - wrote event frame
[BroadcastWrite] client#0 (session.task.started#63) - ready resolved
[BroadcastWrite] client#1 (request.responded#62) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#63) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#64) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#64) - ready resolved

Requesting.respond { request: '019a6186-7580-714c-be1a-bf25c4a40b70', result: {} } => { request: '019a6186-7580-714c-be1a-bf25c4a40b70' }

[BroadcastWrite] client#0 (session.task.started#63) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#63) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#64) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#64) - wrote event frame
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/completeTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/completeTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
}

Requesting.request {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617a-da2d-739a-a14a-41da36b3665c',
  path: '/Session/completeTask'
} => { request: '019a6186-7a73-7c61-9f4b-656462e8f198' }

Session.completeTask: updated item to Complete {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  listItemId: "019a6186-4ef4-7465-90ee-27b7a1f3bb42"
}

Session.completeTask {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617a-da2d-739a-a14a-41da36b3665c'
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-7a73-7c61-9f4b-656462e8f198",
  path: "/Session/completeTask"
}
[Broadcast] request.responded#65 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-7a73-7c61-9f4b-656462e8f198","path":"/Session/completeTask","response":{"result":{}}},"ts":"2025-11-08T03:33:14.581Z"}
[BroadcastWrite] client#0 (request.responded#65) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#65) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#65) - ready resolved
[BroadcastWrite] client#1 (request.responded#65) - ready resolved
[Broadcast] session.task.completed -> {
  sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  taskId: "019a617a-da2d-739a-a14a-41da36b3665c"
}
[Broadcast] session.task.completed#66 -> clients=2 payload={"type":"session.task.completed","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba","taskId":"019a617a-da2d-739a-a14a-41da36b3665c","response":{"result":{}}},"ts":"2025-11-08T03:33:14.582Z"…
[BroadcastWrite] client#0 (session.task.completed#66) - attempting ready/write
[BroadcastWrite] client#1 (session.task.completed#66) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba" }
[Broadcast] session.items.changed#67 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba"},"ts":"2025-11-08T03:33:14.583Z"}
[BroadcastWrite] client#0 (session.items.changed#67) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#67) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#65) - wrote event frame
[BroadcastWrite] client#0 (session.task.completed#66) - ready resolved
[BroadcastWrite] client#1 (request.responded#65) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#66) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#67) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#67) - ready resolved

Requesting.respond { request: '019a6186-7a73-7c61-9f4b-656462e8f198', result: {} } => { request: '019a6186-7a73-7c61-9f4b-656462e8f198' }

[BroadcastWrite] client#0 (session.task.completed#66) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#66) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#67) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#67) - wrote event frame
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-da2d-739a-a14a-41da36b3665c"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/startTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/startTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
}

Requesting.request {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836',
  path: '/Session/startTask'
} => { request: '019a6186-7d50-7824-898c-41e24ce00c52' }

Session.startTask: updated item to In Progress {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836",
  listItemId: "019a6186-4ef4-7ba3-b159-35709d07f076"
}

Session.startTask {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836',
  starter: undefined
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-7d50-7824-898c-41e24ce00c52",
  path: "/Session/startTask"
}
[Broadcast] request.responded#68 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-7d50-7824-898c-41e24ce00c52","path":"/Session/startTask","response":{"result":{}}},"ts":"2025-11-08T03:33:15.331Z"}
[BroadcastWrite] client#0 (request.responded#68) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#68) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#68) - ready resolved
[BroadcastWrite] client#1 (request.responded#68) - ready resolved
[Broadcast] session.task.started -> {
  sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  taskId: "019a617b-7841-7d6c-b00a-62b903b4c836"
}
[Broadcast] session.task.started#69 -> clients=2 payload={"type":"session.task.started","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba","taskId":"019a617b-7841-7d6c-b00a-62b903b4c836","response":{"result":{}}},"ts":"2025-11-08T03:33:15.332Z"}
[BroadcastWrite] client#0 (session.task.started#69) - attempting ready/write
[BroadcastWrite] client#1 (session.task.started#69) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba" }
[Broadcast] session.items.changed#70 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba"},"ts":"2025-11-08T03:33:15.332Z"}
[BroadcastWrite] client#0 (session.items.changed#70) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#70) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#68) - wrote event frame
[BroadcastWrite] client#0 (session.task.started#69) - ready resolved
[BroadcastWrite] client#1 (request.responded#68) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#69) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#70) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#70) - ready resolved

Requesting.respond { request: '019a6186-7d50-7824-898c-41e24ce00c52', result: {} } => { request: '019a6186-7d50-7824-898c-41e24ce00c52' }

[BroadcastWrite] client#0 (session.task.started#69) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#69) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#70) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#70) - wrote event frame
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/completeTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/completeTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
}

Requesting.request {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836',
  path: '/Session/completeTask'
} => { request: '019a6186-7fa6-7625-ba9f-c8d4bc59c238' }

Session.completeTask: updated item to Complete {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836",
  listItemId: "019a6186-4ef4-7ba3-b159-35709d07f076"
}

Session.completeTask {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617b-7841-7d6c-b00a-62b903b4c836'
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-7fa6-7625-ba9f-c8d4bc59c238",
  path: "/Session/completeTask"
}
[Broadcast] request.responded#71 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-7fa6-7625-ba9f-c8d4bc59c238","path":"/Session/completeTask","response":{"result":{}}},"ts":"2025-11-08T03:33:15.920Z"}
[BroadcastWrite] client#0 (request.responded#71) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#71) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#71) - ready resolved
[BroadcastWrite] client#1 (request.responded#71) - ready resolved
[Broadcast] session.task.completed -> {
  sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  taskId: "019a617b-7841-7d6c-b00a-62b903b4c836"
}
[Broadcast] session.task.completed#72 -> clients=2 payload={"type":"session.task.completed","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba","taskId":"019a617b-7841-7d6c-b00a-62b903b4c836","response":{"result":{}}},"ts":"2025-11-08T03:33:15.921Z"…
[BroadcastWrite] client#0 (session.task.completed#72) - attempting ready/write
[BroadcastWrite] client#1 (session.task.completed#72) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba" }
[Broadcast] session.items.changed#73 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba"},"ts":"2025-11-08T03:33:15.922Z"}
[BroadcastWrite] client#0 (session.items.changed#73) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#73) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#71) - wrote event frame
[BroadcastWrite] client#0 (session.task.completed#72) - ready resolved
[BroadcastWrite] client#1 (request.responded#71) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#72) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#73) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#73) - ready resolved

Requesting.respond { request: '019a6186-7fa6-7625-ba9f-c8d4bc59c238', result: {} } => { request: '019a6186-7fa6-7625-ba9f-c8d4bc59c238' }

[BroadcastWrite] client#0 (session.task.completed#72) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#72) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#73) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#73) - wrote event frame
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/startTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/startTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
}

Requesting.request {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617a-c1bd-7931-b060-27057bebff4b',
  path: '/Session/startTask'
} => { request: '019a6186-8306-7d2d-9597-5f0f485cb0df' }

Session.startTask: updated item to In Progress {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  listItemId: "019a6186-4ef4-7740-9b8e-da52b7dada92"
}

Session.startTask {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617a-c1bd-7931-b060-27057bebff4b',
  starter: undefined
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-8306-7d2d-9597-5f0f485cb0df",
  path: "/Session/startTask"
}
[Broadcast] request.responded#74 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-8306-7d2d-9597-5f0f485cb0df","path":"/Session/startTask","response":{"result":{}}},"ts":"2025-11-08T03:33:16.804Z"}
[BroadcastWrite] client#0 (request.responded#74) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#74) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#74) - ready resolved
[BroadcastWrite] client#1 (request.responded#74) - ready resolved
[Broadcast] session.task.started -> {
  sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  taskId: "019a617a-c1bd-7931-b060-27057bebff4b"
}
[Broadcast] session.task.started#75 -> clients=2 payload={"type":"session.task.started","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba","taskId":"019a617a-c1bd-7931-b060-27057bebff4b","response":{"result":{}}},"ts":"2025-11-08T03:33:16.804Z"}
[BroadcastWrite] client#0 (session.task.started#75) - attempting ready/write
[BroadcastWrite] client#1 (session.task.started#75) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba" }
[Broadcast] session.items.changed#76 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba"},"ts":"2025-11-08T03:33:16.805Z"}
[BroadcastWrite] client#0 (session.items.changed#76) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#76) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#74) - wrote event frame
[BroadcastWrite] client#0 (session.task.started#75) - ready resolved
[BroadcastWrite] client#1 (request.responded#74) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#75) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#76) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#76) - ready resolved

Requesting.respond { request: '019a6186-8306-7d2d-9597-5f0f485cb0df', result: {} } => { request: '019a6186-8306-7d2d-9597-5f0f485cb0df' }

[BroadcastWrite] client#0 (session.task.started#75) - wrote event frame
[BroadcastWrite] client#1 (session.task.started#75) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#76) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#76) - wrote event frame
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/completeTask {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/completeTask
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
}

Requesting.request {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617a-c1bd-7931-b060-27057bebff4b',
  path: '/Session/completeTask'
} => { request: '019a6186-85bb-7877-b7c7-ef7bd62c4722' }

Session.completeTask: updated item to Complete {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  listItemId: "019a6186-4ef4-7740-9b8e-da52b7dada92"
}

Session.completeTask {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  task: '019a617a-c1bd-7931-b060-27057bebff4b'
} => {}

[Broadcast] request.responded -> {
  request: "019a6186-85bb-7877-b7c7-ef7bd62c4722",
  path: "/Session/completeTask"
}
[Broadcast] request.responded#77 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-85bb-7877-b7c7-ef7bd62c4722","path":"/Session/completeTask","response":{"result":{}}},"ts":"2025-11-08T03:33:17.467Z"}
[BroadcastWrite] client#0 (request.responded#77) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#77) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#77) - ready resolved
[BroadcastWrite] client#1 (request.responded#77) - ready resolved
[Broadcast] session.task.completed -> {
  sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  taskId: "019a617a-c1bd-7931-b060-27057bebff4b"
}
[Broadcast] session.task.completed#78 -> clients=2 payload={"type":"session.task.completed","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba","taskId":"019a617a-c1bd-7931-b060-27057bebff4b","response":{"result":{}}},"ts":"2025-11-08T03:33:17.468Z"…
[BroadcastWrite] client#0 (session.task.completed#78) - attempting ready/write
[BroadcastWrite] client#1 (session.task.completed#78) - attempting ready/write
[Broadcast] session.items.changed -> { sessionId: "019a6186-4ee3-7563-8d44-80eab327e2ba" }
[Broadcast] session.items.changed#79 -> clients=2 payload={"type":"session.items.changed","payload":{"sessionId":"019a6186-4ee3-7563-8d44-80eab327e2ba"},"ts":"2025-11-08T03:33:17.469Z"}
[BroadcastWrite] client#0 (session.items.changed#79) - attempting ready/write
[BroadcastWrite] client#1 (session.items.changed#79) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#77) - wrote event frame
[BroadcastWrite] client#0 (session.task.completed#78) - ready resolved
[BroadcastWrite] client#1 (request.responded#77) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#78) - ready resolved
[BroadcastWrite] client#0 (session.items.changed#79) - ready resolved
[BroadcastWrite] client#1 (session.items.changed#79) - ready resolved

Requesting.respond { request: '019a6186-85bb-7877-b7c7-ef7bd62c4722', result: {} } => { request: '019a6186-85bb-7877-b7c7-ef7bd62c4722' }

[BroadcastWrite] client#0 (session.task.completed#78) - wrote event frame
[BroadcastWrite] client#1 (session.task.completed#78) - wrote event frame
[BroadcastWrite] client#0 (session.items.changed#79) - wrote event frame
[BroadcastWrite] client#1 (session.items.changed#79) - wrote event frame
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getTaskStatus {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getTaskStatus body: {
  session: "019a6186-4ee3-7563-8d44-80eab327e2ba",
  task: "019a617a-c1bd-7931-b060-27057bebff4b"
} headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/endSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/endSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { session: "019a6186-4ee3-7563-8d44-80eab327e2ba", owner: "demo" }

Requesting.request {
  session: '019a6186-4ee3-7563-8d44-80eab327e2ba',
  owner: 'demo',
  path: '/Session/endSession'
} => { request: '019a6186-8bb0-7914-a83f-25404592f5d1' }

Session.endSession: reset itemStatus to Incomplete for session { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" }

Session.endSession { session: '019a6186-4ee3-7563-8d44-80eab327e2ba' } => {}

[Broadcast] request.responded -> {
  request: "019a6186-8bb0-7914-a83f-25404592f5d1",
  path: "/Session/endSession"
}
[Broadcast] request.responded#80 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-8bb0-7914-a83f-25404592f5d1","path":"/Session/endSession","response":{"result":{}}},"ts":"2025-11-08T03:33:19.032Z"}
[BroadcastWrite] client#0 (request.responded#80) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#80) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#80) - ready resolved
[BroadcastWrite] client#1 (request.responded#80) - ready resolved

Requesting.respond { request: '019a6186-8bb0-7914-a83f-25404592f5d1', result: {} } => { request: '019a6186-8bb0-7914-a83f-25404592f5d1' }

[BroadcastWrite] client#0 (request.responded#80) - wrote event frame
[BroadcastWrite] client#1 (request.responded#80) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/ListCreation/getListsByOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/ListCreation/getListsByOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}

ListCreation.getListsByOwner { owner: 'demo' } => {
  lists: [
    {
      _id: '019a617b-1b5e-752f-91e0-9b4142115052',
      owner: 'demo',
      title: 'weekend to-dos',
      listItems: [],
      itemCount: 0
    },
    {
      _id: '019a617b-2e9b-7442-a701-a5727f81b6bc',
      owner: 'demo',
      title: 'weekly school work',
      listItems: [Array],
      itemCount: 3
    },
    {
      _id: '019a6185-62ed-7865-bf1b-f39b6ab30fbf',
      owner: 'demo',
      title: 'household chores',
      listItems: [],
      itemCount: 0
    }
  ]
}

[Incoming] POST /api/Session/changeSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/changeSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: {
  list: "019a617b-2e9b-7442-a701-a5727f81b6bc",
  sessionOwner: "demo",
  ownerId: "demo",
  ordering: "Random",
  format: "List"
}

Requesting.request {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  sessionOwner: 'demo',
  ownerId: 'demo',
  ordering: 'Random',
  format: 'List',
  path: '/Session/changeSession'
} => { request: '019a6186-fa99-77b7-82ce-f6a215e89fb0' }

Session.deleteSession: deleting listItems for session { session: "019a6186-4ee3-7563-8d44-80eab327e2ba" }
Session.changeSession: inserting new session {
  newSessionId: "019a6186-fb22-749f-ac3e-df39605761b0",
  owner: "demo",
  list: "019a617b-2e9b-7442-a701-a5727f81b6bc"
}
Session.changeSession: insertOne completed for session { newSessionId: "019a6186-fb22-749f-ac3e-df39605761b0" }
Session.changeSession: inserting seed list items { sessionId: "019a6186-fb22-749f-ac3e-df39605761b0", count: 3 }
Session.changeSession: insertMany completed for seed items { sessionId: "019a6186-fb22-749f-ac3e-df39605761b0", count: 3 }
Session.changeSession: completed, returning session id { newSessionId: "019a6186-fb22-749f-ac3e-df39605761b0" }

Session.changeSession {
  list: '019a617b-2e9b-7442-a701-a5727f81b6bc',
  sessionOwner: 'demo',
  ordering: 'Random',
  format: 'List'
} => { session: '019a6186-fb22-749f-ac3e-df39605761b0' }

[Broadcast] request.responded -> {
  request: "019a6186-fa99-77b7-82ce-f6a215e89fb0",
  path: "/Session/changeSession"
}
[Broadcast] request.responded#81 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-fa99-77b7-82ce-f6a215e89fb0","path":"/Session/changeSession","response":{"session":"019a6186-fb22-749f-ac3e-df39605761b0"}},"ts":"2025-11-08T…
[BroadcastWrite] client#0 (request.responded#81) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#81) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#81) - ready resolved
[BroadcastWrite] client#1 (request.responded#81) - ready resolved

Requesting.respond {
  request: '019a6186-fa99-77b7-82ce-f6a215e89fb0',
  session: '019a6186-fb22-749f-ac3e-df39605761b0'
} => { request: '019a6186-fa99-77b7-82ce-f6a215e89fb0' }

[BroadcastWrite] client#0 (request.responded#81) - wrote event frame
[BroadcastWrite] client#1 (request.responded#81) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-fb22-749f-ac3e-df39605761b0" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-fb22-749f-ac3e-df39605761b0" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/activateSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/activateSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { session: "019a6186-fb22-749f-ac3e-df39605761b0", activator: "demo" }

Requesting.request {
  session: '019a6186-fb22-749f-ac3e-df39605761b0',
  activator: 'demo',
  path: '/Session/activateSession'
} => { request: '019a6186-ffee-7feb-aa52-6f8ccdf91a88' }

Session.activateSession: ordering is Random, calling randomizeOrder { session: "019a6186-fb22-749f-ac3e-df39605761b0", activator: "demo" }
Session.randomizeOrder: loaded session list items {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  count: 3,
  taskIds: [
    "019a617b-7841-7d6c-b00a-62b903b4c836",
    "019a617a-c1bd-7931-b060-27057bebff4b",
    "019a617a-da2d-739a-a14a-41da36b3665c"
  ]
}
Session.randomizeOrder: fetched taskDocs count { session: "019a6186-fb22-749f-ac3e-df39605761b0", taskDocsCount: 3 }
Session.randomizeOrder: raw deps for task {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  rawDeps: [
    {
      depTask: "019a617a-da2d-739a-a14a-41da36b3665c",
      depRelation: "FOLLOWS"
    }
  ]
}
Session.randomizeOrder: skipping dependency not in session {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  dep: {
    depTask: "019a617a-da2d-739a-a14a-41da36b3665c",
    depRelation: "FOLLOWS"
  }
}
Session.randomizeOrder: raw deps for task {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  rawDeps: [
    {
      depTask: "019a617a-c1bd-7931-b060-27057bebff4b",
      depRelation: "PRECEDES"
    }
  ]
}
Session.randomizeOrder: skipping dependency not in session {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  dep: {
    depTask: "019a617a-c1bd-7931-b060-27057bebff4b",
    depRelation: "PRECEDES"
  }
}
Session.randomizeOrder: raw deps for task {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836",
  rawDeps: []
}
Session.randomizeOrder: neighbors map after build [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", [] ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", [] ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", [] ]
]
Session.randomizeOrder: indegree map after build [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 0 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 0 ]
]
Session.randomizeOrder: initial indegree entries [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 0 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 0 ]
]
Session.randomizeOrder: initial zero-indegree nodes {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  zero: [
    "019a617b-7841-7d6c-b00a-62b903b4c836",
    "019a617a-c1bd-7931-b060-27057bebff4b",
    "019a617a-da2d-739a-a14a-41da36b3665c"
  ]
}
Session.randomizeOrder: selecting node {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  node: "019a617b-7841-7d6c-b00a-62b903b4c836",
  remainingZero: 2
}
Session.randomizeOrder: selecting node {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  node: "019a617a-c1bd-7931-b060-27057bebff4b",
  remainingZero: 1
}
Session.randomizeOrder: selecting node {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  node: "019a617a-da2d-739a-a14a-41da36b3665c",
  remainingZero: 0
}
Session.randomizeOrder: resultOrder length { session: "019a6186-fb22-749f-ac3e-df39605761b0", length: 3 }
Session.randomizeOrder: positionByTask mapping created [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 0 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 1 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 2 ]
]
Session.randomizeOrder: persisting randomOrder values for items { session: "019a6186-fb22-749f-ac3e-df39605761b0", itemCount: 3 }
Session.randomizeOrder: updating item randomOrder {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  listItemId: "019a6186-fb35-713b-9470-93e392d1f3ff",
  taskId: "019a617b-7841-7d6c-b00a-62b903b4c836",
  randomOrder: 0
}
Session.randomizeOrder: updating item randomOrder {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  listItemId: "019a6186-fb35-777c-9f3c-b7bd0273f20d",
  taskId: "019a617a-c1bd-7931-b060-27057bebff4b",
  randomOrder: 1
}
Session.randomizeOrder: updating item randomOrder {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  listItemId: "019a6186-fb35-767c-a8a2-27e931093bce",
  taskId: "019a617a-da2d-739a-a14a-41da36b3665c",
  randomOrder: 2
}
Session.randomizeOrder: completed { session: "019a6186-fb22-749f-ac3e-df39605761b0", count: 3 }
Session.activateSession: randomizeOrder returned { session: "019a6186-fb22-749f-ac3e-df39605761b0", result: {} }

Session.activateSession { session: '019a6186-fb22-749f-ac3e-df39605761b0', activator: 'demo' } => {}

[Broadcast] request.responded -> {
  request: "019a6186-ffee-7feb-aa52-6f8ccdf91a88",
  path: "/Session/activateSession"
}
[Broadcast] request.responded#82 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6186-ffee-7feb-aa52-6f8ccdf91a88","path":"/Session/activateSession","response":{"result":{}}},"ts":"2025-11-08T03:33:48.802Z"}
[BroadcastWrite] client#0 (request.responded#82) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#82) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#82) - ready resolved
[BroadcastWrite] client#1 (request.responded#82) - ready resolved

Requesting.respond { request: '019a6186-ffee-7feb-aa52-6f8ccdf91a88', result: {} } => { request: '019a6186-ffee-7feb-aa52-6f8ccdf91a88' }

[BroadcastWrite] client#0 (request.responded#82) - wrote event frame
[BroadcastWrite] client#1 (request.responded#82) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-fb22-749f-ac3e-df39605761b0" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/endSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/endSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { session: "019a6186-fb22-749f-ac3e-df39605761b0", owner: "demo" }

Requesting.request {
  session: '019a6186-fb22-749f-ac3e-df39605761b0',
  owner: 'demo',
  path: '/Session/endSession'
} => { request: '019a6187-0c72-7892-994f-7229d27e83c6' }

Session.endSession: reset itemStatus to Incomplete for session { session: "019a6186-fb22-749f-ac3e-df39605761b0" }

Session.endSession { session: '019a6186-fb22-749f-ac3e-df39605761b0' } => {}

[Broadcast] request.responded -> {
  request: "019a6187-0c72-7892-994f-7229d27e83c6",
  path: "/Session/endSession"
}
[Broadcast] request.responded#83 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6187-0c72-7892-994f-7229d27e83c6","path":"/Session/endSession","response":{"result":{}}},"ts":"2025-11-08T03:33:51.980Z"}
[BroadcastWrite] client#0 (request.responded#83) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#83) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#83) - ready resolved
[BroadcastWrite] client#1 (request.responded#83) - ready resolved

Requesting.respond { request: '019a6187-0c72-7892-994f-7229d27e83c6', result: {} } => { request: '019a6187-0c72-7892-994f-7229d27e83c6' }

[BroadcastWrite] client#0 (request.responded#83) - wrote event frame
[BroadcastWrite] client#1 (request.responded#83) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/activateSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/activateSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { session: "019a6186-fb22-749f-ac3e-df39605761b0", activator: "demo" }

Requesting.request {
  session: '019a6186-fb22-749f-ac3e-df39605761b0',
  activator: 'demo',
  path: '/Session/activateSession'
} => { request: '019a6187-1312-7a91-8d38-31d33a0982d0' }

Session.activateSession: ordering is Random, calling randomizeOrder { session: "019a6186-fb22-749f-ac3e-df39605761b0", activator: "demo" }
Session.randomizeOrder: loaded session list items {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  count: 3,
  taskIds: [
    "019a617b-7841-7d6c-b00a-62b903b4c836",
    "019a617a-c1bd-7931-b060-27057bebff4b",
    "019a617a-da2d-739a-a14a-41da36b3665c"
  ]
}
Session.randomizeOrder: fetched taskDocs count { session: "019a6186-fb22-749f-ac3e-df39605761b0", taskDocsCount: 3 }
Session.randomizeOrder: raw deps for task {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  rawDeps: [
    {
      depTask: "019a617a-da2d-739a-a14a-41da36b3665c",
      depRelation: "FOLLOWS"
    }
  ]
}
Session.randomizeOrder: skipping dependency not in session {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617a-c1bd-7931-b060-27057bebff4b",
  dep: {
    depTask: "019a617a-da2d-739a-a14a-41da36b3665c",
    depRelation: "FOLLOWS"
  }
}
Session.randomizeOrder: raw deps for task {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  rawDeps: [
    {
      depTask: "019a617a-c1bd-7931-b060-27057bebff4b",
      depRelation: "PRECEDES"
    }
  ]
}
Session.randomizeOrder: skipping dependency not in session {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617a-da2d-739a-a14a-41da36b3665c",
  dep: {
    depTask: "019a617a-c1bd-7931-b060-27057bebff4b",
    depRelation: "PRECEDES"
  }
}
Session.randomizeOrder: raw deps for task {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  task: "019a617b-7841-7d6c-b00a-62b903b4c836",
  rawDeps: []
}
Session.randomizeOrder: neighbors map after build [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", [] ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", [] ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", [] ]
]
Session.randomizeOrder: indegree map after build [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 0 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 0 ]
]
Session.randomizeOrder: initial indegree entries [
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 0 ],
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 0 ]
]
Session.randomizeOrder: initial zero-indegree nodes {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  zero: [
    "019a617b-7841-7d6c-b00a-62b903b4c836",
    "019a617a-c1bd-7931-b060-27057bebff4b",
    "019a617a-da2d-739a-a14a-41da36b3665c"
  ]
}
Session.randomizeOrder: selecting node {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  node: "019a617a-c1bd-7931-b060-27057bebff4b",
  remainingZero: 2
}
Session.randomizeOrder: selecting node {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  node: "019a617b-7841-7d6c-b00a-62b903b4c836",
  remainingZero: 1
}
Session.randomizeOrder: selecting node {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  node: "019a617a-da2d-739a-a14a-41da36b3665c",
  remainingZero: 0
}
Session.randomizeOrder: resultOrder length { session: "019a6186-fb22-749f-ac3e-df39605761b0", length: 3 }
Session.randomizeOrder: positionByTask mapping created [
  [ "019a617a-c1bd-7931-b060-27057bebff4b", 0 ],
  [ "019a617b-7841-7d6c-b00a-62b903b4c836", 1 ],
  [ "019a617a-da2d-739a-a14a-41da36b3665c", 2 ]
]
Session.randomizeOrder: persisting randomOrder values for items { session: "019a6186-fb22-749f-ac3e-df39605761b0", itemCount: 3 }
Session.randomizeOrder: updating item randomOrder {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  listItemId: "019a6186-fb35-713b-9470-93e392d1f3ff",
  taskId: "019a617b-7841-7d6c-b00a-62b903b4c836",
  randomOrder: 1
}
Session.randomizeOrder: updating item randomOrder {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  listItemId: "019a6186-fb35-777c-9f3c-b7bd0273f20d",
  taskId: "019a617a-c1bd-7931-b060-27057bebff4b",
  randomOrder: 0
}
Session.randomizeOrder: updating item randomOrder {
  session: "019a6186-fb22-749f-ac3e-df39605761b0",
  listItemId: "019a6186-fb35-767c-a8a2-27e931093bce",
  taskId: "019a617a-da2d-739a-a14a-41da36b3665c",
  randomOrder: 2
}
Session.randomizeOrder: completed { session: "019a6186-fb22-749f-ac3e-df39605761b0", count: 3 }
Session.activateSession: randomizeOrder returned { session: "019a6186-fb22-749f-ac3e-df39605761b0", result: {} }

Session.activateSession { session: '019a6186-fb22-749f-ac3e-df39605761b0', activator: 'demo' } => {}

[Broadcast] request.responded -> {
  request: "019a6187-1312-7a91-8d38-31d33a0982d0",
  path: "/Session/activateSession"
}
[Broadcast] request.responded#84 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6187-1312-7a91-8d38-31d33a0982d0","path":"/Session/activateSession","response":{"result":{}}},"ts":"2025-11-08T03:33:53.719Z"}
[BroadcastWrite] client#0 (request.responded#84) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#84) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#84) - ready resolved
[BroadcastWrite] client#1 (request.responded#84) - ready resolved

Requesting.respond { request: '019a6187-1312-7a91-8d38-31d33a0982d0', result: {} } => { request: '019a6187-1312-7a91-8d38-31d33a0982d0' }

[BroadcastWrite] client#0 (request.responded#84) - wrote event frame
[BroadcastWrite] client#1 (request.responded#84) - wrote event frame
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getActiveSessionForOwner {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getActiveSessionForOwner body: { owner: "demo" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/_getSessionListItems {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Passthrough] /api/Session/_getSessionListItems body: { session: "019a6186-fb22-749f-ac3e-df39605761b0" } headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Incoming] POST /api/Session/endSession {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  cookie: "",
  referer: "http://localhost:5173/"
}
[Requesting] Received request for path: /Session/endSession
[Requesting] Headers: {
  origin: "http://localhost:5173",
  host: "localhost:8000",
  "content-type": "application/json",
  cookie: "",
  referer: "http://localhost:5173/"
} [Requesting] Body: { session: "019a6186-fb22-749f-ac3e-df39605761b0", owner: "demo" }

Requesting.request {
  session: '019a6186-fb22-749f-ac3e-df39605761b0',
  owner: 'demo',
  path: '/Session/endSession'
} => { request: '019a6187-1f6b-7d0e-a955-05070eebf378' }

Session.endSession: reset itemStatus to Incomplete for session { session: "019a6186-fb22-749f-ac3e-df39605761b0" }

Session.endSession { session: '019a6186-fb22-749f-ac3e-df39605761b0' } => {}

[Broadcast] request.responded -> {
  request: "019a6187-1f6b-7d0e-a955-05070eebf378",
  path: "/Session/endSession"
}
[Broadcast] request.responded#85 -> clients=2 payload={"type":"request.responded","payload":{"request":"019a6187-1f6b-7d0e-a955-05070eebf378","path":"/Session/endSession","response":{"result":{}}},"ts":"2025-11-08T03:33:56.840Z"}
[BroadcastWrite] client#0 (request.responded#85) - attempting ready/write
[BroadcastWrite] client#1 (request.responded#85) - attempting ready/write
[BroadcastWrite] client#0 (request.responded#85) - ready resolved
[BroadcastWrite] client#1 (request.responded#85) - ready resolved

Requesting.respond { request: '019a6187-1f6b-7d0e-a955-05070eebf378', result: {} } => { request: '019a6187-1f6b-7d0e-a955-05070eebf378' }

[BroadcastWrite] client#0 (request.responded#85) - wrote event frame
[BroadcastWrite] client#1 (request.responded#85) - wrote event frame
```