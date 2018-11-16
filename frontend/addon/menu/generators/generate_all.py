""" Generates all of the JS for the app """
import os
import subprocess
for script in os.listdir('.'):
    if script != 'generate_all.py' and script.endswith('.py'):
        subprocess.run(['python3', script])
