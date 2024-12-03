import geopandas as gpd
import matplotlib.pyplot as plt

shapefile = gpd.read_file("./setores/setores.shp")  

print("Colunas:", shapefile.columns)
print("Primeiras linhas:\n", shapefile.head())

numero_setor = "354980505000012P" 
setor = shapefile[shapefile['CD_SETOR'] == numero_setor] 

if setor.empty:
    print("Setor não encontrado. Verifique o número do setor e a coluna.")
else:
    print("Setor encontrado:", setor)

    ax = shapefile.plot(edgecolor="grey", color="none")  
    setor.plot(ax=ax, color="blue") 
    plt.title(f"Setor Censitário {numero_setor}")
    plt.show()
