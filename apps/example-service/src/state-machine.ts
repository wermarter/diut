import { assign, createActor, createMachine, fromPromise } from 'xstate'

const fetchLogic = fromPromise(async () => {
  const response = await fetch('http://localhost:5000/api/docs')
  const data = await response.text()
  console.log({ data })
  return data
})

const tourMachine = createMachine({
  types: {
    // actions: {} as
    //   | { type: 'todo.added' }
    //   | { type: 'todo.completed' }
    //   | { type: 'todo.removed' },
    events: {} as
      | { type: 'todo.added' }
      | { type: 'todo.updated'; todo: { completed: boolean } }
      | { type: 'todo.removed' },
  },
  context: {
    count: 0,
  },
  id: 'tour',
  initial: 'start',
  states: {
    start: {
      on: {
        'todo.added': {
          target: 'todo added',
        },
      },
    },
    'todo added': {
      on: {
        'todo.updated': {
          guard: ({ event }) => {
            return event.todo?.completed
          },
          target: 'todo completed',
        },
      },
    },
    'todo completed': {
      on: {
        'todo.removed': {
          target: 'todo removed',
        },
      },
    },
    'todo removed': {
      on: {
        'todo.*': {
          actions: assign({
            count: ({ context }) => context.count + 1,
          }),
        },
      },
      always: {
        guard: ({ context }) => context.count > 2,
        target: 'expert',
      },
    },
    expert: {
      description: 'You are at an expert state',
      invoke: {
        src: fetchLogic,
        onDone: {
          target: 'got stuff',
        },
      },
    },
    'got stuff': {
      type: 'final',
    },
  },
})
const tourActor = createActor(tourMachine)

tourActor.subscribe({
  next: (snapshot) => {
    console.log(`--> ${snapshot.value}`)
  },
  complete() {
    console.log('complete')
  },
})

tourActor.start()

tourActor.send({ type: 'todo.added' })
tourActor.send({ type: 'todo.updated', todo: { completed: true } })
tourActor.send({ type: 'todo.removed' })

tourActor.send({ type: 'todo.added' })
tourActor.send({ type: 'todo.added' })
tourActor.send({ type: 'todo.added' })

// tourActor.stop()
