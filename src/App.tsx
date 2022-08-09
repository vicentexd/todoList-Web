import { PlusCircle } from "phosphor-react";
import { useMemo, useState } from "react";
import { Task } from "./components/Task";

type TaskObj = {
  id: number;
  description: string;
  completed: boolean;
};

function App() {
  const [taskText, setTaskText] = useState("");
  const [taskList, setTaskList] = useState<TaskObj[]>([]);

  const handleCreateTask = () => {
    if (taskText === "") {
      return;
    }
    const newTask: TaskObj = {
      id: Math.random() * 1000,
      completed: false,
      description: taskText,
    };

    setTaskList((prevState) => [...prevState, newTask]);
    setTaskText("");
  };

  const handleDeleteTask = (id: number) => {
    setTaskList((prevState) => prevState.filter((task) => task.id !== id));
  };

  const handleCheckTask = (id: number) => {
    const findIndexTask = taskList.findIndex((task) => task.id === id);
    const updateTasks = [...taskList];

    if (findIndexTask !== -1) {
      updateTasks[findIndexTask] = {
        ...updateTasks[findIndexTask],
        completed: !updateTasks[findIndexTask].completed,
      };
    }

    setTaskList(updateTasks);
  };

  const infoTask = useMemo(
    () =>
      taskList.reduce(
        (acc, curr) => {
          const updateAcc = acc;

          if (curr.completed) {
            updateAcc.completed += 1;
          }

          updateAcc.total += 1;

          return updateAcc;
        },
        { completed: 0, total: 0 }
      ),
    [taskList]
  );

  return (
    <div className="flex flex-col w-screen justify-center items-center h-screen bg-[#1A1A1A]">
      <div className="flex w-screen h-52 justify-center items-center  bg-[#0D0D0D]">
        <img src="../src/assets/Logo.png" className="h-fit w-32" />
      </div>

      <div className="flex w-2/5 justify-between relative -top-7">
        <input
          className="flex-1 w-1/5 h-14 border border-[#0D0D0D] rounded-md bg-[#262626] p-4 text-base placeholder-[#808080] focus:outline-none focus:border-[#5E60CE] text-[#F2F2F2]"
          type={"text"}
          placeholder="Adicione uma nova tarefa"
          value={taskText}
          onChange={(e) => setTaskText(e.currentTarget.value)}
          onKeyUp={(e) => e.key === "Enter" && handleCreateTask()}
        />
        <button
          onClick={handleCreateTask}
          className="flex flex-row hover:opacity-75  ml-1 w-24 h-14 bg-[#1E6F9F] items-center justify-center gap-2 rounded-md "
        >
          <p className="text-sm font-bold text-[#F2F2F2]">Criar</p>
          <PlusCircle size={24} color="#F2F2F2" />
        </button>
      </div>

      <div className="w-2/5 h-full">
        <div className="flex flex-row mx-6 justify-between mt-16">
          <div className="flex flex-row gap-4">
            <p className="text-base font-bold text-[#4EA8DE]">Criadas</p>
            <div className="flex w-8 h-6 bg-[#333333] justify-center items-center rounded-xl">
              <p className="text-base text-[#F2F2F2]">{infoTask.total}</p>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <p className="text-base font-bold text-[#8284FA]">Concluídas</p>
            <div className="flex w-8 h-6 bg-[#333333] justify-center items-center rounded-xl">
              <p className="text-base text-[#F2F2F2]">{infoTask.completed}</p>
            </div>
          </div>
        </div>

        {taskList.length === 0 ? (
          <div className="flex flex-col border-t-2 border-[#333333] mt-5 justify-center items-center h-52 ">
            <img src="../src/assets/Clipboard.png" />
            <div className="flex">
              <p className="text-base text-[#808080]">
                <span className="font-bold">
                  Você ainda não tem tarefas cadastradas
                </span>
                <br />
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-6">
            {taskList.map((task) => (
              <Task
                completed={task.completed}
                description={task.description}
                id={task.id}
                onDelete={handleDeleteTask}
                onCompleted={handleCheckTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
