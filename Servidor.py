from tkinter import Tk,Button, Text,Entry,Label,PhotoImage,messagebox,END
import subprocess
from subprocess import run
import asyncio
import pyperclip
import os
import time
import psutil
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import pyautogui



janela=Tk()


icone = PhotoImage(file='icone aplicativo.png')
janela.iconphoto(False, icone)
janela.geometry('370x390')
janela.resizable(False,False)
janela.title('Configurações de "Site Francisco"')
botao=Button(janela,text='Iniciar site')


texto0='Iniciando site ...'
texto1='node .\\servidor.js'
texto2='http://127.0.0.1:80'
texto3='ssh -R 80:127.0.0.1:80 serveo.net'

def fechar_servidor1(*args):
    for i in psutil.process_iter():
        if 'node' in i.name().lower() or 'ssh' in i.name().lower():
            i.kill()
    texto_status=Label(janela,foreground='red')
    texto_status['text']="Servidor desligado!"

def fechar_servidor(*args):
    for i in psutil.process_iter():
        if 'node' in i.name().lower() or 'ssh' in i.name().lower():
            i.kill()
    janela.destroy()
janela.protocol("WM_DELETE_WINDOW", fechar_servidor)


def abrir_navegador(*args):
    pyautogui.press('win')
    time.sleep(3)
    pyautogui.write('Chrome')
    pyautogui.press('enter')
    time.sleep(3)
    pyperclip.copy(texto2)
    pyautogui.hotkey("ctrl",'v')
    pyautogui.press('enter')


def iniciar_site_publico_(*args):
    os.chdir("E:\\Arquivos\\Gabriel\\Python\\Site Francisco\\Site")
    id = subprocess.Popen(["ssh","-R","80:127.0.0.1:3000","serveo.net"])


def iniciar_site_(*args):
    os.chdir("E:\\Arquivos\\Gabriel\\Python\\Site Francisco\\Site")
    id = subprocess.Popen(["node",".\\servidor.js"])
    

def iniciar_logs_(*args):

    logs.delete('1.0', END)
    logs.insert('1.0',texto0+'\n'+texto1)

    c1.delete('0',END)
    c1.insert('0',texto2)
    c2.delete('0',END)
    c2.insert('0',texto3)

    texto_status.configure(text="Servidor ligado!",fg='green')
    texto_status.update()
    os.chdir("E:\\Arquivos\\Gabriel\\Python\\Site Francisco\\Site")
   

def iniciar_tudo(*args):
    if texto_status['text']!='Servidor ligado!':
        iniciar_logs_()
        iniciar_site_()
        iniciar_site_publico_()
        #time.sleep(7)
        #abrir_navegador()
     
        

    else:

        messagebox.showinfo(message='O servidor já está ligado!',title='Aviso')



def status_servidor(*args):
    texto=''
    PID=False
    k=0
    kk=len(psutil.pids())
    for i in psutil.process_iter():         

        if ('node'  in  i.name().lower()):
            PID=True
        else:
            pass
        k+=1
    if not PID and k==kk:
        texto_status.configure(text="Servidor desligado!",fg='red')
        texto_status.update()
    elif PID:
        texto_status.configure(text="Servidor ligado!",fg='green')
        texto_status.update()
            

t1=Label(janela,text='Servidor local')
t1.grid(row=2,column=0,sticky='w')

c1=Entry(janela,width=32)
c1.grid(row=3,column=0,sticky='w')

t2=Label(janela,text='Servidor público -> necessário copiar e colar no CMD')
t2.grid(row=4,column=0,sticky='w')

c2=Entry(janela,width=32)
c2.grid(row=5,column=0,sticky='w')


botao.bind('<Button-1>',iniciar_tudo)
botao.grid(row=0,column=0,sticky='W')

botao1=Button(janela,text='Fechar servidor')
botao1.grid(row=0,column=0,sticky='W',padx=botao.winfo_reqwidth())
botao1.bind('<Button-1>',fechar_servidor1)    

janela.bind('<Motion>',status_servidor)
janela.bind('<<Focus In>>',status_servidor)


logs=Text(janela,height=8,width=24)
logs.grid(row=1,column=0,sticky='we',columnspan=2)


b2=Button(janela,text='Copiar')
b2.grid(row=3,column=0,padx=c1.winfo_reqwidth())

b3=Button(janela,text='Copiar')
b3.grid(row=5,column=0,padx=c2.winfo_reqwidth())

def copiar_texto2(*args):
    pyperclip.copy(texto2)
b2.bind('<Button-1>',copiar_texto2)

def copiar_texto3(*args):
    pyperclip.copy(texto3)
b3.bind('<Button-1>',copiar_texto3)



texto_status=Label(janela,foreground='red')
texto_status.grid(row=7,column=0,pady=18,columnspan=2,sticky='WE')
texto_status['text']="Servidor desligado!"
janela.mainloop()