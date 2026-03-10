// Area Stack Gradient
export const areaStackGradientOption = {
  tooltip: { trigger: "axis" },
  legend: { data: ["Email", "Affiliate", "Video Ads", "Direct", "Search"] },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: { type: "value" },
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: { focus: "series" },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Affiliate",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: { focus: "series" },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: { focus: "series" },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: { focus: "series" },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: { focus: "series" },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

// Treemap
export const treemapOption = {
  series: [
    {
      type: "treemap",
      data: [
        { name: "A", value: 10 },
        { name: "B", value: 20 },
        { name: "C", value: 30 },
      ],
      leafDepth: 2,
      label: { show: true },
    },
  ],
};

// Line with touch tooltip
export const lineTouchTooltipOption = {
  tooltip: { trigger: "axis" },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: { type: "value" },
  series: [
    {
      name: "Line",
      type: "line",
      showSymbol: false,
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

// Pie rose
export const pieRoseTypeOption = {
  tooltip: { trigger: "item" },
  legend: { bottom: 0 },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["20%", "80%"],
      roseType: "area",
      data: [
        { value: 40, name: "Email" },
        { value: 38, name: "Affiliate" },
        { value: 32, name: "Video Ads" },
        { value: 30, name: "Direct" },
        { value: 28, name: "Search" },
      ],
    },
  ],
};

// Pie border radius
export const pieBorderRadiusOption = {
  tooltip: { trigger: "item" },
  legend: { bottom: 0 },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
      data: [
        { value: 1048, name: "Search" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Affiliate" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};

// Stacked bar (normalization)
export const barStackNormalizationOption = {
  tooltip: { trigger: "axis" },
  legend: { bottom: 0 },
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  yAxis: { type: "value" },
  series: [
    {
      name: "Apples",
      type: "bar",
      stack: "stack1",
      data: [120, 132, 101, 134, 90],
    },
    {
      name: "Oranges",
      type: "bar",
      stack: "stack1",
      data: [220, 182, 191, 234, 290],
    },
    {
      name: "Pears",
      type: "bar",
      stack: "stack1",
      data: [150, 232, 201, 154, 190],
    },
  ],
};

// Another stacked bar example
export const barStackVariationOption = {
  tooltip: { trigger: "axis" },
  legend: { bottom: 0 },
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  yAxis: { type: "value" },
  series: [
    { name: "A", type: "bar", stack: "s1", data: [12, 34, 56, 23, 78] },
    { name: "B", type: "bar", stack: "s1", data: [30, 10, 20, 40, 15] },
    { name: "C", type: "bar", stack: "s1", data: [20, 20, 30, 20, 25] },
  ],
};
