import os
from pathlib import Path
import shutil

pasta=r'E:\Arquivos\Gabriel\Python\Site Francisco\Site\images\ingredientes\Imagens Cardápio da Semana'
pasta_dst=r'E:\Arquivos\Gabriel\Python\Site Francisco\Site\images\ingredientes'
#os.startfile(pasta)
pasta_=Path(pasta).iterdir()
qte_arquivos=len(list(pasta_))
arquivos_ordenados=[]
for i in range(qte_arquivos):
    arquivos_ordenados.append(f'Slide{i+1}.PNG')
lista_ingredientes=[
'alcatra',
'carne_de_panela',
'file_de_carne',
'file_de_frango',
'frango_recheado',
'lasanha_a_bolonhesa',
'linguica_toscana',
'peito_de_peru',
'picadinho',
'strogonoff_de_carne']
j=0
for arq in arquivos_ordenados:
    if 'PNG' in str(arq):
        nome_arquivo=str(arq).split('\\')[-1]       
        os.rename(pasta+'\\'+nome_arquivo,pasta+'\\'+lista_ingredientes[j]+'.jpg')
        shutil.move(pasta+'\\'+lista_ingredientes[j]+'.jpg',pasta_dst+'\\'+lista_ingredientes[j]+'.jpg')
        j=j+1

