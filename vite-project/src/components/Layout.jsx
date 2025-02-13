import React from 'react'


const Layout = ({children,deletedTasks,setdeletedTasks,tasks,setTasks}) => {

    const restoreTask = (index)=>{
        const restoredTask = deletedTasks[index];
        setTasks([...tasks,restoredTask]);
        setdeletedTasks(deletedTasks.filter((_,i)=>i !== index))
    }
  return (
    <div className='flex flex-col min-h-screen' style={{ backgroundColor: "var(--background)" }}>


        {/* Header */}
        <header className='bg-primary text-xl text-white p-4 text-center' style={{ backgroundColor: "var(--primary)" }}>
            <h1 className="text-white-900 font-bold">To-Do List</h1>
        </header>

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <aside className='w-64 bg-gray-200 p-4 hidden md:block fixed h-full'>
                <h2 className='font-bold text-primary'>Left Sidebar</h2>
            </aside>


            <main className='flex-1 p-4 overflow-y-auto ml-64 mr-64'>
               {children}    
            </main>

             {/* Right Sidebar */}

            {deletedTasks.length > 0 && (
            <aside className='w-64 bg-gray-200 p-4 fixed right-0 h-full'>
                <h2 className='font-bold text-primary'>Deleted Items</h2>
                <ul className='space-y-2'>
                {
                    deletedTasks.map((task,index)=>(
                        <li key={index} className=
                        'p-2 border rounded-md text-gray-500  flex justify-between items-center'
                        style={{
                            backgroundColor: "var(--background)",
                            color: "var(--text-dark)",
                            borderColor: "var(--border-shade)",
                          }}>
                        <span>{task.text}</span>
                        <button 
                        onClick={()=>restoreTask(index)}
                        className='bg-green-500 text-white px-2 py-1 rounded'
                        style={{
                            backgroundColor: "var(--secondary)",
                            color: "white",
                          }}
                        >
                            Restore
                        </button>
                        </li>
                    ))
                }
                </ul>
            </aside>
            )}
        </div>

        {/* Footer */}
        <footer
        className="bg-primary text-white  text-center sm:p-5 md:p-3 text-sm sm:text-base md:text-lg"
        style={{ backgroundColor: "var(--primary)" }}
        >
        🤗Like my work? Let’s build something amazing together!
        </footer>
    </div>
  );
}

export default Layout