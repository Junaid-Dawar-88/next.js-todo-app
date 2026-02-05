import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { id: 'desc' },
    })
    return new Response(JSON.stringify(todos), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch todos' }), { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const newTodo = await prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status || 'pending',
        priority: body.priority || 'medium',
      },
    })

    return new Response(JSON.stringify(newTodo), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to create todo' }), { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const id = body.id

    if (!id) {
      return new Response(JSON.stringify({ error: 'Todo id is required' }), { status: 400 })
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        priority: body.priority,
      },
    })

    return new Response(JSON.stringify(updatedTodo), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to update todo' }), { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const id = body.id

    if (!id) {
      return new Response(JSON.stringify({ error: 'Todo id is required' }), { status: 400 })
    }

    await prisma.todo.delete({
      where: { id: Number(id) },
    })

    return new Response(JSON.stringify({ message: 'Todo deleted successfully' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to delete todo' }), { status: 500 })
  }
}