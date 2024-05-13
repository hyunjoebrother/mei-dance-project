"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type ChartDataItem = {
  x: string;
  y: number;
};

type ChartSeries = {
  data: ChartDataItem[];
};

const ChartData: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: "treemap",
      height: 660,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      treemap: {
        distributed: true,
      },
    },
    legend: {
      show: false,
    },
  };

  const series: ChartSeries[] = [
    {
      data: [
        { x: "세븐틴", y: 75 },
        { x: "TWS", y: 3 },
        { x: "(여자)아이들", y: 9 },
        { x: "NCT", y: 11 },
        { x: "Stray Kids", y: 11 },
        { x: "TWICE", y: 8 },
        { x: "ENHYPEN", y: 3 },
        { x: "NMIXX", y: 7 },
        { x: "Red Velvet", y: 2 },
        { x: "ETC", y: 21 },
        { x: "방탄소년단", y: 15 },
        { x: "2PM", y: 2 },
        { x: "IVE", y: 7 },
        { x: "Billlie", y: 1 },
        { x: "aespa", y: 5 },
        { x: "마마무", y: 6 },
        { x: "블락비", y: 2 },
        { x: "LE SSERAFIM", y: 7 },
        { x: "NewJeans", y: 11 },
        { x: "BLACKPINK", y: 10 },
        { x: "JYP", y: 2 },
        { x: "청하", y: 5 },
        { x: "Kep1er", y: 1 },
        { x: "카라", y: 4 },
        { x: "더보이즈", y: 1 },
        { x: "태양", y: 3 },
        { x: "오마이걸", y: 3 },
        { x: "투모로우바이투게더", y: 9 },
        { x: "STAYC", y: 4 },
        { x: "EXO", y: 5 },
        { x: "WANNA ONE", y: 1 },
        { x: "원어스", y: 1 },
        { x: "MAVE:", y: 1 },
        { x: "SHINee", y: 7 },
        { x: "ASTRO", y: 1 },
        { x: "BABYMONSTER", y: 3 },
        { x: "4minute", y: 2 },
        { x: "ATEEZ", y: 5 },
        { x: "CHOREO", y: 31 },
        { x: "인피니트", y: 1 },
        { x: "전소미", y: 4 },
        { x: "ITZY", y: 2 },
        { x: "소녀시대", y: 2 },
        { x: "RIIZE", y: 3 },
        { x: "뉴이스트", y: 1 },
        { x: "제시", y: 1 },
        { x: "B1A4", y: 1 },
        { x: "f(x)", y: 1 },
        { x: "여자친구", y: 2 },
        { x: "Apink", y: 1 },
        { x: "아이유", y: 2 },
        { x: "GOT7", y: 1 },
        { x: "SuperM", y: 1 },
        { x: "ILLIT", y: 2 },
        { x: "틴탑", y: 1 },
        { x: "BoA", y: 1 },
        { x: "BOYNEXTDOOR", y: 1 },
      ],
    },
  ];
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="treemap"
      height={350}
    />
  );
};

export default ChartData;
