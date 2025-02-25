
import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const PieChart = ({ positive, negative, neutral, videoTitle, totalComments }) => {
  const chartRef = useRef(null);

  // Data for the pie chart
  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [positive, negative, neutral],
        backgroundColor: ['#28a745', '#dc3545', '#6c757d'],
        borderWidth: 1,
      },
    ],
  };

  // Function to handle the download with title and stats
  const wrapText = (text, x, y, maxWidth, lineHeight, ctx) => {
    const words = text.split(" ");
    let line = "";
    let textY = y;

    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            ctx.fillText(line, x, textY);
            line = words[i] + " ";
            textY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, textY);
    return textY; // Return the final Y position for correct text placement
};

const handleDownload = () => {
  if (chartRef.current) {
      const chartCanvas = chartRef.current.canvas;

      // Increase extraHeight to create more space below the chart
      const extraHeight = 220; 
      const offscreenCanvas = document.createElement("canvas");
      const ctx = offscreenCanvas.getContext("2d");

      // Set new canvas size (keep width same, increase height)
      offscreenCanvas.width = chartCanvas.width;
      offscreenCanvas.height = chartCanvas.height + extraHeight;

      // Fill background with white
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

      // **Video Title in YouTube Sans**
      ctx.fillStyle = "black";
      ctx.font = "bold 20px 'Poppins', Arial";  // Changed from 'YouTube Sans' to 'Poppins'
      let textY = wrapText(`Video: ${videoTitle}`, 20, 30, chartCanvas.width - 40, 24, ctx);

      // **Total Comments Styled and Lowered**
      ctx.font = "bold 16px Arial";
      ctx.fillText(`Total Comments: ${totalComments}`, 20, textY + 30); // Lowered

      // Draw pie chart below the title
      const chartYPosition = textY + 60;  // Move chart down slightly
      ctx.drawImage(chartCanvas, 0, chartYPosition);

      // **Calculate sentiment percentages**
      const total = positive + negative + neutral;
      const positivePercent = ((positive / total) * 100).toFixed(1);
      const negativePercent = ((negative / total) * 100).toFixed(1);
      const neutralPercent = ((neutral / total) * 100).toFixed(1);

      // **Adjust sentiment label positions**
      const labelY = chartYPosition + chartCanvas.height + 40; // Lowered sentiment labels
      // const labelXPositions = [40, 180, 320]; // Spaced better
      const labelXPositions = [20, 150, 285]; // Shifted left by ~10-20px


      ctx.font = "bold 14px Arial";

      ctx.fillStyle = "green";  
      ctx.fillText(`Positive: ${positivePercent}%`, labelXPositions[0], labelY);

      ctx.fillStyle = "red";  
      ctx.fillText(`Negative: ${negativePercent}%`, labelXPositions[1], labelY);

      ctx.fillStyle = "gray";  
      ctx.fillText(`Neutral: ${neutralPercent}%`, labelXPositions[2], labelY);

      // Convert canvas to image and trigger download
      const chartImage = offscreenCanvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = chartImage;
      link.download = 'pie_chart_with_stats.png';
      link.click();
  }
};
  return (
    <div className="flex flex-col items-center p-4 w-full">
      {/* Video Title and Total Comments */}
      <h3 className="text-lg font-semibold text-center">📺 Video: {videoTitle || "Unknown"}</h3>
      <p className="text-sm text-gray-700 text-center">💬 Total Comments: {totalComments || 0}</p>

      {/* Pie chart container with fixed width */}
      <div className="w-72 h-72 my-4">
        <Pie ref={chartRef} data={data} options={{ maintainAspectRatio: false }} />
      </div>

      {/* Download Button */}
      <button 
        onClick={handleDownload} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        ⬇️ Download Chart
      </button>
    </div>
  );
};

export default PieChart;
