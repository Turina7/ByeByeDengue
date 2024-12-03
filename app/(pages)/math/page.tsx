"use client";
import { useState } from "react";
import { fetchSisaData } from "@/app/api/sisaweb/sisaWebApi";
import Button from "@/app/components/button/button";
import { Bar } from "react-chartjs-2";
import styles from "@/app/(pages)/math/page.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MathWithGraph() {
  const [tipo, setTipo] = useState<string>("1");
  const [inicio, setInicio] = useState<string>("");
  const [final, setFinal] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const tipoOptions = [
    { value: "1", label: "Visita a Imóveis: imóveis trabalhados, fechados e pendencia" },
    { value: "2", label: "Visita a Imóveis: imóveis trabalhados, fechados e tratamentos" },
    { value: "3", label: "Agentes: semana, dias, imóveis trabalhados, fechados e positivos" },
    { value: "4", label: "Visitas: imóveis trabalhados, fechados, positivos e tratamentos" },
    { value: "5", label: "Controle de Criadouros: imóveis trabalhados, fechados e tratamentos" },
    { value: "6", label: "Áreas Transmissão: imóveis trabalhados, fechados, tratamentos e recip. com água" },
    { value: "7", label: "Índices Controle: imóveis trabalhados, fechados, recip. com água, larvas e índices" },
    { value: "8", label: "Aval Densid Larvária: imóveis trabalhados, recip. positivos e índices" },
    { value: "9", label: "Aval Densid Larvária - Grupo de Recipientes: qualificação de recipients por grupo" },
    { value: "10", label: "Aval Densid Larvária: índices de recipientes" },
    { value: "11", label: "Ovitrampa: positividade" },
    { value: "12", label: "Imóveis Cadastrados: cobertura. Considera existentes antes do período de início" },
    { value: "13", label: "Imóveis Cadastrados: positividade e tratamentos" },
    { value: "14", label: "Aval Densid Larvária - Tipo de Recipientes: qualificação de recipients por tipo e censitário" },
    { value: "15", label: "Visita a Imóveis - Pendência por Setor Censitário" },
    { value: "16", label: "Visita a Imóveis - Qualificação da Pendência por Setor Censitário" },
  ];

  const handleSubmit = async () => {
    if (!inicio || !final) {
      alert("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    try {
      const result = await fetchSisaData(tipo, inicio, final);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: data.map((item) => item.area), // Use "area" as labels
    datasets: [
      {
        label: "Trabalhados",
        data: data.map((item) => parseInt(item.trabalhados, 10)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Não Trabalhados",
        data: data.map((item) => parseInt(item.nao_trabalhados, 10)),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Focal",
        data: data.map((item) => parseInt(item.focal, 10)),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
      {
        label: "Perifocal",
        data: data.map((item) => parseInt(item.perifocal, 10)),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Nebulização",
        data: data.map((item) => parseInt(item.nebulizacao, 10)),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Mecanico",
        data: data.map((item) => parseInt(item.mecanico, 10)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
      {
        label: "Alternativo",
        data: data.map((item) => parseInt(item.alternativo, 10)),
        backgroundColor: "rgba(201, 203, 207, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
      title: {
        display: true,
        text: "Trabalhados vs Não Trabalhados vs Other Metrics by Area",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Area",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sisa Web Data</h1>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={styles.select}>
            {tipoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Início:
          <input
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            className={styles.input}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Final:
          <input
            type="date"
            value={final}
            onChange={(e) => setFinal(e.target.value)}
            className={styles.input}
          />
        </label>
      </div>
      <Button onClick={handleSubmit} disabled={loading} className={styles.button}>
        {loading ? "Loading..." : "Fetch Data"}
      </Button>
      {data.length > 0 && (
        <div className={styles.chartContainer}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}
