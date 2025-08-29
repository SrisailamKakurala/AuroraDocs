import subprocess
import sys
import os
import multiprocessing

def activate_venv_and_run(service, port, module):
    # Construct the full path to the activate script and uvicorn executable
    activate_script = os.path.join(os.getcwd(), '.venv', 'Scripts', 'activate.bat')
    uvicorn_path = os.path.join(os.getcwd(), '.venv', 'Scripts', 'uvicorn.exe')
    
    # Command to activate venv and run uvicorn (using the full path to uvicorn)
    cmd = f'cmd.exe /C "{activate_script} && "{uvicorn_path}" {module}:app --reload --port {port}"'
    
    # Start the process
    process = subprocess.Popen(cmd, shell=True)
    print(f"Started {service} on port {port} with PID {process.pid}")
    return process

if __name__ == '__main__':
    # Define services, ports, and corresponding modules
    services = [
        ("doc_processor", 8002, "doc_processor.main"),
        ("embedder", 8003, "embedder.main"),
        ("rag", 8004, "rag.main")
    ]
    
    # List to hold process objects
    processes = []
    
    # Start each service in a separate process
    for service, port, module in services:
        process = multiprocessing.Process(target=activate_venv_and_run, args=(service, port, module))
        processes.append(process)
        process.start()
    
    # Keep the main process alive to prevent child processes from terminating
    try:
        for process in processes:
            process.join()
    except KeyboardInterrupt:
        print("Shutting down services...")
        for process in processes:
            process.terminate()
        for process in processes:
            process.join()
        print("All services stopped.")