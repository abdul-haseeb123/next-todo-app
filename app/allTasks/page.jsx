import getTasks from "../lib/getTasks"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/options"

async function Page() {
    const session = await getServerSession(authOptions)
    const tasks = await getTasks(session.user.email)
    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.content}</li>
                ))}
            </ul>
        </div>

    )
}

export default Page